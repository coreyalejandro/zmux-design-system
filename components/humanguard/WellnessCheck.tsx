"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/glass";
import { Button } from "@/components/ui/button";
import { Heart, Sun, Cloud, CloudRain, Moon, Sparkles } from "lucide-react";

// =============================================================================
// WELLNESS CHECK - TLC Article II (Human Guard) Compliant
// Implements I5: Emotional Safety - Periodic wellness check-ins
// =============================================================================

export type WellnessLevel = "great" | "good" | "okay" | "struggling" | "crisis";

export interface WellnessOption {
  level: WellnessLevel;
  label: string;
  icon: React.ReactNode;
  description: string;
}

const defaultOptions: WellnessOption[] = [
  {
    level: "great",
    label: "Feeling great",
    icon: <Sparkles className="w-5 h-5" />,
    description: "Energized and positive",
  },
  {
    level: "good",
    label: "Doing well",
    icon: <Sun className="w-5 h-5" />,
    description: "Comfortable and focused",
  },
  {
    level: "okay",
    label: "I'm okay",
    icon: <Cloud className="w-5 h-5" />,
    description: "Managing, but could be better",
  },
  {
    level: "struggling",
    label: "Struggling today",
    icon: <CloudRain className="w-5 h-5" />,
    description: "Having a difficult time",
  },
  {
    level: "crisis",
    label: "Need support",
    icon: <Moon className="w-5 h-5" />,
    description: "Feeling overwhelmed",
  },
];

export interface WellnessCheckProps {
  onResponse: (level: WellnessLevel) => void;
  onSkip?: () => void;
  options?: WellnessOption[];
  title?: string;
  description?: string;
  allowSkip?: boolean;
  className?: string;
}

export function WellnessCheck({
  onResponse,
  onSkip,
  options = defaultOptions,
  title = "How are you feeling?",
  description = "Take a moment to check in with yourself",
  allowSkip = true,
  className,
}: WellnessCheckProps) {
  const [selected, setSelected] = React.useState<WellnessLevel | null>(null);
  const [confirmed, setConfirmed] = React.useState(false);

  const handleSelect = (level: WellnessLevel) => {
    setSelected(level);
    setConfirmed(false);
  };

  const handleConfirm = () => {
    if (selected) {
      setConfirmed(true);
      onResponse(selected);
    }
  };

  const getLevelColor = (level: WellnessLevel): string => {
    switch (level) {
      case "great":
        return "text-sanctuary-gold border-sanctuary-gold bg-sanctuary-gold/10";
      case "good":
        return "text-green-600 border-green-500 bg-green-500/10";
      case "okay":
        return "text-sanctuary-teal border-sanctuary-teal bg-sanctuary-teal/10";
      case "struggling":
        return "text-amber-600 border-amber-500 bg-amber-500/10";
      case "crisis":
        return "text-destructive border-destructive bg-destructive/10";
      default:
        return "text-foreground border-border bg-muted/50";
    }
  };

  return (
    <GlassCard
      className={cn("max-w-md w-full", className)}
      role="dialog"
      aria-labelledby="wellness-title"
      aria-describedby="wellness-description"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex p-3 rounded-full bg-sanctuary-terracotta/10 mb-3">
          <Heart className="w-6 h-6 text-sanctuary-terracotta" aria-hidden="true" />
        </div>
        <h2 id="wellness-title" className="text-lg font-semibold text-foreground">
          {title}
        </h2>
        <p id="wellness-description" className="text-sm text-muted-foreground mt-1">
          {description}
        </p>
      </div>

      {/* Options */}
      <div className="space-y-2 mb-6" role="radiogroup" aria-label="Wellness options">
        {options.map((option) => (
          <button
            key={option.level}
            type="button"
            role="radio"
            aria-checked={selected === option.level}
            onClick={() => handleSelect(option.level)}
            className={cn(
              "w-full p-4 rounded-lg border-2 transition-all text-left",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              selected === option.level
                ? getLevelColor(option.level)
                : "border-border hover:border-muted-foreground/30 bg-background/50"
            )}
          >
            <div className="flex items-center gap-3">
              <span
                className={cn(
                  "transition-colors",
                  selected === option.level ? "" : "text-muted-foreground"
                )}
                aria-hidden="true"
              >
                {option.icon}
              </span>
              <div>
                <span className="font-medium block">{option.label}</span>
                <span className="text-xs text-muted-foreground">{option.description}</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        {allowSkip && onSkip && (
          <Button variant="ghost" size="sm" onClick={onSkip}>
            Skip for now
          </Button>
        )}
        <Button
          onClick={handleConfirm}
          disabled={!selected || confirmed}
          className={cn(
            "ml-auto",
            "bg-sanctuary-gold hover:bg-sanctuary-gold/90 text-sanctuary-gold-foreground"
          )}
        >
          {confirmed ? "Thank you" : "Continue"}
        </Button>
      </div>

      {/* Crisis Warning */}
      {selected === "crisis" && !confirmed && (
        <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-sm text-destructive font-medium">
            If you&apos;re in crisis, please reach out:
          </p>
          <p className="text-sm text-destructive mt-1">
            988 Suicide & Crisis Lifeline: Call or text 988
          </p>
        </div>
      )}
    </GlassCard>
  );
}

// =============================================================================
// WELLNESS INDICATOR - Compact display of current wellness state
// =============================================================================

export interface WellnessIndicatorProps {
  level: WellnessLevel;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function WellnessIndicator({
  level,
  showLabel = false,
  size = "md",
  className,
}: WellnessIndicatorProps) {
  const getIcon = () => {
    const sizeClass = size === "sm" ? "w-3 h-3" : size === "lg" ? "w-6 h-6" : "w-4 h-4";
    switch (level) {
      case "great":
        return <Sparkles className={sizeClass} />;
      case "good":
        return <Sun className={sizeClass} />;
      case "okay":
        return <Cloud className={sizeClass} />;
      case "struggling":
        return <CloudRain className={sizeClass} />;
      case "crisis":
        return <Moon className={sizeClass} />;
    }
  };

  const getColor = () => {
    switch (level) {
      case "great":
        return "text-sanctuary-gold bg-sanctuary-gold/10";
      case "good":
        return "text-green-600 bg-green-500/10";
      case "okay":
        return "text-sanctuary-teal bg-sanctuary-teal/10";
      case "struggling":
        return "text-amber-600 bg-amber-500/10";
      case "crisis":
        return "text-destructive bg-destructive/10";
    }
  };

  const getLabel = () => {
    switch (level) {
      case "great":
        return "Feeling great";
      case "good":
        return "Doing well";
      case "okay":
        return "Okay";
      case "struggling":
        return "Struggling";
      case "crisis":
        return "Needs support";
    }
  };

  const padding = size === "sm" ? "p-1" : size === "lg" ? "p-3" : "p-2";

  return (
    <div
      className={cn("flex items-center gap-2", className)}
      role="status"
      aria-label={`Wellness level: ${getLabel()}`}
    >
      <span className={cn("rounded-full", padding, getColor())}>{getIcon()}</span>
      {showLabel && <span className="text-sm text-muted-foreground">{getLabel()}</span>}
    </div>
  );
}

export default WellnessCheck;
