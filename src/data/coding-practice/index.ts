import { buildCodingPracticeQuestions } from './generator'

export const CODING_PRACTICE_QUESTIONS = buildCodingPracticeQuestions()

export const CODING_PRACTICE_POOL_SIZE = CODING_PRACTICE_QUESTIONS.length

export type { CodingPracticeQuestion, CodingTestCase } from './types'
export { CODING_PRACTICE_SESSION_SIZE } from './types'

export const REAL_WORLD_QUESTION_COUNT = CODING_PRACTICE_QUESTIONS.filter(
  (q) => q.category === 'Real-World Apps',
).length
