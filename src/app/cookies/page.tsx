import Link from 'next/link'
import { InfoPage } from '@/components/velora/info-page'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({ title: 'Cookie and Analytics Notice | Velora Automations', description: 'Review how the Velora Automations website uses browser preferences, analytics, and essential platform storage.', path: '/cookies' })

export default function CookiesPage() {
  return (
    <InfoPage
      eyebrow="Legal"
      title="Cookie and Local Storage Notice"
      intro="This website uses preference storage and analytics tools to understand site performance. It does not use repository-configured advertising trackers."
    >
      <section>
        <h2>Browser preferences</h2>
        <p>
          The site may use browser local storage to remember display preferences such as light/dark mode
          and the selected colour theme. These values stay in your browser and are not used for advertising.
        </p>
      </section>
      <section>
        <h2>Essential platform storage</h2>
        <p>
          The hosting platform or security layer may use strictly necessary cookies or request metadata
          to deliver and protect the website. These should not be used for cross-site advertising.
        </p>
      </section>
      <section>
        <h2>Analytics</h2>
        <p>
          Google Tag Manager and Vercel Analytics are configured in this website. Depending on their
          deployment settings, they may process device, page-view, and request information to measure
          site usage and performance. Consent controls must be applied where opt-in consent is required.
        </p>
      </section>
      <section>
        <h2>Your control</h2>
        <p>
          You can clear website storage through your browser settings. See the{' '}
          <Link href="/privacy">Privacy Policy</Link> for other data choices.
        </p>
      </section>
    </InfoPage>
  )
}
