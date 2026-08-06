import {
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

export function HeroWorkflowVisual() {
  return (
    <div className="aspect-[7/4] overflow-hidden rounded-xl bg-slate-50 p-4 text-left dark:bg-slate-950 sm:p-5">
      <div className="flex items-center justify-between border-b border-slate-200 pb-3 dark:border-white/10">
        <div>
          <p className="text-xs font-semibold text-slate-900 dark:text-white">Workflow overview</p>
          <p className="mt-0.5 text-[10px] text-slate-500 dark:text-white/55">Illustrative service enquiry</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-medium text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          In scope
        </span>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 py-5">
        <div className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-white/[0.06]">
          <MessageSquareText className="h-4 w-4 text-velora-emerald" aria-hidden="true" />
          <p className="mt-2 text-[11px] font-semibold text-slate-900 dark:text-white">New enquiry</p>
          <p className="mt-1 text-[10px] leading-4 text-slate-500 dark:text-white/55">Urgent repair requested for tomorrow</p>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-velora-emerald text-white">
          <Bot className="h-4 w-4" aria-hidden="true" />
        </div>
        <div className="rounded-xl border border-velora-emerald/25 bg-velora-emerald/[0.07] p-3">
          <UserRoundCheck className="h-4 w-4 text-velora-emerald" aria-hidden="true" />
          <p className="mt-2 text-[11px] font-semibold text-slate-900 dark:text-white">Qualified and routed</p>
          <p className="mt-1 text-[10px] leading-4 text-slate-500 dark:text-white/55">Coordinator receives the approved details</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {['Rules defined', 'Handoff included', 'Access verified'].map((label) => (
          <div key={label} className="rounded-lg bg-slate-100 px-2 py-2 text-center text-[9px] font-medium text-slate-600 dark:bg-white/[0.06] dark:text-white/60">
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}

export function SolutionWorkflowVisual() {
  const nodes = [
    { icon: MessageSquareText, label: 'Customer enquiry' },
    { icon: Bot, label: 'Approved workflow' },
    { icon: CalendarCheck2, label: 'Next action' },
    { icon: UserRoundCheck, label: 'Human escalation' },
  ] as const

  return (
    <div className="aspect-[7/4] bg-velora-navy p-5 text-white sm:p-7">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">Customer workflow map</p>
          <p className="mt-1 text-xs text-white/55">Scope is defined before implementation</p>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] text-white/65">Illustrative</span>
      </div>
      <div className="mt-7 grid grid-cols-2 gap-3">
        {nodes.map(({ icon: Icon, label }, index) => (
          <div key={label} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] p-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-velora-emerald/15 text-velora-emerald-light">
              <Icon className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[10px] text-white/45">Step {index + 1}</p>
              <p className="mt-0.5 text-xs font-medium text-white/85">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function IntegrationWorkflowVisual() {
  const systems = [
    { icon: Phone, label: 'Phone' },
    { icon: Mail, label: 'Email' },
    { icon: Database, label: 'CRM' },
    { icon: CalendarCheck2, label: 'Calendar' },
  ] as const

  return (
    <div className="aspect-[7/4] bg-slate-50 p-5 dark:bg-slate-950 sm:p-7">
      <div className="text-center">
        <p className="text-sm font-semibold text-slate-900 dark:text-white">Verified system connections</p>
        <p className="mt-1 text-xs text-slate-500 dark:text-white/55">Access and supported actions are checked first</p>
      </div>
      <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="space-y-2">
          {systems.slice(0, 2).map(({ icon: Icon, label }) => (
            <SystemNode key={label} icon={Icon} label={label} />
          ))}
        </div>
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-velora-emerald text-white shadow-lg shadow-velora-emerald/20">
          <Bot className="h-6 w-6" aria-hidden="true" />
        </span>
        <div className="space-y-2">
          {systems.slice(2).map(({ icon: Icon, label }) => (
            <SystemNode key={label} icon={Icon} label={label} />
          ))}
        </div>
      </div>
    </div>
  )
}

function SystemNode({ icon: Icon, label }: { icon: typeof Phone; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white p-2.5 text-xs font-medium text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/[0.06] dark:text-white/75">
      <Icon className="h-4 w-4 text-velora-emerald" aria-hidden="true" />
      {label}
    </div>
  )
}

export function SecurityControlVisual() {
  const controls = ['Approved knowledge', 'Least-privilege access', 'Human escalation', 'Retention documented']

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 text-white shadow-2xl shadow-black/20">
      <div className="flex items-center gap-3 border-b border-white/10 pb-5">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-velora-emerald/15 text-velora-emerald-light">
          <ShieldCheck className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-sm font-semibold">Deployment control plan</p>
          <p className="mt-0.5 text-xs text-white/55">Defined for the actual vendors and workflow</p>
        </div>
      </div>
      <ul className="mt-5 space-y-3">
        {controls.map((control) => (
          <li key={control} className="flex items-center gap-3 rounded-lg bg-white/[0.05] px-3 py-2.5 text-xs text-white/75">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-velora-emerald/15 text-velora-emerald-light">
              <Check className="h-3 w-3" aria-hidden="true" />
            </span>
            {control}
          </li>
        ))}
      </ul>
    </div>
  )
}
