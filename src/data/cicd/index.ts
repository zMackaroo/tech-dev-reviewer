import { gitFundamentalsQuestions } from './git-fundamentals'
import { gitWorkflowsQuestions } from './git-workflows'
import { githubGitlabQuestions } from './github-gitlab'
import { cicdPipelinesQuestions } from './ci-cd-pipelines'
import { deploymentsQuestions } from './deployments'

export const cicdQuestions = [
  ...gitFundamentalsQuestions,
  ...gitWorkflowsQuestions,
  ...githubGitlabQuestions,
  ...cicdPipelinesQuestions,
  ...deploymentsQuestions,
]

export const cicdCategories = [
  ...new Set(cicdQuestions.map((q) => q.category)),
]
