import { pageMetadata } from '@/lib/seo'
import { leadQualification, SolutionPageTemplate } from '@/components/velora/page-templates'
export const metadata = pageMetadata({ title: 'AI Lead Qualification | Velora Automations', description: 'Respond to new inquiries, collect required context, classify intent, and route qualified or uncertain leads using configured business rules.', path: '/solutions/lead-qualification' })
export default function Page() { return <SolutionPageTemplate content={leadQualification} current="Lead Qualification" consultationPath="/consultation?interest=lead-qualification" /> }
