import type { InterviewQuestion } from '../../types'

export const optimizationQuestions: InterviewQuestion[] = [
  {
    id: 81,
    category: 'Optimization Techniques',
    question: 'What are the key image optimization techniques?',
    answer: 'Image optimization reduces file size and improves LCP without visible quality loss. Key techniques include choosing modern formats (WebP, AVIF), serving responsive sizes with srcset, compressing with tools like Sharp or Squoosh, lazy-loading below-fold images, and setting explicit width/height to prevent CLS. Use CDN image transformation to serve optimal formats based on Accept header. The goal is delivering the smallest file that looks correct at the displayed size. In a real app, converting a 2.4MB PNG hero to an 80KB AVIF with srcset often cuts LCP by 2–3 seconds on mobile.',
    code: `<picture>
  <source srcset="/hero.avif" type="image/avif" />
  <source srcset="/hero.webp" type="image/webp" />
  <img src="/hero.jpg"
       srcset="/hero-400.jpg 400w, /hero-800.jpg 800w"
       sizes="(max-width: 768px) 100vw, 800px"
       width="800" height="450"
       fetchpriority="high"
       alt="Hero" />
</picture>`,
  },
  {
    id: 82,
    category: 'Optimization Techniques',
    question: 'What are modern image formats like WebP and AVIF?',
    answer: 'WebP and AVIF are next-generation image formats that achieve significantly better compression than JPEG and PNG at equivalent visual quality. WebP supports lossy, lossless, and transparency with broad browser support (97%+). AVIF offers even better compression (30–50% smaller than WebP) but has slightly less browser support. Use the picture element to serve AVIF to supporting browsers with WebP and JPEG fallbacks. CDNs like Cloudinary and imgix auto-negotiate format via Accept headers. In a real app, serving AVIF to Chrome users and WebP to Safari with a JPEG fallback covers all browsers while minimizing bytes.',
    code: `<!-- Format negotiation with fallbacks -->
<picture>
  <source type="image/avif" srcset="/photo.avif" />
  <source type="image/webp" srcset="/photo.webp" />
  <img src="/photo.jpg" alt="Photo" width="800" height="600" />
</picture>

// Size comparison (same visual quality)
// photo.jpg:  450 KB
// photo.webp: 180 KB  (60% smaller)
// photo.avif:  95 KB  (79% smaller)`,
  },
  {
    id: 83,
    category: 'Optimization Techniques',
    question: 'How do responsive images with srcset work?',
    answer: 'The srcset attribute lists multiple image versions at different widths (descriptors like 400w, 800w), and the sizes attribute tells the browser how wide the image will display at each viewport breakpoint. The browser picks the most appropriate source based on viewport width, device pixel ratio, and network conditions — without any JavaScript. This prevents serving a 2000px image in a 400px container. Combine with modern formats in picture for maximum savings. In a real app, a product grid with sizes="(max-width: 600px) 50vw, 300px" ensures mobile users download 300px images instead of full-resolution 2000px files.',
    code: `<img
  src="/product-600.jpg"
  srcset="/product-300.jpg 300w,
          /product-600.jpg 600w,
          /product-900.jpg 900w,
          /product-1200.jpg 1200w"
  sizes="(max-width: 600px) 50vw,
         (max-width: 1024px) 33vw,
         300px"
  width="300" height="300"
  alt="Product"
/>`,
  },
  {
    id: 84,
    category: 'Optimization Techniques',
    question: 'What are effective font loading strategies?',
    answer: 'Web fonts can block rendering and cause layout shift if not loaded carefully. Best practices include preloading critical fonts, using font-display: swap to show fallback text immediately, subsetting fonts to include only needed characters, and self-hosting to eliminate third-party DNS/TLS overhead. Variable fonts reduce the number of font files needed. Limit font families and weights — each file is a render-blocking resource. In a real app, preloading your primary WOFF2 font and using font-display: swap ensures text is visible within 100ms while the custom font loads, avoiding both FOIT and severe FOUT.',
    code: `<!-- Preload critical font -->
<link rel="preload" href="/fonts/inter-var.woff2"
      as="font" type="font/woff2" crossorigin />

<style>
  @font-face {
    font-family: 'Inter';
    src: url('/fonts/inter-var.woff2') format('woff2');
    font-weight: 100 900;
    font-display: swap;
    unicode-range: U+0000-00FF; /* Latin subset */
  }
</style>`,
  },
  {
    id: 85,
    category: 'Optimization Techniques',
    question: 'What does the font-display property do?',
    answer: 'font-display controls how a browser renders text while a web font is downloading. swap shows fallback text immediately and swaps to the custom font when ready — best for body text. optional gives the font a ~100ms window and skips it entirely on slow connections if not loaded in time. block hides text briefly (up to 3s) then shows fallback — causes FOIT. fallback is a short block period then swap. fallback and optional reduce layout shift risk. In a real app, font-display: swap on body text ensures content is readable instantly while font-display: optional on decorative headings prevents layout shift on slow networks.',
    code: `@font-face {
  font-family: 'Inter';
  src: url('/inter.woff2') format('woff2');
  font-display: swap;    /* show fallback immediately, swap when ready */
}

@font-face {
  font-family: 'Display';
  src: url('/display.woff2') format('woff2');
  font-display: optional; /* skip if not loaded in ~100ms */
}`,
  },
  {
    id: 86,
    category: 'Optimization Techniques',
    question: 'How do third-party scripts impact performance?',
    answer: 'Third-party scripts (analytics, ads, chat widgets, social embeds) run on your main thread and compete with your code for CPU and network bandwidth. They are a leading cause of poor TBT and INP because you cannot control their size, execution time, or update frequency. Each script adds DNS lookup, TLS handshake, download, parse, and execution cost. Use facades to defer loading until user interaction, load scripts async, and audit regularly with Lighthouse and DevTools coverage. In a real app, deferring Intercom chat behind a click-to-load facade can improve TBT by 300ms and INP by 150ms because the 200KB widget only loads when the user actually wants support.',
    code: `<!-- Bad: loads immediately, blocks main thread -->
<script src="https://widget.intercom.io/widget.js"></script>

<!-- Good: facade pattern — load on interaction -->
<button id="chat-btn">Chat with us</button>
<script>
  document.getElementById('chat-btn').addEventListener('click', () => {
    const s = document.createElement('script');
    s.src = 'https://widget.intercom.io/widget.js';
    document.body.appendChild(s);
  }, { once: true });
</script>`,
  },
  {
    id: 87,
    category: 'Optimization Techniques',
    question: 'What are prefetch, preload, and preconnect?',
    answer: 'These resource hints tell the browser to prepare resources ahead of time. preconnect establishes early connections (DNS, TCP, TLS) to origins you will fetch from soon. preload fetches a specific resource with high priority for the current page — ideal for LCP images and critical fonts. prefetch fetches low-priority resources for likely future navigation — next page JS or API data. Misusing them wastes bandwidth: prefetching everything dilutes priority, and preloading unused resources delays critical ones. In a real app, preconnect to fonts.googleapis.com, preload your hero image and primary font, and prefetch the /dashboard route chunk on the login page.',
    code: `<!-- Early connection to third-party origin -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://cdn.example.com" crossorigin />

<!-- High-priority fetch for current page -->
<link rel="preload" href="/hero.webp" as="image" />
<link rel="preload" href="/font.woff2" as="font" crossorigin />

<!-- Low-priority fetch for next navigation -->
<link rel="prefetch" href="/dashboard-chunk.js" as="script" />`,
  },
  {
    id: 88,
    category: 'Optimization Techniques',
    question: 'What is tree shaking and how does it reduce bundle size?',
    answer: 'Tree shaking is a dead code elimination technique where the bundler analyzes ES module import/export graphs and removes exports that are never imported. It requires static import/export syntax — dynamic requires and CommonJS modules limit shaking effectiveness. Marking package.json with "sideEffects": false tells the bundler it can safely drop unused modules. Combined with code splitting, tree shaking ensures each chunk contains only the code it uses. In a real app, importing { debounce } from lodash-es instead of the entire lodash CJS package lets the bundler include only the debounce function and its dependencies (~2KB vs ~70KB).',
    code: `// package.json — enable aggressive tree shaking
{ "sideEffects": false }

// Tree-shakeable (ES modules)
import { debounce, throttle } from 'lodash-es';

// NOT tree-shakeable (CommonJS)
// const _ = require('lodash'); // entire library included

// Bundler output includes only debounce + throttle + deps`,
  },
  {
    id: 89,
    category: 'Optimization Techniques',
    question: 'How do gzip and Brotli compression work for web assets?',
    answer: 'Gzip and Brotli are lossless compression algorithms applied to text-based assets (HTML, CSS, JS, JSON, SVG) before transfer, reducing file sizes by 60–80%. Brotli typically achieves 15–25% better compression than gzip at the cost of slightly slower compression speed. The server compresses responses and sets Content-Encoding: br or gzip; the browser decompresses automatically. Pre-compress assets at build time for static files to avoid CPU cost on every request. In a real app, a 800KB JavaScript bundle compresses to ~200KB with Brotli, turning a 4-second download on Slow 4G into about 1 second.',
    code: `// Server response
Content-Encoding: br
Content-Type: application/javascript

// Nginx Brotli config
// brotli on;
// brotli_types text/css application/javascript application/json;

// Build-time precompression (Vite plugin)
// app.js       → 800 KB
// app.js.br    → 195 KB (Brotli)
// app.js.gz    → 230 KB (gzip)`,
  },
  {
    id: 90,
    category: 'Optimization Techniques',
    question: 'What is minification and why is it important?',
    answer: 'Minification removes unnecessary characters from source code — whitespace, comments, long variable names — without changing functionality. A minifier also applies safe optimizations like constant folding and dead code elimination. CSS minifiers merge rules and shorten color values. Minified JS/CSS is typically 30–50% smaller than the original, reducing download and parse time. All production builds should minify automatically via bundler plugins (Terser for JS, cssnano for CSS). In a real app, Vite uses esbuild to minify your 450KB JS bundle down to 280KB, and enabling Brotli on top brings it to ~85KB over the wire.',
    code: `// Before minification
function calculateTotalPrice(items) {
  // Calculate sum of all item prices
  let total = 0;
  for (const item of items) {
    total += item.price * item.quantity;
  }
  return total;
}

// After minification (Terser/esbuild)
function calculateTotalPrice(e){let t=0;for(const n of e)t+=n.price*n.quantity;return t}`,
  },
  {
    id: 91,
    category: 'Optimization Techniques',
    question: 'What is critical CSS extraction?',
    answer: 'Critical CSS is the minimal set of styles needed to render above-the-fold content. Extracting and inlining it in the HTML head eliminates render-blocking CSS requests for the initial paint. The remaining non-critical CSS loads asynchronously after first paint. Tools like Critters (used by Next.js), Penthouse, and critical analyze your HTML and CSS to determine which rules are needed. This directly improves FCP and LCP. In a real app, inlining 4KB of critical CSS for your header, hero, and typography while async-loading the 120KB full stylesheet can shave 600ms off FCP on mobile.',
    code: `<!-- Inlined critical CSS (~4KB) -->
<style>
  .header { display: flex; padding: 1rem; }
  .hero { min-height: 60vh; background: #f0f0f0; }
  body { font-family: system-ui, sans-serif; margin: 0; }
</style>

<!-- Async-load full stylesheet -->
<link rel="preload" href="/styles.css" as="style"
      onload="this.onload=null;this.rel='stylesheet'" />`,
  },
  {
    id: 92,
    category: 'Optimization Techniques',
    question: 'How does HTTP/2 multiplexing improve performance?',
    answer: 'HTTP/2 allows multiple requests and responses to be in flight simultaneously over a single TCP connection via stream multiplexing. Under HTTP/1.1, browsers limit to 6 parallel connections per origin, causing requests to queue. HTTP/2 eliminates head-of-line blocking at the HTTP level and uses HPACK header compression to reduce overhead. This means splitting code into many small chunks is no longer penalized by connection limits. However, each stream still shares one TCP connection so packet loss affects all streams. In a real app, HTTP/2 lets your page load 80 assets in parallel over one connection instead of queuing across six HTTP/1.1 connections.',
    code: `// HTTP/1.1 — 6 connections max, requests queue
// Conn 1: [JS] [CSS] [img1] [img2] ...
// Conn 2: [JS] [CSS] [img3] ...
// ... up to 6 connections, rest waits

// HTTP/2 — single connection, all streams parallel
// Conn 1: [JS stream] [CSS stream] [img1 stream] [img2 stream] ...
// No queuing, HPACK compressed headers`,
  },
  {
    id: 93,
    category: 'Optimization Techniques',
    question: 'How do dynamic imports optimize JavaScript loading?',
    answer: 'Dynamic import() returns a Promise that resolves to a module, letting the browser fetch and parse JavaScript only when the code path is needed. Bundlers automatically create separate chunks for each dynamic import, enabling route-based and component-based code splitting. Unlike static imports which are hoisted and bundled together, dynamic imports are evaluated at runtime. Combine with React.lazy() and Suspense for component-level splitting. In a real app, dynamically importing a PDF viewer library only when the user clicks "View PDF" keeps the initial bundle 300KB smaller for the 95% of users who never open a PDF.',
    code: `// Static import — always in main bundle
import { formatDate } from './utils';

// Dynamic import — separate chunk, loaded on demand
async function openPDF(url) {
  const { PDFViewer } = await import('./PDFViewer');
  PDFViewer.render(url);
}

// React pattern
const PDFViewer = lazy(() => import('./PDFViewer'));`,
  },
  {
    id: 94,
    category: 'Optimization Techniques',
    question: 'What are resource hints and when should you use each?',
    answer: 'Resource hints are link rel attributes that guide browser resource loading priority and timing. dns-prefetch resolves DNS early for domains you will connect to later. preconnect goes further by also completing TCP and TLS handshakes. preload fetches a specific high-priority resource for the current page. prefetch loads a low-priority resource for likely future navigation. modulepreload specifically preloads ES modules. Over-hinting wastes bandwidth and can hurt performance by competing with critical resources. In a real app, use preconnect for your CDN and font provider, preload for LCP image and critical font, and prefetch for the next likely route after login.',
    code: `<!-- DNS only (cheapest hint) -->
<link rel="dns-prefetch" href="https://api.example.com" />

<!-- Full connection (DNS + TCP + TLS) -->
<link rel="preconnect" href="https://cdn.example.com" crossorigin />

<!-- Current page, high priority -->
<link rel="preload" href="/hero.webp" as="image" fetchpriority="high" />

<!-- Future navigation, low priority -->
<link rel="prefetch" href="/next-page.js" as="script" />

<!-- ES module preload -->
<link rel="modulepreload" href="/app-core.js" />`,
  },
  {
    id: 95,
    category: 'Optimization Techniques',
    question: 'What is the defer vs async vs module strategy for script loading?',
    answer: 'Regular scripts without attributes block HTML parsing during download and execution. async downloads in parallel and executes immediately when ready, suitable for independent scripts like analytics. defer downloads in parallel but executes after HTML parsing in document order, ideal for app bundles that depend on the DOM. type="module" scripts defer by default and support ES module features with strict mode and automatic deferral. Never use blocking scripts in the head for non-critical code. In a real app, load your React app bundle with defer, analytics with async, and ES module utilities with type="module" to maximize parallel downloading without blocking render.',
    code: `<!-- Blocks parsing (avoid) -->
<script src="/legacy.js"></script>

<!-- Independent, order doesn't matter -->
<script async src="/analytics.js"></script>

<!-- Depends on DOM, order matters -->
<script defer src="/vendor.js"></script>
<script defer src="/app.js"></script>

<!-- ES modules — deferred by default, strict mode -->
<script type="module" src="/app.mjs"></script>`,
  },
]
