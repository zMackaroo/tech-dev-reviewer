import { TopicPage } from './TopicPage'
import { javascriptCategories, javascriptQuestions } from '../data/javascript'

export function JavaScriptPage() {
  return (
    <TopicPage
      title="JavaScript Interview Prep"
      subtitle={`${javascriptQuestions.length} technical questions with answers and code snippets`}
      questions={javascriptQuestions}
      categories={javascriptCategories}
    />
  )
}
