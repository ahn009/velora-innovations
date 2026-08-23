import assert from 'node:assert/strict'
import test from 'node:test'
import { chunkKnowledgeSource, normalizeKnowledgeText } from './chunking'
import type { KnowledgeSource } from './knowledge-sources'

test('normalizes whitespace and chunks deterministically with metadata', () => {
  const source: KnowledgeSource = {
    sourceType: 'page',
    sourceTitle: 'Test Page',
    route: '/test',
    sourceUrl: 'https://www.veloraautomations.com/test',
    sections: [
      { heading: 'Overview', content: '  Approved   public information.\r\n Another sentence. ' },
      { heading: 'Boundary', content: 'No private data. '.repeat(100) },
    ],
  }
  const first = chunkKnowledgeSource(source, 300, 500)
  const second = chunkKnowledgeSource(source, 300, 500)
  assert.deepEqual(first, second)
  assert.ok(first.length >= 2)
  assert.ok(first.every((chunk) => chunk.route === '/test' && chunk.contentHash.length === 64))
  assert.equal(normalizeKnowledgeText(' a   b \r\n\r\n c '), 'a b\nc')
})
