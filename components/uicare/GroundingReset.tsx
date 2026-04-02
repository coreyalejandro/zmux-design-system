'use client'

/**
 * ZMUX Design System - Grounding Reset
 * 
 * Calming grounding exercise component for stress relief
 * Part of The Living Constitution (TLC) Design System
 * 
 * @invariant INVARIANT_I4 - Cognitive Safety: Grounding tools available
 * @invariant INVARIANT_I5 - Emotional Safety: Stress relief options
 * @invariant INVARIANT_A11Y - Reduced motion respected
 */

import * as React from 'react'
import { Leaf, Wind, Eye, Hand, Volume2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle, GlassCardDescription } from '@/components/glass/GlassCard'

type GroundingTechnique = '5-4-3-2-1' | 'breathing' | 'body-scan'

interface GroundingStep {
  count: number
  sense: string
  icon: React.ElementType
  instruction: string
}

const groundingSteps: GroundingStep[] = [
  { count: 5, sense: 'See', icon: Eye, instruction: 'Name 5 things you can see around you' },
  { count: 4, sense: 'Touch', icon: Hand, instruction: 'Name 4 things you can physically feel' },
  { count: 3, sense: 'Hear', icon: Volume2, instruction: 'Name 3 things you can hear right now' },
  { count: 2, sense: 'Smell', icon: Leaf, instruction: 'Name 2 things you can smell' },
  { count: 1, sense: 'Taste', icon: Wind, instruction: 'Name 1 thing you can taste' },
]

export interface GroundingResetProps {
  className?: string
  technique?: GroundingTechnique
  onComplete?: () => void
  onStepChange?: (step: number) => void
  autoAdvance?: boolean
  autoAdvanceDelay?: number
}

export function GroundingReset({
  className,
  technique = '5-4-3-2-1',
  onComplete,
  onStepChange,
  autoAdvance = false,
  autoAdvanceDelay = 5000,
}: GroundingResetProps) {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [isActive, setIsActive] = React.useState(false)
  const [breathPhase, setBreathPhase] = React.useState<'inhale' | 'hold' | 'exhale'>('inhale')

  // Auto-advance timer
  React.useEffect(() => {
    if (!isActive || !autoAdvance) return

    const timer = setTimeout(() => {
      if (currentStep < groundingSteps.length - 1) {
        setCurrentStep(prev => prev + 1)
        onStepChange?.(currentStep + 1)
      } else {
        setIsActive(false)
        onComplete?.()
      }
    }, autoAdvanceDelay)

    return () => clearTimeout(timer)
  }, [isActive, autoAdvance, autoAdvanceDelay, currentStep, onComplete, onStepChange])

  // Breathing animation
  React.useEffect(() => {
    if (technique !== 'breathing' || !isActive) return

    const phases = [
      { phase: 'inhale' as const, duration: 4000 },
      { phase: 'hold' as const, duration: 4000 },
      { phase: 'exhale' as const, duration: 6000 },
    ]

    let phaseIndex = 0
    const cycle = () => {
      setBreathPhase(phases[phaseIndex].phase)
      phaseIndex = (phaseIndex + 1) % phases.length
    }

    cycle()
    const timer = setInterval(() => {
      cycle()
    }, phases.reduce((acc, p) => acc + p.duration, 0) / phases.length)

    return () => clearInterval(timer)
  }, [technique, isActive])

  const handleStart = () => {
    setIsActive(true)
    setCurrentStep(0)
    onStepChange?.(0)
  }

  const handleNext = () => {
    if (currentStep < groundingSteps.length - 1) {
      setCurrentStep(prev => prev + 1)
      onStepChange?.(currentStep + 1)
    } else {
      setIsActive(false)
      onComplete?.()
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setIsActive(false)
  }

  if (technique === 'breathing') {
    return (
      <GlassCard className={cn('max-w-sm mx-auto text-center', className)}>
        <GlassCardHeader>
          <GlassCardTitle>Box Breathing</GlassCardTitle>
          <GlassCardDescription>
            A calming breathing exercise
          </GlassCardDescription>
        </GlassCardHeader>
        <GlassCardContent className="space-y-6">
          <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
            <div
              className={cn(
                'absolute inset-0 rounded-full bg-grounding/20',
                'transition-transform duration-1000 ease-in-out',
                isActive && breathPhase === 'inhale' && 'scale-110',
                isActive && breathPhase === 'exhale' && 'scale-90',
                // Respect reduced motion
                'motion-reduce:transition-none motion-reduce:transform-none'
              )}
            />
            <div className="relative z-10">
              <p className="text-2xl font-semibold text-grounding capitalize">
                {isActive ? breathPhase : 'Ready'}
              </p>
              {isActive && (
                <p className="text-sm text-muted-foreground mt-1">
                  {breathPhase === 'inhale' && '4 seconds'}
                  {breathPhase === 'hold' && '4 seconds'}
                  {breathPhase === 'exhale' && '6 seconds'}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex justify-center gap-3">
            {!isActive ? (
              <Button onClick={handleStart} className="bg-grounding hover:bg-grounding/90">
                Begin
              </Button>
            ) : (
              <Button variant="outline" onClick={handleReset}>
                Stop
              </Button>
            )}
          </div>
        </GlassCardContent>
      </GlassCard>
    )
  }

  // 5-4-3-2-1 technique
  const currentGroundingStep = groundingSteps[currentStep]
  const Icon = currentGroundingStep?.icon

  return (
    <GlassCard className={cn('max-w-md mx-auto', className)}>
      <GlassCardHeader>
        <GlassCardTitle>5-4-3-2-1 Grounding</GlassCardTitle>
        <GlassCardDescription>
          Use your senses to bring yourself to the present moment
        </GlassCardDescription>
      </GlassCardHeader>
      <GlassCardContent className="space-y-6">
        {!isActive ? (
          <div className="text-center space-y-4">
            <p className="text-muted-foreground">
              This exercise helps ground you in the present moment using your five senses.
            </p>
            <Button onClick={handleStart} className="bg-grounding hover:bg-grounding/90">
              <Leaf className="h-4 w-4 mr-2" />
              Start Grounding
            </Button>
          </div>
        ) : (
          <>
            {/* Progress indicator */}
            <div className="flex justify-center gap-2">
              {groundingSteps.map((step, index) => (
                <div
                  key={index}
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
                    index < currentStep && 'bg-grounding text-grounding-foreground',
                    index === currentStep && 'bg-grounding text-grounding-foreground ring-2 ring-grounding/50',
                    index > currentStep && 'bg-muted text-muted-foreground'
                  )}
                  aria-label={`Step ${index + 1}: ${step.sense}`}
                  aria-current={index === currentStep ? 'step' : undefined}
                >
                  {step.count}
                </div>
              ))}
            </div>

            {/* Current step */}
            <div className="text-center space-y-4 p-6 rounded-xl bg-grounding/5 border border-grounding/20">
              <div className="mx-auto w-16 h-16 rounded-full bg-grounding/10 flex items-center justify-center">
                {Icon && <Icon className="h-8 w-8 text-grounding" />}
              </div>
              <div>
                <p className="text-3xl font-bold text-grounding">
                  {currentGroundingStep.count} {currentGroundingStep.sense}
                </p>
                <p className="text-muted-foreground mt-2">
                  {currentGroundingStep.instruction}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-center gap-3">
              <Button variant="outline" onClick={handleReset}>
                Reset
              </Button>
              <Button onClick={handleNext} className="bg-grounding hover:bg-grounding/90">
                {currentStep < groundingSteps.length - 1 ? 'Next' : 'Complete'}
              </Button>
            </div>
          </>
        )}
      </GlassCardContent>
    </GlassCard>
  )
}
