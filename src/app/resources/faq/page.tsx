import type { Metadata } from 'next'
import { FaqSection } from '@/components/velora/faq-section'
import { FinalCtaSection } from '@/components/velora/final-cta-section'
import { PageHero } from '@/components/velora/page-hero'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Velora Innovations',
  description: 'Answers about AI agent scope, integrations, cost, timelines, data handling and human escalation.',
}

export default function FaqPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="FAQ"
        title="Direct Answers About Scope, Cost and Delivery"
        description="Search the questions buyers commonly ask before deciding whether a focused AI workflow is appropriate."
        breadcrumbs={[{ label: 'Resources', href: '/resources' }]}
        secondaryLink={{ label: 'Review pricing', href: '/pricing' }}
      />
      <FaqSection />
      <FinalCtaSection />
    </main>
  )
}
