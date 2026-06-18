import type { NavSection } from './types'

export const DEFAULT_SECTION: NavSection = 'senior-lead'

export const SECTION_PATHS: Record<NavSection, string> = {
  'role-study': '/my-role',
  'senior-lead': '/senior-lead',
  'agentic-dev': '/agentic-dev',
  javascript: '/javascript',
  typescript: '/typescript',
  react: '/react',
  nextjs: '/nextjs',
  css: '/css',
  html: '/html',
  git: '/git',
  api: '/api',
  performance: '/performance',
  testing: '/testing',
  cicd: '/cicd',
  'design-systems': '/design-systems',
  'coding-practice': '/coding-practice',
}

export function sectionToPath(section: NavSection): string {
  return SECTION_PATHS[section]
}

export function pathToSection(pathname: string): NavSection | null {
  const normalized = pathname.replace(/\/+$/, '') || '/'

  for (const [section, path] of Object.entries(SECTION_PATHS) as [NavSection, string][]) {
    if (path === normalized) return section
  }

  return null
}
