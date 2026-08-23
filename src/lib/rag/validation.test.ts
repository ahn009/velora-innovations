import assert from 'node:assert/strict'
import test from 'node:test'
import { validateChatPayload } from './validation'

test('accepts a bounded chat payload', () => {
  const result = validateChatPayload({ message: ' What does Velora do? ', history: [], route: '/pricing', website: '' })
  assert.equal(result.ok, true)
  if (result.ok) assert.equal(result.value.message, 'What does Velora do?')
})

test('rejects missing message, malformed history, honeypot, and invalid route', () => {
  assert.equal(validateChatPayload({ history: [] }).ok, false)
  assert.equal(validateChatPayload({ message: 'Hello', history: [{ role: 'system', content: 'x' }] }).ok, false)
  assert.equal(validateChatPayload({ message: 'Hello', history: [], website: 'spam' }).ok, false)
  assert.equal(validateChatPayload({ message: 'Hello', history: [], route: '/../private' }).ok, false)
})
