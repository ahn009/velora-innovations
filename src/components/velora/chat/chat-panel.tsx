'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUp, LoaderCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import type { ChatResponse } from '@/lib/rag/types'
import { ChatMessage, type DisplayMessage } from './chat-message'

const genericPrompts = [
  'What can Velora automate?',
  'Which solution fits my business?',
  'How much does implementation cost?',
  'Can Velora work with my existing CRM?',
  'How does the implementation process work?',
]

function promptsForRoute(route: string) {
  if (route === '/pricing') return ['What affects implementation cost?', ...genericPrompts.slice(1, 3)]
  if (route === '/industries/home-services') return ['How can Velora handle missed service calls?', 'Can it check my service area?', 'How does implementation work?']
  if (route === '/industries/dental') return ['How can this reduce front-desk workload?', 'Can it help schedule appointments?', 'What stays with practice staff?']
  if (route === '/industries/law-firms') return ['What parts of client intake can be automated?', 'Can it schedule consultations?', 'What are the legal boundaries?']
  if (route === '/resources/integrations') return ['Can Velora connect with my CRM?', 'What affects integration compatibility?', 'How are integration failures handled?']
  return genericPrompts
}

const welcome: DisplayMessage = {
  id: 'welcome',
  role: 'assistant',
  content: 'Hi — I can help with Velora’s services, pricing, industries, integrations, security, and implementation process. What would you like to know?',
}

type ApiError = { message?: string; retryable?: boolean }

export function ChatPanel({ open, onOpenChange, route }: { open: boolean; onOpenChange: (open: boolean) => void; route: string }) {
  const [messages, setMessages] = useState<DisplayMessage[]>([welcome])
  const [draft, setDraft] = useState('')
  const [loading, setLoading] = useState(false)
  const [lastQuestion, setLastQuestion] = useState('')
  const abortRef = useRef<AbortController | null>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const prompts = useMemo(() => promptsForRoute(route), [route])

  useEffect(() => {
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior })
  }, [messages, loading])

  useEffect(() => () => abortRef.current?.abort(), [])

  async function ask(question: string) {
    const message = question.trim()
    if (!message || loading) return
    setDraft('')
    setLastQuestion(message)
    setLoading(true)
    const history = messages
      .filter((item) => item.id !== 'welcome' && !item.error)
      .slice(-8)
      .map((item) => ({ role: item.role, content: item.content }))
    setMessages((current) => [...current.filter((item) => !item.error), { id: crypto.randomUUID(), role: 'user', content: message }])

    const controller = new AbortController()
    abortRef.current = controller
    const clientTimeout = window.setTimeout(() => controller.abort(), 22_000)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ message, history, route, website: '' }),
        signal: controller.signal,
      })
      const result = await response.json().catch(() => ({})) as ChatResponse & ApiError
      if (!response.ok || !result.answer) throw Object.assign(new Error(result.message || 'Unable to answer right now.'), { retryable: result.retryable })
      setMessages((current) => [...current, {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: result.answer,
        sources: result.sources,
        consultation: result.consultation,
      }])
    } catch (error) {
      const timedOut = error instanceof Error && error.name === 'AbortError'
      setMessages((current) => [...current, {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: timedOut
          ? 'The response took too long. Please try again.'
          : error instanceof Error ? error.message : 'Velora Assistant is temporarily unavailable.',
        error: true,
      }])
    } finally {
      window.clearTimeout(clientTimeout)
      abortRef.current = null
      setLoading(false)
      window.setTimeout(() => textareaRef.current?.focus(), 0)
    }
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) abortRef.current?.abort()
    onOpenChange(nextOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        id="velora-chat-dialog"
        className="inset-x-0 bottom-0 left-0 top-auto flex h-[min(92dvh,760px)] max-h-[calc(100dvh-0.5rem)] w-full max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden rounded-b-none rounded-t-[var(--radius-xl)] border-border-subtle bg-background-secondary p-0 shadow-2xl [&_[data-slot=dialog-close]]:text-white [&_[data-slot=dialog-close]]:hover:bg-white/10 sm:inset-x-auto sm:bottom-5 sm:left-auto sm:right-5 sm:h-[min(720px,calc(100dvh-2.5rem))] sm:w-[420px] sm:max-w-[calc(100vw-2.5rem)] sm:rounded-[var(--radius-xl)]"
        aria-describedby="velora-chat-description"
      >
        <DialogHeader className="shrink-0 border-b border-white/10 bg-velora-navy px-5 py-4 pr-14 text-left">
          <DialogTitle className="text-base text-white">Velora Assistant</DialogTitle>
          <DialogDescription id="velora-chat-description" className="text-xs leading-5 text-white/65">
            Ask about services, pricing, industries, integrations, or how implementation works.
          </DialogDescription>
        </DialogHeader>

        <div
          ref={listRef}
          className="min-h-0 flex-1 space-y-4 overflow-x-hidden overflow-y-auto px-4 py-5 sm:px-5"
          aria-live="polite"
          aria-busy={loading}
        >
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} onRetry={message.error ? () => ask(lastQuestion) : undefined} />
          ))}
          {messages.length === 1 ? (
            <div className="flex flex-wrap gap-2" aria-label="Suggested questions">
              {prompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  className="rounded-full border border-border-subtle bg-surface-primary px-3 py-2 text-left text-xs font-medium leading-4 text-text-secondary shadow-soft hover:border-brand-primary/30 hover:text-brand-hover"
                  onClick={() => ask(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
          ) : null}
          {loading ? (
            <div className="flex justify-start">
              <div className="inline-flex items-center gap-2 rounded-[var(--radius-lg)] border border-border-subtle bg-surface-primary px-4 py-3 text-xs text-text-muted shadow-soft">
                <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> Checking Velora’s published information…
              </div>
            </div>
          ) : null}
        </div>

        <form
          className="shrink-0 border-t border-border-subtle bg-surface-primary px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-5"
          onSubmit={(event) => { event.preventDefault(); void ask(draft) }}
        >
          <div className="flex items-end gap-2 rounded-[var(--radius-lg)] border border-border-strong bg-background-primary p-2 focus-within:border-brand-primary/45 focus-within:ring-2 focus-within:ring-brand-primary/15">
            <textarea
              ref={textareaRef}
              value={draft}
              onChange={(event) => setDraft(event.target.value.slice(0, 2000))}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault()
                  void ask(draft)
                }
              }}
              rows={1}
              maxLength={2000}
              aria-label="Ask Velora a question"
              placeholder="Ask Velora…"
              className="max-h-28 min-h-10 min-w-0 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-text-primary outline-none placeholder:text-text-muted"
              disabled={loading}
            />
            <Button type="submit" variant="brand" size="icon" className="h-10 w-10 shrink-0" disabled={loading || !draft.trim()} aria-label="Send question">
              <ArrowUp className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
          <p className="mt-2 text-center text-[10px] leading-4 text-text-muted">AI assistant using Velora’s published information. Don’t share sensitive information.</p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
