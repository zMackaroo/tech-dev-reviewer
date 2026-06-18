import type { InterviewQuestion } from '../../types'

export const restAuthQuestions: InterviewQuestion[] = [
  {
    id: 46,
    category: 'API Auth & Security',
    question: 'What is JWT and how is it used in REST APIs?',
    answer: 'A JSON Web Token (JWT) is a compact, signed string containing claims (payload) that prove identity or permissions without the server storing session state. The client sends it in the Authorization: Bearer header on each request; the server verifies the signature and expiry before authorizing. JWTs are stateless but cannot be revoked easily without a blocklist or short expiry. For example, a login endpoint returns accessToken and the SPA stores it for subsequent GET /api/me calls. In a real app, access tokens expire in 15 minutes while refresh tokens rotate in HttpOnly cookies for longer sessions.',
    code: `// Login response
{ "accessToken": "eyJhbGciOiJIUzI1NiIs..." }

// Authenticated request
await fetch('/api/me', {
  headers: { Authorization: \`Bearer \${accessToken}\` },
});`,
  },
  {
    id: 47,
    category: 'API Auth & Security',
    question: 'What is OAuth 2.0 and how does it differ from API keys?',
    answer: 'OAuth 2.0 is an authorization framework where users grant third-party apps limited access via an authorization server, without sharing their password with the client app. It uses flows like Authorization Code with PKCE for SPAs and mobile apps, issuing access tokens scoped to specific permissions. API keys identify an application or developer account and are simpler but less suited for end-user consent and fine-grained delegation. For example, "Sign in with Google" uses OAuth while a server cron job uses an API key in X-Api-Key. In a real app, your SaaS integrates Slack via OAuth scopes like channels:read instead of asking for the user password.',
    code: `// OAuth Authorization Code (simplified)
// 1. Redirect user to:
//    https://auth.example.com/authorize?client_id=...&redirect_uri=...&scope=read:profile

// 2. Exchange code for tokens:
const tokens = await fetch('https://auth.example.com/token', {
  method: 'POST',
  body: new URLSearchParams({ grant_type: 'authorization_code', code, client_id }),
});`,
  },
  {
    id: 48,
    category: 'API Auth & Security',
    question: 'When should you use API keys and how should you protect them?',
    answer: 'API keys identify projects or services for machine-to-machine access—billing meters, webhooks, admin scripts, and partner integrations where OAuth user consent is unnecessary. Never expose secret keys in frontend bundles; restrict keys by IP, referrer, or scope and rotate them on leak. Public publishable keys may live in clients when they only allow low-risk operations. For example, a Stripe secret key stays on the server while the publishable key loads Checkout in the browser. In a real app, environment variables inject keys into server Route Handlers and CI secrets, never committed to git.',
    code: `// Server only — Route Handler
export async function GET(request: Request) {
  const apiKey = request.headers.get('x-api-key');
  if (apiKey !== process.env.INTERNAL_API_KEY) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return Response.json({ data: 'secret metrics' });
}`,
  },
  {
    id: 49,
    category: 'API Auth & Security',
    question: 'What is a Bearer token and how do you send it?',
    answer: 'A Bearer token is an access token sent in the Authorization header with the scheme Bearer, meaning whoever bears the token is granted access until it expires or is revoked. It is the standard way to attach JWTs and OAuth access tokens to REST requests. Tokens must travel over HTTPS only to prevent interception. For example, Authorization: Bearer eyJhbGciOiJIUzI1NiIs... authenticates GET /api/projects. In a real app, axios interceptors read the token from memory or secure storage and attach the header on every API call automatically.',
    code: `const headers = {
  Authorization: \`Bearer \${accessToken}\`,
  Accept: 'application/json',
};

await fetch('/api/projects', { headers });`,
  },
  {
    id: 50,
    category: 'API Auth & Security',
    question: 'What is CORS and why do browsers enforce it?',
    answer: 'Cross-Origin Resource Sharing (CORS) is a browser security mechanism that blocks JavaScript from reading responses from a different origin unless the server explicitly allows it via Access-Control-* headers. It prevents malicious sites from calling your API with the user cookies and reading private data. Simple GET requests may skip preflight; requests with custom headers or PATCH/DELETE trigger an OPTIONS preflight. For example, https://app.example.com calling https://api.example.com requires Access-Control-Allow-Origin. In a real app, the API gateway whitelists production and staging frontend origins while rejecting unknown domains.',
    code: `// Server CORS headers
// Access-Control-Allow-Origin: https://app.example.com
// Access-Control-Allow-Methods: GET, POST, PATCH, DELETE
// Access-Control-Allow-Headers: Authorization, Content-Type
// Access-Control-Allow-Credentials: true`,
  },
  {
    id: 51,
    category: 'API Auth & Security',
    question: 'What is CSRF and how do you protect REST APIs against it?',
    answer: 'Cross-Site Request Forgery tricks a logged-in user browser into making unwanted authenticated requests to your API using cookies the browser sends automatically. SPAs using Bearer tokens in memory are less vulnerable to classic CSRF than cookie-session apps, but cookie-based auth needs SameSite cookies, CSRF tokens, or double-submit cookies on mutating requests. State-changing endpoints should never use GET. For example, a hidden form on evil.com cannot forge POST /api/transfer if the API requires a CSRF header from your own origin. In a real app, SameSite=Lax session cookies plus a custom X-CSRF-Token header validated server-side protect traditional server-rendered forms.',
    code: `// Double-submit cookie pattern
// Server sets HttpOnly session + readable XSRF-TOKEN cookie
// Client reads XSRF-TOKEN and sends header on POST

await fetch('/api/settings', {
  method: 'POST',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': getCookie('XSRF-TOKEN'),
  },
  body: JSON.stringify({ theme: 'dark' }),
});`,
  },
  {
    id: 52,
    category: 'API Auth & Security',
    question: 'What are refresh tokens and why use them with short-lived access tokens?',
    answer: 'Refresh tokens are long-lived credentials used only to obtain new access tokens without re-prompting the user for a password. Short-lived access tokens limit damage if leaked because they expire quickly; refresh tokens stay in HttpOnly cookies or secure storage and rotate on each use to detect theft. The refresh endpoint validates the refresh token and returns a fresh access token pair. For example, access tokens expire in 15 minutes and POST /auth/refresh silently renews them in the background. In a real app, a 401 interceptor calls refresh once, queues pending requests, and retries them with the new access token.',
    code: `async function refreshAccessToken() {
  const res = await fetch('/auth/refresh', {
    method: 'POST',
    credentials: 'include', // HttpOnly refresh cookie
  });
  if (!res.ok) throw new Error('Session expired');
  const { accessToken } = await res.json();
  return accessToken;
}`,
  },
  {
    id: 53,
    category: 'API Auth & Security',
    question: 'Where should you store tokens in a web application?',
    answer: 'Store refresh tokens in HttpOnly, Secure, SameSite cookies so JavaScript cannot read them, reducing XSS token theft. Keep short-lived access tokens in memory (variable or closure) rather than localStorage when possible; if you must persist access tokens, weigh XSS risk carefully. Never store secrets in localStorage for high-security apps because any injected script can exfiltrate them. For example, after login the refresh cookie is set by the server Set-Cookie header while accessToken lives in a module-level variable. In a real app, mobile apps use the OS secure keychain instead of AsyncStorage for refresh tokens.',
    code: `// Good — refresh in HttpOnly cookie (set by server)
// Set-Cookie: refreshToken=...; HttpOnly; Secure; SameSite=Strict; Path=/auth/refresh

// Access token in memory (lost on full page reload — refresh restores it)
let accessToken: string | null = null;

export function setAccessToken(token: string) {
  accessToken = token;
}`,
  },
  {
    id: 54,
    category: 'API Auth & Security',
    question: 'What is PKCE and why is it required for public OAuth clients?',
    answer: 'Proof Key for Code Exchange (PKCE) adds a code_verifier and code_challenge to the OAuth Authorization Code flow so intercepted authorization codes cannot be exchanged for tokens without the original verifier. Public clients like SPAs and mobile apps cannot safely store a client secret, so PKCE replaces that trust. The client generates a random verifier, sends a hashed challenge with the authorize request, and sends the verifier at token exchange. For example, a React SPA uses PKCE with Sign in with Google instead of embedding a client secret. In a real app, Auth0 and Cognito enforce PKCE for native and SPA application types by default.',
    code: `// 1. Generate verifier + challenge (S256)
const verifier = crypto.randomUUID();
const challenge = base64url(sha256(verifier));

// 2. Authorize URL includes code_challenge
// /authorize?...&code_challenge=...&code_challenge_method=S256

// 3. Token exchange includes code_verifier
await fetch('/token', {
  body: new URLSearchParams({ grant_type: 'authorization_code', code, code_verifier: verifier }),
});`,
  },
  {
    id: 55,
    category: 'API Auth & Security',
    question: 'What is the difference between authentication and authorization in APIs?',
    answer: 'Authentication verifies who the caller is—login, JWT validation, API key lookup. Authorization decides what that identity may do—role checks, resource ownership, scoped OAuth permissions. An API can authenticate successfully yet return 403 Forbidden if the user lacks permission for that action. For example, a valid JWT proves you are user 42, but DELETE /admin/users still returns 403 unless role is admin. In a real app, middleware authenticates every request and route handlers or policy layers authorize per resource before mutating data.',
    code: `// AuthN — who are you?
const user = verifyJwt(request.headers.get('Authorization'));

// AuthZ — may you do this?
if (user.role !== 'admin') {
  return Response.json({ error: 'Forbidden' }, { status: 403 });
}`,
  },
  {
    id: 56,
    category: 'API Auth & Security',
    question: 'What are OAuth scopes and how should APIs enforce them?',
    answer: 'Scopes are strings like read:orders or write:profile that limit what an access token may do, included in the token claims or looked up server-side. APIs should check required scopes on each endpoint rather than assuming any valid token has full access. Least privilege means requesting only scopes your feature needs during OAuth consent. For example, a reporting integration requests read:invoices only, not write:payments. In a real app, middleware decodes the token scopes array and returns 403 if POST /api/payments lacks write:payments.',
    code: `const requiredScope = 'read:orders';

function hasScope(token: { scope: string[] }, scope: string) {
  return token.scope.includes(scope);
}

if (!hasScope(decoded, requiredScope)) {
  return Response.json({ error: 'Insufficient scope' }, { status: 403 });
}`,
  },
  {
    id: 57,
    category: 'API Auth & Security',
    question: 'Why must APIs never trust client-side authorization alone?',
    answer: 'Frontend role checks and hidden buttons are UX only—attackers can call your API directly with curl or modified clients bypassing any JavaScript guards. Every protected endpoint must validate tokens and permissions on the server before reading or writing data. Client-side route guards prevent accidental access but are not security boundaries. For example, hiding the admin panel link does not stop GET /api/admin/stats without server-side admin role verification. In a real app, Next.js middleware redirects non-admins for UX while the Route Handler independently verifies admin claims in the JWT.',
    code: `// Client — UX only
if (user.role !== 'admin') return <Navigate to="/" />;

// Server — actual security (required)
export async function GET(req: Request) {
  const user = await authenticate(req);
  if (user.role !== 'admin') {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }
  return Response.json({ stats: await getStats() });
}`,
  },
  {
    id: 58,
    category: 'API Auth & Security',
    question: 'What is credential inclusion (credentials: include) in fetch?',
    answer: 'The credentials option controls whether cookies, client certificates, and Authorization headers affected by CORS are sent on cross-origin requests. credentials: "include" sends cookies and requires the server to respond with Access-Control-Allow-Credentials: true and a specific Allow-Origin (not *). Same-origin requests include cookies by default. For example, a SPA on app.com calling api.com with cookie-based sessions needs credentials: "include" on fetch. In a real app, login sets an HttpOnly session cookie and all API fetches use credentials: "include" so the cookie authenticates each request.',
    code: `await fetch('https://api.example.com/me', {
  credentials: 'include', // send cookies cross-origin
  headers: { Accept: 'application/json' },
});

// Server must respond with:
// Access-Control-Allow-Credentials: true
// Access-Control-Allow-Origin: https://app.example.com`,
  },
  {
    id: 59,
    category: 'API Auth & Security',
    question: 'How do you handle token expiration in SPAs?',
    answer: 'Detect 401 responses or decode JWT exp claim before requests fail, then silently refresh using a refresh token or redirect to login if refresh fails. Avoid infinite refresh loops by limiting retry count and clearing auth state on repeated failure. Proactively refresh shortly before expiry for seamless UX on long-lived pages. For example, refresh when exp is within 60 seconds using a timer set after login. In a real app, an axios response interceptor catches 401, awaits refreshAccessToken(), retries the original request once, and logs out if refresh returns 401.',
    code: `api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      const token = await refreshAccessToken();
      error.config.headers.Authorization = \`Bearer \${token}\`;
      return api.request(error.config);
    }
    return Promise.reject(error);
  }
);`,
  },
  {
    id: 60,
    category: 'API Auth & Security',
    question: 'What security headers should API responses include?',
    answer: 'Relevant headers include Strict-Transport-Security to force HTTPS, X-Content-Type-Options: nosniff to prevent MIME sniffing, and Cache-Control: no-store on sensitive authenticated responses. CORS headers must be precise, not wildcard, when credentials are used. Content-Security-Policy applies more to HTML pages but API gateways often add standard security headers uniformly. For example, GET /api/me/profile includes Cache-Control: private, no-store so shared caches never store PII. In a real app, API Gateway or middleware attaches HSTS and nosniff on every response automatically.',
    code: `return Response.json(user, {
  headers: {
    'Cache-Control': 'private, no-store',
    'X-Content-Type-Options': 'nosniff',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  },
});`,
  },
  {
    id: 61,
    category: 'API Auth & Security',
    question: 'What is rate limiting from a client integration perspective?',
    answer: 'Rate limiting caps how many requests a client may make in a time window, returning 429 Too Many Requests with Retry-After when exceeded. Clients should respect Retry-After, implement exponential backoff, and cache responses to avoid hammering the API. API keys often map to rate limit tiers for billing. For example, after 429 the client waits Retry-After: 30 seconds before retrying. In a real app, a sync job batches writes and reads X-RateLimit-Remaining headers to throttle itself before hitting hard limits.',
    code: `const res = await fetch('/api/events');
if (res.status === 429) {
  const retryAfter = Number(res.headers.get('Retry-After') ?? 5);
  await sleep(retryAfter * 1000);
  return fetch('/api/events'); // retry once
}

const remaining = res.headers.get('X-RateLimit-Remaining');`,
  },
  {
    id: 62,
    category: 'API Auth & Security',
    question: 'How do you securely call third-party APIs from your backend?',
    answer: 'Never expose third-party secret keys in frontend code—proxy requests through your server Route Handler or BFF (Backend for Frontend) that holds credentials in environment variables. Validate and sanitize data from third parties before forwarding to clients. Log request ids, not secrets, and use least-privilege API keys scoped to required operations. For example, the browser calls POST /api/send-email and your server calls SendGrid with SENDGRID_API_KEY. In a real app, webhook receivers verify HMAC signatures from Stripe before processing payment events to prevent forged payloads.',
    code: `// Client calls your API — no third-party secret exposed
await fetch('/api/send-email', {
  method: 'POST',
  body: JSON.stringify({ to: 'user@example.com', subject: 'Hello' }),
});

// Server Route Handler holds the secret
const sgRes = await fetch('https://api.sendgrid.com/v3/mail/send', {
  headers: { Authorization: \`Bearer \${process.env.SENDGRID_API_KEY}\` },
  method: 'POST',
  body: JSON.stringify(mailPayload),
});`,
  },
  {
    id: 63,
    category: 'API Auth & Security',
    question: 'What is mTLS and when is it used for API security?',
    answer: 'Mutual TLS (mTLS) requires both client and server to present X.509 certificates during the TLS handshake, providing strong machine-to-machine authentication beyond bearer tokens. It is common in service meshes, banking integrations, and high-trust B2B APIs where IP allowlists alone are insufficient. Browser-based SPAs rarely use mTLS directly; servers and IoT devices do. For example, a payment processor partner API accepts connections only from clients presenting a company-issued certificate. In a real app, Kubernetes sidecars terminate mTLS between microservices while public REST endpoints still use OAuth for external developers.',
    code: `// Node.js client with client certificate (simplified)
import https from 'https';
import fs from 'fs';

const agent = new https.Agent({
  cert: fs.readFileSync('./client-cert.pem'),
  key: fs.readFileSync('./client-key.pem'),
  ca: fs.readFileSync('./ca.pem'),
});

fetch('https://partner-api.bank.com/transfers', { agent });`,
  },
]
