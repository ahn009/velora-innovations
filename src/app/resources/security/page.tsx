import type { Metadata } from 'next'
import { FinalCtaSection } from '@/components/velora/final-cta-section'
import { PageHero } from '@/components/velora/page-hero'
import { SecuritySection } from '@/components/velora/security-section'

export const metadata: Metadata = {
  title: 'Security and Control | Velora Innovations',
  description: 'Review the deployment-specific controls considered for AI workflows.',
}

export default function SecurityPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Security & Control"
        title="Controls Defined for the Actual Workflow and Vendors"
        description="Permissions, retention, logging, disclosures and escalation requirements are documented against the systems that will really process data."
        breadcrumbs={[{ label: 'Resources', href: '/resources' }]}
        secondaryLink={{ label: 'Read AI disclosure', href: '/ai-disclosure' }}
      />
      <SecuritySection />
      <FinalCtaSection />
    </main>
  )
}
