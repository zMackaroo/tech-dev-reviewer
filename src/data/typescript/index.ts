import { fundamentalsQuestions } from './fundamentals'
import { basicTypesQuestions } from './basic-types'
import { interfacesQuestions } from './interfaces'
import { genericsQuestions } from './generics'
import { classesQuestions } from './classes'
import { advancedTypesQuestions } from './advanced-types'
import { narrowingQuestions } from './narrowing'
import { configQuestions } from './config'
import { patternsQuestions } from './patterns'

export const typescriptQuestions = [
  ...fundamentalsQuestions,
  ...basicTypesQuestions,
  ...interfacesQuestions,
  ...genericsQuestions,
  ...classesQuestions,
  ...advancedTypesQuestions,
  ...narrowingQuestions,
  ...configQuestions,
  ...patternsQuestions,
]

export const typescriptCategories = [
  ...new Set(typescriptQuestions.map((q) => q.category)),
]
