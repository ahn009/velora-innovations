'use client'

import { useState } from 'react'
import { Phone, MessageCircle, ArrowRight } from 'lucide-react'
import { Section, SectionHeading, FadeIn } from './section'
import { CardShine } from './card-shine'
import { InteractiveDemoWidget } from './interactive-demo-widget'
import { ConsultationModal } from './consultation-modal'

const demos = [
  {
    icon: Phone,
    title: 'Call the AI Receptionist',
    description:
      'Hear how the AI answers a routine business call, collects information and schedules an appointment.',
    button: 'Call Now',
    gradient: 'from-velora-emerald/5 via-velora-emerald/[0.02] to-transparent',
    iconBg: 'bg-velora-emerald',
    iconHoverBg: 'group-hover:shadow-velora-emerald/30',
  },
  {
    icon: MessageCircle,
    title: 'Test the Website Agent',
    description:
      'Type a message and see how the AI responds, qualifies and routes your enquiry in real time.',
    button: 'Start Chat',
    gradient: 'from-velora-sky/5 via-velora-sky/[0.02] to-transparent',
    iconBg: 'bg-velora-sky',
    iconHoverBg: 'group-hover:shadow-velora-sky/30',
  },
] as const

export function DemoSection() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Section id="demo" className="relative">
        {/* Subtle decorative blobs */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -left-20 h-[400px] w-[400px] rounded-full bg-velora-emerald blur-[130px] opacity-[0.04]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-20 -right-20 h-[350px] w-[350px] rounded-full bg-velora-violet blur-[120px] opacity-[0.04]"
        />

        <FadeIn>
          <SectionHeading
            label="Live Demos"
            title="Experience the System Before You Buy It"
            description="Test an AI agent directly or watch a real workflow in action. Each demo clearly identifies itself as an AI system."
          />
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
          {demos.map((demo, index) => {
            const Icon = demo.icon
            return (
              <FadeIn key={demo.title} delay={0.1 + index * 0.1}>
                <div className="relative rounded-2xl border border-velora-border/60 dark:border-border/60 p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group bg-white dark:bg-card h-full flex flex-col items-center overflow-hidden">
                  <CardShine />
                  {/* Subtle gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${demo.gradient} pointer-events-none`} />

                  <div className={`relative w-14 h-14 rounded-2xl ${demo.iconBg} text-white mx-auto flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 ${demo.iconHoverBg}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="relative text-lg font-semibold mt-5">{demo.title}</h3>
                  <p className="relative text-sm text-muted-foreground mt-3 leading-relaxed max-w-xs mx-auto">
                    {demo.description}
                  </p>
                  <div className="relative mt-auto pt-6">
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 h-10 px-5 rounded-lg bg-velora-navy text-white text-sm font-medium hover:bg-velora-navy-light transition-all duration-300 hover:shadow-lg hover:shadow-velora-navy/20 group/btn"
                    >
                      {demo.button}
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-300" />
                    </button>
                  </div>
                </div>
              </FadeIn>
            )
          })}

          {/* Interactive Demo Widget — replaces the 3rd demo card */}
          <FadeIn delay={0.3}>
            <div className="relative rounded-2xl border border-velora-border/60 dark:border-border/60 p-6 bg-white dark:bg-card h-full flex flex-col overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <InteractiveDemoWidget onSeeFullDemo={() => setModalOpen(true)} />
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.4}>
          <p className="text-sm text-muted-foreground text-center mt-8">
            All demonstrations clearly identify themselves as AI systems. You
            will never be led to believe you are speaking with a human.
          </p>
        </FadeIn>
      </Section>

      <ConsultationModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  )
}
