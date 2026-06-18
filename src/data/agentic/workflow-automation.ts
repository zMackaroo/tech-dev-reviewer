import type { InterviewQuestion } from '../../types'

export const workflowAutomationQuestions: InterviewQuestion[] = [
  {
    id: 49,
    category: 'Workflow Automation',
    question: 'What is workflow automation in the context of AI agents?',
    answer:
      'Workflow automation chains deterministic steps — triggers, conditions, API calls, human approvals — with AI decision points where language models classify, extract, or draft content. Unlike fully autonomous agents, workflows define explicit control flow with AI augmenting specific nodes rather than owning the entire path. This hybrid gives reliability for business processes that cannot tolerate random tool loops. For example, new support ticket triggers classification AI, routes to queue, drafts reply for human edit, then sends on approval. In a real app, tools like n8n, Temporal, or LangGraph orchestrate the skeleton while LLMs handle unstructured steps.',
    code: `Trigger: new_ticket
→ AI classify (urgency, topic)
→ Branch: billing | technical
→ AI draft_response
→ Human approve
→ Send + log CRM`,
  },
  {
    id: 50,
    category: 'Workflow Automation',
    question: 'When should you use deterministic workflows versus autonomous agents?',
    answer:
      'Use workflows when steps are known, compliance requires audit trails, and failures must be predictable — invoicing, onboarding, CI pipelines. Use autonomous agents when the path depends on messy inputs and multi-tool exploration — research, debugging, open-ended analysis. Most production systems combine both: workflow envelope with agent nodes inside bounded steps. For example, expense approval is workflow; "investigate why metrics dropped" is agent. In a real app, default to workflows and add agent nodes only where rules cannot be encoded.',
    code: `Decision guide:
Known steps + compliance → workflow (Temporal/n8n)
Unknown path + tools → agent (LangGraph)
Hybrid → workflow calls agent sub-step`,
  },
  {
    id: 51,
    category: 'Workflow Automation',
    question: 'How do you integrate LLM steps into tools like n8n or Zapier?',
    answer:
      'No-code automation tools expose OpenAI nodes for classify, summarize, and extract with JSON output mapped to downstream fields via expressions. Design each AI step with narrow input/output schemas so the next node receives structured data, not raw prose. Add error branches when the model returns invalid JSON or low confidence scores. For example, n8n workflow: webhook → OpenAI extract entities → IF urgency=high → Slack alert. In a real app, move sensitive workflows to self-hosted automation with secrets in vaults, not SaaS if data residency matters.',
    code: `# n8n-style mapping (conceptual)
OpenAI node → output.json.category
Switch node on {{ $json.category }}
→ "refund" branch → create Jira ticket`,
  },
  {
    id: 52,
    category: 'Workflow Automation',
    question: 'What is Temporal and how does it relate to AI workflows?',
    answer:
      'Temporal is a durable execution engine — workflows survive process crashes, retries failed activities with backoff, and maintain state for days or months. AI calls become activities with timeouts; human tasks become signals that resume workflow execution when approved. This suits long-running agentic processes better than cron or fire-and-forget queues. For example, a loan workflow waits days for document upload signal, runs OCR activity, then LLM extraction activity. In a real app, Temporal handles reliability while LangGraph or direct API calls handle reasoning inside activities.',
    code: `# Temporal pattern
@workflow.defn
class OnboardingWorkflow:
  async def run(self, user_id):
    docs = await workflow.execute_activity(wait_for_upload, ...)
    data = await workflow.execute_activity(llm_extract, docs)
    await workflow.wait_condition(lambda: human_approved)`,
  },
  {
    id: 53,
    category: 'Workflow Automation',
    question: 'How do you handle idempotency and retries in AI automation workflows?',
    answer:
      'LLM calls are non-deterministic but side effects — charging cards, sending emails — must be idempotent using idempotency keys and deduplication stores. Retry transient API errors with exponential backoff; do not blindly retry steps that partially succeeded without checking state. Log prompt hash and model version per run for debugging duplicate outputs. For example, email send node checks sent_messages table before calling SMTP on workflow retry. In a real app, separate read-only AI steps (safe to retry) from write steps (require idempotency guards).',
    code: `idempotency_key = hash(workflow_id + step_name)
if store.exists(idempotency_key): return cached_result
result = call_llm(...)
store.save(idempotency_key, result)`,
  },
  {
    id: 54,
    category: 'Workflow Automation',
    question: 'What are event-driven patterns for triggering AI workflows?',
    answer:
      'Events from Kafka, webhooks, S3 uploads, or CRM updates trigger workflow starts — decoupling producers from AI consumers and enabling scale. Use dead-letter queues for failed runs and schema validation on event payloads before LLM processing. Fan-out one event to multiple specialized workflows (classify then route) versus one monolithic flow. For example, PDF upload to S3 emits event → ingestion workflow chunks, embeds, indexes. In a real app, throttle concurrent LLM workflows per tenant to control cost spikes during bulk imports.',
    code: `# Event → workflow
on("ticket.created", async (event) => {
  await temporal.start(TriageWorkflow, { ticketId: event.id });
});`,
  },
  {
    id: 55,
    category: 'Workflow Automation',
    question: 'How do you monitor and alert on automated AI workflows?',
    answer:
      'Track success rate, p95 latency, token cost per run, human escalation rate, and error types — model refusals, tool timeouts, parse failures — per workflow version. Alert on SLO breaches: queue depth, stuck workflows awaiting human signal too long, or sudden classification drift. Dashboards should link to traces showing prompt, retrieval, and tool I/O for failed runs. For example, alert if draft-email workflow failure rate exceeds 5% over fifteen minutes. In a real app, tag runs with workflow_id and release version to correlate bad deploys quickly.',
    code: `Metrics:
workflow_success_rate{name, version}
llm_tokens_total{workflow, model}
human_escalation_rate{workflow}`,
  },
  {
    id: 56,
    category: 'Workflow Automation',
    question: 'How do you version and test workflow changes safely?',
    answer:
      'Version workflows explicitly — v2 runs shadow mode alongside v1 comparing outputs without side effects before cutover. Use staging environments with mocked external APIs and golden event fixtures replayed in CI. Feature flags route percentage of traffic to new workflow definitions. Document breaking changes in activity contracts when downstream systems depend on AI output shape. For example, run new classifier on 10% of tickets logging disagreements with production classifier. In a real app, never deploy workflow and prompt changes simultaneously without isolated rollback for each.',
    code: `Rollout:
1. Shadow v2 (log only)
2. Compare v1 vs v2 metrics 1 week
3. Canary 10% → 50% → 100%
4. Keep v1 rollback 24h`,
  },
]
