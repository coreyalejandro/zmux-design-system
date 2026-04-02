"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, HelpCircle, Info } from "lucide-react";

// ============================================================================
// UNCERTAINTY INDICATOR - EpistemicGuard I1 (Epistemic Safety)
// Displays confidence levels and uncertainty ranges
// ============================================================================

export type UncertaintyLevel = "high" | "medium" | "low" | "unknown";

export interface UncertaintyIndicatorProps {
  level: UncertaintyLevel;
  confidence?: number; // 0-100
  range?: { min: number; max: number };
  explanation?: string;
  variant?: "badge" | "bar" | "meter";
  showLabel?: boolean;
  className?: string;
}

const levelConfig: Record<UncertaintyLevel, { label: string; color: string; bgColor: string }> = {
  low: {
    label: "High Confidence",
    color: "text-clinical-teal",
    bgColor: "bg-clinical-teal",
  },
  medium: {
    label: "Moderate Confidence",
    color: "text-soul-gold",
    bgColor: "bg-soul-gold",
  },
  high: {
    label: "Low Confidence",
    color: "text-terracotta",
    bgColor: "bg-terracotta",
  },
  unknown: {
    label: "Unknown",
    color: "text-muted-foreground",
    bgColor: "bg-muted-foreground",
  },
};

export function UncertaintyIndicator({
  level,
  confidence,
  range,
  explanation,
  variant = "badge",
  showLabel = true,
  className,
}: UncertaintyIndicatorProps) {
  const config = levelConfig[level];

  if (variant === "bar") {
    return (
      <div className={cn("space-y-1", className)}>
        {showLabel && (
          <div className="flex items-center justify-between text-sm">
            <span className={config.color}>{config.label}</span>
            {confidence !== undefined && (
              <span className="text-muted-foreground">{confidence}%</span>
            )}
          </div>
        )}
        <div
          className="h-2 rounded-full bg-muted overflow-hidden"
          role="progressbar"
          aria-valuenow={confidence}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Confidence: ${confidence}%`}
        >
          <div
            className={cn("h-full rounded-full transition-all", config.bgColor)}
            style={{ width: `${confidence || 0}%` }}
          />
        </div>
        {range && (
          <p className="text-xs text-muted-foreground">
            Range: {range.min}% - {range.max}%
          </p>
        )}
      </div>
    );
  }

  if (variant === "meter") {
    return (
      <div
        className={cn("flex items-center gap-2", className)}
        role="meter"
        aria-valuenow={confidence}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Confidence: ${config.label}`}
      >
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => {
            const threshold = i * 20;
            const isFilled = (confidence || 0) >= threshold;
            return (
              <div
                key={i}
                className={cn(
                  "w-2 h-4 rounded-sm transition-colors",
                  isFilled ? config.bgColor : "bg-muted"
                )}
              />
            );
          })}
        </div>
        {showLabel && (
          <span className={cn("text-sm", config.color)}>{config.label}</span>
        )}
      </div>
    );
  }

  // Default: badge variant
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full",
        `${config.bgColor}/10`,
        className
      )}
      role="status"
      aria-label={`${config.label}${confidence !== undefined ? `: ${confidence}%` : ""}`}
    >
      {level === "unknown" ? (
        <HelpCircle className={cn("w-4 h-4", config.color)} aria-hidden="true" />
      ) : level === "high" ? (
        <AlertCircle className={cn("w-4 h-4", config.color)} aria-hidden="true" />
      ) : (
        <Info className={cn("w-4 h-4", config.color)} aria-hidden="true" />
      )}
      {showLabel && (
        <span className={cn("text-sm font-medium", config.color)}>
          {config.label}
          {confidence !== undefined && (
            <span className="ml-1 opacity-75">({confidence}%)</span>
          )}
        </span>
      )}
    </div>
  );
}

// ============================================================================
// CONFIDENCE RANGE - Shows uncertainty bounds
// ============================================================================

export interface ConfidenceRangeProps {
  value: number;
  min: number;
  max: number;
  unit?: string;
  label?: string;
  className?: string;
}

export function ConfidenceRange({
  value,
  min,
  max,
  unit = "",
  label,
  className,
}: ConfidenceRangeProps) {
  const range = max - min;
  const valuePosition = ((value - min) / range) * 100;
  const uncertainty = max - min;

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{label}</span>
          <span className="font-medium text-foreground">
            {value}{unit} <span className="text-muted-foreground">(±{(uncertainty / 2).toFixed(1)}{unit})</span>
          </span>
        </div>
      )}
      <div className="relative h-6">
        {/* Range bar */}
        <div className="absolute inset-y-2 left-0 right-0 bg-muted rounded-full" />
        
        {/* Uncertainty range */}
        <div
          className="absolute inset-y-2 bg-soul-gold/30 rounded-full"
          style={{
            left: `${((min - min) / range) * 100}%`,
            width: `${((max - min) / range) * 100}%`,
          }}
        />
        
        {/* Value marker */}
        <div
          className="absolute top-0 w-3 h-6 -ml-1.5"
          style={{ left: `${valuePosition}%` }}
        >
          <div className="w-3 h-3 rounded-full bg-clinical-teal border-2 border-background shadow" />
          <div className="w-0.5 h-3 bg-clinical-teal mx-auto" />
        </div>
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
}
