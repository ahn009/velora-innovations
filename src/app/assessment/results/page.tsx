import { AssessmentResults } from '@/components/velora/assessment-results'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({ title: 'Assessment Results | Velora Innovations', description: 'Review your personalized AI automation opportunity recommendation.', path: '/assessment/results', index: false })

export default function AssessmentResultsPage() { return <main id="main-content"><AssessmentResults /></main> }
