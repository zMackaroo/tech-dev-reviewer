import type { InterviewQuestion } from '../../types'

export const advancedQuestions: InterviewQuestion[] = [
  {
    id: 94,
    category: 'Advanced',
    question: 'What is Server-Side Rendering (SSR)?',
    answer: 'Server-Side Rendering (SSR) runs React on the server to produce HTML for each request, sends that full page to the browser, then hydrates it on the client to attach interactivity. Users see meaningful content faster on first paint, and search engines receive fully rendered HTML, which improves SEO compared to a blank client-only shell. Frameworks like Next.js and Remix handle routing, data loading, and hydration out of the box. SSR matters when first-load performance and discoverability affect conversion or rankings.',
    code: `// Next.js — server component / getServerSideProps
export async function getServerSideProps() {
  const data = await fetchData();
  return { props: { data } };
}`,
    output: ['HTML on server → hydrate on client'],
  },
  {
    id: 95,
    category: 'Advanced',
    question: 'What is Static Site Generation (SSG)?',
    answer: 'Static Site Generation (SSG) pre-renders pages to HTML at build time, so every visitor gets the same fast, cacheable file served from a CDN without hitting your server on each request. In Next.js, getStaticProps fetches data during the build and bakes it into the page; revalidate enables incremental updates on a schedule. SSG is ideal for content that does not change per user or per request, like blogs, docs, and marketing pages. It matters because CDN delivery is the fastest and cheapest way to serve read-heavy content at scale.',
    code: `// Next.js SSG
export async function getStaticProps() {
  const posts = await getPosts();
  return { props: { posts }, revalidate: 60 };
}`,
    output: ['Pre-render at build — CDN delivery'],
  },
  {
    id: 96,
    category: 'Advanced',
    question: 'What are React Server Components (RSC)?',
    answer: 'React Server Components (RSC) run exclusively on the server and never ship their JavaScript to the client, which shrinks bundle size and lets them fetch data directly with async/await. Client components marked with "use client" handle interactivity like useState and event handlers; server components render static or data-heavy UI. The Next.js App Router uses RSC by default, composing server and client components in the same tree.',
    code: `// Server Component (default in App Router)
async function Page() {
  const data = await db.query();
  return <List items={data} />;
}

// Client Component
"use client";
function Counter() { const [n, setN] = useState(0); ... }`,
    output: ['Server-only components — zero client JS'],
  },
  {
    id: 97,
    category: 'Advanced',
    question: 'What is hydration?',
    answer: 'Hydration is the process where React attaches event listeners and internal state to HTML that was already rendered on the server, turning static markup into a fully interactive app. If the client\'s first render does not match the server HTML, React throws hydration errors, which often come from Date.now(), random IDs, or browser-only APIs used during render. Fixes include useId for stable IDs, client-only rendering with useEffect, or suppressHydrationWarning for known harmless mismatches. Getting hydration right matters because SSR is wasted if the client must re-render everything or show errors on load.',
    code: `// Hydration error if server HTML ≠ client render
// Fix: suppressHydrationWarning, client-only rendering, useId`,
    output: ['Attach interactivity to server HTML'],
  },
  {
    id: 98,
    category: 'Advanced',
    question: 'How do you test React components?',
    answer: 'Testing React components with React Testing Library focuses on user-visible behavior rather than implementation details like internal state or component structure. You render components, query elements by accessible roles and labels with screen, and simulate interactions with userEvent, using Jest or Vitest as the test runner. This approach catches real regressions users would notice and avoids brittle tests that break on harmless refactors. It matters because maintainable tests document expected behavior and give confidence during refactors.',
    code: `import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("increments counter", async () => {
  render(<Counter />);
  await userEvent.click(screen.getByRole("button"));
  expect(screen.getByText("1")).toBeInTheDocument();
});`,
    demo: 'react-state',
  },
  {
    id: 99,
    category: 'Advanced',
    question: 'What is the difference between Next.js and Vite+React?',
    answer: 'Next.js is a full-stack React framework with built-in SSR, SSG, file-based routing, API routes, and React Server Components, while Vite plus React is a fast client-side SPA scaffold that leaves routing, data fetching, and rendering strategy up to you. Vite excels at rapid dev builds and flexible SPA architectures; Next.js excels when SEO, first-load performance, or server rendering are requirements. The choice depends on whether you need a framework opinion or a lightweight starting point.',
    code: `// Vite: SPA, client-rendered
// Next.js: SSR/SSG/RSC, file-based routing, full-stack`,
    output: ['Next.js: framework; Vite: SPA scaffold'],
  },
  {
    id: 100,
    category: 'Advanced',
    question: 'What is React 19\'s key improvements?',
    answer: 'React 19 introduces Actions and useActionState for handling form submissions and async transitions with built-in pending state, plus the use() hook for reading promises and context during render. Ref can now be passed as a regular prop, reducing the need for forwardRef, and improvements to Suspense, document metadata, and the React Compiler automate memoization. These changes simplify common patterns that previously required boilerplate or third-party libraries. They matter because forms, async data, and refs are everyday concerns in production apps.',
    code: `// React 19 — ref as regular prop
function Input({ ref, ...props }) {
  return <input ref={ref} {...props} />;
}

// Actions
async function submitAction(formData) {
  "use server";
  await save(formData);
}`,
    output: ['Actions, use(), ref as prop, React Compiler'],
  },
]
