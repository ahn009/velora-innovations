import { pageMetadata } from '@/lib/seo'
import { dental, IndustryPageTemplate } from '@/components/velora/page-templates'
export const metadata = pageMetadata({ title: 'AI Automation for Dental Practices | Velora Innovations', description: 'Support dental administrative calls, appointment requests, rescheduling, and recall follow-up while keeping clinical judgment with the practice team.', path: '/industries/dental' })
export default function Page() { return <IndustryPageTemplate content={dental} current="Dental Practices" consultationPath="/consultation?industry=dental" /> }
