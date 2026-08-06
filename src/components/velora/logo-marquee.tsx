'use client'

const row1Companies = [
  'Apex Home Services',
  'Bright Smile Dental',
  'Sterling & Associates',
  'NovaBuild Group',
  'Apex Home Services',
  'Bright Smile Dental',
  'Sterling & Associates',
  'NovaBuild Group',
]

const row2Companies = [
  'Horizon Properties',
  'GreenPath Legal',
  'TechFlow Solutions',
  'CoreServe AI',
  'Horizon Properties',
  'GreenPath Legal',
  'TechFlow Solutions',
  'CoreServe AI',
]

function MarqueeRow({
  companies,
  direction,
}: {
  companies: string[]
  direction: 'left' | 'right'
}) {
  return (
    <div className="relative">
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div
          className={`flex gap-12 w-max ${
            direction === 'left'
              ? 'animate-[marquee-left_40s_linear_infinite]'
              : 'animate-[marquee-right_40s_linear_infinite]'
          } hover:[animation-play-state:paused]`}
        >
          {companies.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="flex items-center gap-2.5 text-sm sm:text-base font-semibold tracking-[-0.01em] text-foreground/30 dark:text-foreground/35 whitespace-nowrap select-none"
            >
              <span
                className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold uppercase bg-muted/60 dark:bg-muted/80 text-muted-foreground"
              >
                {name.charAt(0)}
              </span>
              {name}
            </span>
          ))}
        </div>
      </div>
      {/* Gradient fade overlays */}
      <div className='absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none' />
      <div className='absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none' />
    </div>
  )
}

export function LogoMarquee() {
  return (
    <section className="py-6 sm:py-14 border-y border-velora-border/40 overflow-hidden relative">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <p className="text-center text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-8">
          Trusted by innovative businesses
        </p>
      </div>
      <div className="space-y-4 relative">
        <MarqueeRow companies={row1Companies} direction="left" />
        <MarqueeRow companies={row2Companies} direction="right" />
      </div>
    </section>
  )
}
