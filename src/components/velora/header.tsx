'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { isNavigationActive } from '@/lib/site-navigation'
import { cn } from '@/lib/utils'
import { useConsultation } from './consultation-provider'

const navigation = [
  { label: 'Solutions', href: '/solutions' },
  { label: 'Industries', href: '/industries' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Resources', href: '/resources' },
] as const

function Brand() {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5" aria-label="Velora Automations home">
      <span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] bg-velora-navy text-white shadow-[var(--shadow-soft)] transition-transform duration-[var(--motion-fast)] group-active:scale-[0.97]">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 2 2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="text-[17px] font-semibold tracking-[-0.02em] text-foreground">Velora Automations</span>
    </Link>
  )
}

function NavLink({ label, href, pathname, mobile = false, onClick }: { label: string; href: string; pathname: string; mobile?: boolean; onClick?: () => void }) {
  const active = isNavigationActive(pathname, href)
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'group relative inline-flex items-center font-medium transition-colors duration-[var(--motion-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50',
        mobile ? 'min-h-14 w-full justify-start border-b border-border/70 px-1 text-left text-lg font-semibold tracking-[-0.01em] last:border-b-0' : 'h-10 px-3 text-[13px]',
        active ? 'text-foreground' : 'text-foreground/60 hover:text-foreground',
        mobile && active && 'text-brand-primary'
      )}
    >
      {label}
      {!mobile && <span className={cn('absolute inset-x-3 bottom-0.5 h-0.5 origin-left rounded-full bg-brand-primary transition-transform duration-[var(--motion-normal)]', active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100')} aria-hidden="true" />}
    </Link>
  )
}

export function Header() {
  const pathname = usePathname()
  const { openConsultation } = useConsultation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMobile = () => setMobileOpen(false)

  return (
    <header className={cn('sticky top-0 z-50 w-full border-b transition-[background-color,border-color,box-shadow] duration-[var(--motion-normal)]', scrolled ? 'border-border/80 bg-background/95 shadow-[var(--shadow-soft)] backdrop-blur-xl' : 'border-transparent bg-background/85 backdrop-blur-md')} role="banner">
      <nav className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10" aria-label="Main navigation">
        <Brand />

        <div className="hidden items-center gap-0.5 lg:flex">
          {navigation.map((item) => <NavLink key={item.href} {...item} pathname={pathname} />)}
        </div>

        <div className="hidden lg:block">
          <Button type="button" variant="brand" size="default" onClick={openConsultation} className="px-5 text-[13px]">
            Request a Consultation
          </Button>
        </div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] text-foreground/70 transition-colors duration-[var(--motion-fast)] hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 lg:hidden" aria-label="Open navigation menu">
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" showCloseButton={false} className="w-[min(24rem,calc(100vw-1rem))] p-0">
            <SheetTitle className="sr-only">Navigation menu</SheetTitle>
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <Brand />
                <button type="button" onClick={closeMobile} className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-md)] text-foreground/65 transition-colors duration-[var(--motion-fast)] hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50" aria-label="Close navigation menu">
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-6">
                <div className="flex flex-col border-y border-border/70">
                  {navigation.map((item) => <NavLink key={item.href} {...item} pathname={pathname} mobile onClick={closeMobile} />)}
                </div>
              </div>
              <div className="border-t border-border p-5">
                <Button type="button" variant="brand" size="lg" onClick={() => { closeMobile(); openConsultation() }} className="w-full text-base">
                  Request a Consultation
                </Button>
                <p className="mt-3 text-center text-xs text-muted-foreground">Practical recommendations. No purchase required.</p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
