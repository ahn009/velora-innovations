function integer(name: string, fallback: number, min: number, max: number) {
  const parsed = Number.parseInt(process.env[name] ?? '', 10)
  return Number.isFinite(parsed) ? Math.min(max, Math.max(min, parsed)) : fallback
}

function decimal(name: string, fallback: number, min: number, max: number) {
  const parsed = Number.parseFloat(process.env[name] ?? '')
  return Number.isFinite(parsed) ? Math.min(max, Math.max(min, parsed)) : fallback
}

function option<T extends string>(name: string, fallback: T, allowed: readonly T[]) {
  const value = process.env[name] as T | undefined
  return value && allowed.includes(value) ? value : fallback
}

export const ragConfig = {
  enabled: process.env.RAG_ENABLED === 'true',
  apiKey: process.env.AI_API_KEY ?? '',
  apiBaseUrl: (process.env.OPENAI_BASE_URL ?? 'https://api.openai.com/v1').replace(/\/$/, ''),
  chatModel: process.env.RAG_CHAT_MODEL ?? 'gpt-5.6-sol',
  embeddingModel: process.env.RAG_EMBEDDING_MODEL ?? 'text-embedding-3-small',
  reasoningEffort: option('RAG_REASONING_EFFORT', 'low', ['none', 'low', 'medium', 'high', 'xhigh', 'max'] as const),
  responseVerbosity: option('RAG_RESPONSE_VERBOSITY', 'medium', ['low', 'medium', 'high'] as const),
  embeddingDimensions: integer('RAG_EMBEDDING_DIMENSIONS', 1536, 256, 4096),
  topK: integer('RAG_TOP_K', 6, 1, 8),
  similarityThreshold: decimal('RAG_SIMILARITY_THRESHOLD', 0.35, 0, 1),
  maxHistoryMessages: integer('RAG_MAX_HISTORY_MESSAGES', 8, 0, 12),
  maxMessageLength: integer('RAG_MAX_MESSAGE_LENGTH', 2000, 100, 4000),
  maxOutputTokens: integer('RAG_MAX_OUTPUT_TOKENS', 1200, 200, 2000),
  maxJsonBytes: integer('RAG_MAX_JSON_BYTES', 24 * 1024, 4 * 1024, 64 * 1024),
  providerTimeoutMs: integer('RAG_PROVIDER_TIMEOUT_MS', 25_000, 3_000, 30_000),
  debug: process.env.NODE_ENV !== 'production' && process.env.RAG_DEBUG === 'true',
} as const

export function assertRagServerConfig() {
  if (!ragConfig.enabled) throw new RagConfigurationError('disabled')
  if (!ragConfig.apiKey) throw new RagConfigurationError('missing_api_key')
  if (ragConfig.embeddingDimensions !== 1536) {
    throw new RagConfigurationError('migration_dimension_mismatch')
  }
}

export class RagConfigurationError extends Error {
  constructor(readonly category: 'disabled' | 'missing_api_key' | 'migration_dimension_mismatch') {
    super(`RAG configuration error: ${category}`)
    this.name = 'RagConfigurationError'
  }
}
