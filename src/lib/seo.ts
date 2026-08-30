import type { Metadata } from 'next'
import { absoluteUrl, siteName } from '@/lib/site-config'

export function pageMetadata({ title, description, path, index = true }: { title: string; description: string; path: string; index?: boolean }): Metadata {
  const url = absoluteUrl(path)
  const socialImage = absoluteUrl('/opengraph-image')

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName,
      type: 'website',
      locale: 'en_US',
      images: [{ url: socialImage, width: 1200, height: 630, alt: `${siteName} — practical AI automation` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url: socialImage, alt: `${siteName} — practical AI automation` }],
    },
    ...(!index ? { robots: { index: false, follow: false } } : {}),
  }
}
