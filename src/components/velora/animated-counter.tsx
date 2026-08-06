'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { useInView, motion } from 'framer-motion'
import { cn } from '@/lib/utils'

/* ---------- easeOutExpo ---------- */

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

/* ---------- AnimatedCounter ---------- */

interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
  onComplete?: () => void
}

export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2000,
  className,
  onComplete,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [displayValue, setDisplayValue] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const rafRef = useRef<number>(0)

  const startCounting = useCallback(() => {
    const startTime = performance.now()
    const dur = duration

    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / dur, 1)
      const easedProgress = easeOutExpo(progress)
      const currentValue = easedProgress * value

      setDisplayValue(currentValue)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setDisplayValue(value)
        setIsComplete(true)
        onComplete?.()
      }
    }

    rafRef.current = requestAnimationFrame(tick)
  }, [value, duration, onComplete])

  useEffect(() => {
    if (!isInView) return
    startCounting()
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isInView, startCounting])

  const isInteger = value % 1 === 0
  const formatted = isInteger
    ? Math.round(displayValue).toLocaleString()
    : displayValue.toFixed(1)

  return (
    <motion.span
      ref={ref}
      className={cn('inline-block tabular-nums', className)}
      animate={isComplete ? { scale: 1 } : { scale: 0.95 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {prefix}{formatted}{suffix}
    </motion.span>
  )
}
