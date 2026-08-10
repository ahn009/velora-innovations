import { pageMetadata } from '@/lib/seo'
import { followUpAutomation, SolutionPageTemplate } from '@/components/velora/page-templates'
export const metadata = pageMetadata({ title: 'AI Follow-Up Automation | Velora Innovations', description: 'Keep missed calls, unbooked leads, quotes, reminders, and post-consultation actions moving with approved follow-up rules.', path: '/solutions/follow-up-automation' })
export default function Page() { return <SolutionPageTemplate content={followUpAutomation} current="Follow-Up Automation" consultationPath="/consultation?interest=follow-up-automation" /> }
