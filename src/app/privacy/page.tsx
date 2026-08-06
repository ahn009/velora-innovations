import Link from 'next/link'
import { InfoPage } from '@/components/velora/info-page'

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Legal"
      title="Privacy Policy"
      intro="Effective August 6, 2026. This policy describes the website data practices implemented in this repository. Deployment providers and client projects may require additional notices."
    >
      <section>
        <h2>Information we collect</h2>
        <p>
          The consultation form can collect your name, work email, optional phone number, company,
          industry, budget range, workflow notes, submission source, consent version, and timestamp.
          The newsletter form collects your email, consent version, source, and timestamp.
        </p>
        <p className="mt-3">
          To limit automated abuse, the server creates a one-way hash from limited request metadata
          and stores a short-lived request counter. The site also stores theme preferences in your
          browser. The guided demo does not send its messages to the server.
        </p>
      </section>
      <section>
        <h2>Why we use it</h2>
        <ul>
          <li>Respond to consultation requests and assess project fit.</li>
          <li>Send requested newsletter updates and maintain consent records.</li>
          <li>Protect forms, troubleshoot delivery, and secure the website.</li>
          <li>Meet legal obligations and handle privacy requests.</li>
        </ul>
      </section>
      <section>
        <h2>Service providers and transfers</h2>
        <p>
          Website hosting, database, and notification providers configured by Velora may process
          submissions on our behalf. If data moves between Canada and the United States, it may be
          processed under the laws of the destination. Client projects receive a separate vendor and
          subprocessor review before launch.
        </p>
      </section>
      <section>
        <h2>Retention and security</h2>
        <p>
          We retain consultation records only for the business and legal purposes for which they were
          collected. Newsletter consent records remain active until you unsubscribe or request deletion.
          We use access controls, input validation, rate limiting, and transport protections, but no
          internet service can promise absolute security.
        </p>
      </section>
      <section>
        <h2>Your choices</h2>
        <p>
          Depending on where you live, you may ask to access, correct, or delete personal information,
          withdraw consent, or object to certain processing. Newsletter messages must include an
          unsubscribe method. You can also use the website&apos;s{' '}
          <Link href="/unsubscribe">unsubscribe form</Link> at any time.
        </p>
      </section>
      <section>
        <h2>Contact and complaints</h2>
        <p>
          Use the <Link href="/contact">contact form</Link> and write “privacy request” in the workflow
          field. Do not submit identity documents until we provide a secure verification method.
        </p>
      </section>
      <section>
        <h2>Changes</h2>
        <p>We will update the effective date and the consent version when material practices change.</p>
      </section>
    </InfoPage>
  )
}
