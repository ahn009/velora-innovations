const fallbackSiteUrl = 'https://velora.ai'

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
