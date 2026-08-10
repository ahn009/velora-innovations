import type { Metadata } from 'next'
import { siteName, siteUrl } from '@/lib/site-config'

export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const url = `${siteUrl}${path}`
  return { title, description, alternates: { canonical: url }, openGraph: { title, description, url, siteName, type: 'website' }, twitter: { card: 'summary_large_image', title, description } }
}
