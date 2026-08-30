import { pageMetadata } from '@/lib/seo'
import { medicalPractices, IndustryPageTemplate, withIndustryAgents } from '@/components/velora/page-templates'
export const metadata = pageMetadata({ title: 'AI Automation for Medical Practices | Velora Automations', description: 'Improve administrative intake, appointment coordination, and routing without turning an assistant into a clinical decision-maker.', path: '/industries/medical-practices' })
export default function Page() { return <IndustryPageTemplate content={withIndustryAgents(medicalPractices, 'Medical Practices')} current="Medical Practices" consultationPath="/consultation?industry=medical-practices" /> }
