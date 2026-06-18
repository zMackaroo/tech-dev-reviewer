import { TopicPage } from './TopicPage'
import { cssCategories, cssQuestions } from '../data/css'

export function CSSPage() {
  return (
    <TopicPage
      title="CSS Interview Prep"
      subtitle={`${cssQuestions.length} technical questions — fundamentals through CSS Modules, SCSS, PostCSS, and responsive design`}
      questions={cssQuestions}
      categories={cssCategories}
    />
  )
}
