import type { InterviewQuestion } from '../../types'

export const routingQuestions: InterviewQuestion[] = [
  {
    id: 16,
    category: 'Routing',
    question: 'How does routing work in the app directory?',
    answer: 'The app directory uses filesystem-based routing where folders define URL segments and page.tsx files expose those segments as public routes. A URL like /blog/2024/my-post maps to app/blog/2024/my-post/page.tsx, and parent folders can provide shared layouts without being routes themselves unless they contain page.tsx. Route segments can be static folders, dynamic [param] folders, or catch-all [...slug] folders. For example, creating app/settings/account/page.tsx automatically adds the /settings/account route with no router configuration file.',
    code: `// app/settings/account/page.tsx → /settings/account
export default function AccountPage() {
  return <h1>Account Settings</h1>;
}

// app/settings/layout.tsx wraps all /settings/* pages
export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="settings-shell">
      <nav>Settings nav</nav>
      {children}
    </div>
  );
}`,
  },
  {
    id: 17,
    category: 'Routing',
    question: 'What is page.tsx in the App Router?',
    answer: 'page.tsx is the special file that defines the unique UI for a route segment and makes that URL publicly accessible. Without page.tsx, a folder is not a routable endpoint—it may only exist to hold layouts or organize files. Each page.tsx default export is a React component that becomes the main content for that path. In a real app, app/checkout/page.tsx renders the checkout form at /checkout while app/checkout/layout.tsx might wrap it with a progress stepper shared across checkout steps.',
    code: `// app/checkout/page.tsx
export default function CheckoutPage() {
  return (
    <main>
      <h1>Checkout</h1>
      <form action="/api/orders" method="post">
        <button type="submit">Place order</button>
      </form>
    </main>
  );
}`,
  },
  {
    id: 18,
    category: 'Routing',
    question: 'What is layout.tsx and how does it differ from page.tsx?',
    answer: 'layout.tsx wraps child routes with shared UI that persists across navigations—think nav bars, sidebars, or theme providers—while page.tsx renders the segment-specific content that changes when the URL changes. Layouts do not remount when navigating between sibling pages, which preserves state in the layout and avoids re-fetching shared data. A route can have multiple nested layouts, each wrapping deeper segments. For example, app/dashboard/layout.tsx keeps a sidebar mounted while app/dashboard/analytics/page.tsx and app/dashboard/reports/page.tsx swap their main content.',
    code: `// app/dashboard/layout.tsx — shared shell, persists on navigation
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <aside>Dashboard sidebar</aside>
      <section>{children}</section>
    </div>
  );
}

// app/dashboard/analytics/page.tsx — swaps when URL changes
export default function AnalyticsPage() {
  return <h1>Analytics</h1>;
}`,
  },
  {
    id: 19,
    category: 'Routing',
    question: 'How do dynamic routes work with [id]?',
    answer: 'Dynamic route segments use square brackets in the folder name, such as [id] or [slug], and the matched value is passed to page.tsx via the params prop. This lets one page component handle many URLs like /products/1, /products/2, and so on. In Next.js 15+, params is a Promise in async server components and should be awaited. For example, app/products/[id]/page.tsx serves every product detail URL and reads id from params to fetch the correct record.',
    code: `// app/products/[id]/page.tsx → /products/42, /products/abc, etc.
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await fetch(\`/api/products/\${id}\`).then((r) => r.json());

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
    </div>
  );
}`,
  },
  {
    id: 20,
    category: 'Routing',
    question: 'What are catch-all and optional catch-all routes?',
    answer: 'Catch-all segments use [...slug] to match one or more trailing path segments, so app/docs/[...slug]/page.tsx handles /docs/a, /docs/a/b, and deeper paths. Optional catch-all segments use [[...slug]] and also match the parent path with zero extra segments, so the same page.tsx can serve /docs and /docs/getting-started/install. The slug param is always an array of strings. In a real app, a documentation site uses [[...slug]] so /docs renders the docs home and /docs/api/auth renders a nested doc page from one route file.',
    code: `// app/docs/[[...slug]]/page.tsx
// Matches: /docs, /docs/guide, /docs/guide/setup

export default async function DocsPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug = [] } = await params;
  const path = slug.join("/") || "index";
  const doc = await loadDoc(path);

  return <article>{doc.content}</article>;
}`,
  },
  {
    id: 21,
    category: 'Routing',
    question: 'What are route groups and why use parentheses in folder names?',
    answer: 'Route groups are folders wrapped in parentheses like (marketing) or (shop) that organize files without affecting the URL path. They let you apply different layouts to different sections while keeping clean URLs—app/(marketing)/about/page.tsx is still /about, not /marketing/about. Groups are useful when two parts of the app need different shells but should not add extra URL segments. For example, (auth)/login/page.tsx and (auth)/register/page.tsx share a minimal auth layout while (app)/dashboard/page.tsx uses the full application chrome.',
    code: `// app/(marketing)/layout.tsx — landing page chrome
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>Marketing header</header>
      {children}
    </>
  );
}

// app/(marketing)/about/page.tsx → /about (not /marketing/about)
export default function AboutPage() {
  return <h1>About us</h1>;
}`,
  },
  {
    id: 22,
    category: 'Routing',
    question: 'How do nested layouts work in the App Router?',
    answer: 'Nested layouts stack automatically—each layout.tsx wraps all routes in its folder and subfolders, composing outer shells around inner ones. The root app/layout.tsx wraps everything, segment layouts add their UI, and page.tsx renders innermost content inside the innermost applicable layout. Layouts can fetch data and include client or server components as needed. In a real app, the root layout sets html lang and fonts, a shop layout adds a cart header, and the product page layout adds breadcrumbs—all nested without prop drilling.',
    code: `// app/layout.tsx — root
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

// app/shop/layout.tsx — nested under root
export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <header>Shop nav + cart</header>
      {children}
    </div>
  );
}`,
  },
  {
    id: 23,
    category: 'Routing',
    question: 'What is loading.tsx and when is it shown?',
    answer: 'loading.tsx defines instant loading UI for a route segment and is automatically wrapped in a React Suspense boundary by Next.js. While the server renders page.tsx or fetches async data, users see the loading fallback instead of a blank screen. loading.tsx applies to the segment and its children, and navigating between sibling routes can show the loading state for the changing segment. In a real app, app/orders/loading.tsx displays skeleton table rows while app/orders/page.tsx awaits a slow database query.',
    code: `// app/orders/loading.tsx — shown while page.tsx is resolving
export default function Loading() {
  return (
    <div aria-busy="true">
      <div className="skeleton h-8 w-48" />
      <div className="skeleton h-4 w-full mt-4" />
      <div className="skeleton h-4 w-full mt-2" />
    </div>
  );
}

// app/orders/page.tsx
export default async function OrdersPage() {
  const orders = await fetchOrders();
  return <OrdersTable orders={orders} />;
}`,
  },
  {
    id: 24,
    category: 'Routing',
    question: 'What is error.tsx and how does error handling work in routes?',
    answer: 'error.tsx is a Client Component boundary that catches runtime errors in its route segment and below, showing a fallback UI instead of crashing the whole app. It receives error and reset props—reset re-renders the segment to retry after a transient failure. Errors bubble up to the nearest error.tsx, so granular files can handle section-specific failures. In a real app, app/dashboard/error.tsx shows "Could not load dashboard" with a retry button while the rest of the site navigation still works.',
    code: `"use client";

// app/dashboard/error.tsx
export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div role="alert">
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}`,
  },
  {
    id: 25,
    category: 'Routing',
    question: 'What is not-found.tsx and how do you trigger a 404?',
    answer: 'not-found.tsx renders custom UI when a route segment cannot be found, and calling notFound() from next/navigation triggers it for that segment. Unlike error.tsx, it handles expected missing resources rather than unexpected exceptions. You can define not-found.tsx at different levels so a missing product shows a shop-specific 404 while unknown top-level paths use the root 404. In a real app, a product page calls notFound() when the database returns null so users see a helpful message instead of an empty page.',
    code: `import { notFound } from "next/navigation";

// app/products/[id]/page.tsx
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound(); // renders app/products/[id]/not-found.tsx or nearest parent
  }

  return <h1>{product.name}</h1>;
}

// app/products/[id]/not-found.tsx
export default function ProductNotFound() {
  return <p>Product not found.</p>;
}`,
  },
  {
    id: 26,
    category: 'Routing',
    question: 'When should you use Link versus useRouter for navigation?',
    answer: 'Use the Link component from next/link for declarative navigation in JSX—it prefetches routes in the viewport and renders a proper anchor for accessibility and SEO. Use useRouter from next/navigation for imperative navigation after events like form success, logout, or wizard steps where there is no natural anchor element. Link is preferred for most in-app navigation because prefetching makes transitions feel instant. In a real app, sidebar menu items use Link, while a "Save and continue" button calls router.push("/onboarding/step-2") after a Server Action succeeds.',
    code: `import Link from "next/link";
import { useRouter } from "next/navigation";

// Declarative — prefetching, accessible anchor
export function Nav() {
  return (
    <nav>
      <Link href="/products">Products</Link>
    </nav>
  );
}

// Imperative — after an action completes
"use client";

export function SaveButton() {
  const router = useRouter();

  async function handleSave() {
    await saveProfile();
    router.push("/profile");
  }

  return <button onClick={handleSave}>Save</button>;
}`,
  },
  {
    id: 27,
    category: 'Routing',
    question: 'What are parallel routes in the App Router?',
    answer: 'Parallel routes render multiple pages in the same layout simultaneously using named slots defined with @folder syntax, such as @analytics and @team inside a dashboard layout. Each slot can have its own loading and error states and can be navigated independently while sharing the same URL. They are commonly combined with intercepting routes for modals that preserve context. For example, app/dashboard/@metrics/page.tsx and app/dashboard/@activity/page.tsx render side-by-side panels in app/dashboard/layout.tsx without nested URL paths.',
    code: `// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
  metrics,
  activity,
}: {
  children: React.ReactNode;
  metrics: React.ReactNode;
  activity: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <section>{metrics}</section>
      <section>{activity}</section>
      <main className="col-span-2">{children}</main>
    </div>
  );
}

// app/dashboard/@metrics/page.tsx — parallel slot, same /dashboard URL
export default function MetricsSlot() {
  return <div>Live metrics panel</div>;
}`,
  },
]
