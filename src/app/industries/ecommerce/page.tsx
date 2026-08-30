import { pageMetadata } from '@/lib/seo'
import { ecommerce, IndustryPageTemplate, withIndustryAgents } from '@/components/velora/page-templates'
export const metadata = pageMetadata({ title: 'AI Automation for E-commerce | Velora Automations', description: 'Answer approved product and order questions, categorize requests, and route e-commerce support exceptions.', path: '/industries/ecommerce' })
export default function Page() { return <IndustryPageTemplate content={withIndustryAgents(ecommerce, 'E-commerce')} current="E-commerce" consultationPath="/consultation?industry=ecommerce" /> }
