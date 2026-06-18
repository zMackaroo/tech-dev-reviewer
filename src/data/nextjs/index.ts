import { fundamentalsQuestions } from './fundamentals'
import { routingQuestions } from './routing'
import { serverComponentsQuestions } from './server-components'
import { dataFetchingQuestions } from './data-fetching'
import { renderingQuestions } from './rendering'
import { apiMiddlewareQuestions } from './api-middleware'
import { performanceQuestions } from './performance'
import { deploymentQuestions } from './deployment'
import { advancedQuestions } from './advanced'

export const nextjsQuestions = [
  ...fundamentalsQuestions,
  ...routingQuestions,
  ...serverComponentsQuestions,
  ...dataFetchingQuestions,
  ...renderingQuestions,
  ...apiMiddlewareQuestions,
  ...performanceQuestions,
  ...deploymentQuestions,
  ...advancedQuestions,
]

export const nextjsCategories = [
  ...new Set(nextjsQuestions.map((q) => q.category)),
]
