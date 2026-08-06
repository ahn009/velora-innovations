import { Header } from '@/components/velora/header'
import { Hero } from '@/components/velora/hero'
import { TrustBar } from '@/components/velora/trust-bar'
import { FeaturesOverview } from '@/components/velora/features-overview'
import { ProblemSection } from '@/components/velora/problem-section'
import { GradientDivider } from '@/components/velora/gradient-divider'
import { SolutionSection } from '@/components/velora/solution-section'
import { IndustrySection } from '@/components/velora/industry-section'
import { DemoSection } from '@/components/velora/demo-section'
import { HowItWorksSection } from '@/components/velora/how-it-works-section'
import { ResultsSection } from '@/components/velora/results-section'
import { IntegrationSection } from '@/components/velora/integration-section'
import { SecuritySection } from '@/components/velora/security-section'
import { RoiCalculator } from '@/components/velora/roi-calculator'
import { PricingSection } from '@/components/velora/pricing-section'
import { FaqSection } from '@/components/velora/faq-section'
import { FinalCtaSection } from '@/components/velora/final-cta-section'
import { Footer } from '@/components/velora/footer'
import { StickyMobileCta } from '@/components/velora/sticky-mobile-cta'
import { BackToTop } from '@/components/velora/back-to-top'
import { ConsultationProvider } from '@/components/velora/consultation-provider'

export default function Home() {
  return (
    <ConsultationProvider>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main id="main-content" className="flex-1">
          <Hero />
          <TrustBar />
          <FeaturesOverview />
          <ProblemSection />
          <GradientDivider className="py-2" />
          <SolutionSection />
          <IndustrySection />
          <DemoSection />
          <HowItWorksSection />
          <ResultsSection />
          <IntegrationSection />
          <SecuritySection />
          <RoiCalculator />
          <PricingSection />
          <FaqSection />
          <FinalCtaSection />
        </main>

        <Footer />

        <StickyMobileCta />
        <BackToTop />
      </div>
    </ConsultationProvider>
  )
}
