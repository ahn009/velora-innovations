import assert from 'node:assert/strict'
import test from 'node:test'
import { buildKnowledgeChunks } from './chunking'
import { getApprovedKnowledgeSources } from './knowledge-sources'

test('approved source ingestion is deterministic, complete, and duplicate-free', () => {
  const sources = getApprovedKnowledgeSources()
  const chunks = buildKnowledgeChunks(sources)
  const routes = new Set(sources.map((source) => source.route))
  const hashes = new Set(chunks.map((chunk) => chunk.contentHash))

  assert.equal(sources.length, 31)
  assert.equal(chunks.length, 32)
  assert.equal(routes.size, 31)
  assert.equal(hashes.size, chunks.length)
  assert.ok(routes.has('/'))
  assert.ok(routes.has('/pricing'))
  assert.ok(routes.has('/resources/security'))
  assert.ok(routes.has('/consultation'))
  assert.ok(chunks.every((chunk) => chunk.content.trim() && chunk.sourceUrl.startsWith('https://www.veloraautomations.com')))
})

test('approved knowledge never references private operational sources', () => {
  const content = buildKnowledgeChunks(getApprovedKnowledgeSources())
    .map((chunk) => chunk.content)
    .join('\n')
    .toLowerCase()

  for (const forbidden of ['database_url=', 'service_role_key=', 'make webhook payload', 'latest customer leads']) {
    assert.equal(content.includes(forbidden), false, `approved knowledge unexpectedly contains ${forbidden}`)
  }
})
