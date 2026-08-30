import Link from 'next/link'
import { InfoPage } from '@/components/velora/info-page'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({ title: 'About Velora Automations | Practical AI Automation', description: 'Learn what Velora Automations builds, who it serves, and how it approaches integrations, testing, human control, and responsible implementation.', path: '/about' })

export default function AboutPage() {
  return (
    <InfoPage
      eyebrow="About"
      title="Practical AI automation with clear boundaries"
      intro="Velora Automations builds practical AI automation systems for small and mid-sized, customer-facing businesses in the United States and Canada."
    >
      <section>
        <h2>What we build</h2>
        <p>
          We design focused workflows for customer response, routine questions, lead qualification,
          appointment scheduling, follow-up, CRM updates, and human escalation. We begin with one
          scoped process instead of promising that AI can replace an entire operation.
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
          We serve inquiry- and appointment-driven businesses, including home services, dental and
          medical practices, law firms, real estate, property management, accounting, automotive,
          and e-commerce teams. Regulated or high-risk use cases require a separate legal, privacy,
          security, and professional review and may not be accepted.
        </p>
      </section>
      <section>
        <h2>Talk with the person responsible for your project</h2>
        <p>
          People remain responsible for judgment, sensitive conversations, exceptions, and regulated
          decisions. We share the proposed project owner, delivery responsibilities, vendors, and
          escalation contacts before an engagement begins. <Link href="/consultation">Request an introductory consultation</Link>.
        </p>
      </section>
    </InfoPage>
  )
}
