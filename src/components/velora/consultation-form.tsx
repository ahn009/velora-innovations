'use client'

import Link from 'next/link'
import { useId, useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const industries = [
  ['home-services', 'Home services'],
  ['property-management', 'Property management'],
  ['real-estate', 'Real estate'],
  ['accounting-firm', 'Accounting firm'],
  ['automotive-business', 'Automotive business'],
  ['marketing-agency', 'Marketing agency'],
  ['e-commerce', 'E-commerce'],
  ['other', 'Other'],
] as const

const budgetRanges = [
  ['2500-5000-usd', '$2,500–$5,000 USD'],
  ['5000-10000-usd', '$5,000–$10,000 USD'],
  ['10000-20000-usd', '$10,000–$20,000 USD'],
  ['20000-plus-usd', '$20,000+ USD'],
  ['not-sure', 'Not sure yet'],
] as const

type SubmitState =
  | { status: 'idle'; message: '' }
  | { status: 'submitting'; message: '' }
  | { status: 'error'; message: string }
  | { status: 'success'; message: string; reference: string }

export function ConsultationForm({ source = 'website-consultation', defaultValues = {} }: { source?: string; defaultValues?: { industry?: string; budget?: string; notes?: string } }) {
  const idPrefix = useId()
  const [state, setState] = useState<SubmitState>({ status: 'idle', message: '' })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    setState({ status: 'submitting', message: '' })

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.get('firstName'),
          lastName: formData.get('lastName'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          company: formData.get('company'),
          industry: formData.get('industry'),
          budget: formData.get('budget'),
          notes: formData.get('notes'),
          website: formData.get('website'),
          consent: formData.get('consent') === 'on',
          source,
        }),
      })

      const result = (await response.json()) as {
        message?: string
        reference?: string
      }

      if (!response.ok || !result.reference) {
        throw new Error(result.message || 'We could not save your request. Please try again.')
      }

      form.reset()
      setState({
        status: 'success',
        message: 'Your request was received. We will review it and follow up using the contact details you provided.',
        reference: result.reference,
      })
    } catch (error) {
      setState({
        status: 'error',
        message: error instanceof Error ? error.message : 'We could not save your request. Please try again.',
      })
    }
  }

  if (state.status === 'success') {
    return (
      <div className="py-8 text-center" role="status" aria-live="polite">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-velora-emerald/10">
          <CheckCircle2 className="h-7 w-7 text-velora-emerald" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold">Consultation request received</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          {state.message}
        </p>
        <p className="mt-3 text-xs text-muted-foreground">
          Reference: <span className="font-mono text-foreground">{state.reference}</span>
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6 rounded-xl"
          onClick={() => setState({ status: 'idle', message: '' })}
        >
          Send another request
        </Button>
      </div>
    )
  }

  const pending = state.status === 'submitting'

  return (
    <form onSubmit={handleSubmit} className="mt-5 space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={`${idPrefix}-firstName`}>First name</Label>
          <Input id={`${idPrefix}-firstName`} name="firstName" autoComplete="given-name" required maxLength={80} />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`${idPrefix}-lastName`}>Last name</Label>
          <Input id={`${idPrefix}-lastName`} name="lastName" autoComplete="family-name" required maxLength={80} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}-email`}>Work email</Label>
        <Input id={`${idPrefix}-email`} name="email" type="email" autoComplete="email" required maxLength={254} />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}-phone`}>Phone <span className="text-muted-foreground">(optional)</span></Label>
        <Input id={`${idPrefix}-phone`} name="phone" type="tel" autoComplete="tel" maxLength={30} />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}-company`}>Company</Label>
        <Input id={`${idPrefix}-company`} name="company" autoComplete="organization" required maxLength={120} />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}-industry`}>Industry</Label>
        <select
          id={`${idPrefix}-industry`}
          name="industry"
          required
          defaultValue={defaultValues.industry || ''}
          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="" disabled>Select your industry</option>
          {industries.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}-budget`}>Implementation budget <span className="text-muted-foreground">(optional)</span></Label>
        <select
          id={`${idPrefix}-budget`}
          name="budget"
          defaultValue={defaultValues.budget || ''}
          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <option value="">Select a range</option>
          {budgetRanges.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${idPrefix}-notes`}>What workflow would you like to improve?</Label>
      <Textarea id={`${idPrefix}-notes`} name="notes" rows={4} maxLength={2000} defaultValue={defaultValues.notes || ''} />
      </div>

      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <Label htmlFor={`${idPrefix}-website`}>Website</Label>
        <Input id={`${idPrefix}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <label className="flex items-start gap-3 rounded-lg border border-border/60 bg-muted/20 p-3 text-xs leading-relaxed text-muted-foreground">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-4 w-4 shrink-0 accent-velora-emerald"
        />
        <span>
          I agree that Velora may use these details to respond to this request, as described in the{' '}
          <Link href="/privacy" className="font-medium text-foreground underline underline-offset-2">Privacy Policy</Link>
          {' '}and{' '}
          <Link href="/terms" className="font-medium text-foreground underline underline-offset-2">Terms</Link>.
        </span>
      </label>

      {state.status === 'error' && (
        <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">
          {state.message}
        </p>
      )}

      <Button
        type="submit"
        className="h-11 w-full rounded-xl bg-velora-emerald text-white hover:bg-velora-emerald-dark"
        disabled={pending}
      >
        {pending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving request...</> : 'Request a Consultation'}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        No purchase required. Submitting this form does not subscribe you to marketing email.
      </p>
    </form>
  )
}
