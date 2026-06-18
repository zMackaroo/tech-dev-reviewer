import { basicsQuestions } from './basics'
import { typesQuestions } from './types'
import { functionsQuestions } from './functions'
import { scopeQuestions } from './scope'
import { prototypeQuestions } from './prototypes'
import { asyncQuestions } from './async'
import { es6Questions } from './es6'
import { collectionsQuestions } from './collections'
import { advancedQuestions } from './advanced'

export const javascriptQuestions = [
  ...basicsQuestions,
  ...typesQuestions,
  ...functionsQuestions,
  ...scopeQuestions,
  ...prototypeQuestions,
  ...asyncQuestions,
  ...es6Questions,
  ...collectionsQuestions,
  ...advancedQuestions,
]

export const javascriptCategories = [
  ...new Set(javascriptQuestions.map((q) => q.category)),
]
