import type { InterviewQuestion } from '../../types'

export const ragQuestions: InterviewQuestion[] = [
  {
    id: 33,
    category: 'Retrieval-Augmented Generation (RAG)',
    question: 'What is RAG and why use it instead of fine-tuning?',
    answer: 'RAG retrieves relevant documents at query time and injects them into the prompt so the model answers from your private, up-to-date knowledge without retraining weights. It is cheaper and faster to update than fine-tuning when content changes frequently — re-index documents instead of retraining. RAG also enables citations and audit trails by linking answers to source chunks.',
    code: `# RAG flow
query → embed → vector search → top-k chunks
→ prompt(context + question) → LLM → answer + citations`,
  },
  {
    id: 34,
    category: 'Retrieval-Augmented Generation (RAG)',
    question: 'What are common RAG failure modes and fixes?',
    answer: 'Failures include retrieving irrelevant chunks (bad embeddings or chunking), missing chunks (query-document vocabulary mismatch), and the model ignoring context (prompt not enforcing grounding). Fixes: hybrid search (BM25 + vectors), query rewriting, rerankers like Cohere Rerank, smaller focused chunks, and system prompts that require citing sources or saying "I don\'t know."',
    code: `# Mitigations
• Hybrid: semantic + keyword (EnsembleRetriever)
• Rerank top-20 → send top-5 to LLM
• "Answer ONLY from context; cite [source]"`,
  },
  {
    id: 35,
    category: 'Retrieval-Augmented Generation (RAG)',
    question: 'How do you chunk documents effectively for RAG?',
    answer: 'Chunk size should match embedding model limits and retrieval granularity — often 256–512 tokens for facts, larger for narrative docs — with overlap (10–20%) so sentences spanning boundaries appear whole in at least one chunk. Structure-aware splitting respects headings, markdown, or HTML sections instead of blind character counts. Metadata (title, section, page, URL) improves filtering and citations.',
    code: `RecursiveCharacterTextSplitter(
  chunk_size=400,
  chunk_overlap=80,
  separators=["\\n## ", "\\n\\n", "\\n", " "],
)`,
  },
  {
    id: 36,
    category: 'Retrieval-Augmented Generation (RAG)',
    question: 'What is hybrid search in RAG pipelines?',
    answer: 'Hybrid search combines dense vector similarity with sparse keyword retrieval (BM25) so you catch both semantic paraphrases and exact token matches like SKUs, error codes, and API names. Results are merged with reciprocal rank fusion or weighted scores before optional reranking. Pure vector search alone often misses rare proper nouns; pure keyword misses conceptual questions.',
    code: `# Conceptual hybrid
vector_results = vectorstore.similarity_search(q, k=10)
bm25_results = bm25_index.search(q, k=10)
merged = reciprocal_rank_fusion([vector_results, bm25_results])`,
  },
  {
    id: 37,
    category: 'Retrieval-Augmented Generation (RAG)',
    question: 'What are embedding models and how do you choose one?',
    answer: 'Embedding models map text to vectors where semantic similarity equals geometric closeness; choice affects recall and cost. OpenAI text-embedding-3-small/large, open models like nomic-embed, and domain-specific models each trade accuracy, dimension size, and latency. Use the same model at index and query time, and re-index when switching models.',
    code: `# Evaluation metric
recall@5 = % of queries where gold chunk in top 5 results
Compare: openai-small vs nomic-embed on your corpus`,
  },
  {
    id: 38,
    category: 'Retrieval-Augmented Generation (RAG)',
    question: 'What is query transformation in advanced RAG?',
    answer: 'Query transformation rewrites user input before retrieval — HyDE generates hypothetical answers to embed, multi-query expands paraphrases, step-back asks broader questions — improving recall when user phrasing mismatches document wording. A small LLM call upfront can cheaply boost retrieval quality versus sending raw chat typos to the vector store.',
    code: `# Multi-query expansion
sub_queries = llm.invoke(f"Generate 3 search queries for: {user_q}")
all_docs = []
for q in sub_queries:
  all_docs.extend(retriever.invoke(q))
dedupe_and_rerank(all_docs)`,
  },
  {
    id: 39,
    category: 'Retrieval-Augmented Generation (RAG)',
    question: 'How do you evaluate RAG system quality?',
    answer: 'Measure retrieval (recall@k, MRR, nDCG) and generation (faithfulness, answer relevance, citation accuracy) on labeled datasets — Ragas, DeepEval, or custom LLM-as-judge with human spot checks. Track production metrics: thumbs down rate, escalation to human, and "no answer" rate. Regression test when you change chunking, embeddings, or prompts.',
    code: `# Ragas-style metrics (conceptual)
faithfulness: answer supported by retrieved context?
answer_relevance: addresses the user question?
context_precision: retrieved chunks useful?`,
  },
  {
    id: 40,
    category: 'Retrieval-Augmented Generation (RAG)',
    question: 'What is agentic RAG versus naive RAG?',
    answer: 'Naive RAG is one retrieval pass then one generation — simple but brittle for multi-hop questions needing several lookups. Agentic RAG lets an agent decide when to search again, which index to query, or whether to decompose the question into sub-queries across steps. It costs more latency and tokens but handles complex research tasks.',
    code: `# Naive: retrieve once → answer
# Agentic: loop until confident
while not done and steps < max:
  action = agent.plan(state)
  if action == "search": state += retriever(q)
  elif action == "answer": return generate(state)`,
  },
]
