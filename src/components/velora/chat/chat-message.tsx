import Link from 'next/link'
import { RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { RagSource } from '@/lib/rag/types'
import { ChatSourceLinks } from './chat-source-links'

export type DisplayMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  sources?: RagSource[]
  consultation?: { label: string; url: string }
  error?: boolean
}

export function ChatMessage({ message, onRetry }: { message: DisplayMessage; onRetry?: () => void }) {
  const assistant = message.role === 'assistant'
  return (
    <div className={`flex ${assistant ? 'justify-start' : 'justify-end'}`}>
      <article
        className={`max-w-[88%] overflow-hidden rounded-[var(--radius-lg)] px-4 py-3 text-sm leading-6 ${
          assistant
            ? `border bg-surface-primary text-text-secondary shadow-soft ${message.error ? 'border-amber-500/35' : 'border-border-subtle'}`
            : 'bg-velora-navy text-white'
        }`}
      >
        <p className="whitespace-pre-wrap break-words">{message.content}</p>
        {message.sources ? <ChatSourceLinks sources={message.sources} /> : null}
        {message.consultation ? (
          <Button variant="brand" size="sm" asChild className="mt-3 w-full">
            <Link href={message.consultation.url}>{message.consultation.label}</Link>
          </Button>
        ) : null}
        {message.error && onRetry ? (
          <Button type="button" variant="outline" size="sm" className="mt-3" onClick={onRetry}>
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Retry
          </Button>
        ) : null}
      </article>
    </div>
  )
}
