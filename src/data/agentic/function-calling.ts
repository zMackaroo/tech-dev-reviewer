import type { InterviewQuestion } from '../../types'

export const functionCallingQuestions: InterviewQuestion[] = [
  {
    id: 65,
    category: 'Function Calling',
    question: 'What is LLM function calling (tool use)?',
    answer: 'Function calling lets the model return structured tool invocations — function name and JSON arguments — instead of only natural language, so your app executes real APIs, queries, or code and feeds results back to the model. The API exposes tool schemas describing parameters; the model chooses when and how to call them based on user intent. This is the foundation of agents, copilots, and grounded assistants.',
    code: `tools=[{
  "type": "function",
  "function": {
    "name": "get_order_status",
    "parameters": {
      "type": "object",
      "properties": {"order_id": {"type": "string"}},
      "required": ["order_id"],
    },
  },
}]`,
  },
  {
    id: 66,
    category: 'Function Calling',
    question: 'How does the function calling loop work with OpenAI?',
    answer: 'Send tools in chat.completions.create; when finish_reason is tool_calls, parse each call, execute your function, append tool role messages with results, and call the model again until it returns a normal assistant message. Parallel tool calls let the model request multiple functions in one turn — run them concurrently when safe. Never trust the model to self-report tool output; always execute server-side and return real results.',
    code: `while True:
  resp = client.chat.completions.create(model="gpt-4o", messages=msgs, tools=tools)
  if resp.choices[0].finish_reason != "tool_calls": break
  for call in resp.choices[0].message.tool_calls:
    result = execute(call.function.name, json.loads(call.function.arguments))
    msgs.append({"role": "tool", "tool_call_id": call.id, "content": result})`,
  },
  {
    id: 67,
    category: 'Function Calling',
    question: 'How do you write effective tool descriptions for the model?',
    answer: 'Tool descriptions are prompts — name should be verb_noun clear, description must say when to use and when NOT to use the tool, and parameter descriptions explain format and enums. Ambiguous descriptions cause wrong tool selection or invented arguments. Include examples in description for complex formats like date ranges or IDs.',
    code: `"description": "Cancel a user subscription. Requires active sub ID.
Use ONLY after user confirms cancellation.
Do not use for refunds — use create_refund."`,
  },
  {
    id: 68,
    category: 'Function Calling',
    question: 'What is structured output versus function calling?',
    answer: 'Structured output forces the model response itself to match a JSON Schema — good for extraction and classification returned to your UI. Function calling triggers external side effects — database, email, search — with the model requesting execution through your host. They can combine: structured output for parsing user intent, function calling for actions. Choose structured output when no external tool is needed but format must be reliable.',
    code: `# Structured output → data IN response
response_format={"type": "json_schema", ...}

# Function calling → data FROM your systems
tools=[{"type": "function", ...}]`,
  },
  {
    id: 69,
    category: 'Function Calling',
    question: 'How do you handle tool errors and timeouts?',
    answer: 'Return tool messages describing errors clearly — HTTP status, retryable flag, user-safe message — so the model can apologize, retry, or escalate instead of hallucinating success. Set timeouts on every external call; partial failures in parallel batches should report per-tool status. Log errors with correlation IDs linking to user sessions for support.',
    code: `try:
  result = api.get_order(id)
except NotFound:
  return json.dumps({"error": "Order not found", "retry": False})
except Timeout:
  return json.dumps({"error": "Service timeout", "retry": True})`,
  },
  {
    id: 70,
    category: 'Function Calling',
    question: 'What is parallel function calling and when is it safe?',
    answer: 'Parallel function calling lets the model emit multiple independent tool_calls in one assistant message; your host executes them concurrently and returns all tool results before the next completion. Safe when calls are read-only or touch disjoint resources — two searches, two lookups. Unsafe when order matters or calls conflict — debit then credit, sequential workflow steps.',
    code: `# Parallel (read-only OK)
calls = [get_weather(city), get_news(topic)]
results = await asyncio.gather(*[run(c) for c in calls])`,
  },
  {
    id: 71,
    category: 'Function Calling',
    question: 'How does function calling work in LangChain / LangGraph?',
    answer: 'LangChain bind_tools attaches schemas to ChatModel; ToolNode executes matching Python/JS functions when the model returns tool_calls. LangGraph routes agent → tools → agent with conditional edges for multi-step tool loops and checkpointing. The framework handles message formatting but you still own auth, validation, and idempotency inside each tool.',
    code: `from langchain_core.tools import tool

@tool
def search_kb(query: str) -> str:
  """Search internal knowledge base."""
  return kb.search(query)

llm_with_tools = llm.bind_tools([search_kb])`,
  },
  {
    id: 72,
    category: 'Function Calling',
    question: 'What security patterns apply to LLM tool execution?',
    answer: 'Authenticate the user before executing tools on their behalf; pass user_id from session, never from model-generated arguments alone. Allowlist tools per role, sanitize arguments, and require confirmation for destructive operations regardless of model requests. Sandboxed code execution and SQL tools need read-only modes and query planners to block DROP or exfiltration. Prompt injection can trigger malicious tool args — validate against business rules server-side.',
    code: `def delete_account(user_id: str, session):
  if session.user_id != user_id:
    raise PermissionError("Cannot delete other users")
  if not session.reauth_recent:
    raise NeedsConfirmation("Re-auth required")`,
  },
]
