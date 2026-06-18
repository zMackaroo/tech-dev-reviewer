import type { InterviewQuestion } from '../../types'

export const monitoringQuestions: InterviewQuestion[] = [
  {
    id: 69,
    category: 'Performance Monitoring',
    question: 'What is Real User Monitoring (RUM)?',
    answer: 'Real User Monitoring collects performance data from actual users in production, capturing metrics on diverse devices, networks, browsers, and geographies. Unlike synthetic lab tests, RUM reflects real-world conditions including cache hits, ad blockers, browser extensions, and geographic latency. It is essential for understanding whether your Core Web Vitals pass thresholds for real traffic, not just in CI. RUM data is aggregated into percentiles (p50, p75, p90) over rolling windows.',
    code: `// RUM data collection flow
// 1. web-vitals library captures LCP, INP, CLS in browser
// 2. sendBeacon sends metrics to analytics endpoint
// 3. Backend aggregates into percentiles
// 4. Dashboard shows p75 trends over 28 days

navigator.sendBeacon('/metrics', JSON.stringify({
  metric: 'LCP', value: 2100, url: location.pathname,
}));`,
  },
  {
    id: 70,
    category: 'Performance Monitoring',
    question: 'How does the web-vitals library work?',
    answer: 'The web-vitals library by Google provides small, tree-shakeable functions (onLCP, onINP, onCLS, onFCP, onTTFB) that use PerformanceObserver under the hood to capture metrics accurately. Each function registers an observer, calculates the metric value according to the official spec, assigns a rating (good/needs-improvement/poor), and invokes your callback. The library handles edge cases like bfcache restores, visibility changes, and SPA navigations. It is the recommended way to measure Web Vitals in production.',
    code: `import { onLCP, onINP, onCLS } from 'web-vitals';

function reportMetric(metric) {
  const body = {
    name: metric.name,
    value: metric.value,
    rating: metric.rating, // 'good' | 'needs-improvement' | 'poor'
    delta: metric.delta,
    id: metric.id,
  };
  navigator.sendBeacon('/analytics', JSON.stringify(body));
}

onLCP(reportMetric);
onINP(reportMetric);
onCLS(reportMetric);`,
  },
  {
    id: 71,
    category: 'Performance Monitoring',
    question: 'What is the Performance Observer API?',
    answer: 'PerformanceObserver is a Web API that lets you subscribe to performance entry types as they are recorded, without polling performance.getEntries(). You specify entry types like paint, largest-contentful-paint, layout-shift, longtask, or resource and receive callbacks with new entries. The buffered option retrieves entries recorded before the observer was created. It is the foundation for web-vitals, RUM tools, and custom performance instrumentation.',
    code: `const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(\`\${entry.name}: \${entry.startTime}ms\`);
  }
});

// Observe multiple entry types
observer.observe({
  type: 'longtask',
  buffered: true,
  durationThreshold: 50,
});`,
  },
  {
    id: 72,
    category: 'Performance Monitoring',
    question: 'What are Long Tasks and why do they matter?',
    answer: 'A long task is any continuous stretch of work on the main thread lasting 50ms or more. During a long task, the browser cannot respond to user input, run event handlers, or paint frames — directly causing poor INP and TBT. The Long Tasks API reports these via PerformanceObserver with type longtask, including attribution to specific scripts when available. Breaking tasks under 50ms keeps the page responsive.',
    code: `const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.warn('Long task:', entry.duration, 'ms');
    // entry.attribution → which script caused it
  }
});
observer.observe({ type: 'longtask', buffered: true });

// Long task threshold: 50ms (hard limit for responsiveness)`,
  },
  {
    id: 73,
    category: 'Performance Monitoring',
    question: 'How do you create custom performance metrics?',
    answer: 'Use performance.mark() to stamp a point in time and performance.measure() to calculate duration between two marks. Custom metrics appear in PerformanceObserver with type mark or measure and in DevTools Performance panel. User Timing API marks are lightweight and work well for measuring feature-specific operations like search latency or checkout flow duration. Combine with performance.now() for high-resolution timestamps in application code.',
    code: `performance.mark('search-start');
const results = await fetchSearchResults(query);
performance.mark('search-end');
performance.measure('search-duration', 'search-start', 'search-end');

const measure = performance.getEntriesByName('search-duration')[0];
console.log('Search took:', measure.duration, 'ms');

// Report to analytics
sendMetric('search-duration', measure.duration);`,
  },
  {
    id: 74,
    category: 'Performance Monitoring',
    question: 'How does Sentry performance monitoring work?',
    answer: 'Sentry Performance tracks transactions (page loads, navigations, API calls) and spans (individual operations within a transaction) to build distributed traces. It automatically instruments pageload and navigation transactions with Web Vitals, and lets you create custom transactions for user flows. Spans show exactly where time is spent — database queries, HTTP requests, render time. Performance data links to errors so you can see if slow spans correlate with crashes.',
    code: `import * as Sentry from '@sentry/browser';

Sentry.init({ dsn: '...', tracesSampleRate: 0.2 });

// Custom transaction
const transaction = Sentry.startTransaction({ name: 'checkout', op: 'navigation' });
const span = transaction.startChild({ op: 'payment', description: 'Process payment' });
await processPayment(order);
span.finish();
transaction.finish();

// Automatic: pageload, Web Vitals, fetch/XHR spans`,
  },
  {
    id: 75,
    category: 'Performance Monitoring',
    question: 'How does Datadog RUM track web performance?',
    answer: 'Datadog Real User Monitoring automatically collects Core Web Vitals, resource loading times, long tasks, and JavaScript errors from browser sessions. It correlates frontend performance with backend traces via distributed tracing headers, showing the full request path from click to database query. Session replay lets you watch real user sessions that experienced slow loads or errors. Custom timing metrics and views track specific user flows.',
    code: `import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
  applicationId: '...',
  clientToken: '...',
  trackUserInteractions: true,
  trackResources: true,
  trackLongTasks: true,
  defaultPrivacyLevel: 'mask-user-input',
});

// Automatic: LCP, INP, CLS, FCP, resource timing, long tasks
// Custom timing
datadogRum.addTiming('checkout_complete');`,
  },
  {
    id: 76,
    category: 'Performance Monitoring',
    question: 'What is the Navigation Timing API?',
    answer: 'The Navigation Timing API provides high-resolution timestamps for every phase of a page load via performance.getEntriesByType("navigation"). Key metrics include DNS lookup, TCP connection, TTFB (responseStart - requestStart), DOM parsing, and load event timing. Level 2 (PerformanceNavigationTiming) replaces the deprecated Level 1 API and integrates with PerformanceObserver. It is the foundation for measuring server response time and download duration in RUM.',
    code: `const [nav] = performance.getEntriesByType('navigation');

const timing = {
  dns: nav.domainLookupEnd - nav.domainLookupStart,
  tcp: nav.connectEnd - nav.connectStart,
  ttfb: nav.responseStart - nav.requestStart,
  download: nav.responseEnd - nav.responseStart,
  domParse: nav.domInteractive - nav.responseEnd,
  domReady: nav.domContentLoadedEventEnd - nav.startTime,
  fullLoad: nav.loadEventEnd - nav.startTime,
};`,
  },
  {
    id: 77,
    category: 'Performance Monitoring',
    question: 'What is the Resource Timing API?',
    answer: 'The Resource Timing API records timing data for every resource loaded by the page — scripts, stylesheets, images, fonts, and fetch/XHR requests. Access entries via performance.getEntriesByType("resource") to see DNS, connect, TTFB, download duration, and transfer size for each asset. The responseStart and transferSize fields reveal cache hits (transferSize of 0 often means served from cache). Cross-origin resources need Timing-Allow-Origin header for full detail.',
    code: `const resources = performance.getEntriesByType('resource');

resources.forEach((r) => {
  console.log({
    name: r.name,
    duration: r.duration,
    ttfb: r.responseStart - r.requestStart,
    size: r.transferSize, // 0 = cache hit
    type: r.initiatorType, // script, css, img, fetch
  });
});`,
  },
  {
    id: 78,
    category: 'Performance Monitoring',
    question: 'What is synthetic monitoring vs Real User Monitoring?',
    answer: 'Synthetic monitoring runs scripted tests from controlled environments at regular intervals — checking if your site is up and measuring performance from specific locations. Tools include Lighthouse CI, WebPageTest, Pingdom, and Datadog Synthetics. RUM captures data from real users with all their device and network variance. Synthetic is consistent and good for regression detection and uptime; RUM is representative and good for understanding actual user experience. Use both together.',
    code: `// Synthetic (scheduled, controlled)
// WebPageTest, Lighthouse CI, Datadog Synthetics
// Runs every 5 min from US-East, EU-West
// Same device, same network, every time

// RUM (continuous, real users)
// web-vitals → analytics
// Varied devices, networks, geographies
// 28-day rolling p75 aggregation`,
  },
  {
    id: 79,
    category: 'Performance Monitoring',
    question: 'How do you set up performance alerts?',
    answer: 'Define thresholds on key metrics like p75 LCP > 2.5s, p75 INP > 200ms, error rate spikes, or TTFB degradation and configure alerts in your monitoring tool. Alert on sustained regressions over hours or days, not single data points, to avoid noise. Compare against baselines and previous deploys to detect regressions caused by code changes. Integrate with Slack or PagerDuty for team notification. Include attribution data so alerts point to the affected page or resource.',
    code: `// Datadog monitor example (conceptual)
// Alert when p75 LCP > 2500ms for 1 hour
// @web-vitals.lcp.p75{page:/products} > 2500

// Sentry alert
// When: p95 transaction duration for "checkout" > 5000ms
// Over: 15 minutes
// Notify: #perf-alerts Slack channel

// Custom threshold check
if (metric.name === 'LCP' && metric.value > 2500) {
  reportRegression({ page: location.pathname, value: metric.value });
}`,
  },
  {
    id: 80,
    category: 'Performance Monitoring',
    question: 'What is the Paint Timing API?',
    answer: 'The Paint Timing API reports two key rendering milestones: first-paint (FP) when anything is rendered and first-contentful-paint (FCP) when the first text or image appears. These are accessed via PerformanceObserver with type paint or performance.getEntriesByName("first-contentful-paint"). FCP is a Google Web Vital diagnostic metric and a component of perceived loading speed. FP is rarely used alone because a blank white flash counts as first paint.',
    code: `const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(\`\${entry.name}: \${entry.startTime.toFixed(0)}ms\`);
    // first-paint: 420ms
    // first-contentful-paint: 680ms
  }
});
observer.observe({ type: 'paint', buffered: true });`,
  },
]
