import { loadEnvConfig } from '@next/env'
import { PrismaClient } from '@prisma/client'

loadEnvConfig(process.cwd())

const { ingestApprovedKnowledge } = await import('../src/lib/rag/ingest')
const prisma = new PrismaClient()

try {
  const stats = await ingestApprovedKnowledge(prisma)
  console.log(JSON.stringify({ status: 'completed', ...stats }, null, 2))
} catch (error) {
  console.error(JSON.stringify({
    status: 'failed',
    error: error instanceof Error ? error.message : 'Unknown ingestion error',
  }, null, 2))
  process.exitCode = 1
} finally {
  await prisma.$disconnect()
}
