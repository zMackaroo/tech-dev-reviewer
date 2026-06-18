import type { InterviewQuestion } from '../../types'

export const animationsQuestions: InterviewQuestion[] = [
  {
    id: 50,
    category: 'Animations',
    question: 'How does the CSS transition property work?',
    answer: 'The transition property smoothly animates changes between two CSS values over a specified duration when a property changes — typically on :hover, :focus, or when a class is toggled. The shorthand accepts property name, duration, timing function, and delay in that order, or you can use transition: all though listing specific properties is better for performance. Transitions only fire when a property\'s computed value actually changes, so they are ideal for micro-interactions like button hovers and panel expand/collapse.',
    code: `.btn {
  background: #3b82f6;
  transform: translateY(0);
  transition:
    background-color 200ms ease,
    transform 200ms ease;
}

.btn:hover {
  background: #2563eb;
  transform: translateY(-2px);
}`,
  },
  {
    id: 51,
    category: 'Animations',
    question: 'What can you do with CSS transform?',
    answer: 'The transform property moves, scales, rotates, skews, or flips an element in 2D or 3D space without affecting document flow or triggering layout reflow. translate repositions visually, scale resizes, and rotate spins around an origin point set by transform-origin. Because transforms operate on the compositor layer, they are among the cheapest properties to animate for performance.',
    code: `.card-image {
  transition: transform 300ms ease;
  transform-origin: center center;
}

.card:hover .card-image {
  transform: scale(1.05);
}

.icon-spin {
  transform: rotate(45deg) translateX(4px);
}`,
  },
  {
    id: 52,
    category: 'Animations',
    question: 'How do @keyframes define multi-step animations?',
    answer: '@keyframes declares a named sequence of styles at specific percentages (or from/to aliases) that an animation property can reference. Unlike transitions, keyframe animations do not require a trigger property change — they can loop, reverse, or pause independently. Each keyframe block sets any animatable CSS properties at that point in the timeline, and the browser interpolates between them.',
    code: `@keyframes pulse {
  0%, 100% { opacity: 0.4; }
  50%      { opacity: 1; }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.skeleton {
  animation: pulse 1.5s ease-in-out infinite;
}`,
  },
  {
    id: 53,
    category: 'Animations',
    question: 'What does the animation shorthand property include?',
    answer: 'The animation shorthand combines name, duration, timing-function, delay, iteration-count, direction, fill-mode, and play-state into a single declaration. At minimum you need a name and duration — animation: fadeIn 300ms — but production code usually specifies timing and fill-mode too. animation-fill-mode: forwards keeps the element at the final keyframe state after the animation completes, which is essential for entrance animations that should not snap back.',
    code: `.toast-enter {
  animation: slide-up 400ms ease-out forwards;
}

.banner-dismiss {
  animation: fade-out 300ms ease-in forwards;
}

/* Longhand equivalent */
.modal {
  animation-name: scale-in;
  animation-duration: 250ms;
  animation-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
  animation-fill-mode: both;
}`,
  },
  {
    id: 54,
    category: 'Animations',
    question: 'What is will-change and when should you use it?',
    answer: 'will-change hints to the browser that a property is about to animate, allowing it to promote the element to its own compositor layer ahead of time. Valid values include transform, opacity, scroll-position, and specific property names like will-change: transform, opacity. It should be applied sparingly and removed after animation completes, because each promoted layer consumes GPU memory.',
    code: `.carousel-item.is-dragging {
  will-change: transform;
}

.carousel-item {
  transition: transform 200ms ease;
}

/* Remove hint after animation via JS or a class toggle */
.carousel-item.animation-done {
  will-change: auto;
}`,
  },
  {
    id: 55,
    category: 'Animations',
    question: 'How does GPU acceleration relate to CSS animations?',
    answer: 'GPU acceleration means the browser offloads certain rendering work to the graphics processor, compositing layers independently of the main thread layout pass. Properties like transform and opacity can be animated on the compositor thread, keeping animations smooth even when JavaScript is busy. Properties that trigger layout (width, height, top, left, margin) force the main thread to recalculate geometry every frame, causing jank.',
    code: `/* GPU-friendly — compositor-only */
.drawer {
  transform: translateX(100%);
  transition: transform 300ms ease;
}
.drawer.open {
  transform: translateX(0);
}

/* Layout-triggering — avoid animating */
.sidebar-bad {
  width: 0;
  transition: width 300ms; /* causes reflow each frame */
}`,
  },
  {
    id: 56,
    category: 'Animations',
    question: 'How do you optimize CSS animation performance?',
    answer: 'Stick to compositor-friendly properties (transform and opacity) for animations that must run at 60fps, and avoid animating layout-triggering properties like width, height, or margin unless absolutely necessary. Limit the number of simultaneously animating elements, use contain or content-visibility on off-screen sections, and profile with DevTools Performance panel to find long frames. Prefer CSS transitions for simple state changes and reserve @keyframes for complex sequences.',
    code: `.list-item {
  /* Only animate cheap properties */
  transition: opacity 200ms ease, transform 200ms ease;
  contain: layout style;
}

.list-item.entering {
  opacity: 0;
  transform: translateY(8px);
}

.list-item.visible {
  opacity: 1;
  transform: translateY(0);
}`,
  },
  {
    id: 57,
    category: 'Animations',
    question: 'How do you respect prefers-reduced-motion in CSS?',
    answer: 'prefers-reduced-motion is a media query that detects when a user has enabled a system setting to minimize non-essential motion, often due to vestibular disorders or personal preference. You wrap or override animations and transitions inside @media (prefers-reduced-motion: reduce) to disable, shorten, or replace them with instant state changes. This is an accessibility requirement, not a nice-to-have — WCAG guidelines expect motion to be reducible.',
    code: `.fade-in {
  animation: slide-up 500ms ease-out both;
}

@media (prefers-reduced-motion: reduce) {
  .fade-in {
    animation: none;
    opacity: 1;
    transform: none;
  }

  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}`,
  },
  {
    id: 58,
    category: 'Animations',
    question: 'How do you create staggered animations in CSS?',
    answer: 'Stagger animations delay each item in a group so they animate sequentially rather than all at once, creating a cascading reveal effect. The simplest CSS approach uses nth-child selectors to assign incremental animation-delay values to list items. For dynamic lists where item count varies, JavaScript can set --index custom properties and use calc() in the delay expression.',
    code: `.menu-item {
  animation: fade-in 400ms ease both;
}

.menu-item:nth-child(1) { animation-delay: 0ms; }
.menu-item:nth-child(2) { animation-delay: 80ms; }
.menu-item:nth-child(3) { animation-delay: 160ms; }

/* Dynamic stagger with custom property */
.card {
  animation: slide-up 300ms ease both;
  animation-delay: calc(var(--i, 0) * 60ms);
}`,
  },
  {
    id: 59,
    category: 'Animations',
    question: 'When should you use CSS animations versus JavaScript animations?',
    answer: 'CSS animations and transitions excel at declarative, state-driven effects tied to pseudo-classes or class toggles — they run off the main thread when using compositor properties and require no animation loop code. JavaScript animations (requestAnimationFrame, Web Animations API, or libraries like GSAP) are better when you need physics-based motion, drag interaction, scroll-linked progress, or dynamic values computed at runtime. CSS cannot easily pause based on complex logic or sync with audio timestamps.',
    code: `/* CSS — declarative hover/state change */
.tab.active {
  transition: color 200ms, border-color 200ms;
  border-bottom: 2px solid #3b82f6;
}

/* JS — dynamic target value */
// element.animate(
//   [{ width: "0%" }, { width: \`\${percent}%\` }],
//   { duration: 600, easing: "ease-out" }
// );`,
  },
]
