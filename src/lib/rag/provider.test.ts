import assert from 'node:assert/strict'
import { afterEach, mock, test } from 'node:test'
import { ragConfig } from './config'
import { generateGroundedAnswer, RagProviderError } from './provider'

afterEach(() => mock.restoreAll())

test('requests deliberate answer controls and accepts a completed response', async () => {
  let body: Record<string, unknown> = {}
  mock.method(globalThis, 'fetch', async (_input: string | URL | Request, init?: RequestInit) => {
    body = JSON.parse(String(init?.body)) as Record<string, unknown>
    return Response.json({
      status: 'completed',
      incomplete_details: null,
      output: [{ type: 'message', content: [{ type: 'output_text', text: 'Grounded Velora answer.' }] }],
    })
  })

  const result = await generateGroundedAnswer('instructions', [], 'question')
  assert.equal(result, 'Grounded Velora answer.')
  assert.deepEqual(body.reasoning, { effort: ragConfig.reasoningEffort })
  assert.deepEqual(body.text, { verbosity: ragConfig.responseVerbosity })
  assert.equal(body.max_output_tokens, ragConfig.maxOutputTokens)
  assert.equal(body.store, false)
})

test('rejects truncated provider output instead of showing a partial answer', async () => {
  mock.method(globalThis, 'fetch', async () => Response.json({
    status: 'incomplete',
    incomplete_details: { reason: 'max_output_tokens' },
    output: [{ type: 'message', content: [{ type: 'output_text', text: 'Requirements and boundaries:' }] }],
  }))

  await assert.rejects(
    generateGroundedAnswer('instructions', [], 'question'),
    (error: unknown) => error instanceof RagProviderError && error.category === 'invalid_response',
  )
})
