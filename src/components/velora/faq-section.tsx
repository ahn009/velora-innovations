'use client'

import { Section, SectionHeading } from './section'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export const defaultFaqs = [
  ['What exactly is an AI agent?', 'An AI agent is a software system configured to handle a defined business task. It can understand a request, follow approved rules, collect information, trigger permitted actions, and escalate when a person should take over.'],
  ['Is this just a chatbot?', 'No. A chatbot is usually a conversation interface. An agent can sit behind voice, chat, SMS, or email and connect a conversation to approved workflow actions such as qualification, scheduling, notifications, or CRM updates.'],
  ['Can an AI agent answer phone calls?', 'It can when the chosen telephony provider, consent requirements, business rules, and escalation path support the use case. The agent should identify itself appropriately and remain within its approved scope.'],
  ['Can it book appointments?', 'It can when the calendar provides suitable access. Availability, confirmations, rescheduling, reminders, and human exceptions are tested against the actual scheduling rules before launch.'],
  ['Can it connect to our CRM?', 'That depends on the CRM, API access, authentication, data mappings, and security requirements. We review the available integration path before committing to a specific workflow.'],
  ['What happens when the AI does not know the answer?', 'The agent uses approved knowledge and clear boundaries. If it is uncertain or outside scope, it can acknowledge the limitation, pause the action, and route the conversation to a human with the relevant context.'],
  ['Can a human take over a conversation?', 'Yes, where the workflow is designed for handoff. The transfer method depends on the channel, staffing model, and tools available to the client.'],
  ['How long does implementation take?', 'Timing depends on workflow complexity, integrations, access, data readiness, testing, and review requirements. A delivery plan is confirmed after those dependencies are understood.'],
  ['How much does it cost?', 'Implementation starts at $2,500 USD for a limited workflow. Monthly management, model usage, telephony, and third-party software are quoted separately based on scope and volume.'],
  ['Can the AI make mistakes?', 'Yes. AI is not perfect. Testing, approved knowledge, restricted actions, monitoring, confidence boundaries, and human escalation reduce risk, but every deployment should have an owner and a safe fallback.'],
  ['Is our business data safe?', 'Data handling is reviewed workflow by workflow, including permissions, vendors, retention settings, access, and any additional security or compliance requirements. We do not make unsupported certification claims.'],
  ['Does AI replace our employees?', 'The usual goal is to automate repetitive work and support the team, not blindly remove human roles. People remain responsible for judgment, sensitive situations, exceptions, and the customer relationships that require context.'],
  ['Can you support multiple locations?', 'A multi-location architecture can be appropriate when each location has defined routing, availability, permissions, and ownership. The design depends on the systems and operating model.'],
  ['Do you guarantee more sales?', 'No. We do not guarantee revenue outcomes. Automation may improve response consistency, qualification, follow-up, and operational capacity, while results still depend on demand, offer, team execution, and other business factors.'],
] as const

type FaqItem = readonly [string, string] | { question: string; answer: string }

export function FaqSection({ items = defaultFaqs }: { items?: readonly FaqItem[] }) {
  return <Section id="faq" background="muted"><div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16"><div className="lg:sticky lg:top-28 lg:self-start"><SectionHeading align="left" label="FAQ" title="Questions business owners usually ask" description="Direct answers about scope, cost, delivery, data, and the limits of AI automation." /><p className="text-sm leading-6 text-text-muted">Still evaluating fit? A consultation can focus on one real workflow and the systems your team already uses.</p></div><Accordion type="single" collapsible className="space-y-2">{items.map((item, index) => { const question = 'question' in item ? item.question : item[0]; const answer = 'answer' in item ? item.answer : item[1]; return <AccordionItem key={question} value={`faq-${index}`} className="rounded-[var(--radius-md)] border border-border-subtle bg-surface-primary px-4 shadow-soft data-[state=open]:border-brand-primary/30 sm:px-5"><AccordionTrigger className="min-h-14 text-left text-sm font-semibold text-text-primary hover:no-underline [&>svg]:text-text-muted">{question}</AccordionTrigger><AccordionContent className="pb-5 text-sm leading-6 text-text-secondary">{answer}</AccordionContent></AccordionItem> })}</Accordion></div></Section>
}
