import type { InterviewQuestion } from '../../types'

export const lmStudioQuestions: InterviewQuestion[] = [
  {
    id: 73,
    category: 'LM Studio',
    question: 'What is LM Studio and who is it for?',
    answer: 'LM Studio is a desktop application for discovering, downloading, and running local large language models on your machine with a chat UI and local OpenAI-compatible API server. It targets developers and power users who want offline inference, privacy, or cost-free experimentation without cloud API keys. Models run via llama.cpp backends with GPU acceleration when available.',
    code: `# Typical workflow
1. Download GGUF model in LM Studio
2. Load model → Start Server (localhost:1234)
3. Point app to OpenAI-compatible base URL`,
  },
  {
    id: 74,
    category: 'LM Studio',
    question: 'How do you connect an app to LM Studio\'s local API?',
    answer: 'LM Studio exposes an OpenAI-compatible REST API — usually http://localhost:1234/v1 — so you point the OpenAI client at that base URL with a dummy API key. Use the loaded model name shown in the server tab; chat completions and embeddings endpoints mirror OpenAI shapes for easy SDK reuse. This lets LangChain, Cursor, or custom scripts swap cloud for local with one config change.',
    code: `from openai import OpenAI

client = OpenAI(
  base_url="http://localhost:1234/v1",
  api_key="not-needed",
)
client.chat.completions.create(
  model="local-model",
  messages=[{"role": "user", "content": "Hello"}],
)`,
  },
  {
    id: 75,
    category: 'LM Studio',
    question: 'What model formats does LM Studio support?',
    answer: 'LM Studio primarily runs GGUF-quantized models from Hugging Face — Q4_K_M, Q5, Q8, etc. — trading size and speed against quality. Quantization reduces VRAM/RAM needs so 7B–13B models run on consumer GPUs or CPU-only at slower speeds. Pick quantization based on hardware: Q4 for tight memory, Q8 when quality matters and VRAM allows.',
    code: `# Quantization tradeoff (conceptual)
Q4 — smallest, fastest, some quality loss
Q8 — larger, closer to full precision
Full FP16 — best quality, highest VRAM`,
  },
  {
    id: 76,
    category: 'LM Studio',
    question: 'What are hardware considerations for running models in LM Studio?',
    answer: 'VRAM determines max model size and context length — 8GB fits many 7B quants, 24GB+ enables larger models or longer contexts. CPU-only mode works but is dramatically slower for interactive apps. Monitor temperature and throttle batch size; close other GPU apps to avoid OOM crashes mid-inference. Context window settings increase memory linearly — do not set 128k context on hardware that cannot support it.',
    code: `Rough guide:
7B Q4  → ~4–6 GB VRAM
13B Q4 → ~8–10 GB VRAM
Context ↑ → RAM/VRAM ↑ linearly`,
  },
  {
    id: 77,
    category: 'LM Studio',
    question: 'How does LM Studio compare to Ollama and cloud APIs?',
    answer: 'LM Studio offers a polished GUI, model browser, and chat testing with one-click server start — great for exploration. Ollama is CLI-first, popular in dev scripts and Docker, with simple `ollama run` ergonomics. Cloud APIs provide best quality, scaling, and no hardware ops at per-token cost. Choose LM Studio for interactive local dev; Ollama for automation; cloud for production scale.',
    code: `LM Studio → GUI + local OpenAI API
Ollama     → CLI + docker-friendly
OpenAI     → production scale + latest models`,
  },
  {
    id: 78,
    category: 'LM Studio',
    question: 'Can you run embeddings and RAG locally with LM Studio?',
    answer: 'LM Studio supports embedding models through the same local server when you load an embedding-capified GGUF model, enabling fully offline RAG pipelines with local vector stores like Chroma. Quality and speed depend on the embedding model chosen — smaller models are faster but may hurt retrieval recall versus OpenAI embeddings. Same chunking and eval practices apply as cloud RAG.',
    code: `# Local RAG stack
LM Studio (embed model) → vectors → Chroma
LM Studio (chat model) + retrieved chunks → answer`,
  },
  {
    id: 79,
    category: 'LM Studio',
    question: 'What are limitations of local models via LM Studio for production?',
    answer: 'Local models lag frontier cloud models on reasoning, tool use reliability, and long-context performance; single-machine deployment does not scale horizontally or offer SLAs. No built-in auth, billing, or team key management — you build the production wrapper. Updates, monitoring, and failover are your responsibility unlike managed APIs.',
    code: `Local limits:
• Single-user / single-machine scale
• Model quality vs GPT-4 class
• You own uptime, security, updates`,
  },
  {
    id: 80,
    category: 'LM Studio',
    question: 'How do you debug poor local model outputs in LM Studio?',
    answer: 'Adjust temperature and max tokens, try a higher quantization or different base model, and simplify prompts — local models often need shorter, more explicit instructions than GPT-4. Use the chat UI to iterate prompts before API integration; compare same prompt across models in Model Switcher. Check server logs for context truncation or OOM errors masquerading as gibberish.',
    code: `Debug checklist:
□ Lower temperature (0–0.3) for factual tasks
□ Shorter system prompt
□ Try Q8 or different model family
□ Check context length not truncated`,
  },
]
