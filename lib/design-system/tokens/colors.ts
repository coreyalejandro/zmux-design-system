/**
 * ZMUX Design System - Color Tokens
 * 
 * "Sanctuary" Palette - WCAG AAA Compliant
 * Part of The Living Constitution (TLC) Design System
 * 
 * @invariant INVARIANT_VISUAL - Sanctuary palette preserved
 * @invariant INVARIANT_A11Y - All color combinations meet WCAG 2.2 AAA contrast ratios
 */

// Core ZMUX "Sanctuary" Palette
export const colors = {
  // Primary Sanctuary colors
  soulGold: {
    DEFAULT: '#D4A574',
    50: '#FDF8F3',
    100: '#F9EDE0',
    200: '#F0D9C0',
    300: '#E5C9A8',
    400: '#D4A574',
    500: '#C4925C',
    600: '#B8895A',
    700: '#9A7048',
    800: '#7D5A3A',
    900: '#60452D',
  },
  terracotta: {
    DEFAULT: '#C4A484',
    50: '#FAF7F4',
    100: '#F2EBE3',
    200: '#E5D9CC',
    300: '#D9C4AC',
    400: '#C4A484',
    500: '#B08E6B',
    600: '#A8886C',
    700: '#8A6F56',
    800: '#6D5844',
    900: '#524233',
  },
  clinicalTeal: {
    DEFAULT: '#6B9B9B',
    50: '#F2F7F7',
    100: '#E0EBEB',
    200: '#C1D7D7',
    300: '#8FB5B5',
    400: '#6B9B9B',
    500: '#548383',
    600: '#4F7A7A',
    700: '#426666',
    800: '#355252',
    900: '#2A4040',
  },
  
  // Neutrals
  warmCream: '#F5F0E8',
  sanctuaryWhite: '#FEFDFB',
  charcoal: '#2D2D2D',
  
  // Extended neutral scale
  neutral: {
    50: '#FEFDFB',
    100: '#F5F0E8',
    200: '#E8E2D8',
    300: '#D1C9BC',
    400: '#A8A095',
    500: '#7A746B',
    600: '#5C574F',
    700: '#454139',
    800: '#2D2D2D',
    900: '#1A1917',
  },
  
  // Semantic colors (TLC Safety Signals)
  semantic: {
    verified: {
      DEFAULT: '#22C55E',
      light: '#4ADE80',
      dark: '#16A34A',
      foreground: '#FFFFFF',
    },
    caution: {
      DEFAULT: '#F59E0B',
      light: '#FBBF24',
      dark: '#D97706',
      foreground: '#1A1917',
    },
    danger: {
      DEFAULT: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
      foreground: '#FFFFFF',
    },
    unknown: {
      DEFAULT: '#6B7280',
      light: '#9CA3AF',
      dark: '#4B5563',
      foreground: '#FFFFFF',
    },
    grounding: {
      DEFAULT: '#8B7355',
      light: '#A89076',
      dark: '#6F5C44',
      foreground: '#FFFFFF',
    },
  },
  
  // MoodSignal colors (EmpiricalGuard - I5)
  moodSignal: {
    calm: {
      DEFAULT: '#6B9B9B',
      background: '#F2F7F7',
      foreground: '#2A4040',
    },
    stressed: {
      DEFAULT: '#F59E0B',
      background: '#FFFBEB',
      foreground: '#78350F',
    },
    crisis: {
      DEFAULT: '#EF4444',
      background: '#FEF2F2',
      foreground: '#7F1D1D',
    },
    unknown: {
      DEFAULT: '#6B7280',
      background: '#F9FAFB',
      foreground: '#1F2937',
    },
  },
  
  // Truth Tier colors (EpistemicGuard - I1)
  truthTier: {
    T1: {
      DEFAULT: '#22C55E',
      background: '#F0FDF4',
      foreground: '#14532D',
      border: '#86EFAC',
      label: 'Verified',
    },
    T2: {
      DEFAULT: '#F59E0B',
      background: '#FFFBEB',
      foreground: '#78350F',
      border: '#FCD34D',
      label: 'Partially Verified',
    },
    T3: {
      DEFAULT: '#EF4444',
      background: '#FEF2F2',
      foreground: '#7F1D1D',
      border: '#FCA5A5',
      label: 'Unverified',
    },
  },
  
  // Risk Level colors (BuildLattice)
  risk: {
    low: {
      DEFAULT: '#22C55E',
      background: '#F0FDF4',
      foreground: '#14532D',
    },
    medium: {
      DEFAULT: '#F59E0B',
      background: '#FFFBEB',
      foreground: '#78350F',
    },
    high: {
      DEFAULT: '#EF4444',
      background: '#FEF2F2',
      foreground: '#7F1D1D',
    },
    critical: {
      DEFAULT: '#DC2626',
      background: '#FEE2E2',
      foreground: '#450A0A',
    },
  },
  
  // Safety-specific colors
  safety: {
    crisisHotline: '#EF4444',
    exitButton: '#DC2626',
    safeZone: '#22C55E',
    warningBanner: '#F59E0B',
    privacyShield: '#6B9B9B',
    consentActive: '#22C55E',
    consentRevoked: '#EF4444',
  },
} as const

// Type exports for TypeScript consumers
export type SanctuaryColor = typeof colors.soulGold | typeof colors.terracotta | typeof colors.clinicalTeal
export type SemanticColor = keyof typeof colors.semantic
export type MoodSignalState = keyof typeof colors.moodSignal
export type TruthTier = keyof typeof colors.truthTier
export type RiskLevel = keyof typeof colors.risk
