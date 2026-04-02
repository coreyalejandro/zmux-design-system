'use client'

/**
 * ZMUX Design System - Cognitive Load Meter
 * 
 * Visual indicator of estimated cognitive load
 * Part of The Living Constitution (TLC) Design System
 * 
 * @invariant INVARIANT_I4 - Cognitive Safety: Load awareness
 */

import * as React from 'react'
import { Brain, AlertTriangle } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export type CognitiveLoadLevel = 'low' | 'moderate' | 'high' | 'overloaded'

const meterVariants = cva(
  'flex items-center gap-2',
  {
    variants: {
      size: {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

const levelColors: Record<CognitiveLoadLevel, string> = {
  low: 'bg-verified',
  moderate: 'bg-caution',
  high: 'bg-danger/70',
  overloaded: 'bg-danger',
}

const levelLabels: Record<CognitiveLoadLevel, string> = {
  low: 'Low',
  moderate: 'Moderate',
  high: 'High',
  overloaded: 'Overloaded',
}

const levelDescriptions: Record<CognitiveLoadLevel, string> = {
  low: 'Good mental space',
  moderate: 'Some mental effort',
  high: 'Consider a break soon',
  overloaded: 'Take a break now',
}

export interface CognitiveLoadMeterProps
  extends VariantProps<typeof meterVariants> {
  className?: string
  level?: CognitiveLoadLevel
  showLabel?: boolean
  showDescription?: boolean
  showSimplifyButton?: boolean
  onSimplify?: () => void
}

export function CognitiveLoadMeter({
  className,
  size,
  level = 'low',
  showLabel = true,
  showDescription = false,
  showSimplifyButton = false,
  onSimplify,
}: CognitiveLoadMeterProps) {
  const levelIndex = ['low', 'moderate', 'high', 'overloaded'].indexOf(level)

  return (
    <div className={cn(meterVariants({ size }), className)}>
      <div className="flex items-center gap-1.5">
        <Brain 
          className={cn(
            'h-4 w-4',
            level === 'overloaded' && 'text-danger',
            level === 'high' && 'text-danger/70',
            level === 'moderate' && 'text-caution',
            level === 'low' && 'text-verified'
          )} 
          aria-hidden="true" 
        />
        
        {/* Visual meter */}
        <div 
          className="flex gap-0.5"
          role="meter"
          aria-valuenow={levelIndex}
          aria-valuemin={0}
          aria-valuemax={3}
          aria-label={`Cognitive load: ${levelLabels[level]}`}
        >
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={cn(
                'w-2 h-4 rounded-sm transition-colors',
                i <= levelIndex ? levelColors[level] : 'bg-muted'
              )}
            />
          ))}
        </div>
      </div>

      {showLabel && (
        <span className={cn(
          'font-medium',
          level === 'overloaded' && 'text-danger',
          level === 'high' && 'text-danger/70',
          level === 'moderate' && 'text-caution',
          level === 'low' && 'text-verified'
        )}>
          {levelLabels[level]}
        </span>
      )}

      {showDescription && (
        <span className="text-muted-foreground">
          {levelDescriptions[level]}
        </span>
      )}

      {showSimplifyButton && (level === 'high' || level === 'overloaded') && (
        <Button
          variant="outline"
          size="sm"
          onClick={onSimplify}
          className="border-danger text-danger hover:bg-danger/10"
        >
          <AlertTriangle className="h-3 w-3 mr-1" />
          Simplify
        </Button>
      )}
    </div>
  )
}

// Hook to estimate cognitive load based on page complexity
export function useCognitiveLoad(factors?: {
  interactiveElements?: number
  textDensity?: 'low' | 'medium' | 'high'
  animationCount?: number
  decisionPoints?: number
}): CognitiveLoadLevel {
  const {
    interactiveElements = 0,
    textDensity = 'medium',
    animationCount = 0,
    decisionPoints = 0,
  } = factors || {}

  // Simple heuristic scoring
  let score = 0
  
  score += Math.min(interactiveElements * 0.5, 3)
  score += textDensity === 'high' ? 2 : textDensity === 'medium' ? 1 : 0
  score += Math.min(animationCount * 0.3, 1.5)
  score += Math.min(decisionPoints * 0.7, 2.5)

  if (score >= 7) return 'overloaded'
  if (score >= 5) return 'high'
  if (score >= 3) return 'moderate'
  return 'low'
}
