import { pageMetadata } from '@/lib/seo'
import { crmAutomation, SolutionPageTemplate } from '@/components/velora/page-templates'
export const metadata = pageMetadata({ title: 'AI CRM Automation | Velora Automations', description: 'Keep approved lead details, statuses, notes, owners, tasks, and appointment outcomes current in your CRM.', path: '/solutions/crm-automation' })
export default function Page() { return <SolutionPageTemplate content={crmAutomation} current="CRM Automation" consultationPath="/consultation?interest=crm-automation" /> }
