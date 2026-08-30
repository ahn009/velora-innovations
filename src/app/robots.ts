import type { MetadataRoute } from 'next'
import { isIndexingEnabled, siteUrl } from '@/lib/site-config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: isIndexingEnabled
      ? { userAgent: '*', allow: '/' }
      : { userAgent: '*', disallow: '/' },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}
