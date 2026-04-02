"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/glass";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, ChevronRight, ChevronLeft, Check, AlertCircle } from "lucide-react";

// =============================================================================
// CONSENT FLOW - TLC Article II (Human Guard) Compliant
// Implements I3: Consent Safety - No action without informed consent
// =============================================================================

export interface ConsentStep {
  id: string;
  title: string;
  description: string;
  details?: string;
  required: boolean;
  dataTypes?: string[];
}

export interface ConsentFlowProps {
  steps: ConsentStep[];
  onComplete: (consents: Record<string, boolean>) => void;
  onCancel?: () => void;
  title?: string;
  description?: string;
  className?: string;
}

export function ConsentFlow({
  steps,
  onComplete,
  onCancel,
  title = "Before we continue",
  description = "Please review and consent to the following:",
  className,
}: ConsentFlowProps) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [consents, setConsents] = React.useState<Record<string, boolean>>({});
  const [showDetails, setShowDetails] = React.useState(false);

  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const canProceed = !step.required || consents[step.id];

  const handleConsent = (checked: boolean) => {
    setConsents((prev) => ({ ...prev, [step.id]: checked }));
  };

  const handleNext = () => {
    if (isLastStep) {
      onComplete(consents);
    } else {
      setCurrentStep((prev) => prev + 1);
      setShowDetails(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setShowDetails(false);
    }
  };

  return (
    <GlassCard
      className={cn("max-w-lg w-full", className)}
      role="dialog"
      aria-labelledby="consent-title"
      aria-describedby="consent-description"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-full bg-sanctuary-gold/10">
          <Shield className="w-5 h-5 text-sanctuary-gold" aria-hidden="true" />
        </div>
        <div>
          <h2 id="consent-title" className="text-lg font-semibold text-foreground">
            {title}
          </h2>
          <p id="consent-description" className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-1 mb-6" role="progressbar" aria-valuenow={currentStep + 1} aria-valuemin={1} aria-valuemax={steps.length}>
        {steps.map((s, i) => (
          <div
            key={s.id}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              i < currentStep
                ? "bg-sanctuary-gold"
                : i === currentStep
                ? "bg-sanctuary-gold/50"
                : "bg-border"
            )}
          />
        ))}
      </div>

      {/* Current Step */}
      <div className="space-y-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="pt-0.5">
            <Checkbox
              id={`consent-${step.id}`}
              checked={consents[step.id] || false}
              onCheckedChange={handleConsent}
              aria-describedby={`consent-${step.id}-description`}
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor={`consent-${step.id}`}
              className="text-sm font-medium text-foreground cursor-pointer flex items-center gap-2"
            >
              {step.title}
              {step.required && (
                <span className="text-xs text-destructive" aria-label="Required">
                  *Required
                </span>
              )}
            </label>
            <p id={`consent-${step.id}-description`} className="text-sm text-muted-foreground mt-1">
              {step.description}
            </p>
          </div>
        </div>

        {/* Data Types */}
        {step.dataTypes && step.dataTypes.length > 0 && (
          <div className="ml-7 p-3 bg-muted/50 rounded-lg">
            <p className="text-xs font-medium text-muted-foreground mb-2">
              Data involved:
            </p>
            <ul className="flex flex-wrap gap-2">
              {step.dataTypes.map((type) => (
                <li
                  key={type}
                  className="text-xs px-2 py-1 bg-background rounded border border-border"
                >
                  {type}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Details Toggle */}
        {step.details && (
          <div className="ml-7">
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="text-xs text-sanctuary-teal hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
            >
              {showDetails ? "Hide details" : "Show more details"}
            </button>
            {showDetails && (
              <p className="mt-2 text-xs text-muted-foreground p-3 bg-muted/30 rounded-lg">
                {step.details}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex gap-2">
          {currentStep > 0 ? (
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <ChevronLeft className="w-4 h-4 mr-1" aria-hidden="true" />
              Back
            </Button>
          ) : onCancel ? (
            <Button variant="ghost" size="sm" onClick={onCancel}>
              Cancel
            </Button>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </span>
          <Button
            size="sm"
            onClick={handleNext}
            disabled={!canProceed}
            className="bg-sanctuary-gold hover:bg-sanctuary-gold/90 text-sanctuary-gold-foreground"
          >
            {isLastStep ? (
              <>
                <Check className="w-4 h-4 mr-1" aria-hidden="true" />
                Confirm
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4 ml-1" aria-hidden="true" />
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Required Notice */}
      {step.required && !consents[step.id] && (
        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <AlertCircle className="w-3 h-3" aria-hidden="true" />
          <span>This consent is required to continue</span>
        </div>
      )}
    </GlassCard>
  );
}

// =============================================================================
// DATA TRANSPARENCY COMPONENT
// Shows exactly what data is collected and how it is used
// =============================================================================

export interface DataTransparencyProps {
  dataCategories: {
    category: string;
    items: {
      name: string;
      purpose: string;
      retention: string;
      shared: boolean;
    }[];
  }[];
  className?: string;
}

export function DataTransparency({ dataCategories, className }: DataTransparencyProps) {
  return (
    <GlassCard className={cn("", className)}>
      <div className="flex items-center gap-2 mb-4">
        <Shield className="w-5 h-5 text-sanctuary-teal" aria-hidden="true" />
        <h3 className="font-semibold text-foreground">Your Data Transparency</h3>
      </div>

      <div className="space-y-6">
        {dataCategories.map((category) => (
          <div key={category.category}>
            <h4 className="text-sm font-medium text-foreground mb-3">{category.category}</h4>
            <div className="space-y-2">
              {category.items.map((item) => (
                <div
                  key={item.name}
                  className="p-3 bg-muted/30 rounded-lg text-sm"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-foreground">{item.name}</span>
                    {item.shared ? (
                      <span className="text-xs px-2 py-0.5 bg-amber-500/10 text-amber-600 rounded">
                        Shared
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-0.5 bg-green-500/10 text-green-600 rounded">
                        Private
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{item.purpose}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Retained for: {item.retention}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

export default ConsentFlow;
