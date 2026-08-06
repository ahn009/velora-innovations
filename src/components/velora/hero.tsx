'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ConsultationModal } from './consultation-modal'
import { FadeIn } from './section'
import { MagneticButton } from './magnetic-button'
import { ArrowRight, ArrowDown } from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Workflow step data (for mobile-only mini flow)                     */
/* ------------------------------------------------------------------ */

const workflowSteps = [
  { label: 'Customer Message' },
  { label: 'AI Response' },
  { label: 'Appointment Booked' },
] as const

const easeOut = [0.22, 1, 0.36, 1] as const

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: easeOut,
      delay: 0.4 + i * 0.1,
    },
  }),
}

const connectorV: Variants = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: (i: number) => ({
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.35, ease: easeOut, delay: 0.55 + i * 0.1 },
  }),
}

/* ------------------------------------------------------------------ */
/*  Floating decorative elements with parallax                         */
/* ------------------------------------------------------------------ */

const dots = [
  { color: 'bg-velora-emerald', size: 'w-3 h-3', top: '12%', left: '8%', anim: 'animate-[float_6s_ease-in-out_infinite]', parallaxSpeed: 20 },
  { color: 'bg-velora-amber', size: 'w-2 h-2', top: '18%', right: '15%', anim: 'animate-[float-delayed_7s_ease-in-out_infinite_0.5s]', parallaxSpeed: 35 },
  { color: 'bg-velora-violet', size: 'w-4 h-4', top: '35%', left: '3%', anim: 'animate-[float_8s_ease-in-out_infinite_1s]', parallaxSpeed: 15 },
  { color: 'bg-velora-sky', size: 'w-2.5 h-2.5', top: '60%', right: '8%', anim: 'animate-[float-delayed_5s_ease-in-out_infinite_0.3s]', parallaxSpeed: 40 },
  { color: 'bg-velora-rose', size: 'w-2 h-2', top: '75%', left: '12%', anim: 'animate-[float_7s_ease-in-out_infinite_2s]', parallaxSpeed: 25 },
  { color: 'bg-velora-teal', size: 'w-3 h-3', top: '45%', right: '5%', anim: 'animate-[float_9s_ease-in-out_infinite_1.5s]', parallaxSpeed: 30 },
  { color: 'bg-velora-amber', size: 'w-1.5 h-1.5', top: '85%', right: '20%', anim: 'animate-[float-delayed_6s_ease-in-out_infinite_0.8s]', parallaxSpeed: 20 },
  { color: 'bg-velora-emerald', size: 'w-2 h-2', top: '25%', left: '20%', anim: 'animate-[float_8s_ease-in-out_infinite_0.2s]', parallaxSpeed: 45 },
] as const

type DotConfig = {
  color: string
  size: string
  top: string
  left?: string
  right?: string
  anim: string
  parallaxSpeed: number
}

function ParallaxDot({ dot }: { dot: DotConfig }) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, dot.parallaxSpeed])

  return (
    <motion.div
      className={`absolute ${dot.size} ${dot.color} rounded-full opacity-30 pointer-events-none hidden lg:block ${dot.anim}`}
      style={{
        top: dot.top,
        ...(dot.left ? { left: dot.left } : {}),
        ...(dot.right ? { right: dot.right } : {}),
        y,
        willChange: 'transform',
      }}
    />
  )
}

function FloatingDecorations() {
  return (
    <>
      {dots.map((dot, i) => (
        <ParallaxDot key={i} dot={dot} />
      ))}
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Mobile mini workflow                                               */
/* ------------------------------------------------------------------ */

function MobileWorkflow() {
  return (
    <div className="flex lg:hidden flex-col items-center mt-10 relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-velora-emerald/5 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
      {workflowSteps.map((step, i) => {
        return (
          <div key={step.label} className="flex flex-col items-center">
            <motion.div
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-3.5 rounded-xl bg-white/80 dark:bg-card/80 backdrop-blur-sm border border-velora-border/40 dark:border-border/40 shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.2)] px-4 py-3.5 w-full max-w-[300px] relative z-10"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-velora-emerald/15 to-velora-emerald/5">
                <span className="text-velora-emerald font-semibold text-sm">{i + 1}</span>
              </div>
              <span className="text-sm font-medium text-foreground leading-tight">
                {step.label}
              </span>
            </motion.div>
            {i < workflowSteps.length - 1 && (
              <motion.div
                custom={i}
                variants={connectorV}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center py-1.5 origin-top relative z-10"
              >
                <div className="relative h-8 w-px">
                  <div className="absolute inset-0 bg-gradient-to-b from-velora-emerald/25 to-velora-emerald/10" />
                  <ArrowDown className="absolute -bottom-1.5 -left-[5px] h-2.5 w-2.5 text-velora-emerald/30" />
                </div>
              </motion.div>
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Hero Section                                                       */
/* ------------------------------------------------------------------ */

export function Hero() {
  const [modalOpen, setModalOpen] = useState(false)

  const handleScrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <div id="hero" className="relative overflow-hidden">
        {/* Mesh gradient background: large radial gradients at very low opacity */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Emerald glow - top left */}
          <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-velora-emerald/[0.04]" style={{ filter: 'blur(100px)' }} />
          {/* Amber glow - top right */}
          <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-velora-amber/[0.03]" style={{ filter: 'blur(100px)' }} />
          {/* Violet glow - bottom center */}
          <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] rounded-full bg-velora-violet/[0.03]" style={{ filter: 'blur(100px)' }} />
          {/* Sky glow - right middle */}
          <div className="absolute top-1/2 -right-32 w-[400px] h-[400px] rounded-full bg-velora-sky/[0.03]" style={{ filter: 'blur(80px)' }} />
        </div>

        {/* Background texture: subtle dot grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, oklch(0.178 0.032 261.85 / 0.04) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Floating decorations with parallax */}
        <FloatingDecorations />

        <div className="relative z-10 pt-20 sm:pt-28 lg:pt-32 pb-16 sm:pb-28 lg:pb-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
              {/* ---- Left: Text content ---- */}
              <div className="flex flex-col gap-7">
                <FadeIn>
                  <p className="text-[11px] sm:text-xs font-semibold tracking-[0.15em] uppercase text-velora-emerald">
                    AI Automation for Growing Businesses
                  </p>
                </FadeIn>

                <FadeIn delay={0.1}>
                  <h1 className="text-[2.5rem] sm:text-5xl lg:text-[3.5rem] xl:text-[3.75rem] font-medium tracking-[-0.02em] text-foreground leading-[1.05]">
                    <span className="bg-gradient-to-r from-foreground via-velora-emerald to-foreground bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_3s_ease-in-out_infinite]">
                      Turn Customer Enquiries
                    </span>{' '}
                    <span className="text-foreground/90">and Repetitive Work</span>
                    <br />
                    Into Automated Growth
                  </h1>
                </FadeIn>

                <FadeIn delay={0.2}>
                  <p className="text-base sm:text-lg text-foreground/60 max-w-xl leading-[1.7]">
                    We design AI agents that answer customers, qualify leads, book
                    appointments, send follow-ups and connect with the tools your
                    business already uses.
                  </p>
                </FadeIn>

                <FadeIn delay={0.3}>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 pt-2">
                    <MagneticButton>
                      <Button
                        onClick={() => setModalOpen(true)}
                        className="press-effect bg-velora-emerald hover:bg-velora-emerald-dark text-white rounded-xl h-[52px] px-8 text-[15px] font-medium shadow-lg shadow-velora-emerald/20 hover:shadow-xl hover:shadow-velora-emerald/30 transition-all duration-300"
                      >
                        Book a Free Automation Consultation
                      </Button>
                    </MagneticButton>
                    <MagneticButton>
                      <Button
                        variant="outline"
                        onClick={handleScrollToDemo}
                        className="press-effect rounded-xl h-[52px] px-7 text-[15px] font-medium border-foreground/15 hover:bg-muted/60 hover:border-foreground/25 transition-all duration-300"
                      >
                        See an AI Agent in Action
                      </Button>
                    </MagneticButton>
                  </div>
                </FadeIn>

                <FadeIn delay={0.38}>
                  <p className="text-[13px] text-foreground/40">
                    No obligation. Practical recommendations based on your current workflow.
                  </p>
                </FadeIn>
              </div>

              {/* ---- Right: Hero dashboard image (desktop) ---- */}
              <div className="hidden lg:block relative flex items-center justify-center">
                {/* Glowing emerald shadow behind image */}
                <div
                  className="absolute -inset-6 rounded-3xl opacity-60"
                  style={{
                    background: 'linear-gradient(135deg, oklch(0.627 0.194 149.21 / 0.15), oklch(0.627 0.194 149.21 / 0.05))',
                    filter: 'blur(40px)',
                  }}
                />

                {/* Gradient border wrapper */}
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                  className="relative p-[2px] rounded-2xl hero-glow"
                  style={{
                    background: 'linear-gradient(135deg, #34d399, #10b981, #f59e0b, #a78bfa, #38bdf8, #34d399)',
                    backgroundSize: '300% 300%',
                    animation: 'shimmer 6s ease-in-out infinite',
                  }}
                >
                  <div className="rounded-2xl overflow-hidden bg-white dark:bg-card p-1 shadow-xl shadow-black/[0.06] dark:shadow-black/[0.3] border border-velora-border/30 dark:border-border/30 transition-transform duration-500 ease-out hover:scale-[1.02]">
                    <Image
                      src="/images/hero-dashboard.png"
                      alt="Velora AI Dashboard — showing automated customer interactions, lead qualification, and appointment booking workflow"
                      width={1344}
                      height={768}
                      priority
                      className="w-full h-auto rounded-xl"
                    />
                  </div>
                </motion.div>

                {/* Small accent badges */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
                  className="absolute -top-3 -right-3 bg-white dark:bg-card rounded-xl shadow-lg shadow-black/[0.08] dark:shadow-black/[0.3] border border-velora-border/50 dark:border-border/50 px-3.5 py-2 flex items-center gap-2"
                >
                  <div className="w-2 h-2 rounded-full bg-velora-emerald animate-pulse" />
                  <span className="text-[12px] font-semibold text-foreground/80">AI Live</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 1.0 }}
                  className="absolute -bottom-4 -left-4 bg-white dark:bg-card rounded-xl shadow-lg shadow-black/[0.08] dark:shadow-black/[0.3] border border-velora-border/50 dark:border-border/50 px-3.5 py-2 flex items-center gap-2"
                >
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-velora-amber/20 to-velora-amber/5 flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-velora-amber" />
                  </div>
                  <span className="text-[12px] font-semibold text-foreground/80">+42% Leads</span>
                </motion.div>
              </div>
            </div>

            {/* Mobile mini workflow */}
            <MobileWorkflow />
          </div>
        </div>
      </div>

      <ConsultationModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  )
}
