import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import type { RagSource } from '@/lib/rag/types'

export function ChatSourceLinks({ sources }: { sources: RagSource[] }) {
  if (sources.length === 0) return null
  return (
    <div className="mt-3 border-t border-border-subtle pt-3">
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-muted">Sources</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {sources.map((source) => (
          <Link
            key={`${source.url}-${source.title}`}
            href={source.url}
            className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-border-subtle bg-surface-primary px-3 py-1 text-xs font-semibold text-text-secondary hover:border-brand-primary/35 hover:text-brand-hover"
          >
            {source.title}
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </div>
  )
}
