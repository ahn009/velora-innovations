'use client'

import { useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, Check, CircleHelp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Section } from './section'

export type AssessmentAnswers = Record<string, string | string[]>

const steps = [
  { id: 'business', label: 'Business' }, { id: 'enquiries', label: 'Enquiries' }, { id: 'operations', label: 'Operations' },
  { id: 'technology', label: 'Technology' }, { id: 'goals', label: 'Goals' }, { id: 'readiness', label: 'Readiness' }, { id: 'contact', label: 'Contact' },
] as const

const options = {
  industry: [['home-services', 'Home services'], ['dental', 'Dental practice'], ['medical', 'Medical practice'], ['law', 'Law firm'], ['real-estate', 'Real estate'], ['property-management', 'Property management'], ['accounting', 'Accounting'], ['automotive', 'Automotive'], ['other', 'Other']],
  size: [['solo', '1–5 people'], ['small', '6–25 people'], ['mid', '26–100 people'], ['large', '101+ people']],
  locations: [['one', 'One location'], ['few', '2–5 locations'], ['many', '6+ locations']],
  role: [['owner', 'Owner / founder'], ['operator', 'Operations leader'], ['marketing', 'Marketing / growth'], ['team', 'Team member'], ['other', 'Other']],
  channels: [['phone', 'Phone'], ['website', 'Website'], ['sms', 'SMS'], ['email', 'Email'], ['social', 'Social'], ['other', 'Other']],
  volume: [['low', 'Under 50 / month'], ['medium', '50–250 / month'], ['high', '251–1,000 / month'], ['very-high', '1,000+ / month']],
  response: [['minutes', 'Within minutes'], ['hours', 'Within a few hours'], ['day', 'Same day'], ['slow', 'Next day or later']],
  afterHours: [['covered', 'Team covers it'], ['voicemail', 'Voicemail or inbox'], ['vendor', 'Outside service'], ['unclear', 'No defined process']],
  tools: [['crm', 'CRM'], ['calendar', 'Calendar'], ['phone-system', 'Phone system'], ['email', 'Email'], ['sms', 'SMS'], ['helpdesk', 'Help desk'], ['job-management', 'Job management'], ['practice', 'Practice management'], ['property', 'Property management'], ['sheets', 'Spreadsheets'], ['other', 'Other']],
  goals: [['missed-calls', 'Reduce missed calls'], ['response', 'Respond faster'], ['appointments', 'Book more appointments'], ['qualification', 'Qualify leads'], ['follow-up', 'Improve follow-up'], ['admin', 'Reduce administrative work'], ['support', 'Improve customer support'], ['systems', 'Connect disconnected systems'], ['after-hours', 'Improve after-hours coverage']],
  readiness: [['documented', 'Yes, mostly documented'], ['partial', 'Partly documented'], ['not-yet', 'Not yet']],
  integration: [['yes', 'Yes, likely'], ['some', 'Some systems may support it'], ['unsure', 'I am not sure'], ['no', 'No integrations needed']],
  timeline: [['immediate', 'Immediately'], ['30-days', 'Within 30 days'], ['1-3-months', '1–3 months'], ['3-6-months', '3–6 months'], ['exploring', 'Just exploring']],
  budget: [['under-2500', 'Under $2,500'], ['2500-5000', '$2,500–$5,000'], ['5000-10000', '$5,000–$10,000'], ['10000-20000', '$10,000–$20,000'], ['20000-plus', '$20,000+'], ['not-sure', 'Not sure']],
} as const

function ChoiceGroup({ label, items, value, multiple = false, onChange }: { name?: string; label: string; items: readonly (readonly [string, string])[]; value: string | string[] | undefined; multiple?: boolean; onChange: (value: string | string[]) => void }) {
  const selected = Array.isArray(value) ? value : value ? [value] : []
  const choose = (item: string) => { if (!multiple) return onChange(item); onChange(selected.includes(item) ? selected.filter((entry) => entry !== item) : [...selected, item]) }
  return <fieldset><legend className="text-base font-semibold text-text-primary">{label}</legend><div className="mt-3 grid gap-2 sm:grid-cols-2">{items.map(([item, text]) => <button key={item} type="button" aria-pressed={selected.includes(item)} onClick={() => choose(item)} className={`min-h-12 rounded-[var(--radius-md)] border px-4 py-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${selected.includes(item) ? 'border-brand-primary bg-brand-primary/10 text-text-primary' : 'border-border-subtle bg-surface-primary text-text-secondary hover:border-border-strong'}`}><span className="flex items-center gap-2.5">{selected.includes(item) ? <Check className="h-4 w-4 text-brand-hover" aria-hidden="true" /> : <span className="h-4 w-4 rounded-full border border-border-strong" aria-hidden="true" />}{text}</span></button>)}</div></fieldset>
}

function scoreAssessment(answers: AssessmentAnswers) {
  const channels = Array.isArray(answers.channels) ? answers.channels : []
  const tasks = Array.isArray(answers.tasks) ? answers.tasks : []
  const goals = Array.isArray(answers.goals) ? answers.goals : []
  const scores = { voice: 0, appointment: 0, qualification: 0, support: 0, followUp: 0, workflow: 0 }
  if (channels.includes('phone')) scores.voice += 3
  if (answers.afterHours === 'voicemail' || answers.afterHours === 'unclear') scores.voice += 2
  if (channels.includes('website') || channels.includes('social')) scores.qualification += 2
  if (tasks.includes('qualification') || goals.includes('qualification')) scores.qualification += 3
  if (tasks.includes('scheduling') || goals.includes('appointments')) scores.appointment += 4
  if (goals.includes('missed-calls') || goals.includes('after-hours')) scores.voice += 2
  if (tasks.includes('support') || goals.includes('support')) scores.support += 3
  if (tasks.includes('follow-up') || goals.includes('follow-up')) scores.followUp += 3
  if (tasks.includes('crm') || tasks.includes('data-entry') || goals.includes('systems')) scores.workflow += 3
  if (answers.volume === 'high' || answers.volume === 'very-high') Object.keys(scores).forEach((key) => { scores[key as keyof typeof scores] += 1 })
  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const readiness = answers.readiness === 'documented' && answers.integration !== 'no'
  const primary = ranked[0][1] === 0 ? 'moderate' : ranked[0][0]
  const labels: Record<string, string> = { voice: 'AI Receptionist', appointment: 'Appointment Automation', qualification: 'Lead Qualification Automation', support: 'Customer Support Automation', followUp: 'Follow-Up Automation', workflow: 'Internal Workflow Automation', moderate: readiness ? 'Focused Automation Opportunity' : 'Not Yet Ready for Automation' }
  const secondary = ranked.find(([key, score]) => key !== primary && score > 0)?.[0]
  return { primary, primaryLabel: labels[primary], secondaryLabel: secondary ? labels[secondary] : 'Workflow Readiness Review', scores, readiness }
}

function StepContent({ step, answers, setAnswer }: { step: number; answers: AssessmentAnswers; setAnswer: (key: string, value: string | string[]) => void }) {
  if (step === 0) return <div className="space-y-7"><ChoiceGroup name="industry" label="What industry best describes your business?" items={options.industry} value={answers.industry} onChange={(value) => setAnswer('industry', value)} /><ChoiceGroup name="size" label="How large is your team?" items={options.size} value={answers.size} onChange={(value) => setAnswer('size', value)} /><ChoiceGroup name="locations" label="How many locations do you operate?" items={options.locations} value={answers.locations} onChange={(value) => setAnswer('locations', value)} /></div>
  if (step === 1) return <div className="space-y-7"><ChoiceGroup name="channels" label="Which channels do customers use? Select all that apply." items={options.channels} value={answers.channels} multiple onChange={(value) => setAnswer('channels', value)} /><ChoiceGroup name="volume" label="Approximately how many enquiries do you receive each month?" items={options.volume} value={answers.volume} onChange={(value) => setAnswer('volume', value)} /><ChoiceGroup name="response" label="How quickly does the team usually respond?" items={options.response} value={answers.response} onChange={(value) => setAnswer('response', value)} /><ChoiceGroup name="afterHours" label="What happens to after-hours enquiries?" items={options.afterHours} value={answers.afterHours} onChange={(value) => setAnswer('afterHours', value)} /></div>
  if (step === 2) return <div className="space-y-7"><ChoiceGroup name="tasks" label="Which tasks consume the most staff time? Select all that apply." items={[['routine', 'Answering routine questions'], ['qualification', 'Lead qualification'], ['scheduling', 'Scheduling'], ['follow-up', 'Follow-up'], ['crm', 'CRM updates'], ['support', 'Customer support'], ['data-entry', 'Data entry'], ['routing', 'Internal routing'], ['documents', 'Document collection']]} value={answers.tasks} multiple onChange={(value) => setAnswer('tasks', value)} /><ChoiceGroup name="delay" label="Which process currently creates the most delay?" items={[['response', 'Responding to enquiries'], ['qualification', 'Understanding fit'], ['scheduling', 'Finding availability'], ['follow-up', 'Keeping follow-up consistent'], ['systems', 'Moving information between systems'], ['support', 'Resolving routine questions']]} value={answers.delay} onChange={(value) => setAnswer('delay', value)} /></div>
  if (step === 3) return <div className="space-y-7"><ChoiceGroup name="tools" label="Which systems does your team currently use? Select all that apply." items={options.tools} value={answers.tools} multiple onChange={(value) => setAnswer('tools', value)} /><div className="space-y-2"><Label htmlFor="software">Optional: name any important software</Label><Input id="software" value={String(answers.software || '')} onChange={(event) => setAnswer('software', event.target.value)} placeholder="For example, your CRM or job-management system" /></div><ChoiceGroup name="integration" label="Do your current systems support integrations or API access?" items={options.integration} value={answers.integration} onChange={(value) => setAnswer('integration', value)} /></div>
  if (step === 4) return <div className="space-y-7"><ChoiceGroup name="goals" label="What outcomes matter most? Select all that apply." items={options.goals} value={answers.goals} multiple onChange={(value) => setAnswer('goals', value)} /><div className="rounded-[var(--radius-md)] bg-background-secondary p-4 text-sm leading-6 text-text-secondary"><CircleHelp className="mr-2 inline h-4 w-4 text-brand-primary" aria-hidden="true" />Your result reflects these priorities and the workflow signals from earlier steps.</div></div>
  if (step === 5) return <div className="space-y-7"><ChoiceGroup name="readiness" label="Do you have a documented workflow or approved business information?" items={options.readiness} value={answers.readiness} onChange={(value) => setAnswer('readiness', value)} /><ChoiceGroup name="timeline" label="When would you like to implement?" items={options.timeline} value={answers.timeline} onChange={(value) => setAnswer('timeline', value)} /><ChoiceGroup name="budget" label="Which implementation range should we keep in mind?" items={options.budget} value={answers.budget} onChange={(value) => setAnswer('budget', value)} /></div>
  return <div className="space-y-5"><div className="grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="firstName">First name</Label><Input id="firstName" autoComplete="given-name" value={String(answers.firstName || '')} onChange={(event) => setAnswer('firstName', event.target.value)} /></div><div className="space-y-2"><Label htmlFor="lastName">Last name</Label><Input id="lastName" autoComplete="family-name" value={String(answers.lastName || '')} onChange={(event) => setAnswer('lastName', event.target.value)} /></div></div><div className="space-y-2"><Label htmlFor="email">Work email</Label><Input id="email" type="email" autoComplete="email" value={String(answers.email || '')} onChange={(event) => setAnswer('email', event.target.value)} /></div><div className="space-y-2"><Label htmlFor="company">Company</Label><Input id="company" autoComplete="organization" value={String(answers.company || '')} onChange={(event) => setAnswer('company', event.target.value)} /></div><p className="text-xs leading-5 text-text-muted">We use these details to prepare a practical recommendation. Do not include passwords, API keys, or sensitive customer information.</p></div>
}

export function Assessment() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<AssessmentAnswers>(() => { if (typeof window === 'undefined') return {}; try { const saved = sessionStorage.getItem('velora-assessment'); return saved ? JSON.parse(saved) as AssessmentAnswers : {} } catch { return {} } })
  const [error, setError] = useState('')
  const router = useRouter()
  const mainRef = useRef<HTMLDivElement>(null)
  const current = steps[step]
  const setAnswer = (key: string, value: string | string[]) => { setAnswers((previous) => { const next = { ...previous, [key]: value }; try { sessionStorage.setItem('velora-assessment', JSON.stringify(next)) } catch {} return next }) }
  const valid = useMemo(() => { const required: Record<number, string[]> = { 0: ['industry', 'size', 'locations'], 1: ['channels', 'volume', 'response', 'afterHours'], 2: ['tasks', 'delay'], 3: ['tools', 'integration'], 4: ['goals'], 5: ['readiness', 'timeline', 'budget'], 6: ['firstName', 'lastName', 'email', 'company'] }; return required[step].every((key) => { const value = answers[key]; return Array.isArray(value) ? value.length > 0 : Boolean(value && String(value).trim()) }) }, [answers, step])
  const advance = () => { if (!valid) { setError('Please complete the highlighted step before continuing.'); return } setError(''); if (step < steps.length - 1) { setStep((value) => value + 1); window.setTimeout(() => mainRef.current?.focus(), 0) } else { const result = scoreAssessment(answers); try { sessionStorage.setItem('velora-assessment-result', JSON.stringify({ answers, result })) } catch {} router.push('/assessment/results') } }
  return <Section background="muted" className="min-h-[calc(100vh-68px)]"><div className="mx-auto max-w-4xl"><div className="mb-8 flex items-end justify-between gap-4"><div><p className="eyebrow">Step {step + 1} of {steps.length}</p><h1 className="mt-3 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">Find your highest-value automation opportunity</h1></div><span className="hidden text-sm text-text-muted sm:block">{Math.round(((step + 1) / steps.length) * 100)}% complete</span></div><div className="mb-8 h-1.5 overflow-hidden rounded-full bg-border-subtle" aria-label={`Assessment progress: step ${step + 1} of ${steps.length}`} role="progressbar" aria-valuemin={1} aria-valuemax={steps.length} aria-valuenow={step + 1}><div className="h-full rounded-full bg-brand-primary transition-[width] duration-[var(--motion-normal)]" style={{ width: `${((step + 1) / steps.length) * 100}%` }} /></div><div ref={mainRef} tabIndex={-1} className="rounded-[var(--radius-xl)] border border-border-subtle bg-surface-primary p-5 shadow-card outline-none sm:p-8"><p className="text-sm leading-6 text-text-secondary">Answer a few practical questions about your business, enquiries, workflows, and systems. This is a planning recommendation, not a promise of savings or revenue.</p><h2 className="mt-7 text-xl font-semibold text-text-primary">{current.label}</h2><div className="mt-6"><StepContent step={step} answers={answers} setAnswer={setAnswer} /></div>{error && <p className="mt-5 rounded-[var(--radius-md)] bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">{error}</p>}<div className="mt-8 flex flex-col-reverse gap-3 border-t border-border-subtle pt-5 sm:flex-row sm:justify-between">{step > 0 ? <Button type="button" variant="outline" onClick={() => { setError(''); setStep((value) => value - 1) }}><ArrowLeft className="h-4 w-4" aria-hidden="true" />Back</Button> : <span />}{step === steps.length - 1 && <span className="sr-only">Submitting will only prepare your recommendation.</span>}<Button type="button" variant="brand" onClick={advance} disabled={false}>{step === steps.length - 1 ? 'See my recommendation' : 'Continue'}{step === steps.length - 1 ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : <ArrowRight className="h-4 w-4" aria-hidden="true" />}</Button></div></div></div></Section>
}
