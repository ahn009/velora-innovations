import { ragConfig } from './config'
import type { ChatHistoryMessage, ChatInput } from './types'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function cleanMessage(value: unknown, maxLength: number) {
  if (typeof value !== 'string') return ''
  return value.trim().replace(/\r\n?/g, '\n').replace(/[\t ]+/g, ' ').slice(0, maxLength + 1)
}

export type ChatValidationResult =
  | { ok: true; value: ChatInput }
  | { ok: false; message: string }

export function validateChatPayload(input: unknown): ChatValidationResult {
  if (!isRecord(input)) return { ok: false, message: 'Invalid request body.' }
  if (cleanMessage(input.website, 200)) return { ok: false, message: 'Unable to submit this request.' }

  const message = cleanMessage(input.message, ragConfig.maxMessageLength)
  if (!message) return { ok: false, message: 'Please enter a question.' }
  if (message.length > ragConfig.maxMessageLength) return { ok: false, message: 'Your question is too long.' }

  const rawHistory = input.history === undefined ? [] : input.history
  if (!Array.isArray(rawHistory) || rawHistory.length > ragConfig.maxHistoryMessages) {
    return { ok: false, message: 'Conversation history is invalid or too long.' }
  }
  const history: ChatHistoryMessage[] = []
  let totalHistoryLength = 0
  for (const item of rawHistory) {
    if (!isRecord(item) || (item.role !== 'user' && item.role !== 'assistant')) {
      return { ok: false, message: 'Conversation history is malformed.' }
    }
    const content = cleanMessage(item.content, ragConfig.maxMessageLength)
    if (!content || content.length > ragConfig.maxMessageLength) {
      return { ok: false, message: 'Conversation history is malformed.' }
    }
    totalHistoryLength += content.length
    history.push({ role: item.role, content })
  }
  if (totalHistoryLength > ragConfig.maxMessageLength * 4) {
    return { ok: false, message: 'Conversation history is too long.' }
  }

  let route: string | undefined
  if (input.route !== undefined) {
    if (typeof input.route !== 'string' || input.route.length > 180) return { ok: false, message: 'Invalid page context.' }
    const candidate = input.route.split('?')[0].trim()
    if (!candidate.startsWith('/') || candidate.includes('..') || !/^\/[a-z0-9\-/]*$/.test(candidate)) {
      return { ok: false, message: 'Invalid page context.' }
    }
    route = candidate
  }

  return { ok: true, value: { message, history, route } }
}
