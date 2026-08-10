'use client'

import { useId, useState } from 'react'
import Link from 'next/link'
import { Building2, CarFront, CircleDollarSign, FileText, Gavel, Home, Hospital, ShoppingBag, Wrench } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Section, SectionHeading } from './section'

type Industry = { id: string; title: string; problem: string; automation: string; steps: string[]; customerLabel: string; customerQuote: string; icon: LucideIcon }

const industries: Industry[] = [
  { id: 'home-services', title: 'Home Services', problem: 'Missed after-hours service calls.', automation: 'An AI receptionist captures the issue, checks service area and urgency, offers eligible appointment options, and updates the CRM.', steps: ['Identify service request', 'Check service area', 'Determine urgency', 'Offer appointment', 'Update CRM'], customerLabel: 'Customer', customerQuote: '“My AC stopped working. Do you have an opening tomorrow?”', icon: Wrench },
  { id: 'dental-practices', title: 'Dental Practices', problem: 'Front-desk time lost to routine calls and rescheduling.', automation: 'An assistant handles approved intake, availability checks, reminders, and human escalation for clinical or sensitive questions.', steps: ['Capture reason for visit', 'Check patient status', 'Offer approved times', 'Confirm appointment', 'Escalate exceptions'], customerLabel: 'Patient', customerQuote: '“I need to move my cleaning appointment to next week.”', icon: Hospital },
  { id: 'medical-practices', title: 'Medical Practices', problem: 'Patients need routing before staff can help.', automation: 'A bounded intake workflow collects administrative details, routes the request, and avoids making clinical decisions or advice.', steps: ['Collect admin details', 'Identify request type', 'Route appropriately', 'Offer next step', 'Keep a human in control'], customerLabel: 'Patient', customerQuote: '“I have a question about my upcoming appointment.”', icon: Hospital },
  { id: 'law-firms', title: 'Law Firms', problem: 'Potential clients wait for an intake response.', automation: 'A non-advisory intake flow collects administrative details, identifies matter type, checks consultation availability, and routes the enquiry.', steps: ['Collect intake details', 'Identify matter type', 'Avoid legal advice', 'Check availability', 'Route to intake team'], customerLabel: 'Potential client', customerQuote: '“I need help with an immigration matter.”', icon: Gavel },
  { id: 'real-estate', title: 'Real Estate', problem: 'Buyer and seller enquiries arrive across channels.', automation: 'An assistant captures approved preferences, answers sourced property questions, coordinates viewings, and routes serious prospects.', steps: ['Capture preferences', 'Answer sourced questions', 'Coordinate viewing', 'Confirm details', 'Route prospect'], customerLabel: 'Prospect', customerQuote: '“Can I view the property this weekend?”', icon: Home },
  { id: 'property-management', title: 'Property Management', problem: 'Tenant requests and viewing enquiries compete for attention.', automation: 'A workflow categorizes the request, collects the right details, schedules viewings, and routes urgent issues to a person.', steps: ['Categorize request', 'Collect property details', 'Check urgency', 'Schedule viewing', 'Notify team'], customerLabel: 'Tenant', customerQuote: '“There is a leak under my kitchen sink.”', icon: Building2 },
  { id: 'accounting', title: 'Accounting', problem: 'Client questions interrupt deadline-driven work.', automation: 'A support workflow answers approved process questions, collects context, and routes documents or exceptions to the responsible team member.', steps: ['Identify request', 'Collect client context', 'Share approved guidance', 'Request documents', 'Route exception'], customerLabel: 'Client', customerQuote: '“What do you need from me before the filing deadline?”', icon: CircleDollarSign },
  { id: 'automotive', title: 'Automotive', problem: 'Service enquiries need quick scheduling and triage.', automation: 'An assistant captures the vehicle and service need, checks permitted slots, confirms the visit, and records the outcome.', steps: ['Capture vehicle details', 'Identify service need', 'Check availability', 'Confirm visit', 'Update record'], customerLabel: 'Customer', customerQuote: '“Can I book an inspection for Thursday morning?”', icon: CarFront },
  { id: 'e-commerce', title: 'E-commerce', problem: 'Order and product questions create repetitive support work.', automation: 'A support flow answers approved questions, retrieves order context where supported, and escalates exceptions to the right team.', steps: ['Identify order intent', 'Retrieve approved context', 'Answer routine question', 'Offer next step', 'Escalate exception'], customerLabel: 'Customer', customerQuote: '“Can you help me check the status of my order?”', icon: ShoppingBag },
]

export function IndustryExample({ industry }: { industry: Industry }) {
  const detailRoutes: Record<string, string> = { 'home-services': '/industries/home-services', 'dental-practices': '/industries/dental', 'medical-practices': '/industries/medical-practices', 'law-firms': '/industries/law-firms', 'real-estate': '/industries/real-estate', 'property-management': '/industries/property-management', accounting: '/industries/accounting', automotive: '/industries/automotive', 'e-commerce': '/industries/ecommerce' }
  return (
    <div id={`${industry.id}-example`} role="tabpanel" className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
      <div>
        <span className="eyebrow">Example workflow</span>
        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-white sm:text-3xl">{industry.title}</h3>
        <p className="mt-3 text-sm leading-6 text-white/65">{industry.automation}</p>
        <Link href={detailRoutes[industry.id] ?? '/industries'} className="mt-5 inline-flex min-h-10 items-center text-sm font-semibold text-brand-primary hover:text-brand-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">Explore {industry.title} <span className="ml-2" aria-hidden="true">→</span></Link>
      </div>
      <div className="rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.06] p-4 sm:p-5">
        <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/50"><MessageIcon /> {industry.customerLabel}</div>
        <p className="mt-2 rounded-[var(--radius-md)] bg-white px-4 py-3 text-sm font-medium leading-6 text-velora-navy">{industry.customerQuote}</p>
        <ol className="mt-4 grid gap-2 sm:grid-cols-5">{industry.steps.map((step, index) => <li key={step} className="flex items-center gap-2 rounded-[var(--radius-sm)] bg-white/[0.06] px-2.5 py-2 text-xs text-white/75 sm:block sm:text-center"><span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-primary/20 text-[10px] font-semibold text-brand-primary sm:mx-auto sm:mb-2">{index + 1}</span><span>{step}</span></li>)}</ol>
      </div>
    </div>
  )
}

function MessageIcon() { return <FileText className="h-3.5 w-3.5 text-brand-primary" aria-hidden="true" /> }

export function IndustrySection() {
  const [selected, setSelected] = useState(industries[0].id)
  const panelId = useId()
  const active = industries.find((industry) => industry.id === selected) ?? industries[0]
  return (
    <Section id="industries" background="muted">
      <SectionHeading label="Industries" title="Built Around the Way Your Industry Works." description="Choose the environment that feels closest to your business to see a practical example of how a bounded workflow could be structured." />
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8">
        <div role="tablist" aria-label="Industries" className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
          {industries.map((industry) => { const Icon = industry.icon; const isActive = industry.id === selected; return <button key={industry.id} id={`${panelId}-${industry.id}`} type="button" role="tab" aria-selected={isActive} aria-controls={panelId} onClick={() => setSelected(industry.id)} className={`flex min-h-16 items-center gap-3 rounded-[var(--radius-md)] border px-3 text-left text-sm font-semibold transition-[border-color,background-color,box-shadow] duration-[var(--motion-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 ${isActive ? 'border-brand-primary/35 bg-surface-primary text-text-primary shadow-[var(--shadow-soft)]' : 'border-border-subtle bg-surface-secondary/60 text-text-secondary hover:border-brand-primary/20 hover:bg-surface-primary'}`}><span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-sm)] ${isActive ? 'bg-brand-primary text-brand-primary-foreground' : 'bg-brand-primary/[0.09] text-brand-primary'}`}><Icon className="h-4 w-4" aria-hidden="true" /></span>{industry.title}</button> })}
        </div>
        <div id={panelId} aria-live="polite" className="rounded-[var(--radius-xl)] bg-velora-navy p-5 shadow-[var(--shadow-card)] sm:p-7"><IndustryExample industry={active} /></div>
      </div>
    </Section>
  )
}
