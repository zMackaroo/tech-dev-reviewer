import type { ReviewerSection } from '../sectionRegistry'

export interface RoleSectionPlan {
  section: ReviewerSection
  phase: number
  phaseLabel: string
  priority: 'critical' | 'high' | 'medium'
  reason: string
  focusCategories?: string[]
  jdKeywords: string[]
}

export interface SupplementaryTopic {
  title: string
  description: string
  tips: string[]
}

export interface RoleProfile {
  id: string
  title: string
  subtitle: string
  summary: string
  responsibilities: string[]
  requiredSkills: string[]
  sections: RoleSectionPlan[]
  supplementary: SupplementaryTopic[]
}

export const SENIOR_NEXTJS_FE_ROLE: RoleProfile = {
  id: 'senior-nextjs-fe',
  title: 'Senior Frontend Engineer',
  subtitle: 'Next.js · React · TypeScript · Design Systems',
  summary:
    'A senior front-end role building high-performance web apps with Next.js, React, and TypeScript — integrating REST/GraphQL APIs, headless CMS content, design systems, and strong emphasis on performance, accessibility, testing, and CI/CD.',
  responsibilities: [
    'Develop & maintain high-performance web applications using Next.js, React, and TypeScript',
    'Implement responsive, pixel-perfect UI from design system guidelines',
    'Integrate REST & GraphQL APIs; optimize CRUD operations',
    'Work with headless CMS (Contentful) for content & personalization',
    'Ensure cross-browser compatibility, WCAG accessibility, and SEO',
    'Optimize via Lighthouse audits, caching, and Core Web Vitals',
    'Write clean, testable code; conduct code reviews and mentor juniors',
    'Agile/Scrum: sprint planning, retrospectives, stand-ups',
  ],
  requiredSkills: [
    '5+ years JavaScript/TypeScript',
    '3+ years Next.js & React in production',
    'Advanced CSS: CSS Modules, SCSS, PostCSS, responsive design',
    'RESTful APIs & GraphQL with CRUD expertise',
    'Headless CMS: Contentful, Sitecore, Sanity, Optimizely',
    'Lighthouse, Core Web Vitals, caching, performance monitoring',
    'Jest, Cypress, Playwright, UI testing strategies',
    'Git, CI/CD, Vercel/AWS/Netlify/Cloudflare deployments',
    'Storybook, Material UI, Tailwind CSS, Radix UI',
  ],
  sections: [
    {
      section: 'nextjs',
      phase: 1,
      phaseLabel: 'Phase 1 — Core Stack',
      priority: 'critical',
      reason: 'Primary framework — App Router, Server Components, data fetching, and deployment patterns are central to this role.',
      focusCategories: [
        'Fundamentals',
        'Server Components',
        'Data Fetching',
        'Routing',
        'Rendering',
        'Performance',
      ],
      jdKeywords: ['Next.js', 'SSR', 'Server Components', 'Vercel'],
    },
    {
      section: 'react',
      phase: 1,
      phaseLabel: 'Phase 1 — Core Stack',
      priority: 'critical',
      reason: '3+ years React required — hooks, state, performance, and component patterns for production apps.',
      focusCategories: ['Modern Hooks', 'Hooks', 'State', 'Components', 'Performance', 'Context & Data'],
      jdKeywords: ['React', 'hooks', 'components', 'UI'],
    },
    {
      section: 'typescript',
      phase: 1,
      phaseLabel: 'Phase 1 — Core Stack',
      priority: 'critical',
      reason: 'TypeScript is required across the stack — types, generics, and interfaces for maintainable codebases.',
      focusCategories: ['Fundamentals', 'Interfaces & Types', 'Generics', 'Advanced Types'],
      jdKeywords: ['TypeScript', 'type safety', 'interfaces'],
    },
    {
      section: 'css',
      phase: 2,
      phaseLabel: 'Phase 2 — UI & Design',
      priority: 'critical',
      reason: 'Advanced CSS explicitly required — CSS Modules, SCSS, PostCSS, and responsive pixel-perfect layouts.',
      focusCategories: [
        'CSS Modules',
        'SCSS / Sass',
        'PostCSS',
        'Responsive Design',
        'Layout',
        'Advanced CSS',
      ],
      jdKeywords: ['CSS Modules', 'SCSS', 'responsive', 'pixel-perfect'],
    },
    {
      section: 'design-systems',
      phase: 2,
      phaseLabel: 'Phase 2 — UI & Design',
      priority: 'high',
      reason: 'Design system experience with Storybook, MUI, Tailwind, and Radix for consistent UI components.',
      jdKeywords: ['Storybook', 'Material UI', 'Tailwind', 'Radix UI', 'design system'],
    },
    {
      section: 'html',
      phase: 2,
      phaseLabel: 'Phase 2 — UI & Design',
      priority: 'high',
      reason: 'WCAG accessibility, semantic HTML, and SEO best practices are explicit job requirements.',
      focusCategories: ['Accessibility', 'Semantic HTML', 'Meta & SEO', 'Forms'],
      jdKeywords: ['WCAG', 'accessibility', 'SEO', 'semantic HTML'],
    },
    {
      section: 'api',
      phase: 3,
      phaseLabel: 'Phase 3 — Integration & Data',
      priority: 'critical',
      reason: 'REST & GraphQL integration with optimized CRUD — core daily work for this role.',
      focusCategories: [
        'REST Fundamentals',
        'CRUD Operations',
        'GraphQL',
        'GraphQL Advanced',
        'API Auth & Security',
      ],
      jdKeywords: ['REST', 'GraphQL', 'CRUD', 'API integration'],
    },
    {
      section: 'performance',
      phase: 4,
      phaseLabel: 'Phase 4 — Quality & Delivery',
      priority: 'critical',
      reason: 'Lighthouse audits, Core Web Vitals, and caching strategies are listed as key responsibilities.',
      focusCategories: ['Core Web Vitals', 'Lighthouse', 'Caching Strategies', 'Optimization Techniques'],
      jdKeywords: ['Lighthouse', 'Core Web Vitals', 'caching', 'performance'],
    },
    {
      section: 'testing',
      phase: 4,
      phaseLabel: 'Phase 4 — Quality & Delivery',
      priority: 'high',
      reason: 'Jest, Cypress, and Playwright proficiency required for testable, well-documented code.',
      focusCategories: ['Jest', 'Cypress', 'Playwright', 'UI Testing Strategies', 'Testing Fundamentals'],
      jdKeywords: ['Jest', 'Cypress', 'Playwright', 'testing'],
    },
    {
      section: 'cicd',
      phase: 4,
      phaseLabel: 'Phase 4 — Quality & Delivery',
      priority: 'high',
      reason: 'Git workflows, automated testing pipelines, and cloud deployments (Vercel, AWS, Netlify).',
      focusCategories: ['Git Fundamentals', 'CI/CD Pipelines', 'Cloud Deployments', 'GitHub / GitLab / Bitbucket'],
      jdKeywords: ['Git', 'CI/CD', 'Vercel', 'AWS', 'Netlify', 'Cloudflare'],
    },
    {
      section: 'senior-lead',
      phase: 4,
      phaseLabel: 'Phase 4 — Quality & Delivery',
      priority: 'high',
      reason: 'Senior role expectations — code reviews, mentoring, sprint facilitation, deployment decisions, and agile leadership beyond individual contribution.',
      jdKeywords: ['code review', 'mentor', 'Agile', 'Scrum', 'sprint planning', 'stand-ups', 'retrospectives'],
    },
    {
      section: 'git',
      phase: 4,
      phaseLabel: 'Phase 4 — Quality & Delivery',
      priority: 'medium',
      reason: 'Daily Git usage for code reviews, branching, and collaboration in Agile teams.',
      focusCategories: ['Basics', 'Branching', 'Rebase & Cherry-pick', 'Remote'],
      jdKeywords: ['Git', 'code review', 'pull request'],
    },
    {
      section: 'javascript',
      phase: 1,
      phaseLabel: 'Phase 1 — Core Stack',
      priority: 'medium',
      reason: '5+ years JS foundation — async, closures, and ES6+ underpin React/Next.js work.',
      focusCategories: ['Async', 'Functions', 'ES6+', 'Basics'],
      jdKeywords: ['JavaScript', 'ES6', 'async'],
    },
  ],
  supplementary: [
    {
      title: 'Headless CMS (Contentful & peers)',
      description:
        'This role requires integrating headless CMS platforms for content management and personalization. We do not have a dedicated CMS question bank yet — study these concepts separately.',
      tips: [
        'Contentful: content models, entries, assets, GraphQL/REST delivery API',
        'Preview mode & webhooks for content updates in Next.js',
        'Compare Sitecore, Sanity, Optimizely — composable content, localization',
        'Personalization: audience segments, A/B content variants via CMS or edge',
        'Pattern: fetch CMS content in Server Components with revalidation tags',
      ],
    },
  ],
}

export const ROLE_PROFILES = [SENIOR_NEXTJS_FE_ROLE]
