import { pageMetadata } from '@/lib/seo'
import { customerSupport, SolutionPageTemplate } from '@/components/velora/page-templates'
export const metadata = pageMetadata({ title: 'AI Customer Support Automation | Velora Innovations', description: 'Answer approved support questions, categorize requests, retrieve permitted context, and escalate complex cases to your team.', path: '/solutions/customer-support' })
export default function Page() { return <SolutionPageTemplate content={customerSupport} current="Customer Support" consultationPath="/consultation?interest=customer-support" /> }
