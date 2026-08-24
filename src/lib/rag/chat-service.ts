import type { ChatInput, ChatResponse, RagSource, RetrievedChunk } from './types'
import { buildGroundedInput, buildSystemPrompt } from './prompt'
import { consultationUrl, getPolicyAnswer } from './policy'
import { publicSources } from './sources'
import { analyzeChatRequest, type RequestIntelligence } from './intelligence'
import { INDUSTRY_INTELLIGENCE } from './industry-intelligence'
import { selectResponseExamples, type ResponseExample } from './response-examples'
import { SOLUTION_ROUTES } from './velora-knowledge'
import type { RetrievalContext } from './retrieval-ranking'

export class ChatRateLimitError extends Error {
  constructor() {
    super('Chat rate limit exceeded.')
    this.name = 'ChatRateLimitError'
  }
}

export type ChatDependencies = {
  rateLimit: (fingerprint: string) => Promise<boolean>
  embed: (input: string[], signal?: AbortSignal) => Promise<number[][]>
  retrieve: (embedding: number[], context: RetrievalContext) => Promise<RetrievedChunk[]>
  generate: (instructions: string, history: ChatInput['history'], input: string, signal?: AbortSignal) => Promise<string>
}

const source = (title: string, route: string): RagSource => ({ title, url: route, route })

function fallbackSources(intelligence: RequestIntelligence) {
  const sources: RagSource[] = []
  if (intelligence.industry) {
    const route = INDUSTRY_INTELLIGENCE[intelligence.industry].route
    sources.push(source(intelligence.industry, route))
  }
  const primarySolution = intelligence.solutions[0]
  if (primarySolution) sources.push(source(primarySolution, SOLUTION_ROUTES[primarySolution]))
  sources.push(source('Resources', '/resources'))
  return sources.slice(0, 3)
}

export function buildRetrievalQuery(input: ChatInput, intelligence = analyzeChatRequest(input)) {
  const recentUserContext = input.history
    .filter((message) => message.role === 'user')
    .slice(-2)
    .map((message) => message.content)
  return [
    intelligence.retrievalQuery,
    input.route ? `Current Velora page: ${input.route}` : '',
    recentUserContext.length ? `Recent visitor context: ${recentUserContext.join(' | ')}` : '',
  ].filter(Boolean).join('\n')
}

function debugDetails(intelligence: RequestIntelligence, examples: readonly ResponseExample[], chunks: RetrievedChunk[]) {
  return {
    intent: intelligence.intent,
    industry: intelligence.industry,
    buyingStage: intelligence.buyingStage,
    inferredSolutions: intelligence.solutions,
    retrievalQuery: intelligence.retrievalQuery,
    selectedExamples: examples.map((example) => example.id),
    retrieved: chunks.map((chunk) => ({
      title: chunk.sourceTitle,
      route: chunk.route,
      similarity: chunk.similarity,
      tokenEstimate: Math.ceil(chunk.content.length / 4),
    })),
  }
}

function consultation(intelligence: RequestIntelligence, input: ChatInput) {
  if (!intelligence.commercialIntent) return undefined
  return {
    label: 'Request a Consultation',
    url: consultationUrl(input.route, input.message, intelligence.industry, intelligence.solutions[0]),
  }
}

export async function processChat(
  input: ChatInput,
  requestId: string,
  fingerprint: string,
  dependencies: ChatDependencies,
  options: { signal?: AbortSignal; debug?: boolean } = {},
): Promise<ChatResponse> {
  if (!(await dependencies.rateLimit(fingerprint))) throw new ChatRateLimitError()

  const analyzed = analyzeChatRequest(input)
  const retrievalQuery = buildRetrievalQuery(input, analyzed)
  const intelligence = { ...analyzed, retrievalQuery }
  const examples = selectResponseExamples(intelligence)
  const policyAnswer = getPolicyAnswer(input.message)
  if (policyAnswer) {
    return {
      answer: policyAnswer.answer,
      sources: policyAnswer.sources ?? [],
      consultation: consultation(intelligence, input),
      requestId,
      debug: options.debug ? debugDetails(intelligence, examples, []) : undefined,
    }
  }

  const [embedding] = await dependencies.embed([retrievalQuery], options.signal)
  if (!embedding) throw new Error('Embedding provider returned no query vector.')
  const chunks = await dependencies.retrieve(embedding, {
    industryRoute: intelligence.industry ? INDUSTRY_INTELLIGENCE[intelligence.industry].route : undefined,
    solutionRoutes: intelligence.solutions.map((solution) => SOLUTION_ROUTES[solution]),
    currentRoute: input.route,
  })
  if (chunks.length === 0) {
    const contextualConfirmation = intelligence.industry
      ? ` I can explain Velora's approved ${intelligence.industry} administrative workflows, but I can't confirm the specific claim in your question.`
      : ''
    return {
      answer: `I don’t have enough approved Velora information to confirm that.${contextualConfirmation}`,
      sources: fallbackSources(intelligence),
      consultation: consultation(intelligence, input),
      requestId,
      debug: options.debug ? debugDetails(intelligence, examples, []) : undefined,
    }
  }

  const answer = await dependencies.generate(
    buildSystemPrompt(intelligence, examples),
    input.history,
    buildGroundedInput(input.message, chunks, input.route),
    options.signal,
  )
  return {
    answer,
    sources: publicSources(chunks),
    consultation: consultation(intelligence, input),
    requestId,
    debug: options.debug ? debugDetails(intelligence, examples, chunks) : undefined,
  }
}
