import Link from 'next/link'
import { InfoPage } from '@/components/velora/info-page'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({ title: 'Website Terms | Velora Innovations', description: 'Review the terms governing use of the Velora Innovations website, guided demo, and consultation request flow.', path: '/terms' })

export default function TermsPage() {
  return (
    <InfoPage
      eyebrow="Legal"
      title="Website Terms"
      intro="Effective August 6, 2026. These terms govern use of the public Velora Innovations website, guided demo, and consultation request forms."
    >
      <section>
        <h2>Informational website</h2>
        <p>
          Website content and the guided demo are general information and illustrative examples. They
          are not legal, medical, financial, security, or professional advice and are not a guarantee
          that a proposed automation is suitable for your business.
        </p>
      </section>
      <section>
        <h2>No service agreement through this site</h2>
        <p>
          A consultation request does not create a client relationship, reserve capacity, or require a
          purchase. Services begin only after both parties sign a written agreement defining scope,
          fees, responsibilities, data handling, acceptance criteria, and limitations.
        </p>
      </section>
      <section>
        <h2>Acceptable use</h2>
        <p>
          Do not attempt to disrupt the site, bypass rate limits, probe systems without written
          permission, submit unlawful content, impersonate another person, or place sensitive personal
          information in public forms or demos.
        </p>
      </section>
      <section>
        <h2>Pricing and examples</h2>
        <p>
          Public prices are USD implementation starting points. Recurring management, model, telephony,
          software, tax, and integration costs are quoted separately. Example workflows are not customer
          case studies or promised performance results.
        </p>
      </section>
      <section>
        <h2>Availability and changes</h2>
        <p>
          We may change, suspend, or correct website content and features. We do not promise continuous
          website availability. Written client agreements, not this page, control paid services.
        </p>
      </section>
      <section>
        <h2>Privacy</h2>
        <p>See the <Link href="/privacy">Privacy Policy</Link> for website data practices.</p>
      </section>
      <section>
        <h2>Questions</h2>
        <p>Use the <Link href="/consultation">consultation request page</Link> for questions about these terms.</p>
      </section>
    </InfoPage>
  )
}
