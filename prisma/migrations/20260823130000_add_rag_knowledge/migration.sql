-- Keep RAG knowledge isolated from lead and subscriber data.
CREATE SCHEMA IF NOT EXISTS extensions;
CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA extensions;

CREATE TABLE "KnowledgeChunk" (
    "id" TEXT NOT NULL,
    "sourceType" TEXT NOT NULL,
    "sourceTitle" TEXT NOT NULL,
    "sourceUrl" TEXT,
    "route" TEXT,
    "heading" TEXT,
    "content" TEXT NOT NULL,
    "contentHash" TEXT NOT NULL,
    "embedding" extensions.vector(1536),
    "embeddingModel" TEXT NOT NULL,
    "embeddingDimensions" INTEGER NOT NULL,
    "managedBy" TEXT NOT NULL DEFAULT 'repository',
    "ingestionRunId" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "KnowledgeChunk_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "KnowledgeIngestionRun" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "embeddingModel" TEXT NOT NULL,
    "embeddingDimensions" INTEGER NOT NULL,
    "pagesSeen" INTEGER NOT NULL DEFAULT 0,
    "chunksSeen" INTEGER NOT NULL DEFAULT 0,
    "chunksEmbedded" INTEGER NOT NULL DEFAULT 0,
    "chunksReused" INTEGER NOT NULL DEFAULT 0,
    "chunksDeactivated" INTEGER NOT NULL DEFAULT 0,
    "errorCategory" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    CONSTRAINT "KnowledgeIngestionRun_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "KnowledgeChunk_contentHash_key" ON "KnowledgeChunk"("contentHash");
CREATE INDEX "KnowledgeChunk_sourceType_idx" ON "KnowledgeChunk"("sourceType");
CREATE INDEX "KnowledgeChunk_route_idx" ON "KnowledgeChunk"("route");
CREATE INDEX "KnowledgeChunk_isActive_idx" ON "KnowledgeChunk"("isActive");
CREATE INDEX "KnowledgeChunk_managedBy_ingestionRunId_idx" ON "KnowledgeChunk"("managedBy", "ingestionRunId");
CREATE INDEX "KnowledgeIngestionRun_startedAt_idx" ON "KnowledgeIngestionRun"("startedAt");
CREATE INDEX "KnowledgeIngestionRun_status_idx" ON "KnowledgeIngestionRun"("status");
CREATE INDEX "KnowledgeChunk_embedding_hnsw_idx"
  ON "KnowledgeChunk" USING hnsw ("embedding" extensions.vector_cosine_ops)
  WHERE "isActive" = true AND "embedding" IS NOT NULL;

-- Server-side Prisma access is used. Anonymous Supabase API roles receive no policies.
ALTER TABLE "KnowledgeChunk" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "KnowledgeIngestionRun" ENABLE ROW LEVEL SECURITY;
