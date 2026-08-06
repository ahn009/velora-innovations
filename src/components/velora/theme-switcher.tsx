'use client'

import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'
import { Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'

const emptySubscribe = () => () => {}

export function ThemeSwitcher({ className }: { className?: string }) {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false)
  const { theme, setTheme } = useTheme()

  if (!mounted) {
    return (
      <div className={cn('flex items-center gap-1', className)}>
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg" aria-hidden="true">
          <span className="w-4 h-4" />
        </span>
      </div>
    )
  }

  const isDark = theme === 'dark'
  return (
    <div className={cn('flex items-center', className)}>
      <button
        type="button"
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground/55 transition-[background-color,color,transform] duration-150 hover:bg-muted/60 hover:text-foreground active:scale-[0.97]"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>
    </div>
  )
}
