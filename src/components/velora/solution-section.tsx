'use client'

import Link from 'next/link'
import { ArrowRight, Bot, CalendarCheck2, Headphones, MailCheck, MessageSquareText, Route, UserRoundCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Section, SectionHeading } from './section'

type Solution = { id: string; title: string; outcome: string; description: string; tags: string[]; icon: LucideIcon; href: string }

const solutions: Solution[] = [
  { id: 'ai-receptionist', title: 'AI Receptionist', outcome: 'Give every routine enquiry a clear next step.', description: 'Answers approved questions, captures customer details, routes requests, and escalates exceptions to your team.', tags: ['Voice', 'Web', 'SMS'], icon: Headphones, href: '/solutions/ai-receptionist' },
  { id: 'lead-qualification', title: 'Lead Qualification', outcome: 'Send the right opportunities to the right person.', description: 'Collects approved qualification details, identifies intent, and routes each enquiry using clear business rules.', tags: ['Web', 'SMS', 'CRM'], icon: UserRoundCheck, href: '/solutions/lead-qualification' },
  { id: 'appointment-automation', title: 'Appointment Automation', outcome: 'Turn suitable enquiries into confirmed times.', description: 'Checks permitted availability, books eligible appointments, sends confirmations, and keeps exceptions visible.', tags: ['Calendar', 'SMS'], icon: CalendarCheck2, href: '/solutions/appointment-automation' },
  { id: 'customer-support', title: 'Customer Support', outcome: 'Resolve routine questions with consistent answers.', description: 'Uses approved knowledge to respond, retrieves the right information, and hands complex cases to a human.', tags: ['Web', 'Email'], icon: MessageSquareText, href: '/solutions/customer-support' },
  { id: 'follow-up-automation', title: 'Follow-Up Automation', outcome: 'Keep good conversations moving.', description: 'Sends structured follow-up across approved channels based on the stage, timing, and response rules you define.', tags: ['Email', 'SMS'], icon: MailCheck, href: '/solutions/follow-up-automation' },
  { id: 'crm-automation', title: 'CRM Automation', outcome: 'Keep customer records current without duplicate entry.', description: 'Writes approved details, statuses, and next actions back to the systems your team relies on.', tags: ['CRM', 'Web'], icon: Route, href: '/solutions/crm-automation' },
  { id: 'workflow-automation', title: 'Workflow Automation', outcome: 'Connect the steps between customer touchpoints.', description: 'Moves information between supported tools and triggers defined actions while keeping ownership and boundaries clear.', tags: ['CRM', 'Email', 'Calendar'], icon: Bot, href: '/solutions/workflow-automation' },
]

export function SolutionCard({ solution }: { solution: Solution }) {
  const Icon = solution.icon
  return (
    <article id={solution.id} className="group flex h-full flex-col rounded-[var(--radius-lg)] border border-border-subtle bg-surface-primary p-5 shadow-[var(--shadow-soft)] transition-[border-color,box-shadow,transform] duration-[var(--motion-normal)] hover:-translate-y-0.5 hover:border-brand-primary/25 hover:shadow-[var(--shadow-card)]">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-brand-primary/[0.09] text-brand-primary transition-colors duration-[var(--motion-fast)] group-hover:bg-brand-primary group-hover:text-brand-primary-foreground"><Icon className="h-5 w-5" aria-hidden="true" /></span>
        <div className="flex flex-wrap justify-end gap-1.5" aria-label={`${solution.title} capabilities`}>{solution.tags.map((tag) => <span key={tag} className="rounded-full border border-border-subtle bg-surface-secondary px-2 py-1 text-[10px] font-semibold text-text-muted">{tag}</span>)}</div>
      </div>
      <h3 className="mt-5 text-base font-semibold tracking-[-0.015em] text-text-primary">{solution.title}</h3>
      <p className="mt-2 text-sm font-medium leading-5 text-brand-hover">{solution.outcome}</p>
      <p className="mt-2 text-sm leading-6 text-text-secondary">{solution.description}</p>
      <Button type="button" variant="link" asChild className="mt-auto justify-start px-0 pt-5 text-sm text-brand-hover hover:text-brand-primary"><Link href={solution.href}><span>Explore this workflow</span><ArrowRight className="h-4 w-4 transition-transform duration-[var(--motion-fast)] group-hover:translate-x-0.5" aria-hidden="true" /></Link></Button>
    </article>
  )
}

const solutionGroups = [
  { title: 'Customer Communication', ids: ['ai-receptionist', 'customer-support'] },
  { title: 'Revenue Operations', ids: ['lead-qualification', 'appointment-automation', 'follow-up-automation'] },
  { title: 'Business Operations', ids: ['crm-automation', 'workflow-automation'] },
] as const

export function SolutionSection({ variant = 'featured' }: { variant?: 'featured' | 'catalog' }) {
  const visibleSolutions = variant === 'featured' ? solutions.filter((solution) => ['ai-receptionist', 'lead-qualification', 'appointment-automation', 'workflow-automation'].includes(solution.id)) : solutions
  return (
    <Section id="solutions">
      <SectionHeading label={variant === 'catalog' ? 'Solution Catalog' : 'Featured Solutions'} title={variant === 'catalog' ? 'AI systems for the work your team handles every day' : 'A focused system for the workflow that needs attention first.'} description={variant === 'catalog' ? 'Compare customer communication, revenue operations, and business operations systems by the job they are designed to perform.' : 'Start with one bounded process, connect the tools that matter, and expand only when the workflow is tested and owned.'} />
      {variant === 'catalog' ? <div className="space-y-12">{solutionGroups.map((group) => <div key={group.title}><div className="mb-5 flex items-end justify-between gap-4"><div><p className="eyebrow">Capability group</p><h2 className="mt-2 text-2xl font-semibold tracking-tight text-text-primary">{group.title}</h2></div></div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{group.ids.map((id) => { const solution = solutions.find((item) => item.id === id); return solution ? <SolutionCard key={solution.id} solution={solution} /> : null })}</div></div>)}</div> : <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{visibleSolutions.map((solution) => <SolutionCard key={solution.id} solution={solution} />)}</div>}
      {variant === 'featured' && <div className="mt-8 text-center"><Link href="/solutions" className="group inline-flex items-center text-sm font-semibold text-brand-hover hover:text-brand-primary">Explore all solutions <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-[var(--motion-fast)] group-hover:translate-x-0.5" aria-hidden="true" /></Link></div>}
    </Section>
  )
}
