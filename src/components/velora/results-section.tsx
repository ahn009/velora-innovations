'use client'

import Image from 'next/image'
import {
  Section,
  SectionHeading,
  ScaleIn,
  FadeIn,
} from './section'
import { SocialShare } from './social-share'

const projects = [
  {
    title: 'AI Receptionist for Home Services',
    description:
      'A plumbing company receiving 40+ calls per day implemented an AI receptionist to handle after-hours enquiries, qualify service requests and schedule jobs.',
    image: '/images/result-home-services.png',
    accent: 'velora-amber',
    gradientFrom: 'from-velora-amber/80',
    gradientVia: 'via-velora-amber/40',
    dotColor: 'bg-velora-amber',
    badgeBg: 'bg-velora-amber/10',
    badgeText: 'text-velora-amber',
    borderColor: 'hover:border-velora-amber/30',
    shadowColor: 'hover:shadow-[0_8px_30px_rgba(234,179,8,0.12)]',
    statHighlight: '3x faster response',
    metrics: [
      'After-hours calls captured instantly',
      'Service area qualification automated',
      'Jobs scheduled directly into system',
    ],
  },
  {
    title: 'Lead Qualification for Real Estate',
    description:
      'A real estate brokerage receiving enquiries from multiple sources implemented a qualification agent to prioritize high-intent buyers and route them to available agents.',
    image: '/images/result-realestate.png',
    accent: 'velora-sky',
    gradientFrom: 'from-velora-sky/80',
    gradientVia: 'via-velora-sky/40',
    dotColor: 'bg-velora-sky',
    badgeBg: 'bg-velora-sky/10',
    badgeText: 'text-velora-sky',
    borderColor: 'hover:border-velora-sky/30',
    shadowColor: 'hover:shadow-[0_8px_30px_rgba(14,165,233,0.12)]',
    statHighlight: '24/7 coverage',
    metrics: [
      'Enquiry sources consolidated in one workflow',
      'Buyer intent scored and prioritized',
      'Qualified leads routed to agents',
    ],
  },
  {
    title: 'Appointment Automation for Dental',
    description:
      'A dental practice handling 30+ daily patient calls implemented an appointment agent to answer common questions, check availability and schedule visits.',
    image: '/images/result-dental.png',
    accent: 'velora-teal',
    gradientFrom: 'from-velora-teal/80',
    gradientVia: 'via-velora-teal/40',
    dotColor: 'bg-velora-teal',
    badgeBg: 'bg-velora-teal/10',
    badgeText: 'text-velora-teal',
    borderColor: 'hover:border-velora-teal/30',
    shadowColor: 'hover:shadow-[0_8px_30px_rgba(20,184,166,0.12)]',
    statHighlight: '92% auto-booked',
    metrics: [
      'Routine patient questions answered instantly',
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
        label="Results"
        title="Real-World Impact"
        description="Before we publish verified case studies, these sample workflows illustrate what our systems achieve."
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
                  alt={`${project.title} dashboard screenshot`}
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

      <FadeIn className="mt-10 flex flex-col items-center gap-2 relative z-10">
        <span className="text-xs text-muted-foreground">Share these results</span>
        <SocialShare
          title="Real-World Impact"
          text="See how Velora AI automation delivers measurable results for home services, real estate, and dental practices."
        />
      </FadeIn>
    </Section>
  )
}
