import { AlertTriangle, BookOpenCheck, Eye, FileText, KeyRound, LockKeyhole, MessageSquareMore, ShieldCheck, UserRoundCheck } from 'lucide-react'
import { Section, SectionHeading } from './section'

const controls = [
  ['Human handoff', 'Complex, sensitive, or uncertain conversations can be transferred with a useful summary.', UserRoundCheck],
  ['Approved knowledge', 'Agents can work from documented business information rather than an undefined knowledge base.', BookOpenCheck],
  ['Access controls', 'Permissions are limited to the actions and systems the workflow actually requires.', KeyRound],
  ['Conversation logs', 'Relevant interactions can be reviewed according to the selected channels and vendor settings.', FileText],
  ['Monitoring', 'Owners can agree the signals and review points that matter before launch.', Eye],
  ['Restricted actions', 'The system can be told what it must not answer, change, promise, or approve.', LockKeyhole],
  ['Error handling', 'Uncertain output or integration failure should trigger a safe fallback, not an uncontrolled action.', AlertTriangle],
  ['Data handling', 'Retention, access, and vendor requirements are reviewed as part of implementation.', ShieldCheck],
] as const

function HandoffVisual() {
  return <div className="rounded-[var(--radius-xl)] border border-white/10 bg-white/[0.06] p-4 sm:p-5"><div className="flex items-center justify-between border-b border-white/10 pb-4"><div><p className="text-sm font-semibold text-white">Human-control example</p><p className="mt-1 text-xs text-white/55">A scoped handoff, not an AI dead end</p></div><span className="inline-flex items-center gap-1.5 rounded-full bg-brand-primary/15 px-2.5 py-1 text-[11px] font-semibold text-brand-primary"><span className="h-1.5 w-1.5 rounded-full bg-brand-primary" /> Monitored</span></div><div className="space-y-3 py-5"><div className="rounded-[var(--radius-md)] bg-white/[0.07] p-3 text-sm text-white/75"><span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-white/45">Customer</span>I have a question outside the standard service options.</div><div className="flex items-center gap-2 text-xs font-semibold text-brand-primary"><span className="h-px flex-1 bg-brand-primary/30" />Rule or confidence trigger<span className="h-px flex-1 bg-brand-primary/30" /></div><div className="rounded-[var(--radius-md)] border border-brand-primary/30 bg-brand-primary/10 p-3"><div className="flex items-center gap-2 text-sm font-semibold text-white"><UserRoundCheck className="h-4 w-4 text-brand-primary" aria-hidden="true" /> Human assistance required</div><p className="mt-2 text-xs leading-5 text-white/65">The team receives the conversation context, collected details, and reason for escalation.</p></div></div><div className="grid grid-cols-2 gap-2 border-t border-white/10 pt-4 text-xs text-white/60"><span className="inline-flex items-center gap-1.5"><MessageSquareMore className="h-4 w-4 text-brand-primary" /> Summary sent</span><span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-brand-primary" /> Action paused</span></div></div>
}

export function SecuritySection({ compact = false }: { compact?: boolean }) {
  return <Section id="security" background="navy"><SectionHeading label="Security & Human Control" title="Automation with clear boundaries and a human owner" description="You decide what the system knows, what it can do, what it cannot do, and when a person must take over." light />
    <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16"><div className="grid gap-2 sm:grid-cols-2">{controls.slice(0, compact ? 4 : controls.length).map(([title, description, Icon]) => <div key={title} className="flex gap-3 rounded-[var(--radius-md)] p-3 transition-colors hover:bg-white/[0.05]"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-white/10 text-brand-primary"><Icon className="h-4 w-4" aria-hidden="true" /></span><div><h3 className="text-sm font-semibold text-white">{title}</h3><p className="mt-1 text-xs leading-5 text-white/60">{description}</p></div></div>)}</div><HandoffVisual /></div><p className="mt-10 border-t border-white/10 pt-5 text-xs leading-5 text-white/50">Security and privacy requirements are reviewed during implementation. Additional compliance, vendor, and data-handling review may be required for sensitive workflows.</p>
  </Section>
}
