'use client'

import { useEffect, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowDown,
  Bot,
  CalendarCheck2,
  Check,
  Database,
  Mail,
  MessageSquareText,
  Phone,
  ShieldCheck,
  UserRoundCheck,
} from 'lucide-react'

const heroSteps = [
  { label: 'Incoming inquiry', detail: '“My AC stopped working. Do you have an opening tomorrow?”', icon: Phone },
  { label: 'AI receptionist', detail: 'Collecting service type, location, urgency, and preferred time.', icon: Bot },
  { label: 'Qualified lead', detail: 'Service area confirmed · Urgent · Ready to schedule', icon: UserRoundCheck },
  { label: 'Appointment booked', detail: 'Tomorrow at 10:30 AM · Customer confirmation sent', icon: CalendarCheck2 },
] as const

function WorkflowStatus({ label, value, active = false }: { label: string; value: string; active?: boolean }) {
  return (
    <div className={`rounded-[var(--radius-sm)] border px-3 py-2.5 ${active ? 'border-brand-primary/30 bg-brand-primary/[0.07]' : 'border-border-subtle bg-surface-secondary'}`}>
      <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-text-muted">{label}</p>
      <p className="mt-1 text-xs font-semibold text-text-primary">{value}</p>
    </div>
  )
}

export function HeroWorkflowVisual() {
  const [activeStep, setActiveStep] = useState(1)
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (reduceMotion) return
    const timer = window.setInterval(() => setActiveStep((step) => (step + 1) % heroSteps.length), 2800)
    return () => window.clearInterval(timer)
  }, [reduceMotion])

  const current = heroSteps[activeStep]
  const CurrentIcon = current.icon

  return (
    <div className="relative overflow-hidden rounded-[var(--radius-xl)] border border-border-subtle bg-surface-primary text-left shadow-[var(--shadow-card)]" aria-label="Illustrative AI workflow: customer inquiry to appointment booking">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,rgb(16_185_129_/_0.12),transparent_35%)]" aria-hidden="true" />
      <div className="relative p-4 sm:p-5 lg:p-6">
        <div className="flex items-start justify-between gap-4 border-b border-border-subtle pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] bg-brand-primary text-brand-primary-foreground"><CurrentIcon className="h-3.5 w-3.5" aria-hidden="true" /></span>
              <p className="text-sm font-semibold text-text-primary">Customer workflow</p>
            </div>
            <p className="mt-2 text-[11px] text-text-muted">Illustrative service inquiry · Human handoff available</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-brand-primary/20 bg-brand-primary/[0.08] px-2.5 py-1 text-[10px] font-semibold text-brand-hover"><span className="h-1.5 w-1.5 rounded-full bg-brand-primary" /> Active</span>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-center">
          <div className="rounded-[var(--radius-md)] border border-border-subtle bg-surface-secondary p-3.5">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-text-muted"><MessageSquareText className="h-3.5 w-3.5 text-brand-primary" aria-hidden="true" /> Customer</div>
            <p className="mt-3 text-xs font-medium leading-5 text-text-primary">{heroSteps[0].detail}</p>
          </div>
          <div className="hidden h-px w-8 bg-brand-primary/30 sm:block" aria-hidden="true" />
          <div className="rounded-[var(--radius-md)] border border-brand-primary/25 bg-brand-primary/[0.07] p-3.5">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-brand-hover"><Bot className="h-3.5 w-3.5" aria-hidden="true" /> AI agent</div>
            <p className="mt-3 text-xs font-medium leading-5 text-text-primary">{current.detail}</p>
          </div>
        </div>

        <div className="my-4 flex items-center gap-3 sm:hidden" aria-hidden="true"><div className="h-5 w-px bg-brand-primary/30" /><ArrowDown className="h-3 w-3 text-brand-primary" /></div>

        <div className="grid grid-cols-2 gap-2.5 sm:mt-4 sm:grid-cols-3">
          <WorkflowStatus label="Intent" value={activeStep >= 2 ? 'Service inquiry' : 'Identifying'} active={activeStep === 2} />
          <WorkflowStatus label="Calendar" value={activeStep >= 3 ? 'Booked' : 'Checking availability'} active={activeStep === 3} />
          <WorkflowStatus label="CRM" value={activeStep >= 3 ? 'Updated' : 'Ready to sync'} active={activeStep >= 3} />
        </div>

        <div className="mt-4 border-t border-border-subtle pt-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-text-muted">Workflow progress</p>
            <p className="text-[10px] font-medium text-brand-hover">{activeStep + 1} of {heroSteps.length}</p>
          </div>
          <div className="mt-3 grid grid-cols-4 gap-1.5" role="list" aria-label="Workflow progress">
            {heroSteps.map((step, index) => {
              const Icon = step.icon
              return <div key={step.label} role="listitem" className={`flex items-center gap-1.5 rounded-[var(--radius-sm)] px-2 py-2 text-[9px] font-medium ${index <= activeStep ? 'bg-brand-primary/[0.10] text-brand-hover' : 'bg-surface-secondary text-text-muted'} ${index === activeStep ? 'workflow-active-glow' : ''}`}><Icon className="h-3 w-3 shrink-0" aria-hidden="true" /><span className="hidden truncate sm:inline">{step.label}</span><span className="sm:hidden">{index + 1}</span></div>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export function SolutionWorkflowVisual() {
  const nodes = [
    { icon: MessageSquareText, label: 'Customer inquiry' },
    { icon: Bot, label: 'Approved workflow' },
    { icon: CalendarCheck2, label: 'Next action' },
    { icon: UserRoundCheck, label: 'Human escalation' },
  ] as const

  return <div className="aspect-[7/4] bg-velora-navy p-5 text-white sm:p-7"><div className="flex items-center justify-between"><div><p className="text-sm font-semibold">Customer workflow map</p><p className="mt-1 text-xs text-white/55">Scope is defined before implementation</p></div><span className="rounded-full bg-white/10 px-3 py-1 text-[10px] text-white/65">Illustrative</span></div><div className="mt-7 grid grid-cols-2 gap-3">{nodes.map(({ icon: Icon, label }, index) => <div key={label} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] p-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-velora-emerald/15 text-velora-emerald-light"><Icon className="h-4 w-4" aria-hidden="true" /></span><div><p className="text-[10px] text-white/45">Step {index + 1}</p><p className="mt-0.5 text-xs font-medium text-white/85">{label}</p></div></div>)}</div></div>
}

export function IntegrationWorkflowVisual() {
  const systems = [{ icon: Phone, label: 'Phone' }, { icon: Mail, label: 'Email' }, { icon: Database, label: 'CRM' }, { icon: CalendarCheck2, label: 'Calendar' }] as const
  return <div className="aspect-[7/4] bg-slate-50 p-5 dark:bg-slate-950 sm:p-7"><div className="text-center"><p className="text-sm font-semibold text-slate-900 dark:text-white">Verified system connections</p><p className="mt-1 text-xs text-slate-500 dark:text-white/55">Access and supported actions are checked first</p></div><div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3"><div className="space-y-2">{systems.slice(0, 2).map(({ icon: Icon, label }) => <SystemNode key={label} icon={Icon} label={label} />)}</div><span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-velora-emerald text-white shadow-lg shadow-velora-emerald/20"><Bot className="h-6 w-6" aria-hidden="true" /></span><div className="space-y-2">{systems.slice(2).map(({ icon: Icon, label }) => <SystemNode key={label} icon={Icon} label={label} />)}</div></div></div>
}

function SystemNode({ icon: Icon, label }: { icon: LucideIcon; label: string }) { return <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-2.5 text-xs font-medium text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/[0.06] dark:text-white/75"><Icon className="h-4 w-4 text-velora-emerald" aria-hidden="true" />{label}</div> }

export function SecurityControlVisual() {
  const controls = ['Approved knowledge', 'Least-privilege access', 'Human escalation', 'Retention documented']
  return <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 text-white shadow-2xl shadow-black/20"><div className="flex items-center gap-3 border-b border-white/10 pb-5"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-velora-emerald/15 text-velora-emerald-light"><ShieldCheck className="h-5 w-5" aria-hidden="true" /></span><div><p className="text-sm font-semibold">Deployment control plan</p><p className="mt-0.5 text-xs text-white/55">Defined for the actual vendors and workflow</p></div></div><ul className="mt-5 space-y-3">{controls.map((control) => <li key={control} className="flex items-center gap-3 rounded-lg bg-white/[0.05] px-3 py-2.5 text-xs text-white/75"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-velora-emerald/15 text-velora-emerald-light"><Check className="h-3 w-3" aria-hidden="true" /></span>{control}</li>)}</ul></div>
}
