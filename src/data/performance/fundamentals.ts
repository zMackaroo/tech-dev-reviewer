import type { InterviewQuestion } from '../../types'

export const fundamentalsQuestions: InterviewQuestion[] = [
  {
    id: 1,
    category: 'Performance Fundamentals',
    question: 'What is the critical rendering path?',
    answer: 'The critical rendering path is the sequence of steps the browser takes to convert HTML, CSS, and JavaScript into pixels on the screen. It includes parsing HTML into the DOM, fetching and parsing CSS into the CSSOM, combining them into a render tree, running layout to compute geometry, and painting pixels. Optimizing this path means reducing the number of critical resources and the bytes needed to render above-the-fold content.',
    code: `<!-- Critical path: HTML → DOM, CSS → CSSOM → Render Tree → Layout → Paint -->
<link rel="stylesheet" href="/critical.css" />
<script defer src="/app.js"></script>

<body>
  <header class="hero"><!-- above-the-fold --></header>
  <main><!-- below-the-fold loads later --></main>
</body>`,
  },
  {
    id: 2,
    category: 'Performance Fundamentals',
    question: 'What are the main steps in the critical rendering path?',
    answer: 'The browser first constructs the DOM by parsing HTML, then builds the CSSOM by parsing stylesheets. These merge into a render tree containing only visible nodes with computed styles. Layout calculates exact positions and sizes, paint fills in pixels, and compositing layers elements for GPU-accelerated transforms. JavaScript can block parsing when encountered without defer or async, delaying every downstream step.',
    code: `// Simplified pipeline
// 1. DOM construction (HTML parsing)
// 2. CSSOM construction (CSS parsing)
// 3. Render tree = DOM + CSSOM (visible nodes only)
// 4. Layout (reflow) — compute geometry
// 5. Paint — fill pixels
// 6. Composite — GPU layers`,
  },
  {
    id: 3,
    category: 'Performance Fundamentals',
    question: 'What are render-blocking resources?',
    answer: 'Render-blocking resources are CSS and JavaScript files that prevent the browser from painting content until they are downloaded and processed. CSS blocks rendering because the browser needs styles before it can build the render tree and paint. Synchronous JavaScript in the head blocks HTML parsing until the script is fetched, parsed, and executed. Eliminating or deferring these resources is one of the highest-impact first optimizations.',
    code: `<!-- Render-blocking (avoid in head without defer/async) -->
<link rel="stylesheet" href="/all-styles.css" />
<script src="/heavy-lib.js"></script>

<!-- Non-blocking alternatives -->
<link rel="preload" href="/critical.css" as="style"
      onload="this.onload=null;this.rel='stylesheet'" />
<script defer src="/app.js"></script>`,
  },
  {
    id: 4,
    category: 'Performance Fundamentals',
    question: 'What is the RAIL model?',
    answer: 'RAIL is a user-centric performance model standing for Response, Animation, Idle, and Load. Response targets under 100ms for input feedback so users feel instant interaction. Animation aims for 60fps, meaning each frame must complete within 16ms. Idle work should be chunked into 50ms blocks so the main thread stays responsive. Load focuses on delivering meaningful content within 1000ms and becoming interactive within 5000ms on mid-tier mobile.',
    code: `// RAIL targets (mid-tier mobile)
// Response:  < 100ms  — tap → visual feedback
// Animation: < 16ms   — one frame at 60fps
// Idle:      < 50ms   — background work chunks
// Load:      < 1000ms — meaningful paint
//            < 5000ms — interactive

requestAnimationFrame(() => {
  // Keep frame work under 16ms
  updateAnimationState();
});`,
  },
  {
    id: 5,
    category: 'Performance Fundamentals',
    question: 'What are performance budgets?',
    answer: 'Performance budgets are agreed limits on metrics like total JavaScript size, number of requests, LCP, or Lighthouse score that a team will not exceed. They turn performance from a vague goal into an enforceable constraint, similar to how bundle size limits prevent unbounded growth. Budgets can be set per route, per feature, or globally and checked in CI with tools like Lighthouse CI or bundlesize.',
    code: `// lighthouserc.json — CI performance budget
{
  "ci": {
    "assert": {
      "assertions": {
        "first-contentful-paint": ["error", { "maxNumericValue": 2000 }],
        "total-byte-weight": ["error", { "maxNumericValue": 500000 }],
        "resource-summary:script:size": ["error", { "maxNumericValue": 200000 }]
      }
    }
  }
}`,
  },
  {
    id: 6,
    category: 'Performance Fundamentals',
    question: 'What is lazy loading?',
    answer: 'Lazy loading defers loading of non-critical resources until they are needed, typically when they enter or approach the viewport. For images, the native loading="lazy" attribute tells the browser to fetch the file only when the user scrolls near it. For JavaScript, dynamic import() loads route or component chunks on demand instead of upfront. This reduces initial network payload and main-thread parse time.',
    code: `<!-- Native image lazy loading -->
<img src="/hero.jpg" fetchpriority="high" alt="Hero" />
<img src="/article-thumb.jpg" loading="lazy" alt="Thumbnail" />

// JavaScript lazy loading via dynamic import
const AdminPanel = lazy(() => import('./AdminPanel'));`,
  },
  {
    id: 7,
    category: 'Performance Fundamentals',
    question: 'What is code splitting?',
    answer: 'Code splitting breaks a single large JavaScript bundle into smaller chunks that load on demand. Bundlers like Webpack, Rollup, and Vite create separate files per dynamic import() or configured split point. Route-based splitting is the most common pattern: each page loads only its own chunk plus shared vendor code. This reduces initial download and parse cost at the cost of a small delay when navigating to an unloaded route.',
    code: `// Route-based code splitting (React + Vite)
const routes = [
  { path: '/', component: () => import('./pages/Home') },
  { path: '/settings', component: () => import('./pages/Settings') },
];

// Vite/Webpack emit separate chunks automatically
// dist/assets/Home-abc123.js
// dist/assets/Settings-def456.js`,
  },
  {
    id: 8,
    category: 'Performance Fundamentals',
    question: 'How does bundle size affect web performance?',
    answer: 'Larger JavaScript bundles take longer to download on slow networks and longer to parse, compile, and execute on the main thread. Every kilobyte of JS has a multiplicative cost: network transfer, decompression, parsing, and execution all scale with size. On mid-tier mobile devices, parsing 500KB of JS can block the main thread for over a second, delaying interactivity. Monitoring bundle size in CI and analyzing with tools like webpack-bundle-analyzer prevents gradual bloat.',
    code: `// Analyze bundle composition
// npx vite-bundle-visualizer
// or webpack-bundle-analyzer

// Before: import entire library
// import _ from 'lodash';           // ~70KB gzip

// After: import only what you need
import debounce from 'lodash/debounce'; // ~2KB gzip`,
  },
  {
    id: 9,
    category: 'Performance Fundamentals',
    question: 'What is First Contentful Paint (FCP)?',
    answer: 'First Contentful Paint measures when the browser renders the first piece of DOM content — text, an image, or a canvas element — giving users visual confirmation that the page is loading. It is a key early milestone in the loading experience and a component metric related to perceived speed. FCP is affected by server response time, render-blocking resources, and font loading. Good FCP is under 1.8 seconds and poor is above 3.0 seconds.',
    code: `// Measure FCP with Performance Observer
const observer = new PerformanceObserver((list) => {
  const fcp = list.getEntriesByName('first-contentful-paint')[0];
  console.log('FCP:', fcp.startTime, 'ms');
});
observer.observe({ type: 'paint', buffered: true });`,
  },
  {
    id: 10,
    category: 'Performance Fundamentals',
    question: 'What is Time to Interactive (TTI)?',
    answer: 'Time to Interactive measures when the page becomes fully interactive — visually rendered, event handlers registered, and able to respond to user input within 50ms. TTI waits until the main thread is quiet for five seconds with no long tasks blocking input. It captures the gap between "looks loaded" and "actually usable," which frustrates users when buttons appear but do not respond. Lighthouse uses TTI alongside Total Blocking Time to assess interactivity.',
    code: `// TTI depends on main-thread availability
// Long tasks block interactivity

function hydrateApp() {
  // Bad: one giant synchronous hydration blocks TTI
  // Good: chunk with requestIdleCallback or scheduler.yield
  requestIdleCallback(() => hydrateSection('sidebar'));
  requestIdleCallback(() => hydrateSection('main'));
}`,
  },
  {
    id: 11,
    category: 'Performance Fundamentals',
    question: 'What is Total Blocking Time (TBT)?',
    answer: 'Total Blocking Time sums the time between First Contentful Paint and Time to Interactive where the main thread was blocked for more than 50ms. It quantifies how much the page prevents user interaction during load, making it a lab proxy for Interaction to Next Paint. Each long task contributes its duration minus 50ms to the total. Reducing TBT means breaking up heavy JavaScript into smaller tasks.',
    code: `// Long task = main thread busy > 50ms
// TBT = sum of (longTask.duration - 50ms) between FCP and TTI

// Break up heavy work
async function processItems(items) {
  for (const item of items) {
    processOne(item);
    await scheduler.yield(); // yield to main thread
  }
}`,
  },
  {
    id: 12,
    category: 'Performance Fundamentals',
    question: 'What is the difference between async and defer for scripts?',
    answer: 'Both async and defer prevent scripts from blocking HTML parsing, but they behave differently during execution. async downloads in parallel and executes as soon as it finishes, which can interrupt parsing and run out of order relative to other scripts. defer also downloads in parallel but waits until HTML parsing completes and preserves script order. Use defer for scripts that depend on the DOM or each other, and async for independent scripts like analytics.',
    code: `<script defer src="/app.js"></script>       <!-- runs after DOM ready, in order -->
<script defer src="/utils.js"></script>
<script async src="/analytics.js"></script> <!-- runs whenever ready, no order guarantee -->`,
  },
  {
    id: 13,
    category: 'Performance Fundamentals',
    question: 'What is the difference between code splitting and tree shaking?',
    answer: 'Tree shaking removes unused exports from a bundle at build time through static analysis of ES module import graphs. Code splitting divides the remaining code into separate chunks loaded on demand. They solve different problems: tree shaking reduces what ships in each chunk, while splitting controls when each chunk loads. Both require ES modules and a bundler that supports dead code elimination.',
    code: `// Tree shaking — bundler removes unused exports
import { formatDate } from './utils'; // only formatDate included in bundle

// Code splitting — separate chunk loaded on demand
const Chart = () => import('./Chart'); // Chart code in its own file`,
  },
  {
    id: 14,
    category: 'Performance Fundamentals',
    question: 'What is resource prioritization?',
    answer: 'Browsers assign fetch priority to resources based on type, position in the document, and developer hints like fetchpriority and preload. Critical resources like render-blocking CSS and LCP images get higher priority than below-the-fold images or prefetch hints. Mis-prioritization causes the browser to download decorative assets before the hero image, hurting LCP. Developers can influence ordering with link rel="preload", fetchpriority="high", and by placing critical resources early in the HTML.',
    code: `<!-- Prioritize LCP image -->
<link rel="preload" as="image" href="/hero.webp" fetchpriority="high" />
<img src="/hero.webp" fetchpriority="high" alt="Product" />

<!-- Deprioritize below-fold images -->
<img src="/footer-logo.png" loading="lazy" fetchpriority="low" alt="" />`,
  },
  {
    id: 15,
    category: 'Performance Fundamentals',
    question: 'What is above-the-fold content and why does it matter for performance?',
    answer: 'Above-the-fold content is everything visible in the viewport before the user scrolls. Optimizing its delivery directly impacts First Contentful Paint and Largest Contentful Paint because users judge speed by what they see first. Strategies include inlining critical CSS, preloading hero images, server-rendering visible HTML, and deferring everything below the fold. The goal is to render meaningful content in the first network round trips.',
    code: `<!-- Inline critical CSS for above-the-fold -->
<style>
  .hero { display: flex; min-height: 60vh; }
  .product-title { font-size: 2rem; }
</style>

<!-- Defer full stylesheet -->
<link rel="preload" href="/styles.css" as="style"
      onload="this.rel='stylesheet'" />`,
  },
]
