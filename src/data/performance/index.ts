import { fundamentalsQuestions } from './fundamentals'
import { coreWebVitalsQuestions } from './core-web-vitals'
import { lighthouseQuestions } from './lighthouse'
import { cachingQuestions } from './caching'
import { monitoringQuestions } from './monitoring'
import { optimizationQuestions } from './optimization'

export const performanceQuestions = [
  ...fundamentalsQuestions,
  ...coreWebVitalsQuestions,
  ...lighthouseQuestions,
  ...cachingQuestions,
  ...monitoringQuestions,
  ...optimizationQuestions,
]

export const performanceCategories = [
  ...new Set(performanceQuestions.map((q) => q.category)),
]
