import { ragConfig } from './config'
import type { ChatHistoryMessage } from './types'

type EmbeddingResponse = { data?: Array<{ embedding?: number[]; index?: number }>; error?: { message?: string } }
type ResponsesResponse = {
  output?: Array<{ type?: string; content?: Array<{ type?: string; text?: string }> }>
  output_text?: string
  error?: { message?: string }
  status?: string
  incomplete_details?: { reason?: string } | null
}

export class RagProviderError extends Error {
  constructor(readonly category: 'embedding' | 'generation' | 'timeout' | 'invalid_response', message?: string) {
    super(message ?? category)
    this.name = 'RagProviderError'
  }
}

function providerSignal(signal?: AbortSignal) {
  const timeoutSignal = AbortSignal.timeout(ragConfig.providerTimeoutMs)
  return signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal
}

async function providerFetch(path: string, body: unknown, category: 'embedding' | 'generation', signal?: AbortSignal) {
  try {
    return await fetch(`${ragConfig.apiBaseUrl}${path}`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${ragConfig.apiKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
      signal: providerSignal(signal),
    })
  } catch (error) {
    if (error instanceof Error && (error.name === 'TimeoutError' || error.name === 'AbortError')) {
      throw new RagProviderError('timeout')
    }
    throw new RagProviderError(category)
  }
}

export async function createEmbeddings(input: string[], signal?: AbortSignal) {
  if (input.length === 0) return []
  const response = await providerFetch('/embeddings', {
    model: ragConfig.embeddingModel,
    input,
    dimensions: ragConfig.embeddingDimensions,
    encoding_format: 'float',
  }, 'embedding', signal)
  const json = await response.json().catch(() => ({})) as EmbeddingResponse
  if (!response.ok) throw new RagProviderError('embedding', json.error?.message)

  const ordered = [...(json.data ?? [])].sort((a, b) => (a.index ?? 0) - (b.index ?? 0))
  const embeddings = ordered.map((item) => item.embedding).filter((item): item is number[] => Array.isArray(item))
  if (embeddings.length !== input.length || embeddings.some((item) => item.length !== ragConfig.embeddingDimensions)) {
    throw new RagProviderError('invalid_response', 'Embedding response dimensions did not match configuration.')
  }
  return embeddings
}

function extractOutputText(response: ResponsesResponse) {
  if (typeof response.output_text === 'string' && response.output_text.trim()) return response.output_text.trim()
  return (response.output ?? [])
    .flatMap((item) => item.content ?? [])
    .filter((item) => item.type === 'output_text' && typeof item.text === 'string')
    .map((item) => item.text?.trim())
    .filter(Boolean)
    .join('\n')
    .trim()
}

export async function generateGroundedAnswer(
  instructions: string,
  history: ChatHistoryMessage[],
  userInput: string,
  signal?: AbortSignal,
) {
  const response = await providerFetch('/responses', {
    model: ragConfig.chatModel,
    instructions,
    input: [
      ...history.map((message) => ({ role: message.role, content: message.content })),
      { role: 'user', content: userInput },
    ],
    max_output_tokens: ragConfig.maxOutputTokens,
    store: false,
    tools: [],
    reasoning: { effort: ragConfig.reasoningEffort },
    text: { verbosity: ragConfig.responseVerbosity },
  }, 'generation', signal)
  const json = await response.json().catch(() => ({})) as ResponsesResponse
  if (!response.ok) throw new RagProviderError('generation', json.error?.message)
  if (json.status === 'incomplete' || json.incomplete_details?.reason) {
    throw new RagProviderError('invalid_response', `The provider response was incomplete: ${json.incomplete_details?.reason ?? 'unknown'}.`)
  }
  const answer = extractOutputText(json)
  if (!answer) throw new RagProviderError('invalid_response', 'The provider returned no answer text.')
  return answer
}
