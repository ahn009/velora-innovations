import type { RetrievedChunk } from './types'

export function publicSources(chunks: RetrievedChunk[]) {
  const seen = new Set<string>()
  return chunks.flatMap((chunk) => {
    const url = chunk.route || chunk.sourceUrl
    if (!url || seen.has(url)) return []
    seen.add(url)
    return [{ title: chunk.sourceTitle, url, route: chunk.route }]
  }).slice(0, 5)
}
