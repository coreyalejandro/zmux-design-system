/**
 * ZMUX Design System - Sanctuary Theme (Light)
 * 
 * Default light theme implementing the "Sanctuary" aesthetic
 * Part of The Living Constitution (TLC) Design System
 * 
 * @invariant INVARIANT_VISUAL - Sanctuary palette preserved
 * @invariant INVARIANT_A11Y - All colors meet WCAG 2.2 AAA contrast ratios
 */

import { colors } from '../tokens/colors'

export const sanctuaryTheme = {
  name: 'sanctuary',
  label: 'Sanctuary (Light)',
  
  // Core semantic colors
  colors: {
    // Backgrounds
    background: colors.sanctuaryWhite,
    backgroundSecondary: colors.warmCream,
    backgroundTertiary: colors.neutral[100],
    
    // Foregrounds
    foreground: colors.charcoal,
    foregroundSecondary: colors.neutral[600],
    foregroundMuted: colors.neutral[500],
    
    // Primary (Soul Gold)
    primary: colors.soulGold.DEFAULT,
    primaryForeground: colors.neutral[900],
    primaryHover: colors.soulGold[500],
    primaryActive: colors.soulGold[600],
    
    // Secondary (Terracotta)
    secondary: colors.terracotta.DEFAULT,
    secondaryForeground: colors.neutral[900],
    secondaryHover: colors.terracotta[500],
    secondaryActive: colors.terracotta[600],
    
    // Accent (Clinical Teal)
    accent: colors.clinicalTeal.DEFAULT,
    accentForeground: colors.sanctuaryWhite,
    accentHover: colors.clinicalTeal[500],
    accentActive: colors.clinicalTeal[600],
    
    // Muted
    muted: colors.neutral[200],
    mutedForeground: colors.neutral[600],
    
    // Cards
    card: colors.sanctuaryWhite,
    cardForeground: colors.charcoal,
    cardBorder: colors.neutral[200],
    
    // Popovers
    popover: colors.sanctuaryWhite,
    popoverForeground: colors.charcoal,
    popoverBorder: colors.neutral[200],
    
    // Borders
    border: colors.neutral[200],
    borderSecondary: colors.neutral[300],
    
    // Inputs
    input: colors.neutral[200],
    inputForeground: colors.charcoal,
    inputPlaceholder: colors.neutral[400],
    inputFocus: colors.clinicalTeal.DEFAULT,
    
    // Ring/Focus
    ring: colors.clinicalTeal.DEFAULT,
    ringOffset: colors.sanctuaryWhite,
    
    // Destructive
    destructive: colors.semantic.danger.DEFAULT,
    destructiveForeground: colors.semantic.danger.foreground,
    
    // Safety semantic colors
    verified: colors.semantic.verified.DEFAULT,
    verifiedForeground: colors.semantic.verified.foreground,
    caution: colors.semantic.caution.DEFAULT,
    cautionForeground: colors.semantic.caution.foreground,
    danger: colors.semantic.danger.DEFAULT,
    dangerForeground: colors.semantic.danger.foreground,
    grounding: colors.semantic.grounding.DEFAULT,
    groundingForeground: colors.semantic.grounding.foreground,
    
    // Truth Tiers
    truthT1: colors.truthTier.T1.DEFAULT,
    truthT1Background: colors.truthTier.T1.background,
    truthT1Foreground: colors.truthTier.T1.foreground,
    truthT2: colors.truthTier.T2.DEFAULT,
    truthT2Background: colors.truthTier.T2.background,
    truthT2Foreground: colors.truthTier.T2.foreground,
    truthT3: colors.truthTier.T3.DEFAULT,
    truthT3Background: colors.truthTier.T3.background,
    truthT3Foreground: colors.truthTier.T3.foreground,
    
    // Mood Signals
    moodCalm: colors.moodSignal.calm.DEFAULT,
    moodCalmBackground: colors.moodSignal.calm.background,
    moodStressed: colors.moodSignal.stressed.DEFAULT,
    moodStressedBackground: colors.moodSignal.stressed.background,
    moodCrisis: colors.moodSignal.crisis.DEFAULT,
    moodCrisisBackground: colors.moodSignal.crisis.background,
    
    // Risk Levels
    riskLow: colors.risk.low.DEFAULT,
    riskMedium: colors.risk.medium.DEFAULT,
    riskHigh: colors.risk.high.DEFAULT,
    riskCritical: colors.risk.critical.DEFAULT,
    
    // Safety UI
    crisisHotline: colors.safety.crisisHotline,
    exitButton: colors.safety.exitButton,
    safeZone: colors.safety.safeZone,
    warningBanner: colors.safety.warningBanner,
    
    // Glass morphism
    glassBackground: 'rgba(254, 253, 251, 0.7)',
    glassBorder: 'rgba(212, 165, 116, 0.2)',
    glassBackdrop: 'blur(12px)',
    
    // Sidebar
    sidebar: colors.warmCream,
    sidebarForeground: colors.charcoal,
    sidebarPrimary: colors.soulGold.DEFAULT,
    sidebarPrimaryForeground: colors.neutral[900],
    sidebarAccent: colors.terracotta[100],
    sidebarAccentForeground: colors.charcoal,
    sidebarBorder: colors.neutral[200],
    
    // Charts
    chart1: colors.soulGold.DEFAULT,
    chart2: colors.clinicalTeal.DEFAULT,
    chart3: colors.terracotta.DEFAULT,
    chart4: colors.semantic.verified.DEFAULT,
    chart5: colors.semantic.caution.DEFAULT,
  },
  
  // Shadows with warm tint
  shadows: {
    sm: '0 1px 2px 0 rgba(139, 115, 85, 0.05)',
    DEFAULT: '0 1px 3px 0 rgba(139, 115, 85, 0.1), 0 1px 2px -1px rgba(139, 115, 85, 0.1)',
    md: '0 4px 6px -1px rgba(139, 115, 85, 0.1), 0 2px 4px -2px rgba(139, 115, 85, 0.1)',
    lg: '0 10px 15px -3px rgba(139, 115, 85, 0.1), 0 4px 6px -4px rgba(139, 115, 85, 0.1)',
    xl: '0 20px 25px -5px rgba(139, 115, 85, 0.1), 0 8px 10px -6px rgba(139, 115, 85, 0.1)',
    glass: '0 8px 32px 0 rgba(139, 115, 85, 0.1)',
  },
} as const

export type SanctuaryTheme = typeof sanctuaryTheme
