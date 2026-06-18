import type { InterviewQuestion } from '../../types'

export const performanceQuestions: InterviewQuestion[] = [
  {
    id: 72,
    category: 'Performance & SEO',
    question: 'What is next/image and why should you use it over a plain <img> tag?',
    answer: 'The next/image component is Next.js\'s optimized image wrapper that automatically serves modern formats like WebP and AVIF, resizes images on demand, and lazy-loads off-screen content by default. It prevents layout shift by requiring width and height (or fill mode) and can generate a blur placeholder while the full image loads. Unlike a raw <img>, Next.js routes image requests through its built-in optimizer so you never ship oversized assets to mobile users.',
    code: `import Image from 'next/image'

export default function Hero() {
  return (
    <Image
      src="/hero.jpg"
      alt="Product showcase"
      width={1200}
      height={630}
      priority
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    />
  )
}`,
  },
  {
    id: 73,
    category: 'Performance & SEO',
    question: 'How does next/font improve performance compared to loading fonts from a CDN?',
    answer: 'next/font downloads font files at build time and self-hosts them, eliminating extra round trips to Google Fonts or other external CDNs and removing layout shift caused by late-loading web fonts. It automatically inlines a CSS @font-face declaration and can apply font-display: swap or optional strategies to control how text renders before the font loads. Because fonts are bundled with your app, they benefit from the same caching and CDN distribution as your other static assets.',
    code: `import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  )
}`,
  },
  {
    id: 74,
    category: 'Performance & SEO',
    question: 'What is the Metadata API in the App Router?',
    answer: 'The Metadata API lets you define HTML <head> elements like title, description, icons, and Open Graph tags using a typed metadata export in layout.tsx or page.tsx files. It replaces the older next/head component from the Pages Router and works naturally with Server Components because metadata is resolved on the server during rendering. Static metadata is declared as a plain object, while dynamic pages can export an async generateMetadata function that fetches data and returns page-specific values.',
    code: `// app/about/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Acme Corp',
  description: 'Learn about our mission and team.',
  robots: { index: true, follow: true },
}

export default function AboutPage() {
  return <main>...</main>
}`,
  },
  {
    id: 75,
    category: 'Performance & SEO',
    question: 'How does generateMetadata work for dynamic routes?',
    answer: 'generateMetadata is an async function you export alongside your page component that receives route params and searchParams, fetches the data needed for SEO, and returns a Metadata object tailored to that request. Next.js calls it during server rendering or static generation so crawlers and social platforms receive fully populated <head> tags in the initial HTML. It can run in parallel with the page component when both need the same data, and Next.js deduplicates identical fetch calls automatically.',
    code: `import type { Metadata } from 'next'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const product = await fetch(\`https://api.example.com/products/\${id}\`).then((r) => r.json())

  return {
    title: product.name,
    description: product.summary,
    openGraph: { images: [{ url: product.imageUrl }] },
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params
  const product = await fetch(\`https://api.example.com/products/\${id}\`).then((r) => r.json())
  return <h1>{product.name}</h1>
}`,
  },
  {
    id: 76,
    category: 'Performance & SEO',
    question: 'How do you generate a sitemap in Next.js App Router?',
    answer: 'You create a sitemap.ts (or sitemap.js) file in the app directory that exports a default function returning an array of URL objects with loc, lastModified, changeFrequency, and priority fields. Next.js serves the result at /sitemap.xml automatically, and the function can be async so you fetch dynamic routes from a CMS or database at build or request time. For large sites, you can split sitemaps using generateSitemaps from next-sitemap conventions or multiple sitemap files.',
    code: `// app/sitemap.ts
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await fetch('https://cms.example.com/posts').then((r) => r.json())

  const postUrls = posts.map((post: { slug: string; updatedAt: string }) => ({
    url: \`https://example.com/blog/\${post.slug}\`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    { url: 'https://example.com', lastModified: new Date(), priority: 1 },
    ...postUrls,
  ]
}`,
  },
  {
    id: 77,
    category: 'Performance & SEO',
    question: 'How do you configure robots.txt in a Next.js App Router project?',
    answer: 'Add a robots.ts file in the app directory that exports a default function returning a Robots object with rules for user agents, allowed and disallowed paths, and an optional sitemap URL. Next.js automatically serves it at /robots.txt, keeping robots configuration version-controlled alongside your application code instead of as a static file that drifts out of sync. You can return different rules per environment by checking process.env at build time.',
    code: `// app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://example.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: \`\${baseUrl}/sitemap.xml\`,
  }
}`,
  },
  {
    id: 78,
    category: 'Performance & SEO',
    question: 'How do you configure Open Graph metadata for social sharing?',
    answer: 'Open Graph tags control how your pages appear when shared on platforms like Slack, Twitter/X, LinkedIn, and Facebook, and in the App Router you set them through the openGraph field on the metadata export or generateMetadata return value. Key properties include title, description, url, siteName, images (with width, height, and alt), and type (website, article, etc.). Next.js renders these as <meta property="og:..."> tags in the server HTML so link previews work without client-side rendering.',
    code: `import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Launching Our New Product',
  openGraph: {
    title: 'Launching Our New Product',
    description: 'See what we built and why it matters.',
    url: 'https://example.com/blog/launch',
    siteName: 'Acme Corp',
    images: [
      {
        url: 'https://example.com/og/launch.png',
        width: 1200,
        height: 630,
        alt: 'Product launch banner',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
}`,
  },
  {
    id: 79,
    category: 'Performance & SEO',
    question: 'How does lazy loading work in Next.js for images and components?',
    answer: 'next/image lazy-loads images by default, deferring network requests until the image enters (or is near) the viewport, which reduces initial page weight and speeds up Time to Interactive. For components, you use next/dynamic with an optional loading fallback to split code into separate chunks that download only when the component renders. The loading.tsx convention in the App Router provides route-level lazy loading with an automatic Suspense boundary while a page segment streams in.',
    code: `import dynamic from 'next/dynamic'

const AnalyticsChart = dynamic(() => import('@/components/AnalyticsChart'), {
  loading: () => <p>Loading chart...</p>,
  ssr: false,
})

export default function Dashboard() {
  return (
    <section>
      <h1>Dashboard</h1>
      <AnalyticsChart />
    </section>
  )
}`,
  },
  {
    id: 80,
    category: 'Performance & SEO',
    question: 'What strategies does Next.js provide for bundle optimization?',
    answer: 'Next.js automatically splits code per route in the App Router so each page ships only the JavaScript it needs, and Server Components further reduce client bundle size by keeping data-fetching logic on the server. You can analyze bundle composition with @next/bundle-analyzer, tree-shake unused exports, and mark heavy dependencies as server-only to prevent them from leaking into client bundles. Configuring modularizeImports or optimizePackageImports in next.config.ts lets Next.js import only the submodules you use from large libraries like lodash or icon packs.',
    code: `// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', '@mui/material'],
  },
}

export default nextConfig`,
  },
  {
    id: 81,
    category: 'Performance & SEO',
    question: 'How do dynamic imports reduce initial JavaScript payload in Next.js?',
    answer: 'Dynamic imports use import() to load modules on demand, and next/dynamic wraps this pattern with React-friendly loading states and optional SSR control. Each dynamically imported module becomes its own webpack or Turbopack chunk, so the browser downloads it only when the component is about to render rather than on first page load. Setting ssr: false skips server rendering for browser-only libraries like maps or rich text editors that would otherwise bloat the server bundle.',
    code: `import dynamic from 'next/dynamic'

const PdfViewer = dynamic(() => import('@/components/PdfViewer'), {
  loading: () => <div className="skeleton h-96" />,
})

export default function DocumentPage({ docUrl }: { docUrl: string }) {
  return (
    <main>
      <h1>Document Preview</h1>
      <PdfViewer url={docUrl} />
    </main>
  )
}`,
  },
]
