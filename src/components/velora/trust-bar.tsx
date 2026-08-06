'use client'

import { FadeIn } from './section'
import {
  Phone,
  MessageCircle,
  Smartphone,
  Mail,
  Database,
  Calendar,
  Headphones,
} from 'lucide-react'
import { cn } from '@/lib/utils'

/* ------------------------------------------------------------------ */
/*  Integration categories                                             */
/* ------------------------------------------------------------------ */

const integrations = [
  { label: 'Voice', icon: Phone },
  { label: 'Web Chat', icon: MessageCircle },
  { label: 'SMS', icon: Smartphone },
  { label: 'Email', icon: Mail },
  { label: 'CRM', icon: Database },
  { label: 'Calendar', icon: Calendar },
  { label: 'Support Desk', icon: Headphones },
] as const

/* ------------------------------------------------------------------ */
/*  Trust Bar                                                          */
/* ------------------------------------------------------------------ */

export function TrustBar({ className }: { className?: string }) {
  return (
    <div className={cn('py-6 sm:py-10', className)}>
      {/* Divider line */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-velora-border/50" />
      </div>

      {/* Integration icons row */}
      <FadeIn delay={0.1}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
            {integrations.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-2.5 group"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-muted/70 border border-velora-border/40 transition-colors group-hover:bg-velora-emerald/10 group-hover:border-velora-emerald/20">
                    <Icon
                      className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-velora-emerald"
                      strokeWidth={1.8}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground font-medium transition-colors group-hover:text-foreground">
                    {item.label}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground/60 text-center mt-6 max-w-xl mx-auto leading-relaxed">
            Integration availability depends on the client&apos;s software, API
            access and security requirements.
          </p>
        </div>
      </FadeIn>
    </div>
  )
}
