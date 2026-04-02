"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/glass/GlassCard";
import { Button } from "@/components/ui/button";
import {
  Shield,
  AlertTriangle,
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Scale,
} from "lucide-react";

// ============================================================================
// CLAIM CARD - EpistemicGuard I1 (Epistemic Safety)
// Displays claims with truth tier indicators and source citations
// ============================================================================

export type TruthTier = "T1" | "T2" | "T3" | "unknown";

export interface Source {
  id: string;
  title: string;
  url?: string;
  type: "peer-reviewed" | "institutional" | "news" | "user-generated" | "unknown";
  date?: string;
}

export interface ClaimCardProps {
  claim: string;
  truthTier: TruthTier;
  confidence?: number; // 0-100
  sources?: Source[];
  explanation?: string;
  onVerify?: () => void;
  onDispute?: () => void;
  className?: string;
}

const tierConfig: Record<TruthTier, { label: string; color: string; icon: React.ReactNode; description: string }> = {
  T1: {
    label: "Verified",
    color: "text-clinical-teal border-clinical-teal/50 bg-clinical-teal/10",
    icon: <Shield className="w-4 h-4" />,
    description: "Supported by peer-reviewed evidence or authoritative sources",
  },
  T2: {
    label: "Partially Verified",
    color: "text-soul-gold border-soul-gold/50 bg-soul-gold/10",
    icon: <Scale className="w-4 h-4" />,
    description: "Some supporting evidence, but requires additional verification",
  },
  T3: {
    label: "Unverified",
    color: "text-terracotta border-terracotta/50 bg-terracotta/10",
    icon: <AlertTriangle className="w-4 h-4" />,
    description: "Limited or no supporting evidence available",
  },
  unknown: {
    label: "Unknown",
    color: "text-muted-foreground border-border bg-muted/50",
    icon: <HelpCircle className="w-4 h-4" />,
    description: "Truth status has not been evaluated",
  },
};

const sourceTypeLabels: Record<Source["type"], string> = {
  "peer-reviewed": "Peer-Reviewed",
  institutional: "Institutional",
  news: "News",
  "user-generated": "User Content",
  unknown: "Unknown",
};

export function ClaimCard({
  claim,
  truthTier,
  confidence,
  sources = [],
  explanation,
  onVerify,
  onDispute,
  className,
}: ClaimCardProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const tier = tierConfig[truthTier];

  return (
    <GlassCard
      variant="default"
      className={cn("w-full", className)}
      role="article"
      aria-label={`Claim: ${claim}`}
    >
      {/* Truth Tier Badge */}
      <div className="flex items-center justify-between mb-3">
        <div
          className={cn(
            "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium",
            tier.color
          )}
          role="status"
          aria-label={`Truth tier: ${tier.label}`}
        >
          {tier.icon}
          <span>{tier.label}</span>
          {confidence !== undefined && (
            <span className="text-xs opacity-75">({confidence}%)</span>
          )}
        </div>
        {(sources.length > 0 || explanation) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-controls="claim-details"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        )}
      </div>

      {/* Claim Text */}
      <p className="text-foreground font-medium mb-2">{claim}</p>

      {/* Tier Description */}
      <p className="text-sm text-muted-foreground mb-3">{tier.description}</p>

      {/* Expanded Details */}
      {isExpanded && (
        <div id="claim-details" className="mt-4 pt-4 border-t border-border/50 space-y-4">
          {/* Explanation */}
          {explanation && (
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                Explanation
              </h4>
              <p className="text-sm text-muted-foreground">{explanation}</p>
            </div>
          )}

          {/* Sources */}
          {sources.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">
                Sources ({sources.length})
              </h4>
              <ul className="space-y-2" role="list">
                {sources.map((source) => (
                  <li
                    key={source.id}
                    className="flex items-start gap-2 p-2 rounded bg-muted/30"
                  >
                    <span className="text-xs px-2 py-0.5 rounded bg-background text-muted-foreground">
                      {sourceTypeLabels[source.type]}
                    </span>
                    <div className="flex-1 min-w-0">
                      {source.url ? (
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-clinical-teal hover:underline inline-flex items-center gap-1"
                        >
                          {source.title}
                          <ExternalLink className="w-3 h-3" aria-hidden="true" />
                        </a>
                      ) : (
                        <span className="text-sm text-foreground">{source.title}</span>
                      )}
                      {source.date && (
                        <span className="text-xs text-muted-foreground ml-2">
                          {source.date}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      {(onVerify || onDispute) && (
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
          {onVerify && (
            <Button variant="outline" size="sm" onClick={onVerify}>
              Request Verification
            </Button>
          )}
          {onDispute && (
            <Button variant="ghost" size="sm" onClick={onDispute} className="text-terracotta">
              Report Issue
            </Button>
          )}
        </div>
      )}
    </GlassCard>
  );
}

// ============================================================================
// TRUTH TIER BADGE - Inline indicator
// ============================================================================

export interface TruthTierBadgeProps {
  tier: TruthTier;
  showLabel?: boolean;
  size?: "sm" | "md";
  className?: string;
}

export function TruthTierBadge({
  tier,
  showLabel = true,
  size = "md",
  className,
}: TruthTierBadgeProps) {
  const config = tierConfig[tier];
  
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-medium",
        config.color,
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
        className
      )}
      role="status"
      aria-label={`Truth tier: ${config.label}`}
    >
      {React.cloneElement(config.icon as React.ReactElement, {
        className: size === "sm" ? "w-3 h-3" : "w-4 h-4",
      })}
      {showLabel && <span>{config.label}</span>}
    </span>
  );
}
