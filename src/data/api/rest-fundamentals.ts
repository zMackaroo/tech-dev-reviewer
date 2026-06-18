import type { InterviewQuestion } from '../../types'

export const restFundamentalsQuestions: InterviewQuestion[] = [
  {
    id: 1,
    category: 'REST Fundamentals',
    question: 'What is REST and what are its core principles?',
    answer: 'REST (Representational State Transfer) is an architectural style for designing networked APIs that use HTTP as the transport and treat resources as addressable entities identified by URLs. Core principles include statelessness (each request carries all context needed), a uniform interface (standard HTTP methods and status codes), resource-based URLs instead of action names, and representations (JSON, XML) that decouple the resource from how it is serialized. For example, GET /users/42 returns a JSON representation of user 42 without the server remembering prior requests. In a real app, a product catalog API exposes /products and /categories as resources so mobile, web, and partner integrations all share one consistent contract.',
    code: `// Resource-oriented endpoints
GET    /users          // list users
GET    /users/42       // fetch one user
POST   /users          // create user
PUT    /users/42       // replace user
PATCH  /users/42       // partial update
DELETE /users/42       // remove user`,
  },
  {
    id: 2,
    category: 'REST Fundamentals',
    question: 'When should you use GET versus POST?',
    answer: 'GET retrieves a resource or collection and must be safe and idempotent—it should not change server state and can be cached or bookmarked. POST creates a new resource or triggers a non-idempotent action where the server assigns identity or side effects are expected. GET parameters belong in the query string; POST payloads typically go in the request body. For example, GET /products?category=shoes reads data while POST /orders creates a new order with line items in the body. In a real app, search autocomplete uses GET with ?q= because it is read-only, while checkout uses POST because it mutates inventory and payment state.',
    code: `// GET — read, cacheable, no body side effects
const res = await fetch('/api/products?sort=price&limit=20');
const products = await res.json();

// POST — create, body carries payload
const created = await fetch('/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ items: [{ sku: 'ABC', qty: 2 }] }),
});`,
  },
  {
    id: 3,
    category: 'REST Fundamentals',
    question: 'What is the difference between PUT and PATCH?',
    answer: 'PUT replaces an entire resource with the representation you send—omitted fields are typically cleared or reset to defaults depending on API design. PATCH applies a partial update, changing only the fields you include while leaving others untouched. PUT is idempotent: repeating the same request yields the same result; PATCH may not be idempotent if it uses operations like increment. For example, PUT /users/5 with { name, email, role } replaces the whole profile, while PATCH /users/5 with { role: "admin" } updates just the role. In a real app, a settings page that edits one toggle sends PATCH to avoid accidentally wiping fields the form does not display.',
    code: `// PUT — full replacement
await fetch('/api/users/5', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Ada', email: 'ada@co.com', role: 'member' }),
});

// PATCH — partial update
await fetch('/api/users/5', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ role: 'admin' }),
});`,
  },
  {
    id: 4,
    category: 'REST Fundamentals',
    question: 'What HTTP status code should a successful resource creation return?',
    answer: 'A successful creation typically returns 201 Created along with a Location header pointing to the new resource URL and often the created entity in the response body. 200 OK is acceptable when the API returns the created object without emphasizing creation semantics, but 201 is clearer for clients and tooling. If creation is asynchronous, 202 Accepted may be used instead. For example, POST /articles returns 201 with Location: /articles/991 and a JSON body containing id and slug. In a real app, your frontend checks res.status === 201 then navigates to the URL from the Location header or the returned id.',
    code: `const res = await fetch('/api/articles', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Hello REST' }),
});

if (res.status === 201) {
  const article = await res.json();
  const location = res.headers.get('Location'); // /api/articles/991
  console.log('Created', article.id, location);
}`,
  },
  {
    id: 5,
    category: 'REST Fundamentals',
    question: 'Explain common HTTP status codes used in REST APIs.',
    answer: '2xx indicates success: 200 OK for reads and updates, 201 Created for new resources, 204 No Content for successful deletes with no body. 4xx signals client errors: 400 Bad Request for invalid input, 401 Unauthorized when authentication is missing, 403 Forbidden when authenticated but not allowed, 404 Not Found when the resource does not exist, 409 Conflict for duplicate or state conflicts, 422 Unprocessable Entity for semantic validation failures. 5xx means server failure: 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable. For example, submitting an expired coupon might return 422 with field-level errors. In a real app, your API client maps 401 to a login redirect and 503 to a retry banner.',
    code: `async function handleResponse(res: Response) {
  if (res.ok) return res.json();
  switch (res.status) {
    case 400: throw new Error('Invalid request');
    case 401: throw new Error('Please sign in');
    case 403: throw new Error('Permission denied');
    case 404: throw new Error('Not found');
    case 422: throw new Error('Validation failed');
    case 503: throw new Error('Service temporarily unavailable');
    default: throw new Error(\`Unexpected \${res.status}\`);
  }
}`,
  },
  {
    id: 6,
    category: 'REST Fundamentals',
    question: 'What is idempotency in HTTP methods and why does it matter?',
    answer: 'An idempotent operation produces the same effect on the server no matter how many times you repeat it—critical for safe retries on flaky networks. GET, PUT, and DELETE are idempotent; POST is not because each call may create another resource. PATCH is not guaranteed idempotent unless designed that way. For example, DELETE /sessions/abc twice still leaves the session deleted without error on the second call. In a real app, payment APIs use idempotency keys on POST so a retried charge request does not double-bill the customer.',
    code: `// Idempotent — safe to retry
await fetch('/api/users/10', { method: 'DELETE' });
await fetch('/api/users/10', { method: 'DELETE' }); // still "gone"

// Non-idempotent — retries may duplicate
await fetch('/api/charges', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Idempotency-Key': 'charge-uuid-7f3a',
  },
  body: JSON.stringify({ amount: 4999 }),
});`,
  },
  {
    id: 7,
    category: 'REST Fundamentals',
    question: 'What is the purpose of the Content-Type and Accept headers?',
    answer: 'Content-Type tells the server the media type of the request body, most commonly application/json for REST APIs. Accept tells the server which representation formats the client prefers in the response, enabling content negotiation. Mismatch between declared Content-Type and actual body causes parsers to fail or misread data. For example, POST with Content-Type: application/json sends a JSON object the server deserializes before validation. In a real app, a client that prefers JSON sets Accept: application/json while a legacy integration might send Accept: application/xml if the API still supports both.',
    code: `const res = await fetch('/api/reports', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  body: JSON.stringify({ from: '2024-01-01', to: '2024-01-31' }),
});

const contentType = res.headers.get('Content-Type');
// application/json; charset=utf-8`,
  },
  {
    id: 8,
    category: 'REST Fundamentals',
    question: 'What is content negotiation in REST?',
    answer: 'Content negotiation lets clients and servers agree on the best representation format using headers like Accept, Accept-Language, and Accept-Encoding rather than hard-coding one format per URL. The server inspects these headers and returns the closest matching representation, optionally using 406 Not Acceptable when no match exists. For example, Accept: application/json returns JSON while Accept: text/csv might return the same dataset as a downloadable CSV from GET /exports/sales. In a real app, an analytics dashboard requests JSON for charts while a finance user downloads the same endpoint with Accept: text/csv for Excel import.',
    code: `// Same resource, different representations
const jsonRes = await fetch('/api/exports/sales', {
  headers: { Accept: 'application/json' },
});

const csvRes = await fetch('/api/exports/sales', {
  headers: { Accept: 'text/csv' },
});

const csvText = await csvRes.text(); // "date,revenue\\n2024-01-01,1200"`,
  },
  {
    id: 9,
    category: 'REST Fundamentals',
    question: 'What makes a REST API stateless?',
    answer: 'Statelessness means the server does not store client session context between requests—each request must include authentication, identifiers, and any data needed to process it. Session state may live in tokens, cookies, or client storage, but the server reconstructs context from what arrives on the wire rather than from in-memory session objects tied to a connection. This enables horizontal scaling because any app server can handle any request. For example, a JWT in the Authorization header carries user identity so load balancers can route freely. In a real app, sticky sessions are avoided by embedding tenantId in every API call instead of relying on server-side session affinity.',
    code: `// Every request is self-contained
await fetch('/api/projects/7/tasks', {
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIs...',
    'X-Tenant-Id': 'acme-corp',
  },
});

// Server validates token + tenant on each call — no in-memory session required`,
  },
  {
    id: 10,
    category: 'REST Fundamentals',
    question: 'How should you design resource URLs in a REST API?',
    answer: 'Use nouns for resources, plural collections, and hierarchical paths for relationships—avoid verbs in URLs because HTTP methods express actions. Keep URLs stable, lowercase, hyphenated, and predictable: /users, /users/42/orders, not /getUser or /createOrder. Query strings handle filtering, sorting, and pagination on collections. For example, GET /teams/3/members returns members of team 3 without a custom action endpoint. In a real app, /invoices/88/payments reads naturally and documents the relationship between invoices and payments for every API consumer.',
    code: `// Good — nouns + HTTP verbs
GET    /teams/3/members
POST   /teams/3/members
DELETE /teams/3/members/12

// Avoid — RPC-style action URLs
POST   /teams/addMember
GET    /getTeamMembers?teamId=3`,
  },
  {
    id: 11,
    category: 'REST Fundamentals',
    question: 'What is the difference between 401 Unauthorized and 403 Forbidden?',
    answer: '401 means the request lacks valid authentication credentials—the client should sign in or refresh a token and retry. 403 means the client is authenticated but not permitted to perform the action on that resource, so retrying with the same credentials will not help. Returning 401 for permission issues leaks less about resource existence but can confuse clients that auto-refresh tokens unnecessarily. For example, a missing Bearer token on GET /admin/logs returns 401, while a logged-in member hitting DELETE /admin/users/1 returns 403. In a real app, the UI shows a login modal on 401 and a "You do not have access" toast on 403.',
    code: `if (res.status === 401) {
  redirectToLogin();
} else if (res.status === 403) {
  showToast('You do not have permission for this action');
}`,
  },
  {
    id: 12,
    category: 'REST Fundamentals',
    question: 'What role does the Cache-Control header play in REST APIs?',
    answer: 'Cache-Control instructs browsers, CDNs, and proxies whether and how long they may cache a response, reducing load and latency for read-heavy endpoints. Values like max-age=3600 allow caching for an hour, no-store forbids caching sensitive data, and private limits caching to the end user browser. GET responses are cacheable by default in many stacks unless explicitly prevented. For example, GET /public/faq with Cache-Control: public, max-age=86400 can be served from a CDN edge. In a real app, user-specific GET /me/profile uses Cache-Control: private, no-store while static product images use long max-age.',
    code: `// Server response headers
// Cache-Control: public, max-age=3600
// ETag: "v3-abc123"

const res = await fetch('/api/public/faq');
const etag = res.headers.get('ETag');

// Conditional request — 304 if unchanged
const cached = await fetch('/api/public/faq', {
  headers: { 'If-None-Match': etag },
});`,
  },
  {
    id: 13,
    category: 'REST Fundamentals',
    question: 'What is ETag and how is it used for conditional requests?',
    answer: 'An ETag is an opaque version identifier the server attaches to a representation so clients can detect changes without downloading the full body again. Clients send If-None-Match with the stored ETag on subsequent GET requests; if the resource is unchanged the server returns 304 Not Modified with no body, saving bandwidth. For updates, If-Match prevents lost updates by rejecting writes when the resource changed since the client last read it. For example, GET /documents/5 returns ETag: "rev-12" and a later GET with If-None-Match: "rev-12" yields 304. In a real app, mobile clients cache large config payloads locally and refresh only when the ETag changes.',
    code: `let cachedEtag: string | null = null;
let cachedBody: unknown = null;

async function fetchDocument(id: string) {
  const res = await fetch(\`/api/documents/\${id}\`, {
    headers: cachedEtag ? { 'If-None-Match': cachedEtag } : {},
  });
  if (res.status === 304) return cachedBody;
  cachedEtag = res.headers.get('ETag');
  cachedBody = await res.json();
  return cachedBody;
}`,
  },
  {
    id: 14,
    category: 'REST Fundamentals',
    question: 'How should REST APIs represent errors consistently?',
    answer: 'Use a predictable JSON error envelope with machine-readable code, human-readable message, and optional field-level details for validation failures—always paired with the correct HTTP status. Avoid returning 200 OK with { success: false } because clients, caches, and monitors rely on status codes. Include a correlation or request id for support debugging. For example, 422 returns { error: "validation_failed", fields: { email: "invalid format" } }. In a real app, your frontend maps error codes to inline form messages while Sentry groups incidents by error code and request id.',
    code: `// 422 Unprocessable Entity
{
  "error": "validation_failed",
  "message": "One or more fields are invalid",
  "requestId": "req_8xk2m",
  "fields": {
    "email": "Must be a valid email address",
    "age": "Must be at least 18"
  }
}`,
  },
  {
    id: 15,
    category: 'REST Fundamentals',
    question: 'What is JSON and why is it the default for REST APIs?',
    answer: 'JSON (JavaScript Object Notation) is a lightweight text format for structured data using objects, arrays, strings, numbers, booleans, and null. It maps naturally to JavaScript objects and is widely supported in every language, browser, and mobile SDK. Compared to XML, JSON is more compact and easier for humans and parsers alike, which speeds development and reduces payload size. For example, { "id": 1, "name": "Ada" } round-trips cleanly through fetch and JSON.parse. In a real app, OpenAPI specs document JSON schemas so frontend and backend teams agree on field names and types before writing code.',
    code: `const payload = { id: 1, name: 'Ada', tags: ['admin', 'beta'] };
const json = JSON.stringify(payload);
// '{"id":1,"name":"Ada","tags":["admin","beta"]}'

const parsed = JSON.parse(json);
console.log(parsed.name); // Ada`,
  },
  {
    id: 16,
    category: 'REST Fundamentals',
    question: 'What is the difference between safe and unsafe HTTP methods?',
    answer: 'Safe methods are defined not to change server state—GET and HEAD are safe, so crawlers and prefetchers must not trigger side effects when calling them. Unsafe methods like POST, PUT, PATCH, and DELETE mutate resources and require CSRF protection and careful authorization. Violating safety (e.g., DELETE via GET link) creates security holes and broken caching behavior. For example, GET /cart/checkout must never charge a card; checkout belongs on POST. In a real app, audit logs flag any GET handler that writes to the database because it breaks REST semantics and CDN assumptions.',
    code: `// Safe — read only
await fetch('/api/products/42');        // GET
await fetch('/api/products/42', { method: 'HEAD' });

// Unsafe — mutates state
await fetch('/api/cart/checkout', { method: 'POST' });
await fetch('/api/products/42', { method: 'DELETE' });`,
  },
  {
    id: 17,
    category: 'REST Fundamentals',
    question: 'What is the OPTIONS method used for in REST APIs?',
    answer: 'OPTIONS discovers allowed methods and CORS capabilities for a resource without performing the actual operation. Browsers send preflight OPTIONS requests before cross-origin requests with custom headers or non-simple methods, and the server responds with Access-Control-Allow-Methods and related CORS headers. API clients rarely call OPTIONS manually but depend on correct server configuration for browser-based apps. For example, before PATCH from https://app.example.com to https://api.example.com, the browser OPTIONS /users/1 and checks Allow and CORS headers. In a real app, misconfigured OPTIONS responses cause mysterious CORS failures only in production browsers, not in curl.',
    code: `// Preflight response headers (simplified)
// Access-Control-Allow-Origin: https://app.example.com
// Access-Control-Allow-Methods: GET, POST, PATCH, DELETE
// Access-Control-Allow-Headers: Authorization, Content-Type
// Access-Control-Max-Age: 86400`,
  },
  {
    id: 18,
    category: 'REST Fundamentals',
    question: 'How do you design pagination in REST API responses?',
    answer: 'Expose page and limit (or offset and limit) as query parameters on collection endpoints and return metadata alongside the data array: total count, next/prev links, or cursors for large datasets. Prefer stable sort keys when using offset pagination to avoid skipped or duplicate rows when data changes during paging. For example, GET /users?page=2&limit=25 returns { data: [...], meta: { page: 2, totalPages: 40, total: 1000 } }. In a real app, infinite scroll uses cursor-based links from meta.next instead of incrementing page on fast-changing feeds.',
    code: `const res = await fetch('/api/users?page=2&limit=25&sort=createdAt');
const { data, meta } = await res.json();
// meta: { page: 2, limit: 25, total: 1000, totalPages: 40 }

const nextPage = await fetch(\`/api/users?page=\${meta.page + 1}&limit=25\`);`,
  },
  {
    id: 19,
    category: 'REST Fundamentals',
    question: 'What is the difference between REST and RPC-style APIs?',
    answer: 'REST models resources identified by URLs and uses HTTP methods for semantics, emphasizing uniform interfaces and cacheability. RPC-style APIs expose procedure names like /createInvoice or /calculateShipping and often use POST for everything, prioritizing actions over resources. REST scales better for public APIs and HTTP tooling; RPC can be simpler for internal microservice calls with many operations. For example, REST uses POST /invoices with a body, while RPC might use POST /rpc with { method: "createInvoice", params: {...} }. In a real app, a public partner API stays RESTful while an internal gRPC service handles high-throughput service-to-service RPC.',
    code: `// REST — resource + verb
POST /invoices
{ "customerId": 9, "lines": [{ "sku": "X1", "qty": 2 }] }

// RPC — procedure name
POST /rpc
{ "method": "createInvoice", "params": { "customerId": 9, "lines": [...] } }`,
  },
  {
    id: 20,
    category: 'REST Fundamentals',
    question: 'What headers are commonly required for JSON REST APIs?',
    answer: 'Content-Type: application/json on requests with a JSON body tells the server how to parse the payload. Accept: application/json requests JSON responses. Authorization carries Bearer tokens or API keys for authenticated routes. Custom headers like X-Request-Id or Idempotency-Key support tracing and safe retries on mutating POSTs. For example, a typical authenticated PATCH sends Content-Type, Accept, and Authorization together. In a real app, an axios interceptor attaches these headers globally so individual API functions stay focused on URLs and payloads.',
    code: `await fetch('/api/profile', {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: \`Bearer \${accessToken}\`,
    'X-Request-Id': crypto.randomUUID(),
  },
  body: JSON.stringify({ displayName: 'Ada Lovelace' }),
});`,
  },
]
