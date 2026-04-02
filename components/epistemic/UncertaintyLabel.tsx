"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle, AlertTriangle, Info } from "lucide-react";

// =============================================================================
// UNCERTAINTY LABEL - TLC Epistemic Guard Component
// Implements I1: Epistemic Safety - Clear uncertainty communication
// =============================================================================

export type UncertaintyLevel = "low" | "moderate" | "high" | "unknown";

export interface UncertaintyLabelProps {
  /** Level of uncertainty */
  level: UncertaintyLevel;
  /** Optional explanation */
  explanation?: string;
  /** Show tooltip on hover */
  showTooltip?: boolean;
  /** Display variant */
  variant?: "badge" | "inline" | "block";
  /** Size variant */
  size?: "sm" | "md" | "lg";
  className?: string;
}

const uncertaintyConfig: Record<
  UncertaintyLevel,
  {
    label: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    bgColor: string;
  }
> = {
  low: {
    label: "High confidence",
    description: "This information is well-established with strong supporting evidence.",
    icon: <Info className="w-3.5 h-3.5" />,
    color: "text-clinical-teal",
    bgColor: "bg-clinical-teal/10",
  },
  moderate: {
    label: "Some uncertainty",
    description: "This information has moderate evidence but may be subject to change.",
    icon: <HelpCircle className="w-3.5 h-3.5" />,
    color: "text-sanctuary-gold",
    bgColor: "bg-sanctuary-gold/10",
  },
  high: {
    label: "High uncertainty",
    description: "This information is preliminary or contested. Consider with caution.",
    icon: <AlertTriangle className="w-3.5 h-3.5" />,
    color: "text-sanctuary-terracotta",
    bgColor: "bg-sanctuary-terracotta/10",
  },
  unknown: {
    label: "Unknown certainty",
    description: "The certainty level of this information has not been assessed.",
    icon: <HelpCircle className="w-3.5 h-3.5" />,
    color: "text-muted-foreground",
    bgColor: "bg-muted/50",
  },
};

export function UncertaintyLabel({
  level,
  explanation,
  showTooltip = true,
  variant = "badge",
  size = "md",
  className,
}: UncertaintyLabelProps) {
  const config = uncertaintyConfig[level];

  const sizeClasses = {
    sm: "text-xs px-1.5 py-0.5 gap-1",
    md: "text-sm px-2 py-1 gap-1.5",
    lg: "text-base px-3 py-1.5 gap-2",
  };

  const content = (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        config.color,
        config.bgColor,
        variant === "inline" && "bg-transparent px-0",
        variant === "block" && "w-full justify-center rounded-lg",
        variant === "badge" && sizeClasses[size],
        className
      )}
    >
      {config.icon}
      <span>{config.label}</span>
    </span>
  );

  if (!showTooltip) {
    return content;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="font-medium">{config.label}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {explanation || config.description}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// =============================================================================
// CONFIDENCE METER - Visual confidence indicator
// =============================================================================

export interface ConfidenceMeterProps {
  /** Confidence percentage 0-100 */
  confidence: number;
  /** Show numeric value */
  showValue?: boolean;
  /** Label text */
  label?: string;
  /** Size variant */
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function ConfidenceMeter({
  confidence,
  showValue = true,
  label,
  size = "md",
  className,
}: ConfidenceMeterProps) {
  const clampedConfidence = Math.max(0, Math.min(100, confidence));

  const getColor = () => {
    if (clampedConfidence >= 80) return "bg-clinical-teal";
    if (clampedConfidence >= 50) return "bg-sanctuary-gold";
    return "bg-sanctuary-terracotta";
  };

  const heightClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  return (
    <div className={cn("space-y-1", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-xs">
          {label && <span className="text-muted-foreground">{label}</span>}
          {showValue && (
            <span className="font-medium tabular-nums">{clampedConfidence}%</span>
          )}
        </div>
      )}
      <div
        className={cn(
          "w-full bg-muted rounded-full overflow-hidden",
          heightClasses[size]
        )}
        role="progressbar"
        aria-valuenow={clampedConfidence}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || "Confidence level"}
      >
        <div
          className={cn("h-full rounded-full transition-all duration-300", getColor())}
          style={{ width: `${clampedConfidence}%` }}
        />
      </div>
    </div>
  );
}

export default UncertaintyLabel;
