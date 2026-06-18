import { fundamentalsQuestions } from './fundamentals'
import { jestQuestions } from './jest'
import { cypressQuestions } from './cypress'
import { playwrightQuestions } from './playwright'
import { strategiesQuestions } from './strategies'

export const testingQuestions = [
  ...fundamentalsQuestions,
  ...jestQuestions,
  ...cypressQuestions,
  ...playwrightQuestions,
  ...strategiesQuestions,
]

export const testingCategories = [
  ...new Set(testingQuestions.map((q) => q.category)),
]
