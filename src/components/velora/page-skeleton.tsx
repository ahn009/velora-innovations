'use client'

/**
 * PageSkeleton — full-page loading skeleton that mimics the Velora page layout.
 * Used as Suspense fallback for lazy-loaded below-fold sections.
 */
export function PageSkeleton() {
  return (
    <div className="min-h-screen flex flex-col" aria-hidden="true">
      {/* Announcement bar skeleton */}
      <div className="skeleton-shimmer h-10 w-full" />

      {/* Header skeleton */}
      <div className="skeleton-shimmer h-16 w-full" />

      <main className="flex-1">
        {/* Hero skeleton: two-column layout */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: text content */}
            <div className="space-y-6">
              {/* Eyebrow line */}
              <div className="skeleton-shimmer h-4 w-32 rounded-full" />
              {/* H1 placeholder: 3 lines of varying width */}
              <div className="space-y-3">
                <div className="skeleton-shimmer h-10 w-full rounded-lg" />
                <div className="skeleton-shimmer h-10 w-4/5 rounded-lg" />
                <div className="skeleton-shimmer h-10 w-3/5 rounded-lg" />
              </div>
              {/* Supporting text line */}
              <div className="space-y-2">
                <div className="skeleton-shimmer h-4 w-full rounded" />
                <div className="skeleton-shimmer h-4 w-full rounded" />
                <div className="skeleton-shimmer h-4 w-2/3 rounded" />
              </div>
              {/* Two button shapes */}
              <div className="flex gap-4 pt-2">
                <div className="skeleton-shimmer h-12 w-40 rounded-xl" />
                <div className="skeleton-shimmer h-12 w-40 rounded-xl" />
              </div>
            </div>

            {/* Right: dashboard image placeholder */}
            <div className="skeleton-shimmer aspect-[4/3] w-full rounded-2xl" />
          </div>
        </section>

        {/* Trust bar skeleton */}
        <section className="container mx-auto px-4 py-8">
          <div className="skeleton-shimmer h-6 w-48 mx-auto rounded mb-8" />
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton-shimmer h-10 rounded-lg" />
            ))}
          </div>
        </section>

        {/* Logo marquee skeleton */}
        <section className="py-10 overflow-hidden">
          <div className="skeleton-shimmer h-6 w-40 mx-auto rounded mb-8" />
          <div className="flex gap-16 items-center justify-center opacity-60">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton-shimmer h-8 w-24 rounded" />
            ))}
          </div>
        </section>

        {/* Stats skeleton: row of 4 cards */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="skeleton-shimmer rounded-2xl h-28"
              />
            ))}
          </div>
        </section>

        {/* Content skeleton: alternating rows of card grids */}
        <section className="container mx-auto px-4 py-16 space-y-20">
          {/* Row 1: 3 cards */}
          <div>
            <div className="skeleton-shimmer h-8 w-64 mx-auto rounded-lg mb-4" />
            <div className="skeleton-shimmer h-4 w-96 max-w-full mx-auto rounded mb-10" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="skeleton-shimmer rounded-2xl h-64"
                />
              ))}
            </div>
          </div>

          {/* Row 2: 3 cards (alternating layout) */}
          <div>
            <div className="skeleton-shimmer h-8 w-56 mx-auto rounded-lg mb-4" />
            <div className="skeleton-shimmer h-4 w-80 max-w-full mx-auto rounded mb-10" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="skeleton-shimmer rounded-2xl h-72"
                />
              ))}
            </div>
          </div>

          {/* Row 3: 2-column feature layout */}
          <div>
            <div className="skeleton-shimmer h-8 w-48 mx-auto rounded-lg mb-10" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="skeleton-shimmer rounded-2xl h-80" />
              <div className="skeleton-shimmer rounded-2xl h-80" />
            </div>
          </div>

          {/* Row 4: 3 more cards */}
          <div>
            <div className="skeleton-shimmer h-8 w-72 mx-auto rounded-lg mb-4" />
            <div className="skeleton-shimmer h-4 w-96 max-w-full mx-auto rounded mb-10" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="skeleton-shimmer rounded-2xl h-56"
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer skeleton */}
      <footer className="skeleton-shimmer h-96 w-full mt-auto" />
    </div>
  )
}

/**
 * SectionSkeleton — compact placeholder for individual lazy-loaded sections.
 * Shown while a section chunk is being loaded over the network.
 */
export function SectionSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={`skeleton-shimmer rounded-2xl h-[600px] ${className ?? ''}`}
      aria-hidden="true"
    />
  )
}
