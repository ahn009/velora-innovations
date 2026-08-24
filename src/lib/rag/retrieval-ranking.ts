import type { RetrievedChunk } from './types'

export type RetrievalContext = {
  industryRoute?: string
  solutionRoutes?: string[]
  currentRoute?: string
}

export function rerankKnowledge(chunks: RetrievedChunk[], context: RetrievalContext, limit: number) {
  const solutionRoutes = new Set(context.solutionRoutes ?? [])
  return chunks
    .map((chunk) => {
      const reasons: string[] = []
      let boost = 0
      if (chunk.route && chunk.route === context.industryRoute) {
        boost += 0.12
        reasons.push('industry')
      }
      if (chunk.route && solutionRoutes.has(chunk.route)) {
        boost += 0.08
        reasons.push('solution')
      }
      if (chunk.route && chunk.route === context.currentRoute) {
        boost += 0.04
        reasons.push('current-route')
      }
      return { ...chunk, retrievalScore: chunk.similarity + boost, rankingReasons: reasons }
    })
    .sort((a, b) => (b.retrievalScore ?? b.similarity) - (a.retrievalScore ?? a.similarity) || b.similarity - a.similarity)
    .slice(0, limit)
}
