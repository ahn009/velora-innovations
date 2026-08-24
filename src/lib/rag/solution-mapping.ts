import type { VeloraSolution } from './velora-knowledge'

export type OperationalProblem =
  | 'missed calls'
  | 'slow lead response'
  | 'scheduling overload'
  | 'repetitive customer questions'
  | 'leads not followed up'
  | 'disconnected systems'
  | 'intake overload'
  | 'document reminders'

export const PROBLEM_SOLUTION_MAP: Record<OperationalProblem, readonly VeloraSolution[]> = {
  'missed calls': ['AI Receptionist', 'Lead Qualification', 'Appointment Automation'],
  'slow lead response': ['Lead Qualification', 'Follow-Up Automation', 'CRM Automation'],
  'scheduling overload': ['Appointment Automation', 'AI Receptionist'],
  'repetitive customer questions': ['Customer Support', 'AI Receptionist'],
  'leads not followed up': ['Follow-Up Automation', 'CRM Automation'],
  'disconnected systems': ['CRM Automation', 'Workflow Automation'],
  'intake overload': ['AI Receptionist', 'Lead Qualification', 'CRM Automation'],
  'document reminders': ['Follow-Up Automation', 'Workflow Automation'],
}

export const PROBLEM_PATTERNS: Array<[OperationalProblem, RegExp]> = [
  ['missed calls', /\b(miss(?:ed|ing)? calls?|after[- ]hours|voicemail|unanswered calls?)\b/i],
  ['slow lead response', /\b(slow (?:lead )?response|respond(?:ing)? too (?:slow|late)|new leads? wait|speed[- ]to[- ]lead)\b/i],
  ['scheduling overload', /\b(schedul(?:e|ing)|book(?:ing| appointments?)|calendar|front desk.*appointment|appointment.*overload)\b/i],
  ['repetitive customer questions', /\b(repetitive|routine|common|frequent) (?:customer )?(?:questions?|enquiries|inquiries)|\bfaq\b/i],
  ['leads not followed up', /\b(no|not|never|poor|slow|manual) follow[- ]?up|\bfollow(?:ed|ing)?[- ]?up\b|\brecall(?:s|ing)?\b|abandoned cart|go(?:es)? cold/i],
  ['disconnected systems', /\b(disconnected|connect|sync|integrat|crm|webhook|api|systems? (?:do not|don't) talk)\b/i],
  ['intake overload', /\b(intake|qualif(?:y|ication)|screen(?:ing)? leads?|front desk.*(?:busy|keep up)|call volume)\b/i],
  ['document reminders', /\b(document|paperwork|form) (?:collection|reminder|follow[- ]?up)|remind.*document/i],
]
