import type { VeloraIndustry, VeloraSolution } from './velora-knowledge'

export type IndustryIntelligence = {
  route: string
  aliases: readonly string[]
  commonProblems: readonly string[]
  implementations: readonly string[]
  solutions: readonly VeloraSolution[]
  boundaries: readonly string[]
}

export const INDUSTRY_INTELLIGENCE: Record<VeloraIndustry, IndustryIntelligence> = {
  'Home Services': {
    route: '/industries/home-services',
    aliases: ['home service', 'hvac', 'plumber', 'plumbing', 'roofer', 'roofing', 'electrician', 'electrical contractor', 'heating', 'air conditioning'],
    commonProblems: ['missed calls', 'after-hours enquiries', 'service-area qualification', 'scheduling', 'dispatch routing', 'estimate follow-up'],
    implementations: ['Service Call Receptionist', 'Missed Call Recovery', 'Appointment & Technician Scheduling', 'Estimate Follow-Up', 'Emergency Triage & Dispatch Assistant'],
    solutions: ['AI Receptionist', 'Lead Qualification', 'Appointment Automation', 'Follow-Up Automation', 'CRM Automation'],
    boundaries: ['No equipment diagnosis.', 'No independent life-safety decision; uncertain or urgent situations go to a responsible person.'],
  },
  Dental: {
    route: '/industries/dental',
    aliases: ['dentist', 'dental', 'orthodontist', 'dental clinic', 'dental practice'],
    commonProblems: ['front-desk call volume', 'new-patient enquiries', 'appointment management', 'recalls', 'missed calls'],
    implementations: ['Dental Front Desk Agent', 'Appointment Agent', 'New Patient Intake', 'Recall & Rebooking', 'Missed Call Recovery'],
    solutions: ['AI Receptionist', 'Appointment Automation', 'Lead Qualification', 'Follow-Up Automation', 'CRM Automation'],
    boundaries: ['No diagnosis.', 'No treatment recommendation; clinical questions go to qualified practice staff.'],
  },
  'Law Firms': {
    route: '/industries/law-firms',
    aliases: ['law firm', 'law office', 'lawyer', 'attorney', 'legal practice'],
    commonProblems: ['intake volume', 'missed calls', 'consultation scheduling', 'document reminders', 'repetitive administrative questions'],
    implementations: ['Legal Intake Agent', 'Consultation Scheduling', 'Missed Call Intake Recovery', 'Document Collection Reminder', 'Administrative Client Support'],
    solutions: ['AI Receptionist', 'Lead Qualification', 'Appointment Automation', 'Follow-Up Automation', 'CRM Automation'],
    boundaries: ['No legal advice.', 'No case strategy, case assessment, interpretation of law, or legal judgment.'],
  },
  'Real Estate': {
    route: '/industries/real-estate',
    aliases: ['real estate', 'realtor', 'broker', 'brokerage', 'buyer lead', 'seller lead', 'property sale'],
    commonProblems: ['buyer and seller qualification', 'showing requests', 'delayed lead response', 'inactive leads'],
    implementations: ['Buyer Lead Qualification', 'Seller Intake', 'Property Enquiry', 'Lead Nurture', 'Showing Scheduler'],
    solutions: ['Lead Qualification', 'Appointment Automation', 'Follow-Up Automation', 'CRM Automation'],
    boundaries: ['No independent legal, lending, appraisal, or investment judgment.'],
  },
  'Property Management': {
    route: '/industries/property-management',
    aliases: ['property management', 'property manager', 'tenant', 'lease', 'leasing', 'maintenance request', 'rental property'],
    commonProblems: ['maintenance intake', 'leasing enquiries', 'tenant FAQs', 'showing scheduling', 'application follow-up'],
    implementations: ['Leasing Enquiry', 'Maintenance Intake', 'Showing Scheduler', 'Tenant FAQ', 'Application Follow-Up'],
    solutions: ['AI Receptionist', 'Customer Support', 'Appointment Automation', 'Follow-Up Automation', 'Workflow Automation'],
    boundaries: ['Urgent safety, habitability, legal, or policy exceptions go to responsible staff.'],
  },
  Accounting: {
    route: '/industries/accounting',
    aliases: ['accounting', 'accountant', 'cpa', 'bookkeeper', 'bookkeeping', 'tax firm'],
    commonProblems: ['new-client enquiries', 'appointment scheduling', 'document collection', 'administrative questions', 'prospect follow-up'],
    implementations: ['New Client Intake', 'Consultation Scheduling', 'Document Collection Reminder', 'Administrative Client Support', 'Prospect Follow-Up'],
    solutions: ['Lead Qualification', 'Appointment Automation', 'Follow-Up Automation', 'CRM Automation'],
    boundaries: ['No personalized tax or financial advice.', 'No professional accounting judgment.'],
  },
  'Medical Practices': {
    route: '/industries/medical-practices',
    aliases: ['medical practice', 'medical clinic', 'clinic', "doctor's office", 'doctors office', 'physician office'],
    commonProblems: ['front-desk volume', 'scheduling', 'new-patient administrative intake', 'missed calls'],
    implementations: ['Medical Front Desk', 'Appointment Coordination', 'New Patient Administrative Intake', 'Missed Call Recovery'],
    solutions: ['AI Receptionist', 'Appointment Automation', 'Lead Qualification', 'CRM Automation'],
    boundaries: ['No diagnosis or treatment recommendation.', 'No emergency medical decision-making; urgent requests must follow the practice emergency path.'],
  },
  Automotive: {
    route: '/industries/automotive',
    aliases: ['automotive', 'auto repair', 'repair shop', 'dealership', 'car dealer', 'service department'],
    commonProblems: ['service scheduling', 'missed calls', 'service enquiries', 'follow-up', 'sales lead qualification'],
    implementations: ['Service Receptionist', 'Appointment Scheduling', 'Missed Call Recovery', 'Service Follow-Up', 'Sales Lead Qualification'],
    solutions: ['AI Receptionist', 'Appointment Automation', 'Lead Qualification', 'Follow-Up Automation', 'CRM Automation'],
    boundaries: ['No safety-critical repair diagnosis.'],
  },
  'E-commerce': {
    route: '/industries/ecommerce',
    aliases: ['e-commerce', 'ecommerce', 'online store', 'shopify', 'orders', 'abandoned cart', 'abandoned carts'],
    commonProblems: ['order questions', 'product questions', 'order status', 'returns', 'abandoned carts', 'support routing'],
    implementations: ['Customer Support', 'Order Status', 'Product Discovery', 'Cart Recovery', 'Returns Assistant'],
    solutions: ['Customer Support', 'Follow-Up Automation', 'CRM Automation', 'Workflow Automation'],
    boundaries: ['Refunds, exceptions, and account-sensitive actions follow approved store rules and human escalation.'],
  },
}

export const INDUSTRY_ROUTES = Object.fromEntries(
  Object.entries(INDUSTRY_INTELLIGENCE).map(([industry, profile]) => [industry, profile.route]),
) as Record<VeloraIndustry, string>
