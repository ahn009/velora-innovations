import assert from 'node:assert/strict'
import test from 'node:test'
import { analyzeChatRequest } from './intelligence'
import { buildSystemPrompt } from './prompt'
import { RESPONSE_EXAMPLES, selectResponseExamples } from './response-examples'

test('builds a focused HVAC prompt with brand, workflow, boundary, and selected examples', () => {
  const intelligence = analyzeChatRequest({ message: 'I run an HVAC company and miss calls after 5 PM.', history: [] })
  const examples = selectResponseExamples(intelligence)
  const prompt = buildSystemPrompt(intelligence, examples)

  assert.match(prompt, /Velora Innovations designs practical AI automation systems/)
  assert.match(prompt, /Home Services context/)
  assert.match(prompt, /No equipment diagnosis/)
  assert.match(prompt, /hvac-missed-calls|HVAC company/i)
  assert.ok(examples.length <= 2)
  assert.ok(prompt.length < RESPONSE_EXAMPLES.map((example) => example.idealAnswer).join('\n').length)
})

test('injects approved pricing facts only for pricing intent', () => {
  const pricing = analyzeChatRequest({ message: 'How much does it cost?', history: [] })
  const general = analyzeChatRequest({ message: 'What does Velora do?', history: [] })
  assert.match(buildSystemPrompt(pricing, selectResponseExamples(pricing)), /Foundation starts from \$2,500/)
  assert.doesNotMatch(buildSystemPrompt(general, selectResponseExamples(general)), /Foundation starts from \$2,500/)
})
