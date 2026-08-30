import { pageMetadata } from '@/lib/seo'
import { aiReceptionist, SolutionPageTemplate } from '@/components/velora/page-templates'

export const metadata = pageMetadata({ title: 'AI Receptionist for Small Businesses | Velora Automations', description: 'An AI receptionist for small businesses that handles approved calls, qualification, scheduling, routing, and human handoff.', path: '/solutions/ai-receptionist' })

export default function AiReceptionistPage() { return <SolutionPageTemplate content={aiReceptionist} current="AI Receptionist" consultationPath="/consultation?interest=ai-receptionist" /> }
