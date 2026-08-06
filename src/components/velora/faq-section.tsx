'use client'

import { useState, useMemo } from 'react'
import { Search, X, ThumbsUp, ThumbsDown } from 'lucide-react'
import { Section, SectionHeading, FadeIn } from './section'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'What is an AI agent?',
    answer:
      'An AI agent is a software system that uses artificial intelligence to perform specific tasks autonomously. Unlike a simple chatbot, an AI agent can make decisions, follow multi-step workflows, connect with other software and escalate to humans when appropriate. Our agents are configured around your specific business processes.',
  },
  {
    question: 'Is this just a chatbot?',
    answer:
      "No. While chat is one interface our agents support, they also handle phone calls, SMS, email and internal workflows. Each agent follows a defined business process, connects with your existing tools and knows when to involve a human. A chatbot typically only responds to text on a website.",
  },
  {
    question: 'Can it answer phone calls?',
    answer:
      'It can, when the telephony provider, consent requirements, business rules and escalation path are confirmed. The system must identify itself appropriately and stay within the approved workflow.',
  },
  {
    question: 'Can it book appointments?',
    answer:
      'It can when the calendar exposes suitable API access. Availability, confirmations, rescheduling, reminders and human exceptions are tested against the actual scheduling rules before launch.',
  },
  {
    question: 'Can it connect with our CRM?',
    answer:
      'Integration availability depends on your CRM software, API access and security requirements. We work with common CRMs and can often connect through available APIs or middleware.',
  },
  {
    question: 'Can a human take over?',
    answer:
      'Human escalation is defined for every accepted deployment. The exact transfer method depends on the channel, staffing model and tools available to the client.',
  },
  {
    question: 'How long does implementation take?',
    answer:
      'Timelines depend on workflow scope, API access, data readiness, risk review and acceptance testing. The proposal includes a delivery plan only after those dependencies are confirmed.',
  },
  {
    question: 'How much does it cost?',
    answer:
      'Implementation starts at $2,500 USD for a limited workflow. Monthly management, model usage, telephony and third-party software are quoted separately based on scope and volume.',
  },
  {
    question: 'How is our data handled by model providers?',
    answer:
      'Provider data-use settings and contracts are reviewed for each deployment. We document which vendors receive data, their retention settings, whether training is disabled, and any remaining limitations before launch.',
  },
  {
    question: 'What happens when the agent does not know the answer?',
    answer:
      'The agent is configured with approved knowledge and clear escalation rules. When it encounters a question outside its scope, it acknowledges the limitation and either provides a general approved response or transfers the conversation to a human team member.',
  },
] as const

export function FaqSection() {
  const [search, setSearch] = useState('')
  const [votes, setVotes] = useState<Record<string, 'up' | 'down'>>({})
  const handleVote = (question: string, vote: 'up' | 'down') => {
    setVotes((prev) => ({ ...prev, [question]: vote }))
  }

  const filteredFaqs = useMemo(() => {
    if (!search.trim()) return faqs
    const term = search.toLowerCase()
    return faqs.filter((faq) => faq.question.toLowerCase().includes(term))
  }, [search])

  return (
    <Section id="faq" background="muted">
      <SectionHeading
        label="FAQ"
        title="Frequently Asked Questions"
        description="Clear answers to the questions we hear most from business owners considering AI automation."
      />

      <FadeIn className="max-w-3xl mx-auto">
        {/* Search input */}
        <div className="relative mb-5">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions..."
            className="h-11 w-full rounded-xl border border-velora-border/50 bg-white pl-10 pr-12 text-sm text-foreground shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-[border-color,box-shadow] duration-150 placeholder:text-muted-foreground/50 focus:border-velora-emerald/30 focus:outline-none focus:ring-2 focus:ring-velora-emerald/20 dark:border-border/50 dark:bg-card dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)]"
            aria-label="Search frequently asked questions"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="absolute right-1.5 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg bg-muted/70 text-muted-foreground transition-[background-color,color,transform] duration-150 hover:bg-muted hover:text-foreground active:scale-[0.97]"
              aria-label="Clear search"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        <Accordion type="single" collapsible className="space-y-2">
          {filteredFaqs.map((faq, index) => {
            const itemValue = `faq-${index + 1}`
            const vote = votes[faq.question]

            return (
              <AccordionItem
                key={faq.question}
                value={itemValue}
                className="overflow-hidden rounded-xl border border-velora-border/50 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.02)] transition-[border-color,box-shadow] duration-200 data-[state=open]:border-velora-emerald/20 data-[state=open]:bg-white data-[state=open]:shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:border-border/50 dark:bg-card dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)] dark:data-[state=open]:bg-card dark:data-[state=open]:shadow-[0_2px_12px_rgba(0,0,0,0.2)]"
              >
                <AccordionTrigger className="text-left text-[15px] font-medium text-foreground/80 hover:text-foreground hover:no-underline py-5 px-6 transition-colors duration-200 [&>svg]:text-foreground/60 [&>svg]:transition-transform [&>svg]:duration-300 data-[state=open]:[&>svg]:rotate-180 data-[state=open]:text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-foreground/70 leading-[1.75] px-6 pb-5">
                  <p>{faq.answer}</p>

                  {/* Helpful voting — only visible when expanded */}
                  <div className="mt-4 pt-3 border-t border-velora-border/30">
                    {vote ? (
                      <p className="text-xs text-muted-foreground">Thanks for your feedback</p>
                    ) : (
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">Was this helpful?</span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleVote(faq.question, 'up')}
                            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground hover:text-velora-emerald hover:bg-velora-emerald/5 transition-colors duration-150"
                            aria-label="Mark as helpful"
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                            <span>Helpful</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleVote(faq.question, 'down')}
                            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground hover:text-velora-amber hover:bg-velora-amber/5 transition-colors duration-150"
                            aria-label="Mark as not helpful"
                          >
                            <ThumbsDown className="w-3.5 h-3.5" />
                            <span>Not helpful</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>

        {filteredFaqs.length === 0 && search.trim() && (
          <p className="text-center text-sm text-muted-foreground py-8">
            No questions match your search. Try a different term.
          </p>
        )}
      </FadeIn>
    </Section>
  )
}
