'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { ThemeSwitcher } from '@/components/velora/theme-switcher'
import {
  isNavigationActive,
  primaryNavigation,
  resourceNavigation,
} from '@/lib/site-navigation'
import { cn } from '@/lib/utils'
import { useConsultation } from './consultation-provider'

const primaryBeforeResources = primaryNavigation.slice(0, 4)
const aboutNavigation = primaryNavigation[4]

function Brand() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2.5"
      aria-label="Velora Innovations — Home"
    >
      <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-velora-navy shadow-sm transition-transform duration-150 ease-out group-active:scale-[0.97]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white" aria-hidden="true">
          <path
            d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-[17px] font-semibold tracking-[-0.01em] text-foreground">Velora</span>
    </Link>
  )
}

function DesktopLink({ label, href, pathname }: { label: string; href: string; pathname: string }) {
  const active = isNavigationActive(pathname, href)

  return (
    <Link
      href={href}
      aria-current={pathname === href ? 'page' : active ? 'location' : undefined}
      className={cn(
        'relative inline-flex h-10 items-center px-2.5 text-[13px] font-medium transition-colors duration-150',
        active ? 'text-foreground' : 'text-foreground/60 hover:text-foreground'
      )}
    >
      {label}
      <span
        className={cn(
          'absolute inset-x-2.5 bottom-1 h-0.5 origin-left rounded-full bg-velora-emerald transition-transform duration-150 ease-out',
          active ? 'scale-x-100' : 'scale-x-0'
        )}
        aria-hidden="true"
      />
    </Link>
  )
}

export function Header() {
  const pathname = usePathname()
  const { openConsultation } = useConsultation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(
    isNavigationActive(pathname, '/resources')
  )
  const resourcesActive = isNavigationActive(pathname, '/resources')

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function closeMobileMenu() {
    setMobileOpen(false)
  }

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-[background-color,border-color,box-shadow] duration-200',
        isScrolled
          ? 'border-velora-border/60 bg-white/95 shadow-[0_1px_3px_rgba(0,0,0,0.04)] backdrop-blur-xl dark:border-border/60 dark:bg-card/95 dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)]'
          : 'border-transparent bg-background/90 backdrop-blur-md'
      )}
      role="banner"
    >
      <nav
        className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10"
        aria-label="Main navigation"
      >
        <Brand />

        <div className="hidden items-center lg:flex">
          {primaryBeforeResources.map((item) => (
            <DesktopLink key={item.href} {...item} pathname={pathname} />
          ))}

          <div className="flex items-center">
            <DesktopLink label="Resources" href="/resources" pathname={pathname} />
            <DropdownMenu>
              <DropdownMenuTrigger
                className={cn(
                  'group -ml-2 inline-flex h-9 w-7 items-center justify-center rounded-md text-foreground/60 outline-none transition-[color,background-color,transform] duration-150 hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.97]',
                  resourcesActive && 'text-foreground'
                )}
                aria-label="Open Resources menu"
              >
                <ChevronDown className="h-3.5 w-3.5 transition-transform duration-150 ease-out group-data-[state=open]:rotate-180" aria-hidden="true" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="center"
                sideOffset={8}
                className="w-[380px] origin-[var(--radix-dropdown-menu-content-transform-origin)] rounded-xl p-2 shadow-xl duration-150"
              >
                {resourceNavigation.map((item) => {
                  const active = pathname === item.href
                  return (
                    <DropdownMenuItem key={item.href} asChild className="cursor-pointer rounded-lg p-0">
                      <Link
                        href={item.href}
                        aria-current={active ? 'page' : undefined}
                        className="block w-full rounded-lg px-3 py-2.5 outline-none"
                      >
                        <span className="block text-sm font-medium text-foreground">{item.label}</span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                          {item.description}
                        </span>
                      </Link>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <DesktopLink {...aboutNavigation} pathname={pathname} />
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeSwitcher className="inline-flex items-center" />
          <button
            type="button"
            onClick={openConsultation}
            className="inline-flex h-9 items-center justify-center rounded-lg bg-velora-emerald px-4 text-[13px] font-medium text-white shadow-sm transition-[background-color,transform,box-shadow] duration-150 hover:bg-velora-emerald-dark hover:shadow-md active:scale-[0.97]"
          >
            Request a Consultation
          </button>
        </div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-foreground/70 transition-[background-color,color,transform] duration-150 hover:bg-muted/60 hover:text-foreground active:scale-[0.97] lg:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" showCloseButton={false} className="w-[min(22rem,calc(100vw-1rem))] p-0">
            <SheetTitle className="sr-only">Navigation menu</SheetTitle>
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b border-velora-border/60 px-5 py-4">
                <Brand />
                <button
                  type="button"
                  onClick={closeMobileMenu}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-foreground/65 transition-[background-color,color,transform] duration-150 hover:bg-muted/60 hover:text-foreground active:scale-[0.97]"
                  aria-label="Close navigation menu"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-3 py-3">
                <div className="space-y-1">
                  {primaryBeforeResources.map((item) => {
                    const active = isNavigationActive(pathname, item.href)
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeMobileMenu}
                        aria-current={active ? 'page' : undefined}
                        className={cn(
                          'flex min-h-12 items-center rounded-xl px-4 text-[15px] font-medium transition-[background-color,color,transform] duration-150 active:scale-[0.99]',
                          active ? 'bg-velora-emerald/10 text-foreground' : 'text-foreground/75 hover:bg-muted/50 hover:text-foreground'
                        )}
                      >
                        {item.label}
                      </Link>
                    )
                  })}

                  <Collapsible open={mobileResourcesOpen} onOpenChange={setMobileResourcesOpen}>
                    <div className={cn('flex min-h-12 items-center rounded-xl', resourcesActive && 'bg-velora-emerald/10')}>
                      <Link
                        href="/resources"
                        onClick={closeMobileMenu}
                        aria-current={pathname === '/resources' ? 'page' : undefined}
                        className="flex min-h-12 flex-1 items-center px-4 text-[15px] font-medium text-foreground/80"
                      >
                        Resources
                      </Link>
                      <CollapsibleTrigger asChild>
                        <button
                          type="button"
                          className="mr-1 inline-flex h-11 w-11 items-center justify-center rounded-lg text-foreground/65 transition-[background-color,transform] duration-150 hover:bg-muted/70 active:scale-[0.97]"
                          aria-label={mobileResourcesOpen ? 'Collapse Resources menu' : 'Expand Resources menu'}
                        >
                          <ChevronDown
                            className={cn('h-4 w-4 transition-transform duration-150 ease-out', mobileResourcesOpen && 'rotate-180')}
                            aria-hidden="true"
                          />
                        </button>
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="pl-3">
                      <div className="my-1 space-y-0.5 border-l border-border pl-2">
                        {resourceNavigation.slice(1).map((item) => {
                          const active = pathname === item.href
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={closeMobileMenu}
                              aria-current={active ? 'page' : undefined}
                              className={cn(
                                'flex min-h-11 items-center rounded-lg px-3 text-sm transition-colors duration-150',
                                active ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                              )}
                            >
                              {item.label}
                            </Link>
                          )
                        })}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  <Link
                    href={aboutNavigation.href}
                    onClick={closeMobileMenu}
                    aria-current={pathname === aboutNavigation.href ? 'page' : undefined}
                    className={cn(
                      'flex min-h-12 items-center rounded-xl px-4 text-[15px] font-medium transition-[background-color,color,transform] duration-150 active:scale-[0.99]',
                      pathname === aboutNavigation.href
                        ? 'bg-velora-emerald/10 text-foreground'
                        : 'text-foreground/75 hover:bg-muted/50 hover:text-foreground'
                    )}
                  >
                    {aboutNavigation.label}
                  </Link>
                </div>
              </div>

              <div className="border-t border-velora-border/60 px-5 py-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">Appearance</span>
                  <ThemeSwitcher className="inline-flex items-center" />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    closeMobileMenu()
                    openConsultation()
                  }}
                  className="flex h-12 w-full items-center justify-center rounded-xl bg-velora-emerald px-5 text-[15px] font-medium text-white shadow-lg shadow-velora-emerald/15 transition-[background-color,transform] duration-150 hover:bg-velora-emerald-dark active:scale-[0.97]"
                >
                  Request a Consultation
                </button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
