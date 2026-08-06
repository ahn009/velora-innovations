import type { Metadata } from 'next'
import { FinalCtaSection } from '@/components/velora/final-cta-section'
import { PageHero } from '@/components/velora/page-hero'
import { RoiCalculator } from '@/components/velora/roi-calculator'

export const metadata: Metadata = {
  title: 'Opportunity Calculator | Velora Innovations',
  description: 'Model a missed-enquiry opportunity using your own assumptions without treating the result as a forecast.',
}

export default function CalculatorPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Opportunity Calculator"
        title="Model the Size of a Missed-Enquiry Problem"
        description="Use your own volume, value and recovery assumptions. The result is a planning model, not a promise or forecast."
        breadcrumbs={[{ label: 'Resources', href: '/resources' }]}
        secondaryLink={{ label: 'Review pricing', href: '/pricing' }}
      />
      <RoiCalculator />
      <FinalCtaSection />
    </main>
  )
}
