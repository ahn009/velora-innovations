import { pageMetadata } from '@/lib/seo'
import { workflowAutomation, SolutionPageTemplate } from '@/components/velora/page-templates'
export const metadata = pageMetadata({ title: 'AI Workflow Automation | Velora Automations', description: 'Connect customer touchpoints, validation, AI classification, system actions, notifications, and human approvals into one visible workflow.', path: '/solutions/workflow-automation' })
export default function Page() { return <SolutionPageTemplate content={workflowAutomation} current="Workflow Automation" consultationPath="/consultation?interest=workflow-automation" /> }
