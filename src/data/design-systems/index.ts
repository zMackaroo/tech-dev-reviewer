import { fundamentalsQuestions } from './fundamentals'
import { storybookQuestions } from './storybook'
import { materialUiQuestions } from './material-ui'
import { tailwindQuestions } from './tailwind'
import { radixUiQuestions } from './radix-ui'

export const designSystemsQuestions = [
  ...fundamentalsQuestions,
  ...storybookQuestions,
  ...materialUiQuestions,
  ...tailwindQuestions,
  ...radixUiQuestions,
]

export const designSystemsCategories = [
  ...new Set(designSystemsQuestions.map((q) => q.category)),
]
