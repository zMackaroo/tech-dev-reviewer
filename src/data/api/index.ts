import { restFundamentalsQuestions } from './rest-fundamentals'
import { restCrudQuestions } from './rest-crud'
import { restAuthQuestions } from './rest-auth'
import { restAdvancedQuestions } from './rest-advanced'
import { graphqlQuestions } from './graphql'
import { graphqlAdvancedQuestions } from './graphql-advanced'
import { websocketQuestions } from './websocket'

export const apiQuestions = [
  ...restFundamentalsQuestions,
  ...restCrudQuestions,
  ...restAuthQuestions,
  ...restAdvancedQuestions,
  ...graphqlQuestions,
  ...graphqlAdvancedQuestions,
  ...websocketQuestions,
]

export const apiCategories = [
  ...new Set(apiQuestions.map((q) => q.category)),
]
