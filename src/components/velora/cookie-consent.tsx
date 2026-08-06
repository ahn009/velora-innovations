'use client'

import { useSyncExternalStore, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie } from 'lucide-react'
import { Button } from '@/components/ui/button'

const STORAGE_KEY = 'velora-cookie-consent'

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
  return localStorage.getItem(STORAGE_KEY) !== 'accepted'
}

function getServerSnapshot(): boolean {
  return false // Always hidden on server to match initial client render
}

export function CookieConsent() {
  const isVisible = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const acceptBtnRef = useRef<HTMLButtonElement>(null)

  // Focus the Accept button when the banner appears
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        acceptBtnRef.current?.focus()
      }, 400) // Wait for slide-up animation
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  const accept = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    emitChange()
  }, [])

  const customize = useCallback(() => {
    // Close the banner on customize (simplified — no dialog)
    localStorage.setItem(STORAGE_KEY, 'accepted')
    emitChange()
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          role="dialog"
          aria-label="Cookie consent"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-3 left-3 right-3 z-50 pb-safe sm:bottom-6 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:max-w-xl"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-2xl border border-border/50 bg-white/80 p-4 sm:p-5 shadow-lg backdrop-blur-xl dark:bg-card/80">
            {/* Icon + Text */}
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-velora-emerald/10 flex items-center justify-center mt-0.5">
                <Cookie className="w-4.5 h-4.5 text-velora-emerald" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground leading-snug">
                  We value your privacy
                </p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  We use cookies to enhance your experience. By clicking &quot;Accept&quot;, you consent to our use of cookies.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 w-full sm:w-auto flex-shrink-0">
              <Button
                ref={acceptBtnRef}
                onClick={accept}
                size="sm"
                className="h-9 px-4 text-xs font-medium rounded-lg bg-velora-emerald text-white hover:bg-velora-emerald-dark transition-colors shadow-sm"
              >
                Accept
              </Button>
              <Button
                onClick={customize}
                variant="outline"
                size="sm"
                className="h-9 px-4 text-xs font-medium rounded-lg border-border/60 hover:bg-muted/50 transition-colors"
              >
                Customize
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
