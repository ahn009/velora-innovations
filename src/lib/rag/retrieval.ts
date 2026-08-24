import 'server-only'
import { Prisma } from '@prisma/client'
import { db } from '@/lib/db'
import { ragConfig } from './config'
import type { RetrievedChunk } from './types'
import { rerankKnowledge, type RetrievalContext } from './retrieval-ranking'

export type { RetrievalContext } from './retrieval-ranking'

function vectorLiteral(embedding: number[]) {
  if (embedding.length !== ragConfig.embeddingDimensions || embedding.some((value) => !Number.isFinite(value))) {
    throw new Error('Invalid query embedding.')
  }
  return `[${embedding.join(',')}]`
}

type Row = Omit<RetrievedChunk, 'similarity'> & { similarity: number | string }

export async function retrieveKnowledge(embedding: number[], context: RetrievalContext = {}) {
  const vector = vectorLiteral(embedding)
  const candidateLimit = Math.min(24, Math.max(ragConfig.topK, ragConfig.topK * 3))
  const rows = await db.$queryRaw<Row[]>(Prisma.sql`
    SELECT
      "id",
      "sourceType",
      "sourceTitle",
      "sourceUrl",
      "route",
      "heading",
      "content",
      1 - ("embedding" <=> ${vector}::extensions.vector) AS "similarity"
    FROM "KnowledgeChunk"
    WHERE "isActive" = true
      AND "embedding" IS NOT NULL
      AND "embeddingModel" = ${ragConfig.embeddingModel}
      AND "embeddingDimensions" = ${ragConfig.embeddingDimensions}
      AND 1 - ("embedding" <=> ${vector}::extensions.vector) >= ${ragConfig.similarityThreshold}
    ORDER BY "embedding" <=> ${vector}::extensions.vector
    LIMIT ${candidateLimit}
  `)

  return rerankKnowledge(rows.map((row) => ({ ...row, similarity: Number(row.similarity) })), context, ragConfig.topK)
}
