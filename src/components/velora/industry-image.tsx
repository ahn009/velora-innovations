import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { IndustryVisual } from '@/lib/industry-visuals'

type IndustryImageProps = {
  visual: IndustryVisual
  variant?: 'hero' | 'thumbnail'
  preload?: boolean
  decorative?: boolean
  className?: string
}

export function IndustryImage({
  visual,
  variant = 'hero',
  preload = false,
  decorative = false,
  className,
}: IndustryImageProps) {
  const isHero = variant === 'hero'

  return (
    <div
      className={cn(
        'relative overflow-hidden border border-border-subtle bg-background-secondary',
        isHero
          ? 'aspect-[4/3] rounded-[var(--radius-xl)] shadow-[var(--shadow-card)]'
          : 'aspect-[4/3] w-full rounded-[var(--radius-sm)]',
        className
      )}
      aria-hidden={decorative || undefined}
    >
      <Image
        src={visual.src}
        alt={decorative ? '' : visual.alt}
        role={decorative ? 'presentation' : undefined}
        aria-hidden={decorative || undefined}
        fill
        preload={preload}
        loading={preload ? undefined : 'lazy'}
        sizes={
          isHero
            ? '(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 64px), (max-width: 1439px) 42vw, 560px'
            : '(max-width: 639px) 28vw, (max-width: 1023px) 18vw, 96px'
        }
        className="object-cover"
        style={{ objectPosition: visual.objectPosition }}
      />
    </div>
  )
}
