import type { InterviewQuestion } from '../../types'

export const advancedQuestions: InterviewQuestion[] = [
  {
    id: 60,
    category: 'Advanced CSS',
    question: 'How do CSS custom properties (--var) and var() work?',
    answer: 'CSS custom properties (variables) are declared with a double-dash prefix like --color-primary and accessed with the var() function, inheriting down the DOM tree like regular CSS properties. Unlike preprocessor variables, they are live at runtime and can be updated with JavaScript or media queries, enabling dynamic theming without rebuilding stylesheets. var() accepts a fallback value as a second argument for when the custom property is undefined. In a real app, defining --surface and --text on :root and overriding them inside a [data-theme="dark"] selector lets you swap an entire color scheme by toggling one attribute on the html element.',
    code: `:root {
  --color-primary: oklch(0.62 0.19 255);
  --spacing-md: 1rem;
  --radius: 0.5rem;
}

.card {
  padding: var(--spacing-md);
  border-radius: var(--radius);
  border: 1px solid var(--border, #e5e7eb);
}

[data-theme="dark"] {
  --color-primary: oklch(0.72 0.15 255);
}`,
  },
  {
    id: 61,
    category: 'Advanced CSS',
    question: 'What is calc() and where is it useful?',
    answer: 'calc() performs arithmetic on CSS values with different units, letting you mix percentages, pixels, rem, and custom properties in a single expression. Addition and subtraction require whitespace around the operator, while multiplication and division do not. It is essential for layouts that need to subtract a fixed sidebar width from 100%, or add gutter spacing to a grid column percentage. In a real app, calc(100vh - var(--header-height)) makes a scrollable content area fill exactly the remaining viewport below a sticky header without JavaScript height measurements.',
    code: `:root {
  --header-height: 64px;
  --sidebar-width: 280px;
}

.main-content {
  min-height: calc(100vh - var(--header-height));
  width: calc(100% - var(--sidebar-width));
}

.grid-col {
  width: calc((100% - 2 * 1rem) / 3);
}`,
  },
  {
    id: 62,
    category: 'Advanced CSS',
    question: 'How do min(), max(), and clamp() compare?',
    answer: 'min() returns the smallest value from a comma-separated list, max() returns the largest, and clamp(min, preferred, max) constrains a preferred value within a floor and ceiling. These functions enable fluid typography and spacing that scales with viewport width without writing dozens of media queries. clamp() is the most common for responsive design because it expresses a minimum, ideal, and maximum in one declaration. In a real app, font-size: clamp(1rem, 2.5vw, 1.5rem) keeps body text at least 16px on mobile, grows smoothly on tablets, and caps at 24px on large desktops.',
    code: `h1 {
  font-size: clamp(1.75rem, 4vw + 1rem, 3rem);
}

.container {
  width: min(100% - 2rem, 1200px);
  margin-inline: auto;
}

.sidebar {
  width: clamp(200px, 25vw, 320px);
}`,
  },
  {
    id: 63,
    category: 'Advanced CSS',
    question: 'What are CSS logical properties and why use them?',
    answer: 'Logical properties describe layout relative to text flow direction rather than physical screen directions like left and right. inline-start and inline-end map to left/right in LTR languages but flip automatically in RTL, while block-start and block-end correspond to top and bottom in horizontal writing modes. Properties like margin-inline, padding-block, and inset-inline replace margin-left/right and padding-top/bottom with direction-aware equivalents. In a real app, using margin-inline-start instead of margin-left on a navigation icon ensures correct spacing when your app is localized for Arabic or Hebrew without maintaining separate RTL stylesheets.',
    code: `.card {
  padding-block: 1.5rem;
  padding-inline: 1rem;
  border-inline-start: 4px solid var(--accent);
  margin-block-end: 1rem;
}

.dialog {
  inset-inline: 0;
  inset-block-start: 0;
}`,
  },
  {
    id: 64,
    category: 'Advanced CSS',
    question: 'How does the :has() relational selector work?',
    answer: ':has() is a parent selector that matches an element if any of its descendants (or following siblings, depending on the argument) satisfy the inner selector. It enables styles based on child state without JavaScript — for example, styling a form group red when it contains an invalid input. Because it can match upward in the DOM tree, :has() fills a long-standing CSS gap that previously required JS class toggling on parents. In a real app, .card:has(img) applies different padding when a card contains an image, and form:has(:invalid) can highlight the entire form section when any field fails validation.',
    code: `/* Style parent based on child state */
.form-group:has(:invalid) {
  border-color: #ef4444;
}

.card:has(.badge) {
  padding-top: 2rem;
}

/* Previous sibling styling */
h2:has(+ p) {
  margin-bottom: 0.25rem;
}`,
  },
  {
    id: 65,
    category: 'Advanced CSS',
    question: 'What are CSS cascade layers (@layer)?',
    answer: '@layer lets you define explicit priority tiers in the CSS cascade, so layer order — not source order or selector specificity alone — determines which styles win. Unlayered CSS always beats layered CSS, and among layers the last declared layer has the highest priority. This solves specificity wars when combining reset styles, component libraries, utilities, and overrides from different authors. In a real app, declaring @layer reset, base, components, utilities means your Tailwind utility classes consistently override component styles without needing !important or hyper-specific selectors.',
    code: `@layer reset, base, components, utilities;

@layer reset {
  *, *::before, *::after { box-sizing: border-box; }
}

@layer components {
  .btn { padding: 0.5rem 1rem; background: #333; }
}

@layer utilities {
  .btn-primary { background: #3b82f6; }
}`,
  },
  {
    id: 66,
    category: 'Advanced CSS',
    question: 'What is CSS subgrid and when would you use it?',
    answer: 'Subgrid allows a nested grid item to inherit its parent grid\'s track sizing, so child elements align to the parent column and row lines instead of creating an independent grid. You enable it with display: grid and grid-template-columns: subgrid (or subgrid on rows). This is invaluable for card layouts where each card\'s internal sections must line up across rows — like aligning titles, descriptions, and buttons at the same vertical positions in every card. In a real app, a product grid where every card title, price, and CTA button aligns horizontally across the row is much simpler with subgrid than with fixed min-heights or JavaScript equalization.',
    code: `.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.product-card {
  display: grid;
  grid-row: span 3;
  grid-template-rows: subgrid;
  gap: 0.75rem;
}`,
  },
  {
    id: 67,
    category: 'Advanced CSS',
    question: 'How does scroll-snap improve scroll UX?',
    answer: 'Scroll snap forces a scroll container to settle on defined snap points after the user stops scrolling, creating a carousel or paginated feel with native scroll behavior. The container gets scroll-snap-type (e.g., x mandatory), and children get scroll-snap-align to define which edge or center aligns to the snap point. mandatory means the scroll always lands on a snap point, while proximity only snaps when close enough. In a real app, a horizontal story carousel uses scroll-snap-type: x mandatory on the container and scroll-snap-align: start on each slide so swiping always reveals a full slide rather than stopping halfway.',
    code: `.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  gap: 1rem;
}

.carousel-slide {
  flex: 0 0 100%;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}`,
  },
  {
    id: 68,
    category: 'Advanced CSS',
    question: 'What does the accent-color property do?',
    answer: 'accent-color sets the accent tint for user-interface controls like checkboxes, radio buttons, range sliders, and progress bars with a single CSS declaration. It replaces the old approach of hiding native inputs and rebuilding them from scratch just to change color, preserving built-in accessibility and keyboard behavior. Browser support is strong in modern engines, though the exact rendering varies slightly per control type. In a real app, setting accent-color: var(--brand-primary) on a form makes every checkbox and toggle match your design system without custom SVG icon replacements.',
    code: `:root {
  accent-color: oklch(0.62 0.19 255);
}

input[type="checkbox"],
input[type="radio"],
input[type="range"],
progress {
  accent-color: var(--brand-primary, #3b82f6);
}`,
  },
  {
    id: 69,
    category: 'Advanced CSS',
    question: 'What are :is(), :where(), :not(), and content-visibility?',
    answer: ':is() and :where() group selectors with lower specificity cost — :where() always contributes zero specificity while :is() takes the highest specificity of its arguments. :not() excludes elements matching an inner selector and now accepts complex selectors in modern browsers. content-visibility: auto skips rendering off-screen content until it is near the viewport, dramatically improving initial page load for long lists and document pages. In a real app, article p:not(:last-child) adds spacing between paragraphs without a margin on the final one, while content-visibility: auto on feed items lets a 500-item timeline paint in milliseconds instead of seconds.',
    code: `/* Modern selector grouping */
:is(h1, h2, h3):where(.section-title) {
  font-weight: 700;
}

article p:not(:last-child) {
  margin-bottom: 1rem;
}

/* Render skipping for long lists */
.feed-item {
  content-visibility: auto;
  contain-intrinsic-size: 0 120px;
}`,
  },
]
