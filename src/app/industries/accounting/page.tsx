import { pageMetadata } from '@/lib/seo'
import { accounting, IndustryPageTemplate } from '@/components/velora/page-templates'
export const metadata = pageMetadata({ title: 'AI Automation for Accounting Firms | Velora Innovations', description: 'Support accounting consultation intake, administrative FAQs, document reminders, and service routing without providing professional advice.', path: '/industries/accounting' })
export default function Page() { return <IndustryPageTemplate content={accounting} current="Accounting" consultationPath="/consultation?industry=accounting" /> }
