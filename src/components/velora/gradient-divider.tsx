'use client'

import { FadeIn } from './section'

/**
 * GradientDivider — a thin horizontal line with a multi-color gradient
 * Used between sections to add visual richness and color transitions.
 */
export function GradientDivider({ className }: { className?: string }) {
  return (
    <FadeIn>
      <div className={`max-w-4xl mx-auto ${className ?? 'py-6'}`}>
        <div
          className="h-[1px] w-full"
          style={{
            background: 'linear-gradient(to right, transparent, oklch(0.627 0.194 149.21 / 0.5), oklch(0.627 0.194 149.21 / 0.6), oklch(0.627 0.194 149.21 / 0.5), transparent)',
          }}
        />
      </div>
    </FadeIn>
  )
}
