'use client'

/**
 * ZMUX Design System - Accessibility Provider
 * 
 * Manages accessibility preferences:
 * - Reduced motion
 * - Dyslexia-friendly fonts
 * - Font size scaling
 * - Focus indicator style
 * 
 * Part of The Living Constitution (TLC) Design System
 * 
 * @invariant INVARIANT_A11Y - All preferences persist and are respected
 * @invariant INVARIANT_I4 - Cognitive Safety: Reduced stimulation options
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react'

export type FontScale = 'normal' | 'large' | 'x-large'
export type FocusStyle = 'default' | 'high-visibility' | 'underline'

interface AccessibilitySettings {
  reducedMotion: boolean
  dyslexiaFont: boolean
  fontScale: FontScale
  focusStyle: FocusStyle
  simplifiedMode: boolean
  lineSpacing: 'normal' | 'relaxed' | 'loose'
}

interface AccessibilityContextValue extends AccessibilitySettings {
  setReducedMotion: (enabled: boolean) => void
  setDyslexiaFont: (enabled: boolean) => void
  setFontScale: (scale: FontScale) => void
  setFocusStyle: (style: FocusStyle) => void
  setSimplifiedMode: (enabled: boolean) => void
  setLineSpacing: (spacing: 'normal' | 'relaxed' | 'loose') => void
  resetToDefaults: () => void
  prefersReducedMotion: boolean
}

const AccessibilityContext = createContext<AccessibilityContextValue | undefined>(undefined)

const STORAGE_KEY = 'zmux-accessibility'

const defaultSettings: AccessibilitySettings = {
  reducedMotion: false,
  dyslexiaFont: false,
  fontScale: 'normal',
  focusStyle: 'default',
  simplifiedMode: false,
  lineSpacing: 'normal',
}

const fontScaleValues: Record<FontScale, string> = {
  normal: '100%',
  large: '112.5%',
  'x-large': '125%',
}

const lineSpacingValues: Record<string, string> = {
  normal: '1.5',
  relaxed: '1.75',
  loose: '2',
}

interface AccessibilityProviderProps {
  children: ReactNode
}

export function AccessibilityProvider({ children }: AccessibilityProviderProps) {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Initialize from storage and system preferences
  useEffect(() => {
    // Check system preference for reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(motionQuery.matches)
    
    // Listen for changes
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }
    motionQuery.addEventListener('change', handleMotionChange)

    // Load stored settings
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Partial<AccessibilitySettings>
        setSettings(prev => ({ ...prev, ...parsed }))
      } catch {
        // Invalid JSON, use defaults
      }
    }
    
    setMounted(true)

    return () => {
      motionQuery.removeEventListener('change', handleMotionChange)
    }
  }, [])

  // Apply settings to document
  useEffect(() => {
    if (!mounted) return

    const root = document.documentElement
    const body = document.body

    // Reduced motion
    const effectiveReducedMotion = settings.reducedMotion || prefersReducedMotion
    root.classList.toggle('reduced-motion', effectiveReducedMotion)
    root.style.setProperty('--motion-duration', effectiveReducedMotion ? '0ms' : '200ms')

    // Dyslexia font
    body.classList.toggle('dyslexia-friendly', settings.dyslexiaFont)
    if (settings.dyslexiaFont) {
      root.style.setProperty('--font-body', 'var(--font-readable)')
    } else {
      root.style.removeProperty('--font-body')
    }

    // Font scale
    root.style.fontSize = fontScaleValues[settings.fontScale]

    // Focus style
    root.dataset.focusStyle = settings.focusStyle

    // Simplified mode
    body.classList.toggle('simplified-mode', settings.simplifiedMode)

    // Line spacing
    root.style.setProperty('--line-height-body', lineSpacingValues[settings.lineSpacing])
  }, [settings, prefersReducedMotion, mounted])

  // Save settings to storage
  useEffect(() => {
    if (!mounted) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  }, [settings, mounted])

  const updateSetting = useCallback(<K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }, [])

  const setReducedMotion = useCallback((enabled: boolean) => {
    updateSetting('reducedMotion', enabled)
  }, [updateSetting])

  const setDyslexiaFont = useCallback((enabled: boolean) => {
    updateSetting('dyslexiaFont', enabled)
  }, [updateSetting])

  const setFontScale = useCallback((scale: FontScale) => {
    updateSetting('fontScale', scale)
  }, [updateSetting])

  const setFocusStyle = useCallback((style: FocusStyle) => {
    updateSetting('focusStyle', style)
  }, [updateSetting])

  const setSimplifiedMode = useCallback((enabled: boolean) => {
    updateSetting('simplifiedMode', enabled)
  }, [updateSetting])

  const setLineSpacing = useCallback((spacing: 'normal' | 'relaxed' | 'loose') => {
    updateSetting('lineSpacing', spacing)
  }, [updateSetting])

  const resetToDefaults = useCallback(() => {
    setSettings(defaultSettings)
  }, [])

  return (
    <AccessibilityContext.Provider
      value={{
        ...settings,
        setReducedMotion,
        setDyslexiaFont,
        setFontScale,
        setFocusStyle,
        setSimplifiedMode,
        setLineSpacing,
        resetToDefaults,
        prefersReducedMotion,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider')
  }
  return context
}

// Hook for reduced motion preference
export function useReducedMotion() {
  const { reducedMotion, prefersReducedMotion } = useAccessibility()
  return reducedMotion || prefersReducedMotion
}
