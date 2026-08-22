import { pageMetadata } from '@/lib/seo'
import Link from 'next/link'
import { ArrowRight, Cable } from 'lucide-react'
import { FinalCtaSection } from '@/components/velora/final-cta-section'
import { PageHero } from '@/components/velora/page-hero'
import { SolutionSection } from '@/components/velora/solution-section'

export const metadata = pageMetadata({ title: 'AI Automation Solutions | Velora Innovations', description: 'Explore AI receptionist, lead qualification, appointment, support, follow-up, CRM, and workflow automation services.', path: '/solutions' })

export default function SolutionsPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Solutions"
        title="AI systems for the work your team handles every day"
        description="Compare focused systems for customer communication, lead management, scheduling, follow-up, and connected business operations."
        primaryLink={{ label: 'Find my best automation', href: '/assessment' }}
        secondaryLink={{ label: 'Request a Consultation', href: '/consultation' }}
        compact
      />
      <SolutionSection variant="catalog" />
      <section className="bg-muted/35 py-16 sm:py-20"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"><div className="max-w-2xl"><p className="eyebrow">Which one do I need?</p><h2 className="mt-3 text-3xl font-semibold tracking-tight">Start with the operational problem.</h2><p className="mt-4 text-base leading-7 text-muted-foreground">The right starting point depends on where response time, coordination, or data ownership is breaking down.</p></div><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{[['Missed calls', 'AI Receptionist'], ['Slow lead response', 'Lead Qualification'], ['Scheduling bottlenecks', 'Appointment Automation'], ['Manual CRM updates', 'CRM Automation'], ['Disconnected processes', 'Workflow Automation']].map(([problem, solution]) => <div key={problem} className="rounded-xl border border-border bg-card p-4"><p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{problem}</p><p className="mt-3 text-sm font-semibold text-foreground">{solution}</p></div>)}</div></div></section>
      <section className="bg-muted/35 py-14 sm:py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
          <div className="max-w-2xl">
            <Cable className="h-6 w-6 text-velora-emerald" aria-hidden="true" />
            <h2 className="mt-4 text-2xl font-semibold tracking-tight">Integration scope is verified, not assumed</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">We review the actual APIs, permissions, field mapping and failure behaviour before finalizing a workflow.</p>
          </div>
          <Link href="/resources/integrations" className="group inline-flex shrink-0 items-center text-sm font-medium text-velora-emerald hover:text-velora-emerald-dark">
            Review integration approach
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </section>
      <FinalCtaSection />
    </main>
  )
}
