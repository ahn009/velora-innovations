import { createHash } from 'node:crypto'
import type { KnowledgeSection, KnowledgeSource } from './knowledge-sources'

export type KnowledgeChunkInput = Omit<KnowledgeSource, 'sections'> & {
  heading: string
  content: string
  contentHash: string
  tokenEstimate: number
}

export function normalizeKnowledgeText(value: string) {
  return value
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .map((line) => line.replace(/[\t ]+/g, ' ').trim())
    .filter(Boolean)
    .join('\n')
    .trim()
}

export function estimateTokens(value: string) {
  return Math.ceil(value.length / 4)
}

function splitLongSection(section: KnowledgeSection, maxCharacters: number) {
  const content = normalizeKnowledgeText(section.content)
  if (content.length <= maxCharacters) return [{ heading: section.heading, content }]
  const sentences = content.match(/[^.!?\n]+(?:[.!?]+|$)/g) ?? [content]
  const parts: KnowledgeSection[] = []
  let current = ''
  for (const sentence of sentences) {
    const next = `${current} ${sentence.trim()}`.trim()
    if (current && next.length > maxCharacters) {
      parts.push({ heading: section.heading, content: current })
      current = sentence.trim()
    } else {
      current = next
    }
  }
  if (current) parts.push({ heading: section.heading, content: current })
  return parts
}

function hashChunk(source: KnowledgeSource, heading: string, content: string) {
  return createHash('sha256')
    .update(JSON.stringify({ sourceType: source.sourceType, sourceTitle: source.sourceTitle, route: source.route, heading, content }))
    .digest('hex')
}

export function chunkKnowledgeSource(source: KnowledgeSource, targetCharacters = 2200, maxCharacters = 3000) {
  const normalizedSections = source.sections.flatMap((section) => splitLongSection(section, maxCharacters))
  const groups: KnowledgeSection[][] = []
  let current: KnowledgeSection[] = []
  let currentLength = 0

  for (const section of normalizedSections) {
    const sectionLength = section.heading.length + section.content.length + 4
    if (current.length && currentLength + sectionLength > maxCharacters) {
      groups.push(current)
      current = []
      currentLength = 0
    }
    current.push(section)
    currentLength += sectionLength
    if (currentLength >= targetCharacters) {
      groups.push(current)
      current = []
      currentLength = 0
    }
  }
  if (current.length) {
    const previous = groups.at(-1)
    const previousLength = previous?.reduce((sum, item) => sum + item.heading.length + item.content.length + 4, 0) ?? 0
    if (previous && currentLength < 900 && previousLength + currentLength <= maxCharacters * 1.15) previous.push(...current)
    else groups.push(current)
  }

  return groups.map((group) => {
    const heading = group.map((section) => section.heading).join(' / ').slice(0, 240)
    const content = normalizeKnowledgeText(group.map((section) => `${section.heading}\n${section.content}`).join('\n\n'))
    return {
      sourceType: source.sourceType,
      sourceTitle: source.sourceTitle,
      route: source.route,
      sourceUrl: source.sourceUrl,
      heading,
      content,
      contentHash: hashChunk(source, heading, content),
      tokenEstimate: estimateTokens(content),
    }
  })
}

export function buildKnowledgeChunks(sources: KnowledgeSource[]) {
  return sources.flatMap((source) => chunkKnowledgeSource(source))
}
