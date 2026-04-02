/**
 * ZMUX Design System - Theme Exports
 * 
 * Unified export of all theme configurations
 * Part of The Living Constitution (TLC) Design System
 */

export { sanctuaryTheme, type SanctuaryTheme } from './sanctuary'
export { sanctuaryDarkTheme, type SanctuaryDarkTheme } from './sanctuary-dark'
export { highContrastTheme, type HighContrastTheme } from './high-contrast'

// Theme registry
export const themes = {
  sanctuary: () => import('./sanctuary').then(m => m.sanctuaryTheme),
  'sanctuary-dark': () => import('./sanctuary-dark').then(m => m.sanctuaryDarkTheme),
  'high-contrast': () => import('./high-contrast').then(m => m.highContrastTheme),
} as const

export type ThemeName = keyof typeof themes

// Default theme
export const DEFAULT_THEME: ThemeName = 'sanctuary'
