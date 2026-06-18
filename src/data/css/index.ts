import { fundamentalsQuestions } from './fundamentals'
import { layoutQuestions } from './layout'
import { responsiveQuestions } from './responsive'
import { typographyQuestions } from './typography'
import { animationsQuestions } from './animations'
import { advancedQuestions } from './advanced'
import { cssModulesQuestions } from './css-modules'
import { scssQuestions } from './scss'
import { postcssQuestions } from './postcss'
import { bestPracticesQuestions } from './best-practices'

export const cssQuestions = [
  ...fundamentalsQuestions,
  ...layoutQuestions,
  ...responsiveQuestions,
  ...typographyQuestions,
  ...animationsQuestions,
  ...advancedQuestions,
  ...cssModulesQuestions,
  ...scssQuestions,
  ...postcssQuestions,
  ...bestPracticesQuestions,
]

export const cssCategories = [
  ...new Set(cssQuestions.map((q) => q.category)),
]
