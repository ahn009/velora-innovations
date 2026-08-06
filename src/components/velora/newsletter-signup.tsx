'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Check, Loader2, Send } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type State = 'idle' | 'submitting' | 'success' | 'error'

export function NewsletterSignup() {
  const [state, setState] = useState<State>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    setState('submitting')
    setMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email: formData.get('newsletterEmail'),
          consent: formData.get('newsletterConsent') === 'on',
          website: formData.get('newsletterWebsite'),
          source: 'footer-newsletter',
        }),
      })
      const result = (await response.json()) as { message?: string }
      if (!response.ok) throw new Error(result.message || 'Subscription failed. Please try again.')

      form.reset()
      setState('success')
    } catch (error) {
      setState('error')
      setMessage(error instanceof Error ? error.message : 'Subscription failed. Please try again.')
    }
  }

  if (state === 'success') {
    return (
      <p className="mt-5 flex items-center gap-1.5 text-sm text-velora-emerald" role="status">
        <Check className="h-3.5 w-3.5" aria-hidden="true" />
        Your subscription was saved. You can <Link href="/unsubscribe" className="underline underline-offset-2">unsubscribe here</Link> at any time.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-5 space-y-2" aria-label="Newsletter signup">
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          name="newsletterEmail"
          type="email"
          placeholder="Work email"
          required
          maxLength={254}
          autoComplete="email"
          aria-label="Email address for newsletter"
          className="h-9 flex-1 bg-muted/50 text-sm"
        />
        <Button
          type="submit"
          size="sm"
          disabled={state === 'submitting'}
          className="h-9 shrink-0 bg-velora-emerald px-4 text-white hover:bg-velora-emerald-dark"
        >
          {state === 'submitting' ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : <Send className="mr-1.5 h-3.5 w-3.5" />}
          Subscribe
        </Button>
      </div>
      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="newsletterWebsite">Website</label>
        <input id="newsletterWebsite" name="newsletterWebsite" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="flex items-start gap-2 text-[11px] leading-relaxed text-muted-foreground">
        <input name="newsletterConsent" type="checkbox" required className="mt-0.5 accent-velora-emerald" />
        <span>
          Send me occasional product and automation updates. I can unsubscribe at any time. See the{' '}
          <Link href="/privacy" className="underline underline-offset-2">Privacy Policy</Link>.
        </span>
      </label>
      {state === 'error' ? <p className="text-xs text-destructive" role="alert">{message}</p> : null}
    </form>
  )
}
