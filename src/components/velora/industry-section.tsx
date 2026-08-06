'use client'

import { Section, SectionHeading, SlideInLeft, SlideInRight } from './section'
import Image from 'next/image'

const industries = [
  {
    title: 'Home Services',
    badge: 'Home Services',
    description:
      'Capture after-hours calls, qualify service requests and schedule jobs automatically — so you never miss a lead.',
    image: '/images/industry-home-services.png',
    gradient: 'from-velora-amber/70 via-velora-amber/40 to-transparent',
    accentBg: 'bg-velora-amber',
    accentLine: 'bg-gradient-to-r from-velora-amber to-velora-amber/30',
    badgeBg: 'bg-velora-amber/20',
    badgeText: 'text-velora-amber',
    badgeBorder: 'border-velora-amber/30',
    hoverBorder: 'hover:border-velora-amber/25',
    hoverShadow: 'hover:shadow-[0_8px_30px_rgba(217,158,46,0.12)]',
  },
  {
    title: 'Dental Practices',
    badge: 'Dental',
    description:
      'Answer common patient questions, schedule appointments and follow up with unbooked enquiries — around the clock.',
    image: '/images/industry-dental.png',
    gradient: 'from-velora-teal/70 via-velora-teal/40 to-transparent',
    accentBg: 'bg-velora-teal',
    accentLine: 'bg-gradient-to-r from-velora-teal to-velora-teal/30',
    badgeBg: 'bg-velora-teal/20',
    badgeText: 'text-velora-teal',
    badgeBorder: 'border-velora-teal/30',
    hoverBorder: 'hover:border-velora-teal/25',
    hoverShadow: 'hover:shadow-[0_8px_30px_rgba(20,184,140,0.12)]',
  },
  {
    title: 'Law Firms',
    badge: 'Law',
    description:
      'Qualify new enquiries by case type, route to the right attorney and schedule consultations consistently.',
    image: '/images/industry-law.png',
    gradient: 'from-velora-violet/70 via-velora-violet/40 to-transparent',
    accentBg: 'bg-velora-violet',
    accentLine: 'bg-gradient-to-r from-velora-violet to-velora-violet/30',
    badgeBg: 'bg-velora-violet/20',
    badgeText: 'text-velora-violet',
    badgeBorder: 'border-velora-violet/30',
    hoverBorder: 'hover:border-velora-violet/25',
    hoverShadow: 'hover:shadow-[0_8px_30px_rgba(139,92,246,0.12)]',
  },
  {
    title: 'Real Estate',
    badge: 'Real Estate',
    description:
      'Qualify buyer leads, schedule viewings, answer property questions and nurture prospects through the funnel.',
    image: '/images/industry-realestate.png',
    gradient: 'from-velora-sky/70 via-velora-sky/40 to-transparent',
    accentBg: 'bg-velora-sky',
    accentLine: 'bg-gradient-to-r from-velora-sky to-velora-sky/30',
    badgeBg: 'bg-velora-sky/20',
    badgeText: 'text-velora-sky',
    badgeBorder: 'border-velora-sky/30',
    hoverBorder: 'hover:border-velora-sky/25',
    hoverShadow: 'hover:shadow-[0_8px_30px_rgba(14,165,233,0.12)]',
  },
] as const

export function IndustrySection() {
  return (
    <Section id="industries" background="muted" className="relative overflow-hidden">
      {/* Decorative blurred gradient circles */}
      <div
        className="absolute -top-32 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--color-velora-amber) 0%, transparent 70%)',
          opacity: 0.05,
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute top-1/3 -right-32 w-[450px] h-[450px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--color-velora-teal) 0%, transparent 70%)',
          opacity: 0.05,
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute -bottom-20 left-1/3 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, var(--color-velora-violet) 0%, transparent 70%)',
          opacity: 0.05,
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10">
        <SectionHeading
          label="Industries"
          title="Built for the Way Your Industry Works"
          description="Each industry has unique customer journeys, operational rhythms and compliance requirements. Our AI systems are pre-configured with industry-specific workflows so you can deploy in days, not months."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {industries.map((industry, i) => {
            const SlideComponent = i < 2 ? SlideInLeft : SlideInRight
            return (
              <SlideComponent key={industry.title}>
                <div
                  className={`
                    group relative bg-white dark:bg-card rounded-xl border border-velora-border dark:border-border overflow-hidden cursor-pointer h-full
                    transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
                    hover:-translate-y-0.5 hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-black/[0.2] shadow-sm
                    hover:border-velora-emerald/30
                    ${industry.hoverBorder} ${industry.hoverShadow}
                  `}
                >
                  {/* Image container — ~60% of card */}
                  <div className="relative h-56 sm:h-60 overflow-hidden">
                    {/* Background image */}
                    <Image
                      src={industry.image}
                      alt={industry.title}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 rounded-t-xl"
                    />
                    {/* Colored gradient overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-b ${industry.gradient} rounded-t-xl`}
                    />

                    {/* Badge on image */}
                    <div className="absolute top-4 left-4 z-10">
                      <span
                        className={`
                          inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase
                          ${industry.badgeBg} ${industry.badgeText} ${industry.badgeBorder} border
                          backdrop-blur-md
                        `}
                      >
                        {industry.badge}
                      </span>
                    </div>
                  </div>

                  {/* Content area */}
                  <div className="p-5 sm:p-6">
                    {/* Colored accent line */}
                    <div className={`${industry.accentLine} h-1 w-10 rounded-full mb-4`} />

                    <h3 className="text-lg font-semibold text-foreground tracking-[-0.01em]">
                      {industry.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-muted-foreground leading-[1.7]">
                      {industry.description}
                    </p>

                    {/* Subtle CTA arrow */}
                    <div className="mt-5 flex items-center gap-2">
                      <span
                        className={`
                          text-sm font-medium transition-all duration-300
                          ${industry.badgeText} opacity-70 group-hover:opacity-100
                        `}
                      >
                        Learn more
                      </span>
                      <svg
                        className={`
                          w-4 h-4 transition-transform duration-300
                          ${industry.badgeText} opacity-70 group-hover:opacity-100
                          group-hover:translate-x-1
                        `}
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </SlideComponent>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
