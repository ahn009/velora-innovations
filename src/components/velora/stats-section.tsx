'use client'

import { useState } from 'react'
import { StaggerContainer, StaggerItem } from './section'
import { AnimatedCounter } from './animated-counter'
import { cn } from '@/lib/utils'

/* ---------- color map ---------- */

const colorMap: Record<string, { text: string; dot: string; bg: string; glow: string }> = {
  emerald: {
    text: 'text-velora-emerald',
    dot: 'bg-velora-emerald',
    bg: 'bg-velora-emerald',
    glow: 'shadow-[0_0_8px_2px_oklch(0.627_0.194_149.21/0.5)]',
  },
  amber: {
    text: 'text-velora-amber',
    dot: 'bg-velora-amber',
    bg: 'bg-velora-amber',
    glow: 'shadow-[0_0_8px_2px_oklch(0.769_0.188_70.08/0.5)]',
  },
  violet: {
    text: 'text-velora-violet',
    dot: 'bg-velora-violet',
    bg: 'bg-velora-violet',
    glow: 'shadow-[0_0_8px_2px_oklch(0.541_0.281_293.009/0.5)]',
  },
  sky: {
    text: 'text-velora-sky',
    dot: 'bg-velora-sky',
    bg: 'bg-velora-sky',
    glow: 'shadow-[0_0_8px_2px_oklch(0.685_0.169_237.323/0.5)]',
  },
  rose: {
    text: 'text-velora-rose',
    dot: 'bg-velora-rose',
    bg: 'bg-velora-rose',
    glow: 'shadow-[0_0_8px_2px_oklch(0.645_0.246_16.439/0.5)]',
  },
  teal: {
    text: 'text-velora-teal',
    dot: 'bg-velora-teal',
    bg: 'bg-velora-teal',
    glow: 'shadow-[0_0_8px_2px_oklch(0.648_0.15_195/0.5)]',
  },
}

/* ---------- data ---------- */

const stats = [
  { value: 50000, suffix: '+', label: 'Customer Interactions Handled Monthly', color: 'emerald' },
  { value: 98, suffix: '%', label: 'Client Satisfaction Score', color: 'amber' },
  { value: 3.5, suffix: 'x', label: 'Average ROI Within First Quarter', color: 'violet' },
  { value: 24, suffix: '/7', label: 'Always-On AI Agent Availability', color: 'sky' },
  { value: 40, suffix: '%', label: 'Reduction in Missed Opportunities', color: 'rose' },
  { value: 15, suffix: 'min', label: 'Average Implementation Timeline (Days)', color: 'teal' },
] as const

/* ---------- stat card ---------- */

function StatCard({
  value,
  suffix,
  label,
  color,
}: {
  value: number
  suffix: string
  label: string
  color: string
}) {
  const c = colorMap[color] ?? colorMap.emerald
  const [isComplete, setIsComplete] = useState(false)

  return (
    <div
      className={cn(
        'rounded-xl bg-white/5 border border-white/10 p-4 sm:p-6',
        'hover:bg-white/10 hover:border-white/20',
        'transition-all duration-300'
      )}
    >
      {/* Colored dot with glow on complete */}
      <div
        className={cn(
          'w-2 h-2 rounded-full mb-4 transition-all duration-500',
          c.dot,
          isComplete && 'animate-pulse',
          isComplete && c.glow
        )}
      />
      {/* Animated number */}
      <AnimatedCounter
        value={value}
        suffix={suffix}
        className="text-3xl sm:text-4xl font-bold text-gradient-emerald"
        onComplete={() => setIsComplete(true)}
      />
      {/* Label */}
      <p className="mt-2 text-sm text-white/60 leading-relaxed">{label}</p>
    </div>
  )
}

/* ---------- section ---------- */

export function StatsSection() {
  return (
    <section className="relative py-20 sm:py-24 lg:py-28 bg-velora-navy text-white">
      {/* Decorative blurred circles */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-velora-emerald rounded-full blur-[120px] opacity-[0.05] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-velora-amber rounded-full blur-[100px] opacity-[0.05] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-velora-violet rounded-full blur-[100px] opacity-[0.05] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Subtle label */}
        <p className="text-center text-[11px] font-semibold tracking-[0.15em] uppercase mb-12 text-velora-emerald">
          By The Numbers
        </p>

        {/* Grid */}
        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <StatCard
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                color={stat.color}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
