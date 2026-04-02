'use client'

/**
 * ZMUX Design System - Glass Modal
 * 
 * Modal/dialog with glass morphism backdrop
 * Part of The Living Constitution (TLC) Design System
 * 
 * @invariant INVARIANT_VISUAL - Sanctuary glass aesthetic
 * @invariant INVARIANT_A11Y - Focus trap, escape key, aria-modal
 * @invariant INVARIANT_I2 - Exit always accessible
 */

import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const GlassModal = DialogPrimitive.Root

const GlassModalTrigger = DialogPrimitive.Trigger

const GlassModalPortal = DialogPrimitive.Portal

const GlassModalClose = DialogPrimitive.Close

const GlassModalOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50',
      'bg-charcoal/40 backdrop-blur-sm',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
  />
))
GlassModalOverlay.displayName = DialogPrimitive.Overlay.displayName

const glassModalContentVariants = cva(
  [
    'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
    'w-full max-h-[85vh] overflow-auto',
    'bg-[var(--glass-bg)] backdrop-blur-xl',
    'border border-[var(--glass-border)]',
    'shadow-[var(--glass-shadow)]',
    'rounded-2xl',
    'p-6',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    'data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]',
    'data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring',
  ].join(' '),
  {
    variants: {
      size: {
        sm: 'max-w-sm',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-[95vw]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface GlassModalContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof glassModalContentVariants> {
  showClose?: boolean
}

const GlassModalContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  GlassModalContentProps
>(({ className, children, size, showClose = true, ...props }, ref) => (
  <GlassModalPortal>
    <GlassModalOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(glassModalContentVariants({ size }), className)}
      {...props}
    >
      {children}
      {showClose && (
        <DialogPrimitive.Close
          className={cn(
            'absolute right-4 top-4 rounded-lg p-2',
            'opacity-70 ring-offset-background transition-opacity',
            'hover:opacity-100',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            'disabled:pointer-events-none',
            'data-[state=open]:bg-accent data-[state=open]:text-muted-foreground'
          )}
          aria-label="Close"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      )}
    </DialogPrimitive.Content>
  </GlassModalPortal>
))
GlassModalContent.displayName = DialogPrimitive.Content.displayName

const GlassModalHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col gap-1.5 text-center sm:text-left', className)}
    {...props}
  />
)
GlassModalHeader.displayName = 'GlassModalHeader'

const GlassModalFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6',
      className
    )}
    {...props}
  />
)
GlassModalFooter.displayName = 'GlassModalFooter'

const GlassModalTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-xl font-semibold leading-tight tracking-tight font-display', className)}
    {...props}
  />
))
GlassModalTitle.displayName = DialogPrimitive.Title.displayName

const GlassModalDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground leading-relaxed', className)}
    {...props}
  />
))
GlassModalDescription.displayName = DialogPrimitive.Description.displayName

export {
  GlassModal,
  GlassModalPortal,
  GlassModalOverlay,
  GlassModalTrigger,
  GlassModalClose,
  GlassModalContent,
  GlassModalHeader,
  GlassModalFooter,
  GlassModalTitle,
  GlassModalDescription,
  glassModalContentVariants,
}
