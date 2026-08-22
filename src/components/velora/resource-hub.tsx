import Link from 'next/link'
import { ArrowRight, BotMessageSquare, Calculator, Cable, CircleDollarSign, ClipboardList, LockKeyhole, MessagesSquare, ScanSearch, type LucideIcon } from 'lucide-react'

type Resource = { label: string; href: string; description: string; icon: LucideIcon }

const groups: { title: string; description: string; resources: Resource[] }[] = [
  {
    title: 'Understand the Opportunity',
    description: 'Use these when you want to see what a responsible workflow looks like and estimate whether the operational problem is worth exploring.',
    resources: [
      { label: 'Guided Demo', href: '/resources/demo', description: 'Walk through a transparent scripted workflow.', icon: BotMessageSquare },
      { label: 'Example Workflows', href: '/resources/workflows', description: 'Explore carefully scoped illustrative use cases.', icon: MessagesSquare },
      { label: 'Opportunity Calculator', href: '/resources/calculator', description: 'Model a missed-inquiry opportunity using your inputs.', icon: Calculator },
    ],
  },
  {
    title: 'Evaluate Implementation',
    description: 'Use these to review whether your systems, permissions, data handling, and human controls can support a reliable deployment.',
    resources: [
      { label: 'Integrations', href: '/resources/integrations', description: 'See why delivery depends on verified system access.', icon: Cable },
      { label: 'Security & Control', href: '/resources/security', description: 'Review permissions, retention, failure handling, and human oversight.', icon: LockKeyhole },
    ],
  },
  {
    title: 'Make a Decision',
    description: 'Use these when you are ready to compare common questions, implementation ranges, and a practical starting recommendation.',
    resources: [
      { label: 'FAQ', href: '/resources/faq', description: 'Get direct answers about scope, cost, limitations, and delivery.', icon: ScanSearch },
      { label: 'Pricing', href: '/pricing', description: 'Review transparent implementation starting points and separate costs.', icon: CircleDollarSign },
      { label: 'Assessment', href: '/assessment', description: 'Identify a focused first workflow based on your current operation.', icon: ClipboardList },
    ],
  },
]

export function ResourceHub() {
  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl space-y-16 px-5 sm:px-8 lg:px-10">
        {groups.map((group) => (
          <div key={group.title}>
            <div className="max-w-3xl">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{group.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">{group.description}</p>
            </div>
            <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {group.resources.map(({ label, href, description, icon: Icon }) => (
                <Link key={href} href={href} className="group flex min-h-56 flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-[border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-velora-emerald/30 hover:shadow-lg active:scale-[0.99]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-velora-emerald/10 text-velora-emerald"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">{label}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
                  <span className="mt-auto inline-flex items-center pt-5 text-sm font-medium text-velora-emerald">Open resource <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5" aria-hidden="true" /></span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
