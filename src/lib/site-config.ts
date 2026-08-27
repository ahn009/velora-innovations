import siteManifest from '@/lib/site-manifest.json'

const productionSiteUrl = siteManifest.siteUrl

function normalizeSiteUrl(value: string | undefined) {
  if (!value) return productionSiteUrl

  try {
    const url = new URL(value)
    if (url.protocol !== 'https:' && process.env.NODE_ENV === 'production') return productionSiteUrl
    if (url.hostname.endsWith('.vercel.app')) return productionSiteUrl
    return url.toString().replace(/\/$/, '')
  } catch {
    return productionSiteUrl
  }
}

export const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL)
export const siteName = 'Velora Innovations'
export const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim()
  || 'info@veloraautomations.com'
export const linkedInUrl = process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim()
  || 'https://www.linkedin.com/company/velora-ai-automations'
export const xUrl = process.env.NEXT_PUBLIC_X_URL?.trim()
  || 'https://x.com/Velora_Automate'

const isProductionDomain = new URL(siteUrl).hostname === new URL(productionSiteUrl).hostname
const isVercelPreview = process.env.VERCEL_ENV === 'preview'

export const isIndexingEnabled = isProductionDomain
  && !isVercelPreview
  && process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true'
