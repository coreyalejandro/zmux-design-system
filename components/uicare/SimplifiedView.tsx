'use client'

/**
 * ZMUX Design System - Simplified View
 * 
 * Wrapper that provides a simplified, low-stimulation UI mode
 * Part of The Living Constitution (TLC) Design System
 * 
 * @invariant INVARIANT_I4 - Cognitive Safety: Reduced complexity available
 * @invariant INVARIANT_A11Y - Cleaner layout for focus
 */

import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SimplifiedViewProps {
  children: React.ReactNode
  className?: string
  enabled?: boolean
  onToggle?: (enabled: boolean) => void
  hideDecorations?: boolean
  hideAnimations?: boolean
  reducedColors?: boolean
  largerText?: boolean
  narrowContent?: boolean
}

export function SimplifiedView({
  children,
  className,
  enabled = false,
  hideDecorations = true,
  hideAnimations = true,
  reducedColors = false,
  largerText = true,
  narrowContent = true,
}: SimplifiedViewProps) {
  return (
    <div
      className={cn(
        'transition-all duration-300',
        enabled && [
          // Remove animations
          hideAnimations && '[&_*]:!transition-none [&_*]:!animate-none',
          // Larger text
          largerText && 'text-lg',
          // Narrower content for better focus
          narrowContent && 'max-w-2xl mx-auto',
          // Hide decorative elements
          hideDecorations && '[&_.decorative]:hidden [&_[aria-hidden="true"]:not(.essential)]:hidden',
          // Reduced color palette
          reducedColors && 'grayscale',
        ],
        className
      )}
      data-simplified={enabled ? 'true' : 'false'}
    >
      {children}
    </div>
  )
}

// Hook to detect if simplified mode is active
export function useSimplifiedMode() {
  const [isSimplified, setIsSimplified] = React.useState(false)

  React.useEffect(() => {
    // Check for system preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    // Check for stored preference
    const stored = localStorage.getItem('zmux-simplified-mode')
    
    setIsSimplified(stored === 'true' || prefersReduced)
  }, [])

  const toggleSimplified = React.useCallback((enabled: boolean) => {
    setIsSimplified(enabled)
    localStorage.setItem('zmux-simplified-mode', String(enabled))
    
    // Apply to body
    document.body.classList.toggle('simplified-mode', enabled)
  }, [])

  return { isSimplified, toggleSimplified }
}
