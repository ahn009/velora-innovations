import Link from 'next/link'
import { InfoPage } from '@/components/velora/info-page'

export default function AccessibilityPage() {
  return (
    <InfoPage
      eyebrow="Accessibility"
      title="Accessibility Statement"
      intro="Velora aims to make this website usable with keyboards, screen readers, zoom, high-contrast settings, and reduced-motion preferences."
    >
      <section>
        <h2>Measures in place</h2>
        <ul>
          <li>A skip link and semantic page landmarks.</li>
          <li>Keyboard-operable forms and controls with visible focus states.</li>
          <li>Labels, status messages, and text alternatives for meaningful images.</li>
          <li>Reduced-motion support for visitors who request it.</li>
          <li>Responsive layouts intended to work at mobile sizes and with zoom.</li>
        </ul>
      </section>
      <section>
        <h2>Known limitations</h2>
        <p>
          Accessibility is an ongoing process. Third-party scheduling, communication, or payment tools
          may have their own limitations and will be reviewed before integration.
        </p>
      </section>
      <section>
        <h2>Report a problem</h2>
        <p>
          Use the <Link href="/contact">contact form</Link>, describe the page and task, and write
          “accessibility issue” in the workflow field. We will provide an alternative way to complete the task.
        </p>
      </section>
    </InfoPage>
  )
}
