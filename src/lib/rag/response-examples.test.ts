import assert from 'node:assert/strict'
import test from 'node:test'
import { analyzeChatRequest } from './intelligence'
import { RESPONSE_EXAMPLES, selectResponseExamples } from './response-examples'

test('contains at least 25 complete response examples', () => {
  assert.ok(RESPONSE_EXAMPLES.length >= 25)
  assert.ok(RESPONSE_EXAMPLES.every((example) => example.question && example.intent && example.idealAnswer.length > 100))
})

test('selects a small, relevant set instead of injecting the complete library', () => {
  const intelligence = analyzeChatRequest({ message: 'Can you integrate with ServiceTitan for my HVAC company?', history: [] })
  const examples = selectResponseExamples(intelligence)
  assert.ok(examples.length >= 1 && examples.length <= 3)
  assert.equal(examples[0].id, 'servicetitan-compatibility')
  assert.ok(examples.length < RESPONSE_EXAMPLES.length)
})
