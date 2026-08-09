import type { Metadata } from 'next'
import { homeServices, IndustryPageTemplate } from '@/components/velora/page-templates'

export const metadata: Metadata = { title: 'AI Automation for Home Services | Velora Innovations', description: 'Explore practical AI receptionist, qualification, scheduling, and follow-up workflows for home-service businesses.' }

export default function HomeServicesPage() { return <IndustryPageTemplate content={homeServices} /> }
