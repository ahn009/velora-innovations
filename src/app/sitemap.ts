import type { MetadataRoute } from 'next'
import { isIndexingEnabled, siteUrl } from '@/lib/site-config'
import siteManifest from '@/lib/site-manifest.json'

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexingEnabled) return []

  return siteManifest.routes.map((path) => ({
    url: `${siteUrl}${path}`,
  }))
}
