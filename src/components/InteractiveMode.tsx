import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { InterviewQuestion } from "../types";
import { QuestionContent } from "./QuestionContent";

interface InteractiveModeProps {
  questions: InterviewQuestion[];
  title: string;
  initialIndex?: number;
  onClose: () => void;
}

const SWIPE_THRESHOLD = 55;
const SCROLL_EDGE = 8;

function isScrollable(element: HTMLElement) {
  return element.scrollHeight > element.clientHeight + 1;
}

function isAtBottom(element: HTMLElement) {
  return (
    element.scrollTop + element.clientHeight >=
    element.scrollHeight - SCROLL_EDGE
  );
}

function isAtTop(element: HTMLElement) {
  return element.scrollTop <= SCROLL_EDGE;
}

export function InteractiveMode({
  questions,
  title,
  initialIndex = 0,
  onClose,
}: InteractiveModeProps) {
  const feedRef = useRef<HTMLDivElement>(null);
  const innerRefs = useRef<(HTMLElement | null)[]>([]);
  const touchStartY = useRef(0);
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const startIndex = Math.min(
    Math.max(initialIndex, 0),
    Math.max(questions.length - 1, 0),
  );

  const scrollToIndex = useCallback((index: number) => {
    const slide = feedRef.current?.querySelector<HTMLElement>(
      `[data-index="${index}"]`,
    );
    slide?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "ArrowDown" || event.key === "j") {
        event.preventDefault();
        setActiveIndex((current) => {
          const next = Math.min(current + 1, questions.length - 1);
          scrollToIndex(next);
          return next;
        });
      }

      if (event.key === "ArrowUp" || event.key === "k") {
        event.preventDefault();
        setActiveIndex((current) => {
          const next = Math.max(current - 1, 0);
          scrollToIndex(next);
          return next;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, questions.length, scrollToIndex]);

  useEffect(() => {
    const root = feedRef.current;
    if (!root) return;

    const slides = root.querySelectorAll<HTMLElement>(".interactive-slide");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            if (!Number.isNaN(index)) setActiveIndex(index);
          }
        });
      },
      { root, threshold: 0.6 },
    );

    slides.forEach((slide) => observer.observe(slide));
    return () => observer.disconnect();
  }, [questions]);

  useEffect(() => {
    requestAnimationFrame(() => scrollToIndex(startIndex));
  }, [scrollToIndex, startIndex]);

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartY.current = event.touches[0].clientY;
  };

  const handleTouchEnd = (event: React.TouchEvent, index: number) => {
    const inner = innerRefs.current[index];
    if (!inner) return;

    const deltaY = touchStartY.current - event.changedTouches[0].clientY;
    const scrollable = isScrollable(inner);
    const canGoNext = !scrollable || isAtBottom(inner);
    const canGoPrev = !scrollable || isAtTop(inner);

    if (
      deltaY < -SWIPE_THRESHOLD &&
      canGoNext &&
      index < questions.length - 1
    ) {
      scrollToIndex(index + 1);
    } else if (deltaY > SWIPE_THRESHOLD && canGoPrev && index > 0) {
      scrollToIndex(index - 1);
    }
  };

  if (questions.length === 0) return null;

  const progress = ((activeIndex + 1) / questions.length) * 100;

  return createPortal(
    <div
      className="interactive-mode"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} interactive mode`}
    >
      <header className="interactive-header">
        <div className="interactive-progress" aria-hidden="true">
          <div
            className="interactive-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="interactive-header-row">
          <button
            type="button"
            className="interactive-close"
            onClick={onClose}
            aria-label="Exit interactive mode"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 4L14 14M14 4L4 14"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div className="interactive-header-meta">
            <span className="interactive-title">{title}</span>
            <span className="interactive-counter">
              {activeIndex + 1} / {questions.length}
            </span>
          </div>
        </div>
      </header>

      <div ref={feedRef} className="interactive-feed">
        {questions.map((question, index) => (
          <section
            key={`${question.id}-${index}`}
            className="interactive-slide"
            data-index={index}
            aria-label={`Question ${index + 1}`}
            onTouchStart={handleTouchStart}
            onTouchEnd={(event) => handleTouchEnd(event, index)}
          >
            <div
              className="interactive-slide-inner"
              ref={(element) => {
                innerRefs.current[index] = element;
              }}
            >
              <div className="interactive-slide-top">
                <span className="interactive-question-number">
                  Q{question.id}
                </span>
                <span className="interactive-slide-index">
                  {index + 1} of {questions.length}
                </span>
              </div>
              <h2 className="interactive-question">{question.question}</h2>
              <div className="interactive-answer">
                <QuestionContent question={question} />
              </div>
            </div>
            <div className="interactive-slide-footer">
              {index === questions.length - 1 ? (
                <span className="interactive-hint">Last question</span>
              ) : (
                <>
                  {/* <span className="interactive-hint" aria-hidden="true">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 3V13M8 13L4 9M8 13L12 9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Scroll to read · swipe down at end for next
                  </span> */}
                  <button
                    type="button"
                    className="interactive-next-btn"
                    onClick={() => scrollToIndex(index + 1)}
                  >
                    Next question
                  </button>
                </>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>,
    document.body,
  );
}
