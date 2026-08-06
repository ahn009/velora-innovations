import { BackToTop } from '@/components/velora/back-to-top'
import { FinalCtaSection } from '@/components/velora/final-cta-section'
import {
  HomeDemoPreview,
  HomeIndustriesPreview,
  HomePricingPreview,
  HomeProcessPreview,
  HomeSolutionsPreview,
} from '@/components/velora/home-previews'
import { Hero } from '@/components/velora/hero'
import { StickyMobileCta } from '@/components/velora/sticky-mobile-cta'

export default function Home() {
  return (
    <>
      <main id="main-content">
        <Hero />
        <HomeSolutionsPreview />
        <HomeIndustriesPreview />
        <HomeDemoPreview />
        <HomeProcessPreview />
        <HomePricingPreview />
        <FinalCtaSection />
      </main>
      <StickyMobileCta />
      <BackToTop />
    </>
  )
}
