/**
 * ZMUX Design System - Sanctuary Theme (Dark)
 * 
 * Dark mode theme implementing the "Sanctuary" aesthetic
 * Part of The Living Constitution (TLC) Design System
 * 
 * @invariant INVARIANT_VISUAL - Sanctuary palette preserved (adapted for dark)
 * @invariant INVARIANT_A11Y - All colors meet WCAG 2.2 AAA contrast ratios
 */

import { colors } from '../tokens/colors'

export const sanctuaryDarkTheme = {
  name: 'sanctuary-dark',
  label: 'Sanctuary (Dark)',
  
  // Core semantic colors
  colors: {
    // Backgrounds
    background: colors.neutral[900],
    backgroundSecondary: colors.neutral[800],
    backgroundTertiary: colors.neutral[700],
    
    // Foregrounds
    foreground: colors.warmCream,
    foregroundSecondary: colors.neutral[300],
    foregroundMuted: colors.neutral[400],
    
    // Primary (Soul Gold - brightened for dark mode)
    primary: colors.soulGold[300],
    primaryForeground: colors.neutral[900],
    primaryHover: colors.soulGold[200],
    primaryActive: colors.soulGold.DEFAULT,
    
    // Secondary (Terracotta - brightened for dark mode)
    secondary: colors.terracotta[300],
    secondaryForeground: colors.neutral[900],
    secondaryHover: colors.terracotta[200],
    secondaryActive: colors.terracotta.DEFAULT,
    
    // Accent (Clinical Teal - brightened for dark mode)
    accent: colors.clinicalTeal[300],
    accentForeground: colors.neutral[900],
    accentHover: colors.clinicalTeal[200],
    accentActive: colors.clinicalTeal.DEFAULT,
    
    // Muted
    muted: colors.neutral[800],
    mutedForeground: colors.neutral[400],
    
    // Cards
    card: colors.neutral[800],
    cardForeground: colors.warmCream,
    cardBorder: colors.neutral[700],
    
    // Popovers
    popover: colors.neutral[800],
    popoverForeground: colors.warmCream,
    popoverBorder: colors.neutral[700],
    
    // Borders
    border: colors.neutral[700],
    borderSecondary: colors.neutral[600],
    
    // Inputs
    input: colors.neutral[700],
    inputForeground: colors.warmCream,
    inputPlaceholder: colors.neutral[500],
    inputFocus: colors.clinicalTeal[300],
    
    // Ring/Focus
    ring: colors.clinicalTeal[300],
    ringOffset: colors.neutral[900],
    
    // Destructive
    destructive: colors.semantic.danger.light,
    destructiveForeground: colors.neutral[900],
    
    // Safety semantic colors (kept bright for visibility)
    verified: colors.semantic.verified.light,
    verifiedForeground: colors.neutral[900],
    caution: colors.semantic.caution.light,
    cautionForeground: colors.neutral[900],
    danger: colors.semantic.danger.light,
    dangerForeground: colors.neutral[900],
    grounding: colors.semantic.grounding.light,
    groundingForeground: colors.neutral[900],
    
    // Truth Tiers (brightened for dark mode)
    truthT1: colors.truthTier.T1.DEFAULT,
    truthT1Background: '#0A2E1A', // Dark green
    truthT1Foreground: colors.truthTier.T1.DEFAULT,
    truthT2: colors.truthTier.T2.DEFAULT,
    truthT2Background: '#2E2006', // Dark amber
    truthT2Foreground: colors.truthTier.T2.DEFAULT,
    truthT3: colors.truthTier.T3.DEFAULT,
    truthT3Background: '#2E0A0A', // Dark red
    truthT3Foreground: colors.truthTier.T3.DEFAULT,
    
    // Mood Signals
    moodCalm: colors.clinicalTeal[300],
    moodCalmBackground: '#0A2020',
    moodStressed: colors.semantic.caution.light,
    moodStressedBackground: '#2E2006',
    moodCrisis: colors.semantic.danger.light,
    moodCrisisBackground: '#2E0A0A',
    
    // Risk Levels
    riskLow: colors.semantic.verified.light,
    riskMedium: colors.semantic.caution.light,
    riskHigh: colors.semantic.danger.light,
    riskCritical: '#FF6B6B',
    
    // Safety UI (kept highly visible)
    crisisHotline: '#FF6B6B',
    exitButton: '#FF6B6B',
    safeZone: colors.semantic.verified.light,
    warningBanner: colors.semantic.caution.light,
    
    // Glass morphism (dark variant)
    glassBackground: 'rgba(26, 25, 23, 0.8)',
    glassBorder: 'rgba(212, 165, 116, 0.15)',
    glassBackdrop: 'blur(12px)',
    
    // Sidebar
    sidebar: colors.neutral[800],
    sidebarForeground: colors.warmCream,
    sidebarPrimary: colors.soulGold[300],
    sidebarPrimaryForeground: colors.neutral[900],
    sidebarAccent: colors.neutral[700],
    sidebarAccentForeground: colors.warmCream,
    sidebarBorder: colors.neutral[700],
    
    // Charts
    chart1: colors.soulGold[300],
    chart2: colors.clinicalTeal[300],
    chart3: colors.terracotta[300],
    chart4: colors.semantic.verified.light,
    chart5: colors.semantic.caution.light,
  },
  
  // Shadows with subtle glow
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.4)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.4)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -4px rgba(0, 0, 0, 0.4)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.4)',
    glass: '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
  },
} as const

export type SanctuaryDarkTheme = typeof sanctuaryDarkTheme
