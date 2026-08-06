import Link from 'next/link'
import {
  ArrowRight,
  BotMessageSquare,
  Calculator,
  Cable,
  LockKeyhole,
  MessagesSquare,
  ScanSearch,
} from 'lucide-react'
import { resourceNavigation } from '@/lib/site-navigation'

const iconByHref = {
  '/resources/demo': BotMessageSquare,
  '/resources/workflows': MessagesSquare,
  '/resources/integrations': Cable,
  '/resources/security': LockKeyhole,
  '/resources/calculator': Calculator,
  '/resources/faq': ScanSearch,
} as const

export function ResourceHub() {
  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {resourceNavigation.slice(1).map((item) => {
            const Icon = iconByHref[item.href as keyof typeof iconByHref]
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex min-h-56 flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-velora-emerald/30 hover:shadow-lg active:scale-[0.99]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-velora-emerald/10 text-velora-emerald">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-lg font-semibold tracking-tight text-foreground">{item.label}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                <span className="mt-auto inline-flex items-center pt-5 text-sm font-medium text-velora-emerald">
                  Open resource
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
