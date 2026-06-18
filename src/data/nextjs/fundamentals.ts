import type { InterviewQuestion } from '../../types'

export const fundamentalsQuestions: InterviewQuestion[] = [
  {
    id: 1,
    category: 'Fundamentals',
    question: 'What is Next.js?',
    answer: 'Next.js is a React framework for building full-stack web applications with built-in routing, rendering strategies, and server-side capabilities. It extends React with file-based routing, server rendering, API routes, and optimizations like automatic code splitting and image handling. You write React components as usual, but Next.js decides how and where each page is rendered—on the server, at build time, or in the browser. In a real app, a product catalog might fetch inventory on the server so users see items immediately while still using React components for the UI.',
    code: `// app/products/page.tsx — a route rendered by Next.js
export default async function ProductsPage() {
  const products = await fetch("https://api.example.com/products").then(
    (res) => res.json()
  );

  return (
    <main>
      <h1>Products</h1>
      <ul>
        {products.map((p: { id: string; name: string }) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </main>
  );
}`,
  },
  {
    id: 2,
    category: 'Fundamentals',
    question: 'What is the difference between React and Next.js?',
    answer: 'React is a UI library focused on building component-based interfaces and managing client-side state and rendering. Next.js is a framework built on top of React that adds routing, data fetching conventions, server rendering, and production tooling out of the box. With plain React you choose your own router, bundler, and rendering approach; with Next.js those decisions are opinionated and integrated. For example, a React SPA might need React Router, Vite, and a separate Express server, while the same feature in Next.js uses file-based routes and Server Components in one project.',
    code: `// Plain React — you wire routing yourself
// <BrowserRouter>
//   <Routes>
//     <Route path="/dashboard" element={<Dashboard />} />
//   </Routes>
// </BrowserRouter>

// Next.js — file creates the route automatically
// app/dashboard/page.tsx
export default function DashboardPage() {
  return <h1>Dashboard</h1>;
}`,
  },
  {
    id: 3,
    category: 'Fundamentals',
    question: 'What is the difference between the App Router and Pages Router?',
    answer: 'The Pages Router (pages/ directory) was the original Next.js routing system using files like pages/about.tsx and data functions such as getStaticProps and getServerSideProps. The App Router (app/ directory, Next.js 13+) is the modern default and supports React Server Components, nested layouts, streaming, and colocated special files like loading.tsx and error.tsx. New projects should use the App Router because it aligns with React\'s direction and offers better composition for layouts and server rendering. In a real app, migrating from pages/blog/[slug].tsx to app/blog/[slug]/page.tsx unlocks shared layouts and server components for the blog shell.',
    code: `// Pages Router (legacy)
// pages/blog/[slug].tsx
// export async function getStaticProps({ params }) { ... }

// App Router (modern)
// app/blog/[slug]/page.tsx
export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <article>{slug}</article>;
}`,
  },
  {
    id: 4,
    category: 'Fundamentals',
    question: 'How does file-based routing work in Next.js?',
    answer: 'In the App Router, the folder structure inside app/ maps directly to URL paths—each folder represents a route segment and a page.tsx file makes that segment publicly accessible. Folders without page.tsx are used for organization or shared layouts but do not create standalone routes. Dynamic segments use bracket syntax like [id] and optional catch-all segments use [[...slug]]. For example, app/settings/profile/page.tsx is served at /settings/profile without configuring a separate router file.',
    code: `// File structure → URL
// app/page.tsx              → /
// app/about/page.tsx        → /about
// app/blog/[slug]/page.tsx  → /blog/hello-world

// app/blog/[slug]/page.tsx
export default function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  return <h1>Post: {params.slug}</h1>;
}`,
  },
  {
    id: 5,
    category: 'Fundamentals',
    question: 'What are SSR, SSG, and CSR in Next.js?',
    answer: 'Server-Side Rendering (SSR) generates HTML on each request, which is ideal for personalized or frequently changing data. Static Site Generation (SSG) pre-renders pages at build time into HTML that can be cached on a CDN for maximum speed. Client-Side Rendering (CSR) sends a minimal shell and fetches data in the browser with JavaScript, similar to a traditional SPA. Next.js supports all three and lets you pick per route. In a real app, a marketing homepage might be statically generated while a logged-in dashboard is server-rendered per request.',
    code: `// SSG — force static at build time
export const dynamic = "force-static";

export default function HomePage() {
  return <h1>Static marketing page</h1>;
}

// SSR — render on each request (default for dynamic data)
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  return <h1>Welcome, {user.name}</h1>;
}`,
  },
  {
    id: 6,
    category: 'Fundamentals',
    question: 'Why is Next.js considered a full-stack framework?',
    answer: 'Next.js lets you build both frontend UI and backend logic in a single codebase without a separate API server. Route Handlers in app/api/ define HTTP endpoints, Server Components fetch data directly from databases, and Server Actions run mutations on the server from form submissions. Deployment, bundling, and routing are unified so teams ship features faster with fewer moving parts. For example, a checkout form can call a Server Action that writes to Postgres while the product page reads from the same database in a Server Component.',
    code: `// app/api/health/route.ts — backend endpoint
export async function GET() {
  return Response.json({ status: "ok" });
}

// app/checkout/actions.ts — server mutation
"use server";

export async function placeOrder(formData: FormData) {
  const itemId = formData.get("itemId") as string;
  await db.orders.create({ itemId });
}`,
  },
  {
    id: 7,
    category: 'Fundamentals',
    question: 'When should you choose Next.js for a project?',
    answer: 'Choose Next.js when you need SEO-friendly rendering, fast first loads, or server-side data access alongside React UI. It fits marketing sites, e-commerce, dashboards with authentication, and content-heavy apps where static or server rendering improves performance and discoverability. Plain React with Vite may be simpler for internal tools behind a login that do not need SEO or server rendering. In a real app, a public documentation site benefits from Next.js SSG and full-text search, while a browser-only Figma plugin does not need a framework like Next.js at all.',
    code: `// Good fit: public, SEO-sensitive route with server data
// app/docs/[...slug]/page.tsx
export default async function DocPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const doc = await fetchDoc(slug.join("/"));
  return <article dangerouslySetInnerHTML={{ __html: doc.html }} />;
}`,
  },
  {
    id: 8,
    category: 'Fundamentals',
    question: 'How do you create a new Next.js project with create-next-app?',
    answer: 'Run npx create-next-app@latest and follow the prompts to choose TypeScript, ESLint, Tailwind CSS, the App Router, and src/ directory layout. The CLI scaffolds a working project with scripts for development, production build, and start. You can also pass flags non-interactively, such as --typescript --app --tailwind for CI or team conventions. For example, npx create-next-app@latest my-store --typescript --app creates a typed App Router project ready for npm run dev.',
    code: `# Interactive setup
npx create-next-app@latest

# Non-interactive example
npx create-next-app@latest my-app \\
  --typescript \\
  --eslint \\
  --tailwind \\
  --app \\
  --src-dir

# Then start developing
cd my-app && npm run dev`,
  },
  {
    id: 9,
    category: 'Fundamentals',
    question: 'What is the app/ directory project structure in Next.js?',
    answer: 'The app/ directory is the root of the App Router where routes, layouts, and special files live. Every route segment is a folder; page.tsx defines the UI for that URL, layout.tsx wraps child routes with shared chrome, and optional files like loading.tsx, error.tsx, and not-found.tsx handle UX states. The root app/layout.tsx wraps the entire application and must include html and body tags. In a real app, app/(marketing)/about/page.tsx and app/(shop)/products/page.tsx can share different layout groups while keeping URLs clean.',
    code: `// Typical App Router structure
// app/
//   layout.tsx          — root layout (html, body)
//   page.tsx            — home route (/)
//   globals.css
//   dashboard/
//     layout.tsx        — sidebar for all /dashboard/*
//     page.tsx          — /dashboard
//     settings/
//       page.tsx        — /dashboard/settings
//   api/
//     users/route.ts    — /api/users endpoint`,
  },
  {
    id: 10,
    category: 'Fundamentals',
    question: 'What do next dev, next build, and next start do?',
    answer: 'next dev starts a local development server with Fast Refresh so code changes appear instantly without losing component state. next build compiles the application for production, pre-rendering static pages and preparing optimized server and client bundles. next start serves the output of next build in production mode—you run build first, then start on your host or platform. For example, CI runs next build on every merge and your container runs next start to serve users the compiled app on port 3000.',
    code: `// package.json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}

// Development: hot reload at http://localhost:3000
// npm run dev

// Production: build then serve
// npm run build && npm run start`,
  },
  {
    id: 11,
    category: 'Fundamentals',
    question: 'What are React Server Components in Next.js?',
    answer: 'React Server Components (RSC) are components that render on the server and send HTML to the client without shipping their JavaScript bundle. In the App Router, components are Server Components by default—they can be async, query databases directly, and access server-only modules. Client Components marked with "use client" handle interactivity like useState and onClick handlers. In a real app, a ProductPage server component fetches pricing from your API while a separate AddToCart client component manages click handlers and cart state.',
    code: `// Server Component (default) — no directive needed
export default async function ProductPage({ id }: { id: string }) {
  const product = await db.products.find(id);
  return (
    <div>
      <h1>{product.name}</h1>
      <AddToCart productId={id} />
    </div>
  );
}

// Client Component — interactivity
"use client";

export function AddToCart({ productId }: { productId: string }) {
  return <button onClick={() => addItem(productId)}>Add to cart</button>;
}`,
  },
  {
    id: 12,
    category: 'Fundamentals',
    question: 'What is the relationship between Next.js and Vercel?',
    answer: 'Next.js is an open-source framework originally created by Vercel and can be deployed anywhere that runs Node.js, Docker, or static hosting. Vercel is the company that maintains Next.js and offers a hosting platform with first-class support for its features like ISR, edge functions, and preview deployments. Using Vercel is optional—many teams run Next.js on AWS, Railway, or self-managed infrastructure. In a real app, you might develop locally with next dev and deploy to Vercel for automatic preview URLs on every pull request, or to your own Kubernetes cluster with next build and next start.',
    code: `// next.config.ts — works on any host, not just Vercel
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // Docker-friendly production bundle
};

export default nextConfig;

// Deploy targets: Vercel, AWS, Docker, Node server, etc.`,
  },
  {
    id: 13,
    category: 'Fundamentals',
    question: 'What is hybrid rendering in Next.js?',
    answer: 'Hybrid rendering means different routes in the same application can use different rendering strategies—static, server-rendered, or client-rendered—chosen per page based on its data and freshness needs. Next.js decides at build time and request time how each segment should render, and you can opt in with exports like dynamic, revalidate, or fetch cache options. This avoids forcing one global approach on every page. For example, a storefront might statically generate category pages, server-render personalized cart data, and client-render a live chat widget on the same site.',
    code: `// Static product listing — regenerated every hour
export const revalidate = 3600;

export default async function ProductsPage() {
  const products = await fetchProducts();
  return <ProductGrid items={products} />;
}

// Always fresh order status — server-rendered per request
export const dynamic = "force-dynamic";

export default async function OrderPage({ params }: { params: { id: string } }) {
  const order = await fetchOrder(params.id);
  return <OrderDetails order={order} />;
}`,
  },
  {
    id: 14,
    category: 'Fundamentals',
    question: 'What is Incremental Static Regeneration (ISR)?',
    answer: 'ISR lets statically generated pages update after deployment without rebuilding the entire site. You set a revalidate interval in seconds, and Next.js serves the cached static page while regenerating a fresh version in the background when the timer expires. The first visitor after expiry may still see stale content briefly while the new page builds, then everyone gets the updated version. In a real app, a news site might set revalidate: 60 on article pages so content refreshes every minute without a full redeploy on every headline change.',
    code: `// Regenerate this page at most once every 60 seconds
export const revalidate = 60;

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await fetch(\`https://cms.example.com/posts/\${slug}\`).then(
    (r) => r.json()
  );

  return (
    <article>
      <h1>{article.title}</h1>
      <p>{article.body}</p>
    </article>
  );
}`,
  },
  {
    id: 15,
    category: 'Fundamentals',
    question: 'What is streaming and Suspense in the App Router?',
    answer: 'Streaming sends HTML to the browser in chunks as each part of the page finishes rendering, instead of waiting for the entire page to be ready. Wrap slow server components in Suspense with a fallback UI, and Next.js streams the shell immediately while data-heavy sections resolve. This improves perceived performance on pages with mixed fast and slow data sources. In a real app, a dashboard layout and sidebar render instantly while a Suspense boundary shows skeleton rows until the analytics query completes.',
    code: `import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<p>Loading stats…</p>}>
        <SlowStats />
      </Suspense>
    </div>
  );
}

async function SlowStats() {
  const stats = await fetchStats(); // slow query
  return <ul>{stats.map((s) => <li key={s.id}>{s.label}</li>)}</ul>;
}`,
  },
]
