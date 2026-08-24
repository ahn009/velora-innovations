import type { RequestIntelligence, RagIntent } from './intelligence'
import type { VeloraIndustry, VeloraSolution } from './velora-knowledge'

export type ResponseExample = {
  id: string
  question: string
  intent: RagIntent
  industry: VeloraIndustry | null
  solutions: readonly VeloraSolution[]
  idealAnswer: string
}

export const RESPONSE_EXAMPLES: readonly ResponseExample[] = [
  {
    id: 'general-positioning', question: 'What does Velora do?', intent: 'GENERAL_INFO', industry: null,
    solutions: ['AI Receptionist', 'Lead Qualification', 'Appointment Automation', 'Follow-Up Automation', 'CRM Automation', 'Workflow Automation'],
    idealAnswer: 'Velora designs practical automation around customer-facing work: answering routine enquiries, qualifying leads, coordinating appointments, following up, updating compatible systems, and handing exceptions to a person. The starting point is one measurable workflow—not AI for its own sake. The right first system depends on where enquiries or administrative work currently stall.',
  },
  {
    id: 'chatgpt-comparison', question: "Why shouldn't I just use ChatGPT?", intent: 'COMPARISON', industry: null,
    solutions: ['Workflow Automation', 'CRM Automation'],
    idealAnswer: 'ChatGPT can be useful for general conversation or drafting. A Velora implementation is different: it is designed around approved business knowledge, specific actions, compatible systems, restricted topics, failure handling, and a defined human handoff. The value is the controlled operating workflow—such as intake to CRM to scheduling—not access to a generic chat window.',
  },
  {
    id: 'hvac-missed-calls', question: 'Can you automate my HVAC company?', intent: 'INDUSTRY_USE_CASE', industry: 'Home Services',
    solutions: ['AI Receptionist', 'Appointment Automation', 'Lead Qualification', 'CRM Automation'],
    idealAnswer: 'Yes. For an HVAC company, a strong starting point is usually call handling, missed-call recovery, service intake, scheduling, and follow-up. The workflow can capture contact and service details, apply configured service-area and intake rules, offer an eligible appointment, update the CRM or job record, and hand unusual situations to your team. It would not diagnose equipment or make an independent life-safety decision.',
  },
  {
    id: 'home-service-after-hours', question: 'We miss plumbing calls after hours.', intent: 'INDUSTRY_USE_CASE', industry: 'Home Services',
    solutions: ['AI Receptionist', 'Lead Qualification', 'Appointment Automation'],
    idealAnswer: 'Instead of every after-hours call becoming voicemail, a configured receptionist workflow can capture the caller, service address, requested work, and urgency indicators; check your approved service-area and booking rules; and move eligible requests toward an appointment. Anything uncertain, outside policy, or safety-sensitive should route to the on-call person rather than being decided by the automation.',
  },
  {
    id: 'home-equipment-boundary', question: 'Can the AI diagnose an AC problem?', intent: 'REGULATED_ADVICE', industry: 'Home Services',
    solutions: [],
    idealAnswer: 'No. A Velora home-service workflow should not independently diagnose equipment or make a safety-critical decision. It can collect the customer’s description, location and contact details, apply approved intake and urgency rules, schedule an eligible visit, and route urgent or uncertain situations to qualified staff.',
  },
  {
    id: 'dental-front-desk', question: "Our dental front desk can't keep up.", intent: 'INDUSTRY_USE_CASE', industry: 'Dental',
    solutions: ['AI Receptionist', 'Appointment Automation', 'Follow-Up Automation'],
    idealAnswer: 'For a dental practice, Velora can reduce routine front-desk load by handling approved new-patient enquiries, capturing administrative intake details, coordinating eligible appointments, recovering missed calls, and supporting recall or rebooking workflows. Clinical questions, diagnosis, treatment advice, and exceptions remain with qualified practice staff.',
  },
  {
    id: 'dental-scheduling', question: 'Can the AI schedule dental appointments?', intent: 'INDUSTRY_USE_CASE', industry: 'Dental',
    solutions: ['Appointment Automation', 'AI Receptionist'],
    idealAnswer: 'Potentially, when the practice calendar and appointment rules provide compatible access. The workflow can identify the requested appointment type, collect approved administrative details, offer eligible times, confirm the booking, and route exceptions to staff. It should not interpret symptoms or recommend treatment.',
  },
  {
    id: 'law-intake', question: 'I need intake automation for my law firm.', intent: 'PURCHASE_INTENT', industry: 'Law Firms',
    solutions: ['AI Receptionist', 'Lead Qualification', 'Appointment Automation', 'CRM Automation'],
    idealAnswer: 'A practical law-firm workflow can answer the enquiry, collect approved intake fields, identify the broad matter category, create or update an intake record, schedule an eligible consultation, and route the prospect to the right team. It must stop before legal judgment: no case assessment, rights analysis, or strategy. I would start by mapping the current intake form, qualification rules, calendar, and handoff owner.',
  },
  {
    id: 'law-advice-boundary', question: 'Can your agent tell people whether they have a good case?', intent: 'REGULATED_ADVICE', industry: 'Law Firms',
    solutions: ['Lead Qualification', 'Appointment Automation'],
    idealAnswer: 'No. Velora law-firm workflows support administrative intake, not legal judgment. They can collect approved information, identify a broad matter category, schedule a consultation, create an intake record, and route the prospect. Whether someone has a strong case or what strategy to follow must remain with a qualified attorney.',
  },
  {
    id: 'pricing-framework', question: 'How much does this cost?', intent: 'PRICING', industry: null,
    solutions: [],
    idealAnswer: 'Foundation starts from $2,500 for one focused workflow; Growth starts from $5,000 for connected workflows; Custom engagements depend on confirmed requirements. The useful number depends on what is being automated—a missed-call and booking flow differs from a multi-location system connecting voice, CRM, scheduling, follow-up, and reporting. Telephony, model use, third-party software, some integrations, and recurring management may be separate.',
  },
  {
    id: 'crm-compatibility', question: 'Will this work with my CRM?', intent: 'INTEGRATION', industry: null,
    solutions: ['CRM Automation', 'Workflow Automation'],
    idealAnswer: 'Potentially. Velora first confirms what must move between the workflow and your CRM—such as contact details, enquiry type, appointment information, owner, status, or follow-up events. Compatibility depends on the CRM API or supported access, your account permissions, field mapping, rate limits, and failure handling. The platform name and required actions are the useful next details.',
  },
  {
    id: 'servicetitan-compatibility', question: 'Can you integrate with ServiceTitan?', intent: 'INTEGRATION', industry: 'Home Services',
    solutions: ['CRM Automation', 'Workflow Automation'],
    idealAnswer: 'Potentially, but the integration must be confirmed against the ServiceTitan access available to your account and the workflow you want. For a home-service process, Velora would map customer details, service requests, appointments, lead or job status, and follow-up events, then verify the supported API or access path, permissions, mapping, and failure behavior before promising the connection.',
  },
  {
    id: 'property-maintenance', question: 'Can you handle tenant maintenance requests?', intent: 'INDUSTRY_USE_CASE', industry: 'Property Management',
    solutions: ['AI Receptionist', 'Customer Support', 'Workflow Automation'],
    idealAnswer: 'Yes, for a defined administrative intake workflow. The assistant can collect the property or unit, issue category, tenant contact details, access notes, and approved urgency indicators; create or route the request in a compatible system; and notify the responsible team. It should not make independent safety, habitability, or legal decisions—urgent and uncertain cases follow your escalation rules.',
  },
  {
    id: 'real-estate-leads', question: 'My real-estate leads go cold before an agent responds.', intent: 'INDUSTRY_USE_CASE', industry: 'Real Estate',
    solutions: ['Lead Qualification', 'Follow-Up Automation', 'CRM Automation'],
    idealAnswer: 'This is primarily a Lead Qualification + Follow-Up Automation problem. A workflow can respond promptly, capture buyer or seller intent and approved qualification details, update the CRM, offer a showing or conversation when eligible, and keep a defined nurture sequence moving until an agent takes over. Lending, legal, appraisal, and investment judgments remain with qualified people.',
  },
  {
    id: 'accounting-documents', question: 'Can you chase client documents for my CPA firm?', intent: 'INDUSTRY_USE_CASE', industry: 'Accounting',
    solutions: ['Follow-Up Automation', 'Workflow Automation'],
    idealAnswer: 'Yes. A bounded document-collection workflow can identify which approved items are outstanding, send scheduled reminders through the selected channel, record responses, and route exceptions to the responsible staff member. It can support the administrative process, but it should not decide which tax position or accounting treatment is appropriate.',
  },
  {
    id: 'accounting-advice', question: 'Which tax deduction should I claim?', intent: 'REGULATED_ADVICE', industry: 'Accounting',
    solutions: [],
    idealAnswer: 'I cannot recommend a tax deduction or provide personalized tax advice. That judgment belongs with a qualified tax professional who understands your circumstances. Velora can support an accounting firm with administrative intake, document reminders, and consultation scheduling.',
  },
  {
    id: 'medical-admin', question: 'Can it help with new-patient calls at our clinic?', intent: 'INDUSTRY_USE_CASE', industry: 'Medical Practices',
    solutions: ['AI Receptionist', 'Appointment Automation', 'CRM Automation'],
    idealAnswer: 'It can support the administrative part of new-patient calls: answer approved practice questions, collect permitted intake details, coordinate eligible appointments, and route clinical or unusual requests to staff. It must not diagnose, recommend treatment, or decide what an emergency requires; the practice defines the urgent handoff path.',
  },
  {
    id: 'medical-emergency', question: 'I have chest pain. What should I do?', intent: 'REGULATED_ADVICE', industry: null,
    solutions: [],
    idealAnswer: 'Velora Assistant is not a medical guidance or emergency service. If this may be an emergency, contact your local emergency services now. For medical advice, speak with a qualified healthcare professional.',
  },
  {
    id: 'automotive-service', question: 'Can this book appointments for my repair shop?', intent: 'INDUSTRY_USE_CASE', industry: 'Automotive',
    solutions: ['AI Receptionist', 'Appointment Automation', 'CRM Automation'],
    idealAnswer: 'Potentially. A service-reception workflow can capture the customer, vehicle and requested service, apply your configured scheduling rules, offer an eligible appointment, and create or update the service record in a compatible system. Diagnosis—especially anything safety-critical—stays with qualified shop staff.',
  },
  {
    id: 'ecommerce-orders', question: 'Can it answer order-status questions for my Shopify store?', intent: 'INTEGRATION', industry: 'E-commerce',
    solutions: ['Customer Support', 'Workflow Automation'],
    idealAnswer: 'Potentially, if the store and order system provide suitable access for the requested action. The assistant can identify the customer under your approved rules, retrieve permitted order-status information, answer routine questions, and route refunds, exceptions, or account-sensitive issues. Shopify compatibility must be confirmed for the account permissions, data fields, and workflow involved.',
  },
  {
    id: 'implementation-process', question: 'How does implementation work?', intent: 'IMPLEMENTATION', industry: null,
    solutions: ['Workflow Automation'],
    idealAnswer: 'Velora starts by mapping one real process: enquiry sources, current systems, business rules, owners, and points where customers wait. Next it defines approved and restricted actions, integrations, and handoff conditions; builds and tests normal cases, missing information, failures, and exceptions; then launches in controlled scope and refines from observed outcomes before expanding.',
  },
  {
    id: 'security-controls', question: 'How do you handle security?', intent: 'SECURITY', industry: null,
    solutions: ['Workflow Automation'],
    idealAnswer: 'Security is defined around the actual workflow and vendors rather than a blanket claim. Velora reviews approved knowledge, least-necessary system access, authentication and permissions, retention or conversation logging choices, monitoring, restricted actions, error handling, and human escalation. Sensitive deployments may need additional privacy, vendor, and compliance review; certifications should never be assumed.',
  },
  {
    id: 'slow-lead-response', question: 'Our web leads wait hours for a response.', intent: 'AUTOMATION_IDEA', industry: null,
    solutions: ['Lead Qualification', 'Follow-Up Automation', 'CRM Automation'],
    idealAnswer: 'This sounds more like a Lead Qualification + Follow-Up + CRM Automation problem than customer support. A workflow can acknowledge the enquiry, collect approved qualification details, update the CRM, assign or route the lead, schedule an eligible next step, and trigger follow-up when a person has not taken over. The useful scoping details are lead source, CRM, qualification rules, and handoff owner.',
  },
  {
    id: 'guarantee-boundary', question: 'Does Velora guarantee more revenue?', intent: 'GENERAL_INFO', industry: null,
    solutions: [],
    idealAnswer: 'No. Velora does not guarantee revenue, bookings, or customer outcomes. A workflow can improve controllable operational steps—such as response time, intake consistency, follow-up coverage, and handoff—but results still depend on demand, offer quality, staffing, sales process, system access, and how the workflow is operated.',
  },
  {
    id: 'customer-claims', question: 'Who are your biggest customers?', intent: 'GENERAL_INFO', industry: null,
    solutions: [],
    idealAnswer: 'I do not have enough approved Velora information to name or rank customers. I can explain Velora’s published services, industries, implementation approach, pricing, and controls, or point you to a consultation if you want to assess a workflow for your business.',
  },
  {
    id: 'consultation-high-intent', question: 'I want this for my business. What do I do?', intent: 'CONSULTATION_INTENT', industry: null,
    solutions: ['Workflow Automation'],
    idealAnswer: 'Start with one process where enquiries or repetitive work currently stall. A Velora consultation will map the workflow, systems involved, approved actions, exceptions, and responsible people, then identify a practical first implementation. Use Request a Consultation; you do not need to share contact details in this chat.',
  },
] as const

function overlap<T>(left: readonly T[], right: readonly T[]) {
  return left.filter((item) => right.includes(item)).length
}

export function selectResponseExamples(intelligence: RequestIntelligence, limit = 2) {
  const stopTerms = new Set(['about', 'could', 'current', 'does', 'from', 'have', 'page', 'that', 'this', 'velora', 'what', 'when', 'where', 'which', 'with', 'would', 'your'])
  const terms = (value: string) => value.toLowerCase().match(/[a-z0-9]+/g)?.filter((term) => term.length >= 4 && !stopTerms.has(term)) ?? []
  const queryTerms = new Set(terms(intelligence.retrievalQuery))
  const ranked = RESPONSE_EXAMPLES
    .map((example, index) => ({
      example,
      index,
      solutionOverlap: overlap(example.solutions, intelligence.solutions),
      termOverlap: [...new Set(terms(example.question))]
        .filter((term) => queryTerms.has(term)).length,
      score:
        (example.intent === intelligence.intent ? 8 : 0)
        + (example.industry && example.industry === intelligence.industry ? 6 : 0)
        + overlap(example.solutions, intelligence.solutions) * 2
        + [...new Set(terms(example.question))]
          .filter((term) => queryTerms.has(term)).length * 2
        + (!example.industry && !intelligence.industry ? 1 : 0),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.index - b.index)
  const best = ranked[0]
  if (!best) return []
  return ranked
    .filter((item, index) => {
      if (index === 0) return true
      if (intelligence.industry) {
        return item.example.industry === intelligence.industry
          || (item.example.industry === null && item.solutionOverlap > 0)
      }
      return item.example.industry === null && (item.solutionOverlap > 0 || item.termOverlap >= 2)
    })
    .slice(0, Math.max(0, Math.min(3, limit)))
    .map((item) => item.example)
}

export function examplesPrompt(examples: readonly ResponseExample[]) {
  if (examples.length === 0) return ''
  return `Relevant style examples (copy the reasoning pattern, not unsupported facts or wording):\n${examples.map((example) => `Visitor: ${example.question}\nIdeal response pattern: ${example.idealAnswer}`).join('\n\n')}`
}
