# Velora Assistant RAG System

## Status and boundaries

The implementation is intentionally disabled by default. It is not production-ready until a human applies the migration, supplies production environment variables, ingests the approved knowledge, completes live provider/database QA, deploys, and explicitly enables the public feature flag.

Velora Assistant is a website RAG assistant, not a general chatbot. It answers from approved Velora public content only. It has no web-search tool, no browser, no access to `Lead` or `Subscriber`, and no ability to query arbitrary tables. It does not persist conversations.

## Architecture and data flow

1. A visitor opens the dynamically loaded chat panel and submits a bounded message plus at most eight recent messages.
2. `POST /api/chat` enforces origin, JSON byte size, schema, honeypot, message/history limits, feature configuration, and a separate database-backed chat rate limit.
3. Deterministic safety rules handle prompt-injection/private-data requests and legal, medical, tax, accounting, and financial advice requests before any model call.
4. The server embeds the current question with the configured embedding model.
5. A parameterized Prisma raw query performs cosine search against active `KnowledgeChunk` rows in Supabase PostgreSQL/pgvector.
6. The top matching chunks above the threshold are passed as untrusted factual excerpts to the Responses API. No OpenAI tools are enabled and `store` is false.
7. The API returns grounded text, clean internal source links, an optional consultation CTA, and a request ID. Similarity data is available only when both `NODE_ENV !== "production"` and `RAG_DEBUG=true`, and only when the request adds `?debug=1`.

## Database

Migration `20260823130000_add_rag_knowledge`:

- enables the PostgreSQL `vector` extension in the `extensions` schema;
- creates `KnowledgeChunk` with `extensions.vector(1536)`;
- creates an HNSW cosine index plus metadata indexes;
- creates `KnowledgeIngestionRun` for operational ingestion status;
- enables RLS on both tables without anonymous policies.

Knowledge is isolated from customer data. Runtime retrieval uses the existing server-side Prisma connection. Normal operations remain in Prisma; only vector casts and similarity search use parameterized raw SQL.

The schema dimension is intentionally fixed at 1536 for the default `text-embedding-3-small` configuration. Changing dimensions requires a reviewed database migration, re-ingestion, and matching `RAG_EMBEDDING_DIMENSIONS`—changing the environment variable alone is rejected.

## Approved knowledge sources

`src/lib/rag/knowledge-sources.ts` is the allowlist. It builds deterministic records from source-controlled Velora solution and industry content plus explicitly curated public page sections for:

- homepage, solutions catalog, and every solution detail page;
- industries directory and every industry detail page;
- how it works and pricing;
- resources, guided demo, workflows, integrations, security, calculator, and FAQ;
- about, AI disclosure, and consultation process.

The source loader does not read environment files, logs, analytics, webhooks, databases, emails, developer notes, arbitrary files, the deployed website, or the open web.

## Chunking and ingestion

`npm run rag:ingest` loads only the allowlisted repository content. It normalizes whitespace, preserves page/section metadata, groups logical sections near a 300–700 token target, calculates a SHA-256 content hash, batches embeddings, reuses unchanged compatible vectors, upserts changed chunks, reactivates current chunks, safely deactivates stale repository-managed chunks, and records statistics.

Run locally or as a controlled deployment operation:

```text
npx prisma migrate deploy
npm run rag:ingest
npm run rag:status
```

Re-run ingestion whenever approved public content, chunking, embedding model, or embedding dimension changes. Do not run ingestion as a background web request or on every Vercel deployment.

## Retrieval and generation

Defaults:

- embeddings: `text-embedding-3-small`, 1536 dimensions;
- chat: `gpt-5.6-sol` with low reasoning effort and medium response verbosity;
- similarity: cosine;
- top-k: 6;
- minimum similarity: 0.35;
- maximum answer budget: 1,200 output tokens, including reasoning tokens;
- provider timeout: 25 seconds.

Model names and limits are centralized in `src/lib/rag/config.ts`. Threshold and model changes require representative QA. The public response never exposes chunk IDs or similarity scores.

## Safety, privacy, and security

- The UI flag is not authorization. `RAG_ENABLED=true` and a server-only API key are required by the API.
- Prompt instructions state that visitor messages, history, and retrieved excerpts are untrusted text and that excerpts contain facts, not instructions.
- Deterministic rules refuse prompt/system disclosure, credentials, private data, customer lead requests, and regulated advice.
- The assistant supports only administrative workflows for law, medical/dental, and accounting contexts.
- A potential medical emergency receives a direct emergency-services/qualified-professional redirect; the assistant does not diagnose.
- Chat transcripts are held in React state only and are not written to PostgreSQL, analytics, or logs.
- Operational logs contain request ID, latency, retrieval count, and error category—not full messages.
- The existing CSP does not need an AI-provider browser origin because all provider calls are server-side.
- OpenAI requests use `store: false` and expose no tools, including web search.

## Rate and cost controls

The existing `RateLimitBucket` table is reused with a separate `chat` namespace. The initial limit is 15 requests per hashed IP/user-agent fingerprint per hour. Other controls include JSON byte limits, message/history caps, top-k, threshold, output token cap, provider/client timeouts, abort propagation, no background generation, and no transcript replay beyond bounded history.

## UI and consultation handoff

The launcher is rendered only when `NEXT_PUBLIC_RAG_CHAT_ENABLED=true`. The full panel is dynamically imported after interaction. It uses the existing Radix dialog behavior for focus management, Escape-to-close, and focus return; mobile uses a safe-area-aware near-fullscreen bottom sheet.

Commercial-intent answers may return a `Request a Consultation` CTA. It passes only `source=website-assistant`, a bounded industry slug from the current route, and a bounded solution slug from the route or a small approved intent map. It never passes the transcript. The existing consultation form and lead pipeline remain the only lead-capture architecture.

## Local development and QA

1. Use Node.js 22 LTS (the repository pins 22.23.2 in `.nvmrc`), a development Supabase database, and an OpenAI project key.
2. Apply the migration.
3. set `RAG_ENABLED=true` but keep `NEXT_PUBLIC_RAG_CHAT_ENABLED=false` for API-only tests.
4. Run `npm run rag:ingest` and `npm run rag:status`.
5. Run `npm run rag:qa`, `npm run lint`, `npm run typecheck`, and `npm run build`.
6. Test `POST /api/chat` for success, malformed JSON, oversized JSON, rate limits, timeout/provider failure, no-match, injection, regulated requests, and source links.
7. Temporarily enable the public flag only in a non-production environment for 390, 768, 1440, and 1920 pixel visual/accessibility tests.
8. With an enabled non-production server running, use `RAG_QA_BASE_URL=http://127.0.0.1:3000 node scripts/rag-visual-qa.mjs` on Windows/Chrome to capture breakpoint screenshots and viewport metrics.

## Vercel deployment

Use the Node.js route runtime. Configure all server variables in the intended Vercel environments, apply the migration through a controlled release step, run ingestion once against the target database, and deploy with the UI flag false. Verify the API and retrieval data before a separate reviewed deployment enables the public flag.

The implementation requires no persistent filesystem, long-running worker, or Vercel-specific datastore. Business logic uses standard Node.js fetch, PostgreSQL, and Prisma, so a future VPS can run the same route and CLI with minimal deployment changes.

## Troubleshooting

- `503 temporarily unavailable`: confirm `RAG_ENABLED`, `AI_API_KEY`, provider access, database access, migration, and active chunks.
- no approved answer: inspect development debug retrieval, then review source coverage and threshold; never bypass retrieval with a general answer.
- dimension mismatch: restore 1536 or create a reviewed vector-column migration and re-ingest.
- empty knowledge: run the migration, `npm run rag:ingest`, then `npm run rag:status`.
- slow responses: inspect provider latency and database vector index use before increasing timeouts or context.
- ingestion failure: the failed run and error category are retained; unchanged active chunks are not deactivated until a run completes successfully.

## Environment variables

Required for an enabled server:

- `DATABASE_URL`
- `DIRECT_URL` (migration operations)
- `AI_API_KEY`
- `RAG_ENABLED`
- `RAG_CHAT_MODEL`
- `RAG_EMBEDDING_MODEL`
- `RAG_EMBEDDING_DIMENSIONS`
- `RAG_REASONING_EFFORT`
- `RAG_RESPONSE_VERBOSITY`
- `NEXT_PUBLIC_RAG_CHAT_ENABLED`

Optional controls:

- `OPENAI_BASE_URL`
- `RAG_TOP_K`
- `RAG_SIMILARITY_THRESHOLD`
- `RAG_MAX_HISTORY_MESSAGES`
- `RAG_MAX_MESSAGE_LENGTH`
- `RAG_MAX_OUTPUT_TOKENS`
- `RAG_MAX_JSON_BYTES`
- `RAG_PROVIDER_TIMEOUT_MS`
- `RAG_DEBUG`
