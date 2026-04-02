"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/glass";
import { Button } from "@/components/ui/button";
import { User, Bot, ArrowRight, Shield } from "lucide-react";

// =============================================================================
// HUMAN OVERRIDE - TLC Article II (Human Guard) Compliant
// Implements I2: Human Safety - Human can always override AI decisions
// =============================================================================

export interface HumanOverrideProps {
  aiDecision: string;
  aiReasoning?: string;
  onAccept: () => void;
  onOverride: (reason: string) => void;
  onRequestHuman?: () => void;
  overrideOptions?: string[];
  title?: string;
  className?: string;
}

export function HumanOverride({
  aiDecision,
  aiReasoning,
  onAccept,
  onOverride,
  onRequestHuman,
  overrideOptions = [],
  title = "AI Recommendation",
  className,
}: HumanOverrideProps) {
  const [showOverrideOptions, setShowOverrideOptions] = React.useState(false);
  const [customReason, setCustomReason] = React.useState("");

  const handleOverride = (reason: string) => {
    onOverride(reason);
    setShowOverrideOptions(false);
  };

  return (
    <GlassCard
      className={cn("max-w-md w-full", className)}
      role="dialog"
      aria-labelledby="override-title"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-full bg-sanctuary-teal/10">
          <Bot className="w-4 h-4 text-sanctuary-teal" aria-hidden="true" />
        </div>
        <h2 id="override-title" className="font-semibold text-foreground">
          {title}
        </h2>
      </div>

      {/* AI Decision */}
      <div className="p-4 bg-muted/30 rounded-lg mb-4 border border-border">
        <p className="text-sm font-medium text-foreground">{aiDecision}</p>
        {aiReasoning && (
          <p className="text-xs text-muted-foreground mt-2">
            <span className="font-medium">Reasoning:</span> {aiReasoning}
          </p>
        )}
      </div>

      {/* Override Options */}
      {showOverrideOptions ? (
        <div className="space-y-3 mb-4">
          <p className="text-sm font-medium text-foreground">Why are you overriding?</p>
          <div className="space-y-2">
            {overrideOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleOverride(option)}
                className={cn(
                  "w-full p-3 text-left rounded-lg border border-border",
                  "hover:border-sanctuary-gold/50 hover:bg-sanctuary-gold/5",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  "transition-colors text-sm"
                )}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              placeholder="Other reason..."
              className={cn(
                "flex-1 px-3 py-2 text-sm rounded-lg border border-border",
                "bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              )}
            />
            <Button
              size="sm"
              onClick={() => handleOverride(customReason)}
              disabled={!customReason.trim()}
            >
              Submit
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowOverrideOptions(false)}
            className="w-full"
          >
            Cancel
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          {/* Accept */}
          <Button
            onClick={onAccept}
            className="w-full bg-sanctuary-gold hover:bg-sanctuary-gold/90 text-sanctuary-gold-foreground"
          >
            <Bot className="w-4 h-4 mr-2" aria-hidden="true" />
            Accept AI Recommendation
            <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
          </Button>

          {/* Override */}
          <Button
            variant="outline"
            onClick={() => setShowOverrideOptions(true)}
            className="w-full"
          >
            <User className="w-4 h-4 mr-2" aria-hidden="true" />
            I want to override this
          </Button>

          {/* Request Human */}
          {onRequestHuman && (
            <Button variant="ghost" onClick={onRequestHuman} className="w-full">
              <Shield className="w-4 h-4 mr-2" aria-hidden="true" />
              Talk to a human instead
            </Button>
          )}
        </div>
      )}

      {/* Notice */}
      <p className="text-xs text-muted-foreground mt-4 text-center">
        You always have the right to override AI decisions
      </p>
    </GlassCard>
  );
}

export default HumanOverride;
