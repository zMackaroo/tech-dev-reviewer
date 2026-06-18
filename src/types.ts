export type NavSection =
  | 'role-study'
  | 'senior-lead'
  | 'agentic-dev'
  | 'javascript'
  | 'typescript'
  | 'react'
  | 'nextjs'
  | 'css'
  | 'html'
  | 'git'
  | 'api'
  | 'performance'
  | 'testing'
  | 'cicd'
  | 'design-systems'
  | 'coding-practice'

export interface InterviewQuestion {
  id: number
  category: string
  question: string
  answer: string
  code: string
  output?: string[]
  demo?: DemoType
}

export type DemoType =
  | 'hoisting'
  | 'closure-counter'
  | 'event-loop'
  | 'promise-chain'
  | 'this-binding'
  | 'prototype-chain'
  | 'coercion'
  | 'debounce'
  | 'deep-clone'
  | 'currying'
  | 'output-only'
  | 'react-state'
  | 'react-effect'
  | 'react-context'
  | 'react-memo'
  | 'react-keys'
  | 'react-ref'
  | 'react-reducer'
  | 'react-lifting-state'
