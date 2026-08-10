import { pageMetadata } from '@/lib/seo'
import { Assessment } from '@/components/velora/assessment'

export const metadata = pageMetadata({ title: 'AI Opportunity Assessment | Velora Innovations', description: 'Identify a practical starting point for AI automation based on your business workflow, customer enquiries, and systems.', path: '/assessment' })

export default function AssessmentPage() { return <main id="main-content"><Assessment /></main> }
