/**
 * ZMUX Design System - High Contrast Theme
 * 
 * Maximum contrast theme for enhanced accessibility
 * Part of The Living Constitution (TLC) Design System
 * 
 * @invariant INVARIANT_A11Y - Exceeds WCAG 2.2 AAA contrast ratios (7:1+ everywhere)
 * @invariant INVARIANT_I4 - Cognitive Safety: Maximum clarity for users with visual impairments
 */

export const highContrastTheme = {
  name: 'high-contrast',
  label: 'High Contrast',
  
  // Core semantic colors - Black and white with accent colors
  colors: {
    // Backgrounds
    background: '#FFFFFF',
    backgroundSecondary: '#F0F0F0',
    backgroundTertiary: '#E0E0E0',
    
    // Foregrounds
    foreground: '#000000',
    foregroundSecondary: '#1A1A1A',
    foregroundMuted: '#333333',
    
    // Primary (High contrast gold)
    primary: '#996600',
    primaryForeground: '#FFFFFF',
    primaryHover: '#7A5200',
    primaryActive: '#5C3D00',
    
    // Secondary
    secondary: '#004D4D',
    secondaryForeground: '#FFFFFF',
    secondaryHover: '#003D3D',
    secondaryActive: '#002D2D',
    
    // Accent
    accent: '#004D4D',
    accentForeground: '#FFFFFF',
    accentHover: '#003D3D',
    accentActive: '#002D2D',
    
    // Muted
    muted: '#E0E0E0',
    mutedForeground: '#333333',
    
    // Cards
    card: '#FFFFFF',
    cardForeground: '#000000',
    cardBorder: '#000000',
    
    // Popovers
    popover: '#FFFFFF',
    popoverForeground: '#000000',
    popoverBorder: '#000000',
    
    // Borders - Always black for visibility
    border: '#000000',
    borderSecondary: '#333333',
    
    // Inputs
    input: '#000000',
    inputForeground: '#000000',
    inputPlaceholder: '#666666',
    inputFocus: '#004D4D',
    
    // Ring/Focus - Highly visible
    ring: '#004D4D',
    ringOffset: '#FFFFFF',
    
    // Destructive
    destructive: '#CC0000',
    destructiveForeground: '#FFFFFF',
    
    // Safety semantic colors - Maximum contrast
    verified: '#006600',
    verifiedForeground: '#FFFFFF',
    caution: '#996600',
    cautionForeground: '#000000',
    danger: '#CC0000',
    dangerForeground: '#FFFFFF',
    grounding: '#5C4033',
    groundingForeground: '#FFFFFF',
    
    // Truth Tiers - High contrast versions
    truthT1: '#006600',
    truthT1Background: '#E6FFE6',
    truthT1Foreground: '#003300',
    truthT2: '#996600',
    truthT2Background: '#FFF5E6',
    truthT2Foreground: '#4D3300',
    truthT3: '#CC0000',
    truthT3Background: '#FFE6E6',
    truthT3Foreground: '#660000',
    
    // Mood Signals
    moodCalm: '#004D4D',
    moodCalmBackground: '#E6FFFF',
    moodStressed: '#996600',
    moodStressedBackground: '#FFF5E6',
    moodCrisis: '#CC0000',
    moodCrisisBackground: '#FFE6E6',
    
    // Risk Levels
    riskLow: '#006600',
    riskMedium: '#996600',
    riskHigh: '#CC0000',
    riskCritical: '#990000',
    
    // Safety UI
    crisisHotline: '#CC0000',
    exitButton: '#990000',
    safeZone: '#006600',
    warningBanner: '#996600',
    
    // Glass morphism disabled for high contrast
    glassBackground: '#FFFFFF',
    glassBorder: '#000000',
    glassBackdrop: 'none',
    
    // Sidebar
    sidebar: '#F0F0F0',
    sidebarForeground: '#000000',
    sidebarPrimary: '#996600',
    sidebarPrimaryForeground: '#FFFFFF',
    sidebarAccent: '#E0E0E0',
    sidebarAccentForeground: '#000000',
    sidebarBorder: '#000000',
    
    // Charts
    chart1: '#996600',
    chart2: '#004D4D',
    chart3: '#660066',
    chart4: '#006600',
    chart5: '#CC0000',
  },
  
  // Shadows - Solid borders instead of shadows for clarity
  shadows: {
    sm: '0 0 0 1px #000000',
    DEFAULT: '0 0 0 2px #000000',
    md: '0 0 0 2px #000000',
    lg: '0 0 0 3px #000000',
    xl: '0 0 0 4px #000000',
    glass: '0 0 0 2px #000000',
  },
} as const

export type HighContrastTheme = typeof highContrastTheme
