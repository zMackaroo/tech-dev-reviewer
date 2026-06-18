import { TopicPage } from './TopicPage'
import { nextjsCategories, nextjsQuestions } from '../data/nextjs'

export function NextJSPage() {
  return (
    <TopicPage
      title="Next.js Interview Prep"
      subtitle={`${nextjsQuestions.length} technical questions with answers and code snippets`}
      questions={nextjsQuestions}
      categories={nextjsCategories}
    />
  )
}
