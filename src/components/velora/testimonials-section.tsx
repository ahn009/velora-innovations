'use client'

import { useEffect, useRef, useCallback } from 'react'
import { Star } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Section, SectionHeading, SlideInLeft, SlideInRight } from '@/components/velora/section'
import { MeshGradient } from './mesh-gradient'

const testimonials = [
  {
    name: 'Marcus Rivera',
    role: 'CEO, Rivera Plumbing',
    avatar: '/images/avatar-1.png',
    quote:
      "We were losing 30+ calls a week after hours. Now every single one gets an intelligent response and most turn into booked jobs.",
    metric: '85% after-hours capture rate',
    color: 'amber' as const,
  },
  {
    name: 'Dr. Sarah Chen',
    role: 'Owner, Bright Smile Dental',
    avatar: '/images/avatar-2.png',
    quote:
      'Our front desk was overwhelmed with routine questions. The AI agent handles them all and only escalates what truly needs a human.',
    metric: '40% reduction in phone volume',
    color: 'teal' as const,
  },
  {
    name: "James O'Brien",
    role: "Managing Partner, O'Brien & Associates",
    avatar: '/images/avatar-3.png',
    quote:
      'Lead qualification used to take our paralegals hours every week. Now it happens instantly and the quality is consistently high.',
    metric: '3x faster lead response',
    color: 'violet' as const,
  },
  {
    name: 'Priya Kapoor',
    role: 'Broker, Prime Realty Group',
    avatar: '/images/avatar-4.png',
    quote:
      "Buyer enquiries from 5 different channels now flow into one system. No lead falls through the cracks anymore.",
    metric: '2.4x more qualified showings',
    color: 'sky' as const,
  },
  {
    name: 'David Thornton',
    role: 'COO, HomePro Services',
    avatar: '/images/avatar-5.png',
    quote:
      'The ROI was clear within the first month. Our booking rate jumped and our team spends time on actual service work instead of admin.',
    metric: 'ROI positive in 3 weeks',
    color: 'emerald' as const,
  },
  {
    name: 'Sarah Mitchell',
    role: 'Practice Manager, Mitchell Dental Group',
    avatar: '/images/avatar-6.png',
    quote:
      'The AI receptionist handles our after-hours calls perfectly. We went from missing 30% of calls to capturing every single lead. The ROI was evident within the first month.',
    metric: '100% after-hours call capture',
    color: 'rose' as const,
  },
  {
    name: 'David Chen',
    role: 'Director of Operations, Pacific Realty Partners',
    avatar: '/images/avatar-7.png',
    quote:
      'Our lead qualification agent has transformed how we handle inquiries. Only qualified leads reach our agents now, saving everyone time and increasing our close rate by 40%.',
    metric: '40% higher close rate',
    color: 'amber' as const,
  },
]

const colorMap = {
  amber: {
    border: 'border-l-velora-amber',
    avatarBorder: 'border-velora-amber',
    pill: 'bg-velora-amber/10 text-velora-amber',
    shadow: 'hover:shadow-velora-amber/20',
  },
  teal: {
    border: 'border-l-velora-teal',
    avatarBorder: 'border-velora-teal',
    pill: 'bg-velora-teal/10 text-velora-teal',
    shadow: 'hover:shadow-velora-teal/20',
  },
  violet: {
    border: 'border-l-velora-violet',
    avatarBorder: 'border-velora-violet',
    pill: 'bg-velora-violet/10 text-velora-violet',
    shadow: 'hover:shadow-velora-violet/20',
  },
  sky: {
    border: 'border-l-velora-sky',
    avatarBorder: 'border-velora-sky',
    pill: 'bg-velora-sky/10 text-velora-sky',
    shadow: 'hover:shadow-velora-sky/20',
  },
  emerald: {
    border: 'border-l-velora-emerald',
    avatarBorder: 'border-velora-emerald',
    pill: 'bg-velora-emerald/10 text-velora-emerald',
    shadow: 'hover:shadow-velora-emerald/20',
  },
  rose: {
    border: 'border-l-velora-rose',
    avatarBorder: 'border-velora-rose',
    pill: 'bg-velora-rose/10 text-velora-rose',
    shadow: 'hover:shadow-velora-rose/20',
  },
} as const

type ColorKey = keyof typeof colorMap

export function TestimonialsSection() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const autoScrollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Auto-scroll logic: scroll one card every 4 seconds on mobile
  const startAutoScroll = useCallback(() => {
    if (autoScrollIntervalRef.current) return

    autoScrollIntervalRef.current = setInterval(() => {
      const container = carouselRef.current
      if (!container) return

      const cardWidth = 320 // min-w-[320px]
      const gap = 24 // gap-6
      const step = cardWidth + gap
      const maxScroll = container.scrollWidth - container.clientWidth

      // If we've reached the end, loop back to start
      if (container.scrollLeft + step >= maxScroll) {
        container.scrollTo({ left: 0, behavior: 'smooth' })
      } else {
        container.scrollBy({ left: step, behavior: 'smooth' })
      }
    }, 4000)
  }, [])

  const pauseAutoScroll = useCallback(() => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current)
      autoScrollIntervalRef.current = null
    }

    // Resume after 8 seconds
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    resumeTimeoutRef.current = setTimeout(() => {
      startAutoScroll()
    }, 8000)
  }, [startAutoScroll])

  // Set up auto-scroll on mount (mobile only)
  useEffect(() => {
    const container = carouselRef.current
    if (!container) return

    // Only auto-scroll if the container is actually scrollable (mobile)
    if (container.scrollWidth <= container.clientWidth) return

    startAutoScroll()

    // Pause on user interaction
    const handleTouchStart = () => pauseAutoScroll()
    const handleMouseDown = () => pauseAutoScroll()

    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('mousedown', handleMouseDown)

    return () => {
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('mousedown', handleMouseDown)
      if (autoScrollIntervalRef.current) clearInterval(autoScrollIntervalRef.current)
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current)
    }
  }, [startAutoScroll, pauseAutoScroll])

  return (
    <Section background="gradient" id="testimonials">
      {/* Mesh gradient background — sophisticated violet tint */}
      <MeshGradient variant="violet" intensity="subtle" />

      <SectionHeading
        label="Testimonials"
        title="Trusted by Growing Businesses"
        description="Hear from companies that have transformed their customer operations with AI automation."
      />

      {/* Mobile: horizontal scroll with auto-scroll */}
      <div className="relative">
        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 lg:hidden scrollbar-thin"
          role="region"
          aria-label="Testimonial carousel"
          aria-roledescription="carousel"
        >
          {testimonials.map((t, i) => {
            const colors = colorMap[t.color as ColorKey]
            const SlideComponent = i % 2 === 0 ? SlideInLeft : SlideInRight
            return (
              <SlideComponent key={i} className="min-w-[320px] max-w-[320px] snap-start shrink-0">
                <TestimonialCard testimonial={t} colors={colors} />
              </SlideComponent>
            )
          })}
        </div>

        {/* Desktop: 4+3 grid with alternating slide animations */}
        <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {testimonials.map((t, i) => {
            const colors = colorMap[t.color as ColorKey]
            const SlideComponent = i % 2 === 0 ? SlideInLeft : SlideInRight
            return (
              <SlideComponent
                key={i}
                delay={i * 0.08}
                className={cn(
                  'xl:col-span-1',
                  i >= 4 && 'lg:col-start-1 xl:col-start-auto',
                  i === 4 && 'lg:col-start-1',
                  i === 5 && 'lg:col-start-2',
                  i === 6 && 'lg:col-start-1 xl:col-start-1'
                )}
              >
                <TestimonialCard testimonial={t} colors={colors} />
              </SlideComponent>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

function TestimonialCard({
  testimonial: t,
  colors,
}: {
  testimonial: (typeof testimonials)[number]
  colors: (typeof colorMap)[ColorKey]
}) {
  return (
    <div
      className={cn(
        'relative flex flex-col h-full rounded-xl border-l-2 bg-white dark:bg-card p-6 shadow-sm dark:shadow-md transition-all duration-300',
        colors.border,
        'hover:-translate-y-1 hover:shadow-lg',
        colors.shadow
      )}
    >
      {/* Decorative opening quote mark */}
      <span
        aria-hidden="true"
        className="absolute -top-1 -left-1 text-5xl text-velora-emerald/10 font-serif select-none pointer-events-none"
      >
        &ldquo;
      </span>

      {/* Decorative closing quote mark */}
      <span
        aria-hidden="true"
        className="absolute top-3 right-5 text-6xl font-serif text-velora-emerald/[0.08] leading-none select-none pointer-events-none"
      >
        &rdquo;
      </span>

      {/* Quote */}
      <p className="mb-5 text-lg italic leading-relaxed text-foreground/80">
        &ldquo;{t.quote}&rdquo;
      </p>

      {/* Avatar + name + role */}
      <div className="flex items-center gap-3">
        <Image
          src={t.avatar}
          alt={t.name}
          width={48}
          height={48}
          className={cn(
            'h-12 w-12 rounded-full border-2 object-cover',
            colors.avatarBorder
          )}
        />
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-foreground">{t.name}</p>
          <p className="text-xs text-foreground/50">{t.role}</p>
          {/* Star rating below role */}
          <div className="flex gap-0.5 mt-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="w-3.5 h-3.5 fill-velora-amber text-velora-amber"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Metric pill — always at bottom */}
      <span
        className={cn(
          'mt-auto pt-4 inline-block rounded-full px-3 py-1 text-xs font-semibold self-start',
          colors.pill
        )}
      >
        {t.metric}
      </span>
    </div>
  )
}
