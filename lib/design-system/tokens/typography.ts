/**
 * ZMUX Design System - Typography Tokens
 * 
 * Neurodivergent-optimized typography system
 * Part of The Living Constitution (TLC) Design System
 * 
 * @invariant INVARIANT_I4 - Cognitive Safety: Typography supports readability modes
 * @invariant INVARIANT_A11Y - All text meets WCAG 2.2 AAA requirements
 */

export const typography = {
  // Font family stacks
  fontFamily: {
    // Primary sans-serif - high readability
    sans: [
      'Inter',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
    ],
    // Display/heading font - Southern elegance
    display: [
      'Crimson Pro',
      'Georgia',
      'Cambria',
      'Times New Roman',
      'serif',
    ],
    // Monospace for code/data
    mono: [
      'JetBrains Mono',
      'Consolas',
      'Monaco',
      'Andale Mono',
      'Ubuntu Mono',
      'monospace',
    ],
    // High-readability alternative (dyslexia support)
    readable: [
      'OpenDyslexic',
      'Comic Sans MS',
      'Trebuchet MS',
      'Verdana',
      'sans-serif',
    ],
  },

  // Font size scale with line-height optimized for readability
  // Line heights are generous (1.5-1.7) for cognitive accessibility
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],     // 12px
    sm: ['0.875rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],   // 14px
    base: ['1rem', { lineHeight: '1.7', letterSpacing: '0.01em' }],     // 16px
    lg: ['1.125rem', { lineHeight: '1.7', letterSpacing: '0.005em' }],  // 18px
    xl: ['1.25rem', { lineHeight: '1.6', letterSpacing: '0' }],         // 20px
    '2xl': ['1.5rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }], // 24px
    '3xl': ['2rem', { lineHeight: '1.4', letterSpacing: '-0.015em' }],  // 32px
    '4xl': ['2.5rem', { lineHeight: '1.3', letterSpacing: '-0.02em' }], // 40px
    '5xl': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.025em' }],  // 48px
    '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }], // 60px
  },

  // Font weights
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Letter spacing presets
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    readable: '0.01em',      // Base for dyslexia support
    relaxed: '0.025em',      // Enhanced readability mode
    wide: '0.05em',
    wider: '0.1em',
  },

  // Line height presets
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',        // Default for body text
    loose: '1.75',           // High cognitive load content
    accessible: '1.8',       // Maximum readability mode
  },

  // Paragraph spacing
  paragraphSpacing: {
    none: '0',
    tight: '0.5em',
    normal: '1em',
    relaxed: '1.5em',
    loose: '2em',
  },

  // Maximum line widths for optimal readability (ch units)
  maxWidth: {
    prose: '65ch',           // Standard reading width
    narrow: '45ch',          // Enhanced focus mode
    wide: '80ch',            // Data-heavy content
  },
} as const

// Preset text styles for common use cases
export const textStyles = {
  // Headings
  h1: {
    fontFamily: 'display',
    fontSize: '5xl',
    fontWeight: 'bold',
    lineHeight: 'tight',
    letterSpacing: 'tight',
  },
  h2: {
    fontFamily: 'display',
    fontSize: '4xl',
    fontWeight: 'semibold',
    lineHeight: 'tight',
    letterSpacing: 'tight',
  },
  h3: {
    fontFamily: 'display',
    fontSize: '3xl',
    fontWeight: 'semibold',
    lineHeight: 'snug',
  },
  h4: {
    fontFamily: 'sans',
    fontSize: '2xl',
    fontWeight: 'semibold',
    lineHeight: 'snug',
  },
  h5: {
    fontFamily: 'sans',
    fontSize: 'xl',
    fontWeight: 'medium',
    lineHeight: 'normal',
  },
  h6: {
    fontFamily: 'sans',
    fontSize: 'lg',
    fontWeight: 'medium',
    lineHeight: 'normal',
  },

  // Body text
  body: {
    fontFamily: 'sans',
    fontSize: 'base',
    fontWeight: 'normal',
    lineHeight: 'relaxed',
    letterSpacing: 'readable',
  },
  bodyLarge: {
    fontFamily: 'sans',
    fontSize: 'lg',
    fontWeight: 'normal',
    lineHeight: 'relaxed',
    letterSpacing: 'readable',
  },
  bodySmall: {
    fontFamily: 'sans',
    fontSize: 'sm',
    fontWeight: 'normal',
    lineHeight: 'relaxed',
    letterSpacing: 'readable',
  },

  // UI text
  label: {
    fontFamily: 'sans',
    fontSize: 'sm',
    fontWeight: 'medium',
    lineHeight: 'normal',
    letterSpacing: 'readable',
  },
  caption: {
    fontFamily: 'sans',
    fontSize: 'xs',
    fontWeight: 'normal',
    lineHeight: 'normal',
    letterSpacing: 'readable',
  },
  button: {
    fontFamily: 'sans',
    fontSize: 'sm',
    fontWeight: 'semibold',
    lineHeight: 'none',
    letterSpacing: 'wide',
  },

  // Code/technical
  code: {
    fontFamily: 'mono',
    fontSize: 'sm',
    fontWeight: 'normal',
    lineHeight: 'relaxed',
  },
  codeBlock: {
    fontFamily: 'mono',
    fontSize: 'sm',
    fontWeight: 'normal',
    lineHeight: 'loose',
  },

  // Safety-specific (high visibility)
  safetyWarning: {
    fontFamily: 'sans',
    fontSize: 'lg',
    fontWeight: 'bold',
    lineHeight: 'normal',
    letterSpacing: 'wide',
  },
  crisisText: {
    fontFamily: 'sans',
    fontSize: 'xl',
    fontWeight: 'bold',
    lineHeight: 'normal',
    letterSpacing: 'wide',
  },
} as const

// Accessibility mode typography adjustments
export const accessibilityModes = {
  default: {
    fontSizeScale: 1,
    lineHeightScale: 1,
    letterSpacingAdjust: '0em',
    fontFamily: 'sans',
  },
  dyslexiaFriendly: {
    fontSizeScale: 1.1,
    lineHeightScale: 1.15,
    letterSpacingAdjust: '0.02em',
    fontFamily: 'readable',
  },
  largeText: {
    fontSizeScale: 1.25,
    lineHeightScale: 1.1,
    letterSpacingAdjust: '0.01em',
    fontFamily: 'sans',
  },
  highContrast: {
    fontSizeScale: 1.1,
    lineHeightScale: 1.1,
    letterSpacingAdjust: '0.015em',
    fontFamily: 'sans',
  },
} as const

// Type exports
export type FontFamily = keyof typeof typography.fontFamily
export type FontSize = keyof typeof typography.fontSize
export type FontWeight = keyof typeof typography.fontWeight
export type TextStyle = keyof typeof textStyles
export type AccessibilityMode = keyof typeof accessibilityModes
