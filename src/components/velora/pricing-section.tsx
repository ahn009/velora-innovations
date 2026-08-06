'use client'

import { Section, SectionHeading, FadeIn, StaggerContainer, StaggerItem } from './section'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useConsultation } from './consultation-provider'

interface PricingTier {
  name: string
  description: string
  price: string
  priceNote: string
  features: { text: string; included: boolean }[]
  highlight?: boolean
  cta: string
}

const tiers: PricingTier[] = [
  {
    name: 'Foundation',
    description: 'For a single, limited workflow.',
    price: 'From $2,500',
    priceNote: 'USD · one-time implementation',
    features: [
      { text: 'One communication channel', included: true },
      { text: 'One core use case', included: true },
      { text: 'Basic knowledge setup', included: true },
      { text: 'Limited integrations', included: true },
      { text: 'Standard reporting', included: true },
      { text: 'Initial testing', included: true },
      { text: 'Launch monitoring period', included: true },
      { text: 'Multi-agent architecture', included: false },
      { text: 'Custom reporting', included: false },
      { text: 'Dedicated support', included: false },
    ],
    cta: 'Discuss Foundation',
  },
  {
    name: 'Growth',
    description: 'For multiple customer-facing tasks.',
    price: 'From $5,000',
    priceNote: 'USD · one-time implementation',
    features: [
      { text: 'Multiple workflows', included: true },
      { text: 'CRM or calendar integration', included: true },
      { text: 'Lead qualification', included: true },
      { text: 'Appointment automation', included: true },
      { text: 'Follow-up sequences', included: true },
      { text: 'Human handoff', included: true },
      { text: 'Enhanced reporting', included: true },
      { text: 'Initial optimization review', included: true },
      { text: 'Multi-agent architecture', included: false },
      { text: 'Dedicated support', included: false },
    ],
    highlight: true,
    cta: 'Discuss Growth',
  },
  {
    name: 'Custom',
    description: 'For complex or multi-location operations.',
    price: 'Custom',
    priceNote: 'Based on requirements',
    features: [
      { text: 'Multi-agent architecture', included: true },
      { text: 'Multiple locations', included: true },
      { text: 'Advanced integrations', included: true },
      { text: 'Custom permissions', included: true },
      { text: 'Internal tools', included: true },
      { text: 'Custom reporting', included: true },
      { text: 'Dedicated support', included: true },
      { text: 'Extended testing', included: true },
      { text: 'Priority response', included: true },
      { text: 'Executive reviews', included: true },
    ],
    cta: 'Contact Us',
  },
]

const comparisonFeatures = [
  { name: 'AI Phone Agent', foundation: false, growth: false, custom: true },
  { name: 'AI Chat Agent', foundation: true, growth: true, custom: true },
  { name: 'SMS & Email Automation', foundation: false, growth: true, custom: true },
  { name: 'Calendar Integration', foundation: false, growth: true, custom: true },
  { name: 'CRM Integration', foundation: false, growth: true, custom: true },
  { name: 'Custom Knowledge Base', foundation: true, growth: true, custom: true },
  { name: 'Dedicated Account Manager', foundation: false, growth: false, custom: true },
  { name: 'Analytics Dashboard', foundation: true, growth: true, custom: true },
]

export function PricingSection() {
  const { openConsultation } = useConsultation()

  return (
    <Section id="pricing">
        <SectionHeading
          label="Pricing"
          title="Clear Implementation Starting Points"
          description="The amounts below are one-time implementation starting prices in USD. Monthly management, telephony, model usage, and third-party software are quoted separately after the workflow review."
        />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <StaggerItem key={tier.name}>
              <div
                className={cn(
                  'relative rounded-2xl border p-6 lg:p-7 flex flex-col h-full',
                  tier.highlight
                    ? 'border-velora-emerald/30 dark:border-velora-emerald/40 bg-white dark:bg-card shadow-xl shadow-velora-emerald/8 dark:shadow-velora-emerald/20 ring-1 ring-velora-emerald/10'
                    : 'border-velora-border/60 dark:border-border/60 bg-white dark:bg-card shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:shadow-[0_2px_12px_rgba(0,0,0,0.2)]'
                )}
              >
                {tier.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-velora-emerald text-white text-[11px] font-semibold tracking-wide uppercase px-4 py-1.5 rounded-full shadow-lg shadow-velora-emerald/25">
                      Recommended
                    </span>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-semibold">{tier.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {tier.description}
                  </p>
                </div>

                <div className="mt-6 pb-1">
                  <span className="text-[1.75rem] font-bold tracking-tight">
                    {tier.price}
                  </span>
                  <p className="text-xs text-foreground/65 mt-1.5">
                    {tier.priceNote}
                  </p>
                </div>

                <ul className="mt-6 space-y-3 flex-1" role="list">
                  {tier.features.filter((feature) => feature.included).map((feature) => (
                    <li
                      key={feature.text}
                      className="flex items-start gap-2.5"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-velora-emerald" />
                      <span className="text-sm leading-relaxed text-foreground">
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={openConsultation}
                  className={cn(
                    'mt-8 h-11 w-full rounded-xl text-sm font-medium transition-[background-color,box-shadow,transform] duration-150 active:scale-[0.97]',
                    tier.highlight
                      ? 'bg-velora-emerald hover:bg-velora-emerald-dark text-white shadow-lg shadow-velora-emerald/20'
                      : 'bg-velora-navy hover:bg-velora-navy-light text-white shadow-sm'
                  )
                }
                >
                  {tier.cta}
                </Button>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Feature Comparison Table */}
        <FadeIn delay={0.2}>
          <div className="max-w-3xl mx-auto mt-12">
            <div className="rounded-xl overflow-hidden border border-velora-border/60 dark:border-border/60">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[540px] text-sm">
                  <thead>
                    <tr className="border-b border-velora-border/60 dark:border-border/60 bg-muted/50">
                      <th className="text-left font-medium text-muted-foreground px-5 py-3.5 w-[45%]">
                        Feature
                      </th>
                      <th className="text-center font-medium text-muted-foreground px-4 py-3.5 w-[18%]">
                        Foundation
                      </th>
                      <th className="text-center font-medium px-4 py-3.5 w-[18%] text-velora-emerald">
                        Growth
                      </th>
                      <th className="text-center font-medium text-muted-foreground px-4 py-3.5 w-[18%]">
                        Custom
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFeatures.map((feature, i) => (
                      <tr
                        key={feature.name}
                        className={cn(
                          'border-b border-velora-border/40 dark:border-border/40 last:border-b-0',
                          i % 2 === 0 ? 'bg-transparent' : 'bg-muted/20'
                        )}
                      >
                        <td className="px-5 py-3 text-foreground font-medium">
                          {feature.name}
                        </td>
                        {[feature.foundation, feature.growth, feature.custom].map((included, colIdx) => (
                          <td key={colIdx} className="text-center px-4 py-3">
                            {included ? (
                              <Check className="w-4 h-4 text-velora-emerald mx-auto" />
                            ) : (
                              <span className="text-muted-foreground/50 text-lg leading-none">—</span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="text-sm text-muted-foreground text-center mt-10 max-w-xl mx-auto">
            Each proposal defines the exact workflow, integrations, usage assumptions, testing, support, data handling, and recurring charges before work begins.
          </p>
        </FadeIn>
    </Section>
  )
}
