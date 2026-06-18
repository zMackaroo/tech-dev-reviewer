import { projectHandlingQuestions } from './project-handling'
import { codeReviewQuestions } from './code-review'
import { deploymentQuestions } from './deployment'
import { teamResourcesQuestions } from './team-resources'
import { sprintPlanningQuestions } from './sprint-planning'
import { agilePracticesQuestions } from './agile-practices'

export const seniorLeadQuestions = [
  ...projectHandlingQuestions,
  ...codeReviewQuestions,
  ...deploymentQuestions,
  ...teamResourcesQuestions,
  ...sprintPlanningQuestions,
  ...agilePracticesQuestions,
]

export const seniorLeadCategories = [
  ...new Set(seniorLeadQuestions.map((q) => q.category)),
]
