import type { InterviewQuestion } from '../../types'

export const serverComponentsQuestions: InterviewQuestion[] = [
  {
    id: 28,
    category: 'Server Components',
    question: 'What are React Server Components (RSC)?',
    answer: 'React Server Components are components that execute only on the server during a request or static generation and send rendered output to the client without including their component JavaScript in the browser bundle. They can be async, read files, query databases, and use server-only APIs directly in the component body. The client receives serializable results and HTML, not the full component source. In a real app, a UserProfile server component loads account data from Postgres and renders it while a separate client component handles the "Edit profile" button click.',
    code: `// Server Component — runs on server, zero client JS for this file
export default async function UserProfile({ userId }: { userId: string }) {
  const user = await db.users.findUnique({ where: { id: userId } });

  return (
    <section>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <EditProfileButton userId={userId} />
    </section>
  );
}`,
  },
  {
    id: 29,
    category: 'Server Components',
    question: 'What does the "use client" directive do?',
    answer: 'The "use client" directive at the top of a file marks that module and its imports as Client Components, which are bundled and sent to the browser where they can use hooks, event handlers, and browser APIs. It must appear before any imports and applies to the entire file—you cannot mix server and client logic in one module. Files without "use client" in the App Router are Server Components by default. For example, a SearchInput.tsx file with "use client" can use useState for the query string while a parent Server Component passes initial results as props.',
    code: `"use client";

import { useState } from "react";

export function SearchInput({ onSearch }: { onSearch: (q: string) => void }) {
  const [query, setQuery] = useState("");

  return (
    <input
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
      }}
      placeholder="Search products…"
    />
  );
}`,
  },
  {
    id: 30,
    category: 'Server Components',
    question: 'What is the difference between Server Components and Client Components?',
    answer: 'Server Components render on the server, never ship their logic to the client, and cannot use useState, useEffect, or browser-only APIs. Client Components render on both server (for initial HTML) and client (for hydration and interactivity) and include JavaScript in the bundle for updates. Server Components fetch data at the source; Client Components handle user events and local UI state. In a real app, a ProductList server component maps over database rows while each ProductCard client component manages an expandable details panel with useState.',
    code: `// Server Component — data fetching, no hooks
export default async function ProductList() {
  const products = await db.products.findMany();
  return (
    <ul>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </ul>
  );
}

// Client Component — interactivity
"use client";

export function ProductCard({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  return (
    <li>
      <button onClick={() => setOpen(!open)}>{product.name}</button>
      {open && <p>{product.details}</p>}
    </li>
  );
}`,
  },
  {
    id: 31,
    category: 'Server Components',
    question: 'When should you use Server Components versus Client Components?',
    answer: 'Use Server Components for data fetching, accessing backend resources, keeping large dependencies off the client, and rendering static or read-heavy UI. Use Client Components when you need useState, useEffect, event listeners, browser APIs, or third-party libraries that rely on window or document. Default to Server Components and push "use client" to the leaves of the tree where interactivity is required. In a real app, the page shell and article body stay as Server Components while only the comment form, theme toggle, and toast notifications are Client Components.',
    code: `// page.tsx — Server Component orchestrates the tree
export default async function PostPage({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  const comments = await getComments(params.id);

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.body }} />
      <LikeButton postId={post.id} />
      <CommentForm postId={post.id} />
      <CommentList comments={comments} />
    </article>
  );
}`,
  },
  {
    id: 32,
    category: 'Server Components',
    question: 'What are composition patterns for mixing Server and Client Components?',
    answer: 'The recommended pattern is to keep Server Components at the top of the tree and pass Client Components as children or props rather than importing Server Components into Client Component files. A Client Component cannot import a Server Component because that would pull server code into the client bundle. Instead, a Server Component renders both and passes a server-rendered subtree as children to the client wrapper. In a real app, Modal (client) receives title and body as children from a Server Component page so the modal shell is interactive but the content is fetched on the server.',
    code: `// Modal.tsx — Client wrapper
"use client";

export function Modal({
  children,
  open,
  onClose,
}: {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div role="dialog">
      <button onClick={onClose}>Close</button>
      {children}
    </div>
  );
}

// page.tsx — Server Component passes server-rendered children
export default async function Page() {
  const details = await fetchDetails();
  return (
    <Modal open={true} onClose={() => {}}>
      <DetailsContent data={details} />
    </Modal>
  );
}`,
  },
  {
    id: 33,
    category: 'Server Components',
    question: 'How do async Server Components work?',
    answer: 'Server Components can be declared async and use await directly in the component body to fetch data, unlike Client Components which must use useEffect or data libraries for fetching. Next.js waits for async server components to resolve before streaming or sending their HTML, and you can wrap slow sections in Suspense for partial streaming. This removes boilerplate data-loading hooks from read-heavy pages. In a real app, async function TeamPage() awaits fetchTeam() and fetchMembers() sequentially or in parallel without any client-side loading spinner for the initial render.',
    code: `// Async Server Component — await in the component body
export default async function TeamPage({
  params,
}: {
  params: Promise<{ teamId: string }>;
}) {
  const { teamId } = await params;

  const [team, members] = await Promise.all([
    fetchTeam(teamId),
    fetchMembers(teamId),
  ]);

  return (
    <div>
      <h1>{team.name}</h1>
      <ul>
        {members.map((m) => (
          <li key={m.id}>{m.name}</li>
        ))}
      </ul>
    </div>
  );
}`,
  },
  {
    id: 34,
    category: 'Server Components',
    question: 'Why can Server Components not use useState or useEffect?',
    answer: 'Server Components do not run in the browser and are not hydrated into interactive React trees, so there is no persistent component instance on the client where hooks could maintain state or schedule effects. Hooks like useState and useEffect depend on client-side React reconciliation across renders. Server Components execute once per request or build to produce output, then their work is done. In a real app, if you need a counter or subscription, extract that UI into a small Client Component with "use client" and colocate it inside an otherwise server-rendered page.',
    code: `// ❌ Invalid — hooks in a Server Component
// export default function Counter() {
//   const [count, setCount] = useState(0);
//   return <button onClick={() => setCount(count + 1)}>{count}</button>;
// }

// ✅ Valid — hooks in a Client Component leaf
"use client";

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}`,
  },
  {
    id: 35,
    category: 'Server Components',
    question: 'What are the bundling implications of Server Components?',
    answer: 'Server Components and their dependencies are excluded from the client JavaScript bundle, which reduces download size and parse time for users. Only Client Components and the shared React runtime needed for hydration are bundled for the browser. Heavy libraries like markdown parsers or ORM clients can stay in server files without bloating the client. In a real app, moving a 200 KB charting library from a page.tsx client component into a server-only analytics summary component keeps that library off the wire for every visitor.',
    code: `// server-only heavy import — never sent to browser
import { renderMarkdown } from "heavy-markdown-lib";

export default async function DocPage({ slug }: { slug: string }) {
  const raw = await loadDoc(slug);
  const html = renderMarkdown(raw); // runs on server only
  return <article dangerouslySetInnerHTML={{ __html: html }} />;
}

// Client bundle includes only "use client" files and their imports`,
  },
  {
    id: 36,
    category: 'Server Components',
    question: 'How do you pass data from Server Components to Client Components?',
    answer: 'Server Components pass data to Client Components through serializable props—strings, numbers, booleans, plain objects, arrays, and similar JSON-safe values. The server renders the Client Component with those props embedded in the RSC payload, and the client hydrates with the same values. You cannot pass functions, class instances, or Symbols as props from server to client. In a real app, a Server Component fetches a list of products and passes product={{ id, name, price }} to a client AddToCartButton that only needs those fields for the click handler.',
    code: `// Server Component — fetch and pass serializable props
export default async function ProductPage({ id }: { id: string }) {
  const product = await db.products.find(id);

  return (
    <div>
      <h1>{product.name}</h1>
      <AddToCartButton
        product={{ id: product.id, name: product.name, price: product.price }}
      />
    </div>
  );
}

// Client Component — receives plain data as props
"use client";

export function AddToCartButton({
  product,
}: {
  product: { id: string; name: string; price: number };
}) {
  return <button onClick={() => addToCart(product.id)}>Add to cart</button>;
}`,
  },
  {
    id: 37,
    category: 'Server Components',
    question: 'What are the serialization limits for props passed to Client Components?',
    answer: 'Props crossing the server-to-client boundary must be serializable to JSON-like data structures—plain objects, arrays, strings, numbers, booleans, and null. Functions, Dates, Maps, Sets, class instances, and React elements created on the server generally cannot be passed as props to Client Components. Dates should be passed as ISO strings and reconstructed on the client if needed. In a real app, pass user={{ name: user.name, createdAt: user.createdAt.toISOString() }} instead of passing the full ORM model with methods and Date objects that serialization would strip or break.',
    code: `// Server Component
export default async function ProfilePage() {
  const user = await db.user.findFirst();

  return (
    <ProfileClient
      user={{
        name: user.name,
        memberSince: user.createdAt.toISOString(), // Date → string
      }}
    />
  );
}

// ❌ Cannot pass: onSave={() => {}}, new Map(), class instances`,
  },
  {
    id: 38,
    category: 'Server Components',
    question: 'What is the server-only package and when should you use it?',
    answer: 'The server-only package provides an import that throws a build-time error if a module is accidentally imported into a Client Component, protecting secrets and server APIs from leaking into the client bundle. Add import "server-only" at the top of files that must never run in the browser, such as database clients or modules containing API keys. Next.js also offers client-only for the reverse case. In a real app, db.ts imports "server-only" so a mistaken import from a "use client" file fails immediately in development instead of exposing credentials in production.',
    code: `// lib/db.ts
import "server-only";
import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function getUser(id: string) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
}`,
  },
  {
    id: 39,
    category: 'Server Components',
    question: 'Can a Client Component import a Server Component?',
    answer: 'No—a Client Component cannot import a Server Component because importing would bundle that module for the browser and defeat the purpose of server-only execution. The correct direction is always Server Components importing Client Components, or composing them via children slots passed from parent to child. If you need server-fetched UI inside a client boundary, fetch in the parent Server Component and pass the result as children or serializable props. In a real app, Tabs (client) receives each tab panel as children rendered by the server page rather than importing ServerTabPanel directly inside Tabs.tsx.',
    code: `// ❌ Wrong — Client importing Server
// "use client";
// import { ServerChart } from "./ServerChart"; // build error or wrong bundle

// ✅ Right — Server page composes client + server output
// page.tsx (Server)
import { Tabs } from "./Tabs";
import { SalesChart } from "./SalesChart"; // Server Component

export default async function AnalyticsPage() {
  const data = await fetchSalesData();
  return (
    <Tabs
      overview={<SalesChart data={data} />}
      details={<p>Server-rendered details</p>}
    />
  );
}`,
  },
]
