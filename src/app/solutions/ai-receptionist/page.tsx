import { pageMetadata } from '@/lib/seo'
import { aiReceptionist, SolutionPageTemplate } from '@/components/velora/page-templates'

export const metadata = pageMetadata({ title: 'AI Receptionist for Small Businesses | Velora Innovations', description: 'An AI receptionist designed around approved business calls, qualification, scheduling, routing, and human handoff.', path: '/solutions/ai-receptionist' })

export default function AiReceptionistPage() { return <SolutionPageTemplate content={aiReceptionist} current="AI Receptionist" consultationPath="/consultation?interest=ai-receptionist" /> }
