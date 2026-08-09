'use client'

import { ArrowRight, Bot, CalendarCheck2, Headphones, MailCheck, MessageSquareText, PhoneCall, Route, UserRoundCheck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useConsultation } from './consultation-provider'
import { Section, SectionHeading } from './section'

type Solution = { id: string; title: string; outcome: string; description: string; tags: string[]; icon: LucideIcon }

const solutions: Solution[] = [
  { id: 'ai-receptionist', title: 'AI Receptionist', outcome: 'Give every routine enquiry a clear next step.', description: 'Answers approved questions, captures customer details, routes requests, and escalates exceptions to your team.', tags: ['Voice', 'Web', 'SMS'], icon: Headphones },
  { id: 'ai-voice-agent', title: 'AI Voice Agent', outcome: 'Handle more calls without adding phone coverage.', description: 'Runs defined call flows for intake, status checks, scheduling, and handoff when a conversation needs a person.', tags: ['Voice', 'Calendar'], icon: PhoneCall },
  { id: 'lead-qualification', title: 'Lead Qualification', outcome: 'Send the right opportunities to the right person.', description: 'Collects approved qualification details, identifies intent, and routes each enquiry using clear business rules.', tags: ['Web', 'SMS', 'CRM'], icon: UserRoundCheck },
  { id: 'appointment-booking', title: 'Appointment Booking', outcome: 'Turn suitable enquiries into confirmed times.', description: 'Checks permitted availability, books eligible appointments, sends confirmations, and keeps exceptions visible.', tags: ['Calendar', 'SMS'], icon: CalendarCheck2 },
  { id: 'customer-support', title: 'Customer Support', outcome: 'Resolve routine questions with consistent answers.', description: 'Uses approved knowledge to respond, retrieves the right information, and hands complex cases to a human.', tags: ['Web', 'Email'], icon: MessageSquareText },
  { id: 'follow-up-automation', title: 'Follow-Up Automation', outcome: 'Keep good conversations moving.', description: 'Sends structured follow-up across approved channels based on the stage, timing, and response rules you define.', tags: ['Email', 'SMS'], icon: MailCheck },
  { id: 'crm-automation', title: 'CRM Automation', outcome: 'Keep customer records current without duplicate entry.', description: 'Writes approved details, statuses, and next actions back to the systems your team relies on.', tags: ['CRM', 'Web'], icon: Route },
  { id: 'workflow-automation', title: 'Workflow Automation', outcome: 'Connect the steps between customer touchpoints.', description: 'Moves information between supported tools and triggers defined actions while keeping ownership and boundaries clear.', tags: ['CRM', 'Email', 'Calendar'], icon: Bot },
]

export function SolutionCard({ solution, onAction }: { solution: Solution; onAction: () => void }) {
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
      <Button type="button" variant="link" onClick={onAction} className="mt-auto justify-start px-0 pt-5 text-sm text-brand-hover hover:text-brand-primary"><span>Discuss this workflow</span><ArrowRight className="h-4 w-4 transition-transform duration-[var(--motion-fast)] group-hover:translate-x-0.5" aria-hidden="true" /></Button>
    </article>
  )
}

export function SolutionSection() {
  const { openConsultation } = useConsultation()
  return (
    <Section id="solutions">
      <SectionHeading label="Solutions" title="AI Systems Designed Around Real Business Workflows." description="Start with one bounded process, connect the tools that matter, and expand only when the workflow is tested and owned." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{solutions.map((solution) => <SolutionCard key={solution.id} solution={solution} onAction={openConsultation} />)}</div>
    </Section>
  )
}
