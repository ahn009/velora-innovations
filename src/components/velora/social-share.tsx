'use client'

import { BriefcaseBusiness, Link, Share2 } from 'lucide-react'
import { toast } from 'sonner'

interface SocialShareProps {
  title: string
  text: string
}

export function SocialShare({ title, text }: SocialShareProps) {
  const url =
    typeof window !== 'undefined'
      ? window.location.href
      : ''

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      toast.success('Copied!')
    } catch {
      toast.error('Failed to copy link')
    }
  }

  const handleShareX = () => {
    const params = new URLSearchParams({
      text: `${title} — ${text}`,
      url,
    })
    window.open(
      `https://twitter.com/intent/tweet?${params.toString()}`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  const handleShareLinkedIn = () => {
    const params = new URLSearchParams({ url })
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`,
      '_blank',
      'noopener,noreferrer',
    )
  }

  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={handleCopyLink}
        className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted transition-colors duration-200"
        title="Copy link"
        aria-label="Copy link to clipboard"
      >
        <Link className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={handleShareX}
        className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted transition-colors duration-200"
        title="Share on X"
        aria-label="Share on X (Twitter)"
      >
        <Share2 className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onClick={handleShareLinkedIn}
        className="w-8 h-8 rounded-md flex items-center justify-center text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted transition-colors duration-200"
        title="Share on LinkedIn"
        aria-label="Share on LinkedIn"
      >
        <BriefcaseBusiness className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}
