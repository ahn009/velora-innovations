import siteManifest from '@/lib/site-manifest.json'

export const siteUrl = siteManifest.siteUrl
export const siteName = 'Velora Automations'
export const companyDescription = 'Velora Automations builds practical AI automation systems for customer response, lead qualification, appointment scheduling, follow-up, CRM, and connected workflows.'
export const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim()
  || 'info@veloraautomations.com'
export const linkedInUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim()
  || 'https://www.linkedin.com/company/velora-ai-automations'
export const xUrl = process.env.NEXT_PUBLIC_X_URL?.trim()
  || 'https://x.com/Velora_Automate'

const isVercelPreview = process.env.VERCEL_ENV === 'preview'

export const isIndexingEnabled = process.env.NODE_ENV === 'production'
  && !isVercelPreview
  && process.env.NEXT_PUBLIC_ALLOW_INDEXING !== 'false'

export function absoluteUrl(path = '/') {
  return new URL(path, `${siteUrl}/`).toString()
}
