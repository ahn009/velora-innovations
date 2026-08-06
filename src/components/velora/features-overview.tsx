'use client'

import { Zap, Shield, Puzzle, TrendingUp } from 'lucide-react'
import { FadeIn } from './section'

const differentiators = [
  {
    icon: Zap,
    title: 'Responsive by Design',
    desc: 'Availability and response targets are defined for each deployment',
  },
  {
    icon: Shield,
    title: 'Scoped Security Controls',
    desc: 'Permissions, logging, retention and escalation are documented before launch',
  },
  {
    icon: Puzzle,
    title: 'Integration Review',
    desc: 'CRM, calendar and channel support is confirmed against real API access',
  },
  {
    icon: TrendingUp,
    title: 'Measured Outcomes',
    desc: 'Baseline, success criteria and reporting are agreed before implementation',
  },
] as const

export function FeaturesOverview() {
  return (
    <div className="bg-muted/30 py-10">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <FadeIn>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {differentiators.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="flex flex-col items-center text-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-velora-emerald/10 text-velora-emerald flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </FadeIn>
      </div>
    </div>
  )
}
