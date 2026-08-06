'use client'

import { PhoneMissed, Clock, Repeat, UserX, Unplug, Users } from 'lucide-react'
import { Section, SectionHeading, StaggerContainer, StaggerItem } from './section'
import { CardShine } from './card-shine'
import { MeshGradient } from './mesh-gradient'

const problems = [
  {
    icon: PhoneMissed,
    title: 'Missed Calls',
    description:
      'Potential customers call while the team is unavailable, busy or outside office hours. Each missed call may represent a lost opportunity.',
  },
  {
    icon: Clock,
    title: 'Slow Lead Response',
    description:
      'Qualified leads lose interest or contact a competitor before receiving a response. Speed of response directly affects conversion.',
  },
  {
    icon: Repeat,
    title: 'Repetitive Questions',
    description:
      'Employees repeatedly answer questions about pricing, availability, services and next steps. Time that could be spent on higher-value work.',
  },
  {
    icon: UserX,
    title: 'Inconsistent Follow-Up',
    description:
      'Promising enquiries disappear because follow-up depends on manual effort and memory rather than a defined process.',
  },
  {
    icon: Unplug,
    title: 'Disconnected Systems',
    description:
      'Customer information is copied manually between forms, calendars, spreadsheets and CRMs. Errors and delays follow.',
  },
  {
    icon: Users,
    title: 'Limited Team Capacity',
    description:
      'The team spends valuable time on routine coordination rather than high-value work. Growth should not require proportional hiring.',
  },
] as const

export function ProblemSection() {
  return (
    <Section id="problems" background="muted" className="relative overflow-hidden">
      {/* Mesh gradient background */}
      <MeshGradient variant="rose" intensity="subtle" />

      <SectionHeading
        label="The Problem"
        title="Where Is Your Business Losing Time and Opportunities?"
        description="Growing businesses face the same operational bottlenecks. The question is whether they continue to absorb the cost or automate the repeatable parts."
      />

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {problems.map((problem) => {
          const Icon = problem.icon
          return (
            <StaggerItem key={problem.title}>
              <div className="relative flex flex-col h-full bg-white dark:bg-card rounded-2xl border border-velora-border/50 dark:border-border/50 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.03)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)] hover:shadow-lg hover:shadow-black/[0.06] hover:border-red-200/60 dark:hover:border-red-800/40 hover:-translate-y-0.5 transition-all duration-300 group overflow-hidden">
                <CardShine />
                <div className="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-950/50 text-red-500 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold mt-4">
                  {problem.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {problem.description}
                </p>
                <div className="w-8 h-1 rounded-full bg-red-300/60 mt-auto" />
              </div>
            </StaggerItem>
          )
        })}
      </StaggerContainer>
    </Section>
  )
}
