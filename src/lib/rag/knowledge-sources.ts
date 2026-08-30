import {
  accounting,
  aiReceptionist,
  appointmentAutomation,
  automotive,
  crmAutomation,
  customerSupport,
  dental,
  ecommerce,
  followUpAutomation,
  homeServices,
  lawFirms,
  leadQualification,
  medicalPractices,
  propertyManagement,
  realEstate,
  workflowAutomation,
  type IndustryContent,
  type SolutionContent,
} from '@/components/velora/page-templates'
import { defaultFaqs } from '@/components/velora/faq-section'

export type KnowledgeSection = { heading: string; content: string }
export type KnowledgeSource = {
  sourceType: 'page' | 'solution' | 'industry' | 'resource' | 'faq' | 'consultation'
  sourceTitle: string
  route: string
  sourceUrl: string
  sections: KnowledgeSection[]
}

const SITE_URL = 'https://www.veloraautomations.com'
const list = (items: readonly string[]) => items.map((item) => `- ${item}`).join('\n')
const sections = (...items: Array<[string, string]>): KnowledgeSection[] => items.map(([heading, content]) => ({ heading, content }))

function solutionSource(sourceTitle: string, route: string, item: SolutionContent): KnowledgeSource {
  return {
    sourceType: 'solution', sourceTitle, route, sourceUrl: `${SITE_URL}${route}`,
    sections: sections(
      ['Overview', `${item.title}. ${item.description} ${item.outcome}`],
      ['Within scope', list(item.does)],
      ['Outside scope', list(item.doesNot)],
      ['Workflow', item.workflow.join(' → ')],
      ['Use cases', item.useCases.map((entry) => `${entry.title}: ${entry.description}`).join('\n')],
      ['Integrations', `Potential connection categories: ${item.integrations.join(', ')}. Integration depends on actual API access, authentication, permissions, field mapping, and workflow requirements.`],
      ['Frequently asked questions', item.faq.map((entry) => `Q: ${entry.question}\nA: ${entry.answer}`).join('\n\n')],
    ),
  }
}

function industrySource(sourceTitle: string, route: string, item: IndustryContent): KnowledgeSource {
  return {
    sourceType: 'industry', sourceTitle, route, sourceUrl: `${SITE_URL}${route}`,
    sections: sections(
      ['Overview', `${item.title}. ${item.description}`],
      ['Common problems', list(item.problems)],
      ['Recommended systems', item.systems.map((entry) => `${entry.title}: ${entry.description}`).join('\n')],
      ['Illustrative workflow', item.workflow.join(' → ')],
      ['Integration categories', `${item.integrations.join(', ')}. These are categories, not a claim of universal compatibility.`],
      ['Industry boundaries', list(item.considerations)],
      ['Frequently asked questions', item.faq.map((entry) => `Q: ${entry.question}\nA: ${entry.answer}`).join('\n\n')],
    ),
  }
}

const coreSources: KnowledgeSource[] = [
  {
    sourceType: 'page', sourceTitle: 'Velora Automations', route: '/', sourceUrl: `${SITE_URL}/`,
    sections: sections(
      ['What Velora does', 'Velora Automations designs practical, bounded AI workflows for customer response, routine questions, lead qualification, appointment coordination, follow-up, CRM updates, connected business operations, and clear human escalation. Velora starts with one scoped process and expands only after the workflow is tested and owned.'],
      ['Who Velora serves', 'Velora serves customer-facing service businesses in the United States and Canada. Strong initial fits have repeated inquiries or coordination tasks, documented rules, suitable system access, and a human owner for outcomes.'],
      ['Operating boundaries', 'People remain responsible for judgment, sensitive conversations, exceptions, and regulated decisions. Velora does not guarantee revenue, bookings, or customer outcomes.'],
    ),
  },
  {
    sourceType: 'page', sourceTitle: 'Solutions', route: '/solutions', sourceUrl: `${SITE_URL}/solutions`,
    sections: sections(
      ['Solution catalog', 'Velora offers focused systems for AI reception, lead qualification, appointment automation, customer support, follow-up automation, CRM automation, and workflow automation. The right starting point depends on the operational bottleneck.'],
      ['Choosing a solution', 'Missed calls may point to an AI receptionist. Slow lead response may point to lead qualification. Scheduling bottlenecks may point to appointment automation. Manual CRM updates may point to CRM automation. Disconnected processes may point to workflow automation.'],
      ['Integration promise', 'Integration scope is verified, not assumed. Velora reviews actual APIs, permissions, authentication, field mapping, rate limits, and failure behavior before finalizing a workflow.'],
    ),
  },
  {
    sourceType: 'page', sourceTitle: 'Industries', route: '/industries', sourceUrl: `${SITE_URL}/industries`,
    sections: sections(
      ['Industry fit', 'Velora adapts workflow design to the business environment. Strong fits have high volumes of similar inquiries, documented policies and escalation rules, suitable API access, and a team member responsible for outcomes.'],
      ['Separate review', 'Emergency decisions, autonomous high-impact recommendations, regulated decisions, unreliable source information, or workflows without a human escalation path require separate review and may not be appropriate.'],
    ),
  },
  {
    sourceType: 'page', sourceTitle: 'How It Works', route: '/how-it-works', sourceUrl: `${SITE_URL}/how-it-works`,
    sections: sections(
      ['Implementation approach', 'Velora starts with the process, not the AI. Every proposal is tied to real systems, approved scenarios, acceptance criteria, and a named human owner for exceptions.'],
      ['Discover', 'Map goals, lead sources, software, repetitive tasks, and moments where customers wait for a response.'],
      ['Design', 'Define responsibilities, business rules, allowed and restricted actions, integrations, and handoff conditions.'],
      ['Build and test', 'Configure knowledge, conversation paths, system connections, notifications, and reporting. Test normal requests, missing information, edge cases, restricted topics, integration failures, and human handoffs.'],
      ['Launch and optimize', 'Deploy in a controlled scope with ownership and monitoring. Review conversations and outcomes, then refine knowledge, prompts, routing, and workflow rules.'],
    ),
  },
  {
    sourceType: 'page', sourceTitle: 'Pricing', route: '/pricing', sourceUrl: `${SITE_URL}/pricing`,
    sections: sections(
      ['Foundation', 'Foundation starts from $2,500 USD as a one-time implementation for one focused workflow. It may include one communication channel, one core use case, knowledge and workflow setup, a basic integration, testing, human handoff rules, and launch monitoring.'],
      ['Growth', 'Growth starts from $5,000 USD as a one-time implementation for connected workflows. It may include multiple workflows and channels, CRM or calendar integration, qualification and booking, follow-up, handoff and reporting, and an initial optimization review.'],
      ['Custom', 'Custom engagements are priced based on requirements for multi-location, multi-agent, advanced-integration, permission, reporting, testing, or support needs.'],
      ['What affects cost', 'Actual pricing depends on confirmed scope. Integration complexity, channels, volume, model usage, telephony, third-party software, monitoring, revisions, support, reporting, and recurring management may be separate. A final project price is confirmed after reviewing the workflow.'],
    ),
  },
  {
    sourceType: 'resource', sourceTitle: 'Resources', route: '/resources', sourceUrl: `${SITE_URL}/resources`,
    sections: sections(
      ['Resource hub', 'Velora resources help visitors evaluate workflow structure, integrations, security, cost, delivery, and limitations before a deployment. Resources include a guided demo, example workflows, opportunity calculator, integrations, security and control, FAQ, pricing, and an assessment.'],
    ),
  },
  {
    sourceType: 'resource', sourceTitle: 'Guided Demo', route: '/resources/demo', sourceUrl: `${SITE_URL}/resources/demo`,
    sections: sections(
      ['Demo disclosure', 'The guided demo is a scripted sample showing disclosure, approved responses, booking logic, and human handoff. It illustrates structure and is not a production model, customer case study, or performance claim.'],
    ),
  },
  {
    sourceType: 'resource', sourceTitle: 'Example Workflows', route: '/resources/workflows', sourceUrl: `${SITE_URL}/resources/workflows`,
    sections: sections(
      ['Illustrative examples', 'The example workflows demonstrate possible customer intake, qualification, scheduling, routing, and follow-up structures. They are illustrative, not customer case studies or guaranteed performance outcomes.'],
    ),
  },
  {
    sourceType: 'resource', sourceTitle: 'Integrations', route: '/resources/integrations', sourceUrl: `${SITE_URL}/resources/integrations`,
    sections: sections(
      ['Integration review', 'Velora can connect with compatible systems. Compatibility depends on the software, available API, authentication, permissions, supported actions, data mapping, rate limits, security requirements, and failure behavior. The implementation is configured around the client’s systems.'],
      ['Connection categories', 'Possible categories include phone, web chat, SMS, email, CRM, calendar, help desk, payments, spreadsheets, project management, website forms, and security systems. Listing a category is not a promise that every product is supported.'],
    ),
  },
  {
    sourceType: 'resource', sourceTitle: 'Security and Control', route: '/resources/security', sourceUrl: `${SITE_URL}/resources/security`,
    sections: sections(
      ['Deployment controls', 'Controls are defined for the actual workflow and vendors. Areas reviewed include approved knowledge, least-necessary access, retention, conversation logging where appropriate, monitoring, disclosure, restricted actions, error handling, and human escalation.'],
      ['Human responsibility', 'Complex, sensitive, uncertain, or failed actions should pause or route to a responsible person with useful context. Additional compliance, vendor, privacy, and data-handling review may be required for sensitive workflows. Velora does not make unsupported certification claims.'],
    ),
  },
  {
    sourceType: 'resource', sourceTitle: 'Opportunity Calculator', route: '/resources/calculator', sourceUrl: `${SITE_URL}/resources/calculator`,
    sections: sections(
      ['Calculator boundary', 'The opportunity calculator models the size of a missed-inquiry problem using visitor-provided volume, value, and recovery assumptions. Its result is a planning model, not a promise, financial advice, or forecast.'],
    ),
  },
  {
    sourceType: 'faq', sourceTitle: 'Frequently Asked Questions', route: '/resources/faq', sourceUrl: `${SITE_URL}/resources/faq`,
    sections: defaultFaqs.map(([question, answer]) => ({ heading: question, content: `Question: ${question}\nAnswer: ${answer}` })),
  },
  {
    sourceType: 'page', sourceTitle: 'About Velora Automations', route: '/about', sourceUrl: `${SITE_URL}/about`,
    sections: sections(
      ['About', 'Velora Automations builds practical AI automation systems for small and mid-sized, customer-facing businesses in the United States and Canada. It designs focused workflows for customer response, routine questions, lead qualification, appointment scheduling, follow-up, CRM updates, and human escalation.'],
      ['Working method', 'Velora maps the current workflow, confirms API access and data handling, defines success criteria, tests approved scenarios, launches in controlled scope, and expands only when evidence supports it. Proposed project ownership, delivery responsibilities, vendors, and escalation contacts are shared before an engagement begins.'],
      ['Current focus', 'Velora serves inquiry- and appointment-driven businesses, including home services, dental and medical practices, law firms, real estate, property management, accounting, automotive, and e-commerce teams. Regulated or high-risk use cases require separate legal, privacy, security, vendor, and professional review and may not be accepted.'],
    ),
  },
  {
    sourceType: 'page', sourceTitle: 'AI Disclosure', route: '/ai-disclosure', sourceUrl: `${SITE_URL}/ai-disclosure`,
    sections: sections(
      ['Transparency', 'Velora does not present a scripted demonstration, AI-generated response, or artificial voice as a human. Production systems should disclose AI use where appropriate, remain within approved knowledge and actions, identify restricted topics, and provide a clear route to a person.'],
      ['Limitations', 'AI systems can misunderstand requests and produce incorrect output. They require testing, monitoring, access controls, incident handling, and human review for consequential decisions. Velora does not recommend autonomous emergency, legal, medical, credit, employment, or other high-impact decisions without a separate risk and compliance program.'],
    ),
  },
  {
    sourceType: 'consultation', sourceTitle: 'Request a Consultation', route: '/consultation', sourceUrl: `${SITE_URL}/consultation`,
    sections: sections(
      ['Consultation process', 'A consultation request starts with one real workflow, the systems involved, and the people who own approvals or exceptions. Velora reviews customer inquiries, repetitive work, tools, handoff requirements, fit, boundaries, and implementation scope, then follows up using the details voluntarily submitted through the form. The request does not claim live calendar availability.'],
      ['Privacy', 'The website assistant does not automatically collect contact details or store chat transcripts. Visitors who explicitly want follow-up should use the consultation form.'],
    ),
  },
]

const solutionSources = [
  solutionSource('AI Receptionist', '/solutions/ai-receptionist', aiReceptionist),
  solutionSource('Lead Qualification', '/solutions/lead-qualification', leadQualification),
  solutionSource('Appointment Automation', '/solutions/appointment-automation', appointmentAutomation),
  solutionSource('Customer Support', '/solutions/customer-support', customerSupport),
  solutionSource('Follow-Up Automation', '/solutions/follow-up-automation', followUpAutomation),
  solutionSource('CRM Automation', '/solutions/crm-automation', crmAutomation),
  solutionSource('Workflow Automation', '/solutions/workflow-automation', workflowAutomation),
]

const industrySources = [
  industrySource('Home Services', '/industries/home-services', homeServices),
  industrySource('Dental Practices', '/industries/dental', dental),
  industrySource('Medical Practices', '/industries/medical-practices', medicalPractices),
  industrySource('Law Firms', '/industries/law-firms', lawFirms),
  industrySource('Real Estate', '/industries/real-estate', realEstate),
  industrySource('Property Management', '/industries/property-management', propertyManagement),
  industrySource('Accounting', '/industries/accounting', accounting),
  industrySource('Automotive', '/industries/automotive', automotive),
  industrySource('E-commerce', '/industries/ecommerce', ecommerce),
]

export function getApprovedKnowledgeSources() {
  return [...coreSources, ...solutionSources, ...industrySources]
}
