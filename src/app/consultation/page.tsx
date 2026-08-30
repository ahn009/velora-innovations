import { pageMetadata } from '@/lib/seo'
import { ConsultationPage } from '@/components/velora/consultation-page'

export const metadata = pageMetadata({ title: 'AI Automation Consultation | Velora Automations', description: 'Request a practical consultation about customer response, operational, and administrative workflows your business could automate.', path: '/consultation' })

export default function ConsultationRoute() { return <ConsultationPage /> }
