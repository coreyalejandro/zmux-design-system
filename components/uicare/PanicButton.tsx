'use client'

/**
 * ZMUX Design System - Panic Button
 * 
 * Quick-access emergency button for crisis situations
 * Part of The Living Constitution (TLC) Design System
 * 
 * @invariant INVARIANT_I2 - Human Safety: Emergency access ALWAYS available
 * @invariant INVARIANT_A11Y - Large touch target (48px+), high contrast
 */

import * as React from 'react'
import { Phone, Heart, AlertCircle } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const panicButtonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-bold rounded-full',
    'transition-all duration-200',
    'focus:outline-none focus:ring-4',
    'shadow-lg hover:shadow-xl',
    'min-h-[48px] min-w-[48px]',
  ].join(' '),
  {
    variants: {
      variant: {
        default: [
          'bg-danger text-danger-foreground',
          'hover:bg-danger/90',
          'focus:ring-danger/50',
        ].join(' '),
        outline: [
          'border-2 border-danger text-danger',
          'hover:bg-danger hover:text-danger-foreground',
          'focus:ring-danger/50',
        ].join(' '),
        subtle: [
          'bg-danger/10 text-danger',
          'hover:bg-danger/20',
          'focus:ring-danger/30',
        ].join(' '),
      },
      size: {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
        icon: 'p-3',
        'icon-lg': 'p-4',
      },
      position: {
        inline: '',
        fixed: 'fixed bottom-4 right-4 z-[9999]',
        'fixed-left': 'fixed bottom-4 left-4 z-[9999]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      position: 'inline',
    },
  }
)

export interface PanicButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof panicButtonVariants> {
  icon?: 'phone' | 'heart' | 'alert' | React.ReactNode
  showLabel?: boolean
  label?: string
  phoneNumber?: string
  pulse?: boolean
}

const iconMap = {
  phone: Phone,
  heart: Heart,
  alert: AlertCircle,
}

export function PanicButton({
  className,
  variant,
  size,
  position,
  icon = 'phone',
  showLabel = true,
  label = 'Get Help',
  phoneNumber = '988',
  pulse = false,
  onClick,
  ...props
}: PanicButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (phoneNumber) {
      window.location.href = `tel:${phoneNumber}`
    }
    onClick?.(e)
  }

  const IconComponent = typeof icon === 'string' ? iconMap[icon] : null
  const iconElement = IconComponent ? (
    <IconComponent className={cn('h-5 w-5', size === 'lg' && 'h-6 w-6')} aria-hidden="true" />
  ) : (
    icon
  )

  const isIconOnly = size === 'icon' || size === 'icon-lg'

  return (
    <button
      type="button"
      className={cn(
        panicButtonVariants({ variant, size, position }),
        pulse && 'animate-pulse',
        className
      )}
      onClick={handleClick}
      aria-label={isIconOnly ? label : undefined}
      {...props}
    >
      {iconElement}
      {showLabel && !isIconOnly && <span>{label}</span>}
    </button>
  )
}
