'use client'

import Image from 'next/image'
import {
  Headphones,
  UserCheck,
  CalendarCheck,
  MessageSquare,
  MailCheck,
  Workflow,
} from 'lucide-react'
import {
  Section,
  SectionHeading,
  StaggerContainer,
  StaggerItem,
  FadeIn,
} from './section'
import { CardShine } from './card-shine'
import { MeshGradient } from './mesh-gradient'
import { useConsultation } from './consultation-provider'

const solutions = [
  {
    icon: Headphones,
    title: 'AI Receptionist',
    description:
      'Answers routine calls, captures information, routes requests and schedules appointments around the clock.',
  },
  {
    icon: UserCheck,
    title: 'Lead Qualification Agent',
    description:
      'Asks relevant questions, identifies qualified opportunities and sends them to the correct team member.',
  },
  {
    icon: CalendarCheck,
    title: 'Appointment Agent',
    description:
      'Checks availability, schedules appointments, reschedules and sends reminders automatically.',
  },
  {
    icon: MessageSquare,
    title: 'Customer-Support Agent',
    description:
      'Answers approved questions, retrieves information and escalates complex cases to the right person.',
  },
  {
    icon: MailCheck,
    title: 'Follow-Up Agent',
    description:
      "Sends structured follow-up across approved channels according to the business's process.",
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description:
      'Moves information between business tools and triggers the correct next action without manual effort.',
  },
] as const

export function SolutionSection() {
  const { openConsultation } = useConsultation()

  return (
    <Section id="solutions" className="relative overflow-hidden">
        {/* Mesh gradient background — richer emerald glow */}
        <MeshGradient variant="emerald" intensity="medium" />

        <SectionHeading
          label="Our Solutions"
          title="AI Systems Designed Around Real Business Workflows"
          description="Each system addresses a specific operational bottleneck. Together, they create an automated customer journey from first enquiry to booked appointment."
        />

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start relative z-10">
          {/* Left column — solution cards (3 cols on desktop, full on mobile) */}
          <div className="lg:col-span-3">
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
              {solutions.map((solution) => {
                const Icon = solution.icon
                return (
                  <StaggerItem key={solution.title}>
                    <button
                      type="button"
                      className="relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-velora-border/50 bg-white p-6 text-left shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-velora-emerald/25 hover:shadow-xl hover:shadow-velora-emerald/8 dark:border-border/50 dark:bg-card dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)] group"
                      onClick={openConsultation}
                    >
                      <CardShine />
                      <div className="w-10 h-10 rounded-lg bg-velora-emerald/10 text-velora-emerald group-hover:bg-velora-emerald group-hover:text-white transition-all duration-300 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-semibold mt-4">
                        {solution.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                        {solution.description}
                      </p>
                      <div className="relative mt-auto pt-4 flex items-center gap-2">
                        <span className="text-sm font-medium text-velora-emerald opacity-0 group-hover:opacity-100 transition-opacity inline-block">
                          Learn more
                        </span>
                        <span className="text-sm font-medium text-velora-emerald opacity-0 group-hover:opacity-100 transition-opacity group-hover:translate-x-1 transform duration-300">
                          &rarr;
                        </span>
                      </div>
                    </button>
                  </StaggerItem>
                )
              })}
            </StaggerContainer>
          </div>

          {/* Right column — visual (desktop only) */}
          <div className="hidden lg:block lg:col-span-2 lg:sticky lg:top-32">
            <FadeIn delay={0.3}>
              <div className="relative rounded-2xl overflow-hidden shadow-lg shadow-black/[0.06] dark:shadow-black/[0.25] border border-velora-border/30 dark:border-border/30">
                <Image
                  src="/images/solution-visual.png"
                  alt="Workflow automation visualization — showing how AI agents connect customer touchpoints into a seamless automated pipeline"
                  width={1344}
                  height={768}
                  className="w-full h-auto"
                />
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Mobile-only visual — displayed above cards */}
        <div className="lg:hidden mt-10 relative z-10">
          <FadeIn delay={0.15}>
            <div className="relative rounded-2xl overflow-hidden shadow-lg shadow-black/[0.06] dark:shadow-black/[0.25] border border-velora-border/30 dark:border-border/30">
              <Image
                src="/images/solution-visual.png"
                alt="Workflow automation visualization — showing how AI agents connect customer touchpoints into a seamless automated pipeline"
                width={1344}
                height={768}
                className="w-full h-auto"
              />
            </div>
          </FadeIn>
        </div>
    </Section>
  )
}
