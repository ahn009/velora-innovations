import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Cable } from 'lucide-react'
import { FinalCtaSection } from '@/components/velora/final-cta-section'
import { PageHero } from '@/components/velora/page-hero'
import { ProblemSection } from '@/components/velora/problem-section'
import { SolutionSection } from '@/components/velora/solution-section'

export const metadata: Metadata = {
  title: 'AI Agent Solutions | Velora Innovations',
  description: 'Explore focused AI receptionist, lead qualification, appointment and workflow automation services.',
}

export default function SolutionsPage() {
  return (
    <main id="main-content">
      <PageHero
        eyebrow="Solutions"
        title="AI Agents Built Around One Real Workflow at a Time"
        description="We identify a bounded customer or operational process, confirm the available systems and define exactly where a person remains responsible."
        secondaryLink={{ label: 'View guided demo', href: '/resources/demo' }}
      />
      <ProblemSection />
      <SolutionSection />
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
