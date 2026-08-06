'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Section, FadeIn } from './section'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useConsultation } from './consultation-provider'

export function FinalCtaSection() {
  const { openConsultation } = useConsultation()

  return (
    <Section id="consultation" background="navy" className="relative overflow-hidden py-16 sm:py-20 lg:py-24">
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
              <button
                type="button"
                onClick={openConsultation}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-velora-emerald px-8 text-base font-medium text-white shadow-lg shadow-velora-emerald/20 transition-[background-color,box-shadow,transform] duration-150 hover:bg-velora-emerald-dark hover:shadow-xl hover:shadow-velora-emerald/30 active:scale-[0.97]"
              >
                Request a Consultation
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
              <Link
                href="/resources/demo"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-white/20 px-8 text-base font-medium text-white/80 transition-[background-color,border-color,color,transform] duration-150 hover:border-white/30 hover:bg-white/10 hover:text-white active:scale-[0.97]"
              >
                Try the Guided Demo
              </Link>
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
