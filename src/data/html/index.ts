import { fundamentalsQuestions } from './fundamentals'
import { semanticQuestions } from './semantic'
import { formsQuestions } from './forms'
import { mediaQuestions } from './media'
import { accessibilityQuestions } from './accessibility'
import { metaSeoQuestions } from './meta-seo'
import { tablesListsQuestions } from './tables-lists'
import { advancedQuestions } from './advanced'
import { bestPracticesQuestions } from './best-practices'

export const htmlQuestions = [
  ...fundamentalsQuestions,
  ...semanticQuestions,
  ...formsQuestions,
  ...mediaQuestions,
  ...accessibilityQuestions,
  ...metaSeoQuestions,
  ...tablesListsQuestions,
  ...advancedQuestions,
  ...bestPracticesQuestions,
]

export const htmlCategories = [
  ...new Set(htmlQuestions.map((q) => q.category)),
]
