import type { InterviewQuestion } from '../../types'

export const fundamentalsQuestions: InterviewQuestion[] = [
  {
    id: 1,
    category: 'Fundamentals',
    question: 'What is the role of CSS in web development?',
    answer: 'CSS (Cascading Style Sheets) controls the visual presentation of HTML documents — layout, colors, typography, spacing, animations, and responsive behavior. It separates content (HTML) from presentation so you can restyle an entire site by changing one stylesheet instead of editing every page. CSS works declaratively: you write rules that match elements and declare how they should look, and the browser applies them. For example, a single .btn class can give every button consistent padding and hover states across a React or Vue app. In a real app, a design system might ship a tokens.css file with shared colors and spacing variables that every component stylesheet imports.',
    code: `/* Global typography and layout */
body {
  font-family: system-ui, sans-serif;
  line-height: 1.5;
  color: #1a1a1a;
  background: #fafafa;
}

.card {
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}`,
  },
  {
    id: 2,
    category: 'Fundamentals',
    question: 'What are the main types of CSS selectors?',
    answer: 'CSS selectors tell the browser which elements a rule applies to. Element selectors target tags like p or div, class selectors use a dot prefix like .nav-link, and ID selectors use a hash like #header. Attribute selectors match elements by attribute values, such as input[type="email"]. Combinators extend matching: descendant (space), child (>), adjacent sibling (+), and general sibling (~). Pseudo-class and pseudo-element selectors add state and generated content, like :hover and ::before. For example, nav a.active targets anchor tags with the active class inside a nav element. In a real app, you might combine selectors like .sidebar > .menu-item:is(:hover, :focus-visible) to style keyboard- and mouse-accessible navigation items.',
    code: `/* Element, class, ID, and attribute selectors */
p { margin-bottom: 1rem; }

.nav-link { color: #2563eb; }

#main-header { position: sticky; top: 0; }

input[type="email"] { border-color: #3b82f6; }

/* Combinators */
.card > .title { font-weight: 700; }
h2 + p { margin-top: 0; }`,
  },
  {
    id: 3,
    category: 'Fundamentals',
    question: 'How do element, class, and ID selectors differ?',
    answer: 'Element selectors (p, button) apply to every matching tag and carry the lowest specificity among the three. Class selectors (.btn, .card-title) are reusable hooks meant to be applied to many elements and are the primary styling tool in component-based apps. ID selectors (#login-form) target a single unique element per page and carry very high specificity, which makes them hard to override and generally discouraged for styling. Classes strike the best balance between reusability and manageable specificity. For example, you style all buttons with .btn but give a primary variant with .btn--primary instead of #submit-button. In a real app, BEM naming like .modal__header keeps class selectors predictable without relying on IDs.',
    code: `/* Element — broad, low specificity */
button {
  font-family: inherit;
  cursor: pointer;
}

/* Class — reusable, preferred for styling */
.btn {
  padding: 0.5rem 1rem;
  border-radius: 6px;
}

.btn--primary {
  background: #2563eb;
  color: white;
}

/* ID — unique, high specificity (use sparingly) */
#site-footer {
  margin-top: auto;
}`,
  },
  {
    id: 4,
    category: 'Fundamentals',
    question: 'What are attribute selectors and when do you use them?',
    answer: 'Attribute selectors match elements based on the presence or value of an HTML attribute. The syntax [attr], [attr="value"], [attr^="value"], [attr$="value"], and [attr*="value"] cover exact matches, prefixes, suffixes, and substrings. They are useful when you cannot add classes, such as styling native form controls, targeting data attributes, or writing defensive CSS for CMS-generated markup. Attribute selectors sit between classes and IDs in specificity (0,1,0 for [type="text"]). For example, a[href^="https://"] styles only external links without adding a class to every anchor. In a real app, you might use [data-state="loading"] to dim a button while an async request is in flight.',
    code: `/* Exact and partial attribute matching */
input[type="text"] {
  border: 1px solid #d1d5db;
}

a[href^="https://"]::after {
  content: " ↗";
  font-size: 0.75em;
}

img[alt=""] {
  outline: 2px dashed red;
}

[data-state="loading"] {
  opacity: 0.6;
  pointer-events: none;
}`,
  },
  {
    id: 5,
    category: 'Fundamentals',
    question: 'What is CSS specificity and how is it calculated?',
    answer: 'Specificity determines which CSS rule wins when multiple rules target the same element and set conflicting properties. It is calculated as a four-part score: inline styles (1,0,0,0), IDs (0,1,0,0), classes/attributes/pseudo-classes (0,0,1,0), and elements/pseudo-elements (0,0,0,1). The rule with the higher score wins; !important overrides normal declarations but is best avoided except for utility overrides. For example, #nav .link (0,1,1,0) beats .link (0,0,1,0) even if .link appears later in the file. In a real app, keeping specificity flat by using single-class selectors prevents "specificity wars" where every bug fix requires increasingly specific selectors.',
    code: `/* Specificity: (0,0,1,1) — one class + one element */
.nav a {
  color: gray;
}

/* Specificity: (0,1,1,1) — one ID + one class + one element — WINS */
#nav .nav-link {
  color: blue;
}

/* Specificity: (0,0,2,0) — two classes */
.nav-link.active {
  color: white;
  background: #2563eb;
}`,
  },
  {
    id: 6,
    category: 'Fundamentals',
    question: 'What is the CSS cascade and how does it resolve conflicts?',
    answer: 'The cascade is the algorithm browsers use to combine styles from multiple sources — user agent defaults, author stylesheets, and user overrides — and pick a winning declaration for each property. When specificity is equal, source order matters: later rules override earlier ones in the same stylesheet, and external sheets vs. embedded blocks follow document order. Origin and importance also factor in: !important author rules beat normal author rules, and inline styles beat stylesheet rules unless !important is involved. For example, if two classes both set color with equal specificity, whichever rule appears last in the CSS file wins. In a real app, loading a theme.css after base.css lets theme tokens override defaults without touching component-level selectors.',
    code: `/* base.css — loaded first */
.button {
  background: #e5e7eb;
  color: #111;
}

/* theme.css — loaded second, wins on equal specificity */
.button {
  background: #2563eb;
  color: white;
}

/* Inline style beats stylesheet unless !important is used */
/* <button class="button" style="background: red"> */`,
  },
  {
    id: 7,
    category: 'Fundamentals',
    question: 'What is CSS inheritance and which properties inherit?',
    answer: 'Inheritance lets certain CSS properties pass their computed values from parent elements to children without re-declaring them on every descendant. Text-related properties like color, font-family, font-size, line-height, and visibility typically inherit, while box-model properties like margin, padding, border, and width do not. You can force inheritance with the inherit keyword or block it with initial or unset. For example, setting color on body gives every paragraph and link the same base text color unless overridden. In a real app, defining font-family and line-height on :root or body ensures all nested components inherit consistent typography without duplicating rules in every CSS module.',
    code: `body {
  font-family: "Inter", system-ui, sans-serif;
  color: #1f2937;
  line-height: 1.6;
}

/* Children inherit color and font-family automatically */
article p {
  /* No need to redeclare font-family */
  margin-bottom: 1rem;
}

.highlight {
  color: #b45309; /* Overrides inherited body color */
}

.reset-margin {
  margin: initial; /* Does not inherit — resets to default */
}`,
  },
  {
    id: 8,
    category: 'Fundamentals',
    question: 'What is the CSS box model?',
    answer: 'The CSS box model describes how every element is rendered as a rectangular box with four layers: content, padding, border, and margin. The content area holds text and child elements; padding adds space inside the border; the border wraps the padding; and margin creates space outside the border between siblings. By default, width and height apply only to the content box (content-box), so padding and border add to the total size. Setting box-sizing: border-box makes width and height include padding and border, which makes layout math far more predictable. For example, two columns at width: 50% with border-box stay side by side, while content-box might overflow because borders add extra pixels. In a real app, most teams apply *, *::before, *::after { box-sizing: border-box; } globally.',
    code: `.box {
  box-sizing: border-box;
  width: 200px;
  height: 100px;
  padding: 16px;
  border: 2px solid #d1d5db;
  margin: 12px;
}

/* Total rendered width = 200px (padding + border included) */
/* Content area = 200 - 32px padding - 4px border = 164px */`,
  },
  {
    id: 9,
    category: 'Fundamentals',
    question: 'What is margin collapse?',
    answer: 'Margin collapse is a behavior where vertical margins of adjacent block-level elements combine into a single margin equal to the larger of the two, rather than stacking additively. It happens between sibling blocks, between a parent and its first/last child (under certain conditions), and between empty blocks. Horizontal margins never collapse. Collapse can cause unexpected spacing — for example, two sections with margin-bottom: 24px and margin-top: 32px produce 32px of gap, not 56px. Flexbox, Grid, and overflow other than visible on a parent prevent collapse between parent and child. In a real app, teams often use gap in Flexbox or Grid instead of margins between items to avoid collapse surprises in article stacks and card lists.',
    code: `.section-a {
  margin-bottom: 24px;
}

.section-b {
  margin-top: 32px;
}

/* Gap between sections = 32px (collapsed), not 56px */

/* Prevent collapse with flex + gap */
.stack {
  display: flex;
  flex-direction: column;
  gap: 24px;
}`,
  },
  {
    id: 10,
    category: 'Fundamentals',
    question: 'What are the main CSS display types?',
    answer: 'The display property controls how an element participates in layout and whether it generates a box at all. block elements (display: block) start on a new line and stretch to the full container width — div, p, and section behave this way by default. inline elements (display: inline) flow with text and ignore width/height — span and a are inline. inline-block combines both: flows inline but respects box dimensions. Flex (display: flex) and Grid (display: grid) create formatting contexts for modern layout, while display: none removes the element from layout entirely. For example, switching a navbar from block list items to display: flex lays links in a horizontal row. In a real app, display: none hides a mobile menu until a .is-open class toggles it to display: block or flex.',
    code: `/* Block — full width, stacks vertically */
.card { display: block; }

/* Inline — flows with text, no width/height control */
.highlight { display: inline; background: yellow; }

/* Inline-block — sits inline but accepts dimensions */
.badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 999px;
}

/* Flex — one-dimensional layout */
.toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
}`,
  },
  {
    id: 11,
    category: 'Fundamentals',
    question: 'What is the difference between px, rem, em, %, and vh units?',
    answer: 'px are absolute CSS pixels — fixed units that do not scale with user font settings unless the user zooms the page. rem (root em) is relative to the root font size (usually 16px), so 1.5rem is 24px by default and scales when the user changes browser font size. em is relative to the current element\'s font size, so nested em values compound and can grow unexpectedly. % is relative to a parent property — width: 50% is half the parent width, while line-height: 150% is relative to the element\'s own font size. vh is 1% of the viewport height, useful for full-screen sections. For example, padding: 1rem on buttons stays consistent site-wide while font-size: 1.125rem on h2 respects user accessibility settings. In a real app, teams use rem for spacing and typography and reserve vh for hero sections like min-height: 80vh.',
    code: `:root {
  font-size: 16px;
}

.container {
  width: 90%;
  max-width: 1200px;
}

h1 {
  font-size: 2rem;    /* 32px at default root */
  margin-bottom: 1rem;
}

.sidebar {
  width: 25%;
}

.hero {
  min-height: 80vh;
  padding: 2rem 1.5rem;
}`,
  },
  {
    id: 12,
    category: 'Fundamentals',
    question: 'What are pseudo-classes and how do they work?',
    answer: 'Pseudo-classes are selectors that target elements in a specific state or position without requiring extra HTML classes. They use a single colon syntax like :hover, :focus, :nth-child(2), or :not(.disabled). Interactive pseudo-classes (:hover, :active, :focus-visible) style user interactions, while structural ones (:first-child, :nth-of-type) select elements by their position in the DOM. Pseudo-classes add to specificity at the class level (0,0,1,0). For example, button:hover { background: #1d4ed8; } changes appearance only while the pointer is over the button. In a real app, :focus-visible outlines keyboard-focused links while suppressing the ring for mouse clicks, improving accessibility without hurting visual design.',
    code: `a {
  color: #2563eb;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

a:focus-visible {
  outline: 2px solid #2563eb;
  outline-offset: 2px;
}

li:nth-child(odd) {
  background: #f9fafb;
}

input:invalid {
  border-color: #dc2626;
}`,
  },
  {
    id: 13,
    category: 'Fundamentals',
    question: 'What are pseudo-elements and how do they differ from pseudo-classes?',
    answer: 'Pseudo-elements create and style virtual elements that do not exist in the HTML, using a double-colon syntax like ::before, ::after, ::first-line, or ::placeholder. They let you inject decorative content or style a specific part of an element — for example, ::before can add an icon before a link without an extra span. Pseudo-classes (:hover) select existing elements in a state; pseudo-elements (::after) generate new boxes as children of the target element. Both add specificity, but pseudo-elements count as elements (0,0,0,1). The content property is required for ::before and ::after to render. For example, ::after on an external link can append "↗" as decorative text. In a real app, a tooltip arrow is often a ::after triangle positioned with CSS borders instead of an extra DOM node.',
    code: `.quote {
  position: relative;
  padding-left: 1.5rem;
}

.quote::before {
  content: """;
  position: absolute;
  left: 0;
  font-size: 2rem;
  color: #9ca3af;
}

.truncate::after {
  content: "…";
}

input::placeholder {
  color: #9ca3af;
}`,
  },
  {
    id: 14,
    category: 'Fundamentals',
    question: 'What are CSS custom properties (variables)?',
    answer: 'CSS custom properties (variables) let you define reusable values with a -- prefix and reference them with var(--name). They are declared on any selector but are most commonly set on :root for global tokens, and they cascade and inherit like regular properties. Unlike preprocessor variables, CSS custom properties are live in the browser and can change at runtime — perfect for theming and dark mode. The var() function accepts a fallback: var(--accent, #2563eb). For example, --color-primary: #2563eb on :root with color: var(--color-primary) on links means one change updates every primary-colored element. In a real app, toggling a [data-theme="dark"] attribute on html swaps --bg and --text variables without regenerating stylesheets.',
    code: `:root {
  --color-primary: #2563eb;
  --color-surface: #ffffff;
  --space-md: 1rem;
  --radius: 8px;
}

.card {
  background: var(--color-surface);
  padding: var(--space-md);
  border-radius: var(--radius);
  border: 1px solid color-mix(in srgb, var(--color-primary) 20%, transparent);
}

.btn-primary {
  background: var(--color-primary);
  color: white;
}`,
  },
  {
    id: 15,
    category: 'Fundamentals',
    question: 'What is the difference between CSS reset and normalize?',
    answer: 'A CSS reset aggressively strips all default browser styles — margins, padding, font sizes — so every element starts from zero and you build styles from scratch. Eric Meyer\'s Reset CSS and the universal selector approach (* { margin: 0; padding: 0; }) are classic examples. Normalize.css (and the modern @import "modern-normalize") takes a gentler approach: it preserves useful defaults while fixing cross-browser inconsistencies in headings, form elements, and line-height. Resets give a blank canvas but require more boilerplate; normalizes reduce surprises while keeping semantic elements readable out of the box. For example, a reset removes all h1 margins so you must add them, while normalize keeps h1 larger than h2 but consistent across Chrome and Safari. In a real app, most new projects import modern-normalize or Tailwind\'s preflight rather than a full reset.',
    code: `/* Reset approach — strip defaults */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Normalize approach — fix inconsistencies, keep semantics */
/* @import "modern-normalize"; */

body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

img, picture, video {
  max-width: 100%;
  display: block;
}`,
  },
]
