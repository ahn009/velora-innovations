import { pageMetadata } from '@/lib/seo'
import { realEstate, IndustryPageTemplate, withIndustryAgents } from '@/components/velora/page-templates'
export const metadata = pageMetadata({ title: 'AI Automation for Real Estate | Velora Innovations', description: 'Qualify buyer and seller enquiries, coordinate viewings, route property questions, and keep agent follow-up visible.', path: '/industries/real-estate' })
export default function Page() { return <IndustryPageTemplate content={withIndustryAgents(realEstate, 'Real Estate')} current="Real Estate" consultationPath="/consultation?industry=real-estate" /> }
