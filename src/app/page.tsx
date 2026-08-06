import { AnnouncementBar } from '@/components/velora/announcement-bar'
import { ScrollProgress } from '@/components/velora/scroll-progress'
import { Header } from '@/components/velora/header'
import { Hero } from '@/components/velora/hero'
import { TrustBar } from '@/components/velora/trust-bar'
import { TrustStats } from '@/components/velora/trust-stats'
import { LogoMarquee } from '@/components/velora/logo-marquee'
import { StatsSection } from '@/components/velora/stats-section'
import { FeaturesOverview } from '@/components/velora/features-overview'
import { ProblemSection } from '@/components/velora/problem-section'
import { GradientDivider } from '@/components/velora/gradient-divider'
import { SolutionSection } from '@/components/velora/solution-section'
import { IndustrySection } from '@/components/velora/industry-section'
import { DemoSection } from '@/components/velora/demo-section'
import { HowItWorksSection } from '@/components/velora/how-it-works-section'
import { ResultsSection } from '@/components/velora/results-section'
import { TestimonialsSection } from '@/components/velora/testimonials-section'
import { BlogSection } from '@/components/velora/blog-section'
import { IntegrationSection } from '@/components/velora/integration-section'
import { SecuritySection } from '@/components/velora/security-section'
import { RoiCalculator } from '@/components/velora/roi-calculator'
import { PricingSection } from '@/components/velora/pricing-section'
import { AssessmentSection } from '@/components/velora/assessment-section'
import { ComparisonSection } from '@/components/velora/comparison-section'
import { FaqSection } from '@/components/velora/faq-section'
import { FinalCtaSection } from '@/components/velora/final-cta-section'
import { Footer } from '@/components/velora/footer'
import { StickyMobileCta } from '@/components/velora/sticky-mobile-cta'
import { BackToTop } from '@/components/velora/back-to-top'
import { CookieConsent } from '@/components/velora/cookie-consent'
import { LiveChatWidget } from '@/components/velora/live-chat-widget'
import { SmartToasts } from '@/components/velora/smart-toasts'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <ScrollProgress />
      <Header />

      <main id="main-content" className="flex-1">
        <Hero />
        <TrustBar />
        {/* Trust Stats */}
        <TrustStats />
        <LogoMarquee />
        <StatsSection />
        <FeaturesOverview />
        <ProblemSection />
        <GradientDivider className="py-2" />
        <SolutionSection />
        <IndustrySection />
        <DemoSection />
        <HowItWorksSection />
        <ResultsSection />
        <GradientDivider className="py-2" />
        <TestimonialsSection />
        <BlogSection />
        <IntegrationSection />
        <SecuritySection />
        {/* ROI Calculator */}
        <RoiCalculator />
        <PricingSection />
        <AssessmentSection />
        <ComparisonSection />
        <FaqSection />
        <FinalCtaSection />
      </main>

      <Footer />

      <SmartToasts />

      <StickyMobileCta />
      <BackToTop />
      <CookieConsent />
      <LiveChatWidget />
    </div>
  )
}
