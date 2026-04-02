'use client'

/**
 * ZMUX Design System - Crisis Gate
 * 
 * Always-visible crisis resources and emergency contact information
 * Part of The Living Constitution (TLC) Design System
 * 
 * @invariant INVARIANT_I2 - Human Safety: Crisis resources ALWAYS visible
 * @invariant INVARIANT_A11Y - High contrast, large touch targets
 */

import * as React from 'react'
import { Phone, MessageCircle, ExternalLink, Heart, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { GlassCard, GlassCardContent, GlassCardHeader, GlassCardTitle } from '@/components/glass/GlassCard'

export interface CrisisResource {
  name: string
  description?: string
  phone?: string
  sms?: string
  chat?: string
  url?: string
  available?: string
}

export interface CrisisGateProps {
  resources?: CrisisResource[]
  className?: string
  variant?: 'minimal' | 'full' | 'floating'
  onResourceAccess?: (resource: CrisisResource, method: 'phone' | 'sms' | 'chat' | 'url') => void
  allowDismiss?: boolean
  onDismiss?: () => void
}

const defaultResources: CrisisResource[] = [
  {
    name: '988 Suicide & Crisis Lifeline',
    description: 'Free, confidential support 24/7',
    phone: '988',
    sms: '988',
    chat: 'https://988lifeline.org/chat',
    available: '24/7',
  },
  {
    name: 'Crisis Text Line',
    description: 'Text HOME to 741741',
    sms: '741741',
    available: '24/7',
  },
  {
    name: 'SAMHSA National Helpline',
    description: 'Treatment referral service',
    phone: '1-800-662-4357',
    available: '24/7',
  },
]

export function CrisisGate({
  resources = defaultResources,
  className,
  variant = 'full',
  onResourceAccess,
  allowDismiss = false,
  onDismiss,
}: CrisisGateProps) {
  const handleAccess = (resource: CrisisResource, method: 'phone' | 'sms' | 'chat' | 'url') => {
    onResourceAccess?.(resource, method)
  }

  if (variant === 'minimal') {
    return (
      <div
        className={cn(
          'flex items-center gap-4 px-4 py-3',
          'bg-danger/10 border border-danger/30 rounded-lg',
          className
        )}
        role="region"
        aria-label="Crisis resources"
      >
        <Heart className="h-5 w-5 text-danger flex-shrink-0" aria-hidden="true" />
        <p className="text-sm font-medium">
          Need immediate help?{' '}
          <a
            href="tel:988"
            className="underline font-bold text-danger hover:text-danger/80"
            onClick={() => handleAccess(defaultResources[0], 'phone')}
          >
            Call 988
          </a>{' '}
          or{' '}
          <a
            href="sms:741741?body=HOME"
            className="underline font-bold text-danger hover:text-danger/80"
            onClick={() => handleAccess(defaultResources[1], 'sms')}
          >
            Text HOME to 741741
          </a>
        </p>
      </div>
    )
  }

  if (variant === 'floating') {
    return (
      <div
        className={cn(
          'fixed bottom-4 right-4 z-[9999]',
          'max-w-sm',
          className
        )}
        role="region"
        aria-label="Crisis resources"
      >
        <GlassCard className="border-danger/30 bg-danger/5">
          <GlassCardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-danger" aria-hidden="true" />
                <GlassCardTitle className="text-base">Need Support?</GlassCardTitle>
              </div>
              {allowDismiss && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={onDismiss}
                  aria-label="Dismiss crisis resources"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </GlassCardHeader>
          <GlassCardContent className="space-y-2">
            <a
              href="tel:988"
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg',
                'bg-danger text-danger-foreground',
                'hover:bg-danger/90 transition-colors',
                'font-semibold'
              )}
              onClick={() => handleAccess(defaultResources[0], 'phone')}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call 988
            </a>
            <a
              href="sms:741741?body=HOME"
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg',
                'bg-muted hover:bg-muted/80 transition-colors',
                'font-medium'
              )}
              onClick={() => handleAccess(defaultResources[1], 'sms')}
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Text HOME to 741741
            </a>
          </GlassCardContent>
        </GlassCard>
      </div>
    )
  }

  // Full variant
  return (
    <div
      className={cn('space-y-4', className)}
      role="region"
      aria-label="Crisis resources"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-danger/10">
          <Heart className="h-6 w-6 text-danger" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-xl font-semibold font-display">You Are Not Alone</h2>
          <p className="text-muted-foreground">
            Free, confidential support is available 24/7
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource, index) => (
          <GlassCard key={index} className="border-border/50">
            <GlassCardHeader className="pb-2">
              <GlassCardTitle className="text-base">{resource.name}</GlassCardTitle>
              {resource.description && (
                <p className="text-sm text-muted-foreground">{resource.description}</p>
              )}
              {resource.available && (
                <span className="inline-flex items-center text-xs text-verified font-medium">
                  Available {resource.available}
                </span>
              )}
            </GlassCardHeader>
            <GlassCardContent className="flex flex-wrap gap-2">
              {resource.phone && (
                <Button
                  asChild
                  variant="default"
                  size="sm"
                  className="bg-danger hover:bg-danger/90 text-danger-foreground"
                  onClick={() => handleAccess(resource, 'phone')}
                >
                  <a href={`tel:${resource.phone}`}>
                    <Phone className="h-4 w-4 mr-1.5" aria-hidden="true" />
                    {resource.phone}
                  </a>
                </Button>
              )}
              {resource.sms && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  onClick={() => handleAccess(resource, 'sms')}
                >
                  <a href={`sms:${resource.sms}?body=HOME`}>
                    <MessageCircle className="h-4 w-4 mr-1.5" aria-hidden="true" />
                    Text
                  </a>
                </Button>
              )}
              {resource.chat && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  onClick={() => handleAccess(resource, 'chat')}
                >
                  <a href={resource.chat} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-1.5" aria-hidden="true" />
                    Chat
                  </a>
                </Button>
              )}
              {resource.url && !resource.chat && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  onClick={() => handleAccess(resource, 'url')}
                >
                  <a href={resource.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-1.5" aria-hidden="true" />
                    Visit
                  </a>
                </Button>
              )}
            </GlassCardContent>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
