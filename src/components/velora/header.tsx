'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Menu, ChevronDown, X } from 'lucide-react'
import { ThemeSwitcher } from '@/components/velora/theme-switcher'
import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  href: string
  children?: { label: string; href: string; description?: string }[]
}

const navItems: NavItem[] = [
  { label: 'Solutions', href: '#solutions' },
  { label: 'Industries', href: '#industries' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Case Studies', href: '#results' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Resources', href: '#faq' },
]

const sectionIds = navItems.map((item) => item.href.replace('#', ''))

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 8)
  }, [])

  // IntersectionObserver for active section tracking
  useEffect(() => {
    const HEADER_OFFSET = 112 // header (72px) + announcement bar (~40px)
    const visibleSections = new Set<string>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id
          if (entry.isIntersecting) {
            visibleSections.add(id)
          } else {
            visibleSections.delete(id)
          }
        }

        // Pick the section highest on the page that is currently visible
        let topmost: string | null = null
        let topmostTop = Infinity
        for (const id of visibleSections) {
          const el = document.getElementById(id)
          if (el) {
            const rect = el.getBoundingClientRect()
            if (rect.top < topmostTop) {
              topmostTop = rect.top
              topmost = id
            }
          }
        }
        setActiveSection(topmost)
      },
      {
        rootMargin: `-${HEADER_OFFSET}px 0px -40% 0px`,
        threshold: 0,
      }
    )

    // Small delay to ensure sections are rendered
    const timer = setTimeout(() => {
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) observer.observe(el)
      }
    }, 100)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      const offset = 80
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'bg-white dark:bg-card border-b border-velora-border/60 dark:border-border/60 shadow-[0_1px_3px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)]'
          : 'bg-transparent'
      )}
      role="banner"
    >
      <nav
        className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="flex items-center gap-2.5 group"
          aria-label="Velora Innovations — Home"
        >
          <div className="relative w-9 h-9 rounded-xl bg-velora-navy flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-200 shadow-sm">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white"
              aria-hidden="true"
            >
              <path
                d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-[17px] font-semibold tracking-[-0.01em] text-foreground">
            Velora
          </span>
        </a>

        {/* Clients Served Badge — desktop only */}
        <motion.span
          className="hidden sm:flex items-center text-[10px] font-medium tracking-wide uppercase bg-velora-emerald/10 text-velora-emerald rounded-full px-2.5 py-0.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          500+ Businesses Served
        </motion.span>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const sectionId = item.href.replace('#', '')
            const isActive = activeSection === sectionId
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item.href)
                }}
                className={cn(
                  'relative inline-flex items-center px-3.5 py-2 text-[13px] font-medium transition-colors duration-200 group',
                  isActive
                    ? 'text-foreground'
                    : 'text-foreground/55 hover:text-foreground'
                )}
                aria-current={isActive ? 'true' : undefined}
              >
                {item.label}
                <span
                  className={cn(
                    'absolute bottom-1.5 left-3.5 right-3.5 h-[1.5px] bg-velora-emerald transition-transform duration-300 origin-left rounded-full',
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  )}
                />
              </a>
            )
          })}
        </div>

        {/* Desktop: Theme Toggle + CTA */}
        <div className="hidden lg:flex items-center gap-2">
          <ThemeSwitcher className="inline-flex items-center" />
          <a
            href="#consultation"
            onClick={(e) => {
              e.preventDefault()
              handleNavClick('#consultation')
            }}
            className="inline-flex items-center justify-center h-9 px-5 text-[13px] font-medium rounded-lg bg-velora-emerald text-white hover:bg-velora-emerald-dark transition-all duration-200 shadow-sm hover:shadow-md hover:shadow-velora-emerald/20 active:scale-[0.97]"
          >
            Book a Consultation
          </a>
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-foreground/60 hover:text-foreground hover:bg-muted/50 transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 p-0">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <div className="flex flex-col h-full">
              {/* Mobile Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-velora-border/60">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-velora-navy flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white" aria-hidden="true">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-base font-semibold tracking-[-0.01em]">Velora</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-foreground/40 hover:text-foreground hover:bg-muted/50 transition-colors"
                  aria-label="Close navigation menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <div className="flex-1 overflow-y-auto py-3 px-3">
                <div className="space-y-0.5">
                  {navItems.map((item) => {
                    const sectionId = item.href.replace('#', '')
                    const isActive = activeSection === sectionId
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={(e) => {
                          e.preventDefault()
                          handleNavClick(item.href)
                        }}
                        className={cn(
                          'flex items-center justify-between px-4 py-3 text-[15px] font-medium rounded-xl transition-all duration-200',
                          isActive
                            ? 'text-foreground bg-velora-emerald/5'
                            : 'text-foreground/70 hover:text-foreground hover:bg-muted/40'
                        )}
                        aria-current={isActive ? 'true' : undefined}
                      >
                        <span className="flex items-center gap-2.5">
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-velora-emerald" />
                          )}
                          {item.label}
                        </span>
                        <ChevronDown className="w-4 h-4 text-foreground/25 rotate-[-90deg]" />
                      </a>
                    )
                  })}
                </div>
              </div>

              {/* Mobile: Theme Toggle + CTA */}
              <div className="flex items-center gap-3 px-5 py-4 border-t border-velora-border/60">
                <ThemeSwitcher className="inline-flex items-center" />
              </div>
              <div className="px-5 pb-5">
                <a
                  href="#consultation"
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavClick('#consultation')
                  }}
                  className="flex items-center justify-center w-full h-12 px-5 text-[15px] font-medium rounded-xl bg-velora-emerald text-white hover:bg-velora-emerald-dark transition-colors shadow-lg shadow-velora-emerald/15"
                >
                  Book a Consultation
                </a>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
