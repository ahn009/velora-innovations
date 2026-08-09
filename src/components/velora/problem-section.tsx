import { Clock3, MessageCircleQuestion, PhoneMissed, RefreshCcw, Unplug, UsersRound } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Section, SectionHeading } from './section'

export type Problem = { title: string; description: string; icon: LucideIcon }

export const problems: Problem[] = [
  { title: 'Missed Calls', description: 'Customers reach voicemail when the team is busy, after hours, or already helping someone else.', icon: PhoneMissed },
  { title: 'Slow Lead Response', description: 'A promising enquiry waits for a reply while the customer compares options or moves on.', icon: Clock3 },
  { title: 'Repetitive Questions', description: 'Your team spends the same hours explaining services, availability, pricing, and next steps.', icon: MessageCircleQuestion },
  { title: 'Inconsistent Follow-Up', description: 'Good opportunities fade because follow-up depends on memory, inboxes, and spare capacity.', icon: RefreshCcw },
  { title: 'Disconnected Systems', description: 'Details are copied between forms, calendars, spreadsheets, and CRMs instead of moving with the customer.', icon: Unplug },
  { title: 'Limited Team Capacity', description: 'Routine coordination takes time away from the conversations and decisions that need your people.', icon: UsersRound },
]

export function ProblemCard({ problem }: { problem: Problem }) {
  const Icon = problem.icon
  return (
    <article className="group flex h-full flex-col rounded-[var(--radius-lg)] border border-border-subtle bg-surface-primary p-6 shadow-[var(--shadow-soft)] transition-[border-color,box-shadow,transform] duration-[var(--motion-normal)] hover:-translate-y-0.5 hover:border-brand-primary/25 hover:shadow-[var(--shadow-card)]">
      <span className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-brand-primary/[0.09] text-brand-primary transition-colors duration-[var(--motion-fast)] group-hover:bg-brand-primary group-hover:text-brand-primary-foreground">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-base font-semibold tracking-[-0.015em] text-text-primary">{problem.title}</h3>
      <p className="mt-2 text-sm leading-6 text-text-secondary">{problem.description}</p>
    </article>
  )
}

export function ProblemSection() {
  return (
    <Section id="problems" background="muted">
      <SectionHeading label="Common bottlenecks" title="Where Is Your Business Losing Time and Opportunities?" description="The best place to start is usually a repeatable customer or coordination problem your team already understands." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {problems.map((problem) => <ProblemCard key={problem.title} problem={problem} />)}
      </div>
    </Section>
  )
}
