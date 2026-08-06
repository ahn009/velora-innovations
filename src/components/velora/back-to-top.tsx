'use client'

import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onClick={scrollToTop}
              className={cn(
                'fixed bottom-20 right-6 z-45 w-10 h-10 rounded-full lg:bottom-6',
                'bg-card border border-velora-border/60 shadow-lg shadow-black/[0.08]',
                'flex items-center justify-center',
                'text-velora-emerald/60 hover:text-velora-emerald hover:border-velora-emerald/30',
                'transition-colors duration-200',
                'active:scale-95'
              )}
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </TooltipTrigger>
          <TooltipContent side="left" sideOffset={8}>
            Back to top
          </TooltipContent>
        </Tooltip>
      )}
    </AnimatePresence>
  )
}
