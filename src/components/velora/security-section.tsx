'use client'

import {
  Section,
  SectionHeading,
  StaggerContainer,
  StaggerItem,
  FadeIn,
} from './section'
import {
  Shield,
  Eye,
  UserCog,
  FileText,
  Server,
  AlertTriangle,
  Key,
  RefreshCw,
  type LucideIcon,
} from 'lucide-react'
import { SecurityControlVisual } from './workflow-visuals'

const features: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Approved Knowledge',
    description: 'Approved information sources are documented for the workflow.',
    icon: Shield,
  },
  {
    title: 'Restricted Topics',
    description: 'Boundaries limit unsupported or unauthorized responses.',
    icon: AlertTriangle,
  },
  {
    title: 'Human Escalation',
    description: 'An agreed transfer path routes exceptions to a person.',
    icon: UserCog,
  },
  {
    title: 'Access Controls',
    description: 'Available roles and permissions are mapped to the workflow.',
    icon: Key,
  },
  {
    title: 'Conversation Logs',
    description: 'Logging scope depends on the selected channels and vendors.',
    icon: FileText,
  },
  {
    title: 'Monitoring',
    description: 'Operational review signals are agreed before launch.',
    icon: Eye,
  },
  {
    title: 'Data Retention',
    description: 'Retention and deletion settings are documented where supported.',
    icon: Server,
  },
  {
    title: 'Continuous Updates',
    description: 'Prompt and knowledge changes follow an agreed review process.',
    icon: RefreshCw,
  },
]

export function SecuritySection() {
  return (
    <Section id="security" background="navy">
      <SectionHeading
        label="Security & Control"
        title="Controls Defined for Each Deployment"
        description="The proposal documents approved knowledge, permissions, monitoring, retention and escalation before a production system is launched."
        light
        className="mb-8"
      />

      <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-center relative z-10">
        {/* Left — feature grid */}
        <div className="lg:col-span-3">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {features.map(({ title, description, icon: Icon }) => (
              <StaggerItem key={title}>
                <div className="flex items-start gap-3 rounded-lg p-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10"
                  >
                    <Icon className="w-4 h-4 text-velora-emerald-light" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{title}</p>
                    <p className="text-xs text-white/75 mt-0.5 leading-relaxed">
                      {description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Right — decorative security visual (desktop) */}
        <div className="hidden lg:block lg:col-span-2">
          <FadeIn delay={0.3}>
            <div className="relative">
              {/* Glow behind image */}
              <div
                className="absolute -inset-6 rounded-3xl opacity-50"
                style={{
                  background: 'linear-gradient(135deg, oklch(0.627 0.194 149.21 / 0.12), oklch(0.627 0.194 149.21 / 0.03))',
                  filter: 'blur(40px)',
                }}
              />
              <SecurityControlVisual />
            </div>
          </FadeIn>
        </div>
      </div>
    </Section>
  )
}
