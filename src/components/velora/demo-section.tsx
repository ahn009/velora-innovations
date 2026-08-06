'use client'

import { CheckCircle2, MessageCircle, ShieldCheck } from 'lucide-react'
import { Section, SectionHeading, FadeIn } from './section'
import { InteractiveDemoWidget } from './interactive-demo-widget'
import { useConsultation } from './consultation-provider'

const demoNotes = [
  'Uses a fixed demonstration scenario—not a live customer system.',
  'Shows intake, qualification, approved responses, and escalation.',
  'Does not collect or store the messages entered in this demo.',
]

export function DemoSection() {
  const { openConsultation } = useConsultation()

  return (
    <Section id="demo" className="relative">
      <SectionHeading
        label="Guided Workflow Demo"
        title="See the Conversation Flow Before We Discuss a Build"
        description="Try a transparent, scripted workflow that demonstrates how a service enquiry can be collected, qualified, and handed to a person. It is not presented as a live production AI agent."
      />

      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <FadeIn delay={0.1}>
          <div className="h-full rounded-2xl border border-border bg-card p-7">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-velora-sky/10 text-velora-sky">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="mt-5 text-xl font-semibold">What this demo proves</h3>
            <ul className="mt-5 space-y-4">
              {demoNotes.map((note) => (
                <li key={note} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-velora-emerald" aria-hidden="true" />
                  {note}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-3 rounded-xl bg-muted/50 p-4 text-sm leading-relaxed text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-velora-emerald" aria-hidden="true" />
              A production deployment is configured around approved knowledge, explicit permissions, and a client-specific human escalation path.
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm">
            <InteractiveDemoWidget onSeeFullDemo={openConsultation} />
          </div>
        </FadeIn>
      </div>
    </Section>
  )
}
