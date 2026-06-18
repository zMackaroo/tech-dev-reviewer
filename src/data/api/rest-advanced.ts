import type { InterviewQuestion } from '../../types'

export const restAdvancedQuestions: InterviewQuestion[] = [
  {
    id: 64,
    category: 'REST Advanced',
    question: 'Why and how should you version a REST API?',
    answer: 'Versioning lets you ship breaking changes without instantly breaking existing clients. Common strategies include URL prefix (/v1/users), Accept header versioning (Accept: application/vnd.myapp.v2+json), or query param (?version=2). URL versioning is the most visible and easiest for developers to test in browsers. For example, /v1/orders keeps legacy field names while /v2/orders renames totalCents to amount. In a real app, you maintain v1 for twelve months with deprecation headers while new mobile builds migrate to v2.',
    code: `// URL versioning
GET /v1/users/42
GET /v2/users/42

// Header versioning
await fetch('/users/42', {
  headers: { Accept: 'application/vnd.myapp.v2+json' },
});`,
  },
  {
    id: 65,
    category: 'REST Advanced',
    question: 'How should clients handle 429 rate limiting?',
    answer: 'On 429 Too Many Requests, read the Retry-After header (seconds or HTTP-date) and delay before retrying instead of immediately hammering the API. Implement exponential backoff with jitter for repeated 429s and reduce request frequency proactively using X-RateLimit-Remaining when exposed. Queue non-urgent writes during throttle periods. For example, a sync worker pauses 60 seconds when Retry-After: 60 is returned. In a real app, background jobs spread bulk imports across minutes to stay under 1000 requests per hour tier limits.',
    code: `async function fetchWithRateLimit(url: string, attempt = 0): Promise<Response> {
  const res = await fetch(url);
  if (res.status !== 429 || attempt >= 5) return res;

  const retryAfter = Number(res.headers.get('Retry-After') ?? 2 ** attempt);
  const jitter = Math.random() * 500;
  await sleep(retryAfter * 1000 + jitter);
  return fetchWithRateLimit(url, attempt + 1);
}`,
  },
  {
    id: 66,
    category: 'REST Advanced',
    question: 'What is exponential backoff and when should you retry API calls?',
    answer: 'Exponential backoff increases wait time between retries multiplicatively (1s, 2s, 4s, 8s) often with random jitter to prevent thundering herds when many clients retry simultaneously. Retry idempotent GET requests and POST with idempotency keys on transient errors like 502, 503, and network timeouts—not on 400 or 404. Cap max retries and fail visibly after the limit. For example, three retries with backoff handles brief gateway blips during deploys. In a real app, payment status polling retries GET /charges/id with backoff until status is succeeded or failed, not pending forever.',
    code: `async function withRetry<T>(fn: () => Promise<T>, max = 5): Promise<T> {
  for (let i = 0; i < max; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === max - 1) throw err;
      const delay = 2 ** i * 1000 + Math.random() * 500;
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw new Error('unreachable');
}`,
  },
  {
    id: 67,
    category: 'REST Advanced',
    question: 'What is HATEOAS in REST?',
    answer: 'Hypermedia as the Engine of Application State (HATEOAS) means API responses include links (rel, href) describing available next actions so clients discover workflows dynamically instead of hard-coding URLs. It decouples clients from URL structure changes when relations stay stable. Maturity level 3 REST embraces hypermedia; most practical APIs use partial HATEOAS in pagination links. For example, a order response includes links: { rel: "cancel", href: "/orders/9/cancel" }. In a real app, a generic API client follows rel="next" for pagination without knowing the exact query param pattern.',
    code: `{
  "id": 9,
  "status": "pending",
  "_links": {
    "self": { "href": "/orders/9" },
    "cancel": { "href": "/orders/9/cancel", "method": "POST" },
    "pay": { "href": "/orders/9/pay", "method": "POST" }
  }
}`,
  },
  {
    id: 68,
    category: 'REST Advanced',
    question: 'What is OpenAPI (Swagger) and how does it help API integration?',
    answer: 'OpenAPI is a machine-readable specification format (YAML or JSON) describing endpoints, parameters, request bodies, responses, and auth schemes. Tools generate interactive Swagger UI docs, client SDKs, server stubs, and TypeScript types from one source of truth. It reduces drift between documentation and implementation when kept in CI sync. For example, openapi-typescript reads spec.yaml and outputs types for every DTO. In a real app, PRs fail CI if Route Handler changes are not reflected in openapi.yaml, keeping mobile and web clients aligned.',
    code: `# openapi.yaml (fragment)
paths:
  /users/{id}:
    get:
      summary: Get user by ID
      parameters:
        - name: id
          in: path
          required: true
          schema: { type: string }
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'`,
  },
  {
    id: 69,
    category: 'REST Advanced',
    question: 'What are webhooks and how do you integrate them securely?',
    answer: 'Webhooks are HTTP callbacks where the server POSTs to your URL when events occur—payment succeeded, PR merged, form submitted—instead of you polling. Verify signatures (HMAC-SHA256 of raw body with a shared secret), reject replayed events with timestamps and idempotency keys, and respond 200 quickly before heavy processing. Use a queue for async work after acknowledging receipt. For example, Stripe sends Stripe-Signature and you verify before updating subscription status. In a real app, POST /api/webhooks/stripe validates the signature, enqueues the event, and returns 200 within milliseconds.',
    code: `export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;
  const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);

  await queue.add('process-stripe-event', event);
  return Response.json({ received: true });
}`,
  },
  {
    id: 70,
    category: 'REST Advanced',
    question: 'How do batch operations work in REST APIs?',
    answer: 'Batch endpoints accept an array of operations or ids in one POST to reduce round trips—POST /batch with [{ method, path, body }, ...] or POST /users/batch { ids: [...] }. Servers may process atomically or return per-item success/failure arrays. Respect payload size limits and rate limits when batching thousands of items. For example, importing 500 rows sends chunks of 50 per batch request. In a real app, a CRM sync POST /contacts/batch upserts contacts and returns { succeeded: 48, failed: [{ id, error }] } for partial failure handling.',
    code: `const res = await fetch('/api/contacts/batch', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    operations: [
      { op: 'upsert', data: { email: 'a@co.com', name: 'Ada' } },
      { op: 'upsert', data: { email: 'b@co.com', name: 'Lin' } },
    ],
  }),
});

const { succeeded, failed } = await res.json();`,
  },
  {
    id: 71,
    category: 'REST Advanced',
    question: 'What is long polling versus polling a REST API?',
    answer: 'Polling repeatedly calls GET on an interval to check for updates—simple but wasteful and latent depending on interval. Long polling holds the request open until the server has new data or a timeout, then the client immediately opens another long request. Both work over HTTP; WebSockets or SSE are better for high-frequency push. For example, GET /jobs/5/status every 2 seconds polls; long poll waits up to 30s for status change. In a real app, export job UIs long-poll /exports/99 until status becomes ready instead of spamming ten requests per second.',
    code: `async function pollJobStatus(id: string) {
  while (true) {
    const res = await fetch(\`/api/jobs/\${id}\`);
    const job = await res.json();
    if (job.status !== 'pending') return job;
    await sleep(2000);
  }
}`,
  },
  {
    id: 72,
    category: 'REST Advanced',
    question: 'What is idempotency key support in POST endpoints?',
    answer: 'Clients send a unique Idempotency-Key header on POST requests; the server stores the key with the first successful response and returns the same response for duplicate keys within a TTL window. This makes POST safe to retry on network failures without creating duplicate orders or charges. Keys should be UUIDs generated once per user action, not per retry attempt of the same action. For example, checkout generates one key per button click and reuses it on automatic retries. In a real app, Stripe requires Idempotency-Key on POST /v1/payment_intents so mobile flaky networks do not double charge.',
    code: `const idempotencyKey = \`order-\${cartId}-\${Date.now()}\`;

await fetch('/api/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Idempotency-Key': idempotencyKey,
  },
  body: JSON.stringify(cartPayload),
});`,
  },
  {
    id: 73,
    category: 'REST Advanced',
    question: 'How do you implement API request tracing with correlation IDs?',
    answer: 'Generate or propagate an X-Request-Id or traceparent header on every client request; servers log it and pass it to downstream services so support can trace one user action across systems. OpenTelemetry standardizes W3C trace context for distributed tracing. Include the id in error responses for user support tickets. For example, a failed checkout shows "Reference: req_8xk2m" mapped to logs across payment, inventory, and email services. In a real app, axios interceptors set X-Request-Id: crypto.randomUUID() and your APM dashboard groups spans by trace id.',
    code: `const requestId = crypto.randomUUID();

await fetch('/api/checkout', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-Request-Id': requestId,
    traceparent: '00-4bf92f3577b34da-a3ce929d0e0e4736-00',
  },
  body: JSON.stringify(payload),
});`,
  },
  {
    id: 74,
    category: 'REST Advanced',
    question: 'What is a Backend for Frontend (BFF) pattern?',
    answer: 'A BFF is a thin API layer tailored to a specific client (web, mobile, admin) that aggregates multiple downstream services into one optimized response shape. It reduces over-fetching, hides internal microservice topology, and centralizes auth token exchange so browsers never hold service credentials. Each client type may have its own BFF. For example, GET /bff/mobile/home returns hero, notifications, and feed in one payload instead of five mobile round trips. In a real app, the Next.js Route Handler calls user, catalog, and promo services server-side and returns a view model the React page consumes directly.',
    code: `// app/api/bff/home/route.ts
export async function GET() {
  const [user, promos, feed] = await Promise.all([
    userService.me(),
    promoService.active(),
    feedService.list({ limit: 10 }),
  ]);
  return Response.json({ user, promos, feed });
}`,
  },
  {
    id: 75,
    category: 'REST Advanced',
    question: 'How do you deprecate API endpoints gracefully?',
    answer: 'Announce deprecation in docs, return Deprecation: true and Sunset headers with a removal date, log usage metrics, and maintain backward compatibility until the deadline. Version new behavior in /v2 or additive optional fields in /v1 when possible. Communicate with API consumers via changelog and email. For example, Sunset: Sat, 01 Jan 2026 00:00:00 GMT tells clients when GET /v1/legacy-report disappears. In a real app, deprecated endpoints still work but CI tests for integrators fail if they detect Deprecation headers in staging alerting teams to migrate.',
    code: `return Response.json(data, {
  headers: {
    Deprecation: 'true',
    Sunset: 'Sat, 01 Jan 2026 00:00:00 GMT',
    Link: '</v2/report>; rel="successor-version"',
  },
});`,
  },
  {
    id: 76,
    category: 'REST Advanced',
    question: 'What is cursor-based pagination and why prefer it over offset?',
    answer: 'Cursor pagination uses an opaque token (often encoding sort key + id) to fetch the next page—GET /feed?cursor=eyJpZCI6MTIzfQ&limit=20. It stays stable when rows are inserted or deleted during paging, unlike offset which skips or duplicates items on live feeds. Cursors require indexed sort columns and cannot jump to arbitrary page numbers easily. For example, Twitter-style feeds use cursor= since page=500 on offset pagination is slow on large tables. In a real app, infinite scroll stores meta.nextCursor from each response and passes it to the next fetch.',
    code: `const res = await fetch('/api/feed?limit=20');
const { data, meta } = await res.json();
// meta: { nextCursor: 'eyJpZCI6MTIzfQ', hasMore: true }

const next = await fetch(\`/api/feed?limit=20&cursor=\${meta.nextCursor}\`);`,
  },
  {
    id: 77,
    category: 'REST Advanced',
    question: 'How do you handle partial success in bulk REST operations?',
    answer: 'Return 207 Multi-Status or 200 with a results array detailing per-item status codes and errors instead of failing the entire batch on one bad row. Clients retry only failed items using returned identifiers. Document whether the batch is transactional (all-or-nothing) or best-effort partial apply. For example, POST /imports returns { results: [{ id: 1, status: 201 }, { id: 2, status: 422, error: "invalid email" }] }. In a real app, the admin UI highlights failed rows in red and offers "Retry failed only" without re-uploading the whole CSV.',
    code: `// 207 or 200 with mixed results
{
  "summary": { "success": 48, "failed": 2 },
  "results": [
    { "index": 0, "status": 201, "id": "c_abc" },
    { "index": 1, "status": 422, "error": { "email": "invalid" } }
  ]
}`,
  },
  {
    id: 78,
    category: 'REST Advanced',
    question: 'What is API gateway responsibility in microservices?',
    answer: 'An API gateway sits as the single public entry point handling TLS termination, authentication, rate limiting, routing to internal services, request transformation, and response aggregation. It hides internal hostnames and lets you swap services without client changes. Downsides include an extra hop and potential bottleneck if not scaled. For example, clients call https://api.example.com/orders and the gateway routes to order-service.internal. In a real app, Kong or AWS API Gateway validates JWT once before forwarding to ten downstream Lambdas.',
    code: `// Client sees one host
GET https://api.example.com/orders/42

// Gateway routes internally
// → http://order-service:8080/orders/42
// Adds: X-User-Id, X-Request-Id from validated JWT`,
  },
  {
    id: 79,
    category: 'REST Advanced',
    question: 'How do you design health and readiness endpoints?',
    answer: 'Liveness (/health) returns 200 if the process is running—used by orchestrators to restart crashed containers. Readiness (/ready) checks dependencies like database and cache and returns 503 when not ready to receive traffic during startup or maintenance. Keep health endpoints unauthenticated but rate-limited and lightweight. For example, /ready fails during a migration so the load balancer stops sending users until DB is reachable. In a real app, Kubernetes livenessProbe hits /health and readinessProbe hits /ready every few seconds.',
    code: `export async function GET() {
  const dbOk = await pingDatabase();
  const redisOk = await pingRedis();

  if (!dbOk || !redisOk) {
    return Response.json({ status: 'not_ready', dbOk, redisOk }, { status: 503 });
  }
  return Response.json({ status: 'ready' });
}`,
  },
  {
    id: 80,
    category: 'REST Advanced',
    question: 'What is content compression for REST APIs?',
    answer: 'Clients send Accept-Encoding: gzip, br (Brotli) and servers compress large JSON responses to reduce bandwidth and latency. Small payloads may not benefit because compression overhead exceeds savings. Ensure proxies pass encoding headers correctly and decompress before parsing in tests. For example, a 2MB analytics JSON response shrinks significantly with gzip. In a real app, CDN edge nodes compress GET /api/catalog responses automatically while POST bodies rarely need compression unless uploading bulk JSON imports.',
    code: `const res = await fetch('/api/catalog', {
  headers: { Accept-Encoding: 'gzip, br' },
});
// Server: Content-Encoding: gzip
const data = await res.json(); // browser decompresses automatically`,
  },
  {
    id: 81,
    category: 'REST Advanced',
    question: 'How do you implement conditional writes with If-Match?',
    answer: 'If-Match sends the ETag from a prior GET; the server compares it to the current resource version and returns 412 Precondition Failed if they differ, preventing lost updates in concurrent edits. PUT and PATCH support this pattern alongside optimistic locking fields like version integer. Clients must refetch on 412 and merge or prompt the user. For example, PATCH /documents/5 with If-Match: "rev-7" succeeds only if the document is still at rev-7. In a real app, collaborative editors combine If-Match with operational transform or CRDT on the client after conflict detection.',
    code: `const getRes = await fetch('/api/documents/5');
const etag = getRes.headers.get('ETag')!;
const doc = await getRes.json();

const patchRes = await fetch('/api/documents/5', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json', 'If-Match': etag },
  body: JSON.stringify({ title: doc.title + ' (edited)' }),
});`,
  },
  {
    id: 82,
    category: 'REST Advanced',
    question: 'What is the difference between synchronous and asynchronous REST operations?',
    answer: 'Synchronous operations complete in the same HTTP request—POST creates and returns 201 immediately. Asynchronous operations return 202 Accepted with a job id or status URL when work takes seconds or minutes—exports, video transcoding, bulk imports. Clients poll GET /jobs/:id or receive a webhook when done. For example, POST /exports returns 202 { jobId: "exp_9" } and GET /exports/jobs/exp_9 eventually returns { status: "complete", url: "..." }. In a real app, the UI shows a progress spinner polling job status every 3 seconds until download is ready.',
    code: `const create = await fetch('/api/exports', { method: 'POST', body: JSON.stringify({ range: '30d' }) });
// 202 { jobId: 'exp_9', statusUrl: '/api/exports/jobs/exp_9' }

const status = await fetch('/api/exports/jobs/exp_9');
const job = await status.json(); // { status: 'processing' | 'complete', downloadUrl?: '...' }`,
  },
  {
    id: 83,
    category: 'REST Advanced',
    question: 'How do you mock REST APIs during frontend development?',
    answer: 'Use tools like MSW (Mock Service Worker) to intercept fetch in the browser and return fixture JSON, run json-server or Prism against OpenAPI specs, or point to a dedicated staging API. Mocks should mirror real status codes, latency, and error shapes so integration surprises are minimal before connecting to production backends. For example, MSW handler for GET /api/users returns paginated mock users with 200ms delay. In a real app, Storybook stories use MSW so components render realistic loading and error states without a running backend.',
    code: `import { http, HttpResponse, delay } from 'msw';

export const handlers = [
  http.get('/api/users', async () => {
    await delay(200);
    return HttpResponse.json({
      data: [{ id: '1', name: 'Ada' }],
      meta: { page: 1, total: 1 },
    });
  }),
];`,
  },
]
