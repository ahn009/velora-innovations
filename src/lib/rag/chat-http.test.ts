import assert from 'node:assert/strict'
import test from 'node:test'
import { createChatPostHandler } from './chat-http'
import { ChatRateLimitError } from './chat-service'
import { RagProviderError } from './provider'
import type { ChatResponse } from './types'

const success: ChatResponse = { answer: 'Velora builds bounded AI workflows.', sources: [], requestId: 'test-request' }

function handler(process: Parameters<typeof createChatPostHandler>[0]['process'], maxJsonBytes = 24 * 1024) {
  return createChatPostHandler({
    maxJsonBytes,
    debug: false,
    assertConfig: () => undefined,
    isSameOrigin: () => true,
    fingerprint: () => 'fingerprint',
    process,
    createRequestId: () => 'test-request',
    log: () => undefined,
  })
}

function request(body: string, headers: HeadersInit = {}) {
  return new Request('http://localhost/api/chat', { method: 'POST', body, headers: { 'content-type': 'application/json', ...headers } })
}

test('chat HTTP handler returns 200 for a valid request', async () => {
  const response = await handler(async () => success)(request(JSON.stringify({ message: 'What does Velora do?', history: [] })))
  assert.equal(response.status, 200)
  assert.equal((await response.json()).answer, success.answer)
})

test('chat HTTP handler returns 400 for malformed JSON', async () => {
  const response = await handler(async () => success)(request('{bad json'))
  assert.equal(response.status, 400)
})

test('chat HTTP handler returns 413 for an oversized request', async () => {
  const response = await handler(async () => success, 20)(request(JSON.stringify({ message: 'x'.repeat(50) })))
  assert.equal(response.status, 413)
})

test('chat HTTP handler returns 429 for rate limiting', async () => {
  const response = await handler(async () => { throw new ChatRateLimitError() })(request(JSON.stringify({ message: 'Hello', history: [] })))
  assert.equal(response.status, 429)
})

test('chat HTTP handler returns controlled timeout and provider failures', async () => {
  const timeout = await handler(async () => { throw new RagProviderError('timeout') })(request(JSON.stringify({ message: 'Hello', history: [] })))
  assert.equal(timeout.status, 504)
  assert.equal((await timeout.json()).retryable, true)

  const failure = await handler(async () => { throw new RagProviderError('embedding') })(request(JSON.stringify({ message: 'Hello', history: [] })))
  assert.equal(failure.status, 503)
  assert.match((await failure.json()).message, /temporarily unavailable/i)
})
