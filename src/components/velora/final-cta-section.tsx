'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ClipboardCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useConsultation } from './consultation-provider'
import { Section } from './section'

export function FinalCtaSection() {
  const { openConsultation } = useConsultation()
  return <Section id="consultation" background="navy" className="relative overflow-hidden py-20 sm:py-24 lg:py-28"><Image src="/images/cta-bg.png" alt="" fill sizes="100vw" className="pointer-events-none object-cover opacity-15" aria-hidden="true" /><div className="pointer-events-none absolute inset-0 bg-velora-navy/75" aria-hidden="true" /><div className="relative z-10 mx-auto max-w-3xl text-center"><span className="mx-auto flex h-12 w-12 items-center justify-center rounded-[var(--radius-lg)] border border-white/15 bg-white/10 text-brand-primary"><ClipboardCheck className="h-5 w-5" aria-hidden="true" /></span><p className="eyebrow mt-7 text-brand-primary">Next step</p><h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">See what your business can automate.</h2><p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">Book a practical consultation to review your customer journey, repetitive tasks, and current systems—and identify where automation could create the most useful operational value.</p><div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"><Button type="button" variant="brand" size="lg" onClick={openConsultation}>Book a free consultation <ArrowRight className="h-4 w-4" aria-hidden="true" /></Button><Link href="/assessment" className="inline-flex h-12 items-center justify-center rounded-[var(--radius-lg)] border border-white/20 px-5 text-sm font-semibold text-white/85 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">Take the opportunity assessment</Link></div><p className="mt-5 text-xs text-white/50">No purchase required · practical recommendations</p></div></Section>
}
