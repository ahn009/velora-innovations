import { PageHero } from '@/components/velora/page-hero'
import { ResourceHub } from '@/components/velora/resource-hub'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({ title: 'AI Automation Resources | Velora Automations', description: 'Explore workflow examples, integration questions, security controls, implementation costs, and frequently asked questions.', path: '/resources' })

export default function ResourcesPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Resources"
        title="Learn how to evaluate AI automation properly"
        description="Explore the workflow, integration, security, cost and delivery questions that should be answered before an AI deployment begins."
        primaryLink={{ label: 'Explore the guided demo', href: '/resources/demo' }}
        secondaryLink={{ label: 'Take the assessment', href: '/assessment' }}
        compact
      />
      <ResourceHub />
    </main>
  )
}
