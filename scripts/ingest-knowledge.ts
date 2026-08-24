import { loadEnvConfig } from '@next/env'
import { PrismaClient } from '@prisma/client'
import { configureDirectDatabaseForRagCli } from './rag-cli-env'

async function main() {
  loadEnvConfig(process.cwd())
  configureDirectDatabaseForRagCli()

  const { ingestApprovedKnowledge } = await import('../src/lib/rag/ingest')
  const prisma = new PrismaClient()

  try {
    const stats = await ingestApprovedKnowledge(prisma)
    console.log(JSON.stringify({ status: 'completed', ...stats }, null, 2))
  } finally {
    await prisma.$disconnect()
  }
}

void main().catch((error) => {
  console.error(JSON.stringify({
    status: 'failed',
    error: error instanceof Error ? error.message : 'Unknown ingestion error',
  }, null, 2))
  process.exitCode = 1
})
