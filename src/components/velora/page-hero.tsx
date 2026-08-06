import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'

type Breadcrumb = {
  label: string
  href: string
}

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs = [],
  secondaryLink,
}: {
  eyebrow: string
  title: string
  description: string
  breadcrumbs?: Breadcrumb[]
  secondaryLink?: { label: string; href: string }
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-velora-emerald/[0.07] via-background to-background">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-72 w-[48rem] -translate-x-1/2 rounded-full bg-velora-emerald/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        {breadcrumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-7">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
              <li><Link href="/" className="hover:text-foreground">Home</Link></li>
              {breadcrumbs.map((item) => (
                <li key={item.href} className="flex items-center gap-1.5">
                  <ChevronRight className="h-3 w-3" aria-hidden="true" />
                  <Link href={item.href} className="hover:text-foreground">{item.label}</Link>
                </li>
              ))}
              <li className="flex items-center gap-1.5" aria-current="page">
                <ChevronRight className="h-3 w-3" aria-hidden="true" />
                <span className="text-foreground/75">{eyebrow}</span>
              </li>
            </ol>
          </nav>
        ) : null}

        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-velora-emerald">{eyebrow}</p>
          <h1 className="mt-4 text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.03em] text-foreground sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            {description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-velora-emerald px-5 text-sm font-medium text-white shadow-sm transition-[background-color,transform,box-shadow] duration-150 hover:bg-velora-emerald-dark hover:shadow-md active:scale-[0.97]"
            >
              Request a Consultation
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
            {secondaryLink ? (
              <Link
                href={secondaryLink.href}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-background px-5 text-sm font-medium text-foreground transition-[background-color,border-color,transform] duration-150 hover:border-foreground/20 hover:bg-muted/60 active:scale-[0.97]"
              >
                {secondaryLink.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
