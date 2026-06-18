import type { InterviewQuestion } from '../../types'

export const deploymentQuestions: InterviewQuestion[] = [
  {
    id: 82,
    category: 'Deployment & Config',
    question: 'What is next.config.js/ts and what can you configure there?',
    answer: 'next.config.js or next.config.ts is the central configuration file where you customize Next.js build and runtime behavior without ejecting from the framework. Common settings include redirects, rewrites, headers, image domains, experimental features, output mode, basePath, and webpack or Turbopack customizations. The file exports a NextConfig object (typed in TypeScript) that Next.js reads during next dev, next build, and next start. In a real app, you might add a rewrite so /api/* proxies to your backend service and configure images.remotePatterns to allow optimized loading of CMS-hosted media.',
    code: `// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.example.com' }],
  },
  async redirects() {
    return [{ source: '/old-blog/:slug', destination: '/blog/:slug', permanent: true }]
  },
}

export default nextConfig`,
  },
  {
    id: 83,
    category: 'Deployment & Config',
    question: 'How do environment variables work in Next.js, especially NEXT_PUBLIC_?',
    answer: 'Next.js loads variables from .env, .env.local, .env.production, and environment-specific files into process.env at build time. Variables prefixed with NEXT_PUBLIC_ are inlined into the client JavaScript bundle, making them visible in the browser, so they should never contain secrets like API keys or database passwords. Server-only variables without the prefix are available in Server Components, Route Handlers, and Server Actions but are stripped from client bundles. In a real app, NEXT_PUBLIC_APP_URL might point to your site\'s canonical domain for share links, while DATABASE_URL stays server-only and is never exposed to end users.',
    code: `// .env.local
DATABASE_URL=postgresql://user:pass@localhost:5432/mydb
NEXT_PUBLIC_APP_URL=https://example.com

// app/components/ShareButton.tsx (Client Component)
'use client'

export function ShareButton({ path }: { path: string }) {
  const url = \`\${process.env.NEXT_PUBLIC_APP_URL}\${path}\`
  return <button onClick={() => navigator.share({ url })}>Share</button>
}`,
  },
  {
    id: 84,
    category: 'Deployment & Config',
    question: 'How do you deploy a Next.js App Router application to Vercel?',
    answer: 'Vercel is the platform created by the Next.js team and provides zero-config deployment: connect your Git repository, and each push triggers a build that runs next build with optimized caching, edge network distribution, and automatic preview URLs for pull requests. Server Components, Route Handlers, and Server Actions run as serverless or fluid compute functions depending on your plan and configuration. Environment variables are managed in the Vercel dashboard per environment (Production, Preview, Development). In a real app, pushing to main auto-deploys production while every PR gets a unique preview URL so stakeholders can test changes before merge without maintaining a separate staging server.',
    code: `// vercel.json (optional overrides)
{
  "buildCommand": "next build",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "NEXT_PUBLIC_APP_URL": "https://example.com"
  }
}`,
  },
  {
    id: 85,
    category: 'Deployment & Config',
    question: 'What is standalone output mode and when should you use it?',
    answer: 'Setting output: "standalone" in next.config tells Next.js to produce a minimal self-contained build in .next/standalone that includes only the files needed to run the server, plus a traced subset of node_modules. This dramatically reduces deployment artifact size compared to copying the entire project directory and node_modules folder. Standalone mode is ideal for Docker containers, VPS deployments, and any environment where you want a portable server bundle without Vercel\'s platform integration. For example, a Docker image built from standalone output might be 150 MB instead of 800 MB because it excludes dev dependencies and unused packages.',
    code: `// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
}

export default nextConfig

// After next build, run:
// node .next/standalone/server.js`,
  },
  {
    id: 86,
    category: 'Deployment & Config',
    question: 'How do you containerize a Next.js app with Docker using standalone output?',
    answer: 'A production Docker setup typically uses a multi-stage build: one stage installs dependencies and runs next build with output: "standalone", and a slim runtime stage copies .next/standalone, .next/static, and public/ into a minimal Node.js image. The container entrypoint runs node server.js from the standalone directory, which starts the Next.js production server. This pattern keeps images small, avoids shipping source code, and works on Kubernetes, ECS, or any container orchestrator. In a real app, your CI pipeline builds the image on every main-branch merge and deploys it to a cluster where horizontal pod autoscaling handles traffic spikes.',
    code: `# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]`,
  },
  {
    id: 87,
    category: 'Deployment & Config',
    question: 'What does a typical CI/CD pipeline look like for a Next.js project?',
    answer: 'A solid pipeline runs linting, type checking, and unit tests on every pull request, then executes next build to catch compilation and static generation errors before merge. On the main branch, CI builds the production artifact (or Docker image) and deploys to staging or production with environment-specific secrets injected from your CI provider\'s vault. Caching node_modules and the Next.js build cache between runs cuts pipeline time from minutes to seconds. In a real app, GitHub Actions might run tsc --noEmit and next build on each PR, then deploy to Vercel or push a container to AWS ECR only after the PR merges and all checks pass.',
    code: `# .github/workflows/ci.yml (simplified)
name: CI
on: [pull_request, push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run lint
      - run: npx tsc --noEmit
      - run: npm run build`,
  },
  {
    id: 88,
    category: 'Deployment & Config',
    question: 'How do preview environments work for Next.js deployments?',
    answer: 'Preview environments are temporary deployments created for each pull request or branch, giving every change a unique URL with its own isolated environment variables and build output. On Vercel, preview deployments happen automatically and inherit Preview-scoped env vars from the dashboard, while other platforms like Netlify or custom CI can achieve the same with branch-based routing. Previews let QA, designers, and clients review features in a production-like setting without affecting live users. For example, a marketing team can approve a redesigned landing page on a preview URL before the merge that triggers the production deployment.',
    code: `// Environment-specific behavior in next.config.ts
const isPreview = process.env.VERCEL_ENV === 'preview'

const nextConfig = {
  env: {
    APP_ENV: process.env.VERCEL_ENV ?? 'development',
  },
  async headers() {
    if (isPreview) {
      return [{ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex' }] }]
    }
    return []
  },
}`,
  },
  {
    id: 89,
    category: 'Deployment & Config',
    question: 'What is output file tracing in Next.js and why does it matter for deployment?',
    answer: 'Output file tracing uses @vercel/nft to statically analyze your server code and determine exactly which files from node_modules and the project are needed at runtime for each route or server entry. This tracing powers standalone output by copying only the required dependencies instead of the entire node_modules directory. Without tracing, self-hosted deployments either bundle everything (bloated) or miss files (runtime crashes). In a real app, tracing ensures your Docker image includes the specific Prisma engine binary and query files your API routes need, but excludes hundreds of unused packages from your monorepo.',
    code: `// next.config.ts — standalone uses tracing automatically
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  // Optional: include extra files tracing might miss
  outputFileTracingIncludes: {
    '/api/pdf': ['./assets/fonts/**'],
  },
}

export default nextConfig`,
  },
  {
    id: 90,
    category: 'Deployment & Config',
    question: 'What is basePath and when would you use it?',
    answer: 'basePath sets a path prefix for your entire Next.js application, so a app deployed with basePath: "/docs" is served at example.com/docs instead of the domain root. Next.js automatically adjusts Link, router navigation, and static asset paths to include the prefix, so internal routing continues to work without manual path concatenation. This is essential when hosting multiple apps on one domain or serving your Next.js app behind a reverse proxy subpath. For example, a company might run their marketing site at example.com and their documentation Next.js app at example.com/docs using basePath without maintaining two separate domains.',
    code: `// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  basePath: '/docs',
}

export default nextConfig

// app/page.tsx — Link handles the prefix automatically
import Link from 'next/link'

export default function Home() {
  return <Link href="/getting-started">Getting Started</Link>
  // Renders as /docs/getting-started
}`,
  },
  {
    id: 91,
    category: 'Deployment & Config',
    question: 'What is assetPrefix and how does it differ from basePath?',
    answer: 'assetPrefix prepends a URL to static assets like JavaScript, CSS, and images served from /_next/static/, but does not change your application\'s route paths the way basePath does. It is commonly used when assets are hosted on a CDN separate from the application server, so browsers fetch JS chunks from cdn.example.com while HTML pages come from app.example.com. basePath affects routing; assetPrefix affects only where static files are loaded from. In a real app, you might set assetPrefix to your CloudFront distribution URL so global users download bundles from an edge node near them, while page requests still hit your origin server.',
    code: `// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  assetPrefix: process.env.NODE_ENV === 'production'
    ? 'https://cdn.example.com'
    : undefined,
}

export default nextConfig

// JS/CSS load from https://cdn.example.com/_next/static/...`,
  },
]
