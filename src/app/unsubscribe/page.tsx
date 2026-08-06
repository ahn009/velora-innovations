import { InfoPage } from '@/components/velora/info-page'
import { UnsubscribeForm } from '@/components/velora/unsubscribe-form'

export default function UnsubscribePage() {
  return (
    <InfoPage
      eyebrow="Email preferences"
      title="Unsubscribe from updates"
      intro="Enter the email address used to subscribe. For privacy, the confirmation is the same whether or not the address is in our records."
    >
      <section>
        <UnsubscribeForm />
      </section>
    </InfoPage>
  )
}
