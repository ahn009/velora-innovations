import { BackToTop } from '@/components/velora/back-to-top'
import { FinalCtaSection } from '@/components/velora/final-cta-section'
import { PricingSection } from '@/components/velora/pricing-section'
import { FaqSection } from '@/components/velora/faq-section'
import { Hero } from '@/components/velora/hero'
import { ProblemSection } from '@/components/velora/problem-section'
import { SolutionSection } from '@/components/velora/solution-section'
import { InteractiveWorkflowSection } from '@/components/velora/interactive-workflow-section'
import { IndustrySection } from '@/components/velora/industry-section'
import { DemoSection } from '@/components/velora/demo-section'
import { HowItWorksSection } from '@/components/velora/how-it-works-section'
import { ResultsSection } from '@/components/velora/results-section'
import { SecuritySection } from '@/components/velora/security-section'
import { StickyMobileCta } from '@/components/velora/sticky-mobile-cta'

export default function Home() {
  return (
    <>
      <main id="main-content">
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <InteractiveWorkflowSection />
        <IndustrySection />
        <DemoSection />
        <HowItWorksSection />
        <ResultsSection />
        <SecuritySection />
        <PricingSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <StickyMobileCta />
      <BackToTop />
    </>
  )
}
