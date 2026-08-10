import { pageMetadata } from '@/lib/seo'
import { ConsultationPage } from '@/components/velora/consultation-page'

export const metadata = pageMetadata({ title: 'Book a Consultation | Velora Innovations', description: 'Request a practical consultation about the customer, operational, and administrative workflows your business could automate.', path: '/consultation' })

export default function ConsultationRoute() { return <ConsultationPage /> }
