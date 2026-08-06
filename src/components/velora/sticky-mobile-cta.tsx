'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function StickyMobileCta() {
  const [visible, setVisible] = useState(false)
  const heroRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    // Wait for DOM to be ready
    const hero = document.getElementById('hero')
    if (!hero) return
    heroRef.current = hero

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show the bar when hero is NOT intersecting
        setVisible(!entry.isIntersecting)
      },
      { threshold: 0 }
    )

    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  const handleClick = () => {
    const el = document.getElementById('consultation')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 56 }}
          animate={{ y: 0 }}
          exit={{ y: 56 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
          role="complementary"
          aria-label="Quick action bar"
        >
          <div className="bg-white dark:bg-card border-t border-velora-border/50 dark:border-border/50 shadow-lg dark:shadow-xl rounded-t-xl h-14 flex items-center justify-between px-4 pb-safe">
            <span className="text-sm font-semibold text-foreground tracking-tight">
              Velora
            </span>
            <button
              onClick={handleClick}
              className="inline-flex items-center justify-center h-9 px-5 rounded-lg bg-velora-emerald text-white text-sm font-medium hover:bg-velora-emerald/90 active:scale-[0.97] transition-all duration-150"
            >
              Book a Consultation
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
