import { pageMetadata } from '@/lib/seo'
import { homeServices, IndustryPageTemplate } from '@/components/velora/page-templates'

export const metadata = pageMetadata({ title: 'AI Automation for Home Service Businesses | Velora Innovations', description: 'Explore practical AI receptionist, qualification, scheduling, and follow-up workflows for home-service businesses.', path: '/industries/home-services' })

export default function HomeServicesPage() { return <IndustryPageTemplate content={homeServices} current="Home Services" consultationPath="/consultation?industry=home-services" /> }
