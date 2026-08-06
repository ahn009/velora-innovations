import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  background?: 'default' | 'muted' | 'navy' | 'gradient'
  fullWidth?: boolean
}

const backgroundStyles = {
  default: 'bg-background',
  muted: 'bg-muted/40',
  navy: 'bg-velora-navy text-white',
  gradient: 'relative overflow-hidden',
} as const

export function Section({
  children,
  className,
  id,
  background = 'default',
  fullWidth = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-24 sm:py-28 lg:py-32',
        backgroundStyles[background],
        className
      )}
    >
      {fullWidth ? children : (
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">{children}</div>
      )}
    </section>
  )
}

/* ---------- section heading ---------- */

interface SectionHeadingProps {
  label?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
  light?: boolean
}

export function SectionHeading({
  label,
  title,
  description,
  align = 'center',
  className,
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-12 lg:mb-16',
        align === 'center' && 'text-center max-w-3xl mx-auto',
        align === 'left' && 'max-w-2xl',
        className
      )}
    >
      {label && (
        <p
          className={cn(
            'text-[11px] font-semibold tracking-[0.15em] uppercase mb-4',
            light ? 'text-velora-emerald-light' : 'text-velora-emerald'
          )}
        >
          {label}
        </p>
      )}
      <h2
        className={cn(
          'text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-[-0.02em] leading-[1.12] text-balance',
          light ? 'text-white' : 'text-foreground'
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-5 text-base sm:text-lg text-foreground/60 leading-[1.7]',
            light ? 'text-white/70' : 'text-muted-foreground'
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}

/* ---------- fade-in on scroll ---------- */

export function FadeIn({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return <div className={className}>{children}</div>
}

export function StaggerContainer({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={className}>{children}</div>
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={className}>{children}</div>
}

/* ---------- slide-in from left ---------- */

export function SlideInLeft({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return <div className={className}>{children}</div>
}

/* ---------- slide-in from right ---------- */

export function SlideInRight({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return <div className={className}>{children}</div>
}

/* ---------- scale-in with fade ---------- */

export function ScaleIn({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return <div className={className}>{children}</div>
}

/* ---------- blur-in on scroll ---------- */

export function BlurIn({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return <div className={className}>{children}</div>
}

/* ---------- reveal-up (clip-path wipe) ---------- */

export function RevealUp({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return <div className={className}>{children}</div>
}

/* ---------- animated horizontal line ---------- */

export function AnimatedLine({
  maxWidth = '100%',
  className,
}: {
  maxWidth?: string
  className?: string
}) {
  return (
    <div
      style={{ width: maxWidth }}
      className={cn('h-[2px] bg-velora-emerald/30', className)}
    />
  )
}
