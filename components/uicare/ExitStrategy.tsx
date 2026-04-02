'use client'

/**
 * ZMUX Design System - Exit Strategy
 * 
 * Quick exit button for safety-sensitive contexts
 * Part of The Living Constitution (TLC) Design System
 * 
 * @invariant INVARIANT_I2 - Human Safety: Exit ALWAYS accessible
 * @invariant INVARIANT_A11Y - Keyboard accessible (Escape key)
 */

import * as React from 'react'
import { X, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export interface ExitStrategyProps {
  className?: string
  label?: string
  exitUrl?: string
  showKeyboardHint?: boolean
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'inline'
  onExit?: () => void
}

export function ExitStrategy({
  className,
  label = 'Exit',
  exitUrl = 'https://www.google.com',
  showKeyboardHint = true,
  position = 'top-right',
  onExit,
}: ExitStrategyProps) {
  const handleExit = React.useCallback(() => {
    onExit?.()
    
    // Clear history and redirect
    if (typeof window !== 'undefined') {
      // Replace current history entry
      window.history.replaceState(null, '', exitUrl)
      // Navigate away
      window.location.replace(exitUrl)
    }
  }, [exitUrl, onExit])

  // Keyboard shortcut
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape key triggers exit
      if (e.key === 'Escape' && e.shiftKey) {
        e.preventDefault()
        handleExit()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleExit])

  const positionClasses = {
    'top-right': 'fixed top-4 right-4 z-[9999]',
    'top-left': 'fixed top-4 left-4 z-[9999]',
    'bottom-right': 'fixed bottom-4 right-4 z-[9999]',
    'bottom-left': 'fixed bottom-4 left-4 z-[9999]',
    'inline': '',
  }

  return (
    <div className={cn(positionClasses[position], className)}>
      <Button
        variant="destructive"
        size="sm"
        onClick={handleExit}
        className="shadow-lg group"
        aria-label={`${label} - Press Shift+Escape for quick exit`}
      >
        <X className="h-4 w-4 mr-1.5" aria-hidden="true" />
        {label}
        <ExternalLink className="h-3 w-3 ml-1.5 opacity-50" aria-hidden="true" />
      </Button>
      {showKeyboardHint && (
        <p className="sr-only">Press Shift+Escape to quickly exit this page</p>
      )}
    </div>
  )
}
