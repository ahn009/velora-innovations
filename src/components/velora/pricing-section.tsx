'use client'

import { useState } from 'react'
import { Section, SectionHeading, FadeIn, StaggerContainer, StaggerItem } from './section'
import { Check, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ConsultationModal } from './consultation-modal'
import { cn } from '@/lib/utils'
import { TiltCard } from './tilt-card'

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
    priceNote: 'One-time implementation',
    features: [
      { text: 'One communication channel', included: true },
      { text: 'One core use case', included: true },
      { text: 'Basic knowledge setup', included: true },
      { text: 'Limited integrations', included: true },
      { text: 'Standard reporting', included: true },
      { text: 'Initial testing', included: true },
      { text: 'Monthly monitoring', included: true },
      { text: 'Multi-agent architecture', included: false },
      { text: 'Custom reporting', included: false },
      { text: 'Dedicated support', included: false },
    ],
    cta: 'Get Started',
  },
  {
    name: 'Growth',
    description: 'For multiple customer-facing tasks.',
    price: 'From $5,000',
    priceNote: 'One-time implementation',
    features: [
      { text: 'Multiple workflows', included: true },
      { text: 'CRM or calendar integration', included: true },
      { text: 'Lead qualification', included: true },
      { text: 'Appointment automation', included: true },
      { text: 'Follow-up sequences', included: true },
      { text: 'Human handoff', included: true },
      { text: 'Enhanced reporting', included: true },
      { text: 'Ongoing optimization', included: true },
      { text: 'Multi-agent architecture', included: false },
      { text: 'Dedicated support', included: false },
    ],
    highlight: true,
    cta: 'Most Popular',
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
  const [modalOpen, setModalOpen] = useState(false)
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly')

  return (
    <>
      <Section id="pricing">
        <SectionHeading
          label="Pricing"
          title="Transparent Investment, Measurable Returns"
          description="Projects typically begin with a one-time implementation fee and continue with monthly management. Final pricing is based on workflows, channels, integrations, usage and security requirements."
        />

        {/* Billing toggle */}
        <FadeIn delay={0.05}>
          <div className="flex items-center justify-center gap-3 mt-8 mb-2">
            <div className="relative inline-flex items-center rounded-full bg-muted/80 p-1 border border-velora-border/40 dark:border-border/40">
              <button
                type="button"
                onClick={() => setBilling('monthly')}
                className={cn(
                  'relative z-10 rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200',
                  billing === 'monthly' ? 'text-white' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBilling('annual')}
                className={cn(
                  'relative z-10 rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200',
                  billing === 'annual' ? 'text-white' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                Annual
              </button>
              <div
                className={cn(
                  'absolute top-1 bottom-1 rounded-full bg-velora-emerald shadow-sm shadow-velora-emerald/20 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
                  billing === 'monthly' ? 'left-1 w-[calc(50%-4px)]' : 'left-[calc(50%)] w-[calc(50%-4px)]'
                )}
              />
            </div>
            {billing === 'annual' && (
              <span className="inline-flex items-center rounded-full bg-velora-emerald/10 text-velora-emerald text-xs font-semibold px-2.5 py-1 animate-in fade-in slide-in-from-right-2 duration-300">
                Save 20%
              </span>
            )}
          </div>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <StaggerItem key={tier.name}>
              <TiltCard>
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
                  <p className="text-xs text-foreground/40 mt-1.5">
                    {tier.priceNote}
                  </p>
                </div>

                <ul className="mt-6 space-y-3 flex-1" role="list">
                  {tier.features.map((feature) => (
                    <li
                      key={feature.text}
                      className="flex items-start gap-2.5"
                    >
                      {feature.included ? (
                        <Check className="w-4 h-4 text-velora-emerald shrink-0 mt-0.5" />
                      ) : (
                        <Minus className="w-4 h-4 text-muted-foreground/40 shrink-0 mt-0.5" />
                      )}
                      <span
                        className={cn(
                          'text-sm leading-relaxed',
                          feature.included ? 'text-foreground' : 'text-muted-foreground/50'
                        )}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => setModalOpen(true)}
                  className={cn(
                    'w-full mt-8 h-11 rounded-xl text-sm font-medium transition-all duration-200 active:scale-[0.98]',
                    tier.highlight
                      ? 'bg-velora-emerald hover:bg-velora-emerald-dark text-white shadow-lg shadow-velora-emerald/20'
                      : 'bg-velora-navy hover:bg-velora-navy-light text-white shadow-sm'
                  )
                }
                >
                  {tier.cta}
                </Button>
              </div>
              </TiltCard>
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
            All packages include a consultation, implementation, testing, launch support and ongoing monitoring. Usage-based charges may apply for high-volume systems.
          </p>
        </FadeIn>
      </Section>

      <ConsultationModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  )
}
