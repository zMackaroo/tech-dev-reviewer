import type { InterviewQuestion } from '../../types'

export const langchainQuestions: InterviewQuestion[] = [
  {
    id: 1,
    category: 'LangChain',
    question: 'What is LangChain and what problem does it solve?',
    answer: 'LangChain is a framework for building applications powered by large language models, providing abstractions for prompts, chains, memory, retrievers, and tool integration so you do not wire every LLM call from scratch. It standardizes patterns like combining a prompt template with a model and output parser, which reduces boilerplate and makes apps easier to test and swap providers. It matters because production LLM apps quickly grow beyond a single API call into multi-step pipelines with retrieval, tools, and state.',
    code: `from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

prompt = ChatPromptTemplate.from_messages([
  ("system", "You are a helpful assistant."),
  ("human", "{question}"),
])
chain = prompt | ChatOpenAI(model="gpt-4o") | StrOutputParser()
chain.invoke({"question": "Explain RAG briefly"})`,
  },
  {
    id: 2,
    category: 'LangChain',
    question: 'What is the LCEL (LangChain Expression Language) pipe syntax?',
    answer: 'LCEL uses the pipe operator to compose Runnable components — prompts, models, parsers, retrievers — into a single chain with consistent invoke, batch, and stream interfaces. Each step passes its output to the next, and LangChain handles async, streaming, and parallel execution where supported. This replaces older Chain classes with a more composable, type-friendly pattern.',
    code: `# LCEL composition
chain = (
  {"context": retriever | format_docs, "question": RunnablePassthrough()}
  | prompt
  | model
  | StrOutputParser()
)
chain.stream({"question": "What is our refund policy?"})`,
  },
  {
    id: 3,
    category: 'LangChain',
    question: 'How does LangChain memory work in conversational apps?',
    answer: 'LangChain memory components store and inject conversation history into prompts so the model maintains context across turns without you manually concatenating messages. Options include ConversationBufferMemory for full history, windowed memory for recent turns only, and summary memory for long chats that exceed token limits. Memory must be keyed per user or session in production to avoid leaking conversations between users.',
    code: `from langchain.memory import ConversationBufferWindowMemory

memory = ConversationBufferWindowMemory(k=5, return_messages=True)
# Inject into chain via MessagesPlaceholder in prompt
# history = memory.load_memory_variables({})`,
  },
  {
    id: 4,
    category: 'LangChain',
    question: 'What are LangChain document loaders and text splitters?',
    answer: 'Document loaders ingest data from sources — PDFs, web pages, Notion, S3 — and normalize them into Document objects with page_content and metadata. Text splitters break large documents into chunks sized for embedding models and retrieval, using strategies like recursive character splitting with overlap to preserve context across chunk boundaries. Poor chunking is a leading cause of bad RAG answers because relevant text gets cut mid-sentence or buried in oversized chunks.',
    code: `from langchain_community.document_loaders import WebBaseLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

docs = WebBaseLoader("https://docs.example.com").load()
splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
chunks = splitter.split_documents(docs)`,
  },
  {
    id: 5,
    category: 'LangChain',
    question: 'How do LangChain retrievers integrate with vector stores?',
    answer: 'Embeddings convert text chunks into vectors, which are stored in a vector database such as Pinecone, Chroma, or pgvector; a retriever wraps the store and returns the top-k similar documents for a query embedding. LangChain provides VectorStoreRetriever and higher-level patterns like EnsembleRetriever combining keyword and semantic search. Retriever quality directly bounds RAG answer quality — garbage chunks in means hallucination or "I don\'t know" out.',
    code: `from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import Chroma

vectorstore = Chroma.from_documents(chunks, OpenAIEmbeddings())
retriever = vectorstore.as_retriever(search_kwargs={"k": 4})
docs = retriever.invoke("How do I reset my password?")`,
  },
  {
    id: 6,
    category: 'LangChain',
    question: 'What is a LangChain agent and how does it differ from a chain?',
    answer: 'A chain follows a fixed sequence of steps defined at build time, while an agent uses an LLM to decide which tools to call and in what order based on the user goal — dynamic control flow. Agents loop: model proposes tool calls → tools execute → results feed back until the model returns a final answer. They excel at multi-step tasks with unpredictable paths but cost more tokens and need guardrails against infinite loops.',
    code: `from langchain.agents import create_tool_calling_agent, AgentExecutor

agent = create_tool_calling_agent(llm, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools, max_iterations=5)
executor.invoke({"input": "Summarize ticket #4421 and draft a reply"})`,
  },
  {
    id: 7,
    category: 'LangChain',
    question: 'How do you evaluate and debug LangChain applications?',
    answer: 'LangSmith (or open alternatives) traces each chain step — inputs, outputs, latency, token usage — so you can inspect where retrieval or parsing failed. Unit test individual Runnables in isolation: mock the LLM, assert retriever returns expected docs, validate output parser handles malformed JSON. Golden datasets with expected answers help regression-test prompt and retrieval changes.',
    code: `# Enable tracing
import os
os.environ["LANGCHAIN_TRACING_V2"] = "true"
os.environ["LANGCHAIN_PROJECT"] = "support-bot-prod"

# Callbacks on invoke
chain.invoke(input, config={"callbacks": [handler]})`,
  },
  {
    id: 8,
    category: 'LangChain',
    question: 'What are LangChain output parsers and when do you need them?',
    answer: 'Output parsers convert raw LLM text into structured data — JSON, Pydantic models, lists — and can include format instructions in the prompt to improve compliance. They matter when downstream code needs reliable structure, not prose, such as extracting entities or routing decisions. Structured output reduces fragile regex parsing and enables type-safe pipelines.',
    code: `from langchain_core.output_parsers import PydanticOutputParser
from pydantic import BaseModel

class Sentiment(BaseModel):
  label: str
  confidence: float

parser = PydanticOutputParser(pydantic_object=Sentiment)
chain = prompt | model | parser`,
  },
]
