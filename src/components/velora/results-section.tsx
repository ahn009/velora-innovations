'use client'

import { ArrowRight, CalendarCheck2, Headphones, Home } from 'lucide-react'
import {
  Section,
  SectionHeading,
  ScaleIn,
} from './section'

const projects = [
  {
    title: 'AI Receptionist for Home Services',
    description:
      'Illustrative workflow: a home-service company routes after-hours enquiries through structured intake, service-area checks, and scheduling.',
    icon: Headphones,
    flow: ['Enquiry', 'Service check', 'Team handoff'],
    gradientFrom: 'from-velora-amber/80',
    gradientVia: 'via-velora-amber/40',
    dotColor: 'bg-velora-amber',
    badgeBg: 'bg-velora-amber/10',
    badgeText: 'text-velora-amber',
    statHighlight: 'After-hours intake',
    metrics: [
      'After-hours enquiries enter one defined intake path',
      'Service-area rules can be checked before routing',
      'Exceptions are handed to a responsible person',
    ],
  },
  {
    title: 'Lead Qualification for Real Estate',
    description:
      'Illustrative workflow: a real-estate team consolidates enquiries, collects approved qualification details, and routes prospects to an available person.',
    icon: Home,
    flow: ['New lead', 'Approved questions', 'Agent routing'],
    gradientFrom: 'from-velora-sky/80',
    gradientVia: 'via-velora-sky/40',
    dotColor: 'bg-velora-sky',
    badgeBg: 'bg-velora-sky/10',
    badgeText: 'text-velora-sky',
    statHighlight: 'Lead routing',
    metrics: [
      'Enquiry sources can enter one structured workflow',
      'Approved qualification details are collected consistently',
      'Qualified leads are routed using agreed rules',
    ],
  },
  {
    title: 'Appointment Workflow for Service Teams',
    description:
      'Illustrative workflow: an appointment-based business answers approved routine questions, checks availability, and offers a human escalation path.',
    icon: CalendarCheck2,
    flow: ['Request', 'Availability check', 'Confirmation'],
    gradientFrom: 'from-velora-teal/80',
    gradientVia: 'via-velora-teal/40',
    dotColor: 'bg-velora-teal',
    badgeBg: 'bg-velora-teal/10',
    badgeText: 'text-velora-teal',
    statHighlight: 'Scheduling workflow',
    metrics: [
      'Approved routine questions follow one answer source',
      'Suitable availability can be checked when access allows',
      'Unbooked requests follow the agreed escalation path',
    ],
  },
] as const

export function ResultsSection() {
  return (
    <Section id="results" background="muted" className="relative overflow-hidden">
      {/* Decorative blurred gradient circles */}
      <div
        className="absolute -top-20 right-[10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, oklch(0.769 0.188 70.08 / 0.08), transparent 70%)' }}
      />
      <div
        className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, oklch(0.685 0.169 237.323 / 0.07), transparent 70%)' }}
      />
      <div
        className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, oklch(0.648 0.15 195 / 0.06), transparent 70%)' }}
      />

      <SectionHeading
        label="Illustrative Workflows"
        title="Examples of What a Carefully Scoped System Can Do"
        description="These are transparent examples, not customer case studies or performance claims. Final capabilities depend on the client's tools, permissions, data, testing, and risk requirements."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
        {projects.map((project, i) => {
          const Icon = project.icon
          return (
          <ScaleIn key={project.title} delay={i * 0.08}>
            <div
              className={`
                flex h-full flex-col overflow-hidden rounded-xl border border-velora-border bg-white shadow-sm dark:border-border dark:bg-card
              `}
            >
              {/* Colored gradient bar at top of card */}
              <div className={`h-1 bg-gradient-to-r ${project.gradientFrom} ${project.gradientVia} to-transparent`} />

              {/* Code-native workflow preview */}
              <div className="bg-velora-navy p-5 text-white">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-velora-emerald-light">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold">Illustrative workflow</p>
                    <p className="mt-0.5 text-[10px] text-white/55">Exact actions depend on system access</p>
                  </div>
                </div>
                <div className="mt-5 flex items-center gap-2">
                  {project.flow.map((step, stepIndex) => (
                    <div key={step} className="contents">
                      <span className="flex-1 rounded-lg bg-white/[0.07] px-2 py-2.5 text-center text-[10px] font-medium text-white/75">
                        {step}
                      </span>
                      {stepIndex < project.flow.length - 1 ? (
                        <ArrowRight className="h-3 w-3 shrink-0 text-white/35" aria-hidden="true" />
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>

              {/* Colored gradient line separator between image and text */}
              <div className={`h-[2px] bg-gradient-to-r ${project.gradientFrom} ${project.gradientVia} to-transparent`} />

              {/* Text content */}
              <div className="p-5 lg:p-6 flex flex-col">
                {/* Project title */}
                <h3 className="text-lg font-semibold tracking-[-0.01em] leading-snug">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground mt-2.5 leading-relaxed">
                  {project.description}
                </p>

                {/* Stat highlight pill */}
                <div className={`mt-4 inline-flex self-start items-center rounded-full ${project.badgeBg} px-4 py-2`}
                >
                  <span className={`text-[15px] font-bold ${project.badgeText}`}>
                    {project.statHighlight}
                  </span>
                </div>

                {/* Metric dots with labels */}
                <div className="mt-auto pt-5 flex flex-col gap-2.5">
                  {project.metrics.map((metric) => (
                    <div key={metric} className="flex items-center gap-2.5 text-sm">
                      <span className={`w-1.5 h-1.5 rounded-full ${project.dotColor} shrink-0`} />
                      <span className="text-foreground/80">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScaleIn>
          )
        })}
      </div>

    </Section>
  )
}
