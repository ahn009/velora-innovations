'use client'

import { ArrowRight, CalendarCheck2, Headphones, Home, type LucideIcon } from 'lucide-react'
import { Section, SectionHeading } from './section'
import { useConsultation } from './consultation-provider'

type WorkflowExample = {
  industry: string
  icon: LucideIcon
  before: string[]
  withVelora: string[]
  handoff: string
}

const examples: WorkflowExample[] = [
  {
    industry: 'Home Services',
    icon: Headphones,
    before: ['Incoming call', 'Voicemail', 'Manual callback', 'Unstructured notes', 'Manual booking'],
    withVelora: ['Incoming call', 'AI receptionist', 'Issue, location, and urgency', 'Eligible calendar check', 'CRM record and team route'],
    handoff: 'Safety questions, uncertain requests, and exceptions remain with the service team.',
  },
  {
    industry: 'Real Estate',
    icon: Home,
    before: ['New property inquiry', 'Shared inbox', 'Manual first reply', 'Preferences copied into notes', 'Agent follow-up'],
    withVelora: ['New property inquiry', 'Approved first response', 'Preferences captured', 'Viewing request coordinated', 'CRM assignment'],
    handoff: 'Advice, valuation, negotiation, and relationship ownership remain with the agent.',
  },
  {
    industry: 'Appointment-Based Teams',
    icon: CalendarCheck2,
    before: ['Scheduling question', 'Phone or email tag', 'Manual calendar lookup', 'Confirmation message', 'Record updated later'],
    withVelora: ['Customer request', 'Approved questions answered', 'Eligibility checked', 'Available time offered', 'Confirmation and system update'],
    handoff: 'Restricted, sensitive, or unsupported requests route to the responsible team member.',
  },
]

function WorkflowColumn({ label, steps, highlighted = false }: { label: string; steps: string[]; highlighted?: boolean }) {
  return (
    <div className={`rounded-[var(--radius-lg)] border p-4 sm:p-5 ${highlighted ? 'border-brand-primary/30 bg-brand-primary/[0.045]' : 'border-border-subtle bg-background-secondary'}`}>
      <p className={`text-[10px] font-bold uppercase tracking-[0.14em] ${highlighted ? 'text-brand-hover' : 'text-text-muted'}`}>{label}</p>
      <ol className="mt-4 space-y-2.5">
        {steps.map((step, index) => (
          <li key={step} className="flex items-center gap-3 rounded-[var(--radius-sm)] bg-surface-primary px-3 py-2.5 text-sm font-medium leading-5 text-text-primary shadow-[0_1px_2px_rgb(15_23_42_/_0.04)]">
            <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${highlighted ? 'bg-brand-primary text-brand-primary-foreground' : 'bg-border-subtle text-text-secondary'}`}>
              {index + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
    </div>
  )
}

export function ResultsSection({ compact = false }: { compact?: boolean }) {
  const { openConsultation } = useConsultation()
  const visibleExamples = examples.slice(0, compact ? 1 : examples.length)

  return (
    <Section id="results" background="muted">
      <SectionHeading
        label="Example Implementation"
        title="See the workflow before and with Velora"
        description="These illustrative paths show how a repetitive process may be structured. Scope, integrations, and outcomes depend on the client’s actual systems and operating process."
      />
      <div className="mx-auto max-w-5xl space-y-6">
        {visibleExamples.map(({ industry, icon: Icon, before, withVelora, handoff }) => (
          <article key={industry} className="rounded-[var(--radius-xl)] border border-border-subtle bg-surface-primary p-5 shadow-soft sm:p-6 lg:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-brand-primary/10 text-brand-hover">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="eyebrow">Illustrative workflow</p>
                  <h3 className="mt-1 text-xl font-semibold tracking-tight text-text-primary">{industry}</h3>
                </div>
              </div>
              <span className="rounded-full bg-background-secondary px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-text-muted">Not a customer case study</span>
            </div>

            <div className="mt-6 grid items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
              <WorkflowColumn label="Before — typical manual path" steps={before} />
              <span className="mx-auto flex h-9 w-9 rotate-90 items-center justify-center rounded-full border border-brand-primary/25 bg-brand-primary/10 text-brand-hover md:rotate-0" aria-hidden="true">
                <ArrowRight className="h-4 w-4" />
              </span>
              <WorkflowColumn label="With Velora — example structure" steps={withVelora} highlighted />
            </div>

            <div className="mt-5 flex flex-col gap-4 border-t border-border-subtle pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-2xl text-xs leading-5 text-text-muted"><span className="font-semibold text-text-primary">Human control:</span> {handoff}</p>
              <button type="button" onClick={openConsultation} className="group inline-flex min-h-10 shrink-0 items-center self-start text-sm font-semibold text-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 sm:self-auto">
                Discuss a similar workflow
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
