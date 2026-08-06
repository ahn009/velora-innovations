'use client'

import Image from 'next/image'
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
    image: '/images/result-home-services.png',
    accent: 'velora-amber',
    gradientFrom: 'from-velora-amber/80',
    gradientVia: 'via-velora-amber/40',
    dotColor: 'bg-velora-amber',
    badgeBg: 'bg-velora-amber/10',
    badgeText: 'text-velora-amber',
    borderColor: 'hover:border-velora-amber/30',
    shadowColor: 'hover:shadow-[0_8px_30px_rgba(234,179,8,0.12)]',
    statHighlight: 'After-hours intake',
    metrics: [
      'After-hours calls captured instantly',
      'Service area qualification automated',
      'Jobs scheduled directly into system',
    ],
  },
  {
    title: 'Lead Qualification for Real Estate',
    description:
      'Illustrative workflow: a real-estate team consolidates enquiries, collects approved qualification details, and routes prospects to an available person.',
    image: '/images/result-realestate.png',
    accent: 'velora-sky',
    gradientFrom: 'from-velora-sky/80',
    gradientVia: 'via-velora-sky/40',
    dotColor: 'bg-velora-sky',
    badgeBg: 'bg-velora-sky/10',
    badgeText: 'text-velora-sky',
    borderColor: 'hover:border-velora-sky/30',
    shadowColor: 'hover:shadow-[0_8px_30px_rgba(14,165,233,0.12)]',
    statHighlight: 'Lead routing',
    metrics: [
      'Enquiry sources consolidated in one workflow',
      'Buyer intent scored and prioritized',
      'Qualified leads routed to agents',
    ],
  },
  {
    title: 'Appointment Workflow for Service Teams',
    description:
      'Illustrative workflow: an appointment-based business answers approved routine questions, checks availability, and offers a human escalation path.',
    image: '/images/solution-visual.png',
    accent: 'velora-teal',
    gradientFrom: 'from-velora-teal/80',
    gradientVia: 'via-velora-teal/40',
    dotColor: 'bg-velora-teal',
    badgeBg: 'bg-velora-teal/10',
    badgeText: 'text-velora-teal',
    borderColor: 'hover:border-velora-teal/30',
    shadowColor: 'hover:shadow-[0_8px_30px_rgba(20,184,166,0.12)]',
    statHighlight: 'Scheduling workflow',
    metrics: [
      'Approved routine questions answered consistently',
      'Availability checked and appointments scheduled',
      'Follow-up sent for unbooked enquiries',
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
        {projects.map((project, i) => (
          <ScaleIn key={project.title} delay={i * 0.08}>
            <div
              className={`
                group flex flex-col h-full bg-white dark:bg-card rounded-xl border border-velora-border dark:border-border overflow-hidden
                transition-all duration-300 ease-out
                ${project.borderColor} ${project.shadowColor}
                hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg
              `}
            >
              {/* Colored gradient bar at top of card */}
              <div className={`h-1 bg-gradient-to-r ${project.gradientFrom} ${project.gradientVia} to-transparent`} />

              {/* Dashboard image with dark navy background */}
              <div className="relative bg-velora-navy">
                <Image
                  src={project.image}
                  alt={`Illustrative ${project.title} workflow dashboard`}
                  width={1024}
                  height={1024}
                  className="w-full aspect-[4/3] object-cover rounded-t-none"
                />
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
        ))}
      </div>

    </Section>
  )
}
