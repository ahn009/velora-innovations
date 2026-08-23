import { loadEnvConfig } from '@next/env'
import { PrismaClient } from '@prisma/client'

loadEnvConfig(process.cwd())

const { getKnowledgeStatus } = await import('../src/lib/rag/ingest')
const prisma = new PrismaClient()

try {
  console.log(JSON.stringify(await getKnowledgeStatus(prisma), null, 2))
} finally {
  await prisma.$disconnect()
}
