import Link from 'next/link'
import { InfoPage } from '@/components/velora/info-page'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({ title: 'About Velora Innovations | AI Automation Studio', description: 'Learn how Velora Innovations designs focused AI workflows with clear boundaries, testing, integrations, and human ownership.', path: '/about' })

export default function AboutPage() {
  return (
    <InfoPage
      eyebrow="About"
      title="Practical AI automation with clear boundaries"
      intro="Velora Innovations is an independent AI automation studio serving customer-facing service businesses in the United States and Canada."
    >
      <section>
        <h2>What we build</h2>
        <p>
          We design focused workflows for customer intake, routine questions, lead qualification,
          appointment coordination, follow-up, and human escalation. We begin with one bounded
          process instead of promising that AI can replace an entire operation.
        </p>
      </section>
      <section>
        <h2>How we work</h2>
        <ul>
          <li>Map the current workflow and define where a person remains responsible.</li>
          <li>Confirm API access, data handling, permissions, and success criteria before building.</li>
          <li>Test with approved scenarios and launch in a controlled scope.</li>
          <li>Review logs and outcomes, then expand only when the evidence supports it.</li>
        </ul>
      </section>
      <section>
        <h2>Our current focus</h2>
        <p>
          We currently focus on home services, property management, real estate, and similar
          appointment- or enquiry-driven businesses. Regulated or high-risk use cases require a
          separate legal, privacy, and security assessment and may not be accepted.
        </p>
      </section>
      <section>
        <h2>Talk with the person responsible for your project</h2>
        <p>
          We share the proposed project owner, delivery responsibilities, vendors, and escalation
          contacts before an engagement begins. <Link href="/contact">Request an introductory consultation</Link>.
        </p>
      </section>
    </InfoPage>
  )
}
