"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useSentinel } from "@/hooks/use-sentinel";
import { SafetyBanner } from "@/components/uicare/SafetyBanner";
import { PanicButton } from "@/components/uicare/PanicButton";
import { BreakPrompt } from "@/components/uicare/BreakPrompt";
import { CrisisGate } from "@/components/uicare/CrisisGate";

// =============================================================================
// SAFETY SHELL - Main layout wrapper with TLC safety features
// =============================================================================

export interface SafetyShellProps {
  children: React.ReactNode;
  showSafetyBanner?: boolean;
  showPanicButton?: boolean;
  enableBreakPrompts?: boolean;
  enableCrisisGate?: boolean;
  crisisKeywords?: string[];
  className?: string;
}

export function SafetyShell({
  children,
  showSafetyBanner = true,
  showPanicButton = true,
  enableBreakPrompts = true,
  enableCrisisGate = true,
  crisisKeywords = [],
  className,
}: SafetyShellProps) {
  const sentinel = useSentinel();
  const [showBreakPrompt, setShowBreakPrompt] = React.useState(false);
  const [showCrisisGate, setShowCrisisGate] = React.useState(false);

  // Monitor for break recommendations
  React.useEffect(() => {
    if (enableBreakPrompts && sentinel.emotional.checkDue) {
      setShowBreakPrompt(true);
    }
  }, [enableBreakPrompts, sentinel.emotional.checkDue]);

  // Monitor for crisis state
  React.useEffect(() => {
    if (enableCrisisGate && sentinel.emotional.state === "crisis") {
      setShowCrisisGate(true);
    }
  }, [enableCrisisGate, sentinel.emotional.state]);

  const handlePanic = React.useCallback(() => {
    sentinel.human.escalate();
    setShowCrisisGate(true);
  }, [sentinel.human]);

  const handleBreakComplete = React.useCallback(() => {
    setShowBreakPrompt(false);
    sentinel.empirical.recordBreak();
    sentinel.emotional.recordState("neutral");
  }, [sentinel.empirical, sentinel.emotional]);

  const handleCrisisAcknowledge = React.useCallback(() => {
    setShowCrisisGate(false);
  }, []);

  return (
    <div
      className={cn(
        "relative min-h-screen",
        sentinel.cognitive.shouldSimplify && "zmux-simplified",
        className
      )}
      data-safety-level={sentinel.emotional.state}
      data-cognitive-load={sentinel.cognitive.loadLevel}
    >
      {/* Safety Banner */}
      {showSafetyBanner && (
        <SafetyBanner
          variant={sentinel.emotional.needsSupport ? "warning" : "info"}
          className="sticky top-0 z-50"
        />
      )}

      {/* Main Content */}
      <main className="relative">
        {children}
      </main>

      {/* Panic Button - Fixed Position */}
      {showPanicButton && (
        <div className="fixed bottom-6 right-6 z-50">
          <PanicButton onActivate={handlePanic} />
        </div>
      )}

      {/* Break Prompt Overlay */}
      {showBreakPrompt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <BreakPrompt
            onContinue={handleBreakComplete}
            onTakeBreak={() => {
              handleBreakComplete();
              // Could navigate to a grounding exercise
            }}
          />
        </div>
      )}

      {/* Crisis Gate Overlay */}
      {showCrisisGate && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-background/95 backdrop-blur-md">
          <CrisisGate
            onAcknowledge={handleCrisisAcknowledge}
            keywords={crisisKeywords}
          />
        </div>
      )}
    </div>
  );
}

// =============================================================================
// SANCTUARY CONTAINER - Padded, accessible content container
// =============================================================================

export interface SanctuaryContainerProps {
  children: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: "none" | "sm" | "md" | "lg";
  centered?: boolean;
  className?: string;
}

export function SanctuaryContainer({
  children,
  maxWidth = "lg",
  padding = "md",
  centered = true,
  className,
}: SanctuaryContainerProps) {
  const maxWidthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
    "2xl": "max-w-7xl",
    full: "max-w-full",
  };

  const paddingClasses = {
    none: "",
    sm: "px-4 py-4",
    md: "px-6 py-8",
    lg: "px-8 py-12",
  };

  return (
    <div
      className={cn(
        "w-full",
        maxWidthClasses[maxWidth],
        paddingClasses[padding],
        centered && "mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
}

// =============================================================================
// FOCUS REGION - Accessible region with focus management
// =============================================================================

export interface FocusRegionProps {
  children: React.ReactNode;
  label: string;
  role?: "region" | "main" | "complementary" | "navigation";
  trapFocus?: boolean;
  className?: string;
}

export function FocusRegion({
  children,
  label,
  role = "region",
  trapFocus = false,
  className,
}: FocusRegionProps) {
  const regionRef = React.useRef<HTMLDivElement>(null);

  // Focus trap implementation
  React.useEffect(() => {
    if (!trapFocus || !regionRef.current) return;

    const region = regionRef.current;
    const focusableElements = region.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    region.addEventListener("keydown", handleKeyDown);
    firstElement?.focus();

    return () => region.removeEventListener("keydown", handleKeyDown);
  }, [trapFocus]);

  return (
    <div
      ref={regionRef}
      role={role}
      aria-label={label}
      className={cn("outline-none", className)}
      tabIndex={-1}
    >
      {children}
    </div>
  );
}

// =============================================================================
// SKIP LINK - Accessibility skip navigation
// =============================================================================

export interface SkipLinkProps {
  href?: string;
  children?: React.ReactNode;
}

export function SkipLink({
  href = "#main-content",
  children = "Skip to main content",
}: SkipLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "sr-only focus:not-sr-only",
        "fixed top-4 left-4 z-[200]",
        "px-4 py-2 rounded-lg",
        "bg-sanctuary-gold text-sanctuary-gold-foreground",
        "font-medium text-sm",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      )}
    >
      {children}
    </a>
  );
}

export default SafetyShell;
