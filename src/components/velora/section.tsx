'use client'

import { motion, type Variants } from 'framer-motion'
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
            'mt-5 text-base sm:text-lg text-foreground/60 leading-[1.7] flex items-center gap-2',
            light ? 'text-white/70' : 'text-muted-foreground'
          )}
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-velora-emerald shrink-0 mt-0.5"
            aria-hidden="true"
          />
          {description}
        </p>
      )}
    </div>
  )
}

/* ---------- fade-in on scroll ---------- */

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export function FadeIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeInUp}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerContainer({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div variants={fadeInUp} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  )
}

/* ---------- slide-in from left ---------- */

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0 },
}

export function SlideInLeft({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={slideInLeft}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ---------- slide-in from right ---------- */

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
}

export function SlideInRight({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={slideInRight}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ---------- scale-in with fade ---------- */

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
}

export function ScaleIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={scaleIn}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ---------- blur-in on scroll ---------- */

const blurIn: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

export function BlurIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={blurIn}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ---------- reveal-up (clip-path wipe) ---------- */

const revealUp: Variants = {
  hidden: { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
  visible: { clipPath: 'inset(0 0 0 0)', opacity: 1 },
}

export function RevealUp({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={revealUp}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
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
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: maxWidth }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn('h-[2px] bg-velora-emerald/30', className)}
    />
  )
}
