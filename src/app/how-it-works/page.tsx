import Link from 'next/link'
import { ArrowRight, Cable, ShieldCheck } from 'lucide-react'
import { FinalCtaSection } from '@/components/velora/final-cta-section'
import { HowItWorksSection } from '@/components/velora/how-it-works-section'
import { PageHero } from '@/components/velora/page-hero'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({ title: 'How AI Automation Implementation Works | Velora Innovations', description: 'Understand Velora Innovations’ workflow discovery, integration review, testing, controlled launch, and optimization process.', path: '/how-it-works' })

const supportingPages = [
  {
    icon: Cable,
    title: 'Integration review',
    description: 'Confirm API access, authentication, field mapping and failure behaviour before promising scope.',
    href: '/resources/integrations',
  },
  {
    icon: ShieldCheck,
    title: 'Security and control',
    description: 'Define permissions, retention, logging, disclosures and human responsibility for the deployment.',
    href: '/resources/security',
  },
] as const

export default function HowItWorksPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="How It Works"
        title="From a manual workflow to a working AI system"
        description="We start with the process, not the AI. Every proposal is tied to real systems, approved scenarios, acceptance criteria, and a named human owner for exceptions."
        primaryLink={{ label: 'Book a Consultation', href: '/consultation' }}
        secondaryLink={{ label: 'Review pricing', href: '/pricing' }}
        compact
      />
      <HowItWorksSection />
      <section className="bg-muted/35 py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-5 md:grid-cols-2">
            {supportingPages.map(({ icon: Icon, title, description, href }) => (
              <Link key={href} href={href} className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-velora-emerald/30 hover:shadow-lg active:scale-[0.99]">
                <Icon className="h-6 w-6 text-velora-emerald" aria-hidden="true" />
                <h2 className="mt-5 text-xl font-semibold tracking-tight">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
                <span className="mt-5 inline-flex items-center text-sm font-medium text-velora-emerald">
                  Review details
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <FinalCtaSection />
    </main>
  )
}
