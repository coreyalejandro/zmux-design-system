"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/glass/GlassCard";
import {
  MousePointer,
  Type,
  Timer,
  Pause,
  RotateCcw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ============================================================================
// BEHAVIOR TIMELINE - EmpiricalGuard I6 (Empirical Safety)
// Tracks and displays user interaction patterns over time
// ============================================================================

export type BehaviorType = "click" | "type" | "dwell" | "pause" | "undo" | "custom";

export interface BehaviorEvent {
  id: string;
  type: BehaviorType;
  timestamp: Date;
  duration?: number; // milliseconds
  target?: string;
  metadata?: Record<string, unknown>;
}

export interface BehaviorTimelineProps {
  events: BehaviorEvent[];
  maxVisible?: number;
  showTimestamps?: boolean;
  groupByMinute?: boolean;
  onEventClick?: (event: BehaviorEvent) => void;
  className?: string;
}

const behaviorIcons: Record<BehaviorType, React.ReactNode> = {
  click: <MousePointer className="w-3 h-3" />,
  type: <Type className="w-3 h-3" />,
  dwell: <Timer className="w-3 h-3" />,
  pause: <Pause className="w-3 h-3" />,
  undo: <RotateCcw className="w-3 h-3" />,
  custom: <MousePointer className="w-3 h-3" />,
};

const behaviorLabels: Record<BehaviorType, string> = {
  click: "Click",
  type: "Typing",
  dwell: "Viewing",
  pause: "Paused",
  undo: "Undo",
  custom: "Action",
};

const behaviorColors: Record<BehaviorType, string> = {
  click: "bg-clinical-teal text-clinical-teal",
  type: "bg-soul-gold text-soul-gold",
  dwell: "bg-muted-foreground text-muted-foreground",
  pause: "bg-terracotta text-terracotta",
  undo: "bg-destructive text-destructive",
  custom: "bg-muted-foreground text-muted-foreground",
};

export function BehaviorTimeline({
  events,
  maxVisible = 20,
  showTimestamps = true,
  groupByMinute = false,
  onEventClick,
  className,
}: BehaviorTimelineProps) {
  const [expanded, setExpanded] = React.useState(false);

  const displayEvents = expanded ? events : events.slice(0, maxVisible);
  const hasMore = events.length > maxVisible;

  const formatDuration = (ms: number): string => {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
    return `${Math.floor(ms / 60000)}m ${Math.floor((ms % 60000) / 1000)}s`;
  };

  const groupedEvents = React.useMemo(() => {
    if (!groupByMinute) return null;

    const groups: Map<string, BehaviorEvent[]> = new Map();
    events.forEach((event) => {
      const key = event.timestamp.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(event);
    });
    return groups;
  }, [events, groupByMinute]);

  if (groupByMinute && groupedEvents) {
    return (
      <div className={cn("space-y-3", className)}>
        {Array.from(groupedEvents.entries()).map(([timeKey, groupEvents]) => (
          <div key={timeKey}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-muted-foreground">
                {timeKey}
              </span>
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">
                {groupEvents.length} events
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {groupEvents.map((event) => {
                const colors = behaviorColors[event.type];
                return (
                  <button
                    key={event.id}
                    onClick={() => onEventClick?.(event)}
                    className={cn(
                      "inline-flex items-center gap-1 px-2 py-1 rounded text-xs",
                      `${colors.split(" ")[0]}/10`,
                      colors.split(" ")[1],
                      onEventClick && "hover:opacity-80 cursor-pointer"
                    )}
                    title={`${behaviorLabels[event.type]}${
                      event.target ? ` - ${event.target}` : ""
                    }`}
                  >
                    {behaviorIcons[event.type]}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("space-y-1", className)} role="list" aria-label="Behavior timeline">
      {displayEvents.map((event, index) => {
        const colors = behaviorColors[event.type];
        return (
          <div
            key={event.id}
            className={cn(
              "flex items-center gap-2 p-2 rounded-lg transition-colors",
              onEventClick && "hover:bg-muted/50 cursor-pointer"
            )}
            onClick={() => onEventClick?.(event)}
            role="listitem"
          >
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <span
                className={cn(
                  "flex items-center justify-center w-6 h-6 rounded",
                  `${colors.split(" ")[0]}/10`
                )}
              >
                <span className={colors.split(" ")[1]}>{behaviorIcons[event.type]}</span>
              </span>
              <span className="text-sm font-medium text-foreground">
                {behaviorLabels[event.type]}
              </span>
              {event.target && (
                <span className="text-xs text-muted-foreground truncate">
                  {event.target}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {event.duration !== undefined && (
                <span>{formatDuration(event.duration)}</span>
              )}
              {showTimestamps && (
                <span>
                  {event.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </span>
              )}
            </div>
          </div>
        );
      })}

      {hasMore && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="w-full text-muted-foreground"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-4 h-4 mr-1" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4 mr-1" />
              Show {events.length - maxVisible} more
            </>
          )}
        </Button>
      )}
    </div>
  );
}

// ============================================================================
// BEHAVIOR SUMMARY - Aggregated behavior stats
// ============================================================================

export interface BehaviorSummaryProps {
  events: BehaviorEvent[];
  timeRange?: { start: Date; end: Date };
  className?: string;
}

export function BehaviorSummary({
  events,
  timeRange,
  className,
}: BehaviorSummaryProps) {
  const stats = React.useMemo(() => {
    const typeCounts: Record<BehaviorType, number> = {
      click: 0,
      type: 0,
      dwell: 0,
      pause: 0,
      undo: 0,
      custom: 0,
    };

    let totalDuration = 0;
    events.forEach((event) => {
      typeCounts[event.type]++;
      if (event.duration) totalDuration += event.duration;
    });

    return {
      typeCounts,
      totalDuration,
      totalEvents: events.length,
    };
  }, [events]);

  return (
    <GlassCard variant="subtle" className={cn("p-4", className)}>
      <h4 className="text-sm font-medium text-foreground mb-3">Activity Summary</h4>
      <div className="grid grid-cols-3 gap-3">
        {Object.entries(stats.typeCounts)
          .filter(([, count]) => count > 0)
          .map(([type, count]) => {
            const colors = behaviorColors[type as BehaviorType];
            return (
              <div
                key={type}
                className="flex items-center gap-2 p-2 rounded bg-muted/30"
              >
                <span className={colors.split(" ")[1]}>
                  {behaviorIcons[type as BehaviorType]}
                </span>
                <div>
                  <span className="text-lg font-semibold text-foreground">
                    {count}
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">
                    {behaviorLabels[type as BehaviorType]}
                  </span>
                </div>
              </div>
            );
          })}
      </div>
      {timeRange && (
        <p className="text-xs text-muted-foreground mt-3">
          {timeRange.start.toLocaleDateString()} - {timeRange.end.toLocaleDateString()}
        </p>
      )}
    </GlassCard>
  );
}
