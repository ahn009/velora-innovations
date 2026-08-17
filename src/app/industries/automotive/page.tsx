import { pageMetadata } from '@/lib/seo'
import { automotive, IndustryPageTemplate, withIndustryAgents } from '@/components/velora/page-templates'
export const metadata = pageMetadata({ title: 'AI Automation for Automotive Businesses | Velora Innovations', description: 'Capture vehicle and service details, coordinate appointments, and keep estimate follow-up visible for automotive teams.', path: '/industries/automotive' })
export default function Page() { return <IndustryPageTemplate content={withIndustryAgents(automotive, 'Automotive')} current="Automotive" consultationPath="/consultation?industry=automotive" /> }
