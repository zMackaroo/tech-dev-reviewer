import type { InterviewQuestion } from '../../types'

export const restFundamentalsQuestions: InterviewQuestion[] = [
  {
    id: 1,
    category: 'REST Fundamentals',
    question: 'What is REST and what are its core principles?',
    answer: 'REST (Representational State Transfer) is an architectural style for designing networked APIs that use HTTP as the transport and treat resources as addressable entities identified by URLs. Core principles include statelessness (each request carries all context needed), a uniform interface (standard HTTP methods and status codes), resource-based URLs instead of action names, and representations (JSON, XML) that decouple the resource from how it is serialized.',
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
    answer: 'GET retrieves a resource or collection and must be safe and idempotent—it should not change server state and can be cached or bookmarked. POST creates a new resource or triggers a non-idempotent action where the server assigns identity or side effects are expected. GET parameters belong in the query string; POST payloads typically go in the request body.',
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
    answer: 'PUT replaces an entire resource with the representation you send—omitted fields are typically cleared or reset to defaults depending on API design. PATCH applies a partial update, changing only the fields you include while leaving others untouched. PUT is idempotent: repeating the same request yields the same result; PATCH may not be idempotent if it uses operations like increment.',
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
    answer: 'A successful creation typically returns 201 Created along with a Location header pointing to the new resource URL and often the created entity in the response body. 200 OK is acceptable when the API returns the created object without emphasizing creation semantics, but 201 is clearer for clients and tooling. If creation is asynchronous, 202 Accepted may be used instead.',
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
    answer: '2xx indicates success: 200 OK for reads and updates, 201 Created for new resources, 204 No Content for successful deletes with no body. 4xx signals client errors: 400 Bad Request for invalid input, 401 Unauthorized when authentication is missing, 403 Forbidden when authenticated but not allowed, 404 Not Found when the resource does not exist, 409 Conflict for duplicate or state conflicts, 422 Unprocessable Entity for semantic validation failures. 5xx means server failure: 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable.',
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
    answer: 'An idempotent operation produces the same effect on the server no matter how many times you repeat it—critical for safe retries on flaky networks. GET, PUT, and DELETE are idempotent; POST is not because each call may create another resource. PATCH is not guaranteed idempotent unless designed that way.',
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
    answer: 'Content-Type tells the server the media type of the request body, most commonly application/json for REST APIs. Accept tells the server which representation formats the client prefers in the response, enabling content negotiation. Mismatch between declared Content-Type and actual body causes parsers to fail or misread data.',
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
    answer: 'Content negotiation lets clients and servers agree on the best representation format using headers like Accept, Accept-Language, and Accept-Encoding rather than hard-coding one format per URL. The server inspects these headers and returns the closest matching representation, optionally using 406 Not Acceptable when no match exists.',
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
    answer: 'Statelessness means the server does not store client session context between requests—each request must include authentication, identifiers, and any data needed to process it. Session state may live in tokens, cookies, or client storage, but the server reconstructs context from what arrives on the wire rather than from in-memory session objects tied to a connection. This enables horizontal scaling because any app server can handle any request.',
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
    answer: 'Use nouns for resources, plural collections, and hierarchical paths for relationships—avoid verbs in URLs because HTTP methods express actions. Keep URLs stable, lowercase, hyphenated, and predictable: /users, /users/42/orders, not /getUser or /createOrder. Query strings handle filtering, sorting, and pagination on collections.',
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
    answer: '401 means the request lacks valid authentication credentials—the client should sign in or refresh a token and retry. 403 means the client is authenticated but not permitted to perform the action on that resource, so retrying with the same credentials will not help. Returning 401 for permission issues leaks less about resource existence but can confuse clients that auto-refresh tokens unnecessarily.',
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
    answer: 'Cache-Control instructs browsers, CDNs, and proxies whether and how long they may cache a response, reducing load and latency for read-heavy endpoints. Values like max-age=3600 allow caching for an hour, no-store forbids caching sensitive data, and private limits caching to the end user browser. GET responses are cacheable by default in many stacks unless explicitly prevented.',
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
    answer: 'An ETag is an opaque version identifier the server attaches to a representation so clients can detect changes without downloading the full body again. Clients send If-None-Match with the stored ETag on subsequent GET requests; if the resource is unchanged the server returns 304 Not Modified with no body, saving bandwidth. For updates, If-Match prevents lost updates by rejecting writes when the resource changed since the client last read it.',
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
    answer: 'Use a predictable JSON error envelope with machine-readable code, human-readable message, and optional field-level details for validation failures—always paired with the correct HTTP status. Avoid returning 200 OK with { success: false } because clients, caches, and monitors rely on status codes. Include a correlation or request id for support debugging.',
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
    answer: 'JSON (JavaScript Object Notation) is a lightweight text format for structured data using objects, arrays, strings, numbers, booleans, and null. It maps naturally to JavaScript objects and is widely supported in every language, browser, and mobile SDK. Compared to XML, JSON is more compact and easier for humans and parsers alike, which speeds development and reduces payload size.',
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
    answer: 'Safe methods are defined not to change server state—GET and HEAD are safe, so crawlers and prefetchers must not trigger side effects when calling them. Unsafe methods like POST, PUT, PATCH, and DELETE mutate resources and require CSRF protection and careful authorization. Violating safety (e.g., DELETE via GET link) creates security holes and broken caching behavior.',
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
    answer: 'OPTIONS discovers allowed methods and CORS capabilities for a resource without performing the actual operation. Browsers send preflight OPTIONS requests before cross-origin requests with custom headers or non-simple methods, and the server responds with Access-Control-Allow-Methods and related CORS headers. API clients rarely call OPTIONS manually but depend on correct server configuration for browser-based apps.',
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
    answer: 'Expose page and limit (or offset and limit) as query parameters on collection endpoints and return metadata alongside the data array: total count, next/prev links, or cursors for large datasets. Prefer stable sort keys when using offset pagination to avoid skipped or duplicate rows when data changes during paging.',
    code: `const res = await fetch('/api/users?page=2&limit=25&sort=createdAt');
const { data, meta } = await res.json();
// meta: { page: 2, limit: 25, total: 1000, totalPages: 40 }

const nextPage = await fetch(\`/api/users?page=\${meta.page + 1}&limit=25\`);`,
  },
  {
    id: 19,
    category: 'REST Fundamentals',
    question: 'What is the difference between REST and RPC-style APIs?',
    answer: 'REST models resources identified by URLs and uses HTTP methods for semantics, emphasizing uniform interfaces and cacheability. RPC-style APIs expose procedure names like /createInvoice or /calculateShipping and often use POST for everything, prioritizing actions over resources. REST scales better for public APIs and HTTP tooling; RPC can be simpler for internal microservice calls with many operations.',
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
    answer: 'Content-Type: application/json on requests with a JSON body tells the server how to parse the payload. Accept: application/json requests JSON responses. Authorization carries Bearer tokens or API keys for authenticated routes. Custom headers like X-Request-Id or Idempotency-Key support tracing and safe retries on mutating POSTs.',
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
