import { pageMetadata } from '@/lib/seo'
import { propertyManagement, IndustryPageTemplate } from '@/components/velora/page-templates'
export const metadata = pageMetadata({ title: 'AI Automation for Property Management | Velora Innovations', description: 'Triage tenant and leasing requests, coordinate showings, and route maintenance concerns with clear human ownership.', path: '/industries/property-management' })
export default function Page() { return <IndustryPageTemplate content={propertyManagement} current="Property Management" consultationPath="/consultation?industry=property-management" /> }
