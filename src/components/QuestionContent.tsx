import type { InterviewQuestion } from '../types'
import { CodeBlock } from './CodeBlock'

interface QuestionContentProps {
  question: InterviewQuestion
}

export function QuestionContent({ question }: QuestionContentProps) {
  return (
    <>
      <span className="question-category-tag">{question.category}</span>
      <div className="answer-section">
        <p>{question.answer}</p>
      </div>
      {question.code && <CodeBlock code={question.code} />}
    </>
  )
}
