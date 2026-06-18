import type { InterviewQuestion } from '../../types'

export const responsiveQuestions: InterviewQuestion[] = [
  {
    id: 28,
    category: 'Responsive Design',
    question: 'What is mobile-first design?',
    answer: 'Mobile-first design means you write base CSS for small screens first, then add min-width media queries to enhance the layout for tablets and desktops. This forces you to prioritize essential content and performance on constrained viewports before adding complexity. It pairs naturally with progressive enhancement — every user gets a functional layout, and larger screens get richer arrangements. The opposite approach, desktop-first, starts with a full layout and uses max-width queries to strip features down, which often leads to bloated mobile CSS.',
    code: `/* Base styles — mobile */
.nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Enhance for larger screens */
@media (min-width: 768px) {
  .nav {
    flex-direction: row;
    justify-content: space-between;
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}`,
  },
  {
    id: 29,
    category: 'Responsive Design',
    question: 'What are media queries and how do you use them?',
    answer: 'Media queries are CSS conditional blocks that apply styles only when certain device characteristics match, most commonly viewport width via @media (min-width: 768px). They let one HTML document adapt its presentation across phones, tablets, and desktops without separate URLs. You can combine conditions with and, or, and not, and query features beyond width like prefers-color-scheme and prefers-reduced-motion. Media queries do not change the HTML — they only toggle which CSS rules are active.',
    code: `/* Width-based breakpoints */
@media (min-width: 640px) {
  .container {
    padding: 1.5rem 2rem;
  }
}

@media (min-width: 1024px) {
  .sidebar {
    display: block;
  }

  .content {
    margin-left: 240px;
  }
}

/* Feature-based media query */
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #111827;
    --text: #f9fafb;
  }
}`,
  },
  {
    id: 30,
    category: 'Responsive Design',
    question: 'What is a good breakpoints strategy?',
    answer: 'A good breakpoints strategy sets layout changes at points where your design actually breaks, not at specific device widths like "iPhone size." Start with a mobile-first base and add breakpoints when content overflows, text becomes unreadable, or whitespace feels wrong — often around 480px, 768px, and 1024px, but tuned to your design. Use as few breakpoints as possible to reduce CSS complexity; fluid layouts with %, fr, and clamp() need fewer hard stops. Name breakpoints semantically in preprocessors or document them in a shared tokens file.',
    code: `/* Break where the design breaks, not per device */
.card-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 600px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}`,
  },
  {
    id: 31,
    category: 'Responsive Design',
    question: 'What is the difference between min-width and max-width media queries?',
    answer: 'min-width queries apply styles when the viewport is at least the specified width or wider — the foundation of mobile-first design where base styles target small screens and min-width adds enhancements. max-width queries apply styles when the viewport is at most the specified width or narrower — the desktop-first pattern where you override styles as the screen shrinks. min-width queries cascade upward (styles persist at larger sizes unless overridden), while max-width queries cascade downward.',
    code: `/* Mobile-first: min-width adds complexity going up */
.sidebar {
  display: none;
}

@media (min-width: 768px) {
  .sidebar {
    display: block;
    width: 240px;
  }
}

/* Desktop-first: max-width removes complexity going down */
/* .sidebar { display: block; width: 240px; } */
/* @media (max-width: 767px) { .sidebar { display: none; } } */`,
  },
  {
    id: 32,
    category: 'Responsive Design',
    question: 'What are container queries (@container)?',
    answer: 'Container queries let you apply styles based on the size of a parent container rather than the viewport, solving the problem of reusable components that must adapt inside different layouts. You mark a parent with container-type: inline-size (or size) and optionally container-name, then write @container rules that respond to that element\'s width. This means a card component can switch from stacked to side-by-side layout when its column is wide enough, even on a desktop page where the card sits in a narrow sidebar.',
    code: `.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@container card (min-width: 400px) {
  .card {
    flex-direction: row;
    align-items: center;
  }

  .card__image {
    width: 120px;
    flex-shrink: 0;
  }
}`,
  },
  {
    id: 33,
    category: 'Responsive Design',
    question: 'How do you implement fluid typography with clamp()?',
    answer: 'clamp(min, preferred, max) sets a value that scales between a minimum and maximum based on a preferred value, usually a viewport-relative calculation. For fluid typography, the preferred value often combines rem with vw so font size grows smoothly between breakpoints instead of jumping at media query thresholds. This reduces the number of @media blocks needed for heading sizes and body text. The browser always clamps the result so text never goes below the min or above the max, preserving readability.',
    code: `:root {
  font-size: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
}

h1 {
  font-size: clamp(1.75rem, 1.2rem + 2vw, 3rem);
  line-height: 1.2;
}

h2 {
  font-size: clamp(1.25rem, 1rem + 1vw, 2rem);
}

.lead {
  font-size: clamp(1.125rem, 1rem + 0.5vw, 1.375rem);
}`,
  },
  {
    id: 34,
    category: 'Responsive Design',
    question: 'What are dvh and svh viewport units?',
    answer: 'Traditional vh (1% of viewport height) is calculated against the layout viewport, which on mobile browsers ignores the dynamic appearance and disappearance of the address bar, often causing elements sized to 100vh to overflow or hide behind browser chrome. svh (small viewport height) uses the smallest possible viewport — address bar visible — while lvh (large viewport height) uses the largest — address bar hidden. dvh (dynamic viewport height) updates in real time as the browser UI shows or hides, giving the most accurate full-screen sizing.',
    code: `/* Avoid mobile browser chrome issues */
.hero {
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.fullscreen-modal {
  min-height: 100svh; /* conservative: always fits visible area */
}

/* Fallback for older browsers */
.hero {
  min-height: 100vh;
  min-height: 100dvh;
}`,
  },
  {
    id: 35,
    category: 'Responsive Design',
    question: 'How do you make images responsive in CSS?',
    answer: 'Responsive images scale with their container without overflowing or distorting the layout. The core CSS pattern is max-width: 100% and height: auto on img so images shrink on small screens but never exceed their intrinsic width on large ones. object-fit: cover or contain controls how images fill fixed-aspect containers, and width: 100% with a sized parent makes images fluid. CSS alone cannot serve different file resolutions — that requires HTML srcset — but CSS ensures whatever image loads fits the layout.',
    code: `img {
  max-width: 100%;
  height: auto;
  display: block;
}

.article img {
  width: 100%;
  border-radius: 8px;
}

.thumbnail {
  aspect-ratio: 4 / 3;
  overflow: hidden;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}`,
  },
  {
    id: 36,
    category: 'Responsive Design',
    question: 'How does the picture element work with CSS?',
    answer: 'The HTML picture element lets the browser choose different image sources via source elements with media or type attributes, while CSS controls how the chosen image is displayed. The img inside picture is what CSS styles — picture itself is a wrapper that does not render a box, so you target picture img or give the img a class. Common patterns include art direction (cropped mobile vs. wide desktop images) combined with width: 100% in CSS for fluid display. CSS cannot select which source loads, but it ensures whichever image arrives fits the layout.',
    code: `/* Style the img inside picture, not picture itself */
.hero picture,
.hero img {
  display: block;
  width: 100%;
}

.hero img {
  height: 50dvh;
  object-fit: cover;
  object-position: center;
}

/* HTML structure (for context):
<picture>
  <source media="(min-width: 768px)" srcset="hero-wide.jpg" />
  <source srcset="hero-mobile.jpg" />
  <img src="hero-mobile.jpg" alt="Product launch" class="hero-image" />
</picture> */`,
  },
  {
    id: 37,
    category: 'Responsive Design',
    question: 'What are recommended mobile touch target sizes?',
    answer: 'Touch targets should be large enough for fingers to tap accurately without hitting adjacent controls. WCAG 2.5.5 recommends at least 44×44 CSS pixels, and Apple\'s Human Interface Guidelines suggest 44pt; Google Material Design recommends 48×48dp. You achieve this with padding, min-width/min-height, or a transparent ::after pseudo-element that expands the hit area without changing visual size. Adequate spacing between targets (at least 8px) prevents mis-taps.',
    code: `.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  padding: 10px;
  border: none;
  background: transparent;
  cursor: pointer;
}

/* Expand hit area without changing visual size */
.icon-button--compact {
  position: relative;
}

.icon-button--compact::after {
  content: "";
  position: absolute;
  inset: -10px;
}`,
  },
  {
    id: 38,
    category: 'Responsive Design',
    question: 'What are common responsive Flexbox and Grid patterns?',
    answer: 'Modern responsive layouts rely on a few repeatable Flexbox and Grid patterns instead of dozens of breakpoint-specific rules. Flexbox patterns include flex-wrap with gap for tag clouds, flex-direction: column on mobile switching to row in a media query for toolbars, and margin-inline-start: auto to push items to the end. Grid patterns include repeat(auto-fill, minmax(250px, 1fr)) for auto-responsive card grids, sidebar layouts with grid-template-columns: 1fr that become 240px 1fr at wider breakpoints, and subgrid (where supported) for aligned nested content.',
    code: `/* Auto-responsive grid — no column-count media queries */
.posts {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* Flex toolbar — stack on mobile, row on tablet+ */
.toolbar {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

@media (min-width: 640px) {
  .toolbar {
    flex-direction: row;
    align-items: center;
  }

  .toolbar__actions {
    margin-inline-start: auto;
  }
}`,
  },
  {
    id: 39,
    category: 'Responsive Design',
    question: 'What are prefers-reduced-motion and prefers-color-scheme?',
    answer: 'These are user-preference media features that respect accessibility and system settings rather than viewport size. prefers-reduced-motion: reduce detects when a user has enabled "reduce motion" in their OS, and you should disable or shorten animations, parallax, and auto-playing transitions in response. prefers-color-scheme: dark or light reads the user\'s system theme so you can swap CSS custom properties for backgrounds, text, and borders without JavaScript. Both improve inclusivity and feel native on macOS, Windows, iOS, and Android.',
    code: `@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

:root {
  --bg: #ffffff;
  --text: #111827;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #111827;
    --text: #f9fafb;
  }
}

body {
  background: var(--bg);
  color: var(--text);
}`,
  },
]
