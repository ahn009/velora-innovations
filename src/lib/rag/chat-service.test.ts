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

test('uses recent visitor context and current route for follow-up retrieval', async () => {
  let retrievalQuery = ''
  await processChat({
    message: 'What would that include?',
    history: [
      { role: 'user', content: 'I run an HVAC company and miss after-hours calls.' },
      { role: 'assistant', content: 'Velora may be able to help with a bounded receptionist workflow.' },
    ],
    route: '/industries/home-services',
  }, 'request-5', 'fingerprint', dependencies({
    embed: async ([input]) => { retrievalQuery = input; return [[0.1, 0.2]] },
  }))

  assert.match(retrievalQuery, /HVAC company/)
  assert.match(retrievalQuery, /\/industries\/home-services/)
  assert.match(retrievalQuery, /What would that include/)
  assert.doesNotMatch(retrievalQuery, /bounded receptionist workflow/)
})

test('returns development-only intelligence and retrieval details', async () => {
  const result = await processChat({
    message: 'We miss HVAC calls after hours.',
    history: [],
    route: '/industries/home-services',
  }, 'request-6', 'fingerprint', dependencies(), { debug: true })

  assert.equal(result.debug?.intent, 'INDUSTRY_USE_CASE')
  assert.equal(result.debug?.industry, 'Home Services')
  assert.ok(result.debug?.inferredSolutions.includes('AI Receptionist'))
  assert.match(result.debug?.retrievalQuery ?? '', /Home Services/)
  assert.ok((result.debug?.selectedExamples.length ?? 0) <= 2)
})

test('uses remembered industry context for a commercial pricing follow-up', async () => {
  const result = await processChat({
    message: 'How much would that cost?',
    history: [{ role: 'user', content: 'I run a plumbing company and miss calls after hours.' }],
    route: '/pricing',
  }, 'request-7', 'fingerprint', dependencies())

  assert.match(result.consultation?.url ?? '', /industry=home-services/)
  assert.match(result.consultation?.url ?? '', /solution=ai-receptionist/)
})

test('handles equipment diagnosis before embeddings and uses the home-services boundary', async () => {
  let embedded = false
  const result = await processChat({ message: 'Can the AI diagnose an AC problem?', history: [] }, 'request-8', 'fingerprint', dependencies({
    embed: async () => { embedded = true; return [[0.1, 0.2]] },
  }))

  assert.equal(embedded, false)
  assert.match(result.answer, /should not independently diagnose equipment/i)
  assert.equal(result.sources[0].route, '/industries/home-services')
})
