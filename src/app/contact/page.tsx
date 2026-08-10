import { ConsultationForm } from '@/components/velora/consultation-form'
import { InfoPage } from '@/components/velora/info-page'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({ title: 'Contact Velora Innovations | AI Automation Consultation', description: 'Share the customer or operational workflow you want to improve and request a practical consultation with Velora Innovations.', path: '/contact' })

export default function ContactPage() {
  return (
    <InfoPage
      eyebrow="Contact"
      title="Tell us which workflow you want to improve"
      intro="Submit the details below. The request is validated and stored before a success message is shown."
    >
      <section>
        <h2>Consultation request</h2>
        <p>
          Share enough context for us to assess fit. Do not include passwords, payment details,
          health information, legal case details, or other sensitive personal information.
        </p>
        <ConsultationForm source="contact-page" />
      </section>
    </InfoPage>
  )
}
