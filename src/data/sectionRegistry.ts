import type { NavSection } from '../types'
import { javascriptQuestions, javascriptCategories } from './javascript'
import { typescriptQuestions, typescriptCategories } from './typescript'
import { reactQuestions, reactCategories } from './react'
import { nextjsQuestions, nextjsCategories } from './nextjs'
import { cssQuestions, cssCategories } from './css'
import { htmlQuestions, htmlCategories } from './html'
import { gitQuestions, gitCategories } from './git'
import { apiQuestions, apiCategories } from './api'
import { performanceQuestions, performanceCategories } from './performance'
import { testingQuestions, testingCategories } from './testing'
import { cicdQuestions, cicdCategories } from './cicd'
import { designSystemsQuestions, designSystemsCategories } from './design-systems'
import { seniorLeadQuestions, seniorLeadCategories } from './senior-lead'
import { agenticQuestions, agenticCategories } from './agentic'

export type ReviewerSection = Exclude<NavSection, 'role-study'>

export interface SectionMeta {
  id: ReviewerSection
  label: string
  questionCount: number
  description: string
  keywords: string[]
  categories: string[]
}

export const REVIEWER_SECTIONS: SectionMeta[] = [
  {
    id: 'javascript',
    label: 'JavaScript',
    questionCount: javascriptQuestions.length,
    description: 'Core language fundamentals, closures, async, prototypes, and ES6+ features.',
    keywords: [
      'javascript', 'js', 'es6', 'es2015', 'ecmascript', 'vanilla js', 'node.js', 'nodejs',
      'closure', 'prototype', 'promise', 'async', 'await', 'event loop', 'hoisting',
      'dom manipulation', 'fetch api', 'json', 'webpack', 'vite',
    ],
    categories: javascriptCategories,
  },
  {
    id: 'typescript',
    label: 'TypeScript',
    questionCount: typescriptQuestions.length,
    description: 'Static typing, generics, interfaces, utility types, and tsconfig.',
    keywords: [
      'typescript', 'ts', 'type safety', 'static typing', 'generics', 'interface',
      'type alias', 'enum', 'strict mode', 'tsconfig', 'type inference', 'utility types',
      'partial', 'pick', 'omit', 'narrowing', 'unknown', 'never',
    ],
    categories: typescriptCategories,
  },
  {
    id: 'react',
    label: 'React',
    questionCount: reactQuestions.length,
    description: 'Components, hooks, state, context, performance, and React patterns.',
    keywords: [
      'react', 'reactjs', 'react.js', 'jsx', 'hooks', 'usestate', 'useeffect', 'usememo',
      'usecallback', 'usecontext', 'redux', 'context api', 'component', 'virtual dom',
      'react router', 'spa', 'single page application', 'frontend framework',
    ],
    categories: reactCategories,
  },
  {
    id: 'nextjs',
    label: 'Next.js',
    questionCount: nextjsQuestions.length,
    description: 'App Router, Server Components, SSR, SSG, and full-stack React.',
    keywords: [
      'next.js', 'nextjs', 'next js', 'server components', 'app router', 'ssr',
      'server-side rendering', 'ssg', 'static site generation', 'isr', 'vercel',
      'server actions', 'getserversideprops', 'getstaticprops', 'full stack',
      'full-stack', 'fullstack', 'react framework',
    ],
    categories: nextjsCategories,
  },
  {
    id: 'css',
    label: 'CSS',
    questionCount: cssQuestions.length,
    description: 'Layout, responsive design, CSS Modules, SCSS, PostCSS, and animations.',
    keywords: [
      'css', 'css3', 'stylesheet', 'flexbox', 'grid', 'css grid', 'responsive design',
      'media query', 'scss', 'sass', 'postcss', 'css modules', 'tailwind',
      'styled components', 'bem', 'preprocessor', 'animation', 'transition',
      'mobile-first', 'responsive', 'layout',
    ],
    categories: cssCategories,
  },
  {
    id: 'html',
    label: 'HTML',
    questionCount: htmlQuestions.length,
    description: 'Semantic markup, forms, accessibility, SEO, and HTML5 best practices.',
    keywords: [
      'html', 'html5', 'semantic html', 'markup', 'accessibility', 'a11y', 'aria',
      'seo', 'meta tags', 'forms', 'web standards', 'wcag', 'screen reader',
      'semantic', 'dom structure',
    ],
    categories: htmlCategories,
  },
  {
    id: 'git',
    label: 'Git',
    questionCount: gitQuestions.length,
    description: 'Git CLI commands — branching, merging, rebasing, and recovery.',
    keywords: [
      'git', 'github', 'gitlab', 'bitbucket', 'version control', 'source control',
      'commit', 'branch', 'merge', 'rebase', 'pull request', 'cherry-pick',
      'git commands', 'git flow', 'stash',
    ],
    categories: gitCategories,
  },
  {
    id: 'api',
    label: 'API Integration',
    questionCount: apiQuestions.length,
    description: 'REST, GraphQL, WebSockets, CRUD, auth, and API integration patterns.',
    keywords: [
      'rest', 'restful', 'rest api', 'graphql', 'gql', 'apollo', 'websocket',
      'websockets', 'socket.io', 'crud', 'api integration', 'api design',
      'http', 'endpoint', 'jwt', 'oauth', 'axios', 'fetch', 'microservices',
      'backend integration', 'real-time', 'realtime', 'subscription',
    ],
    categories: apiCategories,
  },
  {
    id: 'performance',
    label: 'Performance',
    questionCount: performanceQuestions.length,
    description: 'Core Web Vitals, Lighthouse, caching, and performance monitoring.',
    keywords: [
      'performance', 'web vitals', 'core web vitals', 'lighthouse', 'lcp', 'cls', 'inp', 'fid',
      'optimization', 'caching', 'cdn', 'bundle size', 'lazy loading', 'code splitting',
      'performance monitoring', 'rum', 'page speed', 'fast loading', 'critical rendering path',
    ],
    categories: performanceCategories,
  },
  {
    id: 'testing',
    label: 'Testing & QA',
    questionCount: testingQuestions.length,
    description: 'Jest, Cypress, Playwright, and UI testing strategies.',
    keywords: [
      'testing', 'qa', 'quality assurance', 'jest', 'cypress', 'playwright', 'unit test',
      'integration test', 'e2e', 'end-to-end', 'test automation', 'tdd', 'test coverage',
      'react testing library', 'ui testing', 'regression test', 'selenium',
    ],
    categories: testingCategories,
  },
  {
    id: 'cicd',
    label: 'CI/CD',
    questionCount: cicdQuestions.length,
    description: 'Git workflows, pipelines, GitHub Actions, and cloud deployments.',
    keywords: [
      'ci/cd', 'cicd', 'ci cd', 'continuous integration', 'continuous deployment',
      'devops', 'pipeline', 'github actions', 'gitlab ci', 'jenkins', 'deployment',
      'aws', 'netlify', 'cloudflare', 'docker', 'kubernetes', 'infrastructure',
      'automated testing', 'build pipeline', 'preview deployment',
    ],
    categories: cicdCategories,
  },
  {
    id: 'design-systems',
    label: 'Design Systems',
    questionCount: designSystemsQuestions.length,
    description: 'Storybook, Material UI, Tailwind CSS, Radix UI, and design tokens.',
    keywords: [
      'design system', 'storybook', 'material ui', 'mui', 'tailwind', 'tailwindcss',
      'radix', 'radix ui', 'shadcn', 'component library', 'design tokens',
      'ui kit', 'figma', 'atomic design', 'component-driven', 'chakra',
    ],
    categories: designSystemsCategories,
  },
  {
    id: 'senior-lead',
    label: 'Senior Lead',
    questionCount: seniorLeadQuestions.length,
    description: 'Senior-level situational questions on project handling, code review, deployment, team leadership, sprint planning, and agile practices.',
    keywords: [
      'senior engineer', 'leadership', 'mentoring', 'code review', 'sprint planning',
      'agile', 'scrum', 'retrospective', 'standup', 'stakeholder', 'deployment',
      'incident', 'team management', 'project management', 'facilitation',
      'resource planning', 'headcount', 'on-call', 'technical lead',
    ],
    categories: seniorLeadCategories,
  },
  {
    id: 'agentic-dev',
    label: 'Agentic Dev',
    questionCount: agenticQuestions.length,
    description: 'LangChain, LangGraph, OpenAI API, MCP, RAG, AI agents, workflow automation, prompt engineering, function calling, and LM Studio.',
    keywords: [
      'langchain', 'langgraph', 'openai', 'gpt', 'mcp', 'model context protocol',
      'rag', 'retrieval augmented generation', 'vector', 'embeddings', 'ai agent',
      'agentic', 'workflow automation', 'prompt engineering', 'function calling',
      'tool use', 'lm studio', 'local llm', 'llama', 'copilot', 'llm',
    ],
    categories: agenticCategories,
  },
]

export const REVIEWER_SECTION_MAP = Object.fromEntries(
  REVIEWER_SECTIONS.map((s) => [s.id, s]),
) as Record<ReviewerSection, SectionMeta>
