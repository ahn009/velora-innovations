'use client'

import { Search, PenTool, Hammer, TestTube, Rocket, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
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

/** SVG connector definitions for the 3x2 desktop grid.
 *  ViewBox maps to the grid area with preserveAspectRatio="none"
 *  so coordinates stretch proportionally to the actual grid size. */
const connectors = [
  // 1→2 horizontal (top row)
  {
    path: 'M 312 94 L 348 94',
    arrow: '348 94, 336 88, 336 100',
  },
  // 2→3 horizontal (top row)
  {
    path: 'M 652 94 L 688 94',
    arrow: '688 94, 676 88, 676 100',
  },
  // 3→4 curved (row 1 right → row 2 left)
  {
    path: 'M 840 182 C 500 182, 160 195, 160 218',
    arrow: '160 218, 154 206, 166 206',
  },
  // 4→5 horizontal (bottom row)
  {
    path: 'M 312 306 L 348 306',
    arrow: '348 306, 336 300, 336 312',
  },
  // 5→6 horizontal (bottom row)
  {
    path: 'M 652 306 L 688 306',
    arrow: '688 306, 676 300, 676 312',
  },
] as const

function StepConnectors() {
  return (
    <svg
      viewBox="0 0 1000 400"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    >
      {connectors.map((conn, i) => (
        <g key={i}>
          {/* Connector line */}
          <motion.path
            d={conn.path}
            fill="none"
            stroke="var(--velora-emerald)"
            strokeWidth={2}
            strokeLinecap="round"
            opacity={0.3}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.6,
              delay: 0.8 + i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
          {/* Arrow head */}
          <motion.polygon
            points={conn.arrow}
            fill="var(--velora-emerald)"
            opacity={0.3}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 0.3, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.3,
              delay: 0.8 + i * 0.12 + 0.4,
              ease: 'easeOut',
            }}
            style={{ transformOrigin: conn.arrow.split(',')[0].trim() + ' ' + conn.arrow.split(',')[1].trim() }}
          />
        </g>
      ))}
    </svg>
  )
}

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

      {/* Desktop: 3x2 grid with animated connectors */}
      <div className="hidden lg:block relative">
        {/* Decorative vertical timeline line on the left */}
        <div
          className="absolute left-[38px] top-8 bottom-8 w-px bg-velora-emerald/20 hidden md:block"
          aria-hidden="true"
        />
        <StaggerContainer className="grid grid-cols-3 gap-6">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <StaggerItem key={step.title}>
                <div className="relative bg-white dark:bg-card rounded-xl border border-velora-border dark:border-border p-6 h-full group hover:border-velora-emerald/25 hover:shadow-lg hover:shadow-velora-emerald/5 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
                  <span className="text-6xl font-bold text-velora-emerald/20 leading-none select-none absolute top-4 left-6">
                    {step.number}
                  </span>
                  <div className="relative z-10 pt-10">
                    <div className="w-10 h-10 rounded-lg bg-velora-emerald/10 text-velora-emerald flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
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
        <StepConnectors />
      </div>
    </Section>
  )
}
