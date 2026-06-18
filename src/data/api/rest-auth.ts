import type { InterviewQuestion } from '../../types'

export const restAuthQuestions: InterviewQuestion[] = [
  {
    id: 46,
    category: 'API Auth & Security',
    question: 'What is JWT and how is it used in REST APIs?',
    answer: 'A JSON Web Token (JWT) is a compact, signed string containing claims (payload) that prove identity or permissions without the server storing session state. The client sends it in the Authorization: Bearer header on each request; the server verifies the signature and expiry before authorizing. JWTs are stateless but cannot be revoked easily without a blocklist or short expiry.',
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
    answer: 'OAuth 2.0 is an authorization framework where users grant third-party apps limited access via an authorization server, without sharing their password with the client app. It uses flows like Authorization Code with PKCE for SPAs and mobile apps, issuing access tokens scoped to specific permissions. API keys identify an application or developer account and are simpler but less suited for end-user consent and fine-grained delegation.',
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
    answer: 'API keys identify projects or services for machine-to-machine access—billing meters, webhooks, admin scripts, and partner integrations where OAuth user consent is unnecessary. Never expose secret keys in frontend bundles; restrict keys by IP, referrer, or scope and rotate them on leak. Public publishable keys may live in clients when they only allow low-risk operations.',
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
    answer: 'A Bearer token is an access token sent in the Authorization header with the scheme Bearer, meaning whoever bears the token is granted access until it expires or is revoked. It is the standard way to attach JWTs and OAuth access tokens to REST requests. Tokens must travel over HTTPS only to prevent interception. authenticates GET /api/projects.',
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
    answer: 'Cross-Origin Resource Sharing (CORS) is a browser security mechanism that blocks JavaScript from reading responses from a different origin unless the server explicitly allows it via Access-Control-* headers. It prevents malicious sites from calling your API with the user cookies and reading private data. Simple GET requests may skip preflight; requests with custom headers or PATCH/DELETE trigger an OPTIONS preflight.',
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
    answer: 'Cross-Site Request Forgery tricks a logged-in user browser into making unwanted authenticated requests to your API using cookies the browser sends automatically. SPAs using Bearer tokens in memory are less vulnerable to classic CSRF than cookie-session apps, but cookie-based auth needs SameSite cookies, CSRF tokens, or double-submit cookies on mutating requests. State-changing endpoints should never use GET.',
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
    answer: 'Refresh tokens are long-lived credentials used only to obtain new access tokens without re-prompting the user for a password. Short-lived access tokens limit damage if leaked because they expire quickly; refresh tokens stay in HttpOnly cookies or secure storage and rotate on each use to detect theft. The refresh endpoint validates the refresh token and returns a fresh access token pair.',
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
    answer: 'Store refresh tokens in HttpOnly, Secure, SameSite cookies so JavaScript cannot read them, reducing XSS token theft. Keep short-lived access tokens in memory (variable or closure) rather than localStorage when possible; if you must persist access tokens, weigh XSS risk carefully. Never store secrets in localStorage for high-security apps because any injected script can exfiltrate them.',
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
    answer: 'Proof Key for Code Exchange (PKCE) adds a code_verifier and code_challenge to the OAuth Authorization Code flow so intercepted authorization codes cannot be exchanged for tokens without the original verifier. Public clients like SPAs and mobile apps cannot safely store a client secret, so PKCE replaces that trust. The client generates a random verifier, sends a hashed challenge with the authorize request, and sends the verifier at token exchange.',
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
    answer: 'Authentication verifies who the caller is—login, JWT validation, API key lookup. Authorization decides what that identity may do—role checks, resource ownership, scoped OAuth permissions. An API can authenticate successfully yet return 403 Forbidden if the user lacks permission for that action.',
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
    answer: 'Scopes are strings like read:orders or write:profile that limit what an access token may do, included in the token claims or looked up server-side. APIs should check required scopes on each endpoint rather than assuming any valid token has full access. Least privilege means requesting only scopes your feature needs during OAuth consent.',
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
    answer: 'Frontend role checks and hidden buttons are UX only—attackers can call your API directly with curl or modified clients bypassing any JavaScript guards. Every protected endpoint must validate tokens and permissions on the server before reading or writing data. Client-side route guards prevent accidental access but are not security boundaries.',
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
    answer: 'The credentials option controls whether cookies, client certificates, and Authorization headers affected by CORS are sent on cross-origin requests. credentials: "include" sends cookies and requires the server to respond with Access-Control-Allow-Credentials: true and a specific Allow-Origin (not *). Same-origin requests include cookies by default.',
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
    answer: 'Detect 401 responses or decode JWT exp claim before requests fail, then silently refresh using a refresh token or redirect to login if refresh fails. Avoid infinite refresh loops by limiting retry count and clearing auth state on repeated failure. Proactively refresh shortly before expiry for seamless UX on long-lived pages.',
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
    answer: 'Relevant headers include Strict-Transport-Security to force HTTPS, X-Content-Type-Options: nosniff to prevent MIME sniffing, and Cache-Control: no-store on sensitive authenticated responses. CORS headers must be precise, not wildcard, when credentials are used. Content-Security-Policy applies more to HTML pages but API gateways often add standard security headers uniformly.',
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
    answer: 'Rate limiting caps how many requests a client may make in a time window, returning 429 Too Many Requests with Retry-After when exceeded. Clients should respect Retry-After, implement exponential backoff, and cache responses to avoid hammering the API. API keys often map to rate limit tiers for billing.',
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
    answer: 'Never expose third-party secret keys in frontend code—proxy requests through your server Route Handler or BFF (Backend for Frontend) that holds credentials in environment variables. Validate and sanitize data from third parties before forwarding to clients. Log request ids, not secrets, and use least-privilege API keys scoped to required operations.',
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
    answer: 'Mutual TLS (mTLS) requires both client and server to present X.509 certificates during the TLS handshake, providing strong machine-to-machine authentication beyond bearer tokens. It is common in service meshes, banking integrations, and high-trust B2B APIs where IP allowlists alone are insufficient. Browser-based SPAs rarely use mTLS directly; servers and IoT devices do.',
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
