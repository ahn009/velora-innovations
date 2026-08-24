export const CORE_SOLUTIONS = [
  'AI Receptionist',
  'Lead Qualification',
  'Appointment Automation',
  'Customer Support',
  'Follow-Up Automation',
  'CRM Automation',
  'Workflow Automation',
] as const

export type VeloraSolution = typeof CORE_SOLUTIONS[number]

export const SUPPORTED_INDUSTRIES = [
  'Home Services',
  'Dental',
  'Law Firms',
  'Real Estate',
  'Property Management',
  'Accounting',
  'Medical Practices',
  'Automotive',
  'E-commerce',
] as const

export type VeloraIndustry = typeof SUPPORTED_INDUSTRIES[number]

export const CANONICAL_VELORA_FACTS = {
  pricing: {
    foundation: 'Foundation starts from $2,500 USD for one focused workflow.',
    growth: 'Growth starts from $5,000 USD for connected workflows.',
    custom: 'Custom engagements are priced from confirmed requirements.',
    variables: 'Final scope may vary with model usage, telephony, integrations, third-party software, monitoring, support, reporting, and recurring management.',
  },
  implementation: [
    'Discover the actual process, systems, owners, and points where customers wait.',
    'Design approved actions, restricted actions, business rules, integrations, and human handoff.',
    'Build and test normal requests, missing information, edge cases, failures, and escalation paths.',
    'Launch in controlled scope, monitor outcomes, and refine before expanding.',
  ],
  integration: 'Velora can connect with compatible systems. Compatibility depends on available APIs, webhooks or supported access, authentication, permissions, data mapping, rate limits, and the actions the software permits.',
  consultation: 'A consultation starts with one real workflow, the systems involved, and the people responsible for approvals or exceptions.',
  boundaries: [
    'Velora does not guarantee revenue, bookings, or customer outcomes.',
    'Velora does not claim universal integration compatibility.',
    'People remain responsible for judgment, sensitive conversations, exceptions, and regulated decisions.',
    'The website assistant does not access leads, customer records, private messages, credentials, or chat transcripts stored across visitors.',
  ],
} as const

export const SOLUTION_ROUTES: Record<VeloraSolution, string> = {
  'AI Receptionist': '/solutions/ai-receptionist',
  'Lead Qualification': '/solutions/lead-qualification',
  'Appointment Automation': '/solutions/appointment-automation',
  'Customer Support': '/solutions/customer-support',
  'Follow-Up Automation': '/solutions/follow-up-automation',
  'CRM Automation': '/solutions/crm-automation',
  'Workflow Automation': '/solutions/workflow-automation',
}
