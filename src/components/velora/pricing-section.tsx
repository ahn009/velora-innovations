'use client'

import { Check, Layers3, Network, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useConsultation } from './consultation-provider'
import { Section, SectionHeading } from './section'

const tiers = [
  { name: 'Foundation', eyebrow: 'One focused workflow', price: 'From $2,500', note: 'USD · one-time implementation', description: 'For a business starting with one clearly scoped customer or internal process.', icon: Layers3, featured: false, features: ['One communication channel', 'One core use case', 'Knowledge and workflow setup', 'Basic integration', 'Testing and human handoff rules', 'Launch monitoring'] },
  { name: 'Growth', eyebrow: 'Connected workflows', price: 'From $5,000', note: 'USD · one-time implementation', description: 'For teams connecting multiple channels, systems, and follow-up actions.', icon: Network, featured: true, features: ['Multiple workflows and channels', 'CRM or calendar integration', 'Lead qualification and booking', 'Follow-up automation', 'Human handoff and reporting', 'Initial optimization review'] },
  { name: 'Custom', eyebrow: 'Complex operations', price: 'Custom', note: 'Based on requirements', description: 'For multi-location, multi-agent, or integration-heavy operating environments.', icon: Sparkles, featured: false, features: ['Multi-agent architecture', 'Multiple locations and routing', 'Advanced integrations', 'Custom permissions and reporting', 'Extended testing and support', 'Dedicated implementation planning'] },
] as const

export function PricingSection() {
  const { openConsultation } = useConsultation()
  return <Section id="pricing" background="default"><SectionHeading label="Engagement Model" title="Built around your workflow, not a one-size-fits-all package" description="Start with a defined implementation scope, then decide what ongoing management and optimization your operation needs." />
    <div className="grid gap-5 lg:grid-cols-3">{tiers.map(({ name, eyebrow, price, note, description, icon: Icon, features, featured }) => <article key={name} className={`relative flex h-full flex-col rounded-[var(--radius-xl)] border p-5 sm:p-6 ${featured ? 'border-brand-primary/40 bg-brand-primary/[0.04] shadow-card' : 'border-border-subtle bg-surface-primary shadow-soft'}`}>
      {featured && <span className="absolute -top-3 left-5 rounded-full bg-brand-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-primary-foreground">Best for growing teams</span>}
      <div className="flex items-start justify-between gap-4"><div><p className="eyebrow">{eyebrow}</p><h3 className="mt-3 text-xl font-semibold tracking-tight text-text-primary">{name}</h3></div><span className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-brand-primary/10 text-brand-hover"><Icon className="h-5 w-5" aria-hidden="true" /></span></div>
      <p className="mt-4 text-sm leading-6 text-text-secondary">{description}</p><div className="mt-6 border-y border-border-subtle py-4"><p className="text-2xl font-semibold tracking-tight text-text-primary">{price}</p><p className="mt-1 text-xs text-text-muted">{note}</p></div>
      <ul className="mt-5 flex-1 space-y-3" role="list">{features.map((feature) => <li key={feature} className="flex items-start gap-2.5 text-sm leading-5 text-text-secondary"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" aria-hidden="true" />{feature}</li>)}</ul><Button type="button" variant={featured ? 'brand' : 'outline'} className="mt-7 w-full" onClick={openConsultation}>Discuss {name}</Button>
    </article>)}</div>
    <div className="mx-auto mt-10 max-w-4xl rounded-[var(--radius-lg)] border border-border-subtle bg-background-secondary p-5 sm:p-6"><div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between"><div><p className="eyebrow">Commercial transparency</p><h3 className="mt-2 text-lg font-semibold text-text-primary">Know what is included before work begins.</h3></div><p className="max-w-xl text-sm leading-6 text-text-secondary">Proposals separate one-time implementation from monthly management and support, third-party usage charges, and optional custom integrations. Final scope is confirmed after reviewing the workflow.</p></div><div className="mt-5 grid gap-3 border-t border-border-subtle pt-5 text-sm text-text-secondary sm:grid-cols-3"><span>Implementation scope</span><span>Ongoing management</span><span>Provider and usage costs</span></div></div>
  </Section>
}

export function PricingTeaser() {
  return <section className="border-y border-border-subtle bg-background-secondary py-10 sm:py-12"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10"><div><p className="eyebrow">Pricing starting point</p><p className="mt-2 text-lg font-semibold text-text-primary">Projects typically begin at $2,500.</p><p className="mt-1 text-sm text-text-secondary">Scope, integrations, usage, and ongoing management shape the final proposal.</p></div><Link href="/pricing" className="inline-flex min-h-10 items-center justify-center rounded-[var(--radius-md)] border border-border-strong px-4 text-sm font-semibold text-text-primary hover:bg-surface-primary">See pricing &amp; engagement options <span className="ml-2" aria-hidden="true">→</span></Link></div></section>
}
