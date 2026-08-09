'use client'

import { useEffect, useId, useState } from 'react'
import { ArrowRight, Bot, CalendarCheck2, Check, ChevronRight, CircleAlert, MessageSquareText, Phone, RotateCcw, UserRound, Workflow } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Section, SectionHeading } from './section'
import { useConsultation } from './consultation-provider'

type DemoMode = 'voice' | 'chat' | 'workflow'

const modes: { id: DemoMode; label: string; icon: typeof Phone }[] = [
  { id: 'voice', label: 'Voice Agent', icon: Phone },
  { id: 'chat', label: 'Chat Agent', icon: MessageSquareText },
  { id: 'workflow', label: 'Automation Workflow', icon: Workflow },
]

const workflowSteps = ['Message received', 'Intent identified', 'Business rules checked', 'Lead qualified', 'Calendar checked', 'Appointment created', 'CRM updated', 'Follow-up scheduled']

function StatusPill({ children, tone = 'green' }: { children: React.ReactNode; tone?: 'green' | 'slate' | 'amber' }) {
  const toneClasses = { green: 'bg-brand-primary/10 text-brand-hover', slate: 'bg-background-secondary text-text-secondary', amber: 'bg-amber-500/10 text-amber-700' }
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${toneClasses[tone]}`}><span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />{children}</span>
}

function VoiceDemo({ step }: { step: number }) {
  return <div className="grid gap-4 md:grid-cols-[1fr_0.8fr]">
    <div className="rounded-[var(--radius-lg)] border border-border-subtle bg-background-primary p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3 border-b border-border-subtle pb-4">
        <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary text-brand-primary-foreground"><Phone className="h-4 w-4" aria-hidden="true" /></span><div><p className="text-sm font-semibold text-text-primary">Incoming service call</p><p className="text-xs text-text-muted">Example conversation</p></div></div><StatusPill>{step >= 1 ? 'Connected' : 'Ringing'}</StatusPill>
      </div>
      <div className="space-y-3 py-5" aria-label="Example voice transcript">
        <p className="max-w-[88%] rounded-2xl rounded-bl-md bg-background-secondary px-4 py-3 text-sm leading-6 text-text-secondary"><span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-text-muted">Customer</span>My AC stopped cooling this afternoon. Do you have someone available tomorrow?</p>
        <p className={`ml-auto max-w-[88%] rounded-2xl rounded-br-md bg-brand-primary/10 px-4 py-3 text-sm leading-6 text-text-primary transition-opacity ${step >= 2 ? 'opacity-100' : 'opacity-55'}`}><span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-brand-hover">AI agent</span>I can check that. I&apos;ll confirm your service area and find an eligible appointment window.</p>
        <p className={`max-w-[88%] rounded-2xl rounded-bl-md bg-background-secondary px-4 py-3 text-sm leading-6 text-text-secondary transition-opacity ${step >= 3 ? 'opacity-100' : 'opacity-55'}`}><span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-text-muted">Next action</span>Collect location → check urgency → offer availability</p>
      </div>
      <div className="flex flex-wrap gap-2 border-t border-border-subtle pt-4"><StatusPill tone="slate">Service request</StatusPill><StatusPill tone={step >= 3 ? 'green' : 'slate'}>Qualification {step >= 3 ? 'ready' : 'pending'}</StatusPill></div>
    </div>
    <ActionTimeline active={step} items={['Intent: service request', 'Service area confirmed', 'Eligible slot offered', 'CRM + team notification']} />
  </div>
}

function ChatDemo({ step }: { step: number }) {
  return <div className="grid gap-4 md:grid-cols-[1fr_0.8fr]">
    <div className="rounded-[var(--radius-lg)] border border-border-subtle bg-background-primary p-4 sm:p-5">
      <div className="flex items-center justify-between border-b border-border-subtle pb-4"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-primary/10 text-brand-hover"><Bot className="h-5 w-5" aria-hidden="true" /></span><div><p className="text-sm font-semibold text-text-primary">Property consultation</p><p className="text-xs text-text-muted">Scripted example</p></div></div><StatusPill>Online</StatusPill></div>
      <div className="space-y-3 py-5" aria-label="Example chat transcript"><p className="ml-auto max-w-[88%] rounded-2xl rounded-br-md bg-brand-primary px-4 py-3 text-sm leading-6 text-brand-primary-foreground">I need to schedule a consultation about selling my property.</p><p className={`max-w-[88%] rounded-2xl rounded-bl-md bg-background-secondary px-4 py-3 text-sm leading-6 text-text-secondary ${step < 2 ? 'opacity-60' : ''}`}>Absolutely. What ZIP code is the property located in?</p><p className={`ml-auto max-w-[72%] rounded-2xl rounded-br-md bg-brand-primary/10 px-4 py-3 text-sm leading-6 text-text-primary ${step < 3 ? 'opacity-50' : ''}`}>98103</p><p className={`max-w-[88%] rounded-2xl rounded-bl-md bg-background-secondary px-4 py-3 text-sm leading-6 text-text-secondary ${step < 4 ? 'opacity-50' : ''}`}>Thanks. I found an available consultation window and can pass the qualified enquiry to the right agent.</p></div>
      <div className="flex items-center gap-2 border-t border-border-subtle pt-4 text-xs text-text-muted"><Check className="h-4 w-4 text-brand-primary" aria-hidden="true" /> Approved questions only · human handoff available</div>
    </div>
    <ActionTimeline active={step} items={['Intent: property consultation', 'Location collected', 'Lead qualified', 'Agent handoff + CRM record']} />
  </div>
}

function ActionTimeline({ active, items }: { active: number; items: string[] }) {
  return <div className="rounded-[var(--radius-lg)] border border-border-subtle bg-background-secondary p-4 sm:p-5"><div className="flex items-center justify-between"><p className="eyebrow">Behind the conversation</p><span className="text-xs text-text-muted">{Math.min(active + 1, items.length)}/{items.length}</span></div><ol className="mt-5 space-y-3">{items.map((item, index) => { const complete = index <= active; return <li key={item} className="flex items-start gap-3 text-sm"><span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] ${complete ? 'border-brand-primary bg-brand-primary text-brand-primary-foreground' : 'border-border-strong text-text-muted'}`}>{complete ? <Check className="h-3 w-3" aria-hidden="true" /> : index + 1}</span><span className={complete ? 'text-text-primary' : 'text-text-muted'}>{item}</span></li> })}</ol><div className="mt-5 rounded-[var(--radius-md)] border border-brand-primary/20 bg-brand-primary/5 p-3 text-xs leading-5 text-text-secondary"><span className="font-semibold text-text-primary">Control point:</span> if confidence or permissions are insufficient, route the conversation to a person with a summary.</div></div>
}

function WorkflowDemo({ step }: { step: number }) {
  return <div className="rounded-[var(--radius-lg)] border border-border-subtle bg-background-primary p-4 sm:p-6"><div className="flex items-center justify-between gap-3 border-b border-border-subtle pb-4"><div><p className="text-sm font-semibold text-text-primary">Appointment workflow</p><p className="mt-1 text-xs text-text-muted">What happens behind the visible conversation</p></div><StatusPill tone={step >= workflowSteps.length - 1 ? 'green' : 'slate'}>{step >= workflowSteps.length - 1 ? 'Complete' : 'Running'}</StatusPill></div><ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{workflowSteps.map((item, index) => <li key={item} className={`relative rounded-[var(--radius-md)] border p-4 transition-colors ${index <= step ? 'border-brand-primary/30 bg-brand-primary/5' : 'border-border-subtle bg-background-secondary'}`}><span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">{String(index + 1).padStart(2, '0')}</span><p className={`mt-2 text-sm font-medium ${index <= step ? 'text-text-primary' : 'text-text-muted'}`}>{item}</p>{index < workflowSteps.length - 1 && <ChevronRight className="absolute -right-2 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 text-brand-primary sm:block lg:block" aria-hidden="true" />}</li>)}</ol><div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-text-secondary"><span className="inline-flex items-center gap-1.5"><CalendarCheck2 className="h-4 w-4 text-brand-primary" aria-hidden="true" /> Calendar</span><span className="inline-flex items-center gap-1.5"><UserRound className="h-4 w-4 text-brand-primary" aria-hidden="true" /> Human owner</span><span className="inline-flex items-center gap-1.5"><CircleAlert className="h-4 w-4 text-amber-600" aria-hidden="true" /> Escalation path</span></div></div>
}

export function DemoSection() {
  const { openConsultation } = useConsultation()
  const [mode, setMode] = useState<DemoMode>('chat')
  const [step, setStep] = useState(2)
  const tabId = useId()

  useEffect(() => { const media = window.matchMedia('(prefers-reduced-motion: reduce)'); if (media.matches) return; const timer = window.setInterval(() => setStep((current) => (current + 1) % (mode === 'workflow' ? workflowSteps.length : 5)), 2600); return () => window.clearInterval(timer) }, [mode])
  const reset = () => setStep(mode === 'workflow' ? 0 : 0)
  return <Section id="demo" background="muted"><SectionHeading label="Interactive Demo" title="See an AI workflow move from enquiry to action" description="Explore a scripted example of how an agent can understand a business request, apply rules, update systems, and hand off when a person should take over." />
    <div className="mx-auto max-w-6xl rounded-[var(--radius-xl)] border border-border-subtle bg-surface-primary p-3 shadow-card sm:p-5 lg:p-6">
      <div className="flex flex-col gap-4 border-b border-border-subtle pb-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-wider text-text-muted">Interactive Demo</p><p className="mt-1 text-sm text-text-secondary">Scripted preview · not a live customer system</p></div><div className="flex flex-wrap gap-2" role="tablist" aria-label="Demo modes">{modes.map(({ id, label, icon: Icon }) => <button key={id} id={`${tabId}-${id}-tab`} type="button" role="tab" aria-selected={mode === id} aria-controls={`${tabId}-${id}-panel`} tabIndex={mode === id ? 0 : -1} onClick={() => { setMode(id); setStep(0) }} onKeyDown={(event) => { const index = modes.findIndex((item) => item.id === mode); const next = event.key === 'ArrowRight' ? (index + 1) % modes.length : event.key === 'ArrowLeft' ? (index - 1 + modes.length) % modes.length : event.key === 'Home' ? 0 : event.key === 'End' ? modes.length - 1 : -1; if (next >= 0) { event.preventDefault(); const nextMode = modes[next].id; setMode(nextMode); setStep(0); document.getElementById(`${tabId}-${nextMode}-tab`)?.focus() } }} className={`inline-flex min-h-10 items-center gap-2 rounded-[var(--radius-md)] px-3 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 ${mode === id ? 'bg-text-primary text-white' : 'bg-background-secondary text-text-secondary hover:bg-border-subtle'}`}><Icon className="h-4 w-4" aria-hidden="true" />{label}</button>)}</div></div>
      <div className="pt-5" role="tabpanel" id={`${tabId}-${mode}-panel`} aria-labelledby={`${tabId}-${mode}-tab`}>{mode === 'voice' && <VoiceDemo step={step} />}{mode === 'chat' && <ChatDemo step={step} />}{mode === 'workflow' && <WorkflowDemo step={step} />}</div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border-subtle pt-4"><p className="max-w-xl text-xs leading-5 text-text-muted">A production system would be configured around approved knowledge, defined permissions, vendor capabilities, and a client-specific escalation path.</p><div className="flex flex-wrap gap-2"><Button type="button" variant="outline" size="sm" onClick={reset}><RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />Replay</Button><Button type="button" variant="brand" size="sm" onClick={openConsultation}>Discuss a workflow <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></Button></div></div>
    </div>
  </Section>
}
