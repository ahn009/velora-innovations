'use client'

import { useState, useSyncExternalStore } from 'react'
import { motion } from 'framer-motion'
import { Send, Check } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const STORAGE_KEY = 'velora-newsletter'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Module-level subscriber list for same-tab localStorage updates
let listeners: Array<() => void> = []

function emitChange() {
  for (const listener of listeners) {
    listener()
  }
}

function subscribe(callback: () => void) {
  listeners = [...listeners, callback]
  window.addEventListener('storage', callback)
  return () => {
    listeners = listeners.filter((l) => l !== callback)
    window.removeEventListener('storage', callback)
  }
}

function getSnapshot(): boolean {
  return Boolean(localStorage.getItem(STORAGE_KEY))
}

function getServerSnapshot(): boolean {
  return false // Not subscribed on server to match initial client render
}

export function NewsletterSignup() {
  const alreadySubscribed = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email')
      return
    }

    localStorage.setItem(STORAGE_KEY, email)
    emitChange()
    setSubscribed(true)
  }

  if (alreadySubscribed) {
    return (
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mt-5 text-sm text-velora-emerald flex items-center gap-1.5"
      >
        <Check className="w-3.5 h-3.5" aria-hidden="true" />
        You&apos;re subscribed
      </motion.p>
    )
  }

  if (subscribed) {
    return (
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mt-5 text-sm text-velora-emerald flex items-center gap-1.5"
      >
        <Check className="w-3.5 h-3.5" aria-hidden="true" />
        Thanks for subscribing!
      </motion.p>
    )
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      onSubmit={handleSubmit}
      className="mt-5 flex flex-col sm:flex-row gap-2"
      aria-label="Newsletter signup"
    >
      <div className="relative flex-1">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (error) setError('')
          }}
          aria-label="Email address for newsletter"
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? 'newsletter-error' : undefined}
          className="h-9 text-sm bg-muted/50 border-velora-border/60 focus-visible:ring-velora-emerald/40 focus-visible:border-velora-emerald/50"
        />
      </div>
      <Button
        type="submit"
        size="sm"
        className="h-9 px-4 bg-velora-emerald hover:bg-velora-emerald/90 text-white shrink-0"
        aria-label="Subscribe to newsletter"
      >
        <Send className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
        Subscribe
      </Button>
      {error && (
        <p id="newsletter-error" className="text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </motion.form>
  )
}
