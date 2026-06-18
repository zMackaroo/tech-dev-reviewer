import { langchainQuestions } from './langchain'
import { langgraphQuestions } from './langgraph'
import { openaiApiQuestions } from './openai-api'
import { mcpQuestions } from './mcp'
import { ragQuestions } from './rag'
import { aiAgentsQuestions } from './ai-agents'
import { workflowAutomationQuestions } from './workflow-automation'
import { promptEngineeringQuestions } from './prompt-engineering'
import { functionCallingQuestions } from './function-calling'
import { lmStudioQuestions } from './lm-studio'

export const agenticQuestions = [
  ...langchainQuestions,
  ...langgraphQuestions,
  ...openaiApiQuestions,
  ...mcpQuestions,
  ...ragQuestions,
  ...aiAgentsQuestions,
  ...workflowAutomationQuestions,
  ...promptEngineeringQuestions,
  ...functionCallingQuestions,
  ...lmStudioQuestions,
]

export const agenticCategories = [
  ...new Set(agenticQuestions.map((q) => q.category)),
]
