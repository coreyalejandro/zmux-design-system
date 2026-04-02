'use client'

/**
 * ZMUX Design System - Glass Surface
 * 
 * Generic glass morphism surface component
 * Part of The Living Constitution (TLC) Design System
 * 
 * @invariant INVARIANT_VISUAL - Sanctuary glass aesthetic
 * @invariant INVARIANT_A11Y - Respects high contrast mode (no blur)
 */

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const glassSurfaceVariants = cva(
  'transition-all duration-200',
  {
    variants: {
      blur: {
        none: '',
        sm: 'backdrop-blur-sm',
        md: 'backdrop-blur-md',
        lg: 'backdrop-blur-lg',
        xl: 'backdrop-blur-xl',
      },
      opacity: {
        subtle: 'bg-background/40',
        light: 'bg-background/60',
        medium: 'bg-background/70',
        heavy: 'bg-background/85',
        solid: 'bg-background',
      },
      border: {
        none: '',
        subtle: 'border border-border/30',
        default: 'border border-border/50',
        strong: 'border border-border',
      },
      rounded: {
        none: '',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        '2xl': 'rounded-2xl',
        full: 'rounded-full',
      },
      shadow: {
        none: '',
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg',
        glass: 'shadow-[var(--glass-shadow)]',
      },
    },
    defaultVariants: {
      blur: 'lg',
      opacity: 'medium',
      border: 'default',
      rounded: 'lg',
      shadow: 'glass',
    },
  }
)

export interface GlassSurfaceProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassSurfaceVariants> {
  as?: React.ElementType
}

const GlassSurface = React.forwardRef<HTMLDivElement, GlassSurfaceProps>(
  ({ className, blur, opacity, border, rounded, shadow, as: Component = 'div', ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(glassSurfaceVariants({ blur, opacity, border, rounded, shadow }), className)}
        {...props}
      />
    )
  }
)
GlassSurface.displayName = 'GlassSurface'

export { GlassSurface, glassSurfaceVariants }
