export interface CodingTestCase {
  args: unknown[]
  expected: unknown
  label?: string
}

export interface CodingPracticeQuestion {
  id: number
  category: string
  title: string
  prompt: string
  functionName: string
  /** Comma-separated parameter list, e.g. `arr` or `str, n` */
  params: string
  /** Optional override for the sample input block shown to the user */
  dataStructure?: string
  /** Initial solution body (inside the function); defaults to a comment hint */
  solutionStarter?: string
  tests: CodingTestCase[]
}

export const CODING_PRACTICE_SESSION_SIZE = 100
