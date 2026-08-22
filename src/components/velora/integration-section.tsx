'use client'

import {
  Section,
  SectionHeading,
  StaggerContainer,
  StaggerItem,
  FadeIn,
} from './section'
import {
  Phone,
  MessageCircle,
  Smartphone,
  Mail,
  Database,
  Calendar,
  Headphones,
  CreditCard,
  Table2,
  FolderKanban,
  Globe,
  Lock,
  type LucideIcon,
} from 'lucide-react'
import { IntegrationWorkflowVisual } from './workflow-visuals'

const integrations: { label: string; icon: LucideIcon }[] = [
  { label: 'Phone', icon: Phone },
  { label: 'Web Chat', icon: MessageCircle },
  { label: 'SMS', icon: Smartphone },
  { label: 'Email', icon: Mail },
  { label: 'CRM', icon: Database },
  { label: 'Calendar', icon: Calendar },
  { label: 'Help Desk', icon: Headphones },
  { label: 'Payments', icon: CreditCard },
  { label: 'Spreadsheets', icon: Table2 },
  { label: 'Project Management', icon: FolderKanban },
  { label: 'Website Forms', icon: Globe },
  { label: 'Security', icon: Lock },
]

export function IntegrationSection() {
  return (
    <Section id="integrations" className="relative overflow-hidden">
      {/* Subtle diagonal stripe texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, transparent, transparent 20px, oklch(0.627 0.194 149.21 / 0.02) 20px, oklch(0.627 0.194 149.21 / 0.02) 21px)',
        }}
      />
      {/* Subtle background accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-velora-emerald blur-[140px] opacity-[0.03]"
      />

      <SectionHeading
        label="Integrations"
        title="Designed to Work With Your Existing Systems"
        description="Connect phone, website, email, SMS, calendar, CRM and internal workflows. Integration availability depends on your software, API access and security requirements."
      />

      <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-center relative z-10">
        {/* Left — integration grid */}
        <div className="lg:col-span-3">
          <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {integrations.map(({ label, icon: Icon }) => (
              <StaggerItem key={label}>
                <div className="relative flex flex-col items-center gap-3 rounded-xl border border-velora-border/40 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.03)] sm:p-6 dark:border-border/40 dark:bg-card dark:shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-velora-emerald/10 text-velora-emerald">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-center text-xs font-medium text-muted-foreground">
                    {label}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Right — integration visual (desktop) */}
        <div className="lg:col-span-2">
          <FadeIn delay={0.3}>
            <div className="relative rounded-2xl overflow-hidden border border-velora-border/30 dark:border-border/30 shadow-lg shadow-black/[0.06] dark:shadow-black/[0.25] bg-white/60 dark:bg-card/60 backdrop-blur-sm">
              <IntegrationWorkflowVisual />
            </div>
          </FadeIn>
        </div>
      </div>

    </Section>
  )
}
