import Link from 'next/link'
import { ArrowRight, CircleDollarSign, Gauge, PlugZap } from 'lucide-react'
import { FinalCtaSection } from '@/components/velora/final-cta-section'
import { PageHero } from '@/components/velora/page-hero'
import { PricingSection } from '@/components/velora/pricing-section'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({ title: 'AI Automation Pricing | Velora Automations', description: 'Review implementation starting points and the workflow, integration, usage, and management factors that shape an AI automation proposal.', path: '/pricing' })

const costFactors = [
  { icon: PlugZap, title: 'Integration scope', description: 'The number and quality of APIs, authentication methods and data mappings.' },
  { icon: Gauge, title: 'Channels and volume', description: 'Voice, chat, SMS or email usage plus model and provider consumption.' },
  { icon: CircleDollarSign, title: 'Ongoing management', description: 'Monitoring, revisions, support expectations and reporting requirements.' },
] as const

export default function PricingPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Pricing"
        title="Clear Starting Points With Scope Confirmed Before Commitment"
        description="Implementation begins with a scoped workflow. Recurring management, model usage, telephony and third-party software are quoted separately."
        primaryLink={{ label: 'Discuss My Automation Plan', href: '/consultation' }}
        secondaryLink={{ label: 'Read pricing FAQ', href: '/resources/faq' }}
        compact
      />
      <PricingSection />
      <section className="bg-muted/35 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight">What changes the final cost?</h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">The proposal separates implementation work from recurring operational costs so buyers can evaluate both.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {costFactors.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <Icon className="h-6 w-6 text-velora-emerald" aria-hidden="true" />
                <h3 className="mt-5 font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/resources/calculator" className="group inline-flex items-center text-sm font-medium text-velora-emerald hover:text-velora-emerald-dark">
              Model the missed-inquiry opportunity
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
      <FinalCtaSection />
    </main>
  )
}
