import { randomUUID } from 'node:crypto'
import { processChat } from '@/lib/rag/chat-service'
import { createChatPostHandler } from '@/lib/rag/chat-http'
import { assertRagServerConfig, ragConfig } from '@/lib/rag/config'
import { createEmbeddings, generateGroundedAnswer } from '@/lib/rag/provider'
import { retrieveKnowledge } from '@/lib/rag/retrieval'
import { checkRateLimit, getRequestFingerprint, isSameOrigin } from '@/lib/submissions'

export const runtime = 'nodejs'

function logRequest(requestId: string, startedAt: number, retrievalCount: number, errorCategory?: string) {
  console.info('rag_request', {
    requestId,
    latencyMs: Date.now() - startedAt,
    retrievalCount,
    errorCategory: errorCategory ?? null,
  })
}

export const POST = createChatPostHandler({
  maxJsonBytes: ragConfig.maxJsonBytes,
  debug: ragConfig.debug,
  assertConfig: assertRagServerConfig,
  isSameOrigin,
  fingerprint: getRequestFingerprint,
  createRequestId: randomUUID,
  log: logRequest,
  process: (input, requestId, fingerprint, options) => processChat(input, requestId, fingerprint, {
    rateLimit: (fingerprint) => checkRateLimit('chat', fingerprint),
    embed: createEmbeddings,
    retrieve: retrieveKnowledge,
    generate: generateGroundedAnswer,
  }, options),
})
