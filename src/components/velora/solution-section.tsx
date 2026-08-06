'use client'

import {
  Headphones,
  UserCheck,
  CalendarCheck,
  MessageSquare,
  MailCheck,
  Workflow,
  ArrowRight,
} from 'lucide-react'
import {
  Section,
  SectionHeading,
  StaggerContainer,
  StaggerItem,
  FadeIn,
} from './section'
import { MeshGradient } from './mesh-gradient'
import { useConsultation } from './consultation-provider'
import { SolutionWorkflowVisual } from './workflow-visuals'

const solutions = [
  {
    id: 'ai-receptionist',
    icon: Headphones,
    title: 'AI Receptionist',
    description:
      'Can answer approved routine questions, capture information, route requests and coordinate appointments.',
  },
  {
    id: 'lead-qualification',
    icon: UserCheck,
    title: 'Lead Qualification Agent',
    description:
      'Asks relevant questions, identifies qualified opportunities and sends them to the correct team member.',
  },
  {
    id: 'appointment-booking',
    icon: CalendarCheck,
    title: 'Appointment Agent',
    description:
      'Can check suitable availability, coordinate appointments, reschedule and send approved reminders.',
  },
  {
    id: 'customer-support',
    icon: MessageSquare,
    title: 'Customer-Support Agent',
    description:
      'Answers approved questions, retrieves information and escalates complex cases to the right person.',
  },
  {
    id: 'follow-up',
    icon: MailCheck,
    title: 'Follow-Up Agent',
    description:
      "Sends structured follow-up across approved channels according to the business's process.",
  },
  {
    id: 'workflow-automation',
    icon: Workflow,
    title: 'Workflow Automation',
    description:
      'Moves approved information between business tools and triggers defined next actions when integrations allow it.',
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
                      id={solution.id}
                      type="button"
                      className="group relative flex h-full w-full scroll-mt-24 flex-col overflow-hidden rounded-2xl border border-velora-border/50 bg-white p-6 text-left shadow-[0_1px_3px_rgba(0,0,0,0.03)] transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-velora-emerald/25 hover:shadow-xl hover:shadow-velora-emerald/8 active:scale-[0.99] dark:border-border/50 dark:bg-card dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)]"
                      onClick={openConsultation}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-velora-emerald/10 text-velora-emerald transition-[background-color,color] duration-150 group-hover:bg-velora-emerald group-hover:text-white">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-semibold mt-4">
                        {solution.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                        {solution.description}
                      </p>
                      <div className="relative mt-auto flex items-center gap-2 pt-5 text-velora-emerald/80 transition-colors duration-150 group-hover:text-velora-emerald">
                        <span className="inline-block text-sm font-medium">
                          Discuss this workflow
                        </span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5" aria-hidden="true" />
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
                <SolutionWorkflowVisual />
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Mobile-only visual — displayed above cards */}
        <div className="lg:hidden mt-10 relative z-10">
          <FadeIn delay={0.15}>
            <div className="relative rounded-2xl overflow-hidden shadow-lg shadow-black/[0.06] dark:shadow-black/[0.25] border border-velora-border/30 dark:border-border/30">
              <SolutionWorkflowVisual />
            </div>
          </FadeIn>
        </div>
    </Section>
  )
}
