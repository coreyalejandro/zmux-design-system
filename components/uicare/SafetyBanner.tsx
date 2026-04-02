'use client'

/**
 * ZMUX Design System - Safety Banner
 * 
 * Alert banner for safety-critical information
 * Part of The Living Constitution (TLC) Design System
 * 
 * @invariant INVARIANT_I2 - Human Safety: Important alerts visible
 * @invariant INVARIANT_A11Y - High contrast, screen reader announcements
 */

import * as React from 'react'
import { AlertTriangle, Info, CheckCircle, XCircle, X } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const safetyBannerVariants = cva(
  [
    'w-full px-4 py-3 flex items-start gap-3',
    'border-b',
  ].join(' '),
  {
    variants: {
      variant: {
        info: 'bg-[var(--mood-calm-bg)] text-[var(--mood-calm)] border-[var(--mood-calm)]',
        warning: 'bg-[var(--caution-background)] text-[var(--caution-foreground)] border-[var(--caution)]',
        danger: 'bg-[var(--danger-background)] text-[var(--danger-foreground)] border-[var(--danger)]',
        success: 'bg-[var(--verified-background)] text-[var(--verified-foreground)] border-[var(--verified)]',
        grounding: 'bg-[var(--grounding-background)] text-[var(--grounding)] border-[var(--grounding)]',
      },
      position: {
        top: 'fixed top-0 left-0 right-0 z-50',
        inline: '',
      },
    },
    defaultVariants: {
      variant: 'info',
      position: 'inline',
    },
  }
)

const icons = {
  info: Info,
  warning: AlertTriangle,
  danger: XCircle,
  success: CheckCircle,
  grounding: Info,
}

export interface SafetyBannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof safetyBannerVariants> {
  title?: string
  dismissible?: boolean
  onDismiss?: () => void
  action?: {
    label: string
    onClick: () => void
  }
  icon?: React.ReactNode
}

export function SafetyBanner({
  className,
  variant = 'info',
  position,
  title,
  children,
  dismissible = false,
  onDismiss,
  action,
  icon,
  ...props
}: SafetyBannerProps) {
  const [isVisible, setIsVisible] = React.useState(true)

  const handleDismiss = () => {
    setIsVisible(false)
    onDismiss?.()
  }

  if (!isVisible) return null

  const Icon = icon ? null : icons[variant || 'info']

  return (
    <div
      className={cn(safetyBannerVariants({ variant, position }), className)}
      role="alert"
      aria-live={variant === 'danger' ? 'assertive' : 'polite'}
      {...props}
    >
      <div className="flex-shrink-0 mt-0.5">
        {icon || (Icon && <Icon className="h-5 w-5" aria-hidden="true" />)}
      </div>
      
      <div className="flex-1 min-w-0">
        {title && (
          <p className="font-semibold text-sm">{title}</p>
        )}
        <div className="text-sm leading-relaxed">
          {children}
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {action && (
          <Button
            variant="outline"
            size="sm"
            onClick={action.onClick}
            className="text-current border-current/30 hover:bg-current/10"
          >
            {action.label}
          </Button>
        )}
        
        {dismissible && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="h-8 w-8 p-0 hover:bg-current/10"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
