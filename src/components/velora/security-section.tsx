'use client'

import Image from 'next/image'
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
import { motion } from 'framer-motion'

const features: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: 'Approved Knowledge',
    description: 'Agents use only approved information sources.',
    icon: Shield,
  },
  {
    title: 'Restricted Topics',
    description: 'Clear boundaries prevent unauthorized responses.',
    icon: AlertTriangle,
  },
  {
    title: 'Human Escalation',
    description: 'Seamless transfer to team members when needed.',
    icon: UserCog,
  },
  {
    title: 'Access Controls',
    description: 'Role-based permissions for every user.',
    icon: Key,
  },
  {
    title: 'Conversation Logs',
    description: 'Full audit trail of every interaction.',
    icon: FileText,
  },
  {
    title: 'Monitoring',
    description: 'Real-time oversight of agent performance.',
    icon: Eye,
  },
  {
    title: 'Data Retention',
    description: 'Configurable retention and deletion policies.',
    icon: Server,
  },
  {
    title: 'Continuous Updates',
    description: 'Regular prompt and knowledge improvements.',
    icon: RefreshCw,
  },
]

export function SecuritySection() {
  return (
    <Section id="security" background="navy">
      <SectionHeading
        label="Security & Control"
        title="Automation With Clear Boundaries and Human Control"
        description="Every system is designed with defined permissions, monitoring and escalation rules. You decide what the AI can and cannot do."
        light
        className="mb-8"
      />

      <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-center relative z-10">
        {/* Left — feature grid */}
        <div className="lg:col-span-3">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            {features.map(({ title, description, icon: Icon }, index) => (
              <StaggerItem key={title}>
                <div className="flex items-start gap-3 p-4 rounded-lg group hover:bg-white/[0.07] transition-colors duration-300 cursor-default">
                  <motion.div
                    className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'easeInOut',
                      delay: index * 0.5,
                    }}
                  >
                    <Icon className="w-4 h-4 text-velora-emerald-light" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-medium text-white">{title}</p>
                    <p className="text-xs text-white/50 mt-0.5 leading-relaxed">
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
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/30 backdrop-blur-sm">
                <Image
                  src="/images/security-visual.png"
                  alt="Security and compliance visualization — illustrating data protection, access controls, and monitoring capabilities"
                  width={1024}
                  height={1024}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </Section>
  )
}
