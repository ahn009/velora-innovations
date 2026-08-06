'use client'

import { X } from 'lucide-react'
import { useState, useCallback } from 'react'
import { setAnnouncementVisible } from '@/lib/announcement-state'

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true)

  const dismiss = useCallback(() => {
    setIsVisible(false)
    setAnnouncementVisible(false)
  }, [])

  if (!isVisible) return null

  return (
    <div
      className="relative z-50 bg-velora-navy text-white text-center py-2.5 px-4"
      role="banner"
    >
      <p className="text-sm font-medium tracking-wide pr-8 truncate">
        Now accepting a limited number of implementation projects for Q4 2025.
        <a
          href="#consultation"
          className="inline-flex items-center ml-2 text-velora-emerald-light hover:text-velora-emerald underline underline-offset-2 transition-colors"
        >
          Book your spot
          <svg
            className="ml-1 w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </p>
      <button
        onClick={dismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/60 hover:text-white transition-colors rounded-sm"
        aria-label="Dismiss announcement"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
