"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { PanicButton } from "@/components/uicare/PanicButton";
import { SessionTimer } from "@/components/uicare/SessionTimer";

// =============================================================================
// SANCTUARY LAYOUT - TLC Design System
// Main application layout with safety features built-in
// =============================================================================

export interface SanctuaryLayoutProps {
  children: React.ReactNode;
  /** Show the panic button */
  showPanicButton?: boolean;
  /** Show session timer */
  showSessionTimer?: boolean;
  /** Session duration in minutes */
  sessionDuration?: number;
  /** Callback when session ends */
  onSessionEnd?: () => void;
  /** Callback for panic button */
  onPanic?: () => void;
  /** Custom header content */
  header?: React.ReactNode;
  /** Custom footer content */
  footer?: React.ReactNode;
  /** Custom sidebar content */
  sidebar?: React.ReactNode;
  /** Sidebar position */
  sidebarPosition?: "left" | "right";
  /** Maximum content width */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  /** Add padding to content */
  padded?: boolean;
  className?: string;
}

const maxWidthClasses = {
  sm: "max-w-screen-sm",
  md: "max-w-screen-md",
  lg: "max-w-screen-lg",
  xl: "max-w-screen-xl",
  "2xl": "max-w-screen-2xl",
  full: "max-w-full",
};

export function SanctuaryLayout({
  children,
  showPanicButton = true,
  showSessionTimer = false,
  sessionDuration = 60,
  onSessionEnd,
  onPanic,
  header,
  footer,
  sidebar,
  sidebarPosition = "left",
  maxWidth = "xl",
  padded = true,
  className,
}: SanctuaryLayoutProps) {
  return (
    <div className={cn("min-h-screen flex flex-col bg-background", className)}>
      {/* Header */}
      {header && (
        <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
          <div
            className={cn(
              "mx-auto",
              maxWidthClasses[maxWidth],
              padded && "px-4 sm:px-6 lg:px-8"
            )}
          >
            {header}
          </div>
        </header>
      )}

      {/* Main content area */}
      <div className="flex-1 flex">
        {/* Sidebar (left) */}
        {sidebar && sidebarPosition === "left" && (
          <aside className="hidden lg:block w-64 shrink-0 border-r border-border/50 bg-muted/20">
            <div className="sticky top-16 p-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
              {sidebar}
            </div>
          </aside>
        )}

        {/* Main content */}
        <main className="flex-1">
          <div
            className={cn(
              "mx-auto",
              maxWidthClasses[maxWidth],
              padded && "px-4 sm:px-6 lg:px-8 py-6"
            )}
          >
            {children}
          </div>
        </main>

        {/* Sidebar (right) */}
        {sidebar && sidebarPosition === "right" && (
          <aside className="hidden lg:block w-64 shrink-0 border-l border-border/50 bg-muted/20">
            <div className="sticky top-16 p-4 overflow-y-auto max-h-[calc(100vh-4rem)]">
              {sidebar}
            </div>
          </aside>
        )}
      </div>

      {/* Footer */}
      {footer && (
        <footer className="border-t border-border/50 bg-muted/20">
          <div
            className={cn(
              "mx-auto",
              maxWidthClasses[maxWidth],
              padded && "px-4 sm:px-6 lg:px-8"
            )}
          >
            {footer}
          </div>
        </footer>
      )}

      {/* Safety features - always present */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-3">
        {showSessionTimer && (
          <SessionTimer
            warningThreshold={sessionDuration * 60 * 1000}
            onBreakSuggested={onSessionEnd}
          />
        )}
        {showPanicButton && <PanicButton onActivate={onPanic} />}
      </div>
    </div>
  );
}

export default SanctuaryLayout;
