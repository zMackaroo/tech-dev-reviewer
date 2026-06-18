import { javascriptQuestions } from '../data/javascript'
import { typescriptQuestions } from '../data/typescript'
import { reactQuestions } from '../data/react'
import { nextjsQuestions } from '../data/nextjs'
import { cssQuestions } from '../data/css'
import { htmlQuestions } from '../data/html'
import { gitQuestions } from '../data/git'
import { apiQuestions } from '../data/api'
import { performanceQuestions } from '../data/performance'
import { testingQuestions } from '../data/testing'
import { cicdQuestions } from '../data/cicd'
import { designSystemsQuestions } from '../data/design-systems'
import { seniorLeadQuestions } from '../data/senior-lead'
import { agenticQuestions } from '../data/agentic'
import { REVIEWER_SECTION_MAP, type ReviewerSection } from '../data/sectionRegistry'
import type { RoleProfile, RoleSectionPlan } from '../data/roles/senior-nextjs-fe'
import type { InterviewQuestion } from '../types'

const QUESTION_MAP: Record<ReviewerSection, InterviewQuestion[]> = {
  javascript: javascriptQuestions,
  typescript: typescriptQuestions,
  react: reactQuestions,
  nextjs: nextjsQuestions,
  css: cssQuestions,
  html: htmlQuestions,
  git: gitQuestions,
  api: apiQuestions,
  performance: performanceQuestions,
  testing: testingQuestions,
  cicd: cicdQuestions,
  'design-systems': designSystemsQuestions,
  'senior-lead': seniorLeadQuestions,
  'agentic-dev': agenticQuestions,
}

export interface RoleQuestion extends InterviewQuestion {
  section: ReviewerSection
  sectionLabel: string
  phase: number
  priority: RoleSectionPlan['priority']
}

function filterSectionQuestions(plan: RoleSectionPlan): RoleQuestion[] {
  const all = QUESTION_MAP[plan.section]
  const filtered = plan.focusCategories?.length
    ? all.filter((q) => plan.focusCategories!.some((cat) => q.category.includes(cat) || cat.includes(q.category)))
    : all

  const meta = REVIEWER_SECTION_MAP[plan.section]
  return filtered.map((q) => ({
    ...q,
    section: plan.section,
    sectionLabel: meta.label,
    phase: plan.phase,
    priority: plan.priority,
  }))
}

export function getRoleQuestions(role: RoleProfile): RoleQuestion[] {
  const seen = new Set<string>()
  const results: RoleQuestion[] = []

  const sortedPlans = [...role.sections].sort((a, b) => a.phase - b.phase)

  for (const plan of sortedPlans) {
    for (const q of filterSectionQuestions(plan)) {
      const key = `${q.section}-${q.id}`
      if (seen.has(key)) continue
      seen.add(key)
      results.push(q)
    }
  }

  return results
}

export function getRoleStats(role: RoleProfile) {
  const questions = getRoleQuestions(role)
  const phases = [...new Set(role.sections.map((s) => s.phase))].sort()
  const bySection = role.sections.map((plan) => ({
    ...plan,
    label: REVIEWER_SECTION_MAP[plan.section].label,
    questionCount: filterSectionQuestions(plan).length,
  }))

  return {
    totalQuestions: questions.length,
    sectionCount: role.sections.length,
    phases,
    bySection,
  }
}

export function getPhaseLabel(role: RoleProfile, phase: number): string {
  return role.sections.find((s) => s.phase === phase)?.phaseLabel ?? `Phase ${phase}`
}

export interface RoleQuestionGroup {
  section: ReviewerSection
  sectionLabel: string
  category: string
  phase: number
  priority: RoleSectionPlan['priority']
  questions: RoleQuestion[]
}

function getCategorySortIndex(section: ReviewerSection, category: string, role: RoleProfile): number {
  const plan = role.sections.find((s) => s.section === section)
  if (!plan?.focusCategories?.length) return 999
  const idx = plan.focusCategories.findIndex(
    (cat) => category.includes(cat) || cat.includes(category),
  )
  return idx === -1 ? 999 : idx
}

export function groupRoleQuestionsByCategory(
  questions: RoleQuestion[],
  role: RoleProfile,
): RoleQuestionGroup[] {
  const sectionOrder = new Map(role.sections.map((s, i) => [s.section, i]))
  const groups = new Map<string, RoleQuestionGroup>()

  for (const q of questions) {
    const key = `${q.section}::${q.category}`
    const existing = groups.get(key)
    if (existing) {
      existing.questions.push(q)
    } else {
      groups.set(key, {
        section: q.section,
        sectionLabel: q.sectionLabel,
        category: q.category,
        phase: q.phase,
        priority: q.priority,
        questions: [q],
      })
    }
  }

  return [...groups.values()].sort((a, b) => {
    if (a.phase !== b.phase) return a.phase - b.phase
    const sectionCmp =
      (sectionOrder.get(a.section) ?? 0) - (sectionOrder.get(b.section) ?? 0)
    if (sectionCmp !== 0) return sectionCmp
    const catCmp =
      getCategorySortIndex(a.section, a.category, role) -
      getCategorySortIndex(b.section, b.category, role)
    if (catCmp !== 0) return catCmp
    return a.category.localeCompare(b.category)
  })
}
