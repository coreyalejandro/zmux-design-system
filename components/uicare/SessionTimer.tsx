'use client'

/**
 * ZMUX Design System - Session Timer
 * 
 * Displays session duration and suggests breaks
 * Part of The Living Constitution (TLC) Design System
 * 
 * @invariant INVARIANT_I2 - Human Safety: Break reminders
 * @invariant INVARIANT_I4 - Cognitive Safety: Session awareness
 */

import * as React from 'react'
import { Clock, Coffee, AlertCircle } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const sessionTimerVariants = cva(
  'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm',
  {
    variants: {
      status: {
        normal: 'bg-muted text-muted-foreground',
        warning: 'bg-amber-500/10 text-amber-600',
        urgent: 'bg-destructive/10 text-destructive',
      },
    },
    defaultVariants: {
      status: 'normal',
    },
  }
)

export interface SessionTimerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sessionTimerVariants> {
  sessionStartTime?: number
  warningThreshold?: number  // ms before showing warning
  urgentThreshold?: number   // ms before showing urgent
  onBreakSuggested?: () => void
  showBreakButton?: boolean
  onTakeBreak?: () => void
}

export function SessionTimer({
  className,
  sessionStartTime,
  warningThreshold = 30 * 60 * 1000,  // 30 minutes
  urgentThreshold = 60 * 60 * 1000,   // 1 hour
  onBreakSuggested,
  showBreakButton = true,
  onTakeBreak,
  ...props
}: SessionTimerProps) {
  const [duration, setDuration] = React.useState(0)
  const [hasShownWarning, setHasShownWarning] = React.useState(false)
  const startTime = React.useRef(sessionStartTime || Date.now())

  React.useEffect(() => {
    const timer = setInterval(() => {
      setDuration(Date.now() - startTime.current)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  React.useEffect(() => {
    if (duration >= warningThreshold && !hasShownWarning) {
      setHasShownWarning(true)
      onBreakSuggested?.()
    }
  }, [duration, warningThreshold, hasShownWarning, onBreakSuggested])

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`
    }
    return `${minutes}m ${seconds % 60}s`
  }

  const status: 'normal' | 'warning' | 'urgent' = 
    duration >= urgentThreshold ? 'urgent' :
    duration >= warningThreshold ? 'warning' :
    'normal'

  const Icon = status === 'urgent' ? AlertCircle : status === 'warning' ? Coffee : Clock

  return (
    <div
      className={cn('flex items-center gap-3', className)}
      role="timer"
      aria-label={`Session duration: ${formatDuration(duration)}`}
      {...props}
    >
      <div className={cn(sessionTimerVariants({ status }))}>
        <Icon className="h-4 w-4" aria-hidden="true" />
        <span className="font-mono">{formatDuration(duration)}</span>
      </div>
      
      {showBreakButton && status !== 'normal' && (
        <Button
          variant="outline"
          size="sm"
          onClick={onTakeBreak}
          className={cn(
            status === 'urgent' && 'border-destructive text-destructive hover:bg-destructive/10',
            status === 'warning' && 'border-amber-500 text-amber-600 hover:bg-amber-500/10'
          )}
        >
          <Coffee className="h-4 w-4 mr-1.5" />
          Take a Break
        </Button>
      )}
    </div>
  )
}
