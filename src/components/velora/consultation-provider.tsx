'use client'

import dynamic from 'next/dynamic'
import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const ConsultationModal = dynamic(
  () => import('./consultation-modal').then((module) => module.ConsultationModal),
  { loading: () => null }
)

type ConsultationContextValue = {
  openConsultation: () => void
}

const ConsultationContext = createContext<ConsultationContextValue | null>(null)

export function ConsultationProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const openConsultation = useCallback(() => setOpen(true), [])
  const value = useMemo(() => ({ openConsultation }), [openConsultation])

  return (
    <ConsultationContext.Provider value={value}>
      {children}
      {open ? <ConsultationModal open={open} onOpenChange={setOpen} /> : null}
    </ConsultationContext.Provider>
  )
}

export function useConsultation() {
  const context = useContext(ConsultationContext)
  if (!context) throw new Error('useConsultation must be used within ConsultationProvider')
  return context
}
