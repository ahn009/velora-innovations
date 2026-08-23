'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

const ChatPanel = dynamic(() => import('./chat-panel').then((module) => module.ChatPanel), { loading: () => null })

export function ChatLauncher() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isChatRoute = pathname === '/'
    || pathname === '/pricing'
    || pathname === '/solutions'
    || pathname.startsWith('/solutions/')
    || pathname === '/industries'
    || pathname.startsWith('/industries/')
    || pathname === '/resources'
    || pathname.startsWith('/resources/')

  if (!isChatRoute) return null

  return (
    <>
      <div className="fixed bottom-[max(4.5rem,calc(env(safe-area-inset-bottom)+4rem))] right-4 z-40 sm:bottom-5 sm:right-5">
        <Button
          type="button"
          variant="brand"
          size="lg"
          className="h-12 rounded-full px-5 shadow-[var(--shadow-brand-hover)]"
          aria-label="Open Velora Assistant"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="velora-chat-dialog"
          onClick={() => setOpen(true)}
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" /> Ask Velora
        </Button>
      </div>
      {open ? <ChatPanel open={open} onOpenChange={setOpen} route={pathname} /> : null}
    </>
  )
}
