import { pageMetadata } from '@/lib/seo'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, CircleOff } from 'lucide-react'
import { FinalCtaSection } from '@/components/velora/final-cta-section'
import { IndustrySection } from '@/components/velora/industry-section'
import { PageHero } from '@/components/velora/page-hero'

export const metadata = pageMetadata({ title: 'Industries We Support | Velora Innovations', description: 'Review practical AI workflow opportunities for home services, dental, law, real estate, property management, and other inquiry-driven teams.', path: '/industries' })

export default function IndustriesPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Industries"
        title="AI automation built around how your business actually operates"
        description="Choose an industry to see common workflows, useful automation opportunities, and the implementation boundaries that keep people in control."
        primaryLink={{ label: 'Find my industry fit', href: '/assessment' }}
        secondaryLink={{ label: 'Request a Consultation', href: '/consultation' }}
        compact
      />
      <IndustrySection variant="directory" />
      <section className="bg-background py-16 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-2 lg:px-10">
          <div className="rounded-2xl border border-velora-emerald/25 bg-velora-emerald/[0.06] p-6 sm:p-8">
            <CheckCircle2 className="h-6 w-6 text-velora-emerald" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-semibold tracking-tight">Strong initial fit</h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-foreground/75">
              <li>High volumes of similar inquiries or coordination tasks</li>
              <li>Documented policies, service areas, availability and escalation rules</li>
              <li>Systems with suitable API access and a team member responsible for outcomes</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <CircleOff className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
            <h2 className="mt-5 text-2xl font-semibold tracking-tight">Requires separate review</h2>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-muted-foreground">
              <li>Emergency decisions or autonomous high-impact recommendations</li>
              <li>Healthcare, legal, financial, employment or other regulated decisions</li>
              <li>Workflows without reliable source information or a human escalation path</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-7xl px-5 sm:px-8 lg:px-10">
          <Link href="/how-it-works" className="group inline-flex items-center text-sm font-medium text-velora-emerald hover:text-velora-emerald-dark">
            See how fit is assessed
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </section>
      <FinalCtaSection />
    </main>
  )
}
