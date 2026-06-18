import type { InterviewQuestion } from '../../types'

export const mcpQuestions: InterviewQuestion[] = [
  {
    id: 25,
    category: 'Model Context Protocol (MCP)',
    question: 'What is the Model Context Protocol (MCP)?',
    answer: 'MCP is an open standard for connecting AI applications to external data sources and tools through a unified client-server protocol, so models access databases, APIs, and filesystems via MCP servers instead of bespoke integrations per app. It defines how hosts (IDEs, agents) discover tools, resources, and prompts exposed by servers using JSON-RPC messages. MCP reduces N×M integration work when every agent needs the same Slack, GitHub, or Postgres connector.',
    code: `# MCP roles
Host (client)  →  MCP Client  →  MCP Server  →  Tool/Data
# Example: IDE agent calls github-mcp-server.list_prs`,
  },
  {
    id: 26,
    category: 'Model Context Protocol (MCP)',
    question: 'What are MCP tools, resources, and prompts?',
    answer: 'Tools are callable functions the model invokes with arguments — searchIssues, runQuery, sendMessage — analogous to function calling but standardized across servers. Resources are readable data URIs the client can fetch for context — file contents, schema docs, config — without executing code. Prompts are reusable template workflows exposed by servers for common tasks like "summarize repo." Separating these primitives lets hosts expose the right capability type with correct permissions.',
    code: `# Tool call flow (conceptual)
1. Model requests tool: search_docs(query="refund policy")
2. Host forwards to MCP server
3. Server executes, returns structured result
4. Model continues with tool output in context`,
  },
  {
    id: 27,
    category: 'Model Context Protocol (MCP)',
    question: 'How does MCP compare to LangChain tools or OpenAI function calling?',
    answer: 'Function calling is model-vendor specific — OpenAI tool_calls in a chat completion — while MCP is a transport and discovery layer between hosts and capability providers. LangChain tools are in-process Python/JS functions; MCP tools often run in separate processes or remote servers with their own auth and sandboxing. MCP shines when the same GitHub or Slack connector serves Cursor, Claude Desktop, and your custom agent without reimplementation.',
    code: `# Layers
OpenAI function calling → model decides WHAT to call
MCP → standard HOW hosts connect to servers
LangChain Tool → framework wrapper around callable`,
  },
  {
    id: 28,
    category: 'Model Context Protocol (MCP)',
    question: 'How do you build and deploy an MCP server?',
    answer: 'Use the official MCP SDK (TypeScript or Python) to implement server handlers for list_tools, call_tool, list_resources, and read_resource, then expose transport via stdio (local) or SSE/HTTP (remote). Stdio suits IDE subprocess spawning; HTTP suits shared team servers behind auth. Document input schemas so hosts render tool definitions correctly for the model.',
    code: `# Python MCP server sketch (stdio)
from mcp.server import Server
server = Server("my-tools")

@server.list_tools()
async def list_tools():
  return [{"name": "get_weather", "inputSchema": {...}}]`,
  },
  {
    id: 29,
    category: 'Model Context Protocol (MCP)',
    question: 'What security considerations apply to MCP integrations?',
    answer: 'MCP servers often run with access to production systems — treat them as privileged services with authentication, least-privilege scopes, and input validation on every tool call. Prompt injection can trick models into calling destructive tools; require human approval for write/delete operations and allowlist tools per workflow. Log all tool invocations with actor, arguments, and results for audit.',
    code: `Security checklist:
□ Auth on remote MCP (OAuth / API keys)
□ Tool allowlists per agent role
□ Human approval for destructive tools
□ Sandboxed stdio servers in CI/dev only`,
  },
  {
    id: 30,
    category: 'Model Context Protocol (MCP)',
    question: 'How do MCP clients discover and connect to servers?',
    answer: 'Hosts read configuration — mcp.json in Cursor, claude_desktop_config.json in Claude Desktop — listing server commands, args, env vars, and transport type. On startup, the client spawns or connects to each server, negotiates capabilities, and caches tool/resource lists for the model. Dynamic discovery means adding a server does not require recompiling the host app.',
    code: `// Cursor ~/.cursor/mcp.json (example shape)
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "..." }
    }
  }
}`,
  },
  {
    id: 31,
    category: 'Model Context Protocol (MCP)',
    question: 'When should you use MCP versus a direct REST API integration?',
    answer: 'Use MCP when multiple AI hosts need the same tool surface, you want discoverable standardized capabilities, or you are building IDE-grade agent extensibility. Use direct REST when you have a single backend app with simple needs, strict custom auth flows, or no agent host ecosystem — less protocol overhead. MCP adds a layer that pays off at scale and reuse, not for one-off scripts.',
    code: `Choose MCP when:
• Multiple hosts (IDE, chat, automation)
• Plugin ecosystem for power users
• Standard tool discovery needed

Choose REST when:
• Single web app, known client
• Heavy custom auth/session model`,
  },
  {
    id: 32,
    category: 'Model Context Protocol (MCP)',
    question: 'How does MCP support streaming and long-running tool operations?',
    answer: 'MCP messages can carry progress notifications and partial results for operations that take seconds or minutes — large queries, file uploads, batch jobs — so the host UI stays responsive. Clients should implement timeouts, cancellation, and user-visible status while waiting on server work. Long-running tools pair well with human-in-the-loop approval before starting expensive jobs.',
    code: `# Progress notification (conceptual)
server.notify_progress(token, progress=0.45, message="Indexing 450/1000 files")
# Host shows progress bar; user can cancel via client`,
  },
]
