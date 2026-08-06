'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Loader2, CheckCircle2 } from 'lucide-react'
import { CardShine } from './card-shine'

interface ConsultationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const industries = [
  'Home Services',
  'Dental Practice',
  'Medical Practice',
  'Law Firm',
  'Real Estate',
  'Property Management',
  'Accounting Firm',
  'Automotive Business',
  'Marketing Agency',
  'E-commerce',
  'Other',
]

const budgetRanges = [
  'Under $1,000',
  '$1,000 – $3,000',
  '$3,000 – $7,500',
  '$7,500 – $15,000',
  '$15,000+',
  'Not sure',
]

export function ConsultationModal({ open, onOpenChange }: ConsultationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((r) => setTimeout(r, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleClose = () => {
    onOpenChange(false)
    // Reset after close animation
    setTimeout(() => setIsSubmitted(false), 200)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto p-0 group relative overflow-hidden">
        <CardShine />
        {/* Gradient accent line at top */}
        <div className="h-1 rounded-t-xl bg-gradient-to-r from-velora-emerald via-velora-teal to-velora-sky relative z-10" />

        <div className="p-6 pt-5 relative z-10">
          {!isSubmitted ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold">
                  Book Your Free Consultation
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  A 30-minute practical conversation about your customer workflow, repetitive tasks and automation opportunities. No purchase required.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm font-medium">First name</Label>
                    <Input id="firstName" placeholder="Jane" required className="h-10" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm font-medium">Last name</Label>
                    <Input id="lastName" placeholder="Smith" required className="h-10" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Work email</Label>
                  <Input id="email" type="email" placeholder="jane@company.com" required className="h-10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">Phone</Label>
                  <Input id="phone" type="tel" placeholder="(555) 123-4567" className="h-10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm font-medium">Company</Label>
                  <Input id="company" placeholder="Acme Services" required className="h-10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-sm font-medium">Industry</Label>
                  <Select required>
                    <SelectTrigger id="industry" className="h-10">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((ind) => (
                        <SelectItem key={ind} value={ind.toLowerCase().replace(/\s+/g, '-')}>
                          {ind}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget" className="text-sm font-medium">Approximate budget</Label>
                  <Select>
                    <SelectTrigger id="budget" className="h-10">
                      <SelectValue placeholder="Select a range" />
                    </SelectTrigger>
                    <SelectContent>
                      {budgetRanges.map((range) => (
                        <SelectItem key={range} value={range.toLowerCase()}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-sm font-medium">What problem are you trying to solve?</Label>
                  <Textarea
                    id="notes"
                    placeholder="Tell us about the repetitive tasks or customer interactions you would like to automate."
                    rows={3}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-velora-emerald hover:bg-velora-emerald-dark text-white h-11 rounded-xl shadow-sm shadow-velora-emerald/20 hover:shadow-md hover:shadow-velora-emerald/30 transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Scheduling...
                    </>
                  ) : (
                    'Book Free Consultation'
                  )}
                </Button>
                <p className="text-xs text-center text-muted-foreground/60">
                  No obligation. We will send a calendar invite with preparation details.
                </p>
              </form>
            </>
          ) : (
            <div className="py-8 text-center">
              <div className="mx-auto w-14 h-14 rounded-full bg-velora-emerald/10 flex items-center justify-center mb-5 shadow-sm shadow-velora-emerald/10">
                <CheckCircle2 className="w-7 h-7 text-velora-emerald" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Consultation Requested</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                Thank you. We will review your information and send a calendar invite with preparation details within one business day.
              </p>
              <Button
                onClick={handleClose}
                variant="outline"
                className="mt-6 rounded-xl transition-all duration-300"
              >
                Close
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
