/**
 * ZMUX Design System - Motion Tokens
 * 
 * Animation and transition tokens with reduced-motion support
 * Part of The Living Constitution (TLC) Design System
 * 
 * @invariant INVARIANT_A11Y - Reduced motion preferences ALWAYS respected
 * @invariant INVARIANT_I4 - Cognitive Safety: No distracting animations
 */

// Duration scale
export const duration = {
  instant: '0ms',
  fastest: '50ms',
  faster: '100ms',
  fast: '150ms',
  normal: '200ms',
  moderate: '300ms',
  slow: '400ms',
  slower: '500ms',
  slowest: '700ms',
  // Semantic durations
  feedback: '150ms',      // Button clicks, toggles
  entrance: '200ms',      // Elements appearing
  exit: '150ms',          // Elements disappearing
  expand: '300ms',        // Accordions, dropdowns
  transition: '200ms',    // State changes
  loading: '1000ms',      // Loading animations
} as const

// Easing functions
export const easing = {
  // Standard easings
  linear: 'linear',
  default: 'cubic-bezier(0.4, 0, 0.2, 1)',       // ease-in-out
  in: 'cubic-bezier(0.4, 0, 1, 1)',              // ease-in
  out: 'cubic-bezier(0, 0, 0.2, 1)',             // ease-out
  inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',         // ease-in-out
  
  // Expressive easings
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  elastic: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
  
  // Subtle easings for UI
  subtle: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
  smooth: 'cubic-bezier(0.45, 0, 0.55, 1)',
  
  // Entrance/exit specific
  enter: 'cubic-bezier(0, 0, 0.2, 1)',
  exit: 'cubic-bezier(0.4, 0, 1, 1)',
} as const

// Preset transitions
export const transitions = {
  // Common property transitions
  all: `all ${duration.normal} ${easing.default}`,
  colors: `color, background-color, border-color, text-decoration-color, fill, stroke ${duration.fast} ${easing.default}`,
  opacity: `opacity ${duration.normal} ${easing.default}`,
  shadow: `box-shadow ${duration.normal} ${easing.default}`,
  transform: `transform ${duration.normal} ${easing.default}`,
  
  // Component-specific
  button: `all ${duration.fast} ${easing.default}`,
  card: `box-shadow ${duration.normal} ${easing.default}, transform ${duration.normal} ${easing.default}`,
  input: `border-color ${duration.fast} ${easing.default}, box-shadow ${duration.fast} ${easing.default}`,
  modal: `opacity ${duration.entrance} ${easing.enter}, transform ${duration.entrance} ${easing.enter}`,
  dropdown: `opacity ${duration.fast} ${easing.enter}, transform ${duration.fast} ${easing.enter}`,
  tooltip: `opacity ${duration.faster} ${easing.default}`,
  toggle: `background-color ${duration.fast} ${easing.default}, transform ${duration.fast} ${easing.bounce}`,
  
  // Safety components (instant for urgency)
  crisis: `all ${duration.instant} ${easing.linear}`,
  safety: `all ${duration.fastest} ${easing.default}`,
} as const

// Keyframe animations (CSS animation names)
export const keyframes = {
  // Entrance animations
  fadeIn: {
    from: { opacity: '0' },
    to: { opacity: '1' },
  },
  fadeOut: {
    from: { opacity: '1' },
    to: { opacity: '0' },
  },
  slideInUp: {
    from: { transform: 'translateY(10px)', opacity: '0' },
    to: { transform: 'translateY(0)', opacity: '1' },
  },
  slideInDown: {
    from: { transform: 'translateY(-10px)', opacity: '0' },
    to: { transform: 'translateY(0)', opacity: '1' },
  },
  slideInLeft: {
    from: { transform: 'translateX(-10px)', opacity: '0' },
    to: { transform: 'translateX(0)', opacity: '1' },
  },
  slideInRight: {
    from: { transform: 'translateX(10px)', opacity: '0' },
    to: { transform: 'translateX(0)', opacity: '1' },
  },
  scaleIn: {
    from: { transform: 'scale(0.95)', opacity: '0' },
    to: { transform: 'scale(1)', opacity: '1' },
  },
  scaleOut: {
    from: { transform: 'scale(1)', opacity: '1' },
    to: { transform: 'scale(0.95)', opacity: '0' },
  },
  
  // Loading animations
  spin: {
    from: { transform: 'rotate(0deg)' },
    to: { transform: 'rotate(360deg)' },
  },
  pulse: {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '0.5' },
  },
  bounce: {
    '0%, 100%': { transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)' },
    '50%': { transform: 'translateY(0)', animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)' },
  },
  
  // Attention animations (use sparingly)
  shake: {
    '0%, 100%': { transform: 'translateX(0)' },
    '25%': { transform: 'translateX(-4px)' },
    '75%': { transform: 'translateX(4px)' },
  },
  ping: {
    '75%, 100%': { transform: 'scale(2)', opacity: '0' },
  },
  
  // Grounding animation (for sensory breaks)
  breathe: {
    '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
    '50%': { transform: 'scale(1.05)', opacity: '1' },
  },
} as const

// Animation presets
export const animations = {
  // Standard animations
  fadeIn: `fadeIn ${duration.entrance} ${easing.enter} forwards`,
  fadeOut: `fadeOut ${duration.exit} ${easing.exit} forwards`,
  slideInUp: `slideInUp ${duration.entrance} ${easing.enter} forwards`,
  slideInDown: `slideInDown ${duration.entrance} ${easing.enter} forwards`,
  scaleIn: `scaleIn ${duration.entrance} ${easing.enter} forwards`,
  scaleOut: `scaleOut ${duration.exit} ${easing.exit} forwards`,
  
  // Loading
  spin: `spin ${duration.loading} ${easing.linear} infinite`,
  pulse: `pulse 2s ${easing.inOut} infinite`,
  bounce: `bounce 1s infinite`,
  
  // Attention (accessibility-safe)
  shake: `shake ${duration.moderate} ${easing.default}`,
  
  // Grounding (slow, calming)
  breathe: `breathe 4s ${easing.smooth} infinite`,
} as const

// Reduced motion variants - ALL animations disabled
export const reducedMotion = {
  duration: {
    instant: '0ms',
    fastest: '0ms',
    faster: '0ms',
    fast: '0ms',
    normal: '0ms',
    moderate: '0ms',
    slow: '0ms',
    slower: '0ms',
    slowest: '0ms',
    feedback: '0ms',
    entrance: '0ms',
    exit: '0ms',
    expand: '0ms',
    transition: '0ms',
    loading: '0ms',
  },
  transitions: {
    all: 'none',
    colors: 'none',
    opacity: 'none',
    shadow: 'none',
    transform: 'none',
    button: 'none',
    card: 'none',
    input: 'none',
    modal: 'none',
    dropdown: 'none',
    tooltip: 'none',
    toggle: 'none',
    crisis: 'none',
    safety: 'none',
  },
  animations: {
    fadeIn: 'none',
    fadeOut: 'none',
    slideInUp: 'none',
    slideInDown: 'none',
    scaleIn: 'none',
    scaleOut: 'none',
    spin: 'none',
    pulse: 'none',
    bounce: 'none',
    shake: 'none',
    breathe: 'none',
  },
} as const

// CSS media query helper
export const motionMediaQuery = {
  prefersReduced: '@media (prefers-reduced-motion: reduce)',
  prefersMotion: '@media (prefers-reduced-motion: no-preference)',
} as const

// Type exports
export type Duration = keyof typeof duration
export type Easing = keyof typeof easing
export type Transition = keyof typeof transitions
export type Animation = keyof typeof animations
