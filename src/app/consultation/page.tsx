import type { Metadata } from 'next'
import { ConsultationPage } from '@/components/velora/consultation-page'

export const metadata: Metadata = { title: 'Consultation | Velora Innovations', description: 'Request a practical consultation about the workflows your business could automate.' }

export default function ConsultationRoute() { return <ConsultationPage /> }
