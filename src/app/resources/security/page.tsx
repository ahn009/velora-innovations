import { pageMetadata } from '@/lib/seo'
import { FinalCtaSection } from '@/components/velora/final-cta-section'
import { PageHero } from '@/components/velora/page-hero'
import { SecuritySection } from '@/components/velora/security-section'

export const metadata = pageMetadata({ title: 'AI Automation Security and Control | Velora Automations', description: 'Review workflow-specific permissions, data handling, monitoring, failure paths, and human controls considered for AI deployments.', path: '/resources/security' })

export default function SecurityPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Security & Control"
        title="Controls Defined for the Actual Workflow and Vendors"
        description="Permissions, retention, logging, disclosures and escalation requirements are documented against the systems that will really process data."
        breadcrumbs={[{ label: 'Resources', href: '/resources' }]}
        path="/resources/security"
        secondaryLink={{ label: 'Read AI disclosure', href: '/ai-disclosure' }}
      />
      <SecuritySection />
      <FinalCtaSection />
    </main>
  )
}
