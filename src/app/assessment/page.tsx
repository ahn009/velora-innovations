import { pageMetadata } from '@/lib/seo'
import { Assessment } from '@/components/velora/assessment'

export const metadata = pageMetadata({ title: 'AI Automation Opportunity Assessment | Velora Automations', description: 'Identify a practical starting point for AI automation based on your business workflow, customer inquiries, and systems.', path: '/assessment' })

export default function AssessmentPage() { return <main id="main-content"><Assessment /></main> }
