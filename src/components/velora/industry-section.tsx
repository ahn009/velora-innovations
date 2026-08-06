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
    title: 'Property Management',
    badge: 'Property',
    description:
      'Collect tenant and prospect enquiries, categorize requests, schedule viewings and route urgent issues to a person.',
    image: '/images/industry-realestate.png',
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
          title="Focused on Customer-Facing Service Workflows"
          description="We start with a narrow workflow, verify the available tools and permissions, and define where a person must take over. These examples show the initial markets we support."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
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
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
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

                    <p className={`mt-5 text-sm font-medium ${industry.badgeText}`}>
                      Scope confirmed during consultation
                    </p>
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
