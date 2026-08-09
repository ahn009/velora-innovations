import type { Metadata } from 'next'
import { AssessmentResults } from '@/components/velora/assessment-results'

export const metadata: Metadata = { title: 'Assessment Results | Velora Innovations', description: 'Review your personalized AI automation opportunity recommendation.' }

export default function AssessmentResultsPage() { return <main id="main-content"><AssessmentResults /></main> }
