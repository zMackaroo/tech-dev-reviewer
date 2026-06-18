import type { InterviewQuestion } from '../../types'

export const advancedQuestions: InterviewQuestion[] = [
  {
    id: 85,
    category: 'Advanced HTML',
    question: 'How do details and summary create native disclosure widgets?',
    answer: 'The details element creates a disclosure widget that shows or hides content, with summary providing the always-visible clickable label. The open attribute sets the initial expanded state without JavaScript. Native disclosure works with keyboard and screen readers out of the box. For example, an FAQ section uses details for each question with summary as the question text and the answer in the body. In a real app, details/summary powers accessible accordions for help content before JavaScript adds animation or multi-expand behavior.',
    code: `<details>
  <summary>What is your return policy?</summary>
  <p>
    Returns are accepted within 30 days of purchase with original
    packaging. Refunds process within 5 business days.
  </p>
</details>

<details open>
  <summary>Shipping information</summary>
  <p>Free standard shipping on orders over $50.</p>
</details>`,
  },
  {
    id: 86,
    category: 'Advanced HTML',
    question: 'What is the dialog element and how is it used?',
    answer: 'The dialog element represents a modal or non-modal dialog box with built-in showModal(), show(), and close() JavaScript methods. showModal() displays a top-layer modal with backdrop and focus trap behavior in supporting browsers; the open attribute reflects visibility. Include a visible title and focusable controls for accessibility. For example, a confirmation dialog uses dialog with a form method="dialog" for native close behavior. In a real app, native dialog reduces custom overlay code though polyfills or libraries may still be needed for full browser support and styling control.',
    code: `<dialog id="confirm-dialog">
  <h2>Delete project?</h2>
  <p>This will permanently delete all files.</p>
  <form method="dialog">
    <button value="cancel">Cancel</button>
    <button value="confirm">Delete</button>
  </form>
</dialog>

<button type="button" onclick="document.getElementById('confirm-dialog').showModal()">
  Delete project
</button>`,
  },
  {
    id: 87,
    category: 'Advanced HTML',
    question: 'What is the template element used for?',
    answer: 'The template element holds HTML fragments that are not rendered on page load — content is inert, scripts do not run, and images do not fetch until cloned into the live DOM via JavaScript. It is ideal for client-side rendering patterns, repeating list items, or web component internals. The content property or cloneNode(true) copies template content into the document. For example, a todo app stores an li template cloned for each new task. In a real app, template pairs with custom elements or vanilla JS list rendering without string-based HTML injection.',
    code: `<template id="card-template">
  <article class="card">
    <h3 class="card-title"></h3>
    <p class="card-body"></p>
  </article>
</template>

<ul id="card-list"></ul>

<script>
  const template = document.getElementById("card-template");
  const clone = template.content.cloneNode(true);
  clone.querySelector(".card-title").textContent = "Hello";
  document.getElementById("card-list").appendChild(clone);
</script>`,
  },
  {
    id: 88,
    category: 'Advanced HTML',
    question: 'What are slot elements in web components?',
    answer: 'Slots are placeholders inside a web component shadow DOM where light DOM content from the host element gets projected. Named slots use the name attribute to map specific children; the default slot catches unassigned content. This enables reusable component shells with user-supplied inner markup. For example, a card component slots a title and body from children passed by the consumer. In a real app, design system web components use slot for flexible composition similar to React children props but standardized in native HTML.',
    code: `<!-- Component definition (JavaScript custom element) -->
<template id="alert-template">
  <div class="alert" role="alert">
    <slot name="title"></slot>
    <slot></slot>
  </div>
</template>

<!-- Usage in HTML -->
<acme-alert>
  <span slot="title">Warning</span>
  <p>Your trial expires in 3 days.</p>
</acme-alert>`,
  },
  {
    id: 89,
    category: 'Advanced HTML',
    question: 'What are data attributes and how are they used?',
    answer: 'Data attributes are custom attributes prefixed with data- that store extra information on HTML elements accessible to CSS and JavaScript without non-standard attributes. Names after data- should be lowercase with hyphens; values are always strings read via dataset in JavaScript, which camelCases property names. For example, data-user-id="42" becomes element.dataset.userId in JS. In a real app, data attributes hook behavior in progressive enhancement scripts, store configuration for analytics, or target elements in Cypress tests with data-testid.',
    code: `<button
  type="button"
  data-action="add-to-cart"
  data-product-id="sku-123"
  data-price="29.99"
>
  Add to cart
</button>

<style>
  [data-action="add-to-cart"] { cursor: pointer; }
</style>

<script>
  // JS: button.dataset.productId === "sku-123"
</script>`,
  },
  {
    id: 90,
    category: 'Advanced HTML',
    question: 'What does contenteditable do and what are the tradeoffs?',
    answer: 'The contenteditable attribute makes an element editable by the user in the browser, behaving like a rich text area with innerHTML mutations on input. It accepts true, false, or plaintext-only to restrict formatting. Unlike textarea, it supports mixed formatting but is harder to control, sanitize, and make accessible. For example, a simple notes widget might use div contenteditable="true" for inline editing. In a real app, rich text editors usually wrap contenteditable in libraries like ProseMirror or TipTap rather than using it raw in production.',
    code: `<label for="editor">Meeting notes</label>
<div
  id="editor"
  contenteditable="true"
  role="textbox"
  aria-multiline="true"
  aria-labelledby="editor-label"
>
  <p>Start typing your notes here...</p>
</div>

<!-- Plain text only — no rich formatting -->
<p contenteditable="plaintext-only">Edit this plain text.</p>`,
  },
  {
    id: 91,
    category: 'Advanced HTML',
    question: 'What is the download attribute on anchor elements?',
    answer: 'The download attribute on an a element hints that the linked resource should be downloaded rather than navigated to, optionally with a suggested filename. It works for same-origin URLs and blob URLs reliably; cross-origin behavior depends on CORS headers. Without download, the browser may preview PDFs or images instead of saving. For example, a href="/report.pdf" download="Q2-report.pdf" saves with a friendly filename. In a real app, export buttons generate blob URLs with download attributes for CSV or PDF client-side exports.',
    code: `<a href="/exports/invoices.csv" download="invoices-june-2024.csv">
  Download invoices (CSV)
</a>

<a href="/assets/brand-kit.zip" download>
  Download brand kit
</a>`,
  },
  {
    id: 92,
    category: 'Advanced HTML',
    question: 'What are preload and prefetch link relations?',
    answer: 'Link rel="preload" tells the browser to fetch a high-priority resource early because it will be needed soon — fonts, critical scripts, or hero images. rel="prefetch" fetches low-priority resources likely needed on a future navigation, warming the cache for the next page. rel="preconnect" opens early connections to origins. Use as="script", as="style", or as="font" with preload so the browser knows the resource type. For example, preload a WOFF2 font with crossorigin for faster text rendering. In a real app, performance budgets define which assets get preload in the document head versus lazy loading.',
    code: `<head>
  <!-- High priority: needed on this page -->
  <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/hero.jpg" as="image" />

  <!-- Early connection to API origin -->
  <link rel="preconnect" href="https://api.acme.com" />

  <!-- Low priority: likely next page -->
  <link rel="prefetch" href="/dashboard" />
</head>`,
  },
]
