'use client'

import { X, Check, Clock, Phone, Calendar, RotateCcw, Target, Database, TrendingUp, DollarSign } from 'lucide-react'
import { Section, SectionHeading, StaggerContainer, StaggerItem, FadeIn } from './section'
import { SocialShare } from './social-share'
import { MeshGradient } from './mesh-gradient'

const comparisons = [
  {
    label: 'Lead Response',
    icon: Clock,
    before: '2–4 hours average',
    after: 'Under 2 minutes',
  },
  {
    label: 'After-hours coverage',
    icon: Phone,
    before: 'Voicemail only',
    after: '24/7 AI-powered',
  },
  {
    label: 'Appointment booking',
    icon: Calendar,
    before: 'Manual back-and-forth',
    after: 'Auto-scheduled in real-time',
  },
  {
    label: 'Follow-up consistency',
    icon: RotateCcw,
    before: 'When someone remembers',
    after: 'Every lead, every time',
  },
  {
    label: 'Lead qualification',
    icon: Target,
    before: 'Manual review',
    after: 'AI-scored automatically',
  },
  {
    label: 'CRM data entry',
    icon: Database,
    before: 'Copy-paste between tools',
    after: 'Auto-synced in real-time',
  },
  {
    label: 'Scaling capacity',
    icon: TrendingUp,
    before: 'Hire more staff',
    after: 'AI handles the volume',
  },
  {
    label: 'Monthly cost',
    icon: DollarSign,
    before: '$4,000–$8,000/employee',
    after: 'From $2,500 one-time setup',
  },
] as const

export function ComparisonSection() {
  return (
    <Section id="comparison" background="default" className="relative overflow-hidden">
      {/* Mesh gradient background — visual interest */}
      <MeshGradient variant="mixed" intensity="subtle" />
      <SectionHeading
        label="Why Velora"
        title="The Difference Is Measurable"
        description="See how businesses perform before and after implementing Velora AI automation across every key metric."
      />

      <StaggerContainer className="max-w-4xl mx-auto">
        {/* Header row */}
        <div className="grid grid-cols-[1fr_1fr_1fr] lg:grid-cols-[180px_1fr_1fr] rounded-t-2xl overflow-hidden border border-b-0 border-velora-border/50">
          <div className="bg-muted/60 px-4 py-3.5 flex items-center" />
          <div className="bg-red-50 dark:bg-red-950/20 px-4 py-3.5 flex items-center justify-center border-l border-velora-border/50">
            <span className="text-xs font-semibold tracking-wider uppercase text-red-500/80">
              Before
            </span>
          </div>
          <div className="bg-emerald-50 dark:bg-emerald-950/20 px-4 py-3.5 flex items-center justify-center border-l border-velora-border/50">
            <span className="text-xs font-semibold tracking-wider uppercase text-emerald-600 dark:text-emerald-400">
              With Velora
            </span>
          </div>
        </div>

        {/* Data rows */}
        <div className="rounded-b-2xl overflow-hidden border border-velora-border/50 divide-y divide-velora-border/30">
          {comparisons.map((item, index) => {
            const Icon = item.icon
            const isLast = index === comparisons.length - 1
            return (
              <StaggerItem key={item.label}>
                <div
                  className={`grid grid-cols-[1fr_1fr_1fr] lg:grid-cols-[180px_1fr_1fr] transition-colors duration-200 hover:bg-muted/30 ${
                    isLast ? 'rounded-b-2xl' : ''
                  }`}
                >
                  {/* Label cell */}
                  <div className="px-4 py-4 flex items-center gap-2.5 border-r border-velora-border/30">
                    <Icon className="w-4 h-4 text-muted-foreground/60 shrink-0" />
                    <span className="text-sm font-medium text-foreground/80">
                      {item.label}
                    </span>
                  </div>

                  {/* Before cell */}
                  <div className="px-4 py-4 flex items-center gap-2.5 border-r border-velora-border/30 bg-red-50/40 dark:bg-red-950/10">
                    <X className="w-4 h-4 text-red-400 dark:text-red-500 shrink-0" />
                    <span className="text-sm text-foreground/60">
                      {item.before}
                    </span>
                  </div>

                  {/* After cell */}
                  <div className="px-4 py-4 flex items-center gap-2.5 bg-emerald-50/40 dark:bg-emerald-950/10">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                      {item.after}
                    </span>
                  </div>
                </div>
              </StaggerItem>
            )
          })}
        </div>
      </StaggerContainer>

      <FadeIn className="mt-8 flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground">Share this comparison</span>
        <SocialShare
          title="The Difference Is Measurable"
          text="See how businesses perform before and after implementing Velora AI automation across every key metric."
        />
      </FadeIn>
    </Section>
  )
}
