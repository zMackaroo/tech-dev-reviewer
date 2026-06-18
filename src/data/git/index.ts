import { basicsQuestions } from './basics'
import { branchingQuestions } from './branching'
import { historyQuestions } from './history'
import { undoingQuestions } from './undoing'
import { remoteQuestions } from './remote'
import { stashingQuestions } from './stashing'
import { rebaseQuestions } from './rebase'
import { advancedQuestions } from './advanced'
import { configQuestions } from './config'

export const gitQuestions = [
  ...basicsQuestions,
  ...branchingQuestions,
  ...historyQuestions,
  ...undoingQuestions,
  ...remoteQuestions,
  ...stashingQuestions,
  ...rebaseQuestions,
  ...advancedQuestions,
  ...configQuestions,
]

export const gitCategories = [
  ...new Set(gitQuestions.map((q) => q.category)),
]
