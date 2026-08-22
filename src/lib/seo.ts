import type { Metadata } from 'next'
import { siteName, siteUrl } from '@/lib/site-config'

export function pageMetadata({ title, description, path, index = true }: { title: string; description: string; path: string; index?: boolean }): Metadata {
  const url = `${siteUrl}${path}`
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url, siteName, type: 'website' }, twitter: { card: 'summary_large_image', title, description }, ...(!index ? { robots: { index: false, follow: false } } : {}) }
}
