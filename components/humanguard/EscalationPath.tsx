"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/glass";
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  MessageCircle, 
  Users, 
  AlertTriangle, 
  ExternalLink,
  ChevronRight,
  Heart
} from "lucide-react";

// =============================================================================
// ESCALATION PATH - TLC Article II (Human Guard) Compliant
// Implements I2: Human Safety - Clear paths to human support
// =============================================================================

export interface EscalationResource {
  id: string;
  name: string;
  description: string;
  type: "hotline" | "chat" | "community" | "professional" | "emergency";
  contact: string;
  available: string;
  icon?: React.ReactNode;
}

const defaultResources: EscalationResource[] = [
  {
    id: "988",
    name: "988 Suicide & Crisis Lifeline",
    description: "Free, confidential support 24/7",
    type: "hotline",
    contact: "988",
    available: "24/7",
  },
  {
    id: "crisis-text",
    name: "Crisis Text Line",
    description: "Text-based crisis support",
    type: "chat",
    contact: "Text HOME to 741741",
    available: "24/7",
  },
  {
    id: "emergency",
    name: "Emergency Services",
    description: "For immediate danger",
    type: "emergency",
    contact: "911",
    available: "24/7",
  },
];

export interface EscalationPathProps {
  resources?: EscalationResource[];
  urgencyLevel?: "low" | "medium" | "high" | "crisis";
  onResourceSelect?: (resource: EscalationResource) => void;
  showAllResources?: boolean;
  title?: string;
  description?: string;
  className?: string;
}

export function EscalationPath({
  resources = defaultResources,
  urgencyLevel = "medium",
  onResourceSelect,
  showAllResources = false,
  title = "Support Resources",
  description = "You are not alone. Help is available.",
  className,
}: EscalationPathProps) {
  const [expanded, setExpanded] = React.useState(showAllResources);

  const getTypeIcon = (type: EscalationResource["type"]) => {
    switch (type) {
      case "hotline":
        return <Phone className="w-4 h-4" />;
      case "chat":
        return <MessageCircle className="w-4 h-4" />;
      case "community":
        return <Users className="w-4 h-4" />;
      case "professional":
        return <Heart className="w-4 h-4" />;
      case "emergency":
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: EscalationResource["type"]) => {
    switch (type) {
      case "hotline":
        return "bg-sanctuary-teal/10 text-sanctuary-teal border-sanctuary-teal/20";
      case "chat":
        return "bg-sanctuary-gold/10 text-sanctuary-gold border-sanctuary-gold/20";
      case "community":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "professional":
        return "bg-sanctuary-terracotta/10 text-sanctuary-terracotta border-sanctuary-terracotta/20";
      case "emergency":
        return "bg-destructive/10 text-destructive border-destructive/20";
    }
  };

  const getUrgencyBorder = () => {
    switch (urgencyLevel) {
      case "low":
        return "border-border";
      case "medium":
        return "border-sanctuary-gold/30";
      case "high":
        return "border-amber-500/50";
      case "crisis":
        return "border-destructive/50 animate-pulse";
    }
  };

  // Sort resources by type priority for crisis situations
  const sortedResources = React.useMemo(() => {
    if (urgencyLevel === "crisis") {
      const priority = ["emergency", "hotline", "chat", "professional", "community"];
      return [...resources].sort(
        (a, b) => priority.indexOf(a.type) - priority.indexOf(b.type)
      );
    }
    return resources;
  }, [resources, urgencyLevel]);

  const displayedResources = expanded ? sortedResources : sortedResources.slice(0, 3);

  return (
    <GlassCard
      className={cn("border-2", getUrgencyBorder(), className)}
      role="region"
      aria-labelledby="escalation-title"
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div
          className={cn(
            "p-2 rounded-full",
            urgencyLevel === "crisis" ? "bg-destructive/10" : "bg-sanctuary-teal/10"
          )}
        >
          <Heart
            className={cn(
              "w-5 h-5",
              urgencyLevel === "crisis" ? "text-destructive" : "text-sanctuary-teal"
            )}
            aria-hidden="true"
          />
        </div>
        <div>
          <h2 id="escalation-title" className="font-semibold text-foreground">
            {title}
          </h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      {/* Resources */}
      <div className="space-y-2" role="list" aria-label="Support resources">
        {displayedResources.map((resource) => (
          <button
            key={resource.id}
            type="button"
            onClick={() => onResourceSelect?.(resource)}
            className={cn(
              "w-full p-3 rounded-lg border text-left transition-all",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "hover:shadow-md",
              getTypeColor(resource.type)
            )}
            role="listitem"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span aria-hidden="true">{resource.icon || getTypeIcon(resource.type)}</span>
                <div>
                  <span className="font-medium block">{resource.name}</span>
                  <span className="text-xs opacity-80">{resource.description}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono">{resource.contact}</span>
                <ExternalLink className="w-3 h-3 opacity-50" aria-hidden="true" />
              </div>
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs opacity-60">
              <span>Available: {resource.available}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Expand/Collapse */}
      {resources.length > 3 && !showAllResources && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="w-full mt-3"
        >
          {expanded ? "Show less" : `Show ${resources.length - 3} more resources`}
          <ChevronRight
            className={cn("w-4 h-4 ml-1 transition-transform", expanded && "rotate-90")}
            aria-hidden="true"
          />
        </Button>
      )}

      {/* Crisis Banner */}
      {urgencyLevel === "crisis" && (
        <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-sm text-destructive font-medium">
            If you&apos;re in immediate danger, please call 911
          </p>
        </div>
      )}
    </GlassCard>
  );
}

// =============================================================================
// ESCALATION BUTTON - Quick access to escalation path
// =============================================================================

export interface EscalationButtonProps {
  onClick: () => void;
  urgencyLevel?: "low" | "medium" | "high" | "crisis";
  label?: string;
  className?: string;
}

export function EscalationButton({
  onClick,
  urgencyLevel = "medium",
  label = "Get Support",
  className,
}: EscalationButtonProps) {
  const getButtonStyle = () => {
    switch (urgencyLevel) {
      case "low":
        return "bg-muted hover:bg-muted/80 text-muted-foreground";
      case "medium":
        return "bg-sanctuary-teal hover:bg-sanctuary-teal/90 text-white";
      case "high":
        return "bg-amber-500 hover:bg-amber-600 text-white";
      case "crisis":
        return "bg-destructive hover:bg-destructive/90 text-destructive-foreground animate-pulse";
    }
  };

  return (
    <Button onClick={onClick} className={cn(getButtonStyle(), className)}>
      <Heart className="w-4 h-4 mr-2" aria-hidden="true" />
      {label}
    </Button>
  );
}

export default EscalationPath;
