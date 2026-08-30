'use client'

import { ArrowRight, Check, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useConsultation } from './consultation-provider'
import { HeroWorkflowVisual } from './workflow-visuals'

const capabilityItems = ['Answers customers', 'Qualifies leads', 'Books appointments', 'Updates your systems']

export function Hero() {
  const { openConsultation } = useConsultation()

  const handleScrollToDemo = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById('demo')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <section id="hero" className="relative isolate overflow-hidden border-b border-border-subtle bg-background-primary">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute -left-40 -top-48 h-[32rem] w-[32rem] rounded-full bg-brand-primary/[0.07] blur-3xl" />
        <div className="absolute -bottom-56 -right-40 h-[30rem] w-[30rem] rounded-full bg-velora-sky/[0.045] blur-3xl" />
        <div className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(rgb(15_23_42_/_0.10)_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:px-10 lg:pb-28 lg:pt-24">
        <div className="max-w-2xl">
          <p className="eyebrow">AI automation built around your workflow</p>
          <h1 className="mt-5 max-w-[12ch] text-[clamp(2.65rem,6vw,4.65rem)] font-semibold leading-[0.98] tracking-[-0.055em] text-text-primary">
            Respond faster. Operate smarter.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-text-secondary sm:text-[1.125rem] sm:leading-8">
            Velora Automations builds practical AI automation systems for customer response, lead qualification, appointment scheduling, follow-up, CRM updates, and connected business workflows.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button type="button" variant="brand" size="lg" onClick={openConsultation} className="w-full sm:w-auto">
              Request a Consultation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={handleScrollToDemo} className="w-full bg-surface-primary/70 sm:w-auto">
              See the Guided Demo
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>

          <p className="mt-4 text-xs font-medium text-text-muted">No obligation. Your workflow is reviewed before implementation.</p>

          <ul className="mt-9 grid gap-3 border-t border-border-subtle pt-6 sm:grid-cols-2" aria-label="What Velora automation can do">
            {capabilityItems.map((item) => <li key={item} className="flex items-center gap-2.5 text-sm font-medium text-text-secondary"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-primary/10 text-brand-primary"><Check className="h-3 w-3" strokeWidth={2.5} aria-hidden="true" /></span>{item}</li>)}
          </ul>
        </div>

        <div className="relative lg:pl-2">
          <div className="absolute -inset-5 -z-10 rounded-[2rem] bg-brand-primary/[0.06] blur-2xl" aria-hidden="true" />
          <HeroWorkflowVisual />
          <div className="mt-3 flex items-center justify-between gap-3 px-1 text-[11px] text-text-muted">
            <span>Illustrative workflow, not a live customer system.</span>
            <span className="hidden items-center gap-1.5 font-medium text-brand-hover sm:inline-flex"><span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />Human control included</span>
          </div>
        </div>
      </div>
    </section>
  )
}
