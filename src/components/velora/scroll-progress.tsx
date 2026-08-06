'use client'

import { useSyncExternalStore, useCallback, useEffect, useRef } from 'react'
import {
  getAnnouncementVisible,
  subscribeAnnouncement,
} from '@/lib/announcement-state'

export function ScrollProgress() {
  const announcementVisible = useSyncExternalStore(
    subscribeAnnouncement,
    getAnnouncementVisible,
    () => true // SSR fallback: assume visible
  )

  const progressRef = useRef<HTMLDivElement>(null)

  const updateProgress = useCallback(() => {
    const el = progressRef.current
    if (!el) return
    const scrollY = window.scrollY
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const pct = docHeight > 0 ? Math.min((scrollY / docHeight) * 100, 100) : 0
    el.style.width = `${pct}%`
  }, [])

  useEffect(() => {
    // Initial calculation
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress, { passive: true })
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [updateProgress])

  // Hidden when the announcement bar is visible
  if (announcementVisible) return null

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-[3px]"
      aria-hidden="true"
      role="presentation"
    >
      <div
        ref={progressRef}
        className="h-full bg-gradient-to-r from-velora-emerald via-velora-emerald-light to-velora-emerald shadow-[0_0_8px_oklch(0.627_0.194_149.21/40%)]"
        style={{ width: '0%', transition: 'width 50ms ease' }}
      />
    </div>
  )
}
