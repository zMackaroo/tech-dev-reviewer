import type { CodingPracticeQuestion } from '../data/coding-practice/types'

export const DEFAULT_SOLUTION_STARTER = '// Write your solution here\n'

export function getSolutionStarter(question: CodingPracticeQuestion): string {
  return question.solutionStarter ?? DEFAULT_SOLUTION_STARTER
}

export function getFunctionOpen(question: CodingPracticeQuestion): string {
  return `function ${question.functionName}(${question.params}) {`
}

export function getFunctionClose(): string {
  return '}'
}

export function wrapUserSolution(question: CodingPracticeQuestion, body: string): string {
  return `${getFunctionOpen(question)}\n${body}\n${getFunctionClose()}`
}

function formatSampleValue(value: unknown): string {
  if (value === undefined) return 'undefined'
  return JSON.stringify(value, null, 2)
}

/** Sample inputs from the first test case — shown as the data structure to work with. */
export function formatInputData(question: CodingPracticeQuestion): string {
  if (question.dataStructure) return question.dataStructure

  const paramNames = question.params
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean)
  const firstTest = question.tests[0]
  if (!firstTest || paramNames.length === 0) return ''

  return paramNames
    .map((name, i) => {
      const value = firstTest.args[i]
      const formatted = formatSampleValue(value)
      if (formatted.includes('\n')) {
        return `${name} = ${formatted.split('\n').join('\n  ')}`
      }
      return `${name} = ${formatted}`
    })
    .join('\n')
}
