'use client'

import { Building2, Activity, Star, Shield, Clock } from 'lucide-react'
import { FadeIn } from './section'

const stats = [
  { icon: Building2, value: '500+', label: 'Businesses' },
  { icon: Activity, value: '98.5%', label: 'Uptime' },
  { icon: Star, value: '4.9/5', label: 'Rating' },
  { icon: Shield, value: 'SOC 2', label: 'Compliant' },
  { icon: Clock, value: '24/7', label: 'Support' },
]

export function TrustStats() {
  return (
    <div className="bg-muted/30 border-y border-velora-border/30">
      <FadeIn>
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-0 lg:divide-x lg:divide-velora-border/40">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-2.5 lg:justify-center lg:px-6"
              >
                <stat.icon className="w-4 h-4 text-velora-emerald/60 shrink-0" aria-hidden="true" />
                <span className="text-sm font-semibold text-foreground whitespace-nowrap">
                  {stat.value}
                </span>
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  )
}
