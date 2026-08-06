'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ConsultationForm } from './consultation-form'

interface ConsultationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ConsultationModal({ open, onOpenChange }: ConsultationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto p-0 sm:max-w-lg">
        <div className="h-1 rounded-t-xl bg-gradient-to-r from-velora-emerald via-velora-teal to-velora-sky" />
        <div className="p-6 pt-5">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Request a Free Consultation</DialogTitle>
            <DialogDescription>
              Tell us which customer workflow you want to improve. We will review the fit, risks, integrations, and practical next step.
            </DialogDescription>
          </DialogHeader>
          <ConsultationForm source="consultation-modal" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
