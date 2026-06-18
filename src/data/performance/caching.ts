import type { InterviewQuestion } from '../../types'

export const cachingQuestions: InterviewQuestion[] = [
  {
    id: 49,
    category: 'Caching Strategies',
    question: 'What is browser caching?',
    answer: 'Browser caching stores copies of HTTP responses locally on the user\'s device so repeat visits skip network requests for unchanged resources. The browser checks Cache-Control, ETag, and Last-Modified headers to decide whether to serve a cached copy or fetch a fresh one. Effective caching dramatically reduces load times, bandwidth usage, and server load for returning users. Static assets like JS, CSS, and images with content hashes in filenames can be cached aggressively. In a real app, setting Cache-Control: max-age=31536000, immutable on fingerprinted bundle files means users never re-download your app JS on subsequent visits.',
    code: `// Server response headers for static assets
Cache-Control: public, max-age=31536000, immutable
ETag: "abc123"

// Browser flow
// 1. First visit → download, store in HTTP cache
// 2. Repeat visit → serve from cache (no network request)
// 3. After max-age → revalidate or refetch`,
  },
  {
    id: 50,
    category: 'Caching Strategies',
    question: 'How do HTTP cache headers work?',
    answer: 'Cache-Control is the primary header governing caching behavior with directives like max-age (seconds to cache), no-cache (must revalidate), no-store (never cache), and public/private (shared vs browser-only). Expires provides an absolute expiration date but is legacy — Cache-Control max-age is preferred. ETag and Last-Modified enable conditional requests where the server returns 304 Not Modified if content unchanged. Vary tells caches which request headers affect the response, commonly Vary: Accept-Encoding. In a real app, HTML pages get Cache-Control: no-cache while hashed JS/CSS files get max-age=31536000 so users always get fresh HTML but cached assets.',
    code: `// HTML — always revalidate
Cache-Control: no-cache

// Hashed static asset — cache forever
Cache-Control: public, max-age=31536000, immutable

// API response — short cache
Cache-Control: private, max-age=60

// Conditional request
If-None-Match: "abc123"  →  304 Not Modified`,
  },
  {
    id: 51,
    category: 'Caching Strategies',
    question: 'How do ETags and conditional requests work?',
    answer: 'An ETag is a unique identifier the server assigns to a resource version, often a hash of the content. When a cached copy expires, the browser sends If-None-Match with the stored ETag. If the resource is unchanged, the server responds with 304 Not Modified and no body, saving bandwidth. Last-Modified works similarly with If-Modified-Since headers. ETags are more precise because they detect content changes even when the modification timestamp is the same. In a real app, a 500KB JSON API response that returns 304 instead of full data on every poll saves significant bandwidth for mobile users.',
    code: `// First request
// Response: 200 OK, ETag: "v3-abc", body: { ... }

// Subsequent request (cache expired)
GET /api/user
If-None-Match: "v3-abc"

// Response: 304 Not Modified (no body, saves bandwidth)`,
  },
  {
    id: 52,
    category: 'Caching Strategies',
    question: 'What are cache busting strategies?',
    answer: 'Cache busting ensures users receive updated files after a deployment despite aggressive browser caching. The standard approach is content hashing: webpack and Vite append a hash to filenames like app.a1b2c3.js, so a new build produces a new filename that bypasses the old cached version. Query string versioning (?v=2) is simpler but less reliable because some proxies ignore query strings in cache keys. For HTML, use no-cache so the entry point always revalidates and picks up new asset references. In a real app, Vite automatically generates hashed filenames and your HTML references them, so deploys instantly invalidate stale JS without any manual cache clearing.',
    code: `// Content hash in filename (preferred)
<script src="/assets/app.a1b2c3.js"></script>
<link rel="stylesheet" href="/assets/styles.d4e5f6.css" />

// Vite build output
// dist/assets/index-a1b2c3.js  ← hash changes on content change

// Query string (less reliable)
<script src="/app.js?v=20240618"></script>`,
  },
  {
    id: 53,
    category: 'Caching Strategies',
    question: 'What is a CDN and how does it improve performance?',
    answer: 'A Content Delivery Network is a geographically distributed network of edge servers that cache and serve content close to users. Instead of every request traveling to your origin server in one region, the CDN serves cached copies from the nearest edge node, reducing latency and TTFB. CDNs also handle TLS termination, compression, DDoS protection, and image optimization. Cache hit ratios above 90% are common for static assets. In a real app, serving your React bundle from Cloudflare or Fastly edge nodes in 200+ cities can reduce TTFB from 400ms to 30ms for international users.',
    code: `// Request flow with CDN
// User (Tokyo) → CDN edge (Tokyo) → cache HIT → 30ms
// User (Tokyo) → Origin (US-East) → no CDN → 400ms

// CDN cache headers
Cache-Control: public, s-maxage=86400, max-age=3600
// s-maxage controls CDN TTL, max-age controls browser TTL`,
  },
  {
    id: 54,
    category: 'Caching Strategies',
    question: 'How does CDN caching differ from browser caching?',
    answer: 'Browser caching stores resources on the individual user\'s device, while CDN caching stores them on edge servers shared across many users in a geographic region. A CDN cache hit serves content without touching the origin at all, benefiting first-time visitors in that region. The s-maxage directive controls CDN TTL separately from max-age which controls browser TTL. CDNs also support cache purging and cache keys based on URL, headers, and query strings. In a real app, setting s-maxage=86400 on images means the CDN serves them for 24 hours while max-age=3600 lets browsers cache for one hour locally.',
    code: `// Different TTLs for CDN vs browser
Cache-Control: public, max-age=3600, s-maxage=86400

// CDN purge API (Cloudflare example)
// POST /zones/{zone_id}/purge_cache
// { "files": ["https://example.com/assets/app.js"] }`,
  },
  {
    id: 55,
    category: 'Caching Strategies',
    question: 'How do service workers enable caching?',
    answer: 'Service workers are scripts that run between the network and the page, intercepting fetch requests and serving responses from a programmatic cache. Unlike HTTP caching which follows header rules automatically, service worker caching gives developers full control over what to cache, when to update, and which strategy to use per request. They enable offline functionality and instant repeat loads. The Cache API stores Request/Response pairs that the service worker reads and writes. In a real app, a service worker caching your app shell (HTML, CSS, JS) lets returning users see the UI instantly while fresh data loads in the background.',
    code: `// service-worker.js
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).then((response) => {
        const clone = response.clone();
        caches.open('v1').then((cache) => cache.put(event.request, clone));
        return response;
      });
    })
  );
});`,
  },
  {
    id: 56,
    category: 'Caching Strategies',
    question: 'What is cache-first vs network-first strategy?',
    answer: 'Cache-first serves from the service worker cache if available, falling back to the network only on a miss — ideal for static assets that rarely change. Network-first tries the network first and falls back to cache on failure — ideal for API data that must be fresh but needs offline support. Stale-while-revalidate serves cached content immediately while fetching an update in the background. Choosing the wrong strategy causes stale data or unnecessary network requests. In a real app, cache-first for fonts and icons plus network-first for user profile API gives fast UI with fresh user data.',
    code: `// Cache-first (static assets)
async function cacheFirst(request) {
  const cached = await caches.match(request);
  return cached || fetch(request);
}

// Network-first (API data)
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    const cache = await caches.open('api-v1');
    cache.put(request, response.clone());
    return response;
  } catch {
    return caches.match(request);
  }
}`,
  },
  {
    id: 57,
    category: 'Caching Strategies',
    question: 'What is stale-while-revalidate?',
    answer: 'Stale-while-revalidate (SWR) serves cached content immediately even if it is past its max-age, while simultaneously fetching a fresh copy in the background to update the cache for next time. The Cache-Control header stale-while-revalidate=60 allows serving stale content for up to 60 seconds while revalidating. This gives users instant responses without waiting for network round trips. It is used in both HTTP caching and application-level patterns like React Query and Next.js data fetching. In a real app, SWR on a product catalog API means users see cached products instantly while updated prices load silently in the background.',
    code: `// HTTP header
Cache-Control: max-age=60, stale-while-revalidate=300

// React Query stale-while-revalidate pattern
const { data } = useQuery({
  queryKey: ['products'],
  queryFn: fetchProducts,
  staleTime: 60_000,       // fresh for 60s
  gcTime: 300_000,         // keep in cache 5 min
  refetchOnWindowFocus: true, // revalidate on focus
});`,
  },
  {
    id: 58,
    category: 'Caching Strategies',
    question: 'What are cache invalidation strategies?',
    answer: 'Cache invalidation is notoriously difficult because you must update or remove stale entries without serving outdated content to users. Common strategies include time-based expiration (TTL/max-age), event-based purging (CDN purge API on deploy), content hashing (new filename = automatic invalidation), and versioned cache keys. For service workers, bump the cache name on deploy to invalidate all entries. The nuclear option is Cache-Control: no-store which prevents caching entirely. In a real app, purging Cloudflare cache by tag after a CMS publish ensures updated article content appears within seconds instead of waiting for the 24-hour TTL.',
    code: `// Strategy 1: TTL expiration
Cache-Control: max-age=3600

// Strategy 2: CDN purge on deploy
// purge tag "app-v2" after deployment

// Strategy 3: Content hash (automatic)
// app.oldhash.js → app.newhash.js

// Strategy 4: Service worker cache version bump
const CACHE_NAME = 'app-shell-v2'; // increment on deploy`,
  },
  {
    id: 59,
    category: 'Caching Strategies',
    question: 'What is the difference between HTTP caching and application caching?',
    answer: 'HTTP caching is handled transparently by the browser and CDN based on response headers — developers set Cache-Control and the infrastructure handles storage and retrieval. Application caching is managed explicitly in code using libraries like React Query, SWR, or Redis, with custom logic for when to fetch, store, and invalidate data. HTTP caching works for any resource type including static files, while application caching typically handles API responses and computed data. They complement each other: HTTP cache reduces network requests, application cache reduces redundant processing and provides optimistic UI. In a real app, static JS is HTTP-cached for a year while React Query caches API responses in memory with a 5-minute stale time.',
    code: `// HTTP cache (passive, header-driven)
// Browser/CDN reads Cache-Control automatically

// Application cache (active, code-driven)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 60 * 1000, gcTime: 10 * 60 * 1000 },
  },
});`,
  },
  {
    id: 60,
    category: 'Caching Strategies',
    question: 'How does React Query caching work?',
    answer: 'React Query (TanStack Query) caches API responses in memory keyed by queryKey arrays. When a component mounts, React Query checks if cached data exists and whether it is stale based on staleTime. Fresh data returns instantly from cache; stale data returns immediately while refetching in the background. gcTime (formerly cacheTime) controls how long inactive data stays in memory before garbage collection. React Query deduplicates simultaneous requests with the same key. In a real app, navigating away from a user profile and back within 5 minutes shows cached data instantly without a loading spinner while silently revalidating in the background.',
    code: `const { data, isLoading, isFetching } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => fetch(\`/api/users/\${userId}\`).then(r => r.json()),
  staleTime: 5 * 60 * 1000,  // 5 min before considered stale
  gcTime: 10 * 60 * 1000,    // 10 min before garbage collected
});

// isLoading: true only on first fetch (no cache)
// isFetching: true during any fetch (including background)`,
  },
  {
    id: 61,
    category: 'Caching Strategies',
    question: 'What is the difference between staleTime and gcTime in React Query?',
    answer: 'staleTime determines how long cached data is considered fresh before React Query triggers a background refetch on the next access. During staleTime, data is served from cache with zero network requests. gcTime (garbage collection time, formerly cacheTime) controls how long inactive query data remains in memory after all components using it unmount. Once gcTime expires, the cached data is deleted and the next mount triggers a full loading state. Setting staleTime high reduces refetches; setting gcTime high keeps data available for back-navigation. In a real app, staleTime: 60000 for a dashboard means no refetch for 1 minute, while gcTime: 300000 keeps data for 5 minutes after leaving the page.',
    code: `// Timeline example (staleTime: 60s, gcTime: 300s)
// t=0:   fetch data, cache it
// t=30s: remount → serve cache, no fetch (fresh)
// t=90s: remount → serve cache + background refetch (stale)
// t=120s: unmount, gc timer starts
// t=420s: cache deleted (120 + 300 gcTime)
// t=500s: remount → full loading state, new fetch`,
  },
  {
    id: 62,
    category: 'Caching Strategies',
    question: 'What is the difference between memory cache and disk cache?',
    answer: 'Memory cache (RAM) is extremely fast but cleared when the browser closes or under memory pressure. Disk cache (HTTP cache on disk) persists across sessions but is slower to read. The browser automatically promotes frequently accessed resources to memory cache and demotes them under pressure. Service worker Cache API writes to disk, surviving browser restarts. Application-level in-memory caches like React Query or a JavaScript Map are fastest but lost on page reload. In a real app, your app shell in a service worker disk cache loads instantly on repeat visits even after closing the browser, while React Query in-memory cache only helps during the current session.',
    code: `// Memory cache (fast, volatile)
const memCache = new Map();
memCache.set('user:123', userData); // lost on page reload

// Disk cache (HTTP cache + Service Worker Cache API)
// Persists across sessions
await caches.open('v1').then(c => c.put('/app-shell', response));

// React Query: in-memory only (session-scoped)`,
  },
  {
    id: 63,
    category: 'Caching Strategies',
    question: 'What is the difference between no-cache and no-store?',
    answer: 'no-cache allows the browser to store the response but requires revalidation with the server before every use — the browser must send a conditional request and get 200 or 304 before serving cached content. no-store prohibits storing the response entirely — nothing is written to disk or memory cache. Use no-store for sensitive data like banking pages or personalized API responses that must never be cached. Use no-cache for HTML entry points that should always check for updates but can benefit from 304 responses. In a real app, a medical records API uses Cache-Control: no-store while the main HTML page uses no-cache so deploys propagate quickly via 304 checks.',
    code: `// no-cache: store but always revalidate
Cache-Control: no-cache
// Browser sends If-None-Match on every request

// no-store: never store anything
Cache-Control: no-store
// Every request is a full network fetch, nothing cached

// Private user data
Cache-Control: private, no-store`,
  },
  {
    id: 64,
    category: 'Caching Strategies',
    question: 'What is the difference between max-age and s-maxage?',
    answer: 'max-age sets the cache TTL for browsers and other private caches measured in seconds. s-maxage sets the TTL specifically for shared caches like CDNs and proxies, overriding max-age for those intermediaries. If only max-age is set, shared caches use it too. Setting both lets you give browsers a shorter TTL than the CDN — browsers revalidate sooner while the CDN serves cached content to all users in a region. In a real app, max-age=300, s-maxage=3600 on API responses means browsers refetch every 5 minutes but the CDN serves cached responses for an hour, reducing origin load.',
    code: `// Browser caches 5 min, CDN caches 1 hour
Cache-Control: public, max-age=300, s-maxage=3600

// Only max-age set — both browser and CDN use 300s
Cache-Control: public, max-age=300

// CDN-specific override
// s-maxage only affects shared caches, not private browser cache`,
  },
  {
    id: 65,
    category: 'Caching Strategies',
    question: 'What is service worker precaching?',
    answer: 'Precaching downloads and stores a defined set of resources in the service worker cache during the install event, before they are needed. This guarantees the app shell is available offline and loads instantly on repeat visits. Workbox (by Google) provides build-time precaching that reads a manifest of hashed assets and generates the install handler automatically. Precached assets are updated when the service worker version changes. In a real app, Workbox precaches your index.html, CSS, JS, and logo during install so the PWA opens instantly even on flaky connections, then uses runtime caching strategies for API calls.',
    code: `// Workbox precaching (build-time)
import { precacheAndRoute } from 'workbox-precaching';

precacheAndRoute(self.__WB_MANIFEST);
// __WB_MANIFEST injected by build plugin with hashed asset URLs

// Manual precaching
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) =>
      cache.addAll(['/', '/styles.css', '/app.js', '/logo.svg'])
    )
  );
});`,
  },
  {
    id: 66,
    category: 'Caching Strategies',
    question: 'How do you configure CDN edge cache TTL effectively?',
    answer: 'Set TTL based on how frequently content changes and how tolerant users are of stale data. Static assets with content hashes get the longest TTL (1 year, immutable). HTML pages get short or zero TTL since they reference hashed assets. API responses vary: product catalogs might cache for hours, user-specific data for seconds or not at all. Use cache tags for granular purging instead of relying solely on TTL. Monitor cache hit ratio — below 80% suggests misconfigured TTL or too-aggressive purging. In a real app, images cache at the CDN for 30 days with tag-based purge on CMS update, while HTML gets s-maxage=60 for quick deploy propagation.',
    code: `// CDN cache rules (Cloudflare example)
// *.js, *.css (hashed) → TTL: 1 year, immutable
// *.html              → TTL: 60s, bypass on cookie
// /api/products       → TTL: 3600s, cache tag: "catalog"
// /api/user/*         → TTL: 0 (no cache)

// Purge by tag on CMS publish
// POST /purge_cache { "tags": ["catalog"] }`,
  },
  {
    id: 67,
    category: 'Caching Strategies',
    question: 'How does HTTP/2 affect caching strategies?',
    answer: 'HTTP/2 multiplexes many requests over a single TCP connection, reducing the overhead of multiple cache revalidation requests happening simultaneously. Server push (largely deprecated) attempted to proactively send cached resources but caused over-pushing problems. HPACK header compression reduces the size of conditional request headers on cache hits. HTTP/2 does not change cache semantics — Cache-Control, ETag, and other headers work identically. The main performance benefit is that revalidating 50 cached assets no longer requires 50 separate connections. In a real app, HTTP/2 means your page with 80 cached assets revalidates all of them in parallel over one connection instead of six parallel connections under HTTP/1.1.',
    code: `// HTTP/2 + caching — same headers, better transport
// Single connection, multiplexed streams

// :method: GET
// :path: /assets/app.js
// cache-control: max-age=31536000, immutable
// if-none-match: "abc123"

// All 80 asset revalidations share one TCP connection`,
  },
  {
    id: 68,
    category: 'Caching Strategies',
    question: 'How do you prevent cache poisoning?',
    answer: 'Cache poisoning occurs when an attacker manipulates cache keys to serve malicious content to other users. Prevent it by being explicit about Vary headers so caches differentiate responses by relevant request attributes. Do not cache responses to requests with unkeyed headers that affect content. Validate and sanitize all inputs that influence response content. Use Cache-Control: private for user-specific responses so shared caches never store them. Enable cache key normalization on your CDN. In a real app, setting Vary: Accept-Encoding and never caching responses that depend on unkeyed X-Forwarded-Host headers prevents attackers from injecting poisoned JavaScript into the CDN cache served to all users.',
    code: `// Safe caching practices
// 1. Vary on headers that affect response
Vary: Accept-Encoding, Accept-Language

// 2. Never cache user-specific data in shared cache
Cache-Control: private, no-store

// 3. Key cache on normalized URL only
// CDN: ignore unkeyed query params like ?utm_source=

// 4. Validate Host header before caching`,
  },
]
