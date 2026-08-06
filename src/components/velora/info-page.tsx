import Link from 'next/link'

export function InfoPage({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string
  title: string
  intro: string
  children: React.ReactNode
}) {
  return (
    <main id="main-content" className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
          <Link href="/" className="font-semibold tracking-tight">Velora Innovations</Link>
          <Link href="/contact" className="text-sm font-medium text-velora-emerald hover:underline">Contact</Link>
        </div>
      </header>
      <article className="mx-auto max-w-3xl px-5 py-14 sm:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-velora-emerald">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{intro}</p>
        <div className="mt-10 space-y-9 text-[15px] leading-7 text-foreground/80 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:mb-2 [&_h3]:font-semibold [&_h3]:text-foreground [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2 [&_a]:font-medium [&_a]:text-velora-emerald [&_a]:underline [&_a]:underline-offset-4">
          {children}
        </div>
        <div className="mt-14 border-t border-border pt-6 text-sm text-muted-foreground">
          <Link href="/">Return to the homepage</Link>
        </div>
      </article>
    </main>
  )
}
