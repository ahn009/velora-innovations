'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type MeshGradientVariant = 'emerald' | 'violet' | 'amber' | 'mixed' | 'rose'
type MeshGradientIntensity = 'subtle' | 'medium' | 'strong'

interface MeshGradientProps {
  variant?: MeshGradientVariant
  intensity?: MeshGradientIntensity
  className?: string
}

/* ---------- color configs per variant ---------- */

interface OrbConfig {
  color: string
  size: string
  position: string
  blur: number
  delay: number
  duration: number
  yRange: [number, number]
  xRange: [number, number]
}

const opacityMap: Record<MeshGradientIntensity, [number, number]> = {
  subtle: [3, 8],
  medium: [6, 12],
  strong: [10, 18],
}

const configs: Record<MeshGradientVariant, OrbConfig[]> = {
  emerald: [
    { color: 'bg-velora-emerald', size: 'w-[500px] h-[500px]', position: 'top-[-10%] right-[-5%]', blur: 100, delay: 0, duration: 12, yRange: [-20, 20], xRange: [-12, 12] },
    { color: 'bg-velora-teal', size: 'w-[400px] h-[400px]', position: 'bottom-[-8%] left-[-5%]', blur: 90, delay: 2, duration: 14, yRange: [-15, 15], xRange: [10, -10] },
    { color: 'bg-velora-sky', size: 'w-[350px] h-[350px]', position: 'top-[40%] left-[20%]', blur: 110, delay: 4, duration: 16, yRange: [-18, 18], xRange: [-8, 8] },
  { color: 'bg-velora-emerald', size: 'w-[300px] h-[300px]', position: 'bottom-[20%] right-[15%]', blur: 80, delay: 1, duration: 10, yRange: [-12, 12], xRange: [14, -14] },
  ],
  violet: [
    { color: 'bg-velora-violet', size: 'w-[480px] h-[480px]', position: 'top-[-8%] left-[-5%]', blur: 100, delay: 0, duration: 13, yRange: [-18, 18], xRange: [10, -10] },
    { color: 'bg-velora-sky', size: 'w-[400px] h-[400px]', position: 'bottom-[-10%] right-[-8%]', blur: 90, delay: 3, duration: 15, yRange: [-14, 14], xRange: [-12, 12] },
    { color: 'bg-velora-rose', size: 'w-[320px] h-[320px]', position: 'top-[50%] right-[10%]', blur: 110, delay: 1.5, duration: 11, yRange: [-20, 20], xRange: [-6, 6] },
  ],
  amber: [
    { color: 'bg-velora-amber', size: 'w-[500px] h-[500px]', position: 'top-[-10%] right-[-5%]', blur: 100, delay: 0, duration: 12, yRange: [-20, 20], xRange: [-10, 10] },
    { color: 'bg-velora-rose', size: 'w-[400px] h-[400px]', position: 'bottom-[-8%] left-[-5%]', blur: 90, delay: 2, duration: 14, yRange: [-16, 16], xRange: [8, -8] },
    { color: 'bg-velora-amber', size: 'w-[350px] h-[350px]', position: 'top-[45%] left-[15%]', blur: 80, delay: 4, duration: 10, yRange: [-12, 12], xRange: [-14, 14] },
  ],
  rose: [
    { color: 'bg-velora-rose', size: 'w-[500px] h-[500px]', position: 'top-[-10%] left-[-5%]', blur: 100, delay: 0, duration: 13, yRange: [-18, 18], xRange: [10, -10] },
    { color: 'bg-velora-amber', size: 'w-[420px] h-[420px]', position: 'bottom-[-8%] right-[-6%]', blur: 90, delay: 2.5, duration: 15, yRange: [-14, 14], xRange: [-12, 12] },
    { color: 'bg-velora-violet', size: 'w-[350px] h-[350px]', position: 'top-[35%] right-[20%]', blur: 110, delay: 1, duration: 11, yRange: [-20, 20], xRange: [-8, 8] },
  ],
  mixed: [
    { color: 'bg-velora-emerald', size: 'w-[450px] h-[450px]', position: 'top-[-8%] left-[-4%]', blur: 100, delay: 0, duration: 12, yRange: [-18, 18], xRange: [10, -10] },
    { color: 'bg-velora-violet', size: 'w-[400px] h-[400px]', position: 'bottom-[-6%] right-[-6%]', blur: 90, delay: 2, duration: 14, yRange: [-14, 14], xRange: [-12, 12] },
    { color: 'bg-velora-amber', size: 'w-[350px] h-[350px]', position: 'top-[45%] right-[15%]', blur: 110, delay: 3.5, duration: 16, yRange: [-16, 16], xRange: [-8, 8] },
    { color: 'bg-velora-sky', size: 'w-[300px] h-[300px]', position: 'bottom-[30%] left-[10%]', blur: 80, delay: 1.5, duration: 10, yRange: [-12, 12], xRange: [14, -14] },
  ],
}

/* ---------- component ---------- */

export function MeshGradient({
  variant = 'emerald',
  intensity = 'subtle',
  className,
}: MeshGradientProps) {
  const [minOp, maxOp] = opacityMap[intensity]
  const orbs = configs[variant]

  return (
    <div
      aria-hidden="true"
      className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}
    >
      {orbs.map((orb, i) => {
        // Distribute opacity across orbs within the intensity range
        const opPercent = minOp + ((maxOp - minOp) * (i + 1)) / (orbs.length + 1)
        return (
          <motion.div
            key={`${variant}-${i}`}
            className={cn(
              'absolute rounded-full',
              orb.color,
              orb.size,
              orb.position,
            )}
            style={{
              filter: `blur(${orb.blur}px)`,
              opacity: opPercent / 100,
            }}
            animate={{
              y: [orb.yRange[0], orb.yRange[1], orb.yRange[0]],
              x: [orb.xRange[0], orb.xRange[1], orb.xRange[0]],
            }}
            transition={{
              duration: orb.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: orb.delay,
            }}
          />
        )
      })}
    </div>
  )
}
