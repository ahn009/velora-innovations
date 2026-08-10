'use client'

import Link from 'next/link'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function Error({ reset }: { reset: () => void }) {
  return <main id="main-content" className="flex min-h-[70vh] items-center bg-background"><div className="mx-auto max-w-xl px-5 py-20 text-center sm:px-8"><span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-500/10 text-amber-700"><AlertTriangle className="h-6 w-6" aria-hidden="true" /></span><p className="eyebrow mt-7">Something went wrong</p><h1 className="mt-4 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">We couldn&apos;t load that experience.</h1><p className="mt-4 text-base leading-7 text-text-secondary">Try again, or return to the homepage if the problem continues.</p><div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row"><button type="button" onClick={() => reset()} className="inline-flex h-11 items-center justify-center rounded-[var(--radius-md)] bg-brand-primary px-5 text-sm font-semibold text-brand-primary-foreground hover:bg-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"><RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />Try again</button><Link href="/" className="inline-flex h-11 items-center justify-center rounded-[var(--radius-md)] border border-border-strong px-5 text-sm font-semibold text-text-primary hover:bg-background-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">Return home</Link></div></div></main>
}
