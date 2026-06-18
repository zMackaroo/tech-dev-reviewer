import type { InterviewQuestion } from '../../types'

export const accessibilityQuestions: InterviewQuestion[] = [
  {
    id: 50,
    category: 'Accessibility',
    question: 'How do you write effective alt text for images?',
    answer: 'Effective alt text conveys the image purpose and essential content in concise plain language, usually under 125 characters. Functional images describe the action, like alt="Search" for a magnifying glass button; informative images describe the scene or data; decorative images use alt="". Avoid redundant phrases like "image of" because screen readers already announce the element type. For example, a chart alt might read "Bar chart: Q2 sales up 30% over Q1" rather than describing colors. In a real app, content editors follow an alt text guide and automated checks flag empty alt on informative images during CI.',
    code: `<!-- Informative -->
<img
  src="/chart.png"
  alt="Line chart showing monthly active users growing from 10k to 45k"
/>

<!-- Functional (inside a link) -->
<a href="/cart">
  <img src="/cart-icon.svg" alt="View shopping cart, 3 items" />
</a>

<!-- Decorative -->
<img src="/pattern.svg" alt="" />`,
  },
  {
    id: 51,
    category: 'Accessibility',
    question: 'When should you use ARIA and when should you avoid it?',
    answer: 'ARIA (Accessible Rich Internet Applications) fills gaps when native HTML cannot express role, state, or properties — custom widgets, live regions, or dynamic updates. The first rule of ARIA is to use native HTML elements first because they ship with built-in keyboard support and semantics. Adding ARIA to broken markup rarely fixes underlying accessibility problems and can make things worse if roles conflict with native semantics. For example, use button instead of div role="button" whenever possible. In a real app, a custom combobox needs ARIA, but a native select does not.',
    code: `<!-- Prefer native HTML -->
<button type="button" aria-expanded="false" aria-controls="menu">
  Menu
</button>

<!-- ARIA only when no native element fits -->
<div
  role="tablist"
  aria-label="Account settings"
>
  <button role="tab" aria-selected="true" aria-controls="panel-1" id="tab-1">
    Profile
  </button>
  <div role="tabpanel" id="panel-1" aria-labelledby="tab-1">
    Profile settings content...
  </div>
</div>`,
  },
  {
    id: 52,
    category: 'Accessibility',
    question: 'What is the role attribute and how is it used?',
    answer: 'The role attribute defines the type of widget or landmark an element represents for assistive technologies when no native element provides that semantics. Roles like navigation, alert, dialog, and tablist tell screen readers how to interact with custom UI. Roles must match expected child roles and keyboard behavior or users get confused. For example, role="alert" on a live error message announces it immediately without moving focus. In a real app, modal overlays use role="dialog" with aria-modal="true" and aria-labelledby pointing to the dialog title.',
    code: `<div role="alert">
  Payment failed. Please check your card details.
</div>

<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-desc"
>
  <h2 id="dialog-title">Confirm deletion</h2>
  <p id="dialog-desc">This action cannot be undone.</p>
  <button type="button">Cancel</button>
  <button type="button">Delete</button>
</div>`,
  },
  {
    id: 53,
    category: 'Accessibility',
    question: 'How does tabindex affect keyboard navigation?',
    answer: 'tabindex controls whether and in what order an element participates in sequential keyboard focus navigation. tabindex="0" adds a non-interactive element to the natural tab order; tabindex="-1" makes an element programmatically focusable but not tabbable, useful for moving focus to modals or main content. Positive tabindex values override natural order and are considered an anti-pattern. For example, a custom div widget needs tabindex="0" and key handlers to be keyboard operable. In a real app, after opening a dialog, JavaScript focuses the first focusable element or the dialog container with tabindex="-1".',
    code: `<a href="#main" class="skip-link">Skip to main content</a>

<main id="main" tabindex="-1">
  <h1>Dashboard</h1>
</main>

<!-- Custom interactive widget -->
<div
  role="slider"
  tabindex="0"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-valuenow="50"
  aria-label="Volume"
></div>`,
  },
  {
    id: 54,
    category: 'Accessibility',
    question: 'What are skip links and why include them?',
    answer: 'Skip links are the first focusable elements on a page, letting keyboard and screen reader users bypass repetitive navigation and jump directly to main content. They are usually visually hidden until focused, appearing at the top-left on Tab press. The link target is typically the main element or an id on primary content. For example, <a href="#main">Skip to main content</a> saves users from tabbing through dozens of nav links on every page load. In a real app, skip links are a WCAG best practice required by many government and enterprise accessibility policies.',
    code: `<body>
  <a href="#main-content" class="skip-link">
    Skip to main content
  </a>

  <header>
    <nav aria-label="Primary">
      <!-- many navigation links -->
    </nav>
  </header>

  <main id="main-content" tabindex="-1">
    <h1>Page title</h1>
  </main>
</body>`,
  },
  {
    id: 55,
    category: 'Accessibility',
    question: 'Why is heading hierarchy important for accessibility?',
    answer: 'Headings h1 through h6 create a document outline that screen reader users navigate by heading, jumping between sections efficiently. There should be one h1 per page describing the main topic, with h2 for major sections and h3 for subsections without skipping levels. Visual size should be controlled with CSS, not by choosing heading levels for appearance. For example, do not jump from h2 to h4 because a design looks better — use h3 with a CSS class instead. In a real app, automated accessibility audits flag skipped heading levels and multiple h1 elements as common failures.',
    code: `<main>
  <h1>Product Documentation</h1>

  <section>
    <h2>Getting Started</h2>
    <h3>Installation</h3>
    <h3>Configuration</h3>
  </section>

  <section>
    <h2>API Reference</h2>
    <h3>Authentication</h3>
    <h3>Endpoints</h3>
  </section>
</main>`,
  },
  {
    id: 56,
    category: 'Accessibility',
    question: 'What is focus management and when is it needed?',
    answer: 'Focus management controls where keyboard focus moves after dynamic UI changes — opening modals, closing dialogs, deleting list items, or navigating SPA routes. Focus should move logically to new content and return to a sensible trigger when overlays close so users are not stranded. The document.activeElement and element.focus() APIs move focus programmatically, often to elements with tabindex="-1". For example, opening a modal moves focus to the dialog title or first input, and closing returns focus to the button that opened it. In a real app, React libraries like Radix UI handle focus traps in dialogs while route changes move focus to h1.',
    code: `<!-- Dialog opens: focus moves inside -->
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="modal-title"
  id="confirm-dialog"
>
  <h2 id="modal-title">Delete item?</h2>
  <button type="button" id="confirm-btn">Delete</button>
  <button type="button" id="cancel-btn">Cancel</button>
</div>

<!-- On close: JavaScript returns focus to trigger button -->
<button type="button" id="open-dialog-btn" aria-haspopup="dialog">
  Delete
</button>`,
  },
  {
    id: 57,
    category: 'Accessibility',
    question: 'What is aria-label and when should you use it?',
    answer: 'aria-label provides an accessible name for an element when visible text is absent or insufficient, read by screen readers instead of or in addition to visible content. Use it on icon buttons, landmark regions without headings, or inputs where a visible label is impractical. Prefer visible text or aria-labelledby referencing visible text over aria-label when possible because visible labels help all users. For example, a close button with only an X icon needs aria-label="Close dialog". In a real app, icon-only toolbar buttons always include aria-label while text buttons do not need it.',
    code: `<button type="button" aria-label="Close dialog">
  <svg aria-hidden="true"><!-- X icon --></svg>
</button>

<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/products">Products</a></li>
    <li aria-current="page">Headphones</li>
  </ol>
</nav>

<input type="search" aria-label="Search documentation" name="q" />`,
  },
  {
    id: 58,
    category: 'Accessibility',
    question: 'What are ARIA live regions and aria-live?',
    answer: 'Live regions announce dynamic content changes to screen readers without moving keyboard focus, using aria-live="polite" or aria-live="assertive" on a container. Polite waits for the user to finish current speech; assertive interrupts immediately for urgent messages like errors. role="status" and role="alert" imply live region behavior. For example, a form validation summary with aria-live="polite" announces errors after submit without a page reload. In a real app, toast notifications, search result counts, and chat message streams use live regions so assistive tech users hear updates.',
    code: `<div aria-live="polite" aria-atomic="true" id="search-status">
  <!-- Updated by JavaScript: "12 results found" -->
</div>

<div role="alert">
  Session expired. Please sign in again.
</div>

<div aria-live="assertive" id="error-announcer">
  <!-- Critical errors announced immediately -->
</div>`,
  },
  {
    id: 59,
    category: 'Accessibility',
    question: 'Why must every form control have an accessible name?',
    answer: 'An accessible name is what screen readers announce for a control, derived from associated label elements, aria-label, aria-labelledby, or placeholder (least reliable). Without a name, users hear "edit text blank" and cannot understand the field purpose. Groups of radios need fieldset/legend in addition to individual labels. For example, a visible label linked with for/id gives both mouse users a click target and screen reader users a proper name. In a real app, accessibility testing with VoiceOver or NVDA catches unlabeled inputs that visual inspection misses.',
    code: `<label for="email">Email address</label>
<input type="email" id="email" name="email" required />

<!-- aria-labelledby when label text is split -->
<span id="phone-label">Phone number</span>
<input
  type="tel"
  id="phone"
  aria-labelledby="phone-label phone-hint"
/>
<span id="phone-hint">Include area code</span>

<fieldset>
  <legend>Notification preferences</legend>
  <label><input type="checkbox" name="email-notify" /> Email</label>
  <label><input type="checkbox" name="sms-notify" /> SMS</label>
</fieldset>`,
  },
  {
    id: 60,
    category: 'Accessibility',
    question: 'How does color contrast relate to HTML markup?',
    answer: 'While contrast is primarily a CSS concern, HTML structure determines where text lives and whether information is conveyed by color alone. Do not rely solely on red/green text to indicate errors — pair color with icons, text labels, or aria-invalid on inputs. Semantic HTML for errors like role="alert" ensures messages are announced regardless of color visibility. For example, invalid fields should show an explicit error message, not just a red border. In a real app, design tokens enforce WCAG AA contrast ratios (4.5:1 for normal text) and HTML marks required fields with text, not just asterisk color.',
    code: `<label for="username">Username <span aria-hidden="true">*</span></label>
<input
  type="text"
  id="username"
  name="username"
  required
  aria-required="true"
  aria-invalid="true"
  aria-describedby="username-error"
/>
<p id="username-error" role="alert">
  <span aria-hidden="true">⚠</span>
  Username is already taken.
</p>`,
  },
  {
    id: 61,
    category: 'Accessibility',
    question: 'What is aria-hidden and when is it appropriate?',
    answer: 'aria-hidden="true" removes an element and its descendants from the accessibility tree, hiding decorative or redundant content from screen readers while keeping it visible on screen. Common uses include decorative icons adjacent to visible text, duplicate link text, or off-screen content. Never hide focusable or essential content with aria-hidden because keyboard users can still reach invisible items. For example, a "Download" button with a PDF icon hides the icon with aria-hidden="true" since the word Download is sufficient. In a real app, icon-plus-text buttons hide the SVG from assistive tech to prevent double announcement.',
    code: `<button type="button">
  <svg aria-hidden="true" width="16" height="16">
    <!-- download icon paths -->
  </svg>
  Download report
</button>

<p>
  <span aria-hidden="true">★★★★☆</span>
  <span>4 out of 5 stars (128 reviews)</span>
</p>`,
  },
  {
    id: 62,
    category: 'Accessibility',
    question: 'What is aria-describedby and how does it differ from aria-labelledby?',
    answer: 'aria-labelledby references elements that provide the accessible name (title) of a control, while aria-describedby references elements with supplementary description read after the name. Multiple ids can be space-separated in both attributes. Labels should be concise; descriptions can include hints, format requirements, or error details. For example, a password field uses aria-labelledby for "Password" and aria-describedby for "Must be at least 8 characters". In a real app, hint text and error messages link via aria-describedby so screen readers announce them in the correct order.',
    code: `<label id="pwd-label" for="password">Password</label>
<p id="pwd-hint">Must be at least 8 characters with one number.</p>
<input
  type="password"
  id="password"
  aria-labelledby="pwd-label"
  aria-describedby="pwd-hint"
  minlength="8"
/>`,
  },
  {
    id: 63,
    category: 'Accessibility',
    question: 'How do you make data tables accessible in HTML?',
    answer: 'Accessible tables use th for header cells with scope="col" or scope="row" so screen readers associate data cells with headers. A caption element provides the table title, and the thead/tbody structure separates header rows from data. Complex tables may need id and headers attributes on td linking to multiple th ids. For example, scope="col" on Month and scope="row" on Revenue clarifies a financial summary. In a real app, avoid using tables for layout — reserve them for tabular data and test with screen reader table navigation commands.',
    code: `<table>
  <caption>Q2 Sales by Region</caption>
  <thead>
    <tr>
      <th scope="col">Region</th>
      <th scope="col">Revenue</th>
      <th scope="col">Growth</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">North America</th>
      <td>$1.2M</td>
      <td>+12%</td>
    </tr>
    <tr>
      <th scope="row">Europe</th>
      <td>$890K</td>
      <td>+8%</td>
    </tr>
  </tbody>
</table>`,
  },
  {
    id: 64,
    category: 'Accessibility',
    question: 'What is the purpose of aria-current?',
    answer: 'The aria-current attribute indicates the item that represents the current page, step, or selection within a set of related elements. Common values include page for navigation links, step for wizard progress, and true for selected items in a list. It helps screen reader users identify where they are without relying on visual styling alone. For example, aria-current="page" on the active nav link announces "current page" in addition to the link text. In a real app, server-rendered layouts set aria-current on the matching route link in the navigation component.',
    code: `<nav aria-label="Primary">
  <ul>
    <li><a href="/" aria-current="page">Home</a></li>
    <li><a href="/products">Products</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>

<ol aria-label="Checkout progress">
  <li aria-current="step">Shipping</li>
  <li>Payment</li>
  <li>Review</li>
</ol>`,
  },
]
