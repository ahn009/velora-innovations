'use client'

import { createContext, useContext, useSyncExternalStore, useCallback, type ReactNode } from 'react'

export type ColorTheme = 'emerald' | 'ocean' | 'sunset' | 'violet' | 'rose'

const VALID_THEMES: ColorTheme[] = ['emerald', 'ocean', 'sunset', 'violet', 'rose']
const STORAGE_KEY = 'velora-color-theme'
const DEFAULT_THEME: ColorTheme = 'emerald'

interface ColorThemeContextValue {
  colorTheme: ColorTheme
  setColorTheme: (theme: ColorTheme) => void
}

const ColorThemeContext = createContext<ColorThemeContextValue>({
  colorTheme: DEFAULT_THEME,
  setColorTheme: () => {},
})

export function useColorTheme() {
  return useContext(ColorThemeContext)
}

// --- External store for hydration-safe theme reading ---

let currentTheme: ColorTheme = DEFAULT_THEME
const listeners = new Set<() => void>()

function getThemeSnapshot(): ColorTheme {
  return currentTheme
}

function getServerSnapshot(): ColorTheme {
  return DEFAULT_THEME
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => { listeners.delete(listener) }
}

function applyThemeClass(theme: ColorTheme) {
  const html = document.documentElement
  // Remove all theme classes
  VALID_THEMES.forEach((t) => html.classList.remove(`theme-${t}`))
  // Add new theme class
  html.classList.add(`theme-${theme}`)
}

function setTheme(theme: ColorTheme) {
  currentTheme = theme
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, theme)
    applyThemeClass(theme)
  }
  listeners.forEach((l) => l())
}

function readStoredTheme(): ColorTheme {
  if (typeof window === 'undefined') return DEFAULT_THEME
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && VALID_THEMES.includes(stored as ColorTheme)) {
      return stored as ColorTheme
    }
  } catch {
    // localStorage unavailable
  }
  return DEFAULT_THEME
}

// --- Provider ---

export function ColorThemeProvider({ children }: { children: ReactNode }) {
  // We use useSyncExternalStore so the value is consistent between server and client.
  // On mount we'll sync from localStorage.
  const colorTheme = useSyncExternalStore(subscribe, getThemeSnapshot, getServerSnapshot)

  const handleSetColorTheme = useCallback((theme: ColorTheme) => {
    setTheme(theme)
  }, [])

  return (
    <ColorThemeContext.Provider value={{ colorTheme, setColorTheme: handleSetColorTheme }}>
      {children}
    </ColorThemeContext.Provider>
  )
}

// --- Init: read persisted theme on client ---
if (typeof window !== 'undefined') {
  const stored = readStoredTheme()
  currentTheme = stored
  applyThemeClass(stored)
}
