'use client'

import { useState, useMemo, useRef } from 'react'
import { Search, X, ThumbsUp, ThumbsDown } from 'lucide-react'
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent } from 'framer-motion'
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
      'Yes. Our AI receptionist can answer incoming calls, identify the reason for the call, collect relevant information and take action such as scheduling appointments or routing to the correct team member. It clearly identifies itself as an AI system.',
  },
  {
    question: 'Can it book appointments?',
    answer:
      'Yes. The appointment agent checks real-time availability, books appointments, sends confirmations, handles rescheduling requests and sends reminders. It connects with your existing calendar system.',
  },
  {
    question: 'Can it connect with our CRM?',
    answer:
      'Integration availability depends on your CRM software, API access and security requirements. We work with common CRMs and can often connect through available APIs or middleware.',
  },
  {
    question: 'Can a human take over?',
    answer:
      'Yes. Every system includes human escalation rules. The AI transfers conversations to the appropriate team member when it encounters a complex request, a restricted topic or when the customer asks to speak with someone.',
  },
  {
    question: 'How long does implementation take?',
    answer:
      'Implementation timelines vary based on the number of workflows, integration complexity and testing requirements. A single focused workflow can be deployed in a few weeks. Multi-agent systems with complex integrations take longer. We provide a timeline during the consultation.',
  },
  {
    question: 'How much does it cost?',
    answer:
      'Projects typically have a one-time implementation fee and an ongoing management component. The final investment depends on the number of workflows, channels, integrations, usage volume and security requirements. We discuss pricing during the consultation.',
  },
  {
    question: 'Is our data used to train public models?',
    answer:
      'No. Your business data, conversation logs and customer information are not used to train public AI models. Data handling, retention and access controls are defined during implementation.',
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
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const scaleX = useTransform(smoothProgress, [0, 1], [0, 1])

  const [scrolledCount, setScrolledCount] = useState(0)
  const totalFaqs = faqs.length

  useMotionValueEvent(smoothProgress, 'change', (latest) => {
    setScrolledCount(Math.min(Math.round(latest * totalFaqs), totalFaqs))
  })

  const handleVote = (index: number, vote: 'up' | 'down') => {
    setVotes((prev) => ({ ...prev, [index]: vote }))
  }

  const filteredFaqs = useMemo(() => {
    if (!search.trim()) return faqs
    const term = search.toLowerCase()
    return faqs.filter((faq) => faq.question.toLowerCase().includes(term))
  }, [search])

  return (
    <Section id="faq" background="muted">
      <div ref={sectionRef}>
        {/* Scroll progress bar — sits at the top of the section */}
        <div className="sticky top-0 z-10 h-[3px] w-full bg-velora-border/20 dark:bg-border/20">
          <div className="relative h-full">
            <motion.div
              className="h-full bg-velora-emerald origin-left"
              style={{ scaleX }}
            />
            {scrolledCount > 0 && (
              <span className="absolute right-0 -top-5 text-[11px] text-muted-foreground/60 tabular-nums">
                {scrolledCount} of {totalFaqs}
              </span>
            )}
          </div>
        </div>

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
            className="w-full h-11 pl-10 pr-10 rounded-xl border border-velora-border/50 dark:border-border/50 bg-white dark:bg-card text-sm text-foreground placeholder:text-muted-foreground/50 shadow-[0_1px_3px_rgba(0,0,0,0.02)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)] focus:outline-none focus:ring-2 focus:ring-velora-emerald/20 focus:border-velora-emerald/30 transition-all duration-200"
            aria-label="Search frequently asked questions"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-muted/80 hover:bg-muted flex items-center justify-center text-muted-foreground/60 hover:text-foreground transition-colors duration-150"
              aria-label="Clear search"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        <Accordion type="single" collapsible className="space-y-2">
          {filteredFaqs.map((faq, index) => {
            const itemValue = `faq-${index + 1}`
            const vote = votes[index]

            return (
              <AccordionItem
                key={index}
                value={itemValue}
                className="bg-white dark:bg-card rounded-xl border border-velora-border/50 dark:border-border/50 shadow-[0_1px_3px_rgba(0,0,0,0.02)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)] data-[state=open]:border-velora-emerald/20 data-[state=open]:shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:data-[state=open]:shadow-[0_2px_12px_rgba(0,0,0,0.2)] data-[state=open]:bg-white dark:data-[state=open]:bg-card transition-all duration-300 overflow-hidden"
              >
                <AccordionTrigger className="text-left text-[15px] font-medium text-foreground/80 hover:text-foreground hover:no-underline py-5 px-6 transition-colors duration-200 [&>svg]:text-foreground/25 [&>svg]:transition-transform [&>svg]:duration-300 data-[state=open]:[&>svg]:rotate-180 data-[state=open]:text-foreground">
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
                            onClick={() => handleVote(index, 'up')}
                            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-muted-foreground hover:text-velora-emerald hover:bg-velora-emerald/5 transition-colors duration-150"
                            aria-label="Mark as helpful"
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                            <span>Helpful</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleVote(index, 'down')}
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
      </div>
    </Section>
  )
}
