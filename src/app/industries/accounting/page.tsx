import { pageMetadata } from '@/lib/seo'
import { accounting, IndustryPageTemplate, withIndustryAgents } from '@/components/velora/page-templates'
export const metadata = pageMetadata({ title: 'AI Automation for Accounting Firms | Velora Automations', description: 'Support accounting consultation intake, administrative FAQs, document reminders, and service routing without providing professional advice.', path: '/industries/accounting' })
export default function Page() { return <IndustryPageTemplate content={withIndustryAgents(accounting, 'Accounting')} current="Accounting" consultationPath="/consultation?industry=accounting" /> }
