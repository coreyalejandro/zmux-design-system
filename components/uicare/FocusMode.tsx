'use client'

/**
 * ZMUX Design System - Focus Mode
 * 
 * Toggleable focus mode that reduces distractions
 * Part of The Living Constitution (TLC) Design System
 * 
 * @invariant INVARIANT_I4 - Cognitive Safety: Distraction reduction
 */

import * as React from 'react'
import { Focus, X, Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export interface FocusModeProps {
  children: React.ReactNode
  className?: string
  enabled?: boolean
  onToggle?: (enabled: boolean) => void
  highlightSelector?: string
  dimOpacity?: number
}

export function FocusMode({
  children,
  className,
  enabled = false,
  onToggle,
  highlightSelector,
  dimOpacity = 0.3,
}: FocusModeProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!enabled || !highlightSelector || !containerRef.current) return

    const highlighted = containerRef.current.querySelectorAll(highlightSelector)
    const allElements = containerRef.current.querySelectorAll('*')

    allElements.forEach((el) => {
      if (el instanceof HTMLElement) {
        const isHighlighted = Array.from(highlighted).some(
          (h) => h === el || h.contains(el) || el.contains(h)
        )
        if (!isHighlighted) {
          el.style.opacity = String(dimOpacity)
        }
      }
    })

    return () => {
      allElements.forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.opacity = ''
        }
      })
    }
  }, [enabled, highlightSelector, dimOpacity])

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative',
        enabled && 'focus-mode-active',
        className
      )}
      data-focus-mode={enabled ? 'true' : 'false'}
    >
      {children}
    </div>
  )
}

// Toggle button for focus mode
export interface FocusModeToggleProps {
  className?: string
  enabled?: boolean
  onToggle?: (enabled: boolean) => void
  showLabel?: boolean
  position?: 'inline' | 'fixed'
}

export function FocusModeToggle({
  className,
  enabled = false,
  onToggle,
  showLabel = true,
  position = 'inline',
}: FocusModeToggleProps) {
  const handleToggle = () => {
    onToggle?.(!enabled)
  }

  return (
    <Button
      variant={enabled ? 'default' : 'outline'}
      size="sm"
      onClick={handleToggle}
      className={cn(
        position === 'fixed' && 'fixed bottom-4 left-4 z-50 shadow-lg',
        enabled && 'bg-accent',
        className
      )}
      aria-pressed={enabled}
      aria-label={enabled ? 'Exit focus mode' : 'Enter focus mode'}
    >
      {enabled ? (
        <>
          <EyeOff className="h-4 w-4 mr-1.5" />
          {showLabel && 'Exit Focus'}
        </>
      ) : (
        <>
          <Focus className="h-4 w-4 mr-1.5" />
          {showLabel && 'Focus Mode'}
        </>
      )}
    </Button>
  )
}
