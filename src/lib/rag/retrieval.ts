import 'server-only'
import { Prisma } from '@prisma/client'
import { db } from '@/lib/db'
import { ragConfig } from './config'
import type { RetrievedChunk } from './types'

function vectorLiteral(embedding: number[]) {
  if (embedding.length !== ragConfig.embeddingDimensions || embedding.some((value) => !Number.isFinite(value))) {
    throw new Error('Invalid query embedding.')
  }
  return `[${embedding.join(',')}]`
}

type Row = Omit<RetrievedChunk, 'similarity'> & { similarity: number | string }

export async function retrieveKnowledge(embedding: number[]) {
  const vector = vectorLiteral(embedding)
  const rows = await db.$queryRaw<Row[]>(Prisma.sql`
    SELECT
      "id",
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
    LIMIT ${ragConfig.topK}
  `)

  return rows.map((row) => ({ ...row, similarity: Number(row.similarity) }))
}
