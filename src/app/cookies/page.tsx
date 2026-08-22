import Link from 'next/link'
import { InfoPage } from '@/components/velora/info-page'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({ title: 'Cookie and Local Storage Notice | Velora Innovations', description: 'Review how the Velora Innovations website uses browser preferences, local storage, and any future analytics controls.', path: '/cookies' })

export default function CookiesPage() {
  return (
    <InfoPage
      eyebrow="Legal"
      title="Cookie and Local Storage Notice"
      intro="The current website does not load advertising trackers or optional analytics cookies from this repository."
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
        <h2>Future analytics</h2>
        <p>
          If optional analytics or advertising technologies are added, this notice and the consent
          controls must be updated before those technologies run where opt-in consent is required.
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
