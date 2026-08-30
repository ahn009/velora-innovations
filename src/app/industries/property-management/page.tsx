import { pageMetadata } from '@/lib/seo'
import { propertyManagement, IndustryPageTemplate, withIndustryAgents } from '@/components/velora/page-templates'
export const metadata = pageMetadata({ title: 'AI Automation for Property Management | Velora Automations', description: 'Triage tenant and leasing requests, coordinate showings, and route maintenance concerns with clear human ownership.', path: '/industries/property-management' })
export default function Page() { return <IndustryPageTemplate content={withIndustryAgents(propertyManagement, 'Property Management')} current="Property Management" consultationPath="/consultation?industry=property-management" /> }
