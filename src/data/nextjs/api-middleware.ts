import type { InterviewQuestion } from '../../types'

export const apiMiddlewareQuestions: InterviewQuestion[] = [
  {
    id: 62,
    category: 'API & Middleware',
    question: 'What are Route Handlers in the Next.js App Router?',
    answer: 'Route Handlers are functions exported from route.ts files inside the app directory that define HTTP API endpoints, replacing the Pages Router\'s pages/api pattern. They support standard Web Request and Response objects and export named functions for HTTP methods like GET, POST, PUT, and DELETE. Route Handlers can run on the Edge or Node.js runtime and participate in caching when using GET with appropriate cache headers. For example, app/api/users/route.ts exporting async function GET() serves JSON at /api/users. In a real app, a mobile client might call /api/webhooks/stripe as a Route Handler to receive payment events while your Next.js frontend uses Server Actions for form mutations instead.',
    code: `// app/api/users/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const users = await db.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();
  const user = await db.user.create({ data: body });
  return NextResponse.json(user, { status: 201 });
}`,
  },
  {
    id: 63,
    category: 'API & Middleware',
    question: 'How do GET and POST Route Handlers work in Next.js?',
    answer: 'Route Handlers map HTTP verbs to exported async functions in a route.ts file—GET handles read requests and POST handles create or action requests, each receiving a Request object and returning a Response or NextResponse. GET handlers can be statically cached at build time if they do not read dynamic data, while POST handlers are always dynamic. You parse JSON with await request.json(), read query params from new URL(request.url).searchParams, and set status codes on the response. For example, GET /api/products returns a list while POST /api/products creates a new record from the request body. In a real app, a search autocomplete endpoint uses GET with ?q= query params and a checkout endpoint uses POST with a cart payload validated on the server.',
    code: `// app/api/products/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') ?? '';
  const products = await searchProducts(q);
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const body = await request.json();
  const product = await createProduct(body);
  return NextResponse.json(product, { status: 201 });
}`,
  },
  {
    id: 64,
    category: 'API & Middleware',
    question: 'What is middleware.ts in Next.js and what does it do?',
    answer: 'middleware.ts is a file placed at the project root (or src root) that runs before a request is completed, letting you intercept every matching route to rewrite, redirect, modify headers, or check authentication. It executes on the Edge runtime for low latency and runs before static files, pages, and Route Handlers are served. The middleware function receives a NextRequest and returns a NextResponse, or nothing to continue the request unchanged. For example, middleware can read a session cookie and redirect unauthenticated users away from /dashboard routes. In a real app, middleware adds a correlation ID header to every incoming request so downstream logs can be traced across services.',
    code: `// middleware.ts (project or src root)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('session')?.value;

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}`,
  },
  {
    id: 65,
    category: 'API & Middleware',
    question: 'How does the middleware matcher config work?',
    answer: 'The matcher export in middleware.ts defines which paths trigger your middleware, using string patterns or regular expressions to include or exclude routes efficiently. Without a matcher, middleware runs on every request including static assets, which adds unnecessary overhead. Patterns support dynamic segments like /dashboard/:path* and negative lookahead to skip _next/static or image files. For example, matcher: ["/dashboard/:path*", "/admin/:path*"] limits middleware to protected areas only. In a real app, you exclude api/webhooks from auth middleware so Stripe can POST without a session cookie while still guarding all /app routes.',
    code: `// middleware.ts
export const config = {
  matcher: [
    // Match all dashboard and admin routes
    '/dashboard/:path*',
    '/admin/:path*',
    // Skip static files and API webhooks
    '/((?!_next/static|_next/image|favicon.ico|api/webhooks).*)',
  ],
};`,
  },
  {
    id: 66,
    category: 'API & Middleware',
    question: 'How do you perform redirects in Next.js middleware?',
    answer: 'In middleware you create a redirect with NextResponse.redirect(url) where url is an absolute URL, typically built from request.url as the base. Redirects run before the page renders, so they are ideal for auth gates, locale detection, and canonical URL enforcement with zero flash of unauthorized content. You can also use NextResponse.rewrite for internal proxying that keeps the browser URL unchanged. For example, redirecting users without a valid token from /settings to /login happens entirely in middleware before any server component runs. In a real app, middleware reads Accept-Language and redirects visitors from / to /en or /fr before the homepage renders.',
    code: `import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Auth redirect
  if (!request.cookies.get('session') && pathname.startsWith('/settings')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Locale redirect
  if (pathname === '/') {
    const locale = request.headers.get('accept-language')?.startsWith('fr')
      ? 'fr'
      : 'en';
    return NextResponse.redirect(new URL(\`/\${locale}\`, request.url));
  }

  return NextResponse.next();
}`,
  },
  {
    id: 67,
    category: 'API & Middleware',
    question: 'How do you handle authentication in Next.js middleware?',
    answer: 'Authentication in middleware typically reads a session token from cookies or headers, validates it (often via JWT decode or a fast edge-compatible check), and redirects or rewrites before protected routes render. Middleware is the first gate—it should do lightweight verification and defer full session lookups to Server Components or Route Handlers when needed. You can also attach user info to request headers via NextResponse.next({ request: { headers } }) for downstream server code to read. For example, middleware checks for a session cookie and redirects to /login if missing on /dashboard paths. In a real app, middleware validates a signed JWT, sets x-user-id on the request, and server components read that header to fetch user-specific data without re-parsing the token.',
    code: `import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth-edge';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('session')?.value;

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    const payload = await verifyToken(token);
    if (!payload) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}`,
  },
  {
    id: 68,
    category: 'API & Middleware',
    question: 'Why does Next.js middleware run on the Edge runtime?',
    answer: 'Middleware runs on the Edge runtime because it executes on every matched request and must add minimal latency—Edge isolates start faster and run geographically close to the user on platforms like Vercel. The Edge constraint is acceptable for middleware tasks like cookie checks, redirects, and header rewrites that do not need full Node.js APIs. Heavy work like database queries or file I/O belongs in Server Components or Route Handlers on Node.js instead. For example, a simple JWT expiry check in middleware completes in milliseconds at the edge before the request reaches your origin server. In a real app, middleware at the edge blocks bot traffic by checking User-Agent patterns globally without loading your Node.js server for every rejected request.',
    code: `// middleware.ts always runs on Edge — no export needed
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const ua = request.headers.get('user-agent') ?? '';

  if (/bot|crawler|spider/i.test(ua)) {
    return new NextResponse('Forbidden', { status: 403 });
  }

  return NextResponse.next();
}

export const config = { matcher: '/:path*' };`,
  },
  {
    id: 69,
    category: 'API & Middleware',
    question: 'How do you read and set cookies and headers in Next.js server code?',
    answer: 'In Server Components and Server Actions, use cookies() and headers() from next/headers to read incoming request data—these are async in Next.js 15 and dynamic, so they opt the route into dynamic rendering. In Route Handlers and middleware, use request.cookies and request.headers on the Request object, and set response cookies via NextResponse with cookies.set(). Server-side cookie access keeps secrets off the client and lets you gate content per session. For example, cookies().get("theme") in a layout reads the user\'s theme preference on the server to render the correct class on the html element. In a real app, a Server Action sets an httpOnly session cookie after login while middleware reads it on subsequent requests to protect routes.',
    code: `// Server Component — read cookies/headers
import { cookies, headers } from 'next/headers';

export default async function Layout({ children }) {
  const theme = (await cookies()).get('theme')?.value ?? 'light';
  const locale = (await headers()).get('accept-language')?.split(',')[0];
  return <html data-theme={theme} lang={locale}>{children}</html>;
}

// Route Handler — set a cookie on response
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set('session', 'abc123', { httpOnly: true, secure: true });
  return response;
}`,
  },
  {
    id: 70,
    category: 'API & Middleware',
    question: 'What is the difference between rewrite and redirect in Next.js?',
    answer: 'A redirect (NextResponse.redirect or redirect() from next/navigation) sends an HTTP 3xx response that changes the URL visible in the browser, telling the client to make a new request to the target path. A rewrite (NextResponse.rewrite or next.config.js rewrites) proxies the request internally to a different path while the browser URL stays the same, useful for masking implementation details or routing to external services. Redirects are appropriate for auth flows and canonical URLs; rewrites are appropriate for serving content from another path or backend transparently. For example, redirect unauthenticated users from /admin to /login so the URL reflects where they are. In a real app, rewrite /docs/* to a hosted documentation site so users see yourdomain.com/docs while content is served from docs.yourdomain.com.',
    code: `// middleware.ts — redirect (browser URL changes)
return NextResponse.redirect(new URL('/login', request.url));

// middleware.ts — rewrite (browser URL stays the same)
return NextResponse.rewrite(new URL('/internal/dashboard', request.url));

// next.config.ts — static rewrite
// async rewrites() {
//   return [{ source: '/docs/:path*', destination: 'https://docs.example.com/:path*' }];
// }`,
  },
  {
    id: 71,
    category: 'API & Middleware',
    question: 'When should you use Route Handlers versus Server Actions?',
    answer: 'Server Actions are best for mutations and form submissions from your Next.js UI—they integrate with revalidation, progressive enhancement, and React form state without you building REST endpoints manually. Route Handlers are best when you need a traditional HTTP API consumed by external clients, webhooks, mobile apps, or third-party services that expect standard REST endpoints. Server Actions are not a general-purpose public API because they use a special protocol tied to your Next.js app. For example, use a Server Action for an in-app "Save profile" button but a Route Handler POST /api/webhooks/github for GitHub event delivery. In a real app, the React frontend calls createInvoice as a Server Action while the finance team\'s external tooling hits /api/invoices with an API key through a Route Handler.',
    code: `// Server Action — for your Next.js UI mutations
'use server';
export async function createInvoice(formData: FormData) {
  await db.invoice.create({ data: { /* ... */ } });
  revalidatePath('/invoices');
}

// Route Handler — for external HTTP consumers
// app/api/invoices/route.ts
export async function POST(request: Request) {
  const apiKey = request.headers.get('x-api-key');
  if (apiKey !== process.env.API_KEY) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await request.json();
  const invoice = await db.invoice.create({ data: body });
  return Response.json(invoice);
}`,
  },
]
