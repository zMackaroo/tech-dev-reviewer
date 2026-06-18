import { TopicPage } from './TopicPage'
import { typescriptCategories, typescriptQuestions } from '../data/typescript'

export function TypeScriptPage() {
  return (
    <TopicPage
      title="TypeScript Interview Prep"
      subtitle={`${typescriptQuestions.length} technical questions with answers and code snippets`}
      questions={typescriptQuestions}
      categories={typescriptCategories}
    />
  )
}
