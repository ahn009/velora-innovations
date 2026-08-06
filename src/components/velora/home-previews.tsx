import Link from 'next/link'
import {
  ArrowRight,
  Bot,
  Building2,
  CalendarCheck2,
  CheckCircle2,
  ClipboardCheck,
  Headphones,
  Home,
  MessageSquareText,
  Route,
  Wrench,
} from 'lucide-react'

function PreviewHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-velora-emerald">{eyebrow}</p>
      <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-[-0.025em] sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-muted-foreground">{description}</p>
    </div>
  )
}

const solutions = [
  {
    icon: Headphones,
    title: 'AI Receptionist',
    description: 'Structure routine enquiries, capture lead details and escalate exceptions to a person.',
  },
  {
    icon: MessageSquareText,
    title: 'Lead Qualification',
    description: 'Collect approved qualification details and route each enquiry using clear business rules.',
  },
  {
    icon: CalendarCheck2,
    title: 'Appointment Coordination',
    description: 'Connect suitable calendar access with booking, confirmation and human exception paths.',
  },
] as const

export function HomeSolutionsPreview() {
  return (
    <section className="bg-muted/35 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <PreviewHeading
          eyebrow="Solutions"
          title="Start With One Customer Workflow"
          description="Choose a bounded process with clear inputs, permissions and a responsible human owner before expanding automation."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {solutions.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-velora-emerald/10 text-velora-emerald">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/solutions" className="group inline-flex items-center text-sm font-medium text-velora-emerald hover:text-velora-emerald-dark">
            Explore all solutions
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

const industries = [
  { icon: Wrench, title: 'Home Services', description: 'Enquiry intake, service-area checks and appointment coordination.' },
  { icon: Building2, title: 'Property Management', description: 'Tenant request triage, viewing enquiries and team routing.' },
  { icon: Home, title: 'Real Estate', description: 'Lead intake, approved qualification and agent handoff.' },
] as const

export function HomeIndustriesPreview() {
  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-velora-emerald">Industries</p>
            <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-[-0.025em] sm:text-4xl">
              Built for Enquiry-Driven Service Teams
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              The strongest fit is a business with repeatable customer questions, defined scheduling rules and a clear escalation owner.
            </p>
            <Link href="/industries" className="group mt-6 inline-flex items-center text-sm font-medium text-velora-emerald hover:text-velora-emerald-dark">
              Review industry fit
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {industries.map(({ icon: Icon, title, description }) => (
              <div key={title} className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-velora-amber/10 text-velora-amber">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-semibold tracking-tight">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const demoSignals = [
  'Scripted example—not a live customer system',
  'Shows qualification and human escalation',
  'Does not store the messages entered',
] as const

export function HomeDemoPreview() {
  return (
    <section id="demo" className="scroll-mt-20 bg-velora-navy py-16 text-white sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-10">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-velora-emerald-light">Guided Demo</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-[-0.025em] sm:text-4xl">
            Preview a Clear Customer Handoff
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-white/70">
            See how a service enquiry can move from intake to approved qualification and then to a responsible person.
          </p>
          <ul className="mt-6 space-y-3">
            {demoSignals.map((signal) => (
              <li key={signal} className="flex items-start gap-3 text-sm leading-6 text-white/75">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-velora-emerald-light" aria-hidden="true" />
                {signal}
              </li>
            ))}
          </ul>
          <Link
            href="/resources/demo"
            className="group mt-7 inline-flex h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-medium text-velora-navy transition-[background-color,transform] duration-150 hover:bg-white/90 active:scale-[0.97]"
          >
            Open the guided demo
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-black/20 sm:p-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-velora-emerald text-white">
              <Bot className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-medium">Example enquiry assistant</p>
              <p className="text-xs text-white/55">Scripted preview</p>
            </div>
          </div>
          <div className="space-y-3 py-5" aria-label="Example conversation">
            <p className="ml-auto max-w-[84%] rounded-2xl rounded-br-md bg-white px-4 py-3 text-sm leading-6 text-velora-navy">
              Can someone help with an urgent repair tomorrow?
            </p>
            <p className="max-w-[88%] rounded-2xl rounded-bl-md bg-white/10 px-4 py-3 text-sm leading-6 text-white/80">
              I can collect the service address, repair type and preferred time, then route the request to the on-call coordinator.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 border-t border-white/10 pt-4 text-xs text-white/60">
            <span className="rounded-full bg-white/[0.07] px-3 py-1.5">Collect</span>
            <span className="rounded-full bg-white/[0.07] px-3 py-1.5">Check rules</span>
            <span className="rounded-full bg-white/[0.07] px-3 py-1.5">Escalate</span>
          </div>
        </div>
      </div>
    </section>
  )
}

const steps = [
  { icon: ClipboardCheck, number: '01', title: 'Map the workflow', description: 'Define the current process, constraints, data and responsible people.' },
  { icon: Bot, number: '02', title: 'Build and test', description: 'Connect approved systems and test normal, failure and escalation paths.' },
  { icon: Route, number: '03', title: 'Launch in scope', description: 'Monitor agreed signals and expand only when the evidence supports it.' },
] as const

export function HomeProcessPreview() {
  return (
    <section className="bg-muted/35 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <PreviewHeading
          eyebrow="How It Works"
          title="A Controlled Path From Idea to Operation"
          description="Each engagement starts with a real workflow and ends with documented ownership, testing and next steps."
        />
        <ol className="grid gap-5 md:grid-cols-3">
          {steps.map(({ icon: Icon, number, title, description }) => (
            <li key={number} className="relative rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-velora-violet/10 text-velora-violet">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="font-mono text-xs text-muted-foreground">{number}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 text-center">
          <Link href="/how-it-works" className="group inline-flex items-center text-sm font-medium text-velora-emerald hover:text-velora-emerald-dark">
            See the complete delivery process
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export function HomePricingPreview() {
  return (
    <section className="bg-velora-navy py-16 text-white sm:py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_auto] lg:px-10">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-velora-emerald-light">Pricing</p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-[-0.025em] sm:text-4xl">Implementation Starts at $2,500 USD</h2>
          <p className="mt-4 text-base leading-7 text-white/75">
            Final scope depends on channels, integrations, testing and risk requirements. Management, provider usage and third-party software are quoted separately.
          </p>
        </div>
        <Link
          href="/pricing"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-white px-5 text-sm font-medium text-velora-navy transition-[background-color,transform] duration-150 hover:bg-white/90 active:scale-[0.97]"
        >
          Review pricing details
          <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
