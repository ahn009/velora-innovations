import Link from 'next/link'
import { contactEmail } from '@/lib/site-config'
import { NewsletterSignup } from './newsletter-signup'

const footerLinks = {
  Solutions: [
    { label: 'Solutions Overview', href: '/solutions' },
    { label: 'AI Receptionist', href: '/solutions/ai-receptionist' },
    { label: 'Lead Qualification', href: '/solutions/lead-qualification' },
    { label: 'Appointment Booking', href: '/solutions/appointment-automation' },
    { label: 'Workflow Automation', href: '/solutions/workflow-automation' },
  ],
  Industries: [
    { label: 'Industries Overview', href: '/industries' },
    { label: 'Home Services', href: '/industries/home-services' },
    { label: 'Property Management', href: '/industries/property-management' },
    { label: 'Real Estate', href: '/industries/real-estate' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Consultation', href: '/consultation' },
  ],
  Resources: [
    { label: 'Resources', href: '/resources' },
    { label: 'Guided Demo', href: '/resources/demo' },
    { label: 'Example Workflows', href: '/resources/workflows' },
    { label: 'FAQ', href: '/resources/faq' },
    { label: 'Security & Control', href: '/resources/security' },
    { label: 'Opportunity Assessment', href: '/assessment' },
  ],
} as const

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
  { label: 'AI Disclosure', href: '/ai-disclosure' },
  { label: 'Accessibility', href: '/accessibility' },
] as const

function BrandMark() { return <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Velora Innovations home"><span className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] bg-velora-navy text-white"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2 2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span><span className="text-lg font-semibold tracking-tight text-text-primary">Velora</span></Link> }

type SocialName = 'linkedin' | 'x' | 'instagram' | 'facebook'

function SocialIcon({ name }: { name: SocialName }) {
  if (name === 'linkedin') {
    return <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" aria-hidden="true"><path d="M6.5 9.5V18M6.5 6.5v.01M10.5 18v-4.75a3.25 3.25 0 0 1 6.5 0V18M10.5 9.5V18" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg>
  }
  if (name === 'x') {
    return <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" aria-hidden="true"><path d="M5 4 19 20M19 4 5 20" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" /></svg>
  }
  if (name === 'instagram') {
    return <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.8" /><circle cx="17.5" cy="6.6" r="1" fill="currentColor" /></svg>
  }
  return <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor" aria-hidden="true"><path d="M14.2 21v-7h2.6l.4-3h-3V9.1c0-.9.3-1.6 1.6-1.6h1.6V4.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1V11H8.3v3H11v7h3.2Z" /></svg>
}

const socialIconClass = 'flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle bg-background-primary text-text-secondary transition-colors'

function SocialLinks({ linkedInUrl }: { linkedInUrl: string }) {
  const comingSoon = [
    { name: 'x' as const, label: 'X' },
    { name: 'instagram' as const, label: 'Instagram' },
    { name: 'facebook' as const, label: 'Facebook' },
  ]

  return <nav className="mt-5 flex items-center gap-2" aria-label="Social media"><a href={linkedInUrl} target="_blank" rel="noreferrer noopener" aria-label="Velora Innovations on LinkedIn (opens in a new tab)" title="LinkedIn" className={`${socialIconClass} hover:border-brand-primary/40 hover:text-brand-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2`}><SocialIcon name="linkedin" /></a>{comingSoon.map((social) => <span key={social.name} role="img" aria-label={`${social.label} — coming soon`} title={`${social.label} — coming soon`} className={`${socialIconClass} cursor-not-allowed opacity-40`}><SocialIcon name={social.name} /></span>)}</nav>
}

export function Footer() {
  const linkedInUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/company/velora-ai-automations'
  const newsletterEnabled = process.env.NEXT_PUBLIC_NEWSLETTER_ENABLED === 'true'
  return <footer className="border-t border-border-subtle bg-surface-primary" role="contentinfo"><div className="h-1 bg-gradient-to-r from-brand-primary via-brand-primary/30 to-transparent" aria-hidden="true" /><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"><div className="grid gap-10 py-12 lg:grid-cols-[1.1fr_2fr] lg:gap-16 lg:py-16"><div><BrandMark /><p className="mt-4 max-w-xs text-sm leading-6 text-text-secondary">AI agents designed around your business, your customers, and the workflow your team already owns.</p>{contactEmail && <a href={`mailto:${contactEmail}`} className="mt-4 inline-block text-sm text-text-secondary underline decoration-border-strong underline-offset-4 hover:text-text-primary">{contactEmail}</a>}<SocialLinks linkedInUrl={linkedInUrl} />{newsletterEnabled && <div className="mt-7 max-w-xs"><p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Practical updates</p><NewsletterSignup /></div>}</div><div className="grid grid-cols-2 gap-8 sm:grid-cols-4">{Object.entries(footerLinks).map(([category, links]) => <div key={category}><h2 className="text-sm font-semibold text-text-primary">{category}</h2><ul className="mt-4 space-y-2.5" role="list">{links.map((link) => <li key={link.label}><Link href={link.href} className="text-sm leading-5 text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">{link.label}</Link></li>)}</ul></div>)}</div></div><div className="flex flex-col gap-4 border-t border-border-subtle py-6 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs text-text-muted">© {new Date().getFullYear()} Velora Innovations. All rights reserved.</p><nav className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Legal navigation">{legalLinks.map((link) => <Link key={link.label} href={link.href} className="text-xs text-text-muted hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">{link.label}</Link>)}</nav></div></div></footer>
}
