import { TopicPage } from './TopicPage'
import { apiCategories, apiQuestions } from '../data/api'
import { performanceCategories, performanceQuestions } from '../data/performance'
import { testingCategories, testingQuestions } from '../data/testing'
import { cicdCategories, cicdQuestions } from '../data/cicd'
import { designSystemsCategories, designSystemsQuestions } from '../data/design-systems'
import { htmlCategories, htmlQuestions } from '../data/html'
import { gitCategories, gitQuestions } from '../data/git'
import { seniorLeadQuestions, seniorLeadCategories } from '../data/senior-lead'
import { agenticCategories, agenticQuestions } from '../data/agentic'

export function AgenticDevPage() {
  return (
    <TopicPage
      title="Agentic Developer Interview Prep"
      subtitle={`${agenticQuestions.length} questions on LangChain, LangGraph, OpenAI API, MCP, RAG, AI agents, workflow automation, prompt engineering, function calling, and LM Studio`}
      questions={agenticQuestions}
      categories={agenticCategories}
    />
  )
}

export function SeniorLeadPage() {
  return (
    <TopicPage
      title="Senior Lead Interview Prep"
      subtitle={`${seniorLeadQuestions.length} situational questions on project handling, code review, deployment, team leadership, sprint planning, and agile practices`}
      questions={seniorLeadQuestions}
      categories={seniorLeadCategories}
    />
  )
}

export function APIPage() {
  return (
    <TopicPage
      title="API Integration Interview Prep"
      subtitle={`${apiQuestions.length} questions on RESTful APIs, GraphQL, WebSockets, CRUD operations, and real-world integration patterns`}
      questions={apiQuestions}
      categories={apiCategories}
    />
  )
}

export function PerformancePage() {
  return (
    <TopicPage
      title="Web Performance & Optimization"
      subtitle={`${performanceQuestions.length} questions on Lighthouse, Core Web Vitals, caching strategies, and performance monitoring`}
      questions={performanceQuestions}
      categories={performanceCategories}
    />
  )
}

export function TestingPage() {
  return (
    <TopicPage
      title="Testing & QA Interview Prep"
      subtitle={`${testingQuestions.length} questions on Jest, Cypress, Playwright, and UI testing strategies`}
      questions={testingQuestions}
      categories={testingCategories}
    />
  )
}

export function CICDPage() {
  return (
    <TopicPage
      title="Version Control & CI/CD"
      subtitle={`${cicdQuestions.length} questions on Git, GitHub/GitLab/Bitbucket, automated testing pipelines, and cloud deployments`}
      questions={cicdQuestions}
      categories={cicdCategories}
    />
  )
}

export function DesignSystemsPage() {
  return (
    <TopicPage
      title="Design Systems Interview Prep"
      subtitle={`${designSystemsQuestions.length} questions on Storybook, Material UI, Tailwind CSS, and Radix UI`}
      questions={designSystemsQuestions}
      categories={designSystemsCategories}
    />
  )
}

export function HTMLPage() {
  return (
    <TopicPage
      title="HTML Interview Prep"
      subtitle={`${htmlQuestions.length} questions on HTML5, semantic markup, forms, accessibility, and best practices`}
      questions={htmlQuestions}
      categories={htmlCategories}
    />
  )
}

export function GitPage() {
  return (
    <TopicPage
      title="Git Commands Reference"
      subtitle={`${gitQuestions.length} questions covering essential Git CLI commands — staging, branching, merging, rebasing, and recovery`}
      questions={gitQuestions}
      categories={gitCategories}
    />
  )
}
