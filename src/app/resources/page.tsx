import type { Metadata } from 'next'
import { PageHero } from '@/components/velora/page-hero'
import { ResourceHub } from '@/components/velora/resource-hub'

export const metadata: Metadata = {
  title: 'Resources | Velora Innovations',
  description: 'Explore guided examples, workflow ideas, integrations, security controls, calculator and frequently asked questions.',
}

export default function ResourcesPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Resources"
        title="Practical Detail Before You Book a Conversation"
        description="Explore the workflow, integration, security, cost and delivery questions that should be answered before an AI deployment begins."
        secondaryLink={{ label: 'Explore solutions', href: '/solutions' }}
      />
      <ResourceHub />
    </main>
  )
}
