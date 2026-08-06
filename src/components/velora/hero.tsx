'use client'

import { Button } from '@/components/ui/button'
import { useConsultation } from './consultation-provider'
import { HeroWorkflowVisual } from './workflow-visuals'
import { ArrowRight, ArrowDown } from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Workflow step data (for mobile-only mini flow)                     */
/* ------------------------------------------------------------------ */

const workflowSteps = [
  { label: 'Customer Message' },
  { label: 'AI Response' },
  { label: 'Appointment Booked' },
] as const

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
            <div
              className="flex items-center gap-3.5 rounded-xl bg-white/80 dark:bg-card/80 backdrop-blur-sm border border-velora-border/40 dark:border-border/40 shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.2)] px-4 py-3.5 w-full max-w-[300px] relative z-10"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-velora-emerald/15 to-velora-emerald/5">
                <span className="text-velora-emerald font-semibold text-sm">{i + 1}</span>
              </div>
              <span className="text-sm font-medium text-foreground leading-tight">
                {step.label}
              </span>
            </div>
            {i < workflowSteps.length - 1 && (
              <div
                className="flex flex-col items-center py-1.5 origin-top relative z-10"
              >
                <div className="relative h-8 w-px">
                  <div className="absolute inset-0 bg-gradient-to-b from-velora-emerald/25 to-velora-emerald/10" />
                  <ArrowDown className="absolute -bottom-1.5 -left-[5px] h-2.5 w-2.5 text-velora-emerald/30" />
                </div>
              </div>
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
  const { openConsultation } = useConsultation()

  const handleScrollToDemo = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById('demo')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
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

        <div className="relative z-10 pt-20 sm:pt-28 lg:pt-32 pb-16 sm:pb-28 lg:pb-32">
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
            <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
              {/* ---- Left: Text content ---- */}
              <div className="flex flex-col gap-7">
                <div>
                  <p className="text-[11px] sm:text-xs font-semibold tracking-[0.15em] uppercase text-velora-emerald">
                    AI Reception and Workflow Automation
                  </p>
                </div>

                <div>
                  <h1 className="text-[2.5rem] sm:text-5xl lg:text-[3.5rem] xl:text-[3.75rem] font-medium tracking-[-0.02em] text-foreground leading-[1.05]">
                    Respond to Every Customer{' '}
                    <span className="text-foreground/75">Without Adding More Admin Work</span>
                  </h1>
                </div>

                <div>
                  <p className="text-base sm:text-lg text-foreground/60 max-w-xl leading-[1.7]">
                    Velora designs customer-facing automation for service businesses:
                    answer routine enquiries, collect lead details, book appointments,
                    and hand complex conversations to a person.
                  </p>
                </div>

                <div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 pt-2">
                    <Button
                      onClick={openConsultation}
                      className="press-effect h-[52px] w-full rounded-xl bg-velora-emerald px-8 text-[15px] font-medium text-white shadow-lg shadow-velora-emerald/20 transition-[background-color,box-shadow,transform] duration-150 hover:bg-velora-emerald-dark hover:shadow-xl hover:shadow-velora-emerald/30 active:scale-[0.97] sm:w-auto"
                    >
                      Request a Consultation
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleScrollToDemo}
                      className="press-effect h-[52px] w-full rounded-xl border-foreground/15 px-7 text-[15px] font-medium transition-[background-color,border-color,transform] duration-150 hover:border-foreground/25 hover:bg-muted/60 active:scale-[0.97] sm:w-auto"
                    >
                      Try the Guided Workflow Demo
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-[13px] text-foreground/65">
                    No purchase required. We start by checking fit, risk, and integration constraints.
                  </p>
                </div>
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
                <div
                  className="relative p-[2px] rounded-2xl hero-glow"
                  style={{
                    background: 'linear-gradient(135deg, #34d399, #10b981, #f59e0b, #a78bfa, #38bdf8, #34d399)',
                  }}
                >
                  <div className="overflow-hidden rounded-2xl border border-velora-border/30 bg-white p-1 shadow-xl shadow-black/[0.06] dark:border-border/30 dark:bg-card dark:shadow-black/[0.3]">
                    <HeroWorkflowVisual />
                  </div>
                </div>

                {/* Small accent badges */}
                <div
                  className="absolute -top-3 -right-3 bg-white dark:bg-card rounded-xl shadow-lg shadow-black/[0.08] dark:shadow-black/[0.3] border border-velora-border/50 dark:border-border/50 px-3.5 py-2 flex items-center gap-2"
                >
                  <div className="w-2 h-2 rounded-full bg-velora-emerald" />
                  <span className="text-[12px] font-semibold text-foreground/80">Illustrative workflow</span>
                </div>

                <div
                  className="absolute -bottom-4 -left-4 bg-white dark:bg-card rounded-xl shadow-lg shadow-black/[0.08] dark:shadow-black/[0.3] border border-velora-border/50 dark:border-border/50 px-3.5 py-2 flex items-center gap-2"
                >
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-velora-amber/20 to-velora-amber/5 flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-velora-amber" />
                  </div>
                  <span className="text-[12px] font-semibold text-foreground/80">Human handoff included</span>
                </div>
              </div>
            </div>

            {/* Mobile mini workflow */}
            <MobileWorkflow />
          </div>
        </div>
    </div>
  )
}
