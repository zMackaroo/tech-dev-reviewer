import { TopicPage } from './TopicPage'
import { reactCategories, reactQuestions } from '../data/react'

export function ReactPage() {
  return (
    <TopicPage
      title="React Interview Prep"
      subtitle={`${reactQuestions.length} technical questions with answers and code snippets`}
      questions={reactQuestions}
      categories={reactCategories}
    />
  )
}
