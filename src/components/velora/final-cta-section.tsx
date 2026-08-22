'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, ClipboardCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Section } from './section'

const ctaByPath: Record<string, { title: string; description: string }> = {
  '/solutions': { title: 'Choose the workflow to improve first.', description: 'Request a practical review of the customer communication or business process creating the biggest bottleneck.' },
  '/solutions/ai-receptionist': { title: 'Map your first-call workflow.', description: 'Review the questions, routing rules, calendar access, and human handoff your receptionist workflow would need.' },
  '/solutions/lead-qualification': { title: 'Build a better first response for new leads.', description: 'Define the questions, routing rules, and human-review cases that should shape qualification.' },
  '/solutions/appointment-automation': { title: 'Review your scheduling workflow.', description: 'Map eligibility, real calendar access, confirmations, changes, and the exceptions your team should own.' },
  '/solutions/customer-support': { title: 'Define a safer path for routine support.', description: 'Review approved answers, permissioned lookups, ticket routing, and the point where support staff take over.' },
  '/solutions/follow-up-automation': { title: 'Make follow-up easier to manage.', description: 'Define useful triggers, timing, consent, stop rules, and ownership for customer replies.' },
  '/solutions/crm-automation': { title: 'Map the CRM updates your team repeats.', description: 'Review approved fields, record ownership, validation, and how failed updates should be handled.' },
  '/solutions/workflow-automation': { title: 'Connect the process between your tools.', description: 'Identify a focused workflow with clear inputs, permitted actions, failure handling, and human ownership.' },
  '/industries': { title: 'Review the workflow that fits your industry.', description: 'Request a practical discussion of the customer requests, tools, rules, and human decisions involved.' },
  '/industries/home-services': { title: 'See how missed calls could become structured service requests.', description: 'Review service-area checks, urgency rules, scheduling access, and the handoff to dispatch.' },
  '/industries/dental': { title: 'Review where front-desk automation could help.', description: 'Map administrative questions and appointment requests while keeping clinical decisions with qualified staff.' },
  '/industries/law-firms': { title: 'Review your intake workflow without automating legal judgment.', description: 'Define administrative intake, consultation routing, and the point where firm staff must take over.' },
  '/industries/real-estate': { title: 'Keep buyer and seller inquiries moving.', description: 'Review lead context, property questions, consultation requests, and agent handoff.' },
  '/industries/property-management': { title: 'Give tenant and leasing requests a clearer route.', description: 'Map request categories, property context, priority rules, and responsible team ownership.' },
  '/industries/accounting': { title: 'Protect focus during deadline-driven work.', description: 'Review administrative intake and reminders while keeping tax and financial advice with qualified professionals.' },
  '/industries/medical-practices': { title: 'Review the administrative load on your front desk.', description: 'Map routine requests and appointment coordination without automating clinical judgment.' },
  '/industries/automotive': { title: 'Structure service inquiries before advisor follow-up.', description: 'Review vehicle intake, permitted availability, reminders, and the handoff to qualified technicians.' },
  '/industries/ecommerce': { title: 'Reduce repetitive order and product questions.', description: 'Review approved answers, permissioned lookups, exception handling, and support ownership.' },
  '/pricing': { title: 'Scope your first implementation.', description: 'Request a practical review of the workflow, systems, and implementation range that fit your starting point.' },
  '/how-it-works': { title: 'Map a controlled first implementation.', description: 'Bring one real workflow and we will review scope, access, testing, ownership, and a sensible next step.' },
  '/resources': { title: 'Need help applying this to your workflow?', description: 'Request a practical discussion of the examples, controls, and system questions most relevant to your business.' },
}

export function FinalCtaSection({ title, description }: { title?: string; description?: string } = {}) {
  const pathname = usePathname()
  const contextual = ctaByPath[pathname] ?? (pathname.startsWith('/resources/') ? ctaByPath['/resources'] : undefined)
  const pathContext = pathname.startsWith('/solutions/')
    ? `?interest=${pathname.split('/').pop()}`
    : pathname.startsWith('/industries/')
      ? `?industry=${pathname.split('/').pop()}`
      : ''

  return (
    <Section id="consultation" background="navy" className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
      <Image
        src="/images/cta-bg.png"
        alt=""
        fill
        sizes="100vw"
        className="pointer-events-none object-cover opacity-15"
        role="presentation"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-0 bg-velora-navy/75" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-[var(--radius-lg)] border border-white/15 bg-white/10 text-brand-primary">
          <ClipboardCheck className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="eyebrow mt-7 text-brand-primary">Next step</p>
        <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          {title ?? contextual?.title ?? 'See what your business can automate.'}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
          {description ?? contextual?.description ?? 'Request a practical consultation to review your customer journey, repetitive tasks, and current systems—and identify where automation could create the most useful operational value.'}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button variant="brand" size="lg" asChild><Link href={`/consultation${pathContext}`}>Request a Consultation <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link></Button>
          <Link href="/assessment" className="inline-flex h-12 items-center justify-center rounded-[var(--radius-lg)] border border-white/20 px-5 text-sm font-semibold text-white/85 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">
            Take the opportunity assessment
          </Link>
        </div>
        <p className="mt-5 text-xs text-white/50">No purchase required · practical recommendations</p>
      </div>
    </Section>
  )
}
