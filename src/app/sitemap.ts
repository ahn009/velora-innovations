import type { MetadataRoute } from 'next'
import { siteUrl } from '@/lib/site-config'

const routes = [
  '/', '/solutions', '/solutions/ai-receptionist', '/solutions/lead-qualification', '/solutions/appointment-automation', '/solutions/customer-support', '/solutions/follow-up-automation', '/solutions/crm-automation', '/solutions/workflow-automation',
  '/industries', '/industries/home-services', '/industries/dental', '/industries/law-firms', '/industries/real-estate', '/industries/property-management', '/industries/accounting', '/industries/medical-practices', '/industries/automotive', '/industries/ecommerce',
  '/assessment', '/consultation', '/how-it-works', '/pricing', '/about', '/resources', '/resources/demo', '/resources/faq', '/resources/integrations', '/resources/security', '/resources/workflows', '/resources/calculator', '/privacy', '/terms', '/ai-disclosure', '/cookies', '/accessibility',
]

export default function sitemap(): MetadataRoute.Sitemap { return routes.map((path) => ({ url: `${siteUrl}${path}`, changeFrequency: 'monthly', priority: path === '/' ? 1 : path.startsWith('/solutions/') || path.startsWith('/industries/') ? 0.8 : 0.6 })) }
