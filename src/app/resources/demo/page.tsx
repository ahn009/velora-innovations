import { pageMetadata } from '@/lib/seo'
import { DemoSection } from '@/components/velora/demo-section'
import { FinalCtaSection } from '@/components/velora/final-cta-section'
import { PageHero } from '@/components/velora/page-hero'

export const metadata = pageMetadata({ title: 'Guided AI Workflow Demo | Velora Innovations', description: 'Review a transparent scripted scheduling workflow and its intended human handoff.', path: '/resources/demo' })

export default function DemoPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Guided Demo"
        title="See the Structure of a Customer Conversation"
        description="This scripted sample shows disclosure, approved responses, booking logic and the point where a production workflow would involve a person."
        breadcrumbs={[{ label: 'Resources', href: '/resources' }]}
        secondaryLink={{ label: 'View example workflows', href: '/resources/workflows' }}
      />
      <DemoSection />
      <FinalCtaSection />
    </main>
  )
}
