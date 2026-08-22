const productionSiteUrl = 'https://www.veloraautomations.com'

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

const isProductionDomain = new URL(siteUrl).hostname === new URL(productionSiteUrl).hostname
const isVercelPreview = process.env.VERCEL_ENV === 'preview'

export const isIndexingEnabled = isProductionDomain
  && !isVercelPreview
  && process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true'
