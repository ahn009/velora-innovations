import { pageMetadata } from '@/lib/seo'
import { lawFirms, IndustryPageTemplate, withIndustryAgents } from '@/components/velora/page-templates'
export const metadata = pageMetadata({ title: 'AI Automation for Law Firms | Velora Innovations', description: 'Support non-advisory new-client intake, consultation scheduling, matter-type routing, and follow-up for law firms.', path: '/industries/law-firms' })
export default function Page() { return <IndustryPageTemplate content={withIndustryAgents(lawFirms, 'Law Firms')} current="Law Firms" consultationPath="/consultation?industry=law-firms" /> }
