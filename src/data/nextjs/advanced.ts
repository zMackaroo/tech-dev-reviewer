import type { InterviewQuestion } from '../../types'

export const advancedQuestions: InterviewQuestion[] = [
  {
    id: 92,
    category: 'Advanced',
    question: 'What are parallel routes in the App Router and how do @slot folders work?',
    answer: 'Parallel routes let you render multiple pages simultaneously in the same layout using named slots defined by @folder conventions, such as @analytics and @team in a dashboard layout. Each slot has its own loading.tsx, error.tsx, and not-found.tsx, so one slow or failing panel does not block the rest of the UI. The parent layout receives each slot as a prop (analytics, team) and decides where to place them in the JSX tree. In a real app, a dashboard layout might render @metrics, @activity, and @notifications side by side, each streaming independently via Suspense while the shell layout appears instantly.',
    code: `// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode
  analytics: React.ReactNode
  team: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <main>{children}</main>
      <aside>{analytics}</aside>
      <section>{team}</section>
    </div>
  )
}

// app/dashboard/@analytics/page.tsx
export default async function AnalyticsSlot() {
  const data = await fetch('https://api.example.com/metrics').then((r) => r.json())
  return <MetricsChart data={data} />
}`,
  },
  {
    id: 93,
    category: 'Advanced',
    question: 'What are intercepting routes and how does the (..) convention work?',
    answer: 'Intercepting routes let you load a route within the current layout while still updating the URL, commonly used for photo lightboxes or modal detail views that overlay a list page. The (.) convention matches segments on the same level, (..) goes up one level, (..)(..) goes up two, and (...) matches from the root app directory. When a user navigates client-side, Next.js shows the intercepted page in the slot; a hard refresh or direct URL visit renders the full page normally. For example, clicking a product card on /shop might intercept /shop/product/42 and show it in a modal over the grid, but visiting /shop/product/42 directly renders the full product page.',
    code: `// app/shop/@modal/(..)product/[id]/page.tsx
import { Modal } from '@/components/Modal'
import { ProductDetail } from '@/components/ProductDetail'

export default async function ProductModal({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getProduct(id)

  return (
    <Modal>
      <ProductDetail product={product} />
    </Modal>
  )
}`,
  },
  {
    id: 94,
    category: 'Advanced',
    question: 'What are common authentication patterns in Next.js with Auth.js (NextAuth)?',
    answer: 'Auth.js (formerly NextAuth.js) provides a unified auth layer for Next.js with providers like Google, GitHub, and credentials, session management via JWT or database sessions, and middleware integration for route protection. In the App Router, you typically configure auth in auth.ts, expose Route Handlers at app/api/auth/[...nextauth]/route.ts, and call auth() in Server Components or middleware to read the session. The middleware matcher restricts protected routes before they render, while Server Actions can verify the session before mutations. In a real app, middleware redirects unauthenticated users from /dashboard to /login, and Server Components call auth() to personalize the sidebar without exposing session tokens to the client.',
    code: `// auth.ts
import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
})

// middleware.ts
import { auth } from '@/auth'

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname.startsWith('/dashboard')) {
    return Response.redirect(new URL('/login', req.url))
  }
})

export const config = { matcher: ['/dashboard/:path*'] }`,
  },
  {
    id: 95,
    category: 'Advanced',
    question: 'How do you implement internationalization (i18n) in the Next.js App Router?',
    answer: 'The App Router does not include built-in i18n routing like the Pages Router did, so teams typically use a [locale] dynamic segment, middleware-based locale detection, or libraries like next-intl to manage translations and URL structure. Middleware reads Accept-Language headers or cookies and redirects / to /en or /fr, while each locale gets its own layout or dictionary files for translated strings. Server Components load the correct locale dictionary and pass translated labels to Client Components as props. For example, app/[locale]/products/page.tsx renders product names from a JSON dictionary keyed by locale, and middleware ensures French users always land on /fr/ URLs for proper SEO hreflang tags.',
    code: `// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['en', 'fr', 'de']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const hasLocale = locales.some((l) => pathname.startsWith(\`/\${l}/\`) || pathname === \`/\${l}\`)
  if (hasLocale) return NextResponse.next()

  const locale = request.headers.get('accept-language')?.split(',')[0]?.split('-')[0] ?? 'en'
  return NextResponse.redirect(new URL(\`/\${locale}\${pathname}\`, request.url))
}`,
  },
  {
    id: 96,
    category: 'Advanced',
    question: 'What is Draft Mode in Next.js and how does it enable previewing unpublished CMS content?',
    answer: 'Draft Mode lets authorized users preview unpublished or draft content from a headless CMS by enabling a secure, cookie-based bypass of Next.js static caching. A secret-protected Route Handler calls draftMode().enable() after validating a preview token from your CMS, and subsequent requests render pages dynamically with draft data instead of the statically cached published version. Calling draftMode().disable() or expiring the cookie returns the site to normal static behavior. In a real app, a content editor clicks Preview in Sanity or Contentful, gets redirected through /api/draft?secret=...&slug=..., and sees the unpublished blog post exactly as it will look once published.',
    code: `// app/api/draft/route.ts
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug')

  if (secret !== process.env.DRAFT_SECRET) {
    return new Response('Invalid token', { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()
  redirect(\`/blog/\${slug}\`)
}`,
  },
  {
    id: 97,
    category: 'Advanced',
    question: 'What is Route Segment Config and which options can you export from a page or layout?',
    answer: 'Route Segment Config lets you control rendering and caching behavior per page, layout, or Route Handler by exporting named constants like dynamic, revalidate, fetchCache, runtime, and preferredRegion. These replace the older getServerSideProps and getStaticProps model with declarative exports co-located with your route files. Setting export const dynamic = "force-dynamic" opts out of static caching for personalized pages, while revalidate = 60 enables ISR with a 60-second regeneration window. In a real app, a user settings page exports dynamic = "force-dynamic" because it must read the session on every request, while a pricing page exports revalidate = 3600 to refresh hourly from the CMS.',
    code: `// app/pricing/page.tsx
export const revalidate = 3600 // ISR: regenerate every hour
export const runtime = 'nodejs' // or 'edge'

export default async function PricingPage() {
  const plans = await fetch('https://cms.example.com/plans', {
    next: { revalidate: 3600 },
  }).then((r) => r.json())

  return <PricingTable plans={plans} />
}`,
  },
  {
    id: 98,
    category: 'Advanced',
    question: 'How do you read and set cookies in Server Actions?',
    answer: 'Server Actions run on the server and can access cookies through the cookies() function from next/headers, which provides get, set, and delete methods for reading and mutating the response cookie header. Because Server Actions are async server functions, you call await cookies() to get the cookie store, then read values like session tokens or set new cookies after a successful mutation. Cookies set in a Server Action are sent back with the action response automatically. In a real app, a setTheme Server Action reads the current theme cookie, toggles it, and sets a new theme preference cookie so the user\'s choice persists across visits without client-side document.cookie hacks.',
    code: `'use server'

import { cookies } from 'next/headers'

export async function setTheme(theme: 'light' | 'dark') {
  const cookieStore = await cookies()
  cookieStore.set('theme', theme, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
  })
}

export async function getTheme() {
  const cookieStore = await cookies()
  return cookieStore.get('theme')?.value ?? 'light'
}`,
  },
  {
    id: 99,
    category: 'Advanced',
    question: 'How do you implement optimistic updates with Server Actions in Next.js?',
    answer: 'Optimistic updates show the expected UI result immediately before the server confirms the mutation, using React\'s useOptimistic hook paired with a Server Action via useTransition or startTransition. useOptimistic maintains a temporary state that merges pending changes over the real data, and reverts automatically if the Server Action throws an error. This pattern keeps the UI responsive for likes, todo toggles, and cart updates without waiting for a network round trip. In a real app, toggling a todo\'s completed state calls useOptimistic to flip the checkbox instantly while the updateTodo Server Action persists the change and revalidatePath refreshes the canonical list in the background.',
    code: `'use client'

import { useOptimistic, useTransition } from 'react'
import { toggleTodo } from '@/app/actions'

type Todo = { id: string; text: string; done: boolean }

export function TodoList({ todos }: { todos: Todo[] }) {
  const [optimisticTodos, setOptimistic] = useOptimistic(todos)
  const [isPending, startTransition] = useTransition()

  function handleToggle(id: string) {
    startTransition(async () => {
      setOptimistic(optimisticTodos.map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      ))
      await toggleTodo(id)
    })
  }

  return (
    <ul>
      {optimisticTodos.map((todo) => (
        <li key={todo.id}>
          <input type="checkbox" checked={todo.done} onChange={() => handleToggle(todo.id)} />
          {todo.text}
        </li>
      ))}
    </ul>
  )
}`,
  },
  {
    id: 100,
    category: 'Advanced',
    question: 'What is React cache() and how does it help in Next.js Server Components?',
    answer: 'React\'s cache() function memoizes the result of an async function for the duration of a single server request, so calling the same data-fetching function from a layout, page, and generateMetadata only executes one database query or API call. It is distinct from Next.js fetch caching, which persists across requests based on revalidate settings. Wrapping a getUser() helper with cache() deduplicates per-request fetches while still allowing fresh data on each new request. In a real app, both the dashboard layout and page call getUser(sessionId) to render the avatar and welcome message, but cache() ensures only one Prisma query runs per page load.',
    code: `import { cache } from 'react'
import { db } from '@/lib/db'

export const getUser = cache(async (id: string) => {
  return db.user.findUnique({ where: { id } })
})

// app/dashboard/layout.tsx — calls getUser()
// app/dashboard/page.tsx — calls getUser() again
// Only one database query per request thanks to cache()`,
  },
]
