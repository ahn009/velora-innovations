'use client'

import { useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type State = 'idle' | 'submitting' | 'success' | 'error'

export function UnsubscribeForm() {
  const [state, setState] = useState<State>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    setState('submitting')
    setMessage('')

    try {
      const response = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email: formData.get('email'),
          website: formData.get('website'),
        }),
      })
      const result = (await response.json()) as { message?: string }
      if (!response.ok) throw new Error(result.message || 'We could not process the request.')

      form.reset()
      setState('success')
    } catch (error) {
      setState('error')
      setMessage(error instanceof Error ? error.message : 'We could not process the request.')
    }
  }

  if (state === 'success') {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-velora-emerald/30 bg-velora-emerald/10 p-4" role="status">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-velora-emerald" aria-hidden="true" />
        <p className="text-sm leading-relaxed">If that address was subscribed, it is now marked as unsubscribed.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="unsubscribeEmail">Email address</Label>
        <Input id="unsubscribeEmail" name="email" type="email" autoComplete="email" required maxLength={254} />
      </div>
      <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <Label htmlFor="unsubscribeWebsite">Website</Label>
        <Input id="unsubscribeWebsite" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      {state === 'error' ? <p className="text-sm text-destructive" role="alert">{message}</p> : null}
      <Button type="submit" disabled={state === 'submitting'} className="bg-velora-emerald text-white hover:bg-velora-emerald-dark">
        {state === 'submitting' ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Processing...</> : 'Unsubscribe'}
      </Button>
    </form>
  )
}
