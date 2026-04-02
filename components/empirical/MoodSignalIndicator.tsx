"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/glass";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Activity,
  AlertTriangle
} from "lucide-react";

// =============================================================================
// MOOD SIGNAL INDICATOR - TLC Article V (Empirical Guard) Compliant
// Implements I6: Empirical Safety - Continuous monitoring of user state
// =============================================================================

export type MoodSignal = "calm" | "neutral" | "stressed" | "elevated" | "crisis";

export interface MoodSignalIndicatorProps {
  signal: MoodSignal;
  trend?: "improving" | "stable" | "declining";
  confidence?: number; // 0-100
  lastUpdated?: Date;
  showDetails?: boolean;
  onRequestBreak?: () => void;
  className?: string;
}

export function MoodSignalIndicator({
  signal,
  trend = "stable",
  confidence,
  lastUpdated,
  showDetails = false,
  onRequestBreak,
  className,
}: MoodSignalIndicatorProps) {
  const getSignalInfo = () => {
    switch (signal) {
      case "calm":
        return {
          label: "Calm",
          description: "Relaxed and centered",
          color: "text-green-600 bg-green-500/10 border-green-500/20",
          pulseColor: "bg-green-500",
        };
      case "neutral":
        return {
          label: "Neutral",
          description: "Balanced state",
          color: "text-sanctuary-teal bg-sanctuary-teal/10 border-sanctuary-teal/20",
          pulseColor: "bg-sanctuary-teal",
        };
      case "stressed":
        return {
          label: "Stressed",
          description: "Elevated tension detected",
          color: "text-amber-600 bg-amber-500/10 border-amber-500/20",
          pulseColor: "bg-amber-500",
        };
      case "elevated":
        return {
          label: "Elevated",
          description: "High activation state",
          color: "text-sanctuary-terracotta bg-sanctuary-terracotta/10 border-sanctuary-terracotta/20",
          pulseColor: "bg-sanctuary-terracotta",
        };
      case "crisis":
        return {
          label: "Crisis",
          description: "Immediate support recommended",
          color: "text-destructive bg-destructive/10 border-destructive/20",
          pulseColor: "bg-destructive",
        };
    }
  };

  const getTrendIcon = () => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="w-3 h-3 text-green-600" />;
      case "stable":
        return <Minus className="w-3 h-3 text-muted-foreground" />;
      case "declining":
        return <TrendingDown className="w-3 h-3 text-destructive" />;
    }
  };

  const signalInfo = getSignalInfo();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-2 rounded-lg border",
        signalInfo.color,
        className
      )}
      role="status"
      aria-label={`Mood signal: ${signalInfo.label}`}
    >
      {/* Pulse Indicator */}
      <span className="relative flex h-2.5 w-2.5">
        <span
          className={cn(
            "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
            signalInfo.pulseColor
          )}
        />
        <span
          className={cn(
            "relative inline-flex rounded-full h-2.5 w-2.5",
            signalInfo.pulseColor
          )}
        />
      </span>

      {/* Label */}
      <span className="text-sm font-medium">{signalInfo.label}</span>

      {/* Trend */}
      {getTrendIcon()}

      {/* Details */}
      {showDetails && (
        <>
          {confidence !== undefined && (
            <span className="text-xs opacity-60">{confidence}%</span>
          )}
          {signal === "crisis" && onRequestBreak && (
            <button
              type="button"
              onClick={onRequestBreak}
              className="ml-1 text-xs underline hover:no-underline"
            >
              Take a break
            </button>
          )}
        </>
      )}
    </div>
  );
}

// =============================================================================
// BEHAVIOR TIMELINE - Track mood changes over time
// =============================================================================

export interface TimelineEntry {
  timestamp: Date;
  signal: MoodSignal;
  event?: string;
  confidence?: number;
}

export interface BehaviorTimelineProps {
  entries: TimelineEntry[];
  maxEntries?: number;
  className?: string;
}

export function BehaviorTimeline({
  entries,
  maxEntries = 10,
  className,
}: BehaviorTimelineProps) {
  const displayedEntries = entries.slice(0, maxEntries);

  const getSignalColor = (signal: MoodSignal) => {
    switch (signal) {
      case "calm":
        return "bg-green-500";
      case "neutral":
        return "bg-sanctuary-teal";
      case "stressed":
        return "bg-amber-500";
      case "elevated":
        return "bg-sanctuary-terracotta";
      case "crisis":
        return "bg-destructive";
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <GlassCard className={cn("", className)}>
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-4 h-4 text-sanctuary-teal" aria-hidden="true" />
        <h3 className="font-semibold text-foreground">Session Timeline</h3>
      </div>

      <div className="space-y-3" role="list" aria-label="Mood timeline">
        {displayedEntries.map((entry, index) => (
          <div
            key={index}
            className="flex items-start gap-3"
            role="listitem"
          >
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "w-3 h-3 rounded-full",
                  getSignalColor(entry.signal)
                )}
                aria-hidden="true"
              />
              {index < displayedEntries.length - 1 && (
                <span className="w-0.5 h-6 bg-border mt-1" aria-hidden="true" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium text-foreground capitalize">
                  {entry.signal}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatTime(entry.timestamp)}
                </span>
              </div>
              {entry.event && (
                <p className="text-xs text-muted-foreground mt-0.5 truncate">
                  {entry.event}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {entries.length > maxEntries && (
        <p className="text-xs text-muted-foreground text-center mt-3">
          +{entries.length - maxEntries} more entries
        </p>
      )}
    </GlassCard>
  );
}

// =============================================================================
// SESSION HEALTH CARD - Overview of session wellness metrics
// =============================================================================

export interface SessionHealthCardProps {
  currentSignal: MoodSignal;
  sessionDuration: number; // minutes
  breaksCount: number;
  averageSignal: MoodSignal;
  alertsTriggered: number;
  className?: string;
}

export function SessionHealthCard({
  currentSignal,
  sessionDuration,
  breaksCount,
  averageSignal,
  alertsTriggered,
  className,
}: SessionHealthCardProps) {
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <GlassCard className={cn("", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Session Health</h3>
        <MoodSignalIndicator signal={currentSignal} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-muted/30 rounded-lg">
          <span className="text-xs text-muted-foreground block">Duration</span>
          <span className="text-lg font-semibold text-foreground">
            {formatDuration(sessionDuration)}
          </span>
        </div>
        <div className="p-3 bg-muted/30 rounded-lg">
          <span className="text-xs text-muted-foreground block">Breaks</span>
          <span className="text-lg font-semibold text-foreground">
            {breaksCount}
          </span>
        </div>
        <div className="p-3 bg-muted/30 rounded-lg">
          <span className="text-xs text-muted-foreground block">Average State</span>
          <span className="text-sm font-medium text-foreground capitalize">
            {averageSignal}
          </span>
        </div>
        <div className="p-3 bg-muted/30 rounded-lg">
          <span className="text-xs text-muted-foreground block">Alerts</span>
          <span className={cn(
            "text-lg font-semibold",
            alertsTriggered > 0 ? "text-amber-600" : "text-foreground"
          )}>
            {alertsTriggered}
          </span>
        </div>
      </div>

      {alertsTriggered > 2 && (
        <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600" aria-hidden="true" />
          <p className="text-xs text-amber-600">
            Consider taking a longer break to reset
          </p>
        </div>
      )}
    </GlassCard>
  );
}

export default MoodSignalIndicator;
