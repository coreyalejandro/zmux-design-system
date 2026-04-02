/**
 * ZMUX Design System - Spacing Tokens
 * 
 * 4px base spacing system for consistent layouts
 * Part of The Living Constitution (TLC) Design System
 * 
 * @invariant INVARIANT_I4 - Cognitive Safety: Consistent spacing reduces cognitive load
 * @invariant INVARIANT_A11Y - Touch targets meet minimum size requirements
 */

// Core spacing scale (4px base)
export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',   // 2px
  1: '0.25rem',      // 4px
  1.5: '0.375rem',   // 6px
  2: '0.5rem',       // 8px
  2.5: '0.625rem',   // 10px
  3: '0.75rem',      // 12px
  3.5: '0.875rem',   // 14px
  4: '1rem',         // 16px
  5: '1.25rem',      // 20px
  6: '1.5rem',       // 24px
  7: '1.75rem',      // 28px
  8: '2rem',         // 32px
  9: '2.25rem',      // 36px
  10: '2.5rem',      // 40px
  11: '2.75rem',     // 44px - Minimum touch target
  12: '3rem',        // 48px - Recommended touch target
  14: '3.5rem',      // 56px
  16: '4rem',        // 64px
  20: '5rem',        // 80px
  24: '6rem',        // 96px
  28: '7rem',        // 112px
  32: '8rem',        // 128px
  36: '9rem',        // 144px
  40: '10rem',       // 160px
  44: '11rem',       // 176px
  48: '12rem',       // 192px
  52: '13rem',       // 208px
  56: '14rem',       // 224px
  60: '15rem',       // 240px
  64: '16rem',       // 256px
  72: '18rem',       // 288px
  80: '20rem',       // 320px
  96: '24rem',       // 384px
} as const

// Component-specific spacing
export const componentSpacing = {
  // Buttons
  button: {
    paddingX: {
      sm: spacing[3],      // 12px
      md: spacing[4],      // 16px
      lg: spacing[6],      // 24px
    },
    paddingY: {
      sm: spacing[1.5],    // 6px
      md: spacing[2],      // 8px
      lg: spacing[3],      // 12px
    },
    gap: spacing[2],       // 8px between icon and text
  },
  
  // Cards
  card: {
    padding: {
      sm: spacing[4],      // 16px
      md: spacing[6],      // 24px
      lg: spacing[8],      // 32px
    },
    gap: spacing[4],       // 16px between card elements
  },
  
  // Forms
  form: {
    fieldGap: spacing[4],  // 16px between fields
    labelGap: spacing[2],  // 8px between label and input
    groupGap: spacing[6],  // 24px between field groups
    sectionGap: spacing[8], // 32px between sections
  },
  
  // Layout
  layout: {
    pageMargin: {
      mobile: spacing[4],   // 16px
      tablet: spacing[6],   // 24px
      desktop: spacing[8],  // 32px
    },
    sectionGap: spacing[16], // 64px between page sections
    containerPadding: spacing[6], // 24px
  },
  
  // Navigation
  nav: {
    itemPadding: spacing[3], // 12px
    itemGap: spacing[1],     // 4px
    sectionGap: spacing[4],  // 16px
  },
  
  // Modals/Dialogs
  modal: {
    padding: spacing[6],     // 24px
    headerGap: spacing[4],   // 16px
    contentGap: spacing[4],  // 16px
    footerGap: spacing[3],   // 12px
  },
  
  // Safety components (larger for easy access)
  safety: {
    touchTarget: spacing[12], // 48px minimum
    buttonPadding: spacing[4], // 16px
    bannerPadding: spacing[4], // 16px
    crisisButtonSize: spacing[14], // 56px
  },
} as const

// Border radius scale
export const borderRadius = {
  none: '0',
  sm: '0.125rem',      // 2px
  DEFAULT: '0.25rem',  // 4px
  md: '0.375rem',      // 6px
  lg: '0.5rem',        // 8px
  xl: '0.75rem',       // 12px
  '2xl': '1rem',       // 16px
  '3xl': '1.5rem',     // 24px
  full: '9999px',      // Pill shape
} as const

// Border width scale
export const borderWidth = {
  0: '0',
  DEFAULT: '1px',
  2: '2px',
  4: '4px',
  8: '8px',
} as const

// Shadow scale for elevation
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  // Glass morphism shadows
  glass: '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
  glassHover: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
} as const

// Z-index scale for layering
export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
  crisis: 9999,        // Crisis/safety elements always on top
} as const

// Container widths
export const containerWidths = {
  xs: '20rem',         // 320px
  sm: '24rem',         // 384px
  md: '28rem',         // 448px
  lg: '32rem',         // 512px
  xl: '36rem',         // 576px
  '2xl': '42rem',      // 672px
  '3xl': '48rem',      // 768px
  '4xl': '56rem',      // 896px
  '5xl': '64rem',      // 1024px
  '6xl': '72rem',      // 1152px
  '7xl': '80rem',      // 1280px
  full: '100%',
  prose: '65ch',       // Optimal reading width
} as const

// Breakpoints
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

// Type exports
export type Spacing = keyof typeof spacing
export type BorderRadius = keyof typeof borderRadius
export type Shadow = keyof typeof shadows
export type ZIndex = keyof typeof zIndex
export type ContainerWidth = keyof typeof containerWidths
export type Breakpoint = keyof typeof breakpoints
