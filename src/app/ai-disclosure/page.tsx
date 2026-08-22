import Link from 'next/link'
import { InfoPage } from '@/components/velora/info-page'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({ title: 'AI Disclosure | Velora Innovations', description: 'Understand how Velora Innovations labels scripted demos and approaches disclosure, limitations, and human oversight in AI workflows.', path: '/ai-disclosure' })

export default function AiDisclosurePage() {
  return (
    <InfoPage
      eyebrow="Transparency"
      title="AI Disclosure"
      intro="Velora designs bounded automation systems and does not present a scripted demonstration, AI-generated response, or artificial voice as a human."
    >
      <section>
        <h2>Website demonstration</h2>
        <p>
          The guided workflow on this website is scripted. It illustrates conversation structure and
          escalation logic; it is not connected to a production model and its messages are not stored.
        </p>
      </section>
      <section>
        <h2>Client deployments</h2>
        <p>
          Production systems should disclose AI use at the start of an interaction where appropriate,
          stay within approved knowledge and actions, identify restricted topics, and provide a clear
          route to a person. Channel- and jurisdiction-specific consent may also be required.
        </p>
      </section>
      <section>
        <h2>Limitations</h2>
        <p>
          AI systems can misunderstand requests and produce incorrect output. They require testing,
          monitoring, access controls, incident handling, and human review for consequential decisions.
          Velora does not recommend autonomous use for emergency, legal, medical, credit, employment,
          or other high-impact decisions without a separate risk and compliance program.
        </p>
      </section>
      <section>
        <h2>Questions</h2>
        <p>Use the <Link href="/consultation">consultation request page</Link> to request the disclosure and control plan for a proposed project.</p>
      </section>
    </InfoPage>
  )
}
