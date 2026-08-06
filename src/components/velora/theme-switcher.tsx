'use client'

import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'
import { Sun, Moon, Check } from 'lucide-react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { useColorTheme, type ColorTheme } from '@/components/theme-color-provider'
import { cn } from '@/lib/utils'

const emptySubscribe = () => () => {}

const COLOR_THEMES: { name: ColorTheme; label: string; swatch: string }[] = [
  { name: 'emerald', label: 'Emerald', swatch: 'oklch(0.627 0.194 149.21)' },
  { name: 'ocean', label: 'Ocean', swatch: 'oklch(0.635 0.168 230)' },
  { name: 'sunset', label: 'Sunset', swatch: 'oklch(0.682 0.198 52)' },
  { name: 'violet', label: 'Violet', swatch: 'oklch(0.596 0.248 293)' },
  { name: 'rose', label: 'Rose', swatch: 'oklch(0.645 0.246 16.4)' },
]

export function ThemeSwitcher({ className }: { className?: string }) {
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false)
  const { theme, setTheme } = useTheme()
  const { colorTheme, setColorTheme } = useColorTheme()

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
  const currentSwatch =
    COLOR_THEMES.find((t) => t.name === colorTheme)?.swatch ?? COLOR_THEMES[0].swatch

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {/* Light/Dark toggle */}
      <button
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-foreground/50 hover:text-foreground hover:bg-muted/50 transition-colors duration-200"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>

      {/* Color theme picker */}
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-foreground/50 hover:text-foreground hover:bg-muted/50 transition-colors duration-200"
            aria-label={`Current color theme: ${colorTheme}. Click to change.`}
          >
            <span
              className="w-4 h-4 rounded-full border border-foreground/20"
              style={{ backgroundColor: currentSwatch }}
            />
          </button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-auto p-3">
          <div className="flex items-center gap-3">
            {COLOR_THEMES.map((t) => {
              const isActive = t.name === colorTheme
              return (
                <button
                  key={t.name}
                  onClick={() => setColorTheme(t.name)}
                  className="flex flex-col items-center gap-1.5 group outline-none"
                  aria-label={`Switch to ${t.label} theme`}
                  aria-pressed={isActive}
                >
                  <span className="relative">
                    <span
                      className={cn(
                        'block w-7 h-7 rounded-full border-2 transition-transform duration-150 group-hover:scale-110',
                        isActive ? 'border-foreground/40' : 'border-transparent'
                      )}
                      style={{ backgroundColor: t.swatch }}
                    />
                    {isActive && (
                      <Check
                        className="absolute inset-0 m-auto w-3.5 h-3.5 text-white drop-shadow-sm"
                        strokeWidth={3}
                      />
                    )}
                  </span>
                  <span
                    className={cn(
                      'text-[10px] font-medium leading-none transition-colors duration-150',
                      isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                    )}
                  >
                    {t.label}
                  </span>
                </button>
              )
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
