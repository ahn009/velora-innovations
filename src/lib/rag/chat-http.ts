import { ChatRateLimitError } from './chat-service'
import { RagConfigurationError } from './config'
import { RagProviderError } from './provider'
import type { ChatInput, ChatResponse } from './types'
import { validateChatPayload } from './validation'

const unavailableMessage = 'Velora Assistant is temporarily unavailable. You can still explore our services or request a consultation.'

type ProcessOptions = { signal?: AbortSignal; debug?: boolean }
type ChatHttpDependencies = {
  maxJsonBytes: number
  debug: boolean
  assertConfig: () => void
  isSameOrigin: (request: Request) => boolean
  fingerprint: (request: Request) => string
  process: (input: ChatInput, requestId: string, fingerprint: string, options: ProcessOptions) => Promise<ChatResponse>
  createRequestId: () => string
  log: (requestId: string, startedAt: number, retrievalCount: number, errorCategory?: string) => void
}

function errorResponse(message: string, status: number, requestId: string, retryable = false) {
  return Response.json({ message, requestId, retryable }, { status })
}

export function createChatPostHandler(dependencies: ChatHttpDependencies) {
  return async function POST(request: Request) {
    const requestId = dependencies.createRequestId()
    const startedAt = Date.now()
    const contentLength = Number(request.headers.get('content-length') || 0)
    if (contentLength > dependencies.maxJsonBytes) return errorResponse('Request is too large.', 413, requestId)
    if (!dependencies.isSameOrigin(request)) return errorResponse('Invalid request origin.', 403, requestId)

    let rawBody: string
    try {
      rawBody = await request.text()
    } catch {
      return errorResponse('Invalid request body.', 400, requestId)
    }
    if (new TextEncoder().encode(rawBody).byteLength > dependencies.maxJsonBytes) {
      return errorResponse('Request is too large.', 413, requestId)
    }

    let body: unknown
    try {
      body = JSON.parse(rawBody)
    } catch {
      return errorResponse('Invalid request body.', 400, requestId)
    }
    const parsed = validateChatPayload(body)
    if (!parsed.ok) return errorResponse(parsed.message, 400, requestId)

    try {
      dependencies.assertConfig()
      const response = await dependencies.process(
        parsed.value,
        requestId,
        dependencies.fingerprint(request),
        {
          signal: request.signal,
          debug: dependencies.debug && new URL(request.url).searchParams.get('debug') === '1',
        },
      )
      dependencies.log(requestId, startedAt, response.debug?.retrieved.length ?? response.sources.length)
      return Response.json(response, { headers: { 'cache-control': 'no-store' } })
    } catch (error) {
      if (error instanceof ChatRateLimitError) {
        dependencies.log(requestId, startedAt, 0, 'rate_limit')
        return errorResponse('You’ve reached the chat limit for now. Please try again later.', 429, requestId)
      }
      if (error instanceof RagProviderError && error.category === 'timeout') {
        dependencies.log(requestId, startedAt, 0, 'provider_timeout')
        return errorResponse('The response took too long. Please try again.', 504, requestId, true)
      }
      const category = error instanceof RagConfigurationError
        ? error.category
        : error instanceof RagProviderError
          ? `provider_${error.category}`
          : 'internal'
      dependencies.log(requestId, startedAt, 0, category)
      return errorResponse(unavailableMessage, 503, requestId, true)
    }
  }
}
