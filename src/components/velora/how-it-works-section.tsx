import { Search, PenTool, Hammer, TestTube, Rocket, TrendingUp } from 'lucide-react'
import { Section, SectionHeading } from './section'

const steps = [
  ['01', 'Discover', Search, 'Map goals, lead sources, software, repetitive tasks, and the moments where customers wait for a response.'],
  ['02', 'Design', PenTool, 'Define agent responsibilities, business rules, allowed actions, restricted actions, integrations, and handoff conditions.'],
  ['03', 'Build', Hammer, 'Configure the knowledge, conversation paths, CRM or calendar connections, notifications, and reporting.'],
  ['04', 'Test', TestTube, 'Run normal requests, missing information, edge cases, restricted topics, integration failures, and human handoffs.'],
  ['05', 'Launch', Rocket, 'Deploy in a controlled scope with clear ownership, team context, escalation, and early monitoring.'],
  ['06', 'Optimize', TrendingUp, 'Review conversations and outcomes, then refine knowledge, prompts, routing, and workflow rules.'],
] as const

export function HowItWorksSection() {
  return <Section id="how-it-works" background="default"><SectionHeading label="Implementation Process" title="From business workflow to working AI system" description="The work starts with a real operating process and ends with a documented, tested system your team can understand and control." />
    <ol className="relative mx-auto max-w-5xl space-y-8 before:absolute before:bottom-7 before:left-5 before:top-7 before:w-px before:bg-border-subtle sm:space-y-0 sm:before:left-1/2 sm:before:top-10 sm:before:h-[calc(100%-5rem)] sm:before:w-px">
      {steps.map(([number, title, Icon, description], index) => <li key={title} className={`relative sm:grid sm:grid-cols-2 sm:gap-10 ${index % 2 === 1 ? 'sm:[&>div:first-child]:order-2' : ''}`}>
        <div className={`flex gap-4 ${index % 2 === 1 ? 'sm:justify-start' : 'sm:justify-end'}`}><div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-primary/30 bg-surface-primary text-brand-hover shadow-soft"><Icon className="h-4 w-4" aria-hidden="true" /></div><article className={`max-w-md rounded-[var(--radius-lg)] border p-5 ${title === 'Test' ? 'border-brand-primary/30 bg-brand-primary/5' : 'border-border-subtle bg-surface-primary'}`}><div className="flex items-center justify-between gap-4"><p className="eyebrow">Stage {number}</p>{title === 'Test' && <span className="rounded-full bg-brand-primary/10 px-2.5 py-1 text-[10px] font-semibold text-brand-hover">Risk review</span>}</div><h3 className="mt-2 text-lg font-semibold tracking-tight text-text-primary">{title}</h3><p className="mt-2 text-sm leading-6 text-text-secondary">{description}</p></article></div>
      </li>)}
    </ol>
  </Section>
}
