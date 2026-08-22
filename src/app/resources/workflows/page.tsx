import { pageMetadata } from '@/lib/seo'
import { FinalCtaSection } from '@/components/velora/final-cta-section'
import { PageHero } from '@/components/velora/page-hero'
import { ResultsSection } from '@/components/velora/results-section'

export const metadata = pageMetadata({ title: 'Example AI Workflows | Velora Innovations', description: 'Explore illustrative customer intake, qualification and appointment workflows.', path: '/resources/workflows' })

export default function WorkflowsPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Example Workflows"
        title="Illustrative Systems With Scope and Limitations Made Clear"
        description="These examples demonstrate possible workflow structure. They are not customer case studies or guaranteed performance outcomes."
        breadcrumbs={[{ label: 'Resources', href: '/resources' }]}
        secondaryLink={{ label: 'Review solutions', href: '/solutions' }}
      />
      <ResultsSection />
      <FinalCtaSection />
    </main>
  )
}
