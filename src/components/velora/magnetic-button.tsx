'use client'

import { useRef, useState, useCallback, type ReactNode, type MouseEvent } from 'react'
import { motion, useSpring } from 'framer-motion'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  /** Maximum movement in pixels (default: 6) */
  strength?: number
}

export function MagneticButton({
  children,
  className,
  strength = 6,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!ref.current || typeof window === 'undefined') return
      // Only apply on lg+ breakpoint (matches Tailwind lg: 1024px)
      if (window.innerWidth < 1024) return

      const rect = ref.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = (e.clientX - centerX) / (rect.width / 2)
      const deltaY = (e.clientY - centerY) / (rect.height / 2)

      // Clamp to prevent excessive movement
      const clampedX = Math.max(-1, Math.min(1, deltaX)) * strength
      const clampedY = Math.max(-1, Math.min(1, deltaY)) * strength

      x.set(clampedX)
      y.set(clampedY)
    },
    [x, y, strength]
  )

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }, [x, y])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ x, y, willChange: isHovered ? 'transform' : 'auto' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
