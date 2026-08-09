import type { Metadata } from 'next'
import { Assessment } from '@/components/velora/assessment'

export const metadata: Metadata = { title: 'AI Opportunity Assessment | Velora Innovations', description: 'Identify a practical starting point for AI automation based on your business workflow, customer enquiries, and systems.' }

export default function AssessmentPage() { return <main id="main-content"><Assessment /></main> }
