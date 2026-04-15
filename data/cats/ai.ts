import type { GuideCategory } from "@/types/guide";

export const ai: GuideCategory = {
  id: "ai",
  label: "AI / LLM",
  skills: [
    {
      name: "LLM API Integration",
      status: "need",
      priority: 1,
      hot: true,
      why: "AI integration is the #1 differentiator in the 2026 job market. A single shipped AI feature puts you ahead of 80% of candidates.",
      levels: [
        {
          label: "beginner",
          topics: [
            "<strong>How LLMs work conceptually:</strong> next-token prediction, context window, temperature, top_p",
            "<strong>OpenAI API basics:</strong> /v1/chat/completions endpoint, model names, messages array (system/user/assistant roles)",
            "<strong>Anthropic Claude API:</strong> same concepts, messages format, system prompt as separate field",
            "<strong>API keys:</strong> environment variables, never expose in frontend code, use server-side proxy",
            "<strong>Basic request:</strong> model, max_tokens, messages — handle response and display",
            "<strong>Error handling:</strong> rate limit errors (429), context length errors, timeout handling",
          ],
        },
        {
          label: "intermediate",
          topics: [
            "<strong>Streaming responses:</strong> stream: true — display tokens as they arrive in Next.js with ReadableStream",
            "<strong>Vercel AI SDK:</strong> useChat hook, streamText, generateText — cleanest way to add AI to Next.js",
            "<strong>System prompts:</strong> define AI persona, constrain outputs, inject context",
            "<strong>Structured outputs:</strong> JSON mode, response_format: {type: 'json_object'}, Zod parsing",
            "<strong>Function calling / Tool use:</strong> define tools the LLM can call, parse tool_use responses",
            "<strong>Token counting and cost:</strong> understand pricing, estimate costs before production",
            "<strong>Model selection:</strong> GPT-4o vs GPT-4o-mini vs Claude Sonnet vs Haiku — cost/quality trade-off",
            "<strong>Context window management:</strong> truncate history, sliding window, summary compression",
          ],
        },
        {
          label: "advanced",
          topics: [
            "<strong>RAG (Retrieval-Augmented Generation):</strong> embed documents, store in vector DB, retrieve relevant chunks, inject into prompt",
            "<strong>Agentic systems:</strong> LLM that calls tools in a loop to complete a task",
            "<strong>LangChain/LangGraph:</strong> orchestration framework for multi-step LLM workflows",
            "<strong>Evaluations:</strong> automated testing of LLM outputs, reference-based vs model-based evals",
            "<strong>Fine-tuning concepts:</strong> when it's needed (rare), how it differs from RAG",
            "<strong>MCP (Model Context Protocol):</strong> emerging standard for LLM tool integration",
          ],
        },
      ],
      resources: [
        {
          name: "Vercel AI SDK Docs",
          url: "https://sdk.vercel.ai/docs",
          type: "Docs",
          desc: "Best way to integrate AI into Next.js. Free docs, clean abstractions.",
          covers: "Covers: useChat, streamText, tool calling, providers (OpenAI, Anthropic, etc.)",
        },
        {
          name: "DeepLearning.AI Free Short Courses",
          url: "https://www.deeplearning.ai/short-courses/",
          type: "Course",
          desc: "Free short courses with Andrew Ng. Each is 1-2 hours.",
          covers: "Covers: ChatGPT API (free), LangChain (free), RAG (free), Evals (free), Agents (free)",
        },
        {
          name: "OpenAI API Docs",
          url: "https://platform.openai.com/docs",
          type: "Docs",
          desc: "Complete API reference. Free to read, small credit to experiment.",
          covers: "Covers: completions, streaming, function calling, embeddings, fine-tuning",
        },
        {
          name: "Anthropic API Docs",
          url: "https://docs.anthropic.com",
          type: "Docs",
          desc: "Claude API documentation — well written, excellent tool use docs.",
          covers: "Covers: messages API, streaming, tool use, vision, prompt engineering",
        },
        {
          name: "OpenAI Cookbook (GitHub, free)",
          url: "https://github.com/openai/openai-cookbook",
          type: "Reference",
          desc: "Free collection of code examples for every OpenAI API use case.",
          covers: "Covers: RAG, function calling, embeddings, streaming — working code examples",
        },
      ],
      note: "BUILD THIS NOW: Add a JD analyzer to ApplyVibe — paste a job description, AI scores your resume fit and suggests what to highlight. Uses Next.js API route + Vercel AI SDK + Claude/OpenAI. 1-2 day build. This becomes your headline project.",
    },
    {
      name: "RAG Systems",
      status: "need",
      priority: 2,
      hot: true,
      why: "RAG is how you make LLMs useful with your own data. It's the most practical AI engineering skill companies need.",
      levels: [
        {
          label: "beginner",
          topics: [
            "<strong>Why RAG:</strong> LLMs have a knowledge cutoff, can hallucinate — RAG grounds them in real data",
            "<strong>The RAG pipeline:</strong> Load documents → Chunk → Embed → Store in vector DB → Query → Retrieve → Augment prompt → Generate",
            "<strong>Embeddings:</strong> text → vector of numbers that captures meaning, similar text = similar vectors",
            "<strong>OpenAI embeddings API:</strong> text-embedding-3-small model, 1536 dimensions",
            "<strong>Cosine similarity:</strong> how vector databases find the most similar chunks",
            "<strong>Simple RAG in JavaScript:</strong> embed docs, store in array, find closest match, inject into prompt",
          ],
        },
        {
          label: "intermediate",
          topics: [
            "<strong>Vector databases:</strong> pgvector (PostgreSQL extension — free, works with your Neon DB), Pinecone free tier",
            "<strong>Chunking strategies:</strong> fixed size (500 tokens), recursive character splitting, semantic chunking",
            "<strong>Metadata filtering:</strong> filter by source, date, user_id before vector search",
            "<strong>Hybrid search:</strong> combine keyword search (BM25) + vector search for better recall",
            "<strong>Retrieval evaluation:</strong> are we retrieving the right chunks? precision and recall",
            "<strong>LangChain RAG:</strong> DocumentLoader, TextSplitter, Embeddings, VectorStore, RetrievalQA chain",
          ],
        },
        {
          label: "advanced",
          topics: [
            "<strong>Advanced retrieval:</strong> HyDE (Hypothetical Document Embeddings), multi-query retrieval",
            "<strong>Re-ranking:</strong> use a cross-encoder to re-score retrieved chunks",
            "<strong>Self-querying retriever:</strong> LLM generates the vector DB filter from natural language",
            "<strong>Production RAG:</strong> caching embeddings, async embedding pipelines, monitoring retrieval quality",
          ],
        },
      ],
      resources: [
        {
          name: "DeepLearning.AI — Building RAG with LangChain (free)",
          url: "https://www.deeplearning.ai/short-courses/building-and-evaluating-advanced-rag/",
          type: "Course",
          desc: "Free 1-hour course. Best structured intro to RAG.",
          covers: "Covers: chunking, embeddings, vector stores, advanced retrieval, evaluation",
        },
        {
          name: "pgvector GitHub + Docs",
          url: "https://github.com/pgvector/pgvector",
          type: "Reference",
          desc: "Add vector search to your existing Neon PostgreSQL. Free.",
          covers: "Covers: installation, creating vector columns, IVFFlat index, similarity queries",
        },
        {
          name: "LangChain JS Docs",
          url: "https://js.langchain.com/docs/",
          type: "Docs",
          desc: "LangChain for JavaScript/TypeScript — use in your Next.js projects.",
          covers: "Covers: document loaders, text splitters, embeddings, vector stores, chains",
        },
      ],
      note: "Use pgvector with your existing Neon database — no new services needed. Add document/note search to ApplyVibe and you have a working RAG demo.",
    },
  ],
};
