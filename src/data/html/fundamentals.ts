import type { InterviewQuestion } from '../../types'

export const fundamentalsQuestions: InterviewQuestion[] = [
  {
    id: 1,
    category: 'Fundamentals',
    question: 'What is the role of HTML in web development?',
    answer: 'HTML (HyperText Markup Language) is the standard markup language for structuring content on the web. It defines the semantic skeleton of a page — headings, paragraphs, links, forms, images, and other elements that browsers render and assistive technologies interpret. HTML is not responsible for visual styling or interactive behavior; CSS handles presentation and JavaScript handles logic.',
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
    answer: 'The DOCTYPE declaration tells the browser which HTML version or parsing mode to use when rendering the document. For modern HTML5, the declaration is simply <!DOCTYPE html>, which triggers standards mode instead of the legacy quirks mode that mimics old browser bugs. Without a correct DOCTYPE, layout and CSS behavior can differ unpredictably across browsers.',
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
    answer: 'A tag is the markup syntax written in angle brackets, such as <p> or </p>, while an element is the complete structure including the opening tag, content, and closing tag. Some elements like <img> are self-closing and have no inner content. Tags are the notation; elements are the conceptual building blocks the browser builds into the DOM tree.',
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
    answer: 'Attributes are name-value pairs on opening tags that configure element behavior, provide metadata, or link to external resources. Common examples include href on anchors, src on images, class for CSS hooks, and id for unique identification. Boolean attributes like disabled or required are present or absent rather than set to true or false strings. Attribute values are usually quoted with double or single quotes.',
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
    answer: 'Block-level elements start on a new line and stretch to fill the available width of their container, stacking vertically by default. Inline elements flow within a line of text and only take up as much width as their content requires. Block examples include div, p, h1–h6, and section; inline examples include span, a, strong, and em. CSS display properties can change this default behavior, but the HTML distinction still matters for nesting rules and default semantics.',
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
    answer: 'Void elements are HTML elements that cannot contain any child content and do not use a separate closing tag. Common void elements include img, br, hr, input, meta, link, and area. In HTML5, you write them as <img src="..." alt="..."> without a trailing slash, though XHTML-style self-closing syntax is also tolerated. Because they have no inner content, attributes carry all the configuration.',
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
    answer: 'HTML enforces a hierarchy: certain elements can only appear inside specific parents, and some combinations are invalid even if browsers try to auto-correct them. Block elements should not be nested inside inline elements, and interactive content like buttons should not wrap other interactive elements. Lists require li children, tables require tr inside thead or tbody, and form controls belong inside form or labeled fieldset contexts.',
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
    answer: 'HTML comments are written as <!-- comment text --> and are ignored by the browser during rendering. They are useful for documenting template sections, temporarily disabling markup during development, or leaving notes for other developers. Comments are visible in View Source and should never contain secrets like API keys or passwords.',
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
    answer: 'HTML5 is the living standard that modern browsers implement, superseding XHTML strictness with a more pragmatic, backward-compatible specification. It added semantic elements like header, nav, main, article, and section, native audio and video support, new form input types, and APIs often used alongside JavaScript. HTML5 also simplified the DOCTYPE and relaxed some syntax rules while maintaining accessibility requirements.',
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
    answer: 'The head element contains metadata and resources that are not displayed as page content — title, charset, viewport, linked stylesheets, scripts, and SEO tags. The body element contains all visible and interactive content the user sees: text, images, forms, and navigation. Browsers parse the head first to discover encoding, title, and critical resources before rendering body content.',
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
    answer: 'The lang attribute declares the primary language of the document, which helps screen readers choose the correct pronunciation and voice. Search engines use it for language targeting and hreflang coordination on multilingual sites. Browsers can offer translation prompts and apply language-specific hyphenation or font rendering when lang is set.',
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
    answer: 'Character encoding defines how bytes map to characters; UTF-8 can represent virtually every character in every language using a variable-length encoding. Declaring <meta charset="UTF-8"> in the head ensures the browser interprets the file correctly from the first bytes, preventing garbled text for accented characters, emoji, or non-Latin scripts. The charset meta tag should appear early in the head, ideally within the first 1024 bytes.',
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
    answer: 'The viewport meta tag controls how mobile browsers scale and size the layout viewport relative to the device screen width. The standard declaration width=device-width, initial-scale=1 sets the layout width to the device width and prevents automatic zooming that makes desktop layouts unreadable on phones. Without it, mobile browsers assume a ~980px viewport and shrink the page, forcing users to pinch-zoom.',
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
    answer: 'When a browser parses HTML, it builds the Document Object Model — a tree of nodes representing every element, attribute, and text fragment. HTML is the static markup source; the DOM is the live in-memory structure JavaScript can read and modify. Changing the DOM updates what users see without reloading the page.',
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
    answer: 'The id attribute must be unique within a page and identifies a single element for linking, scripting, or ARIA relationships. The class attribute can be shared across many elements and is primarily used as a hook for CSS styling and JavaScript selection. IDs have higher CSS specificity than classes, so overusing ids for styling makes overrides difficult.',
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
