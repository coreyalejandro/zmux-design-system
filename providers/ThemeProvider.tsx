'use client'

/**
 * ZMUX Design System - Theme Provider
 * 
 * Manages theme state (light/dark/high-contrast/system)
 * Part of The Living Constitution (TLC) Design System
 * 
 * @invariant INVARIANT_VISUAL - Sanctuary palette preserved across themes
 * @invariant INVARIANT_A11Y - High contrast mode available
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react'

export type Theme = 'light' | 'dark' | 'high-contrast' | 'system'
export type ResolvedTheme = 'light' | 'dark' | 'high-contrast'

interface ThemeContextValue {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
  isHighContrast: boolean
  setHighContrast: (enabled: boolean) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const STORAGE_KEY = 'zmux-theme'
const HIGH_CONTRAST_KEY = 'zmux-high-contrast'

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light'
  
  // Check for high contrast preference first
  if (window.matchMedia('(prefers-contrast: more)').matches) {
    return 'high-contrast'
  }
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function resolveTheme(theme: Theme, isHighContrast: boolean): ResolvedTheme {
  if (isHighContrast) return 'high-contrast'
  if (theme === 'system') return getSystemTheme()
  if (theme === 'high-contrast') return 'high-contrast'
  return theme
}

interface ThemeProviderProps {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = STORAGE_KEY,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme)
  const [isHighContrast, setIsHighContrast] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Initialize theme from storage
  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey) as Theme | null
    const storedHighContrast = localStorage.getItem(HIGH_CONTRAST_KEY) === 'true'
    
    if (storedTheme) {
      setThemeState(storedTheme)
    }
    setIsHighContrast(storedHighContrast)
    setMounted(true)
  }, [storageKey])

  // Apply theme to document
  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement
    const resolved = resolveTheme(theme, isHighContrast)
    
    // Remove all theme classes
    root.classList.remove('light', 'dark', 'high-contrast')
    
    // Add current theme class
    root.classList.add(resolved)
    
    // Update color-scheme for native elements
    root.style.colorScheme = resolved === 'dark' ? 'dark' : 'light'
  }, [theme, isHighContrast, mounted])

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const contrastQuery = window.matchMedia('(prefers-contrast: more)')
    
    const handleChange = () => {
      const root = document.documentElement
      const resolved = resolveTheme('system', isHighContrast)
      
      root.classList.remove('light', 'dark', 'high-contrast')
      root.classList.add(resolved)
      root.style.colorScheme = resolved === 'dark' ? 'dark' : 'light'
    }

    mediaQuery.addEventListener('change', handleChange)
    contrastQuery.addEventListener('change', handleChange)
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
      contrastQuery.removeEventListener('change', handleChange)
    }
  }, [theme, isHighContrast])

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem(storageKey, newTheme)
  }, [storageKey])

  const toggleTheme = useCallback(() => {
    const themes: Theme[] = ['light', 'dark', 'system']
    const currentIndex = themes.indexOf(theme)
    const nextTheme = themes[(currentIndex + 1) % themes.length]
    setTheme(nextTheme)
  }, [theme, setTheme])

  const setHighContrast = useCallback((enabled: boolean) => {
    setIsHighContrast(enabled)
    localStorage.setItem(HIGH_CONTRAST_KEY, String(enabled))
  }, [])

  const resolvedTheme = resolveTheme(theme, isHighContrast)

  // Prevent flash of wrong theme
  if (!mounted) {
    return (
      <ThemeContext.Provider
        value={{
          theme: defaultTheme,
          resolvedTheme: 'light',
          setTheme: () => {},
          toggleTheme: () => {},
          isHighContrast: false,
          setHighContrast: () => {},
        }}
      >
        {children}
      </ThemeContext.Provider>
    )
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme,
        toggleTheme,
        isHighContrast,
        setHighContrast,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
