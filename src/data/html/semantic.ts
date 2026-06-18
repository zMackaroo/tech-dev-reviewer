import type { InterviewQuestion } from '../../types'

export const semanticQuestions: InterviewQuestion[] = [
  {
    id: 16,
    category: 'Semantic HTML',
    question: 'What is semantic HTML and why does it matter?',
    answer: 'Semantic HTML uses elements that describe the meaning and role of content, not just its visual appearance. Tags like header, nav, main, and article tell browsers, search engines, and assistive technologies what each section represents. This improves accessibility, SEO, and code maintainability compared to wrapping everything in generic divs.',
    code: `<body>
  <header>
    <h1>Tech Blog</h1>
    <nav aria-label="Primary">
      <a href="/">Home</a>
      <a href="/articles">Articles</a>
    </nav>
  </header>

  <main>
    <article>
      <h2>Understanding Semantic HTML</h2>
      <p>Content with clear meaning...</p>
    </article>
  </main>

  <footer>
    <p>&copy; 2024 Tech Blog</p>
  </footer>
</body>`,
  },
  {
    id: 17,
    category: 'Semantic HTML',
    question: 'When should you use the header element?',
    answer: 'The header element represents introductory content or navigational aids for its nearest sectioning ancestor — typically the page or an article. It often contains a logo, site title, and navigation but is not limited to the top of the page; articles can have their own header with a title and byline. You can have multiple header elements on one page, one per section or article.',
    code: `<header>
  <a href="/" aria-label="Acme home">
    <img src="/logo.svg" alt="" />
  </a>
  <nav aria-label="Primary">
    <ul>
      <li><a href="/products">Products</a></li>
      <li><a href="/pricing">Pricing</a></li>
    </ul>
  </nav>
</header>

<article>
  <header>
    <h1>Q2 Product Update</h1>
    <p>By <span>Jane Doe</span> · <time datetime="2024-04-01">April 1, 2024</time></p>
  </header>
  <p>We shipped three major features...</p>
</article>`,
  },
  {
    id: 18,
    category: 'Semantic HTML',
    question: 'What is the purpose of the nav element?',
    answer: 'The nav element wraps a section of navigation links — major site sections, table of contents, or pagination — that help users move around the site. Not every group of links needs nav; footer legal links can use nav but minor inline links usually do not. Multiple nav elements are valid when labeled with aria-label to distinguish them.',
    code: `<nav aria-label="Primary">
  <ul>
    <li><a href="/" aria-current="page">Home</a></li>
    <li><a href="/docs">Docs</a></li>
    <li><a href="/blog">Blog</a></li>
  </ul>
</nav>

<nav aria-label="Pagination">
  <a href="/page/1">Previous</a>
  <a href="/page/3">Next</a>
</nav>`,
  },
  {
    id: 19,
    category: 'Semantic HTML',
    question: 'Why should every page have exactly one main element?',
    answer: 'The main element identifies the dominant content of the document — the topic-specific material unique to that page, excluding repeated headers, footers, and sidebars. There should be only one visible main per page so assistive technology users can jump directly to primary content via the main landmark. Content inside main should not include elements that repeat across pages like global navigation.',
    code: `<body>
  <header>...</header>

  <main id="main">
    <h1>Wireless Keyboard</h1>
    <p>Mechanical switches, Bluetooth 5.0...</p>
    <button type="button">Add to cart</button>
  </main>

  <aside aria-label="Related products">...</aside>
  <footer>...</footer>
</body>`,
  },
  {
    id: 20,
    category: 'Semantic HTML',
    question: 'What belongs in the footer element?',
    answer: 'The footer element holds footer information for its nearest sectioning content — copyright notices, author info, related links, or legal text. Like header, footer can appear at the page level or within an article. It does not have to sit at the visual bottom if CSS repositioning is used, but semantically it represents supplementary closing information.',
    code: `<footer>
  <nav aria-label="Footer">
    <a href="/privacy">Privacy</a>
    <a href="/terms">Terms</a>
    <a href="/contact">Contact</a>
  </nav>
  <p>&copy; 2024 Acme Inc. All rights reserved.</p>
  <address>
    123 Market St, San Francisco, CA
  </address>
</footer>`,
  },
  {
    id: 21,
    category: 'Semantic HTML',
    question: 'What is the difference between article and section elements?',
    answer: 'An article is self-contained, independently distributable content — a blog post, news story, forum post, or product card that could be syndicated or read on its own. A section is a thematic grouping of content within a document, typically with its own heading, but not necessarily standalone. A page can have multiple articles, and an article can contain sections for its subtopics.',
    code: `<main>
  <h1>Engineering Blog</h1>

  <article>
    <h2>Scaling Our API</h2>
    <section>
      <h3>Problem</h3>
      <p>Traffic grew 10x in six months...</p>
    </section>
    <section>
      <h3>Solution</h3>
      <p>We introduced caching and rate limiting...</p>
    </section>
  </article>

  <article>
    <h2>Design System Launch</h2>
    <p>A shorter standalone post...</p>
  </article>
</main>`,
  },
  {
    id: 22,
    category: 'Semantic HTML',
    question: 'When should you use the aside element?',
    answer: 'The aside element represents content tangentially related to the content around it — sidebars, pull quotes, advertising, related links, or glossary definitions. It is not primary content but provides context or supplementary information. Asides can be nested inside article or at the page level next to main.',
    code: `<main>
  <article>
    <h1>Deploying with Docker</h1>
    <p>Step-by-step deployment guide...</p>

    <aside aria-label="Related reading">
      <h2>See also</h2>
      <ul>
        <li><a href="/kubernetes">Kubernetes guide</a></li>
        <li><a href="/ci-cd">CI/CD pipeline</a></li>
      </ul>
    </aside>
  </article>
</main>`,
  },
  {
    id: 23,
    category: 'Semantic HTML',
    question: 'What is the difference between div and semantic elements?',
    answer: 'A div is a generic container with no inherent meaning — useful when no semantic element fits or purely for styling hooks. Semantic elements communicate structure and purpose to machines and humans reading the source. Relying only on divs forces assistive tech and search engines to infer meaning from class names, which is unreliable.',
    code: `<!-- Avoid: meaning only in class names -->
<div class="header">
  <div class="nav">...</div>
</div>

<!-- Prefer: semantic landmarks -->
<header>
  <nav aria-label="Primary">...</nav>
</header>

<!-- Acceptable: layout wrapper with no semantic role -->
<div class="grid-layout">
  <main>...</main>
  <aside>...</aside>
</div>`,
  },
  {
    id: 24,
    category: 'Semantic HTML',
    question: 'What are ARIA landmarks and how do semantic elements relate to them?',
    answer: 'Landmarks are regions of a page that assistive technologies expose for quick navigation — banner, navigation, main, complementary, contentinfo, and others. HTML5 semantic elements map to implicit ARIA roles: header to banner, nav to navigation, main to main, aside to complementary, and footer to contentinfo in page context. Using native semantic elements is preferred over adding role attributes on divs because they require less markup and are less error-prone.',
    code: `<body>
  <!-- Implicit landmarks from semantic HTML -->
  <header>        <!-- role="banner" (when not nested) -->
  <nav>           <!-- role="navigation" -->
  <main>          <!-- role="main" -->
  <aside>         <!-- role="complementary" -->
  <footer>        <!-- role="contentinfo" (when not nested) -->
</body>`,
  },
  {
    id: 25,
    category: 'Semantic HTML',
    question: 'How do figure and figcaption work together?',
    answer: 'The figure element wraps self-contained content referenced from the main flow — images, diagrams, code listings, or charts — with an optional figcaption providing a caption or legend. Figure does not have to contain an image; it can wrap a table snippet or block of code. Figcaption must be the first or last child of figure.',
    code: `<figure>
  <img
    src="/charts/q2-revenue.png"
    alt="Bar chart showing Q2 revenue up 24%"
    width="600"
    height="400"
  />
  <figcaption>
    Figure 1: Q2 revenue increased 24% year over year.
  </figcaption>
</figure>

<figure>
  <pre><code>npm install @acme/sdk</code></pre>
  <figcaption>Install the Acme SDK via npm.</figcaption>
</figure>`,
  },
  {
    id: 26,
    category: 'Semantic HTML',
    question: 'What is the time element and how is datetime used?',
    answer: 'The time element represents a specific period in time — a date, time, duration, or timezone — in a human-readable format with a machine-readable datetime attribute. The datetime value follows ISO 8601 formats like 2024-06-15 or 2024-06-15T14:30:00Z for parsers and calendar integrations. If datetime is omitted, the element text must be a valid date string.',
    code: `<article>
  <h1>Conference Recap</h1>
  <p>
    Published on
    <time datetime="2024-03-20">March 20, 2024</time>
  </p>
  <p>
    Event duration:
    <time datetime="PT2H30M">2 hours 30 minutes</time>
  </p>
</article>`,
  },
  {
    id: 27,
    category: 'Semantic HTML',
    question: 'What is the address element and when is it appropriate?',
    answer: 'The address element provides contact information for the nearest article or body element — typically the author or organization responsible for the content. It can include a physical address, email link, phone number, or social profile URLs. Address is not for arbitrary postal addresses unrelated to the document author; use p for random street addresses in content.',
    code: `<footer>
  <p>&copy; 2024 Acme Publishing</p>
  <address>
    Contact:
    <a href="mailto:hello@acme.com">hello@acme.com</a>
    ·
    <a href="tel:+14155550100">(415) 555-0100</a>
  </address>
</footer>

<article>
  <footer>
    <address>
      Written by <a href="/authors/jane">Jane Doe</a>
    </address>
  </footer>
</article>`,
  },
]
