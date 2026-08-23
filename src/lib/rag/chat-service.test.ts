import assert from 'node:assert/strict'
import test from 'node:test'
import { ChatRateLimitError, processChat, type ChatDependencies } from './chat-service'
import type { RetrievedChunk } from './types'

const chunk: RetrievedChunk = {
  id: 'private-id',
  sourceTitle: 'Pricing',
  sourceUrl: 'https://www.veloraautomations.com/pricing',
  route: '/pricing',
  heading: 'Foundation',
  content: 'Foundation starts from $2,500 USD. Final price depends on scope.',
  similarity: 0.82,
}

function dependencies(overrides: Partial<ChatDependencies> = {}): ChatDependencies {
  return {
    rateLimit: async () => true,
    embed: async () => [[0.1, 0.2]],
    retrieve: async () => [chunk],
    generate: async (_instructions, _history, input) => {
      assert.match(input, /Foundation starts from \$2,500/)
      return 'Foundation implementation starts from $2,500, with final pricing based on scope.'
    },
    ...overrides,
  }
}

test('returns a grounded answer with clean source links and no chunk IDs', async () => {
  const result = await processChat({ message: 'How much does it cost?', history: [], route: '/pricing' }, 'request-1', 'fingerprint', dependencies(), { debug: false })
  assert.match(result.answer, /\$2,500/)
  assert.equal(result.sources[0].title, 'Pricing')
  assert.equal(JSON.stringify(result).includes('private-id'), false)
})

test('returns a controlled no-match answer without calling generation', async () => {
  let generated = false
  const result = await processChat({ message: 'Which Fortune 500 companies use Velora?', history: [] }, 'request-2', 'fingerprint', dependencies({
    retrieve: async () => [],
    generate: async () => { generated = true; return 'invented' },
  }))
  assert.equal(generated, false)
  assert.match(result.answer, /don’t have enough approved Velora information/i)
  assert.equal(result.sources[0].url, '/resources')
})

test('returns consultation context for commercial intent', async () => {
  const result = await processChat({ message: 'I want this for my business.', history: [], route: '/industries/dental' }, 'request-3', 'fingerprint', dependencies())
  assert.equal(result.consultation?.url, '/consultation?source=website-assistant&industry=dental')
})

test('enforces the rate limit before model calls', async () => {
  await assert.rejects(
    processChat({ message: 'What does Velora do?', history: [] }, 'request-4', 'fingerprint', dependencies({ rateLimit: async () => false })),
    ChatRateLimitError,
  )
})
