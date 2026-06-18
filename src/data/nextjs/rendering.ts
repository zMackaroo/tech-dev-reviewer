import type { InterviewQuestion } from '../../types'

export const renderingQuestions: InterviewQuestion[] = [
  {
    id: 52,
    category: 'Rendering',
    question: 'What is Server-Side Rendering (SSR) in the Next.js App Router?',
    answer: 'In the App Router, SSR means the server renders React Server Components to HTML on each request when the route is dynamic, then streams the result to the browser where client components hydrate for interactivity. Unlike the Pages Router\'s getServerSideProps, you simply fetch data with async server components and Next.js decides at build or request time whether the route is static or dynamic. Dynamic signals like cookies(), headers(), searchParams, or noStore trigger per-request rendering. For example, a search results page that reads ?q= from the URL renders fresh HTML for every unique query. In a real app, an authenticated orders page fetches the user\'s purchases on the server each visit so they always see up-to-date shipment status without exposing API keys to the client.',
    code: `// app/orders/page.tsx — dynamically rendered per request
import { cookies } from 'next/headers';

export default async function OrdersPage() {
  const session = (await cookies()).get('session')?.value;
  const res = await fetch('https://api.example.com/orders', {
    headers: { Cookie: \`session=\${session}\` },
    cache: 'no-store',
  });
  const orders = await res.json();

  return (
    <ul>
      {orders.map((o) => (
        <li key={o.id}>{o.status}</li>
      ))}
    </ul>
  );
}`,
  },
  {
    id: 53,
    category: 'Rendering',
    question: 'What is Static Site Generation (SSG) in the Next.js App Router?',
    answer: 'SSG in the App Router means Next.js prerenders a route to static HTML and RSC payload at build time when all data fetching is cacheable and no dynamic APIs are used. The generated files are deployed to a CDN and served without running server rendering logic on each request, which is the fastest and cheapest delivery model. You do not need a special getStaticProps function—an async Server Component with default fetch caching is often enough. For example, a /about page with no dynamic inputs is fully static after next build. In a real app, documentation pages fetched from a CMS at build time load instantly worldwide because every visitor receives the same prebuilt HTML from the edge.',
    code: `// app/about/page.tsx — statically generated at build time
export default async function AboutPage() {
  const res = await fetch('https://cms.example.com/about');
  const content = await res.json();

  return (
    <article>
      <h1>{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.body }} />
    </article>
  );
}`,
  },
  {
    id: 54,
    category: 'Rendering',
    question: 'What is Incremental Static Regeneration (ISR) in the App Router?',
    answer: 'ISR lets statically generated pages update after deployment without rebuilding the entire site, by setting a revalidate interval on fetch calls or exporting revalidate on a route segment. When the cached page ages past that interval, the next request triggers background regeneration while stale content is still served, then subsequent visitors get the fresh version. This combines CDN speed with reasonably fresh data for content that changes on a schedule but not every second. For example, export const revalidate = 3600 on a product listing refreshes prices hourly without a full redeploy. In a real app, a news site uses ISR with revalidate: 60 on article pages so breaking stories appear within a minute while still serving cached pages under traffic spikes.',
    code: `// app/blog/[slug]/page.tsx — ISR with hourly refresh
export const revalidate = 3600;

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await fetch(\`https://cms.example.com/posts/\${slug}\`, {
    next: { revalidate: 3600 },
  });
  const post = await res.json();

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.excerpt}</p>
    </article>
  );
}`,
  },
  {
    id: 55,
    category: 'Rendering',
    question: 'What is dynamic rendering in Next.js?',
    answer: 'Dynamic rendering means Next.js generates the HTML and RSC payload for a route at request time rather than at build time, so each visitor can receive different content based on cookies, headers, search params, or uncached data. Next.js automatically opts into dynamic rendering when it detects dynamic functions like cookies(), headers(), or connection from next/server, or when fetch uses cache: "no-store". You can also force it with export const dynamic = "force-dynamic". For example, a /profile route that reads the session cookie is always dynamic because the output depends on who is logged in. In a real app, A/B test variants assigned in middleware and read via headers produce dynamically rendered landing pages tailored per visitor.',
    code: `import { headers } from 'next/headers';

// Automatically dynamic because headers() is called
export default async function LandingPage() {
  const variant = (await headers()).get('x-ab-variant') ?? 'control';
  const content = await getVariantContent(variant);

  return <Hero headline={content.headline} cta={content.cta} />;
}

// Or explicitly force dynamic rendering
export const dynamic = 'force-dynamic';`,
  },
  {
    id: 56,
    category: 'Rendering',
    question: 'What do force-static and force-dynamic route segment config options do?',
    answer: 'These exports override Next.js automatic static/dynamic detection for an entire route segment. force-static tells Next.js to prerender the route at build time even if dynamic APIs are present, which can error or produce build-time snapshots depending on usage. force-dynamic ensures the route is rendered on every request, which is useful when you need fresh data but the route might otherwise appear static. They are set as export const dynamic = "force-static" or "force-dynamic" in a page, layout, or route handler file. For example, force-dynamic on an admin analytics page guarantees metrics are never served from a stale static cache. In a real app, a public status page might use force-static with build-time data while a /live-stats page uses force-dynamic to poll real-time metrics each request.',
    code: `// Always render on every request
export const dynamic = 'force-dynamic';

export default async function LiveStatsPage() {
  const stats = await fetch('https://api.example.com/live', {
    cache: 'no-store',
  });
  return <StatsPanel data={await stats.json()} />;
}

// Always prerender at build time
export const dynamic = 'force-static';`,
  },
  {
    id: 57,
    category: 'Rendering',
    question: 'What is streaming in Next.js?',
    answer: 'Streaming lets the server send HTML to the browser in chunks as each part of the page finishes rendering, instead of waiting for the entire page to be ready before sending anything. In the App Router this works automatically with React Server Components and Suspense boundaries, so fast parts of the UI appear immediately while slower data-fetching sections load afterward. The initial response includes the shell and placeholders, and subsequent chunks fill in content as async components resolve. For example, a page header renders instantly while a slow recommendations feed streams in a few seconds later. In a real app, an e-commerce product page streams the title and price immediately while reviews and related products load inside Suspense fallbacks without blocking the whole page.',
    code: `// app/product/[id]/page.tsx
import { Suspense } from 'react';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <main>
      <ProductHeader id={id} />
      <Suspense fallback={<ReviewsSkeleton />}>
        <Reviews id={id} />
      </Suspense>
      <Suspense fallback={<RelatedSkeleton />}>
        <RelatedProducts id={id} />
      </Suspense>
    </main>
  );
}`,
  },
  {
    id: 58,
    category: 'Rendering',
    question: 'What are Suspense boundaries in the App Router?',
    answer: 'Suspense boundaries wrap async Server Components or lazy Client Components and define a fallback UI shown while the wrapped content is loading, enabling partial page streaming. Each boundary is an independent unit—when inner content resolves, only that segment streams to the client without waiting for siblings. This is the primary mechanism for loading states in Server Components since you cannot use useEffect for initial server data. For example, wrapping <SlowChart /> in Suspense with a skeleton fallback keeps the rest of the dashboard interactive while the chart fetches. In a real app, a social feed page wraps each post batch in Suspense so the layout and navigation render immediately while posts stream in progressively.',
    code: `import { Suspense } from 'react';

async function FeedPosts() {
  const posts = await fetchPosts(); // slow DB query
  return posts.map((p) => <PostCard key={p.id} post={p} />);
}

export default function FeedPage() {
  return (
    <div>
      <NavBar />
      <Suspense fallback={<FeedSkeleton rows={5} />}>
        <FeedPosts />
      </Suspense>
    </div>
  );
}`,
  },
  {
    id: 59,
    category: 'Rendering',
    question: 'What is Partial Prerendering (PPR) in Next.js?',
    answer: 'Partial Prerendering is an experimental rendering model that combines a static shell prerendered at build time with dynamic holes streamed in at request time within the same page. The static outer frame—navigation, layout, and cached content—ships instantly from the CDN, while personalized or uncacheable sections inside Suspense boundaries resolve dynamically per request. This aims to deliver SSG-level speed for the stable parts of a page without giving up SSR for user-specific content. For example, a product page shell with images and description is static while the signed-in user\'s cart badge streams dynamically. In a real app, PPR lets a marketing homepage prerender hero content at build time while injecting live inventory counts per region on each visit.',
    code: `// next.config.ts — enable experimental PPR
// const nextConfig = { experimental: { ppr: true } };

export const experimental_ppr = true;

export default function StorePage() {
  return (
    <main>
      {/* Static shell — prerendered at build */}
      <StoreHeader />
      <FeaturedProducts />
      {/* Dynamic hole — streamed per request */}
      <Suspense fallback={<CartBadgeSkeleton />}>
        <CartBadge />
      </Suspense>
    </main>
  );
}`,
  },
  {
    id: 60,
    category: 'Rendering',
    question: 'What is generateStaticParams and when do you use it?',
    answer: 'generateStaticParams is an App Router function that tells Next.js which dynamic segment values to prerender at build time, replacing getStaticPaths from the Pages Router. It returns an array of param objects matching your [slug] or [id] folder segments, and Next.js generates a static page for each entry. You can combine it with ISR by setting revalidate so paths not returned at build time are generated on first visit and then cached. For example, generateStaticParams returning [{ slug: "hello" }, { slug: "world" }] prebuilds two blog posts. In a real app, you fetch the top 100 product IDs from your database at build time and pass them to generateStaticParams while less popular products are generated on demand with ISR.',
    code: `// app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await fetch('https://cms.example.com/posts').then((r) =>
    r.json()
  );
  return posts.map((post: { slug: string }) => ({ slug: post.slug }));
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  return <article>{post.title}</article>;
}`,
  },
  {
    id: 61,
    category: 'Rendering',
    question: 'What is the difference between the Edge and Node.js runtimes in Next.js?',
    answer: 'The Node.js runtime is the default and supports the full Node.js API, native modules, and long-running operations, making it suitable for database drivers, file system access, and heavy computation. The Edge runtime runs on a lightweight V8 isolate closer to users globally, with faster cold starts but a restricted API surface—no native Node modules, limited npm packages, and tighter execution limits. You choose the runtime per route segment with export const runtime = "edge" or "nodejs". For example, middleware always runs on the Edge because it must execute quickly on every request near the user. In a real app, auth middleware runs on the Edge for low latency redirects while a PDF generation Route Handler stays on Node.js to use a native rendering library.',
    code: `// Edge runtime — fast, limited APIs (middleware, some routes)
export const runtime = 'edge';

export async function GET() {
  return Response.json({ region: process.env.VERCEL_REGION });
}

// Node.js runtime — default, full Node.js APIs
export const runtime = 'nodejs';

export async function GET() {
  const pdf = await generatePdfWithNativeLib();
  return new Response(pdf, {
    headers: { 'Content-Type': 'application/pdf' },
  });
}`,
  },
]
