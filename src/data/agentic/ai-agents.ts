import type { InterviewQuestion } from '../../types'

export const aiAgentsQuestions: InterviewQuestion[] = [
  {
    id: 41,
    category: 'AI Agents',
    question: 'What defines an AI agent versus a chatbot?',
    answer:
      'An AI agent pursues goals autonomously over multiple steps — planning, using tools, observing results, and adapting — while a basic chatbot maps each user message to a single model response without acting on the environment. Agents have perception (inputs, tool results), reasoning (LLM), and action (API calls, code execution) in a loop with memory and stopping conditions. The distinction matters for architecture, cost, and safety guardrails. For example, "book the cheapest flight to NYC Friday" requires search, compare, and purchase tools across turns. In a real app, you cap agent autonomy with approvals, tool allowlists, and iteration limits.',
    code: `# Agent loop
while not terminal:
  thought = llm.plan(goal, memory, tools)
  if thought.action:
    observation = execute_tool(thought.action)
    memory.append(observation)
  else:
    return thought.final_answer`,
  },
  {
    id: 42,
    category: 'AI Agents',
    question: 'What are common AI agent architectures?',
    answer:
      'ReAct interleaves reasoning traces and tool calls; Plan-and-Execute generates a full plan then runs steps; multi-agent systems delegate to specialist sub-agents with a supervisor; reflexion adds self-critique loops to improve answers. Choice depends on task predictability, latency budget, and debuggability — simpler architectures fail less in production. For example, a coding agent might use ReAct with file and shell tools while a report generator uses plan-and-execute. In a real app, start with the simplest architecture that passes evals before adding multi-agent complexity.',
    code: `Architectures:
• ReAct — dynamic tool loop
• Plan-and-Execute — plan first, then steps
• Supervisor — route to specialist agents
• Reflexion — critique and retry`,
  },
  {
    id: 43,
    category: 'AI Agents',
    question: 'How do you prevent runaway or infinite agent loops?',
    answer:
      'Set hard limits: max_iterations, max_tool_calls, max_tokens, and wall-clock timeouts; stop when the model repeats the same failed action or returns without progress. Detect loops by hashing recent (action, args) pairs and breaking when duplicates appear. Require explicit finish tools or structured "done" signals instead of free-text stop. For example, cap a research agent at five searches and force a summary on the sixth step. In a real app, alert when agents hit limits frequently — it signals bad prompts or missing tools.',
    code: `MAX_STEPS = 10
seen = set()
for step in range(MAX_STEPS):
  action = agent.next()
  key = (action.name, str(action.args))
  if key in seen: break
  seen.add(key)`,
  },
  {
    id: 44,
    category: 'AI Agents',
    question: 'What is tool grounding and why do agents need it?',
    answer:
      'Tool grounding means the agent\'s claims about the world come from tool observations — database rows, API responses, file contents — not from model parametric memory, reducing hallucination on factual tasks. Prompts should instruct the model to cite tool output and refuse when tools return empty or error states. Without grounding, agents confidently invent prices, ticket statuses, or code behavior. For example, order status must come from get_order(id), not guessed from chat history. In a real app, validate tool JSON schemas and reject model answers that contradict tool results in automated checks.',
    code: `System: "Use tools for all factual data.
If tool returns empty, say you could not find data.
Never invent order IDs or prices."`,
  },
  {
    id: 45,
    category: 'AI Agents',
    question: 'How do you design agent memory for long-running tasks?',
    answer:
      'Separate working memory (current task context, recent tool outputs) from long-term memory (user preferences, past sessions) stored in vector DB or structured stores. Summarize or compress old turns when approaching context limits, keeping key facts and open sub-goals. Scoped memory per user and per task prevents cross-contamination in multi-tenant systems. For example, a dev agent keeps file edits in working memory and project conventions in retrieved long-term memory. In a real app, persist checkpoints so agents resume after server restarts using LangGraph or custom state stores.',
    code: `Memory layers:
• Short-term: message buffer / checkpoint state
• Long-term: vector store of past sessions
• Episodic: structured task logs for audit`,
  },
  {
    id: 46,
    category: 'AI Agents',
    question: 'What are agent evals and how do you benchmark agents?',
    answer:
      'Agent evals test end-to-end task success — did the agent book the meeting, fix the bug, resolve the ticket — not just single-turn BLEU scores. Use trajectories: expected tool call sequences, final state checks, and LLM judges with rubrics for partial credit. Include adversarial cases: missing data, tool errors, and prompt injection attempts. For example, eval "cancel subscription" asserts call to billing API with correct user_id and confirmation message. In a real app, run eval suites on every prompt or tool schema change in CI with cost and latency budgets.',
    code: `# Trajectory eval (conceptual)
assert trajectory.includes_tool("get_user", user_id="42")
assert final_answer.contains("cancelled")
assert not trajectory.has_tool("delete_all_users")`,
  },
  {
    id: 47,
    category: 'AI Agents',
    question: 'How do you handle multi-modal or browser-using agents?',
    answer:
      'Browser agents combine vision models, DOM snapshots or accessibility trees, and actions like click, type, scroll — high capability but fragile to UI changes and slow per step. Computer-use APIs sandbox browser sessions, cap domains, and block credential entry on untrusted sites. Multimodal agents process screenshots when DOM access is unavailable but need stronger safety review. For example, "fill out this internal form" uses DOM tools on a known URL whitelist. In a real app, never give production admin credentials to autonomous browser agents without human confirmation per action.',
    code: `Safety for browser agents:
• URL allowlist
• No password fields without human
• Screenshot redaction of PII
• Session timeout + audit log`,
  },
  {
    id: 48,
    category: 'AI Agents',
    question: 'What is the operator model for deploying agents in production?',
    answer:
      'Production agents need observability (traces, tool logs), cost controls (model routing, caching), failure modes (fallback to human, graceful degradation), and SLAs distinct from batch LLM features. Treat agents as async jobs for long tasks with webhooks or polling UIs rather than blocking HTTP requests. Version prompts, tools, and graphs like any deployable artifact with rollback. For example, a support agent queues complex cases to human tier when confidence is low. In a real app, run agents in isolated worker processes with secrets injected at runtime, not in prompts.',
    code: `Production checklist:
□ Tracing (LangSmith / OpenTelemetry)
□ Per-user rate limits + cost caps
□ Human escalation path
□ Prompt/tool versioning + rollback`,
  },
]
