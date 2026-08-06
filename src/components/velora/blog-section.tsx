'use client'

import { Clock, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Section, SectionHeading, StaggerContainer, StaggerItem } from '@/components/velora/section'
import { CardShine } from '@/components/velora/card-shine'

const blogPosts = [
  {
    title: 'How AI Phone Agents Increased Dental Appointment Bookings by 340%',
    category: 'Case Study',
    readTime: '8 min read',
    excerpt:
      'Discover how a multi-location dental practice automated patient scheduling and follow-ups, resulting in a 340% increase in booked appointments within the first quarter.',
    image: '/images/blog-1.png',
    categoryColor: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
  },
  {
    title: 'The Complete Guide to AI Lead Qualification for Service Businesses',
    category: 'Guide',
    readTime: '12 min read',
    excerpt:
      'Learn the framework for implementing AI-powered lead scoring that helps service businesses prioritize high-intent prospects and convert 3x more qualified leads.',
    image: '/images/blog-2.png',
    categoryColor: 'bg-amber-500/15 text-amber-700 dark:text-amber-300',
  },
  {
    title: '5 Workflow Automations That Save Small Teams 20+ Hours Per Week',
    category: 'Article',
    readTime: '6 min read',
    excerpt:
      'Practical automation recipes for appointment reminders, follow-up sequences, intake forms, and more — each saving 4+ hours per week for lean teams.',
    image: '/images/blog-3.png',
    categoryColor: 'bg-violet-500/15 text-violet-700 dark:text-violet-300',
  },
] as const

export function BlogSection() {
  return (
    <Section id="blog">
      <SectionHeading
        label="Case Studies & Insights"
        title="Real Results from Real Businesses"
        description="Real results from real businesses. Learn how AI automation transforms operations."
      />

      <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <StaggerItem key={post.title}>
            <BlogCard post={post} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </Section>
  )
}

function BlogCard({
  post,
}: {
  post: (typeof blogPosts)[number]
}) {
  return (
    <article className="group relative flex flex-col h-full rounded-xl border border-velora-border/50 dark:border-border/50 bg-background dark:bg-card overflow-hidden shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardShine />

      {/* Blog image */}
      <div className='relative h-48 overflow-hidden'>
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Category pill */}
        <span
          className={cn(
            'absolute bottom-3 left-5 inline-flex rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide uppercase',
            post.categoryColor
          )}
        >
          {post.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Read time badge */}
        <div className="flex items-center gap-1.5 text-muted-foreground mb-3">
          <Clock className="h-3.5 w-3.5" />
          <span className="text-xs font-medium">{post.readTime}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground leading-snug mb-2 line-clamp-3">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
          {post.excerpt}
        </p>

        {/* Read more link — pushed to bottom */}
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-velora-emerald transition-all duration-200 group-hover:gap-2.5"
          aria-label={`Read more about ${post.title}`}
        >
          Read more
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </a>
      </div>
    </article>
  )
}
