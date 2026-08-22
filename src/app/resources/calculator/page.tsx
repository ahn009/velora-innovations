import { pageMetadata } from '@/lib/seo'
import { FinalCtaSection } from '@/components/velora/final-cta-section'
import { PageHero } from '@/components/velora/page-hero'
import { RoiCalculator } from '@/components/velora/roi-calculator'

export const metadata = pageMetadata({ title: 'Opportunity Calculator | Velora Innovations', description: 'Model a missed-inquiry opportunity using your own assumptions without treating the result as a forecast.', path: '/resources/calculator' })

export default function CalculatorPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Opportunity Calculator"
        title="Model the Size of a Missed-Inquiry Problem"
        description="Use your own volume, value and recovery assumptions. The result is a planning model, not a promise or forecast."
        breadcrumbs={[{ label: 'Resources', href: '/resources' }]}
        secondaryLink={{ label: 'Review pricing', href: '/pricing' }}
      />
      <RoiCalculator />
      <FinalCtaSection />
    </main>
  )
}
