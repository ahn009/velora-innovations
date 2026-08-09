'use client'

import { useEffect, useState } from 'react'
import { ArrowDown, ArrowRight, Bot, CalendarCheck2, CheckCircle2, Globe2, Mail, MessageSquareText, Phone, UserRoundCheck } from 'lucide-react'
import { Section, SectionHeading } from './section'

const channels = [{ label: 'Phone', icon: Phone }, { label: 'Website', icon: Globe2 }, { label: 'SMS', icon: MessageSquareText }, { label: 'Email', icon: Mail }]
const branches = [
  { id: 'qualified', label: 'Qualified lead', detail: 'Create a CRM record, offer a suitable calendar time, and notify the responsible team member.', steps: ['CRM updated', 'Calendar checked', 'Team notified'], icon: CheckCircle2 },
  { id: 'human', label: 'Needs human', detail: 'Pass the conversation to a person with the context already collected.', steps: ['Context attached', 'Human handoff', 'Team takes over'], icon: UserRoundCheck },
  { id: 'follow-up', label: 'Not ready', detail: 'Keep the relationship moving with a follow-up sequence approved by the business.', steps: ['Reason recorded', 'Follow-up scheduled', 'Response monitored'], icon: ArrowRight },
] as const

export function InteractiveWorkflowSection() {
  const [activeBranch, setActiveBranch] = useState(0)
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (reduceMotion) return
    const timer = window.setInterval(() => setActiveBranch((current) => (current + 1) % branches.length), 3600)
    return () => window.clearInterval(timer)
  }, [reduceMotion])

  return (
    <Section id="workflow" background="navy" className="overflow-hidden">
      <SectionHeading label="Workflow architecture" title="From First Enquiry to the Right Next Action." description="A practical automation system connects the channels customers already use to defined decisions, business tools, and human ownership." light />

      <div className="mx-auto max-w-5xl">
        <div className="grid gap-3 sm:grid-cols-4" aria-label="Entry channels">
          {channels.map(({ label, icon: Icon }) => <div key={label} className="flex items-center gap-3 rounded-[var(--radius-md)] border border-white/10 bg-white/[0.06] px-3 py-3 text-sm font-medium text-white/80"><Icon className="h-4 w-4 text-brand-primary" aria-hidden="true" />{label}</div>)}
        </div>
        <div className="flex justify-center py-3" aria-hidden="true"><ArrowDown className="h-5 w-5 text-brand-primary/70" /></div>
        <div className="mx-auto max-w-md rounded-[var(--radius-lg)] border border-brand-primary/30 bg-brand-primary/[0.12] p-4 text-center shadow-[0_0_0_4px_rgb(16_185_129_/_0.06)]"><span className="mx-auto flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-brand-primary text-brand-primary-foreground"><Bot className="h-5 w-5" aria-hidden="true" /></span><p className="mt-3 text-sm font-semibold text-white">AI agent</p><p className="mt-1 text-xs leading-5 text-white/60">Understands intent, follows approved rules, and takes only the actions in scope.</p></div>
        <div className="flex justify-center py-3" aria-hidden="true"><ArrowDown className="h-5 w-5 text-brand-primary/70" /></div>
        <div className="mx-auto max-w-md rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.06] p-4 text-center"><span className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] px-3 py-1.5 text-xs font-semibold text-white/80"><span className="h-1.5 w-1.5 rounded-full bg-brand-primary" /> Intent and qualification</span><p className="mt-3 text-xs leading-5 text-white/60">The workflow checks what the customer needs before deciding what happens next.</p></div>

        <div className="mt-8 grid gap-3 lg:grid-cols-3" role="group" aria-label="Workflow outcomes">
          {branches.map((branch, index) => { const Icon = branch.icon; const active = index === activeBranch; return <button key={branch.id} type="button" aria-pressed={active} onClick={() => setActiveBranch(index)} className={`rounded-[var(--radius-lg)] border p-4 text-left transition-[border-color,background-color,box-shadow,transform] duration-[var(--motion-normal)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/70 ${active ? 'workflow-active-glow -translate-y-0.5 border-brand-primary/45 bg-white/[0.10]' : 'border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07]'}`}><div className="flex items-center gap-3"><span className={`flex h-9 w-9 items-center justify-center rounded-[var(--radius-sm)] ${active ? 'bg-brand-primary text-brand-primary-foreground' : 'bg-white/[0.08] text-brand-primary'}`}><Icon className="h-4 w-4" aria-hidden="true" /></span><span className="text-sm font-semibold text-white">{branch.label}</span></div><p className="mt-3 text-xs leading-5 text-white/60">{branch.detail}</p><ol className="mt-4 space-y-2">{branch.steps.map((step, stepIndex) => <li key={step} className="flex items-center gap-2 text-xs text-white/75"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/[0.08] text-[10px] text-brand-primary">{stepIndex + 1}</span>{step}</li>)}</ol></button> })}
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-white/45"><CalendarCheck2 className="h-3.5 w-3.5 text-brand-primary" aria-hidden="true" /> Paths are illustrative and scoped to the systems, permissions, and rules confirmed for each engagement.</div>
      </div>
    </Section>
  )
}
