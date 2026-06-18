import { useState } from 'react'
import type { InterviewQuestion } from '../types'
import { QuestionContent } from './QuestionContent'

interface QuestionCardProps {
  question: InterviewQuestion
  open?: boolean
  onToggle?: () => void
  defaultOpen?: boolean
}

export function QuestionCard({ question, open: controlledOpen, onToggle, defaultOpen = false }: QuestionCardProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isControlled = controlledOpen !== undefined
  const open = isControlled ? controlledOpen : internalOpen

  const handleToggle = () => {
    if (isControlled) {
      onToggle?.()
    } else {
      setInternalOpen(!internalOpen)
    }
  }

  return (
    <article className={`question-card ${open ? 'open' : ''}`}>
      <button
        type="button"
        className="question-header"
        onClick={handleToggle}
        aria-expanded={open}
      >
        <span className="question-number">{question.id}</span>
        <span className="question-title">{question.question}</span>
        <span className="question-chevron" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d={open ? 'M4 10L8 6L12 10' : 'M4 6L8 10L12 6'}
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {open && (
        <div className="question-body">
          <div className="question-body-inner">
            <QuestionContent question={question} />
          </div>
        </div>
      )}
    </article>
  )
}
