import { loadEnvConfig } from '@next/env'
import { PrismaClient } from '@prisma/client'
import { configureDirectDatabaseForRagCli } from './rag-cli-env'

async function main() {
  loadEnvConfig(process.cwd())
  configureDirectDatabaseForRagCli()

  const { getKnowledgeStatus } = await import('../src/lib/rag/ingest')
  const prisma = new PrismaClient()

  try {
    console.log(JSON.stringify(await getKnowledgeStatus(prisma), null, 2))
  } finally {
    await prisma.$disconnect()
  }
}

void main().catch((error) => {
  console.error(error instanceof Error ? error.message : 'Unable to read RAG status.')
  process.exitCode = 1
})
