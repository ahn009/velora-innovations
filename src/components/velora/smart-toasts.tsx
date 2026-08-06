'use client'

import { useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
import { MessageSquare, Sparkles, Rocket } from 'lucide-react'

interface ToastConfig {
  sectionId: string
  message: string
  icon: React.ReactNode
  action?: {
    label: string
    onClick: () => void
  }
}

const toastConfigs: ToastConfig[] = [
  {
    sectionId: 'pricing',
    message: 'Limited Q4 spots available — Book your free consultation',
    icon: <Sparkles className="w-4 h-4" />,
    action: {
      label: 'Book Now',
      onClick: () => {
        const el = document.getElementById('consultation')
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      },
    },
  },
  {
    sectionId: 'faq',
    message: 'Have questions? We\'re here to help',
    icon: <MessageSquare className="w-4 h-4" />,
  },
  {
    sectionId: 'consultation',
    message: 'Ready to automate? Let\'s talk',
    icon: <Rocket className="w-4 h-4" />,
  },
]

export function SmartToasts() {
  const shownToasts = useRef(new Set<string>())
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Small delay to ensure sections are rendered
    const timer = setTimeout(() => {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const id = entry.target.id
              if (shownToasts.current.has(id)) continue
              shownToasts.current.add(id)

              const config = toastConfigs.find((t) => t.sectionId === id)
              if (!config) continue

              toast(config.message, {
                duration: 5000,
                icon: config.icon,
                action: config.action
                  ? {
                      label: config.action.label,
                      onClick: config.action.onClick,
                    }
                  : undefined,
              })
            }
          }
        },
        {
          rootMargin: '0px 0px -20% 0px',
          threshold: 0.15,
        }
      )

      for (const config of toastConfigs) {
        const el = document.getElementById(config.sectionId)
        if (el) {
          observerRef.current!.observe(el)
        }
      }
    }, 500)

    return () => {
      clearTimeout(timer)
      observerRef.current?.disconnect()
    }
  }, [])

  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          classNames: {
            toast: 'text-sm',
            actionButton:
              '!bg-velora-emerald !text-white hover:!bg-velora-emerald-dark !px-3 !py-1.5 !text-xs !rounded-lg',
            cancelButton: '!px-3 !py-1.5 !text-xs !rounded-lg',
          },
        }}
      />
    </>
  )
}
