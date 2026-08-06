'use client'

import { Search, PenTool, Hammer, TestTube, Rocket, TrendingUp } from 'lucide-react'
import { Section, SectionHeading, StaggerContainer, StaggerItem } from './section'

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Discover',
    description:
      'Review business goals, customer journeys, software and operational bottlenecks with your team.',
  },
  {
    number: '02',
    icon: PenTool,
    title: 'Design',
    description:
      'Map the workflow, define agent responsibilities and identify escalation rules.',
  },
  {
    number: '03',
    icon: Hammer,
    title: 'Build',
    description:
      'Configure the AI agent, integrations, knowledge sources and reporting.',
  },
  {
    number: '04',
    icon: TestTube,
    title: 'Test',
    description:
      'Test normal requests, edge cases, failures, handoffs and restricted topics.',
  },
  {
    number: '05',
    icon: Rocket,
    title: 'Launch',
    description:
      'Deploy the system in controlled stages with monitoring.',
  },
  {
    number: '06',
    icon: TrendingUp,
    title: 'Optimize',
    description:
      'Review performance and improve prompts, routing, knowledge and workflows.',
  },
] as const

export function HowItWorksSection() {
  return (
    <Section id="how-it-works" className="relative">
      {/* Subtle dot-grid texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage:
            'radial-gradient(circle, oklch(0.178 0.032 261.85 / 0.6) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      {/* Subtle background accents */}
      <div className="absolute top-20 left-0 w-64 h-64 rounded-full bg-velora-sky/[0.08] pointer-events-none" style={{ filter: 'blur(100px)' }} />
      <div className="absolute bottom-20 right-0 w-72 h-72 rounded-full bg-velora-amber/[0.06] pointer-events-none" style={{ filter: 'blur(100px)' }} />
      <SectionHeading
        label="Process"
        title="From Discovery to Ongoing Optimization"
        description="Every implementation follows a structured process designed to reduce risk, maintain quality and deliver measurable results."
      />

      {/* Mobile: vertical timeline */}
      <StaggerContainer className="lg:hidden flex flex-col gap-6">
        {steps.map((step) => {
          const Icon = step.icon
          return (
            <StaggerItem key={step.title}>
              <div className="relative flex gap-4">
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-lg bg-velora-emerald/10 text-velora-emerald flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="w-px flex-1 bg-velora-emerald/15 mt-2" />
                </div>
                <div className="pb-8">
                  <span className="text-6xl font-bold text-velora-emerald/20 leading-none select-none">
                    {step.number}
                  </span>
                  <h3 className="text-base font-semibold mt-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </StaggerItem>
          )
        })}
      </StaggerContainer>

      {/* Desktop: numbered 3x2 process grid */}
      <div className="hidden lg:block relative">
        <StaggerContainer className="grid grid-cols-3 gap-6">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <StaggerItem key={step.title}>
                <div className="relative h-full overflow-hidden rounded-xl border border-velora-border bg-white p-6 shadow-sm dark:border-border dark:bg-card">
                  <span className="text-6xl font-bold text-velora-emerald/20 leading-none select-none absolute top-4 left-6">
                    {step.number}
                  </span>
                  <div className="relative z-10 pt-10">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-velora-emerald/10 text-velora-emerald">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-semibold mt-3">{step.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </div>
    </Section>
  )
}
