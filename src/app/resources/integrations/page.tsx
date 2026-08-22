import { pageMetadata } from '@/lib/seo'
import { FinalCtaSection } from '@/components/velora/final-cta-section'
import { IntegrationSection } from '@/components/velora/integration-section'
import { PageHero } from '@/components/velora/page-hero'

export const metadata = pageMetadata({ title: 'AI Agent Integrations | Velora Innovations', description: 'Understand how CRM, calendar, channel and support integrations are evaluated before implementation.', path: '/resources/integrations' })

export default function IntegrationsPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Integrations"
        title="Confirm Real System Access Before Promising Automation"
        description="A named product logo is not enough. We verify authentication, permissions, supported actions, field mapping, rate limits and failure behaviour."
        breadcrumbs={[{ label: 'Resources', href: '/resources' }]}
        secondaryLink={{ label: 'See delivery process', href: '/how-it-works' }}
      />
      <IntegrationSection />
      <FinalCtaSection />
    </main>
  )
}
