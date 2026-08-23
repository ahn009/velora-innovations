import type { ChatInput, ChatResponse, RetrievedChunk } from './types'
import { buildGroundedInput, VELORA_SYSTEM_PROMPT } from './prompt'
import { consultationUrl, getPolicyAnswer, hasCommercialIntent } from './policy'
import { publicSources } from './sources'

export class ChatRateLimitError extends Error {
  constructor() {
    super('Chat rate limit exceeded.')
    this.name = 'ChatRateLimitError'
  }
}

export type ChatDependencies = {
  rateLimit: (fingerprint: string) => Promise<boolean>
  embed: (input: string[], signal?: AbortSignal) => Promise<number[][]>
  retrieve: (embedding: number[]) => Promise<RetrievedChunk[]>
  generate: (instructions: string, history: ChatInput['history'], input: string, signal?: AbortSignal) => Promise<string>
}

const fallbackSources = [
  { title: 'Resources', url: '/resources', route: '/resources' },
  { title: 'Request a Consultation', url: '/consultation?source=website-assistant', route: '/consultation' },
]

export async function processChat(
  input: ChatInput,
  requestId: string,
  fingerprint: string,
  dependencies: ChatDependencies,
  options: { signal?: AbortSignal; debug?: boolean } = {},
): Promise<ChatResponse> {
  if (!(await dependencies.rateLimit(fingerprint))) throw new ChatRateLimitError()

  const policyAnswer = getPolicyAnswer(input.message)
  if (policyAnswer) {
    return {
      answer: policyAnswer.answer,
      sources: policyAnswer.sources ?? [],
      requestId,
    }
  }

  const [embedding] = await dependencies.embed([input.message], options.signal)
  if (!embedding) throw new Error('Embedding provider returned no query vector.')
  const chunks = await dependencies.retrieve(embedding)
  if (chunks.length === 0) {
    return {
      answer: 'I don’t have enough approved Velora information to answer that confidently.',
      sources: fallbackSources,
      consultation: hasCommercialIntent(input.message)
        ? { label: 'Request a Consultation', url: consultationUrl(input.route, input.message) }
        : undefined,
      requestId,
      debug: options.debug ? { retrieved: [] } : undefined,
    }
  }

  const answer = await dependencies.generate(
    VELORA_SYSTEM_PROMPT,
    input.history,
    buildGroundedInput(input.message, chunks),
    options.signal,
  )
  return {
    answer,
    sources: publicSources(chunks),
    consultation: hasCommercialIntent(input.message)
      ? { label: 'Request a Consultation', url: consultationUrl(input.route, input.message) }
      : undefined,
    requestId,
    debug: options.debug ? {
      retrieved: chunks.map((chunk) => ({
        title: chunk.sourceTitle,
        route: chunk.route,
        similarity: chunk.similarity,
        tokenEstimate: Math.ceil(chunk.content.length / 4),
      })),
    } : undefined,
  }
}
