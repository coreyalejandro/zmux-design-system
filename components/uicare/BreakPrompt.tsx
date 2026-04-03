'use client'

/**
 * ZMUX Design System - Break Prompt
 * 
 * Non-intrusive break suggestion modal
 * Part of The Living Constitution (TLC) Design System
 * 
 * @invariant INVARIANT_I2 - Human Safety: Break reminders
 * @invariant INVARIANT_I4 - Cognitive Safety: Prevents burnout
 */

import * as React from 'react'
import { Coffee, Clock, X, Leaf, Droplets } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  GlassModal,
  GlassModalContent,
  GlassModalHeader,
  GlassModalTitle,
  GlassModalDescription,
  GlassModalFooter,
} from '@/components/glass/GlassModal'

interface BreakSuggestion {
  icon: React.ElementType
  title: string
  description: string
  duration: string
}

const breakSuggestions: BreakSuggestion[] = [
  {
    icon: Coffee,
    title: 'Quick refresh',
    description: 'Stretch, get water, or look away from the screen',
    duration: '2 min',
  },
  {
    icon: Leaf,
    title: 'Grounding break',
    description: 'Take a few deep breaths and notice your surroundings',
    duration: '5 min',
  },
  {
    icon: Droplets,
    title: 'Full reset',
    description: 'Step away completely for a proper break',
    duration: '15 min',
  },
]

export interface BreakPromptProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  sessionDuration?: number
  onTakeBreak?: (type: 'quick' | 'grounding' | 'full') => void
  onDismiss?: () => void
  onSnooze?: (duration: number) => void
}

export function BreakPrompt({
  open,
  onOpenChange,
  sessionDuration,
  onTakeBreak,
  onDismiss,
  onSnooze,
}: BreakPromptProps) {
  const formatDuration = (ms?: number) => {
    if (!ms) return ''
    const minutes = Math.floor(ms / 60000)
    const hours = Math.floor(minutes / 60)
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`
    }
    return `${minutes} minutes`
  }

  return (
    <GlassModal open={open} onOpenChange={onOpenChange}>
      <GlassModalContent size="md" className="sm:max-w-md">
        <GlassModalHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-4">
            <Coffee className="h-6 w-6 text-amber-500" aria-hidden="true" />
          </div>
          <GlassModalTitle>Time for a Break</GlassModalTitle>
          <GlassModalDescription>
            {sessionDuration 
              ? `You've been active for ${formatDuration(sessionDuration)}. Taking regular breaks helps maintain focus and well-being.`
              : 'Taking regular breaks helps maintain focus and well-being.'
            }
          </GlassModalDescription>
        </GlassModalHeader>

        <div className="space-y-3 py-4">
          {breakSuggestions.map((suggestion, index) => {
            const Icon = suggestion.icon
            const breakType = index === 0 ? 'quick' : index === 1 ? 'grounding' : 'full'
            
            return (
              <button
                key={index}
                onClick={() => onTakeBreak?.(breakType)}
                className={cn(
                  'w-full flex items-start gap-4 p-4 rounded-xl',
                  'bg-muted/50 hover:bg-muted transition-colors',
                  'text-left focus:outline-none focus:ring-2 focus:ring-ring'
                )}
              >
                <div className="p-2 rounded-lg bg-background">
                  <Icon className="h-5 w-5 text-amber-700" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{suggestion.title}</p>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {suggestion.duration}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {suggestion.description}
                  </p>
                </div>
              </button>
            )
          })}
        </div>

        <GlassModalFooter className="flex-col gap-2">
          <div className="flex gap-2 w-full">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onSnooze?.(10 * 60 * 1000)}
            >
              Remind in 10 min
            </Button>
            <Button
              variant="ghost"
              className="flex-1"
              onClick={onDismiss}
            >
              Not now
            </Button>
          </div>
        </GlassModalFooter>
      </GlassModalContent>
    </GlassModal>
  )
}
