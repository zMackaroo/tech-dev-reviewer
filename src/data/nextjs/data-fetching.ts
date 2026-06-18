import type { InterviewQuestion } from '../../types'

export const dataFetchingQuestions: InterviewQuestion[] = [
  {
    id: 40,
    category: 'Data Fetching',
    question: 'How do you fetch data in React Server Components in the App Router?',
    answer: 'In the App Router, Server Components are async by default, so you can call fetch or query a database directly inside the component body with await. The data is fetched on the server during rendering and never shipped as client-side fetch logic, which keeps bundles small and avoids loading waterfalls. You do not need useEffect or useState for initial page data in server components.',
    code: `// app/products/[id]/page.tsx — Server Component
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(\`https://api.example.com/products/\${id}\`);
  const product = await res.json();

  return (
    <main>
      <h1>{product.name}</h1>
      <p>\${product.price}</p>
    </main>
  );
}`,
  },
  {
    id: 41,
    category: 'Data Fetching',
    question: 'What cache options does the extended fetch API support in Next.js?',
    answer: 'Next.js extends the native fetch API with a cache option that controls how responses are stored in the Data Cache. cache: "force-cache" (the default) stores the response and reuses it across requests, similar to static data. cache: "no-store" skips caching entirely so every request hits the origin, which is appropriate for personalized or real-time data. You can also combine fetch with next.revalidate to set a time-based expiration in seconds.',
    code: `// Cached by default (static until revalidated)
const staticData = await fetch('https://api.example.com/faq');

// Never cache — always fresh
const liveData = await fetch('https://api.example.com/stock', {
  cache: 'no-store',
});

// Time-based revalidation (ISR-style)
const catalog = await fetch('https://api.example.com/catalog', {
  next: { revalidate: 3600 },
});`,
  },
  {
    id: 42,
    category: 'Data Fetching',
    question: 'What is revalidate in Next.js data fetching?',
    answer: 'revalidate controls how long cached data remains fresh before Next.js refetches it in the background on the next request. On a fetch call you pass next: { revalidate: seconds } to set a per-request TTL, or export const revalidate = 60 at the route segment level to apply the same interval to all data in that page or layout. When the timer expires, the first visitor after expiry still gets the stale cached page while Next.js regenerates it, which is the core ISR pattern.',
    code: `// Segment-level revalidation (applies to the route)
export const revalidate = 60;

export default async function PricingPage() {
  const res = await fetch('https://api.example.com/prices', {
    next: { revalidate: 60 },
  });
  const prices = await res.json();
  return <PriceTable data={prices} />;
}`,
  },
  {
    id: 43,
    category: 'Data Fetching',
    question: 'What does unstable_noStore (or noStore) do in Next.js?',
    answer: 'noStore (formerly unstable_noStore) opts a Server Component or data function out of Next.js static caching so the route is always rendered dynamically at request time. Calling it is equivalent to using fetch with cache: "no-store" but works for any data source, including direct database calls that do not go through fetch. Once noStore is invoked anywhere in the render tree for a request, Next.js treats that route as dynamic.',
    code: `import { noStore } from 'next/cache';

export default async function AccountPage() {
  noStore(); // force dynamic rendering for this request

  const session = await getSession();
  const profile = await db.user.findUnique({
    where: { id: session.userId },
  });

  return <ProfileForm user={profile} />;
}`,
  },
  {
    id: 44,
    category: 'Data Fetching',
    question: 'What are Server Actions in Next.js?',
    answer: 'Server Actions are async functions marked with "use server" that run exclusively on the server but can be invoked from Client Components, forms, or other server code. They replace many traditional API route handlers for mutations like creating records, updating settings, or deleting items. Next.js serializes arguments, executes the function on the server, and can revalidate cached paths or tags afterward.',
    code: `'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;

  await db.post.create({ data: { title } });
  revalidatePath('/blog');
}`,
  },
  {
    id: 45,
    category: 'Data Fetching',
    question: 'How do form actions work with Server Actions in the App Router?',
    answer: 'In the App Router you pass a Server Action directly to a form\'s action prop, and the browser submits the FormData to the server without you wiring onSubmit handlers or fetch calls manually. This works in Server Components with a plain <form action={createPost}> or in Client Components when the action is imported from a separate "use server" file. Progressive enhancement means the form still submits if JavaScript fails to load.',
    code: `// app/contact/page.tsx
import { sendMessage } from './actions';

export default function ContactPage() {
  return (
    <form action={sendMessage}>
      <input name="email" type="email" required />
      <textarea name="message" required />
      <button type="submit">Send</button>
    </form>
  );
}`,
  },
  {
    id: 46,
    category: 'Data Fetching',
    question: 'What is useFormState and how is it used with Server Actions?',
    answer: 'useFormState is a React hook that tracks the return value and pending state of a Server Action invoked through a form, letting Client Components display validation errors or success messages after submission. You pass the action and an initial state, and the hook returns [state, formAction] where formAction goes on the form\'s action prop. The Server Action receives the previous state as its first argument and FormData as the second, so it can return field-level errors without a full page reload.',
    code: `'use client';

import { useFormState } from 'react-dom';
import { signup } from './actions';

export function SignupForm() {
  const [state, formAction] = useFormState(signup, { error: null });

  return (
    <form action={formAction}>
      <input name="email" type="email" />
      {state.error && <p role="alert">{state.error}</p>}
      <button type="submit">Sign up</button>
    </form>
  );
}`,
  },
  {
    id: 47,
    category: 'Data Fetching',
    question: 'How do mutations work with Server Actions?',
    answer: 'Mutations with Server Actions follow a server-first pattern: the client triggers an action, the server validates and writes to the database or external API, then Next.js revalidates affected cache entries so the UI reflects the new data. You can call revalidatePath for specific routes or revalidateTag for grouped fetch caches after a successful write. Server Actions run in POST requests with built-in CSRF protection, so they are safer than exposing generic mutation endpoints.',
    code: `'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { db } from '@/lib/db';

export async function deleteCartItem(itemId: string) {
  await db.cartItem.delete({ where: { id: itemId } });
  revalidateTag('cart');
  revalidatePath('/cart');
}`,
  },
  {
    id: 48,
    category: 'Data Fetching',
    question: 'Should you use fetch or axios for data fetching in Next.js?',
    answer: 'Next.js recommends the native fetch API in Server Components because it is extended with caching, revalidation, and deduplication that axios does not participate in automatically. fetch requests with the same URL and options are deduplicated within a single render pass, and cache or next.revalidate options integrate directly with the Data Cache. axios is still fine in Client Components, Route Handlers, or scripts where you need interceptors, automatic JSON transforms, or upload progress and caching is not a concern.',
    code: `// Server Component — prefer fetch (Next.js cache integration)
const res = await fetch('https://api.example.com/products', {
  next: { tags: ['products'], revalidate: 300 },
});
const products = await res.json();

// Client Component — axios is fine when cache is not needed
'use client';
import axios from 'axios';
const { data } = await axios.get('/api/search?q=shoes');`,
  },
  {
    id: 49,
    category: 'Data Fetching',
    question: 'What are the caching layers in Next.js?',
    answer: 'Next.js stacks several caches: the Request Memoization cache deduplicates identical fetch calls during a single server render, the Data Cache persists fetch results across requests and deployments, the Full Route Cache stores rendered HTML and RSC payload for static routes, and the Router Cache on the client keeps prefetched segment payloads for instant back-forward navigation. Each layer serves a different purpose, from avoiding duplicate work in one render to serving prebuilt pages from a CDN.',
    code: `// Request Memoization — same fetch in one render = one network call
async function Header() {
  const user = await fetch('https://api.example.com/me');
  return <nav>{/* ... */}</nav>;
}

async function Sidebar() {
  const user = await fetch('https://api.example.com/me'); // deduplicated
  return <aside>{/* ... */}</aside>;
}

// Data Cache — persists across requests (fetch cache options apply)`,
  },
  {
    id: 50,
    category: 'Data Fetching',
    question: 'What is tag-based revalidation in Next.js?',
    answer: 'Tag-based revalidation lets you label fetch requests with one or more cache tags and invalidate all of them together using revalidateTag from a Server Action or Route Handler. Instead of revalidating every page that might show stale data, you call revalidateTag("products") after an admin updates inventory and every fetch tagged with products refreshes on the next request. Tags are set via next: { tags: ["products"] } on a fetch call or passed to unstable_cache for non-fetch data sources.',
    code: `// Tag fetches during render
const posts = await fetch('https://cms.example.com/posts', {
  next: { tags: ['blog'] },
});

// Invalidate from a Server Action or Route Handler
'use server';
import { revalidateTag } from 'next/cache';

export async function publishPost() {
  await cms.publish();
  revalidateTag('blog');
}`,
  },
  {
    id: 51,
    category: 'Data Fetching',
    question: 'What is the difference between dynamic and static data in Next.js?',
    answer: 'Static data is fetched at build time or cached with a long TTL and shared across all users, producing pages that can be prerendered and served from a CDN. Dynamic data is resolved per request and reflects user-specific, real-time, or frequently changing information, which forces dynamic rendering when accessed via cookies, headers, searchParams, or noStore. Next.js automatically staticizes routes when it can prove all data is cacheable, and opts into dynamic rendering when it detects uncacheable access patterns.',
    code: `// Static — cached fetch, no per-request inputs
export default async function FaqPage() {
  const faq = await fetch('https://api.example.com/faq'); // cached
  return <FaqList data={await faq.json()} />;
}

// Dynamic — uses cookies, so rendered per request
import { cookies } from 'next/headers';

export default async function DashboardPage() {
  const token = (await cookies()).get('session')?.value;
  const data = await fetch('https://api.example.com/me', {
    headers: { Authorization: \`Bearer \${token}\` },
    cache: 'no-store',
  });
  return <Dashboard data={await data.json()} />;
}`,
  },
]
