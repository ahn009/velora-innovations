'use client'

import { useCallback, useRef } from 'react'
import Image from 'next/image'
import { Section, FadeIn } from './section'
import { ArrowRight, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { useConsultation } from './consultation-provider'

function SpotlightButton({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const ref = useRef<HTMLButtonElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
    el.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
  }, [])

  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-xl"
        style={{
          background: 'radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), oklch(0.627 0.194 149.21 / 15%), transparent 60%)',
        }}
        aria-hidden="true"
      />
      <span className="relative z-10 flex items-center">{children}</span>
    </button>
  )
}

export function FinalCtaSection() {
  const { openConsultation } = useConsultation()

  return (
    <Section id="consultation" background="navy" className="relative overflow-hidden">
        {/* Background image with dark overlay */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <Image
            src="/images/cta-bg.png"
            alt=""
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-velora-navy/80 via-velora-navy/60 to-velora-navy/90 pointer-events-none"
        />

        {/* Decorative gradient circles */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-velora-emerald opacity-[0.08]"
          style={{ filter: 'blur(120px)' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-velora-amber opacity-[0.06]"
          style={{ filter: 'blur(100px)' }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-[10%] h-[250px] w-[250px] rounded-full bg-velora-violet opacity-[0.05]"
          style={{ filter: 'blur(80px)' }}
        />

        {/* Floating gradient orbs */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute top-[20%] left-[8%] h-24 w-24 rounded-full bg-velora-emerald opacity-[0.12]"
          style={{ filter: 'blur(40px)' }}
          animate={{ y: [0, -18, 0], x: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute top-[15%] right-[12%] h-20 w-20 rounded-full bg-velora-sky opacity-[0.10]"
          style={{ filter: 'blur(36px)' }}
          animate={{ y: [0, 14, 0], x: [0, -10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[20%] left-[15%] h-16 w-16 rounded-full bg-velora-violet opacity-[0.10]"
          style={{ filter: 'blur(32px)' }}
          animate={{ y: [0, -12, 0], x: [0, 12, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-[25%] right-[8%] h-20 w-20 rounded-full bg-velora-emerald opacity-[0.08]"
          style={{ filter: 'blur(36px)' }}
          animate={{ y: [0, 16, 0], x: [0, -6, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        {/* Vignette overlay — darker edges, lighter center */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-radial-[ellipse_at_center] from-transparent via-transparent to-velora-navy/30"
        />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <FadeIn>
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-8 border border-white/10">
              <Sparkles className="w-6 h-6 text-velora-emerald" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-[1.15]">
              See What Your Business Can Automate
            </h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
              Book a practical consultation to review your customer journey,
              repetitive tasks and current systems. No obligation, no pressure.
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <SpotlightButton
                onClick={openConsultation}
                className="relative overflow-hidden h-12 px-8 rounded-xl bg-velora-emerald hover:bg-velora-emerald-dark text-white text-base font-medium shadow-lg shadow-velora-emerald/20 transition-all duration-300 hover:shadow-xl hover:shadow-velora-emerald/30 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Request a Free Consultation
                <ArrowRight className="ml-2 w-4 h-4" />
              </SpotlightButton>
              <a
                href="#demo"
                onClick={(e) => {
                  e.preventDefault()
                  document
                    .getElementById('demo')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="h-12 px-8 rounded-xl border border-white/20 text-white/80 text-base font-medium hover:bg-white/10 hover:text-white hover:border-white/30 transition-all duration-300 inline-flex items-center justify-center"
              >
                Try the Guided Demo
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="mt-6 text-sm text-white/70">
              30-minute consultation &middot; Practical recommendations &middot; No
              purchase required
            </p>
          </FadeIn>
        </div>
    </Section>
  )
}
