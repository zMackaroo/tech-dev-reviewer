import type { InterviewQuestion } from '../../types'

export const bestPracticesQuestions: InterviewQuestion[] = [
  {
    id: 93,
    category: 'Best Practices',
    question: 'Why is writing valid HTML important?',
    answer: 'Valid HTML follows the specification so browsers parse predictably, accessibility tools interpret structure correctly, and CSS selectors match as expected. Invalid nesting or duplicate ids create inconsistent DOM repair behavior across browsers. Validators like the W3C Nu Html Checker catch mistakes during development before they become subtle production bugs.',
    code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Valid document</title>
  </head>
  <body>
    <main>
      <h1>Contact us</h1>
      <form action="/contact" method="post">
        <label for="message">Message</label>
        <textarea id="message" name="message" required></textarea>
        <button type="submit">Send</button>
      </form>
    </main>
  </body>
</html>`,
  },
  {
    id: 94,
    category: 'Best Practices',
    question: 'What is progressive enhancement in HTML?',
    answer: 'Progressive enhancement builds a functional baseline with semantic HTML that works without JavaScript, then layers CSS for presentation and JavaScript for advanced interactions. Forms submit, links navigate, and native controls work before any bundle loads. This improves resilience on slow networks, restrictive environments, and for users who disable scripts.',
    code: `<!-- Works without JavaScript -->
<form action="/search" method="get" role="search">
  <label for="q">Search</label>
  <input type="search" id="q" name="q" required />
  <button type="submit">Search</button>
</form>

<!-- JavaScript enhances with autocomplete later -->
<script src="/search-enhance.js" defer></script>`,
  },
  {
    id: 95,
    category: 'Best Practices',
    question: 'What does separation of concerns mean for HTML?',
    answer: 'Separation of concerns keeps HTML for structure and content, CSS for presentation, and JavaScript for behavior — avoiding inline styles, presentation tables, and onclick handlers in markup when maintainable alternatives exist. Clean HTML is easier to restyle, test, and parse by assistive technology. External stylesheets and deferred scripts keep markup readable and cacheable.',
    code: `<!-- HTML: structure only -->
<button type="button" class="btn btn-primary" id="save-btn">
  Save changes
</button>

<!-- CSS: presentation -->
<style>
  .btn { padding: 0.5rem 1rem; border-radius: 4px; }
  .btn-primary { background: #2563eb; color: white; }
</style>

<!-- JS: behavior -->
<script src="/save.js" defer></script>`,
  },
  {
    id: 96,
    category: 'Best Practices',
    question: 'Why should you minimize unnecessary DOM depth and elements?',
    answer: 'Excessive wrapper divs increase DOM size, slowing rendering, memory use, and CSS selector matching while making markup harder to read and maintain. Each node adds layout and accessibility tree cost without semantic value. Prefer flat, semantic structures and remove divs that exist only for legacy CSS hooks.',
    code: `<!-- Avoid: unnecessary wrappers -->
<div class="wrapper">
  <div class="inner">
    <div class="content">
      <p>Hello world</p>
    </div>
  </div>
</div>

<!-- Prefer: minimal semantic markup -->
<article class="post">
  <p>Hello world</p>
</article>`,
  },
  {
    id: 97,
    category: 'Best Practices',
    question: 'What HTML security practices should you follow for links?',
    answer: 'Links opening new tabs with target="_blank" should include rel="noopener noreferrer" to prevent the new page from accessing window.opener and to reduce referrer leakage. Never inject unsanitized user HTML into the DOM; use textContent for plain text and trusted sanitizers for rich HTML. Validate href values to block javascript: URLs in user-generated links.',
    code: `<a
  href="https://external-docs.example.com"
  target="_blank"
  rel="noopener noreferrer"
>
  External documentation
</a>

<!-- User-generated content: sanitize before rendering -->
<!-- Never: <a href="javascript:alert(1)">click</a> -->`,
  },
  {
    id: 98,
    category: 'Best Practices',
    question: 'What performance hints can you embed in HTML?',
    answer: 'HTML head directives significantly affect load performance: defer and async on scripts, preload for critical assets, fetchpriority="high" on LCP images, and loading="lazy" on below-fold media. Place stylesheets in head and non-critical scripts before closing body or with defer. Avoid render-blocking resources without justification.',
    code: `<head>
  <link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="stylesheet" href="/critical.css" />
</head>
<body>
  <img src="/hero.webp" alt="Hero" fetchpriority="high" width="1200" height="600" />

  <script src="/analytics.js" defer></script>
  <script src="/app.js" defer></script>
</body>`,
  },
  {
    id: 99,
    category: 'Best Practices',
    question: 'How should scripts be loaded in HTML for best performance?',
    answer: 'Scripts without async or defer block HTML parsing while downloading and executing, delaying first paint. defer downloads in parallel and runs after HTML parsing in order; async downloads in parallel and runs as soon as ready, out of order. Module scripts defer by default and enable import syntax. Place critical path scripts with defer at end of body or in head with defer.',
    code: `<head>
  <!-- Defers until after parse, preserves order -->
  <script src="/vendor.js" defer></script>
  <script src="/app.js" defer></script>
</head>

<!-- Independent scripts, order not guaranteed -->
<script async src="/analytics.js"></script>

<!-- ES modules defer by default -->
<script type="module" src="/main.js"></script>`,
  },
  {
    id: 100,
    category: 'Best Practices',
    question: 'What HTML practices improve maintainability in large projects?',
    answer: 'Consistent patterns — semantic landmarks, BEM or utility class naming, componentized templates, and documented conventions — keep large HTML codebases manageable. Reuse partials or components instead of copy-pasting markup, and keep accessibility attributes in templates rather than adding them later. Indent consistently and comment major template sections for CMS authors.',
    code: `<!--
  Layout partial — shared across all pages
  Includes: charset, viewport, skip link, landmarks
-->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{{ page.title }} — Acme</title>
    <link rel="stylesheet" href="/app.css" />
  </head>
  <body>
    <a href="#main" class="skip-link">Skip to content</a>
    {{> header }}
    <main id="main">{{{ content }}}</main>
    {{> footer }}
    <script src="/app.js" defer></script>
  </body>
</html>`,
  },
]
