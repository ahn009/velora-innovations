import { pageMetadata } from '@/lib/seo'
import { appointmentAutomation, SolutionPageTemplate } from '@/components/velora/page-templates'
export const metadata = pageMetadata({ title: 'AI Appointment Automation | Velora Innovations', description: 'Coordinate qualification, availability, booking, reminders, and human exceptions around the scheduling system your business uses.', path: '/solutions/appointment-automation' })
export default function Page() { return <SolutionPageTemplate content={appointmentAutomation} current="Appointment Automation" consultationPath="/consultation?interest=appointment-automation" /> }
