'use client'

import { useRef, useState, useCallback, type ReactNode, type MouseEvent } from 'react'
import { motion, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TiltCardProps {
  children: ReactNode
  className?: string
  maxTilt?: number
  glareEnabled?: boolean
}

export function TiltCard({
  children,
  className,
  maxTilt = 5,
  glareEnabled = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 })
  const [showGlare, setShowGlare] = useState(false)

  // Spring-based rotation values for smooth reset
  const rotateX = useSpring(0, { stiffness: 300, damping: 30 })
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 })

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      // Only activate on lg breakpoint and above
      if (window.innerWidth < 1024) return
      if (!ref.current) return

      const rect = ref.current.getBoundingClientRect()

      // Normalized position from -0.5 to 0.5
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      rotateX.set(-y * maxTilt * 2)
      rotateY.set(x * maxTilt * 2)

      // Glare follows cursor
      if (glareEnabled) {
        setGlarePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        })
      }
    },
    [maxTilt, glareEnabled, rotateX, rotateY]
  )

  const handleMouseEnter = useCallback(() => {
    if (window.innerWidth < 1024) return
    setShowGlare(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setShowGlare(false)
    // Spring animation handles the reset smoothly
    rotateX.set(0)
    rotateY.set(0)
  }, [rotateX, rotateY])

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={cn('relative', className)}
    >
      {children}

      {/* Glare effect */}
      {glareEnabled && showGlare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-10 transition-opacity duration-300"
          style={{
            opacity: showGlare ? 1 : 0,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.07) 0%, transparent 60%)`,
          }}
          aria-hidden="true"
        />
      )}
    </motion.div>
  )
}
