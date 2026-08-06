import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { NewsletterSignup } from './newsletter-signup'
import { primaryNavigation, resourceNavigation } from '@/lib/site-navigation'

const footerLinks = {
  Solutions: [
    { label: 'Solutions Overview', href: '/solutions' },
    { label: 'AI Receptionist', href: '/solutions#ai-receptionist' },
    { label: 'Lead Qualification', href: '/solutions#lead-qualification' },
    { label: 'Appointment Booking', href: '/solutions#appointment-booking' },
    { label: 'Workflow Automation', href: '/solutions#workflow-automation' },
  ],
  Industries: [
    { label: 'Industries Overview', href: '/industries' },
    { label: 'Home Services', href: '/industries#home-services' },
    { label: 'Property Management', href: '/industries#property-management' },
    { label: 'Real Estate', href: '/industries#real-estate' },
  ],
  Company: [
    ...primaryNavigation.filter((item) => ['How It Works', 'Pricing', 'About'].includes(item.label)),
    { label: 'Contact', href: '/contact' },
  ],
  Resources: resourceNavigation.map(({ label, href }) => ({ label, href })),
} as const

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
  { label: 'Accessibility', href: '/accessibility' },
  { label: 'AI Disclosure', href: '/ai-disclosure' },
  { label: 'Unsubscribe', href: '/unsubscribe' },
] as const

export function Footer() {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL
  const linkedInUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL

  return (
    <footer className="border-t border-velora-border bg-velora-surface" role="contentinfo">
      {/* Brand gradient divider */}
      <div
        className="h-[2px] w-full dark:opacity-80"
        style={{
          background: 'linear-gradient(90deg, var(--velora-emerald), var(--velora-amber), var(--velora-violet), var(--velora-sky), var(--velora-emerald))',
        }}
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* Main footer content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5 lg:gap-12">
            {/* Brand column */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-8 lg:mb-0">
              <Link href="/" className="inline-flex items-center gap-2.5 group" aria-label="Velora Innovations home">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-velora-navy transition-[box-shadow,transform] duration-150 group-hover:shadow-lg group-hover:shadow-velora-navy/20 group-active:scale-[0.97]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white" aria-hidden="true">
                    <path
                      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-lg font-semibold tracking-tight transition-colors duration-150 group-hover:text-velora-emerald">Velora</span>
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground max-w-xs">
                AI agents designed around your business, your customers and your existing workflow.
              </p>
              {(contactEmail || linkedInUrl) ? <div className="mt-6 flex flex-col items-start gap-2 text-sm">
                {linkedInUrl ? <a
                  href={linkedInUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-[background-color,color,transform] duration-150 hover:bg-velora-emerald/10 hover:text-velora-emerald active:scale-[0.97]"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a> : null}
                {contactEmail ? <a href={`mailto:${contactEmail}`} className="text-muted-foreground underline underline-offset-4 hover:text-foreground">{contactEmail}</a> : null}
              </div> : null}
              <NewsletterSignup />
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="md:border-r md:border-border/40 md:last:border-r-0 md:pr-6 lg:pr-0 md:last:pr-0">
                <h3 className="text-sm font-semibold text-foreground mb-4">
                  {category}
                </h3>
                <ul className="space-y-2.5" role="list">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="nav-link-hover inline-block text-sm leading-relaxed text-muted-foreground transition-[color,transform] duration-150 hover:translate-x-0.5 hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-velora-border" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Velora Innovations. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-muted-foreground transition-colors duration-150 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
