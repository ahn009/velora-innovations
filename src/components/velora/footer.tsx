import Link from 'next/link'
import { contactEmail, linkedInUrl, xUrl } from '@/lib/site-config'
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
    return <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true"><path d="M19.65 3H4.35A1.35 1.35 0 0 0 3 4.35v15.3A1.35 1.35 0 0 0 4.35 21h15.3A1.35 1.35 0 0 0 21 19.65V4.35A1.35 1.35 0 0 0 19.65 3ZM8.34 18.3H5.63V9.57h2.71v8.73ZM6.98 8.38a1.57 1.57 0 1 1 0-3.14 1.57 1.57 0 0 1 0 3.14Zm11.32 9.92h-2.7v-4.25c0-1.01-.02-2.32-1.41-2.32-1.42 0-1.64 1.11-1.64 2.25v4.32H9.84V9.57h2.6v1.19h.04a2.85 2.85 0 0 1 2.57-1.41c2.74 0 3.25 1.8 3.25 4.15v4.8Z" /></svg>
  }
  if (name === 'x') {
    return <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="currentColor" aria-hidden="true"><path d="M17.18 3h3.22l-7.04 8.05L21.64 21h-6.49l-5.08-6.64L4.26 21H1.03l7.54-8.62L.63 3h6.65l4.59 6.07L17.18 3Zm-1.13 16.25h1.78L6.31 4.66H4.4l11.65 14.59Z" /></svg>
  }
  if (name === 'instagram') {
    return <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5.5" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" /><circle cx="17.4" cy="6.7" r="1.15" fill="currentColor" /></svg>
  }
  return <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true"><path d="M13.73 21v-8.2h2.75l.41-3.2h-3.16V7.56c0-.93.26-1.56 1.59-1.56H17V3.14A22.6 22.6 0 0 0 14.55 3c-2.43 0-4.1 1.49-4.1 4.22V9.6H7.7v3.2h2.75V21h3.28Z" /></svg>
}

const socialIconClass = 'group relative flex h-11 w-11 items-center justify-center rounded-xl border border-border-subtle bg-surface-primary text-text-secondary shadow-[0_1px_2px_rgb(15_23_42_/_0.06)] transition-[color,background-color,border-color,box-shadow,transform] duration-[var(--motion-normal)] motion-reduce:transform-none'

function SocialTooltip({ children }: { children: React.ReactNode }) {
  return <span className="pointer-events-none absolute -top-10 left-1/2 z-10 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-velora-navy px-2.5 py-1.5 text-[10px] font-semibold tracking-wide text-white opacity-0 shadow-lg transition-[opacity,transform] duration-[var(--motion-fast)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transform-none" role="tooltip">{children}<span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-velora-navy" aria-hidden="true" /></span>
}

function SocialLinks() {
  const comingSoon = [
    { name: 'instagram' as const, label: 'Instagram' },
    { name: 'facebook' as const, label: 'Facebook' },
  ]

  return <div className="mt-6"><p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">Connect with us</p><nav className="flex w-fit items-center gap-1.5 rounded-2xl border border-border-subtle bg-background-secondary/70 p-1.5 shadow-[inset_0_1px_0_rgb(255_255_255_/_0.65)]" aria-label="Social media"><a href={linkedInUrl} target="_blank" rel="noreferrer noopener" aria-label="Velora Innovations on LinkedIn (opens in a new tab)" className={`${socialIconClass} hover:-translate-y-1 hover:border-brand-primary hover:bg-brand-primary hover:text-brand-primary-foreground hover:shadow-[0_10px_24px_rgb(16_185_129_/_0.24)] focus-visible:-translate-y-1 focus-visible:border-brand-primary focus-visible:bg-brand-primary focus-visible:text-brand-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2`}><SocialIcon name="linkedin" /><SocialTooltip>LinkedIn</SocialTooltip></a><a href={xUrl} target="_blank" rel="noreferrer noopener" aria-label="Velora Innovations on X (opens in a new tab)" className={`${socialIconClass} hover:-translate-y-1 hover:border-brand-primary hover:bg-brand-primary hover:text-brand-primary-foreground hover:shadow-[0_10px_24px_rgb(16_185_129_/_0.24)] focus-visible:-translate-y-1 focus-visible:border-brand-primary focus-visible:bg-brand-primary focus-visible:text-brand-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2`}><SocialIcon name="x" /><SocialTooltip>X</SocialTooltip></a>{comingSoon.map((social) => <span key={social.name} role="img" aria-label={`${social.label} — coming soon`} tabIndex={0} className={`${socialIconClass} cursor-default text-text-muted/65 hover:-translate-y-0.5 hover:border-border-strong hover:bg-background-primary hover:text-text-secondary hover:shadow-[0_7px_18px_rgb(15_23_42_/_0.10)] focus-visible:-translate-y-0.5 focus-visible:border-border-strong focus-visible:bg-background-primary focus-visible:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2`}><SocialIcon name={social.name} /><SocialTooltip>{social.label} · Coming soon</SocialTooltip></span>)}</nav></div>
}

export function Footer() {
  const newsletterEnabled = process.env.NEXT_PUBLIC_NEWSLETTER_ENABLED === 'true'
  return <footer className="border-t border-border-subtle bg-surface-primary" role="contentinfo"><div className="h-1 bg-gradient-to-r from-brand-primary via-brand-primary/30 to-transparent" aria-hidden="true" /><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"><div className="grid gap-10 py-12 lg:grid-cols-[1.1fr_2fr] lg:gap-16 lg:py-16"><div><BrandMark /><p className="mt-4 max-w-xs text-sm leading-6 text-text-secondary">AI agents designed around your business, your customers, and the workflow your team already owns.</p>{contactEmail && <a href={`mailto:${contactEmail}`} className="mt-4 inline-block text-sm text-text-secondary underline decoration-border-strong underline-offset-4 hover:text-text-primary">{contactEmail}</a>}<SocialLinks />{newsletterEnabled && <div className="mt-7 max-w-xs"><p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Practical updates</p><NewsletterSignup /></div>}</div><div className="grid grid-cols-2 gap-8 sm:grid-cols-4">{Object.entries(footerLinks).map(([category, links]) => <div key={category}><h2 className="text-sm font-semibold text-text-primary">{category}</h2><ul className="mt-4 space-y-2.5" role="list">{links.map((link) => <li key={link.label}><Link href={link.href} className="text-sm leading-5 text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">{link.label}</Link></li>)}</ul></div>)}</div></div><div className="flex flex-col gap-4 border-t border-border-subtle py-6 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs text-text-muted">© {new Date().getFullYear()} Velora Innovations. All rights reserved.</p><nav className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Legal navigation">{legalLinks.map((link) => <Link key={link.label} href={link.href} className="text-xs text-text-muted hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">{link.label}</Link>)}</nav></div></div></footer>
}
