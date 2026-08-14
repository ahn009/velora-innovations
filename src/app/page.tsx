import { BackToTop } from '@/components/velora/back-to-top'
import { FinalCtaSection } from '@/components/velora/final-cta-section'
import { PricingTeaser } from '@/components/velora/pricing-section'
import { Hero } from '@/components/velora/hero'
import { ProblemSection } from '@/components/velora/problem-section'
import { SolutionSection } from '@/components/velora/solution-section'
import { IndustrySection } from '@/components/velora/industry-section'
import { DemoSection } from '@/components/velora/demo-section'
import { HowItWorksSection } from '@/components/velora/how-it-works-section'
import { ResultsSection } from '@/components/velora/results-section'
import { SecuritySection } from '@/components/velora/security-section'
import { StickyMobileCta } from '@/components/velora/sticky-mobile-cta'
import { TrustBar } from '@/components/velora/trust-bar'

export default function Home() {
  return (
    <>
      <main id="main-content">
        <Hero />
        <TrustBar />
        <ProblemSection />
        <SolutionSection />
        <IndustrySection />
        <DemoSection />
        <HowItWorksSection compact />
        <ResultsSection compact />
        <SecuritySection compact />
        <PricingTeaser />
        <FinalCtaSection />
      </main>
      <StickyMobileCta />
      <BackToTop />
    </>
  )
}
