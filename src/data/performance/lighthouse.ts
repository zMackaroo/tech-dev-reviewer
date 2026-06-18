import type { InterviewQuestion } from '../../types'

export const lighthouseQuestions: InterviewQuestion[] = [
  {
    id: 34,
    category: 'Lighthouse',
    question: 'What is Lighthouse?',
    answer: 'Lighthouse is an open-source automated auditing tool built by Google that analyzes web pages for performance, accessibility, best practices, and SEO. It runs a page in a controlled environment, collects metrics, simulates throttled conditions, and produces a report with scores and actionable recommendations. It is available in Chrome DevTools, as a CLI, in CI via Lighthouse CI, and through PageSpeed Insights. In a real app, running Lighthouse on every pull request catches performance regressions before they reach production.',
    code: `// Run Lighthouse CLI
// npx lighthouse https://example.com --output html --output-path report.html

// Programmatic usage
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
const result = await lighthouse('https://example.com', { port: chrome.port });
console.log(result.lhr.categories.performance.score);`,
  },
  {
    id: 35,
    category: 'Lighthouse',
    question: 'How do you run Lighthouse audits?',
    answer: 'The most common methods are Chrome DevTools (Lighthouse tab), the CLI (npx lighthouse URL), PageSpeed Insights for both lab and field data, and Lighthouse CI for automated pipelines. DevTools is best for interactive debugging during development. The CLI supports scripting, JSON output, and custom configuration. Always run multiple times and take the median because scores can vary between runs. In a real app, developers run Lighthouse locally in DevTools while CI runs headless audits on staging URLs after each deploy.',
    code: `# CLI with options
npx lighthouse https://example.com \\
  --only-categories=performance \\
  --form-factor=mobile \\
  --throttling-method=simulate \\
  --output=json \\
  --output-path=./report.json

# DevTools: F12 → Lighthouse → Analyze page load`,
  },
  {
    id: 36,
    category: 'Lighthouse',
    question: 'What are the Lighthouse audit categories?',
    answer: 'Lighthouse evaluates five categories, each scored 0–100: Performance, Accessibility, Best Practices, SEO, and Progressive Web App (PWA). Performance measures loading speed and interactivity using metrics like LCP, TBT, and CLS. Accessibility checks WCAG compliance items like color contrast and ARIA labels. Best Practices covers security (HTTPS), console errors, and deprecated APIs. SEO audits meta tags, crawlability, and mobile-friendliness. In a real app, a team might require Performance ≥ 90 and Accessibility ≥ 95 in CI while treating PWA as optional.',
    code: `// Category scores (0–100 each)
const report = {
  performance: 87,
  accessibility: 96,
  'best-practices': 92,
  seo: 100,
  pwa: 45, // optional, not always relevant
};`,
  },
  {
    id: 37,
    category: 'Lighthouse',
    question: 'How is the Lighthouse performance score calculated?',
    answer: 'The performance score is a weighted average of several metrics, not a simple average of all audits. As of Lighthouse 10+, the weights are LCP (25%), TBT (30%), CLS (25%), FCP (10%), and Speed Index (10%). INP is expected to replace TBT in future versions as the interactivity metric. Each metric is scored on a log-normal curve mapping raw values to 0–100. Because of weighting, improving TBT or LCP has more impact than improving Speed Index. In a real app, fixing a 2-second long task that inflates TBT can raise your score more than optimizing FCP by 200ms.',
    code: `// Lighthouse 10+ performance metric weights
const weights = {
  'largest-contentful-paint': 0.25,
  'total-blocking-time':      0.30,
  'cumulative-layout-shift':  0.25,
  'first-contentful-paint':   0.10,
  'speed-index':              0.10,
};
// Score = weighted sum of individual metric scores (0–100)`,
  },
  {
    id: 38,
    category: 'Lighthouse',
    question: 'What factors most affect the Lighthouse performance score?',
    answer: 'The biggest levers are metrics with the highest weights: Total Blocking Time and Largest Contentful Paint together account for 55% of the score. Reducing JavaScript execution time, eliminating long tasks, and optimizing the LCP element have the largest impact. CLS improvements help the remaining 25%. Server response time, render-blocking resources, and image optimization indirectly affect multiple metrics. Third-party scripts are a frequent hidden cause of poor TBT. In a real app, removing an unused 150KB analytics SDK often improves TBT enough to jump the performance score by 10–15 points.',
    code: `// High-impact optimizations (by metric weight)
// 1. Reduce TBT — break up long tasks, defer JS (30%)
// 2. Improve LCP — preload hero, SSR, CDN (25%)
// 3. Fix CLS — image dimensions, font loading (25%)
// 4. Improve FCP — critical CSS, reduce blocking (10%)
// 5. Improve Speed Index — progressive rendering (10%)`,
  },
  {
    id: 39,
    category: 'Lighthouse',
    question: 'What is the difference between Lighthouse metrics and audits?',
    answer: 'Metrics are quantitative measurements of page behavior — LCP in milliseconds, CLS as a unitless score, TBT in milliseconds. Audits are individual pass/fail checks with recommendations, like "Eliminate render-blocking resources" or "Properly size images." Metrics feed into the performance score via weighted curves, while audits provide diagnostic detail and estimated savings. Opportunities are audits that show potential time or byte savings if fixed. In a real app, your LCP metric might score 65 while the "Preload LCP image" audit specifically tells you which image to preload.',
    code: `// Metric (feeds score)
{ "largest-contentful-paint": { "score": 0.65, "numericValue": 3200 } }

// Audit (diagnostic recommendation)
{ "render-blocking-resources": {
    "score": 0,
    "displayValue": "Potential savings of 1,200 ms",
    "details": { "items": [{ "url": "/styles.css", "wastedMs": 800 }] }
}}`,
  },
  {
    id: 40,
    category: 'Lighthouse',
    question: 'How do you integrate Lighthouse into CI/CD?',
    answer: 'Use Lighthouse CI (LHCI) to run Lighthouse on every commit or deploy and assert against performance budgets. LHCI collects multiple runs, takes the median score, and compares against thresholds defined in lighthouserc.json. It can upload reports to a server for historical tracking and PR comments. Run it against staging URLs after deploy or use static server for PR previews. In a real app, a GitHub Action running LHCI on a preview deployment URL fails the check if performance drops below 85, blocking merge until the regression is fixed.',
    code: `# .github/workflows/lighthouse.yml
- name: Run Lighthouse CI
  run: |
    npm install -g @lhci/cli
    lhci autorun
  env:
    LHCI_GITHUB_APP_TOKEN: \${{ secrets.LHCI_TOKEN }}

# lighthouserc.json asserts performance ≥ 0.85`,
  },
  {
    id: 41,
    category: 'Lighthouse',
    question: 'What is Lighthouse CI (LHCI)?',
    answer: 'Lighthouse CI is a suite of tools for running Lighthouse in continuous integration, storing results, and enforcing budgets. The CLI (lhci autorun) collects runs, computes medians, and asserts against configured thresholds. The server component stores historical reports for trend analysis and PR comparisons. It supports GitHub status checks, Slack notifications, and upload to temporary public storage. Unlike a one-off Lighthouse run, LHCI is designed for regression detection over time. In a real app, LHCI dashboard showing LCP trending upward over six sprints helps justify a performance sprint to leadership.',
    code: `// lighthouserc.json
{
  "ci": {
    "collect": {
      "url": ["https://staging.example.com/"],
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.85 }],
        "largest-contentful-paint": ["warn", { "maxNumericValue": 2500 }]
      }
    },
    "upload": { "target": "temporary-public-storage" }
  }
}`,
  },
  {
    id: 42,
    category: 'Lighthouse',
    question: 'What does "Eliminate render-blocking resources" mean in Lighthouse?',
    answer: 'This audit flags CSS and JavaScript files in the head that delay First Contentful Paint because the browser must download and process them before rendering. Lighthouse estimates how many milliseconds could be saved by deferring or inlining these resources. CSS is render-blocking by default, and synchronous scripts halt HTML parsing. The fix is inlining critical CSS, async-loading the rest, and using defer or async on scripts. In a real app, Lighthouse might flag a 120KB CSS file blocking FCP for 900ms — splitting it into 8KB critical inline CSS plus deferred full stylesheet resolves the audit.',
    code: `<!-- Before: render-blocking -->
<link rel="stylesheet" href="/all.css" />

<!-- After: inline critical, defer rest -->
<style>/* critical above-fold styles */</style>
<link rel="preload" href="/all.css" as="style"
      onload="this.onload=null;this.rel='stylesheet'" />
<noscript><link rel="stylesheet" href="/all.css" /></noscript>`,
  },
  {
    id: 43,
    category: 'Lighthouse',
    question: 'What does "Reduce unused JavaScript" mean in Lighthouse?',
    answer: 'This audit identifies JavaScript bytes that were downloaded but never executed during the page load, wasting bandwidth and main-thread parse time. Lighthouse estimates savings by analyzing coverage data during the audit run. Common causes include importing entire libraries instead of specific functions, shipping all route chunks upfront, and unused third-party scripts. The fix is code splitting, tree shaking, dynamic imports, and removing dead dependencies. In a real app, Lighthouse reporting 180KB of unused JS from a date library might lead you to replace it with a 2KB utility function.',
    code: `// DevTools → Coverage tab shows unused bytes in red

// Fix: dynamic import for route-specific code
const AdminDashboard = lazy(() => import('./AdminDashboard'));

// Fix: import specific functions
import debounce from 'lodash/debounce'; // not import _ from 'lodash'`,
  },
  {
    id: 44,
    category: 'Lighthouse',
    question: 'What does "Properly size images" mean in Lighthouse?',
    answer: 'This audit detects images served at dimensions much larger than their displayed size, wasting bandwidth and slowing LCP. A 2000px wide image displayed in a 400px container should be served at approximately 400px (accounting for device pixel ratio). Lighthouse calculates potential byte savings from serving correctly sized images. Fixes include responsive images with srcset and sizes, CDN image resizing, and build-time optimization. In a real app, replacing a single 1.5MB hero PNG served at full resolution with an 800px WebP via srcset can save over 1MB and dramatically improve LCP.',
    code: `<img
  src="/product-400.webp"
  srcset="/product-400.webp 400w, /product-800.webp 800w, /product-1200.webp 1200w"
  sizes="(max-width: 600px) 100vw, 400px"
  width="400" height="300"
  alt="Product"
/>`,
  },
  {
    id: 45,
    category: 'Lighthouse',
    question: 'What is throttling in Lighthouse and why is it used?',
    answer: 'Lighthouse simulates slower devices and networks so scores reflect conditions typical users experience, not just developers on fast machines. By default it applies simulated throttling: a 4x CPU slowdown and a simulated Slow 4G network (150ms RTT, 1.6 Mbps down). This prevents pages that load instantly on a MacBook Pro from getting inflated scores. You can switch to devtools throttling or no throttling for local debugging. In a real app, a page scoring 100 without throttling might drop to 62 with simulated mobile throttling, revealing real-world performance issues.',
    code: `# Throttling options
npx lighthouse https://example.com \\
  --throttling-method=simulate   # default: simulated Slow 4G + 4x CPU
  --throttling-method=devtools   # use DevTools throttling
  --throttling-method=provided   # no throttling (fast machine scores)

// Simulated Slow 4G: RTT 150ms, throughput 1.6 Mbps
// CPU slowdown: 4x (mobile-like processing)`,
  },
  {
    id: 46,
    category: 'Lighthouse',
    question: 'What is the difference between Lighthouse and PageSpeed Insights?',
    answer: 'PageSpeed Insights (PSI) wraps Lighthouse lab data with Chrome UX Report field data from real users. PSI shows both what Lighthouse measured in a controlled test and what actual Chrome users experienced over the past 28 days. Lighthouse alone only provides lab data from a single simulated run. PSI also adds origin-level and URL-level field summaries with distribution charts. Use PSI for production assessment and Lighthouse locally for debugging. In a real app, PSI might show a 45 performance score from field data while Lighthouse lab score is 78 — the gap tells you real users face worse conditions than your CI environment.',
    code: `// PageSpeed Insights = Lighthouse lab + CrUX field data
// https://pagespeed.web.dev/

// Lab section: same Lighthouse engine, simulated mobile
// Field section: CrUX p75 LCP, INP, CLS from real users
// Only shows field data if URL has enough CrUX traffic`,
  },
  {
    id: 47,
    category: 'Lighthouse',
    question: 'What are Opportunities vs Diagnostics in Lighthouse?',
    answer: 'Opportunities are audits where Lighthouse estimates specific time or byte savings if you implement the recommendation — they are prioritized by impact. Diagnostics provide additional performance information but do not have direct estimated savings, such as total DOM size, main-thread work breakdown, or JavaScript bootup time. Focus on Opportunities first because they offer the highest return on effort. Diagnostics help you understand root causes when investigating why a metric is poor. In a real app, the Opportunities section might say "Reduce unused JavaScript — save 1.2s" while Diagnostics shows "Main-thread work: 3.4s" for deeper investigation.',
    code: `// Opportunities (actionable, estimated savings)
// ✦ Eliminate render-blocking resources  — Est savings: 1,200 ms
// ✦ Reduce unused JavaScript            — Est savings: 890 ms
// ✦ Properly size images                — Est savings: 450 KiB

// Diagnostics (informational, no direct savings estimate)
// • Total Blocking Time: 450 ms
// • Largest Contentful Paint element: img.hero
// • Avoid enormous network payloads — Total size was 3.2 MiB`,
  },
  {
    id: 48,
    category: 'Lighthouse',
    question: 'How do you interpret the Lighthouse network waterfall?',
    answer: 'The waterfall in the Lighthouse report and DevTools Network panel shows when each resource was requested, how long it took to download, and whether it blocked rendering. Look for long bars indicating slow downloads, resources starting late due to dependency chains, and render-blocking requests at the top of the timeline. The critical path is the longest chain of dependent requests determining earliest possible LCP. Parallel requests that start early indicate good resource hint usage. In a real app, seeing the LCP image start downloading only after a 500KB JS bundle finishes parsing tells you to preload the image and defer the script.',
    code: `// Reading the waterfall (top to bottom = timeline)
// |==== HTML ==========>|                    (first request)
//     |== CSS =====>|                          (blocks render)
//         |==== JS parse ========>|            (blocks if sync)
//              |== hero.webp ===>|             (LCP — should start earlier!)

// Fix: preload LCP image in <head> before JS
<link rel="preload" as="image" href="/hero.webp" />`,
  },
]
