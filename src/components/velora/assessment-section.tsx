'use client'

import Image from 'next/image'
import { Section, FadeIn } from './section'
import { Button } from '@/components/ui/button'
import { Sparkles, ArrowRight, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

export function AssessmentSection() {
  return (
    <Section id="assessment" className="relative overflow-hidden">
      {/* Animated radial pulse background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-velora-emerald"
        style={{
          filter: 'blur(100px)',
          animation: 'pulse-bg 6s ease-in-out infinite',
        }}
      />
      {/* Decorative gradient blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-velora-emerald blur-[140px] opacity-[0.06]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-velora-amber blur-[120px] opacity-[0.05]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-velora-violet blur-[100px] opacity-[0.03]"
      />

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left — visual (desktop) / top (mobile) */}
        <FadeIn delay={0.1} className="order-2 lg:order-1">
          <div className="relative max-w-md mx-auto lg:mx-0">
            {/* Glow behind image */}
            <div
              className="absolute -inset-6 rounded-3xl opacity-50"
              style={{
                background: 'linear-gradient(135deg, oklch(0.627 0.194 149.21 / 0.12), oklch(0.627 0.194 149.21 / 0.04))',
                filter: 'blur(40px)',
              }}
            />
            <div className="relative rounded-2xl overflow-hidden shadow-lg shadow-black/[0.06] dark:shadow-black/[0.25] border border-velora-border/30 dark:border-border/30">
              <Image
                src="/images/assessment-visual.png"
                alt="AI Opportunity Assessment dashboard — showing analytics, scoring and personalized automation recommendations"
                width={1024}
                height={1024}
                className="w-full h-auto"
              />
            </div>
          </div>
        </FadeIn>

        {/* Right — content */}
        <div className="text-center lg:text-left order-1 lg:order-2">
          {/* Decorative animated SVG ring — md+ only */}
          <div className="hidden md:block pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
            <motion.svg
              width="280"
              height="280"
              viewBox="0 0 280 280"
              className="opacity-[0.12]"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            >
              <circle
                cx="140"
                cy="140"
                r="130"
                fill="none"
                stroke="oklch(0.7 0.15 160)"
                strokeWidth="1.5"
                strokeDasharray="12 8"
              />
            </motion.svg>
            <motion.svg
              width="220"
              height="220"
              viewBox="0 0 220 220"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.08]"
              animate={{ rotate: -360 }}
              transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
            >
              <circle
                cx="110"
                cy="110"
                r="100"
                fill="none"
                stroke="oklch(0.7 0.15 160)"
                strokeWidth="1"
                strokeDasharray="6 14"
              />
            </motion.svg>
          </div>

          <FadeIn>
            <div className="w-16 h-16 rounded-2xl bg-velora-emerald/10 flex items-center justify-center mx-auto lg:mx-0 mb-6 shadow-sm shadow-velora-emerald/10">
              <Sparkles className="w-7 h-7 text-velora-emerald" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Find Your Highest-Value Automation Opportunity
            </h2>

            <p className="text-lg text-muted-foreground mt-4 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Complete a short assessment to identify which customer interactions
              or business processes may be suitable for automation. Receive a
              personalized recommendation based on your responses.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
              <Button
                className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-velora-navy text-white hover:bg-velora-navy-light text-base font-medium transition-all duration-300 shadow-lg shadow-velora-navy/15 hover:shadow-xl hover:shadow-velora-navy/25 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                <Zap className="w-4 h-4" />
                Start the AI Opportunity Assessment
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            <p className="mt-4 text-sm text-muted-foreground/70">
              Takes about 5 minutes &middot; Free, no sign-up required
            </p>
          </FadeIn>
        </div>
      </div>
    </Section>
  )
}
