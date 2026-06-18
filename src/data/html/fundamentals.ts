import type { InterviewQuestion } from '../../types'

export const fundamentalsQuestions: InterviewQuestion[] = [
  {
    id: 1,
    category: 'Fundamentals',
    question: 'What is the role of HTML in web development?',
    answer: 'HTML (HyperText Markup Language) is the standard markup language for structuring content on the web. It defines the semantic skeleton of a page — headings, paragraphs, links, forms, images, and other elements that browsers render and assistive technologies interpret. HTML is not responsible for visual styling or interactive behavior; CSS handles presentation and JavaScript handles logic. For example, a product page uses HTML to mark up the title, price, and add-to-cart form while CSS and JavaScript enhance the look and interactivity. In a real app, a React or Next.js component ultimately renders HTML in the browser so search engines and screen readers can understand the page structure.',
    code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Product — Acme Store</title>
  </head>
  <body>
    <h1>Wireless Headphones</h1>
    <p>Price: $79.99</p>
    <button type="button">Add to cart</button>
  </body>
</html>`,
  },
  {
    id: 2,
    category: 'Fundamentals',
    question: 'What is a DOCTYPE declaration and why is it required?',
    answer: 'The DOCTYPE declaration tells the browser which HTML version or parsing mode to use when rendering the document. For modern HTML5, the declaration is simply <!DOCTYPE html>, which triggers standards mode instead of the legacy quirks mode that mimics old browser bugs. Without a correct DOCTYPE, layout and CSS behavior can differ unpredictably across browsers. For example, width calculations and box model defaults may behave differently in quirks mode. In a real app, every page template — whether a static index.html or a server-rendered layout — should include <!DOCTYPE html> as the very first line so CSS frameworks like Bootstrap or Tailwind render consistently.',
    code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My App</title>
  </head>
  <body>
    <main>
      <h1>Welcome</h1>
    </main>
  </body>
</html>`,
  },
  {
    id: 3,
    category: 'Fundamentals',
    question: 'What is the difference between an HTML element and a tag?',
    answer: 'A tag is the markup syntax written in angle brackets, such as <p> or </p>, while an element is the complete structure including the opening tag, content, and closing tag. Some elements like <img> are self-closing and have no inner content. Tags are the notation; elements are the conceptual building blocks the browser builds into the DOM tree. For example, <strong>important</strong> is one element made of an opening tag, text content, and a closing tag. In a real app, developers often say "add a div" when they mean adding a div element, even though the DOM API refers to Element nodes rather than tags.',
    code: `<!-- Tags: <p> and </p> -->
<!-- Element: the entire <p>...</p> structure -->
<p>This paragraph is one <strong>element</strong> containing another.</p>

<!-- Void element — one tag, no closing tag -->
<img src="/logo.png" alt="Company logo" />`,
  },
  {
    id: 4,
    category: 'Fundamentals',
    question: 'What are HTML attributes and how are they used?',
    answer: 'Attributes are name-value pairs on opening tags that configure element behavior, provide metadata, or link to external resources. Common examples include href on anchors, src on images, class for CSS hooks, and id for unique identification. Boolean attributes like disabled or required are present or absent rather than set to true or false strings. Attribute values are usually quoted with double or single quotes. For example, <a href="/docs" target="_blank" rel="noopener"> opens a link in a new tab safely. In a real app, data-testid attributes on buttons help end-to-end tests locate elements without affecting visual styling.',
    code: `<input
  type="email"
  id="user-email"
  name="email"
  class="form-input"
  placeholder="you@example.com"
  required
  autocomplete="email"
/>

<a href="https://docs.example.com" target="_blank" rel="noopener noreferrer">
  Read the docs
</a>`,
  },
  {
    id: 5,
    category: 'Fundamentals',
    question: 'What is the difference between block-level and inline elements?',
    answer: 'Block-level elements start on a new line and stretch to fill the available width of their container, stacking vertically by default. Inline elements flow within a line of text and only take up as much width as their content requires. Block examples include div, p, h1–h6, and section; inline examples include span, a, strong, and em. CSS display properties can change this default behavior, but the HTML distinction still matters for nesting rules and default semantics. For example, placing a div inside a p is invalid because paragraphs cannot contain block elements. In a real app, you wrap layout sections in block containers and use span for styling a phrase inside a sentence.',
    code: `<!-- Block elements stack vertically -->
<div>
  <p>This paragraph is a block element.</p>
  <p>So is this one — it starts on a new line.</p>
</div>

<!-- Inline elements flow within text -->
<p>
  Read our <a href="/terms">terms of service</a> and
  <strong>privacy policy</strong> before signing up.
</p>`,
  },
  {
    id: 6,
    category: 'Fundamentals',
    question: 'What are void (self-closing) elements in HTML?',
    answer: 'Void elements are HTML elements that cannot contain any child content and do not use a separate closing tag. Common void elements include img, br, hr, input, meta, link, and area. In HTML5, you write them as <img src="..." alt="..."> without a trailing slash, though XHTML-style self-closing syntax is also tolerated. Because they have no inner content, attributes carry all the configuration. For example, <input type="checkbox" checked> is a complete element with no closing tag. In a real app, meta tags in the head and img tags in a gallery are almost always void elements that must be properly attributed rather than wrapped around content.',
    code: `<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="stylesheet" href="/styles.css" />

<img src="/avatar.jpg" alt="User avatar" width="48" height="48" />
<input type="search" name="q" placeholder="Search..." />
<br />`,
  },
  {
    id: 7,
    category: 'Fundamentals',
    question: 'What are the key HTML nesting rules?',
    answer: 'HTML enforces a hierarchy: certain elements can only appear inside specific parents, and some combinations are invalid even if browsers try to auto-correct them. Block elements should not be nested inside inline elements, and interactive content like buttons should not wrap other interactive elements. Lists require li children, tables require tr inside thead or tbody, and form controls belong inside form or labeled fieldset contexts. For example, nesting a button inside an anchor creates confusing focus behavior and invalid markup. In a real app, linters like html-validate or ESLint plugins catch nesting mistakes during CI before they reach production.',
    code: `<!-- Valid nesting -->
<ul>
  <li><a href="/home">Home</a></li>
  <li><a href="/about">About</a></li>
</ul>

<table>
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alice</td>
      <td>Engineer</td>
    </tr>
  </tbody>
</table>`,
  },
  {
    id: 8,
    category: 'Fundamentals',
    question: 'How do HTML comments work and when should you use them?',
    answer: 'HTML comments are written as <!-- comment text --> and are ignored by the browser during rendering. They are useful for documenting template sections, temporarily disabling markup during development, or leaving notes for other developers. Comments are visible in View Source and should never contain secrets like API keys or passwords. For example, <!-- TODO: replace with dynamic nav component --> helps teams track incomplete sections in static prototypes. In a real app, build tools often strip comments from production HTML to reduce file size, so critical documentation belongs in source code rather than shipped markup.',
    code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Dashboard</title>
  </head>
  <body>
    <!-- Skip link for keyboard users -->
    <a href="#main" class="skip-link">Skip to content</a>

    <!-- Sidebar navigation injected by CMS -->
    <nav aria-label="Main">
      <!-- ... -->
    </nav>

    <main id="main">
      <h1>Dashboard</h1>
    </main>
  </body>
</html>`,
  },
  {
    id: 9,
    category: 'Fundamentals',
    question: 'What is HTML5 and what did it introduce?',
    answer: 'HTML5 is the living standard that modern browsers implement, superseding XHTML strictness with a more pragmatic, backward-compatible specification. It added semantic elements like header, nav, main, article, and section, native audio and video support, new form input types, and APIs often used alongside JavaScript. HTML5 also simplified the DOCTYPE and relaxed some syntax rules while maintaining accessibility requirements. For example, <video controls src="intro.mp4"> embeds media without Flash plugins. In a real app, HTML5 semantic tags and input types reduce dependency on div soup and JavaScript polyfills while improving accessibility and mobile support out of the box.',
    code: `<article>
  <header>
    <h1>HTML5 Native Features</h1>
    <time datetime="2024-06-15">June 15, 2024</time>
  </header>

  <video controls width="640" poster="/thumb.jpg">
    <source src="/intro.webm" type="video/webm" />
    <source src="/intro.mp4" type="video/mp4" />
  </video>

  <input type="date" name="start-date" />
  <input type="range" name="volume" min="0" max="100" />
</article>`,
  },
  {
    id: 10,
    category: 'Fundamentals',
    question: 'What is the difference between the head and body elements?',
    answer: 'The head element contains metadata and resources that are not displayed as page content — title, charset, viewport, linked stylesheets, scripts, and SEO tags. The body element contains all visible and interactive content the user sees: text, images, forms, and navigation. Browsers parse the head first to discover encoding, title, and critical resources before rendering body content. For example, a stylesheet linked in the head applies styles before the body paints, reducing flash of unstyled content. In a real app, the head holds analytics snippets, favicon links, and Open Graph tags while the body holds the React root div or server-rendered page markup.',
    code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Acme — Dashboard</title>
    <link rel="stylesheet" href="/app.css" />
    <link rel="icon" href="/favicon.ico" />
  </head>
  <body>
    <header>
      <h1>Dashboard</h1>
    </header>
    <main>
      <p>Welcome back, Alice.</p>
    </main>
    <script src="/app.js" defer></script>
  </body>
</html>`,
  },
  {
    id: 11,
    category: 'Fundamentals',
    question: 'Why is the lang attribute important on the html element?',
    answer: 'The lang attribute declares the primary language of the document, which helps screen readers choose the correct pronunciation and voice. Search engines use it for language targeting and hreflang coordination on multilingual sites. Browsers can offer translation prompts and apply language-specific hyphenation or font rendering when lang is set. For example, <html lang="en"> tells assistive tech to read English text with English rules, while lang="fr" switches pronunciation for French content. In a real app, a Next.js layout sets lang dynamically from the user locale so every page in the French locale renders as <html lang="fr"> for accessibility and SEO.',
    code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <title>English Homepage</title>
  </head>
  <body>
    <p>Welcome to our site.</p>
  </body>
</html>

<!-- Mixed language content within a page -->
<p>The French word <span lang="fr">bonjour</span> means hello.</p>`,
  },
  {
    id: 12,
    category: 'Fundamentals',
    question: 'What is character encoding and why declare charset UTF-8?',
    answer: 'Character encoding defines how bytes map to characters; UTF-8 can represent virtually every character in every language using a variable-length encoding. Declaring <meta charset="UTF-8"> in the head ensures the browser interprets the file correctly from the first bytes, preventing garbled text for accented characters, emoji, or non-Latin scripts. The charset meta tag should appear early in the head, ideally within the first 1024 bytes. For example, without UTF-8, a page displaying "café" or "你好" might show mojibake replacement characters. In a real app, setting UTF-8 in HTML, HTTP Content-Type headers, and your editor saves ensures consistent text display across APIs, databases, and the DOM.',
    code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>International Content</title>
  </head>
  <body>
    <h1>Welcome — Bienvenue — 欢迎</h1>
    <p>Emoji works too: 🎉</p>
  </body>
</html>`,
  },
  {
    id: 13,
    category: 'Fundamentals',
    question: 'What is the viewport meta tag and why is it essential for mobile?',
    answer: 'The viewport meta tag controls how mobile browsers scale and size the layout viewport relative to the device screen width. The standard declaration width=device-width, initial-scale=1 sets the layout width to the device width and prevents automatic zooming that makes desktop layouts unreadable on phones. Without it, mobile browsers assume a ~980px viewport and shrink the page, forcing users to pinch-zoom. For example, responsive CSS with media queries only works correctly when the viewport meta tag is present. In a real app, every HTML template includes this tag so Tailwind or Bootstrap breakpoints match actual device widths on iOS and Android.',
    code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Mobile-Friendly App</title>
  </head>
  <body>
    <main class="container">
      <h1>Responsive layout</h1>
    </main>
  </body>
</html>`,
  },
  {
    id: 14,
    category: 'Fundamentals',
    question: 'What is the document object model (DOM) and how does HTML relate to it?',
    answer: 'When a browser parses HTML, it builds the Document Object Model — a tree of nodes representing every element, attribute, and text fragment. HTML is the static markup source; the DOM is the live in-memory structure JavaScript can read and modify. Changing the DOM updates what users see without reloading the page. For example, clicking a button might use JavaScript to append a new li node to a ul element in the DOM. In a real app, frameworks like React maintain a virtual DOM and reconcile changes into the real DOM, but the underlying structure always originates from HTML — whether written by hand, server-rendered, or generated by JSX.',
    code: `<!-- HTML source -->
<ul id="todo-list">
  <li>Buy groceries</li>
</ul>

<!-- Equivalent DOM tree (conceptual):
  ul#todo-list
    └── li "Buy groceries"
-->

<!-- JavaScript can mutate the live DOM -->
<script>
  const list = document.getElementById("todo-list");
  const item = document.createElement("li");
  item.textContent = "Walk the dog";
  list.appendChild(item);
</script>`,
  },
  {
    id: 15,
    category: 'Fundamentals',
    question: 'What is the difference between id and class attributes?',
    answer: 'The id attribute must be unique within a page and identifies a single element for linking, scripting, or ARIA relationships. The class attribute can be shared across many elements and is primarily used as a hook for CSS styling and JavaScript selection. IDs have higher CSS specificity than classes, so overusing ids for styling makes overrides difficult. For example, id="main" marks the primary content landmark once per page while class="btn btn-primary" styles every primary button consistently. In a real app, ids anchor skip links and form label associations while classes implement design system variants across dozens of components.',
    code: `<main id="main-content">
  <h1>Checkout</h1>

  <button type="button" class="btn">Cancel</button>
  <button type="submit" class="btn btn-primary">Pay now</button>
</main>

<style>
  .btn { padding: 0.5rem 1rem; border-radius: 4px; }
  .btn-primary { background: #2563eb; color: white; }
</style>`,
  },
]
