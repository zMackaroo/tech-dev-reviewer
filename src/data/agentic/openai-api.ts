import type { InterviewQuestion } from '../../types'

export const openaiApiQuestions: InterviewQuestion[] = [
  {
    id: 17,
    category: 'OpenAI API',
    question: 'What are the main OpenAI API interfaces for chat applications?',
    answer: 'The Chat Completions API accepts a messages array with roles (system, user, assistant, tool) and returns model-generated replies, supporting streaming, JSON mode, and tool calls. The newer Responses API unifies multi-turn reasoning, tools, and file search in one endpoint for agent-style apps. Assistants API (being superseded) offered threaded conversations with built-in retrieval and code interpreter.',
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
    answer: 'Set stream=True to receive server-sent events as tokens are generated, reducing perceived latency for long answers. Client code iterates chunks and reads delta.content from each event until finish_reason appears. Streaming requires careful UI handling — partial markdown, cancel buttons, and error mid-stream recovery.',
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
    answer: 'Embeddings convert text into dense vectors for semantic search, clustering, classification, and recommendation — the foundation of most RAG pipelines. Models like text-embedding-3-small balance cost and quality; you batch inputs to reduce API calls and cost. Embeddings should be normalized and stored with metadata linking back to source documents.',
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
    answer: 'Count tokens before sending — tiktoken for OpenAI models — and trim history, summarize old turns, or retrieve only relevant context to stay within context windows and budget. Rate limits hit by tier (RPM/TPM); implement exponential backoff and queue requests under load. Log prompt and completion tokens per request for chargeback and optimization.',
    code: `import tiktoken
enc = tiktoken.encoding_for_model("gpt-4o")
tokens = len(enc.encode(prompt))
# Set max_tokens, use gpt-4o-mini for classification`,
  },
  {
    id: 21,
    category: 'OpenAI API',
    question: 'What is structured output / JSON mode in the OpenAI API?',
    answer: 'JSON mode (response_format: { type: "json_object" }) constrains the model to valid JSON, useful for extraction and routing when combined with schema descriptions in the prompt. Structured Outputs with response_format json_schema enforce a strict JSON Schema for reliable parsing into your types. This reduces brittle post-processing compared to asking for JSON in free text.',
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
    answer: 'Never expose API keys in frontend bundles — proxy requests through your backend and authenticate users before forwarding to OpenAI. Use environment variables, secret managers, and per-environment keys with spending limits and usage alerts in the OpenAI dashboard. Log requests without storing sensitive user content in plain text unless compliant with your data policy; OpenAI offers zero-retention options for eligible tiers.',
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
    answer: 'GPT-4o is the general multimodal flagship — strong reasoning, vision, and tool use at balanced cost. o-series models (o1, o3) emphasize extended internal reasoning for hard math, code, and planning at higher latency and price. Mini/nano variants (gpt-4o-mini) trade capability for speed and cost, ideal for classification, routing, and high-volume tasks. Model choice should match task complexity — do not use o3 for simple intent detection.',
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
    answer: 'GPT-4o accepts image inputs as base64 or URLs in message content arrays with type image_url, enabling screenshot analysis, diagram understanding, and OCR workflows. Audio models transcribe speech (Whisper) and newer models support speech-to-speech for voice agents. Multimodal prompts cost more tokens — resize images and strip EXIF before sending.',
    code: `messages=[{
  "role": "user",
  "content": [
    {"type": "text", "text": "What error is shown?"},
    {"type": "image_url", "image_url": {"url": f"data:image/png;base64,{b64}"}},
  ],
}]`,
  },
]
