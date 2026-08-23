import { Prisma, type PrismaClient } from '@prisma/client'
import { buildKnowledgeChunks } from './chunking'
import { ragConfig } from './config'
import { createEmbeddings } from './provider'
import { getApprovedKnowledgeSources } from './knowledge-sources'

type ExistingChunk = {
  contentHash: string
  embeddingModel: string
  embeddingDimensions: number
  hasEmbedding: boolean
}

export type IngestionStats = {
  runId: string
  pages: number
  chunks: number
  embedded: number
  reused: number
  deactivated: number
}

function vectorLiteral(embedding: number[]) {
  if (embedding.length !== ragConfig.embeddingDimensions || embedding.some((value) => !Number.isFinite(value))) {
    throw new Error('Refusing to persist an invalid embedding.')
  }
  return `[${embedding.join(',')}]`
}

function embeddingInput(chunk: { sourceTitle: string; route: string; heading: string; content: string }) {
  return [`Page: ${chunk.sourceTitle}`, `Route: ${chunk.route}`, `Section: ${chunk.heading}`, chunk.content].join('\n')
}

function errorCategory(error: unknown) {
  if (error instanceof Error) return error.name.slice(0, 120)
  return 'UnknownError'
}

export async function ingestApprovedKnowledge(prisma: PrismaClient): Promise<IngestionStats> {
  if (!ragConfig.apiKey) throw new Error('AI_API_KEY is required for knowledge ingestion.')
  if (ragConfig.embeddingDimensions !== 1536) {
    throw new Error('RAG_EMBEDDING_DIMENSIONS must match the migration vector(1536).')
  }

  const sources = getApprovedKnowledgeSources()
  const chunks = buildKnowledgeChunks(sources)
  const run = await prisma.knowledgeIngestionRun.create({
    data: {
      status: 'RUNNING',
      embeddingModel: ragConfig.embeddingModel,
      embeddingDimensions: ragConfig.embeddingDimensions,
      pagesSeen: sources.length,
      chunksSeen: chunks.length,
    },
    select: { id: true },
  })

  try {
    const existing = await prisma.$queryRaw<ExistingChunk[]>(Prisma.sql`
      SELECT
        "contentHash",
        "embeddingModel",
        "embeddingDimensions",
        "embedding" IS NOT NULL AS "hasEmbedding"
      FROM "KnowledgeChunk"
      WHERE "contentHash" IN (${Prisma.join(chunks.map((chunk) => chunk.contentHash))})
    `)
    const reusable = new Set(existing
      .filter((chunk) => chunk.hasEmbedding
        && chunk.embeddingModel === ragConfig.embeddingModel
        && chunk.embeddingDimensions === ragConfig.embeddingDimensions)
      .map((chunk) => chunk.contentHash))

    const toEmbed = chunks.filter((chunk) => !reusable.has(chunk.contentHash))
    const embeddings = new Map<string, number[]>()
    for (let index = 0; index < toEmbed.length; index += 64) {
      const batch = toEmbed.slice(index, index + 64)
      const vectors = await createEmbeddings(batch.map(embeddingInput))
      batch.forEach((chunk, batchIndex) => embeddings.set(chunk.contentHash, vectors[batchIndex]))
    }

    for (const chunk of chunks) {
      const data = {
        sourceType: chunk.sourceType,
        sourceTitle: chunk.sourceTitle,
        sourceUrl: chunk.sourceUrl,
        route: chunk.route,
        heading: chunk.heading,
        content: chunk.content,
        embeddingModel: ragConfig.embeddingModel,
        embeddingDimensions: ragConfig.embeddingDimensions,
        managedBy: 'repository',
        ingestionRunId: run.id,
        isActive: true,
      }
      const embedding = embeddings.get(chunk.contentHash)
      await prisma.$transaction(async (tx) => {
        const record = await tx.knowledgeChunk.upsert({
          where: { contentHash: chunk.contentHash },
          create: { contentHash: chunk.contentHash, ...data },
          update: data,
          select: { id: true },
        })
        if (embedding) {
          const vector = vectorLiteral(embedding)
          await tx.$executeRaw(Prisma.sql`
            UPDATE "KnowledgeChunk"
            SET "embedding" = ${vector}::extensions.vector, "updatedAt" = CURRENT_TIMESTAMP
            WHERE "id" = ${record.id}
          `)
        }
      })
    }

    const stale = await prisma.knowledgeChunk.updateMany({
      where: { managedBy: 'repository', ingestionRunId: { not: run.id }, isActive: true },
      data: { isActive: false },
    })
    const stats = {
      runId: run.id,
      pages: sources.length,
      chunks: chunks.length,
      embedded: toEmbed.length,
      reused: chunks.length - toEmbed.length,
      deactivated: stale.count,
    }
    await prisma.knowledgeIngestionRun.update({
      where: { id: run.id },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
        chunksEmbedded: stats.embedded,
        chunksReused: stats.reused,
        chunksDeactivated: stats.deactivated,
      },
    })
    return stats
  } catch (error) {
    await prisma.knowledgeIngestionRun.update({
      where: { id: run.id },
      data: { status: 'FAILED', completedAt: new Date(), errorCategory: errorCategory(error) },
    }).catch(() => undefined)
    throw error
  }
}

export async function getKnowledgeStatus(prisma: PrismaClient) {
  const [total, active, pages, lastRun] = await Promise.all([
    prisma.knowledgeChunk.count(),
    prisma.knowledgeChunk.count({ where: { isActive: true } }),
    prisma.knowledgeChunk.groupBy({ by: ['route'], where: { isActive: true } }),
    prisma.knowledgeIngestionRun.findFirst({ orderBy: { startedAt: 'desc' } }),
  ])
  return { total, active, pages: pages.length, lastRun }
}
