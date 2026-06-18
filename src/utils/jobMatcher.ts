import { REVIEWER_SECTIONS, type ReviewerSection, type SectionMeta } from '../data/sectionRegistry'

export interface MatchResult {
  section: ReviewerSection
  label: string
  questionCount: number
  description: string
  score: number
  percentage: number
  matchedKeywords: string[]
  matchedCategories: string[]
  priority: 'essential' | 'recommended' | 'optional'
  reason: string
}

const ROLE_BOOSTS: { pattern: RegExp; sections: ReviewerSection[]; bonus: number }[] = [
  {
    pattern: /front[\s-]?end|frontend developer|ui developer|web developer/i,
    bonus: 3,
    sections: ['javascript', 'react', 'css', 'html', 'typescript'],
  },
  {
    pattern: /full[\s-]?stack|fullstack/i,
    bonus: 4,
    sections: ['nextjs', 'api', 'javascript', 'react', 'cicd'],
  },
  {
    pattern: /senior|staff|lead|principal/i,
    bonus: 2,
    sections: ['performance', 'testing', 'cicd', 'design-systems', 'api'],
  },
  {
    pattern: /react native|mobile/i,
    bonus: 2,
    sections: ['react', 'javascript', 'typescript'],
  },
]

function normalizeText(text: string): string {
  return text.toLowerCase().replace(/\s+/g, ' ').trim()
}

function scoreKeyword(jd: string, keyword: string): number {
  const normalizedKeyword = keyword.toLowerCase()
  if (!jd.includes(normalizedKeyword)) return 0

  const wordCount = normalizedKeyword.split(' ').length
  const base = wordCount > 1 ? 8 + wordCount * 2 : 4
  const occurrences = jd.split(normalizedKeyword).length - 1
  return base + Math.min(occurrences - 1, 3) * 2
}

function scoreCategory(jd: string, category: string): number {
  const words = category.toLowerCase().split(/[\s/&]+/).filter((w) => w.length > 3)
  let score = 0
  for (const word of words) {
    if (jd.includes(word)) score += 2
  }
  return score
}

function buildReason(meta: SectionMeta, matchedKeywords: string[], matchedCategories: string[]): string {
  const parts: string[] = []

  if (matchedKeywords.length > 0) {
    const shown = matchedKeywords.slice(0, 4).join(', ')
    parts.push(`The job mentions ${shown}${matchedKeywords.length > 4 ? ', and more' : ''}.`)
  }

  if (matchedCategories.length > 0) {
    parts.push(`Relevant topics include ${matchedCategories.slice(0, 3).join(', ')}.`)
  }

  parts.push(`${meta.label} covers ${meta.questionCount} practice questions aligned with this role.`)

  return parts.join(' ')
}

function getPriority(percentage: number, rank: number): MatchResult['priority'] {
  if (rank === 0 || percentage >= 70) return 'essential'
  if (percentage >= 40 || rank <= 2) return 'recommended'
  return 'optional'
}

interface ScoredSection {
  meta: SectionMeta
  score: number
  matchedKeywords: string[]
  matchedCategories: string[]
}

export function matchJobDescription(jobDescription: string): MatchResult[] {
  const jd = normalizeText(jobDescription)
  if (jd.length < 20) return []

  const results: ScoredSection[] = REVIEWER_SECTIONS.map((meta) => {
    let score = 0
    const matchedKeywords: string[] = []
    const matchedCategories: string[] = []

    const sortedKeywords = [...meta.keywords].sort((a, b) => b.length - a.length)
    for (const keyword of sortedKeywords) {
      const kwScore = scoreKeyword(jd, keyword)
      if (kwScore > 0) {
        score += kwScore
        matchedKeywords.push(keyword)
      }
    }

    for (const category of meta.categories) {
      const catScore = scoreCategory(jd, category)
      if (catScore > 0) {
        score += catScore
        matchedCategories.push(category)
      }
    }

    return { meta, score, matchedKeywords, matchedCategories }
  })

  for (const boost of ROLE_BOOSTS) {
    if (boost.pattern.test(jobDescription)) {
      for (const sectionId of boost.sections) {
        const entry = results.find((r) => r.meta.id === sectionId)
        if (entry) entry.score += boost.bonus
      }
    }
  }

  const maxScore = Math.max(...results.map((r) => r.score), 1)

  return results
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r, rank) => {
      const percentage = Math.round((r.score / maxScore) * 100)
      return {
        section: r.meta.id,
        label: r.meta.label,
        questionCount: r.meta.questionCount,
        description: r.meta.description,
        score: r.score,
        percentage,
        matchedKeywords: r.matchedKeywords,
        matchedCategories: r.matchedCategories,
        priority: getPriority(percentage, rank),
        reason: buildReason(r.meta, r.matchedKeywords, r.matchedCategories),
      }
    })
}

export const SAMPLE_JOB_DESCRIPTIONS = [
  {
    title: 'Senior React Developer',
    text: `We are looking for a Senior React Developer to build scalable single-page applications.
Requirements: 5+ years JavaScript/TypeScript, strong React and hooks experience, Redux or Context API,
REST API integration, Jest/React Testing Library, Git/GitHub workflow, CSS Modules or Styled Components,
performance optimization and Core Web Vitals awareness.`,
  },
  {
    title: 'Full-Stack Next.js Engineer',
    text: `Join our team as a Full-Stack Engineer working with Next.js 14 App Router, React Server Components,
TypeScript, GraphQL, and PostgreSQL. Experience with Server Actions, Vercel deployment, CI/CD pipelines,
WebSockets for real-time features, and Tailwind CSS required.`,
  },
  {
    title: 'Frontend + Design Systems',
    text: `Frontend Engineer focused on our design system: Storybook, Material UI theming, Radix UI primitives,
accessibility (WCAG), semantic HTML, responsive CSS, Playwright E2E tests, and collaboration with Figma.`,
  },
]
