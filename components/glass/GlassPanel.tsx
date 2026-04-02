'use client'

/**
 * ZMUX Design System - Glass Panel
 * 
 * Sliding panel with glass morphism effect
 * Part of The Living Constitution (TLC) Design System
 * 
 * @invariant INVARIANT_VISUAL - Sanctuary glass aesthetic
 * @invariant INVARIANT_A11Y - Focus trap, escape key, screen reader support
 */

import * as React from 'react'
import * as SheetPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const GlassPanel = SheetPrimitive.Root

const GlassPanelTrigger = SheetPrimitive.Trigger

const GlassPanelClose = SheetPrimitive.Close

const GlassPanelPortal = SheetPrimitive.Portal

const GlassPanelOverlay = React.forwardRef<
  React.ComponentRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      'fixed inset-0 z-50',
      'bg-charcoal/40 backdrop-blur-sm',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
    ref={ref}
  />
))
GlassPanelOverlay.displayName = SheetPrimitive.Overlay.displayName

const glassPanelVariants = cva(
  [
    'fixed z-50 flex flex-col',
    'bg-[var(--glass-bg)] backdrop-blur-xl',
    'border-[var(--glass-border)]',
    'shadow-[var(--glass-shadow)]',
    'transition ease-in-out',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=closed]:duration-300 data-[state=open]:duration-500',
    'focus:outline-none',
  ].join(' '),
  {
    variants: {
      side: {
        top: [
          'inset-x-0 top-0 border-b',
          'data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        ].join(' '),
        bottom: [
          'inset-x-0 bottom-0 border-t',
          'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        ].join(' '),
        left: [
          'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
          'data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
        ].join(' '),
        right: [
          'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
          'data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
        ].join(' '),
      },
    },
    defaultVariants: {
      side: 'right',
    },
  }
)

interface GlassPanelContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof glassPanelVariants> {
  showClose?: boolean
}

const GlassPanelContent = React.forwardRef<
  React.ComponentRef<typeof SheetPrimitive.Content>,
  GlassPanelContentProps
>(({ side = 'right', className, children, showClose = true, ...props }, ref) => (
  <GlassPanelPortal>
    <GlassPanelOverlay />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(glassPanelVariants({ side }), className)}
      {...props}
    >
      <div className="flex flex-col h-full p-6 overflow-auto">
        {children}
      </div>
      {showClose && (
        <SheetPrimitive.Close
          className={cn(
            'absolute right-4 top-4 rounded-lg p-2',
            'opacity-70 ring-offset-background transition-opacity',
            'hover:opacity-100',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            'disabled:pointer-events-none',
          )}
          aria-label="Close"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </SheetPrimitive.Close>
      )}
    </SheetPrimitive.Content>
  </GlassPanelPortal>
))
GlassPanelContent.displayName = SheetPrimitive.Content.displayName

const GlassPanelHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col gap-1.5 text-left', className)}
    {...props}
  />
)
GlassPanelHeader.displayName = 'GlassPanelHeader'

const GlassPanelFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col gap-3 mt-auto pt-6', className)}
    {...props}
  />
)
GlassPanelFooter.displayName = 'GlassPanelFooter'

const GlassPanelTitle = React.forwardRef<
  React.ComponentRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn('text-xl font-semibold leading-tight tracking-tight font-display', className)}
    {...props}
  />
))
GlassPanelTitle.displayName = SheetPrimitive.Title.displayName

const GlassPanelDescription = React.forwardRef<
  React.ComponentRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground leading-relaxed', className)}
    {...props}
  />
))
GlassPanelDescription.displayName = SheetPrimitive.Description.displayName

export {
  GlassPanel,
  GlassPanelPortal,
  GlassPanelOverlay,
  GlassPanelTrigger,
  GlassPanelClose,
  GlassPanelContent,
  GlassPanelHeader,
  GlassPanelFooter,
  GlassPanelTitle,
  GlassPanelDescription,
  glassPanelVariants,
}
