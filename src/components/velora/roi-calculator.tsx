'use client'

import { useState, useMemo } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { SectionHeading, FadeIn } from './section'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import { TrendingUp, DollarSign, Calendar, Zap } from 'lucide-react'

/* ---------- animated number ---------- */

function AnimatedNumber({ value, prefix = '', suffix = '', decimals = 0 }: { value: number; prefix?: string; suffix?: string; decimals?: number }) {
  const spring = useSpring(value, { stiffness: 120, damping: 30, mass: 0.8 })
  const display = useTransform(spring, (v) => {
    const formatted = v.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
    return `${prefix}${formatted}${suffix}`
  })

  return (
    <motion.span className="tabular-nums">
      {display}
    </motion.span>
  )
}

/* ---------- slider input ---------- */

interface SliderInputProps {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step: number
  prefix?: string
  suffix?: string
}

function SliderInput({ label, value, onChange, min, max, step, prefix = '', suffix = '' }: SliderInputProps) {
  const displayValue = prefix + value.toLocaleString() + suffix

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground/80">{label}</label>
        <span className="text-sm font-semibold text-velora-emerald tabular-nums bg-velora-emerald/8 px-2.5 py-0.5 rounded-md">
          {displayValue}
        </span>
      </div>
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(v)}
        min={min}
        max={max}
        step={step}
        className="w-full [&_[data-slot=slider-range]]:bg-velora-emerald [&_[data-slot=slider-thumb]]:bg-velora-emerald [&_[data-slot=slider-thumb]]:border-velora-emerald-dark [&_[data-slot=slider-thumb]]:shadow-[0_0_8px_2px_oklch(0.627_0.194_149.21/0.3)] [&_[data-slot=slider-thumb]]:hover:shadow-[0_0_12px_4px_oklch(0.627_0.194_149.21/0.4)] [&_[data-slot=slider-track]]:bg-muted/80"
      />
      <div className="flex justify-between text-[11px] text-muted-foreground/50">
        <span>{prefix}{min.toLocaleString()}{suffix}</span>
        <span>{prefix}{max.toLocaleString()}{suffix}</span>
      </div>
    </div>
  )
}

/* ---------- result card ---------- */

interface ResultCardProps {
  icon: React.ReactNode
  label: string
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  gradient?: boolean
}

function ResultCard({ icon, label, value, prefix = '', suffix = '', decimals = 0, gradient = false }: ResultCardProps) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/8 hover:bg-white/8 transition-colors duration-200">
      <div className="shrink-0 w-9 h-9 rounded-lg bg-velora-emerald/15 flex items-center justify-center text-velora-emerald">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-white/50 font-medium uppercase tracking-wider mb-1">{label}</p>
        <p className={cn('text-2xl sm:text-3xl font-bold leading-tight', gradient ? 'text-gradient-emerald' : 'text-velora-emerald')}>
          <AnimatedNumber value={value} prefix={prefix} suffix={suffix} decimals={decimals} />
        </p>
      </div>
    </div>
  )
}

/* ---------- main component ---------- */

export function RoiCalculator() {
  const [enquiries, setEnquiries] = useState(200)
  const [avgRevenue, setAvgRevenue] = useState(500)
  const [currentRate, setCurrentRate] = useState(25)
  const [aiFactor, setAiFactor] = useState(40)

  const results = useMemo(() => {
    const monthlyRecovered = enquiries * avgRevenue * (aiFactor / 100) * (1 - currentRate / 100)
    const annualRevenue = monthlyRecovered * 12
    const roiFirstYear = annualRevenue / (annualRevenue * 0.15) * 100
    return { monthlyRecovered, annualRevenue, roiFirstYear }
  }, [enquiries, avgRevenue, currentRate, aiFactor])

  return (
    <section className="relative py-20 sm:py-24 overflow-hidden">
      {/* Subtle emerald gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-velora-emerald rounded-full blur-[160px] opacity-[0.06] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-5 sm:px-8 lg:px-10">
        <FadeIn>
          <SectionHeading
            label="ROI Calculator"
            title="See What Automation Could Save You"
          />
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Inputs panel — glass card */}
            <div className="rounded-2xl border border-velora-border/60 bg-white/60 backdrop-blur-xl shadow-[0_2px_24px_rgba(0,0,0,0.04)] p-6 sm:p-8 space-y-7">
              <div>
                <h3 className="text-base font-semibold text-foreground mb-1">Your Business Inputs</h3>
                <p className="text-sm text-muted-foreground">Adjust the sliders to match your business metrics.</p>
              </div>

              <SliderInput
                label="Monthly customer enquiries"
                value={enquiries}
                onChange={setEnquiries}
                min={50}
                max={2000}
                step={50}
              />

              <SliderInput
                label="Average revenue per customer"
                value={avgRevenue}
                onChange={setAvgRevenue}
                min={100}
                max={10000}
                step={100}
                prefix="$"
              />

              <SliderInput
                label="Current lead capture rate"
                value={currentRate}
                onChange={setCurrentRate}
                min={5}
                max={80}
                step={5}
                suffix="%"
              />

              <SliderInput
                label="AI improvement factor"
                value={aiFactor}
                onChange={setAiFactor}
                min={10}
                max={90}
                step={5}
                suffix="%"
              />
            </div>

            {/* Results panel — dark navy */}
            <div className="rounded-2xl border border-white/10 bg-velora-navy p-6 sm:p-8 flex flex-col">
              <div className="mb-6">
                <h3 className="text-base font-semibold text-white mb-1">Projected Results</h3>
                <p className="text-sm text-white/50">Based on your inputs above.</p>
              </div>

              <div className="space-y-4 flex-1">
                <ResultCard
                  icon={<TrendingUp className="w-4 h-4" />}
                  label="Est. monthly revenue recovered"
                  value={results.monthlyRecovered}
                  prefix="$"
                  decimals={0}
                  gradient
                />

                <ResultCard
                  icon={<DollarSign className="w-4 h-4" />}
                  label="Annual projected revenue"
                  value={results.annualRevenue}
                  prefix="$"
                  decimals={0}
                />

                <ResultCard
                  icon={<Zap className="w-4 h-4" />}
                  label="ROI in first year"
                  value={results.roiFirstYear}
                  suffix="%"
                  decimals={0}
                />

                <ResultCard
                  icon={<Calendar className="w-4 h-4" />}
                  label="Break-even time"
                  value={2.5}
                  suffix=" months"
                  decimals={1}
                />
              </div>

              <p className="mt-6 text-[11px] text-white/30 leading-relaxed">
                Estimates are illustrative. Actual results depend on implementation quality and business context.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
