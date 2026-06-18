import { basicsQuestions } from './basics'
import { componentsQuestions } from './components'
import { stateQuestions } from './state'
import { hooksQuestions } from './hooks'
import { contextQuestions } from './context'
import { performanceQuestions } from './performance'
import { formsRoutingQuestions } from './forms-routing'
import { patternsQuestions } from './patterns'
import { advancedQuestions } from './advanced'
import { modernHooksQuestions } from './modern-hooks'

export const reactQuestions = [
  ...basicsQuestions,
  ...componentsQuestions,
  ...stateQuestions,
  ...hooksQuestions,
  ...modernHooksQuestions,
  ...contextQuestions,
  ...performanceQuestions,
  ...formsRoutingQuestions,
  ...patternsQuestions,
  ...advancedQuestions,
]

export const reactCategories = [
  ...new Set(reactQuestions.map((q) => q.category)),
]
