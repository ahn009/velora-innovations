'use client'

import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'
import { Sun, Moon } from 'lucide-react'

const emptySubscribe = () => () => {}

export function ThemeToggle({ className }: { className?: string }) {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false)
  const { theme, setTheme } = useTheme()

  if (!mounted) {
    return (
      <button
        className={className}
        aria-label="Toggle theme"
      >
        <span className="w-4 h-4" />
      </button>
    )
  }

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={className}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </button>
  )
}
