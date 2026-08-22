const fallbackSiteUrl = 'https://velora-innovations.vercel.app'

function normalizeSiteUrl(value: string | undefined) {
  if (!value) return fallbackSiteUrl

  try {
    const url = new URL(value)
    if (url.protocol !== 'https:' && process.env.NODE_ENV === 'production') return fallbackSiteUrl
    return url.toString().replace(/\/$/, '')
  } catch {
    return fallbackSiteUrl
  }
}

export const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL)
export const siteName = 'Velora Innovations'
export const isIndexingEnabled = process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true' && !new URL(siteUrl).hostname.endsWith('.vercel.app')
