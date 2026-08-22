'use client'

import { useEffect, useId, useState } from 'react'
import { ArrowRight, Bot, Check, ChevronRight, CircleAlert, MessageSquareText, Phone, RotateCcw, UserRound, Workflow } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Section, SectionHeading } from './section'
import { useConsultation } from './consultation-provider'

type DemoMode = 'voice' | 'chat' | 'workflow'
type DemoScenario = 'home-services' | 'dental' | 'law' | 'real-estate' | 'property-management' | 'ecommerce'
type DemoScenarioConfig = {
  id: DemoScenario
  label: string
  customer: string
  agent: string
  steps: string[]
  boundary: string
}

const modes: { id: DemoMode; label: string; icon: typeof Phone }[] = [
  { id: 'voice', label: 'Voice Agent', icon: Phone },
  { id: 'chat', label: 'Chat Agent', icon: MessageSquareText },
  { id: 'workflow', label: 'Automation Workflow', icon: Workflow },
]

const scenarios: DemoScenarioConfig[] = [
  { id: 'home-services', label: 'Home Services', customer: 'My AC stopped working and I need someone tomorrow.', agent: 'I can collect the service address, check the service area and urgency rules, then offer an eligible next step.', steps: ['Service request', 'Location collected', 'Urgency rule', 'Availability checked', 'Appointment or dispatch', 'CRM and team notification'], boundary: 'No equipment diagnosis or independent safety determination.' },
  { id: 'dental', label: 'Dental', customer: 'I am a new patient and would like to schedule a cleaning.', agent: 'I can collect the administrative details and route a supported appointment request to the practice.', steps: ['New patient', 'Service identified', 'Administrative details', 'Appointment type', 'Booking request', 'Front desk handoff'], boundary: 'No diagnosis, treatment recommendation, or clinical intake.' },
  { id: 'law', label: 'Law Firm', customer: 'I need to speak with someone about an immigration matter.', agent: 'I can collect broad administrative intake details and help request a consultation with the firm.', steps: ['Matter category', 'Administrative intake', 'Configured review', 'Consultation route', 'Intake record', 'Attorney or staff handoff'], boundary: 'No legal advice, case strategy, or attorney-client relationship.' },
  { id: 'real-estate', label: 'Real Estate', customer: 'I am thinking about selling my home in the next three months.', agent: 'I can collect the property location, timeline, and contact details before routing the inquiry.', steps: ['Seller intent', 'Property location', 'Timeline', 'Contact details', 'Consultation request', 'CRM assignment'], boundary: 'No valuation, financing advice, or negotiation.' },
  { id: 'property-management', label: 'Property Management', customer: 'My kitchen sink has been leaking since this morning.', agent: 'I can collect the unit and issue details and route the request using the property manager’s priority rules.', steps: ['Maintenance request', 'Property and unit', 'Issue category', 'Priority rule', 'Maintenance record', 'Team escalation'], boundary: 'No independent emergency, safety, lease, or legal determination.' },
  { id: 'ecommerce', label: 'E-commerce', customer: 'Where is my order?', agent: 'I can use an approved order reference for a permitted status lookup and route exceptions to support.', steps: ['Order intent', 'Approved identity check', 'Status lookup', 'Customer response', 'Exception check', 'Support handoff'], boundary: 'No access without authorization and no invented status, stock, or refund.' },
]

function StatusPill({ children, tone = 'green' }: { children: React.ReactNode; tone?: 'green' | 'slate' }) {
  const toneClasses = tone === 'green' ? 'bg-brand-primary/10 text-brand-hover' : 'bg-background-secondary text-text-secondary'
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${toneClasses}`}><span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />{children}</span>
}

function ActionTimeline({ active, items }: { active: number; items: string[] }) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-border-subtle bg-background-secondary p-4 sm:p-5">
      <div className="flex items-center justify-between"><p className="eyebrow">Behind the conversation</p><span className="text-xs text-text-muted">{Math.min(active + 1, items.length)}/{items.length}</span></div>
      <ol className="mt-5 space-y-3">{items.map((item, index) => { const complete = index <= active; return <li key={item} className="flex items-start gap-3 text-sm"><span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] ${complete ? 'border-brand-primary bg-brand-primary text-brand-primary-foreground' : 'border-border-strong text-text-muted'}`}>{complete ? <Check className="h-3 w-3" aria-hidden="true" /> : index + 1}</span><span className={complete ? 'text-text-primary' : 'text-text-muted'}>{item}</span></li> })}</ol>
      <div className="mt-5 rounded-[var(--radius-md)] border border-brand-primary/20 bg-brand-primary/5 p-3 text-xs leading-5 text-text-secondary"><span className="font-semibold text-text-primary">Control point:</span> if confidence or permissions are insufficient, route the conversation to a person with a summary.</div>
    </div>
  )
}

function ConversationDemo({ mode, step, scenario }: { mode: 'voice' | 'chat'; step: number; scenario: DemoScenarioConfig }) {
  const isVoice = mode === 'voice'
  return (
    <div className="grid gap-4 md:grid-cols-[1fr_0.8fr]">
      <div className="rounded-[var(--radius-lg)] border border-border-subtle bg-background-primary p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3 border-b border-border-subtle pb-4">
          <div className="flex items-center gap-3"><span className={`flex h-10 w-10 items-center justify-center rounded-full ${isVoice ? 'bg-brand-primary text-brand-primary-foreground' : 'bg-brand-primary/10 text-brand-hover'}`}>{isVoice ? <Phone className="h-4 w-4" aria-hidden="true" /> : <Bot className="h-5 w-5" aria-hidden="true" />}</span><div><p className="text-sm font-semibold text-text-primary">{scenario.label} {isVoice ? 'call' : 'inquiry'}</p><p className="text-xs text-text-muted">Scripted example</p></div></div>
          <StatusPill>{isVoice && step < 1 ? 'Ringing' : 'Connected'}</StatusPill>
        </div>
        <div className="space-y-3 py-5" aria-label={`Scripted ${scenario.label} ${mode} transcript`}>
          <p className="max-w-[88%] rounded-2xl rounded-bl-md bg-background-secondary px-4 py-3 text-sm leading-6 text-text-secondary"><span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-text-muted">Customer</span>{scenario.customer}</p>
          <p className={`ml-auto max-w-[88%] rounded-2xl rounded-br-md bg-brand-primary/10 px-4 py-3 text-sm leading-6 text-text-primary transition-opacity ${step >= 2 ? 'opacity-100' : 'opacity-55'}`}><span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-brand-hover">AI agent</span>{scenario.agent}</p>
          <p className={`max-w-[88%] rounded-2xl rounded-bl-md bg-background-secondary px-4 py-3 text-sm leading-6 text-text-secondary transition-opacity ${step >= 3 ? 'opacity-100' : 'opacity-55'}`}><span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-text-muted">Next action</span>{scenario.steps.slice(1, 4).join(' → ')}</p>
        </div>
        <div className="flex flex-wrap gap-2 border-t border-border-subtle pt-4"><StatusPill tone="slate">{scenario.steps[0]}</StatusPill><StatusPill tone={step >= 3 ? 'green' : 'slate'}>{step >= 3 ? 'Next step ready' : 'Review pending'}</StatusPill></div>
      </div>
      <ActionTimeline active={step} items={scenario.steps.slice(0, 4)} />
    </div>
  )
}

function WorkflowDemo({ step, scenario }: { step: number; scenario: DemoScenarioConfig }) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-border-subtle bg-background-primary p-4 sm:p-6">
      <div className="flex items-center justify-between gap-3 border-b border-border-subtle pb-4"><div><p className="text-sm font-semibold text-text-primary">{scenario.label} workflow</p><p className="mt-1 text-xs text-text-muted">What happens behind the visible conversation</p></div><StatusPill tone={step >= scenario.steps.length - 1 ? 'green' : 'slate'}>{step >= scenario.steps.length - 1 ? 'Complete' : 'Running'}</StatusPill></div>
      <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{scenario.steps.map((item, index) => <li key={item} className={`relative rounded-[var(--radius-md)] border p-4 transition-colors ${index <= step ? 'border-brand-primary/30 bg-brand-primary/5' : 'border-border-subtle bg-background-secondary'}`}><span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">{String(index + 1).padStart(2, '0')}</span><p className={`mt-2 text-sm font-medium ${index <= step ? 'text-text-primary' : 'text-text-muted'}`}>{item}</p>{index < scenario.steps.length - 1 && <ChevronRight className="absolute -right-2 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 text-brand-primary sm:block" aria-hidden="true" />}</li>)}</ol>
      <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-text-secondary"><span className="inline-flex items-center gap-1.5"><Workflow className="h-4 w-4 text-brand-primary" aria-hidden="true" /> Connected system</span><span className="inline-flex items-center gap-1.5"><UserRound className="h-4 w-4 text-brand-primary" aria-hidden="true" /> Human owner</span><span className="inline-flex items-center gap-1.5"><CircleAlert className="h-4 w-4 text-amber-600" aria-hidden="true" /> {scenario.boundary}</span></div>
    </div>
  )
}

export function DemoSection() {
  const { openConsultation } = useConsultation()
  const [mode, setMode] = useState<DemoMode>('voice')
  const [scenarioId, setScenarioId] = useState<DemoScenario>('home-services')
  const [step, setStep] = useState(2)
  const tabId = useId()
  const scenario = scenarios.find((item) => item.id === scenarioId) ?? scenarios[0]

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (media.matches) return
    const totalSteps = mode === 'workflow' ? scenario.steps.length : 5
    const timer = window.setInterval(() => setStep((current) => (current + 1) % totalSteps), 2600)
    return () => window.clearInterval(timer)
  }, [mode, scenario.steps.length])

  return (
    <Section id="demo" background="muted">
      <SectionHeading label="Interactive Demo" title="See a guided AI workflow move from inquiry to action" description="Explore a scripted example of how an agent can understand a business request, apply rules, update systems, and hand off when a person should take over." />
      <div className="mx-auto max-w-6xl rounded-[var(--radius-xl)] border border-border-subtle bg-surface-primary p-3 shadow-card sm:p-5 lg:p-6">
        <div className="mb-5 rounded-[var(--radius-lg)] border border-brand-primary/20 bg-brand-primary/[0.04] p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><p className="eyebrow">Choose a business scenario</p><p className="mt-1 text-sm leading-6 text-text-secondary">The interface stays consistent; the operational questions, handoff, and workflow change by industry.</p></div><p className="max-w-sm text-xs leading-5 text-text-muted">Boundary: {scenario.boundary}</p></div>
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Business scenarios">{scenarios.map((item) => <button key={item.id} type="button" aria-pressed={scenarioId === item.id} onClick={() => { setScenarioId(item.id); setStep(0) }} className={`min-h-10 rounded-full border px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${scenarioId === item.id ? 'border-brand-primary bg-brand-primary text-brand-primary-foreground' : 'border-border-subtle bg-surface-primary text-text-secondary hover:border-brand-primary/30'}`}>{item.label}</button>)}</div>
          <div className="mt-4 grid gap-2 sm:grid-cols-3">{scenario.steps.slice(0, 3).map((item, index) => <div key={item} className="rounded-[var(--radius-md)] bg-surface-primary p-3 text-xs font-medium text-text-secondary"><span className="mr-2 text-brand-hover">0{index + 1}</span>{item}</div>)}</div>
        </div>
        <div className="flex flex-col gap-4 border-b border-border-subtle pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="text-xs font-semibold uppercase tracking-wider text-text-muted">Guided Demo</p><p className="mt-1 text-sm text-text-secondary">{scenario.label} scripted preview · not a live customer system</p></div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Demo modes">{modes.map(({ id, label, icon: Icon }) => <button key={id} id={`${tabId}-${id}-tab`} type="button" role="tab" aria-selected={mode === id} aria-controls={`${tabId}-${id}-panel`} tabIndex={mode === id ? 0 : -1} onClick={() => { setMode(id); setStep(0) }} onKeyDown={(event) => { const index = modes.findIndex((item) => item.id === mode); const next = event.key === 'ArrowRight' ? (index + 1) % modes.length : event.key === 'ArrowLeft' ? (index - 1 + modes.length) % modes.length : event.key === 'Home' ? 0 : event.key === 'End' ? modes.length - 1 : -1; if (next >= 0) { event.preventDefault(); const nextMode = modes[next].id; setMode(nextMode); setStep(0); document.getElementById(`${tabId}-${nextMode}-tab`)?.focus() } }} className={`inline-flex min-h-10 items-center gap-2 rounded-[var(--radius-md)] px-3 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 ${mode === id ? 'bg-text-primary text-white' : 'bg-background-secondary text-text-secondary hover:bg-border-subtle'}`}><Icon className="h-4 w-4" aria-hidden="true" />{label}</button>)}</div>
        </div>
        <div className="pt-5" role="tabpanel" id={`${tabId}-${mode}-panel`} aria-labelledby={`${tabId}-${mode}-tab`}>{mode === 'workflow' ? <WorkflowDemo step={step} scenario={scenario} /> : <ConversationDemo mode={mode} step={step} scenario={scenario} />}</div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border-subtle pt-4"><p className="max-w-xl text-xs leading-5 text-text-muted">A production system would be configured around approved knowledge, defined permissions, vendor capabilities, and a client-specific escalation path.</p><div className="flex flex-wrap gap-2"><Button type="button" variant="outline" size="sm" onClick={() => setStep(0)}><RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />Replay</Button><Button type="button" variant="brand" size="sm" onClick={openConsultation}>Discuss a workflow <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></Button></div></div>
      </div>
    </Section>
  )
}
