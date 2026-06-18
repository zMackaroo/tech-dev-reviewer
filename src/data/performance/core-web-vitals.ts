import type { InterviewQuestion } from '../../types'

export const coreWebVitalsQuestions: InterviewQuestion[] = [
  {
    id: 16,
    category: 'Core Web Vitals',
    question: 'What are Core Web Vitals?',
    answer: 'Core Web Vitals are a set of three metrics Google uses to measure real-world user experience: Largest Contentful Paint (loading), Interaction to Next Paint (interactivity), and Cumulative Layout Shift (visual stability). They reflect what users actually perceive — how fast content appears, how responsive the page feels, and whether elements jump around unexpectedly. Google uses them as ranking signals for search and they appear in Search Console and PageSpeed Insights. In a real app, improving all three CWV metrics typically means faster server responses, smaller JS bundles, and reserving space for dynamic content.',
    code: `// The three Core Web Vitals
// LCP — Largest Contentful Paint  (loading,     target ≤ 2.5s)
// INP — Interaction to Next Paint  (interactivity, target ≤ 200ms)
// CLS — Cumulative Layout Shift    (stability,   target ≤ 0.1)`,
  },
  {
    id: 17,
    category: 'Core Web Vitals',
    question: 'What is Largest Contentful Paint (LCP)?',
    answer: 'LCP measures when the largest visible content element — usually a hero image, video poster, or large text block — is rendered in the viewport. It approximates when the main content of the page has loaded from the user\'s perspective. LCP is recorded until the user interacts with the page or it is hidden. Good LCP is 2.5 seconds or less, needs improvement is 2.5–4.0s, and poor is above 4.0s. In a real app, the LCP element on a news article is often the featured image, so optimizing its format, size, and delivery path has the biggest impact.',
    code: `// Identify LCP element in DevTools → Performance → Timings
// Common LCP elements:
// <img src="/hero.webp" fetchpriority="high" width="1200" height="630" />
// <h1>Large headline text block</h1>
// <video poster="/poster.jpg"></video>`,
  },
  {
    id: 18,
    category: 'Core Web Vitals',
    question: 'What causes poor LCP?',
    answer: 'Poor LCP is usually caused by slow server response times (high TTFB), render-blocking CSS or JavaScript delaying paint, slow resource load times for the LCP element, or client-side rendering that waits for JS before showing content. Large unoptimized images and missing width/height attributes also delay LCP when the browser cannot prioritize correctly. Third-party scripts competing for bandwidth on the main thread are a frequent culprit. In a real app, a React SPA that shows a blank page until hydration completes often has terrible LCP compared to server-rendered HTML with a preloaded hero image.',
    code: `// Common LCP killers
// 1. Slow TTFB (> 600ms)
// 2. Render-blocking CSS/JS in <head>
// 3. Unoptimized LCP image (large PNG, no preload)
// 4. Client-side only rendering (blank until JS runs)
// 5. Lazy-loading the LCP image (never do this!)`,
  },
  {
    id: 19,
    category: 'Core Web Vitals',
    question: 'How do you improve LCP?',
    answer: 'Start by identifying the LCP element with Lighthouse or DevTools, then optimize its delivery path. Reduce TTFB with CDN caching, server-side rendering, or edge functions. Preload the LCP image, use modern formats like WebP or AVIF, and serve appropriately sized responsive images. Eliminate render-blocking resources, inline critical CSS, and defer non-essential JavaScript. Never lazy-load the LCP element. In a real app, moving from a 2MB PNG hero to a 120KB WebP with preload and CDN edge caching often drops LCP from 5s to under 2s.',
    code: `<link rel="preload" as="image" href="/hero-800.webp"
      imagesrcset="/hero-400.webp 400w, /hero-800.webp 800w"
      imagesizes="(max-width: 768px) 100vw, 800px" />

<img src="/hero-800.webp"
     srcset="/hero-400.webp 400w, /hero-800.webp 800w"
     sizes="(max-width: 768px) 100vw, 800px"
     fetchpriority="high"
     width="800" height="450"
     alt="Product hero" />`,
  },
  {
    id: 20,
    category: 'Core Web Vitals',
    question: 'What is First Input Delay (FID)?',
    answer: 'FID measured the delay between a user\'s first interaction — a click, tap, or key press — and when the browser could actually process that event. It captured how blocked the main thread was at the moment of first input during page load. FID only measured the first interaction and ignored subsequent ones. It was replaced by Interaction to Next Paint (INP) in March 2024 as a more comprehensive interactivity metric. In a real app, a page with FID of 300ms meant users tapped a button and waited a third of a second before anything happened.',
    code: `// FID = processingStart - event.timeStamp
// Good: ≤ 100ms | Needs improvement: 100–300ms | Poor: > 300ms
// Note: FID replaced by INP as a Core Web Vital in 2024

entry.processingStart - entry.startTime; // FID calculation`,
  },
  {
    id: 21,
    category: 'Core Web Vitals',
    question: 'What is Interaction to Next Paint (INP) and why did it replace FID?',
    answer: 'INP measures the latency of all user interactions throughout the page lifecycle, reporting the worst interaction delay (or near-worst at high percentiles). Unlike FID, which only captured the first input, INP reflects sustained interactivity including clicks, taps, and keyboard input after load. It better represents SPA behavior where users interact repeatedly after initial paint. Good INP is 200ms or less, needs improvement is 200–500ms, and poor is above 500ms. In a real app, a todo list with sluggish checkbox handlers on every click would fail INP even if the first click felt fine under FID.',
    code: `// INP = duration from interaction to next frame paint
// Observes: click, keydown, keyup, pointerdown, pointerup

const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('Interaction duration:', entry.duration, 'ms');
  }
});
observer.observe({ type: 'event', buffered: true, durationThreshold: 16 });`,
  },
  {
    id: 22,
    category: 'Core Web Vitals',
    question: 'What causes poor INP?',
    answer: 'Poor INP is caused by long main-thread tasks that delay event handler execution and subsequent rendering. Heavy JavaScript in event handlers, large DOM updates, inefficient re-renders in frameworks, and third-party scripts hogging the main thread are common causes. Layout thrashing from reading then writing DOM properties synchronously also blocks paint. Large component trees that re-render on every interaction amplify the problem. In a real app, a filter dropdown that re-renders 500 table rows synchronously on every keystroke will produce terrible INP scores.',
    code: `// INP killers
searchInput.addEventListener('input', (e) => {
  // Bad: synchronous re-render of entire list
  setState({ query: e.target.value }); // triggers 500-row re-render

  // Better: debounce + virtualize
  debouncedSearch(e.target.value);
});`,
  },
  {
    id: 23,
    category: 'Core Web Vitals',
    question: 'How do you improve INP?',
    answer: 'Break up long tasks using scheduler.yield(), requestIdleCallback, or setTimeout to keep the main thread responsive. Optimize event handlers to do minimal synchronous work and defer heavy computation to Web Workers. Reduce JavaScript bundle size to shorten parse and compile time. Use virtualization for long lists and memoization to prevent unnecessary re-renders. Audit third-party scripts and remove or defer those that block the main thread. In a real app, moving a heavy sort operation to a Web Worker and showing a loading spinner immediately on click can drop INP from 600ms to under 100ms.',
    code: `button.addEventListener('click', async () => {
  // Immediate visual feedback (fast paint)
  button.classList.add('loading');

  // Defer heavy work
  await scheduler.yield();
  const sorted = await worker.sort(largeDataset);
  renderResults(sorted);
});`,
  },
  {
    id: 24,
    category: 'Core Web Vitals',
    question: 'What is Cumulative Layout Shift (CLS)?',
    answer: 'CLS quantifies unexpected layout shifts — when visible elements move from one rendered frame to the next without user interaction. Each shift is scored by impact fraction (how much of the viewport moved) times distance fraction (how far elements traveled). The final CLS is the sum of shift scores excluding shifts within 500ms of a user input. Good CLS is 0.1 or less, needs improvement is 0.1–0.25, and poor is above 0.25. In a real app, an ad banner loading late and pushing article text down is a classic CLS violation that frustrates readers trying to click a link.',
    code: `// CLS score = impact fraction × distance fraction
// Sum of all unexpected shifts during page lifetime

// DevTools → Performance → Experience → Layout Shifts
// web-vitals library reports CLS automatically`,
  },
  {
    id: 25,
    category: 'Core Web Vitals',
    question: 'What causes layout shift (CLS)?',
    answer: 'Layout shifts happen when the browser renders content without reserved space and later content pushes existing elements. Common causes include images and videos without explicit width and height, dynamically injected ads or embeds, web fonts causing FOIT/FOUT text reflow, and DOM elements inserted above existing content. Animations that trigger layout properties like width or top instead of transform also cause shifts. In a real app, injecting a cookie consent banner at the top of the page after analytics loads is a frequent source of CLS on marketing sites.',
    code: `<!-- Causes shift: no dimensions -->
<img src="/photo.jpg" alt="Photo" />

<!-- Prevents shift: reserved space -->
<img src="/photo.jpg" width="640" height="480" alt="Photo" />

<!-- Or use aspect-ratio in CSS -->
<style>.card-img { aspect-ratio: 16 / 9; width: 100%; }</style>`,
  },
  {
    id: 26,
    category: 'Core Web Vitals',
    question: 'How do you fix CLS?',
    answer: 'Always set width and height attributes on images and videos, or use CSS aspect-ratio to reserve space before media loads. Preload critical fonts and use font-display: optional or size-adjust to minimize text reflow. Reserve fixed-height placeholders for ads, embeds, and dynamically loaded content. Avoid inserting content above existing viewport content unless triggered by user action. Prefer transform and opacity for animations instead of properties that trigger layout. In a real app, adding a min-height skeleton container for a live chat widget prevents the footer from jumping when the widget initializes.',
    code: `/* Reserve space for dynamic content */
.ad-slot { min-height: 250px; contain: layout; }

/* Prevent font swap layout shift */
@font-face {
  font-family: 'Inter';
  src: url('/inter.woff2') format('woff2');
  font-display: swap;
  size-adjust: 100%;
}`,
  },
  {
    id: 27,
    category: 'Core Web Vitals',
    question: 'What are the Core Web Vitals threshold values?',
    answer: 'Google defines three buckets for each metric: Good, Needs Improvement, and Poor. For LCP, good is ≤ 2.5s, needs improvement is 2.5–4.0s, and poor is > 4.0s. For INP, good is ≤ 200ms, needs improvement is 200–500ms, and poor is > 500ms. For CLS, good is ≤ 0.1, needs improvement is 0.1–0.25, and poor is > 0.25. A page passes the Core Web Vitals assessment when all three metrics are in the Good bucket at the 75th percentile. In a real app, hitting these thresholds consistently requires monitoring field data, not just lab scores.',
    code: `// CWV thresholds (75th percentile)
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },   // milliseconds
  INP: { good: 200,  poor: 500  },   // milliseconds
  CLS: { good: 0.1,  poor: 0.25 },   // unitless score
};`,
  },
  {
    id: 28,
    category: 'Core Web Vitals',
    question: 'What is the difference between field data and lab data?',
    answer: 'Lab data comes from controlled tests in tools like Lighthouse run on specific devices and network conditions in a datacenter. Field data (RUM) comes from real users on diverse devices, networks, and geographies collected over time. Lab data is reproducible and useful for debugging, but field data reflects actual user experience including cache hits, device variance, and geographic latency. Google Search Console and CrUX use field data for ranking assessments. In a real app, your Lighthouse score might be 95 in CI but CrUX shows poor LCP because real users on budget Android phones in rural areas dominate your traffic.',
    code: `// Lab data sources
// Lighthouse, WebPageTest, Chrome DevTools

// Field data sources
// Chrome UX Report (CrUX), Search Console, RUM tools
// web-vitals library → analytics endpoint

import { onLCP, onINP, onCLS } from 'web-vitals';
onLCP(metric => sendToAnalytics(metric)); // field data`,
  },
  {
    id: 29,
    category: 'Core Web Vitals',
    question: 'What is the Chrome UX Report (CrUX)?',
    answer: 'CrUX is a public dataset of real user performance metrics collected from opted-in Chrome users worldwide. It aggregates field data by origin and URL, reporting LCP, INP, CLS, and other metrics at various percentiles. CrUX powers the field data section in PageSpeed Insights and Google Search Console Core Web Vitals reports. Data is updated monthly and requires sufficient traffic volume for URL-level granularity. In a real app, checking CrUX in PageSpeed Insights tells you whether Google sees your production site as passing Core Web Vitals, independent of your local Lighthouse runs.',
    code: `// Access CrUX data
// PageSpeed Insights → "Discover what your real users are experiencing"
// Search Console → Experience → Core Web Vitals
// BigQuery: chrome-ux-report dataset (public)

// API example
// GET https://chromeuxreport.googleapis.com/v1/records:queryRecord
//   ?url=https://example.com&formFactor=PHONE`,
  },
  {
    id: 30,
    category: 'Core Web Vitals',
    question: 'How do you measure Core Web Vitals in production?',
    answer: 'Use the web-vitals JavaScript library to capture LCP, INP, and CLS from real users and send them to your analytics backend. Wrap metrics in a PerformanceObserver for lower overhead and use the attribution API to diagnose root causes. Tools like Sentry, Datadog RUM, and Google Analytics 4 also collect Web Vitals automatically with minimal setup. Always report the 75th percentile aggregated over 28 days to match Google\'s assessment methodology. In a real app, sending INP with attribution data showing which event handler was slow helps engineers fix the exact component causing poor scores.',
    code: `import { onLCP, onINP, onCLS } from 'web-vitals';

function sendToAnalytics({ name, value, rating, attribution }) {
  fetch('/analytics', {
    method: 'POST',
    body: JSON.stringify({ name, value, rating, attribution }),
  });
}

onLCP(sendToAnalytics);
onINP(sendToAnalytics);
onCLS(sendToAnalytics);`,
  },
  {
    id: 31,
    category: 'Core Web Vitals',
    question: 'Why does Google use the 75th percentile for Core Web Vitals?',
    answer: 'The 75th percentile means 75% of page loads must meet the Good threshold for a site to pass the assessment. This balances strictness with realism — requiring the median (50th) would be too lenient and ignore struggling users, while requiring the 95th would be nearly impossible on diverse devices and networks. It ensures the majority of users, including those on slower connections, get a good experience. Google evaluates over a 28-day rolling window to smooth out daily variance. In a real app, if your p75 LCP is 2.3s but p90 is 6s, you pass the assessment but should still optimize for tail latency.',
    code: `// Assessment logic (simplified)
function passesCWV(metrics) {
  const p75 = percentile(metrics, 75);
  return p75.LCP <= 2500 && p75.INP <= 200 && p75.CLS <= 0.1;
}

// Track distribution, not just averages
// report: p50, p75, p90, p99`,
  },
  {
    id: 32,
    category: 'Core Web Vitals',
    question: 'How does Time to First Byte (TTFB) relate to LCP?',
    answer: 'TTFB measures the time from the navigation request until the first byte of the response arrives from the server. It is the foundation of the loading timeline — LCP cannot happen until HTML arrives and the browser begins parsing and fetching subresources. High TTFB from slow servers, uncached dynamic pages, or distant origins directly delays every downstream metric including LCP. Good TTFB is under 800ms. In a real app, moving a server-rendered page from a single US datacenter to a CDN with edge caching can cut TTFB from 600ms to 50ms and improve LCP by over a second for European users.',
    code: `// TTFB = responseStart - requestStart
const nav = performance.getEntriesByType('navigation')[0];
const ttfb = nav.responseStart - nav.requestStart;
console.log('TTFB:', ttfb, 'ms');

// LCP timeline: TTFB → HTML parse → CSS/JS → LCP element paint`,
  },
  {
    id: 33,
    category: 'Core Web Vitals',
    question: 'What other Web Vitals metrics complement Core Web Vitals?',
    answer: 'Beyond the three Core Web Vitals, Google tracks First Contentful Paint (FCP), Time to First Byte (TTFB), and Total Blocking Time (TBT) as diagnostic metrics. FCP indicates early visual feedback, TTFB reveals server and network latency, and TBT estimates main-thread blocking during load as a lab proxy for INP. First Input Delay (FID) was formerly a Core Web Vital but is now deprecated in favor of INP. In a real app, a healthy optimization workflow uses CWV as targets while FCP, TTFB, and TBT help pinpoint whether problems originate on the server, network, or client.',
    code: `// All Web Vitals (web-vitals library)
import { onFCP, onLCP, onINP, onCLS, onTTFB } from 'web-vitals';

onFCP(console.log);  // First Contentful Paint
onTTFB(console.log); // Time to First Byte
onLCP(console.log);  // Core Web Vital
onINP(console.log);  // Core Web Vital
onCLS(console.log);  // Core Web Vital`,
  },
]
