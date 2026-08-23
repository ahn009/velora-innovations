'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useConsultation } from './consultation-provider'

export function StickyMobileCta() {
  const { openConsultation } = useConsultation()
  const reduceMotion = useReducedMotion()
  const [pastHero, setPastHero] = useState(false)
  const [footerNearby, setFooterNearby] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero')
    const footer = document.querySelector<HTMLElement>('footer[role="contentinfo"]')
    if (!hero) return

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        setPastHero(!entry.isIntersecting)
      },
      { threshold: 0 }
    )

    const footerObserver = new IntersectionObserver(
      ([entry]) => {
        setFooterNearby(entry.isIntersecting)
      },
      { rootMargin: '0px 0px 56px 0px', threshold: 0 }
    )

    heroObserver.observe(hero)
    if (footer) footerObserver.observe(footer)

    return () => {
      heroObserver.disconnect()
      footerObserver.disconnect()
    }
  }, [])

  const visible = pastHero && !footerNearby

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduceMotion ? false : { y: 56 }}
          animate={{ y: 0 }}
          exit={{ y: 56 }}
          transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
          role="complementary"
          aria-label="Quick action bar"
        >
          <div className="bg-white dark:bg-card border-t border-velora-border/50 dark:border-border/50 shadow-lg dark:shadow-xl rounded-t-xl h-14 flex items-center justify-between px-4 pb-safe">
            <span className="text-sm font-semibold text-foreground tracking-tight">
              Velora
            </span>
            <button
              onClick={openConsultation}
              className="inline-flex h-10 items-center justify-center rounded-lg bg-velora-emerald px-5 text-sm font-medium text-white transition-[background-color,transform] duration-150 hover:bg-velora-emerald-dark active:scale-[0.97]"
            >
              Request a Consultation
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
