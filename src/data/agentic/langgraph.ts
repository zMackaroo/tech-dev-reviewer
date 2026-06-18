import type { InterviewQuestion } from '../../types'

export const langgraphQuestions: InterviewQuestion[] = [
  {
    id: 9,
    category: 'LangGraph',
    question: 'What is LangGraph and how does it differ from LangChain chains?',
    answer:
      'LangGraph models agent workflows as a stateful graph where nodes are functions and edges define transitions, supporting cycles, branching, and human-in-the-loop pauses that linear chains cannot express cleanly. State is a typed object passed and updated across nodes, with reducers merging partial updates from parallel branches. It is built for durable, controllable multi-step agents rather than one-shot prompt chains. For example, a research agent might loop between search, critique, and refine until quality thresholds pass. In a real app, LangGraph integrates with LangChain components inside each node while owning orchestration and persistence.',
    code: `from langgraph.graph import StateGraph, START, END
from typing import TypedDict

class AgentState(TypedDict):
  messages: list
  step_count: int

graph = StateGraph(AgentState)
graph.add_node("agent", call_model)
graph.add_edge(START, "agent")
graph.add_edge("agent", END)
app = graph.compile()`,
  },
  {
    id: 10,
    category: 'LangGraph',
    question: 'What is graph state in LangGraph and how is it updated?',
    answer:
      'Graph state is a schema — often TypedDict or Pydantic — holding all data the workflow needs: messages, tool results, flags, metadata. Each node receives the current state and returns a partial update; LangGraph merges updates using reducers, such as append for message lists instead of overwrite. Correct state design prevents bugs where parallel nodes clobber each other\'s fields. For example, messages might use add_messages reducer to accumulate chat history across turns. In a real app, you keep state serializable if using checkpointing for crash recovery or human approval gates.',
    code: `from langgraph.graph.message import add_messages
from typing import Annotated

class State(TypedDict):
  messages: Annotated[list, add_messages]
  approved: bool

def human_review(state: State):
  return {"approved": True}  # partial update merged into state`,
  },
  {
    id: 11,
    category: 'LangGraph',
    question: 'How do conditional edges work in LangGraph?',
    answer:
      'Conditional edges route execution based on state or model output — for example, if the agent called a tool, go to the tools node; otherwise, end. You define a routing function that returns the next node name, enabling dynamic workflows without hardcoding every path upfront. This is the core mechanism for ReAct-style agents that alternate between reasoning and tool use. For example, should_continue(state) checks the last message for tool_calls and returns "tools" or END. In a real app, you also route on error flags to a fallback or escalation node.',
    code: `def route(state: State) -> str:
  last = state["messages"][-1]
  if last.tool_calls:
    return "tools"
  return END

graph.add_conditional_edges("agent", route, {"tools": "tools", END: END})`,
  },
  {
    id: 12,
    category: 'LangGraph',
    question: 'What is checkpointing in LangGraph?',
    answer:
      'Checkpointing persists graph state after each step so workflows can resume after crashes, survive restarts, or pause for human approval without losing progress. Checkpointers like MemorySaver (dev) or PostgresSaver (prod) store state snapshots keyed by thread_id. This enables long-running agents and audit trails of every intermediate state. For example, a loan approval graph pauses at human_review until a manager clicks approve, then resumes from the saved checkpoint. In a real app, thread_id maps to user session or ticket ID for multi-tenant isolation.',
    code: `from langgraph.checkpoint.memory import MemorySaver

checkpointer = MemorySaver()
app = graph.compile(checkpointer=checkpointer)

config = {"configurable": {"thread_id": "user-123"}}
app.invoke(input, config=config)  # state persisted per thread`,
  },
  {
    id: 13,
    category: 'LangGraph',
    question: 'How do you implement human-in-the-loop with LangGraph?',
    answer:
      'Human-in-the-loop inserts an interrupt before sensitive actions — sending email, charging payment, deleting data — so the graph pauses and waits for external approval via API or UI. LangGraph supports interrupt_before or interrupt_after on specific nodes, and you resume with Command or updated state when the human decides. This balances agent autonomy with compliance and user trust. For example, draft_email node runs automatically but send_email node requires approval. In a real app, your dashboard reads checkpoint state, shows the pending action, and calls app.invoke with a resume command.',
    code: `app = graph.compile(
  checkpointer=checkpointer,
  interrupt_before=["send_email"],
)
# First run pauses before send_email
# Resume after human approval:
app.invoke(None, config=config, command=Command(resume=True))`,
  },
  {
    id: 14,
    category: 'LangGraph',
    question: 'What is the ReAct agent pattern in LangGraph?',
    answer:
      'ReAct (Reason + Act) alternates between the LLM reasoning about the task and executing tools based on that reasoning, looping until the model produces a final answer without tool calls. In LangGraph, this is typically agent node → tools node → agent node with conditional routing. The pattern powers most tool-using assistants and keeps the model grounded in tool output rather than guessing. For example, "What is our Q3 revenue?" triggers a SQL tool call, then the agent summarizes results. In a real app, cap iterations and log each tool invocation for security review.',
    code: `# Classic loop: agent ↔ tools
graph.add_node("agent", call_model)
graph.add_node("tools", tool_node)
graph.add_edge("tools", "agent")
graph.add_conditional_edges("agent", tools_condition)`,
  },
  {
    id: 15,
    category: 'LangGraph',
    question: 'How do subgraphs and multi-agent systems work in LangGraph?',
    answer:
      'Subgraphs are compiled graphs used as nodes inside a parent graph, letting you encapsulate specialized agents — researcher, writer, critic — with their own state and tools. A supervisor node routes tasks to the appropriate subgraph based on intent or explicit orchestration logic. Multi-agent designs improve modularity but add latency and coordination complexity. For example, a content pipeline subgraph handles outline → draft → edit while a parent graph schedules SEO review. In a real app, each subgraph has narrow tools and prompts to reduce prompt injection surface and cost.',
    code: `researcher = research_graph.compile()
writer = writer_graph.compile()

def supervisor(state):
  task = classify(state["messages"])
  if task == "research":
    return researcher.invoke(state)
  return writer.invoke(state)`,
  },
  {
    id: 16,
    category: 'LangGraph',
    question: 'How do you stream and observe LangGraph execution?',
    answer:
      'LangGraph supports streaming modes — values, updates, messages — so UIs show partial state, node completions, or token streams as the graph runs. stream_mode="updates" emits after each node, ideal for progress indicators in long workflows. Pair streaming with LangSmith tracing to debug which node added bad context or looped too long. For example, a coding agent UI streams tool call names as each node finishes. In a real app, you forward SSE events from your API to the frontend while storing the final checkpoint for replay.',
    code: `for event in app.stream(
  {"messages": [("user", "Analyze logs")]},
  config=config,
  stream_mode="updates",
):
  print(event)  # {node_name: partial_state_update}`,
  },
]
