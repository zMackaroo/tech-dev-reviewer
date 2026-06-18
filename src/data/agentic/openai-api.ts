import type { InterviewQuestion } from '../../types'

export const openaiApiQuestions: InterviewQuestion[] = [
  {
    id: 17,
    category: 'OpenAI API',
    question: 'What are the main OpenAI API interfaces for chat applications?',
    answer:
      'The Chat Completions API accepts a messages array with roles (system, user, assistant, tool) and returns model-generated replies, supporting streaming, JSON mode, and tool calls. The newer Responses API unifies multi-turn reasoning, tools, and file search in one endpoint for agent-style apps. Assistants API (being superseded) offered threaded conversations with built-in retrieval and code interpreter. For example, a support bot uses chat.completions.create with gpt-4o and streams tokens to the UI. In a real app, you choose Chat Completions for control and composability or Responses when you want OpenAI-managed tool orchestration.',
    code: `from openai import OpenAI
client = OpenAI()

response = client.chat.completions.create(
  model="gpt-4o",
  messages=[
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Summarize this ticket."},
  ],
  stream=True,
)`,
  },
  {
    id: 18,
    category: 'OpenAI API',
    question: 'How does streaming work with the OpenAI API?',
    answer:
      'Set stream=True to receive server-sent events as tokens are generated, reducing perceived latency for long answers. Client code iterates chunks and reads delta.content from each event until finish_reason appears. Streaming requires careful UI handling — partial markdown, cancel buttons, and error mid-stream recovery. For example, you append each delta to a React state string as SSE arrives. In a real app, you also stream tool call arguments incrementally when using parallel tool use, updating the UI to show "Searching docs…" before results return.',
    code: `stream = client.chat.completions.create(
  model="gpt-4o", messages=messages, stream=True
)
for chunk in stream:
  delta = chunk.choices[0].delta.content
  if delta:
    yield delta`,
  },
  {
    id: 19,
    category: 'OpenAI API',
    question: 'What is the OpenAI embeddings API used for?',
    answer:
      'Embeddings convert text into dense vectors for semantic search, clustering, classification, and recommendation — the foundation of most RAG pipelines. Models like text-embedding-3-small balance cost and quality; you batch inputs to reduce API calls and cost. Embeddings should be normalized and stored with metadata linking back to source documents. For example, you embed product descriptions once at index time and query embeddings at search time. In a real app, you cache embeddings for unchanged documents and re-embed only when content or model version changes.',
    code: `response = client.embeddings.create(
  model="text-embedding-3-small",
  input=["Reset password guide", "How do I change my email?"],
)
vectors = [d.embedding for d in response.data]`,
  },
  {
    id: 20,
    category: 'OpenAI API',
    question: 'How do you manage tokens, cost, and rate limits?',
    answer:
      'Count tokens before sending — tiktoken for OpenAI models — and trim history, summarize old turns, or retrieve only relevant context to stay within context windows and budget. Rate limits hit by tier (RPM/TPM); implement exponential backoff and queue requests under load. Log prompt and completion tokens per request for chargeback and optimization. For example, truncate tool outputs over 2k tokens before re-injecting into the model. In a real app, set max_tokens on completions and use cheaper models for routing or classification tasks.',
    code: `import tiktoken
enc = tiktoken.encoding_for_model("gpt-4o")
tokens = len(enc.encode(prompt))
# Set max_tokens, use gpt-4o-mini for classification`,
  },
  {
    id: 21,
    category: 'OpenAI API',
    question: 'What is structured output / JSON mode in the OpenAI API?',
    answer:
      'JSON mode (response_format: { type: "json_object" }) constrains the model to valid JSON, useful for extraction and routing when combined with schema descriptions in the prompt. Structured Outputs with response_format json_schema enforce a strict JSON Schema for reliable parsing into your types. This reduces brittle post-processing compared to asking for JSON in free text. For example, extract {sentiment, topics, urgency} from support tickets into a typed object. In a real app, validate parsed JSON and retry with a repair prompt on failure before falling back to human review.',
    code: `response = client.chat.completions.create(
  model="gpt-4o",
  messages=messages,
  response_format={
    "type": "json_schema",
    "json_schema": {"name": "Ticket", "schema": ticket_schema},
  },
)`,
  },
  {
    id: 22,
    category: 'OpenAI API',
    question: 'How do you handle API keys and security for OpenAI in production?',
    answer:
      'Never expose API keys in frontend bundles — proxy requests through your backend and authenticate users before forwarding to OpenAI. Use environment variables, secret managers, and per-environment keys with spending limits and usage alerts in the OpenAI dashboard. Log requests without storing sensitive user content in plain text unless compliant with your data policy; OpenAI offers zero-retention options for eligible tiers. For example, a Next.js Route Handler reads OPENAI_API_KEY server-side only. In a real app, you add abuse detection, per-user quotas, and prompt injection filters before the API call.',
    code: `// Server only — never NEXT_PUBLIC_
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const user = await auth(req);
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });
  // ... forward to OpenAI
}`,
  },
  {
    id: 23,
    category: 'OpenAI API',
    question: 'What is the difference between GPT-4o, o-series, and mini models?',
    answer:
      'GPT-4o is the general multimodal flagship — strong reasoning, vision, and tool use at balanced cost. o-series models (o1, o3) emphasize extended internal reasoning for hard math, code, and planning at higher latency and price. Mini/nano variants (gpt-4o-mini) trade capability for speed and cost, ideal for classification, routing, and high-volume tasks. Model choice should match task complexity — do not use o3 for simple intent detection. For example, route "billing vs technical" with mini and pass hard debugging to 4o. In a real app, maintain a model router based on task type and user tier.',
    code: `# Routing pattern
task = classify_intent(user_msg)  # gpt-4o-mini
if task.complexity == "high":
  model = "gpt-4o"
else:
  model = "gpt-4o-mini"`,
  },
  {
    id: 24,
    category: 'OpenAI API',
    question: 'How do vision and audio capabilities work in the OpenAI API?',
    answer:
      'GPT-4o accepts image inputs as base64 or URLs in message content arrays with type image_url, enabling screenshot analysis, diagram understanding, and OCR workflows. Audio models transcribe speech (Whisper) and newer models support speech-to-speech for voice agents. Multimodal prompts cost more tokens — resize images and strip EXIF before sending. For example, a field-service app sends a photo of an error panel and asks the model to extract error codes. In a real app, validate file types server-side and scan uploads for PII before forwarding to OpenAI.',
    code: `messages=[{
  "role": "user",
  "content": [
    {"type": "text", "text": "What error is shown?"},
    {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{b64}"}},
  ],
}]`,
  },
]
