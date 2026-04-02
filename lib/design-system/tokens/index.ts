/**
 * ZMUX Design System - Token Exports
 * 
 * Unified export of all design tokens
 * Part of The Living Constitution (TLC) Design System
 */

// Color tokens
export {
  colors,
  type SanctuaryColor,
  type SemanticColor,
  type MoodSignalState,
  type TruthTier,
  type RiskLevel,
} from './colors'

// Typography tokens
export {
  typography,
  textStyles,
  accessibilityModes,
  type FontFamily,
  type FontSize,
  type FontWeight,
  type TextStyle,
  type AccessibilityMode,
} from './typography'

// Spacing tokens
export {
  spacing,
  componentSpacing,
  borderRadius,
  borderWidth,
  shadows,
  zIndex,
  containerWidths,
  breakpoints,
  type Spacing,
  type BorderRadius,
  type Shadow,
  type ZIndex,
  type ContainerWidth,
  type Breakpoint,
} from './spacing'

// Motion tokens
export {
  duration,
  easing,
  transitions,
  keyframes,
  animations,
  reducedMotion,
  motionMediaQuery,
  type Duration,
  type Easing,
  type Transition,
  type Animation,
} from './motion'

// Combined token object for distribution
export const tokens = {
  colors: () => import('./colors').then(m => m.colors),
  typography: () => import('./typography').then(m => m.typography),
  spacing: () => import('./spacing').then(m => m.spacing),
  motion: () => import('./motion').then(m => ({
    duration: m.duration,
    easing: m.easing,
    transitions: m.transitions,
    animations: m.animations,
  })),
} as const

// Design system version
export const DESIGN_SYSTEM_VERSION = '1.0.0' as const
export const DESIGN_SYSTEM_NAME = 'ZMUX Sanctuary' as const
