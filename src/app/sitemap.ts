import type { MetadataRoute } from 'next'
import { isIndexingEnabled, siteUrl } from '@/lib/site-config'
import siteManifest from '@/lib/site-manifest.json'

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexingEnabled) return []

  return siteManifest.routes.map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : path.startsWith('/solutions/') || path.startsWith('/industries/') ? 0.8 : 0.6,
  }))
}
