import Link from 'next/link'
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
    { label: 'Contact', href: '/contact' },
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

export function Footer() {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL
  const linkedInUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL
  return <footer className="border-t border-border-subtle bg-surface-primary" role="contentinfo"><div className="h-1 bg-gradient-to-r from-brand-primary via-brand-primary/30 to-transparent" aria-hidden="true" /><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"><div className="grid gap-10 py-12 lg:grid-cols-[1.1fr_2fr] lg:gap-16 lg:py-16"><div><BrandMark /><p className="mt-4 max-w-xs text-sm leading-6 text-text-secondary">AI agents designed around your business, your customers, and the workflow your team already owns.</p>{contactEmail && <a href={`mailto:${contactEmail}`} className="mt-4 inline-block text-sm text-text-secondary underline decoration-border-strong underline-offset-4 hover:text-text-primary">{contactEmail}</a>}{linkedInUrl && <a href={linkedInUrl} target="_blank" rel="noreferrer" className="mt-4 block text-sm text-text-secondary hover:text-text-primary">LinkedIn</a>}<div className="mt-7 max-w-xs"><p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">Practical updates</p><NewsletterSignup /></div></div><div className="grid grid-cols-2 gap-8 sm:grid-cols-4">{Object.entries(footerLinks).map(([category, links]) => <div key={category}><h2 className="text-sm font-semibold text-text-primary">{category}</h2><ul className="mt-4 space-y-2.5" role="list">{links.map((link) => <li key={link.label}><Link href={link.href} className="text-sm leading-5 text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">{link.label}</Link></li>)}</ul></div>)}</div></div><div className="flex flex-col gap-4 border-t border-border-subtle py-6 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs text-text-muted">© {new Date().getFullYear()} Velora Innovations. All rights reserved.</p><nav className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Legal navigation">{legalLinks.map((link) => <Link key={link.label} href={link.href} className="text-xs text-text-muted hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">{link.label}</Link>)}</nav></div></div></footer>
}
