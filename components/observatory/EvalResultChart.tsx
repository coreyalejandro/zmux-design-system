"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/glass";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Info,
  AlertTriangle,
} from "lucide-react";

// =============================================================================
// EVAL RESULT CHART - TLC Evidence Observatory Component
// Displays evaluation metrics and results visualization
// =============================================================================

export interface EvalMetric {
  id: string;
  label: string;
  value: number;
  maxValue?: number;
  unit?: string;
  trend?: "up" | "down" | "stable";
  trendValue?: number;
  status?: "good" | "warning" | "critical" | "neutral";
  description?: string;
}

export interface EvalResultChartProps {
  title?: string;
  description?: string;
  metrics: EvalMetric[];
  layout?: "grid" | "list" | "compact";
  showTrends?: boolean;
  className?: string;
}

const statusColors: Record<string, { bg: string; text: string; bar: string }> = {
  good: {
    bg: "bg-clinical-teal/10",
    text: "text-clinical-teal",
    bar: "bg-clinical-teal",
  },
  warning: {
    bg: "bg-sanctuary-gold/10",
    text: "text-sanctuary-gold",
    bar: "bg-sanctuary-gold",
  },
  critical: {
    bg: "bg-destructive/10",
    text: "text-destructive",
    bar: "bg-destructive",
  },
  neutral: {
    bg: "bg-muted/50",
    text: "text-muted-foreground",
    bar: "bg-muted-foreground",
  },
};

const trendIcons: Record<string, React.ReactNode> = {
  up: <TrendingUp className="w-3 h-3" />,
  down: <TrendingDown className="w-3 h-3" />,
  stable: <Minus className="w-3 h-3" />,
};

export function EvalResultChart({
  title,
  description,
  metrics,
  layout = "grid",
  showTrends = true,
  className,
}: EvalResultChartProps) {
  const getPercentage = (metric: EvalMetric) => {
    const max = metric.maxValue || 100;
    return Math.min(100, Math.max(0, (metric.value / max) * 100));
  };

  const renderMetricCard = (metric: EvalMetric) => {
    const colors = statusColors[metric.status || "neutral"];
    const percentage = getPercentage(metric);

    return (
      <div
        key={metric.id}
        className={cn(
          "p-4 rounded-lg border border-border/50",
          colors.bg
        )}
      >
        {/* Label & Info */}
        <div className="flex items-start justify-between mb-2">
          <span className="text-sm font-medium text-foreground">
            {metric.label}
          </span>
          {metric.description && (
            <button
              className="text-muted-foreground hover:text-foreground transition-colors"
              title={metric.description}
              aria-label={`Info: ${metric.description}`}
            >
              <Info className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Value */}
        <div className="flex items-baseline gap-1 mb-2">
          <span className={cn("text-2xl font-bold tabular-nums", colors.text)}>
            {metric.value.toLocaleString()}
          </span>
          {metric.unit && (
            <span className="text-sm text-muted-foreground">{metric.unit}</span>
          )}
          {metric.maxValue && (
            <span className="text-sm text-muted-foreground">
              / {metric.maxValue.toLocaleString()}
            </span>
          )}
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-background/50 rounded-full overflow-hidden mb-2">
          <div
            className={cn("h-full rounded-full transition-all", colors.bar)}
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={metric.value}
            aria-valuemin={0}
            aria-valuemax={metric.maxValue || 100}
          />
        </div>

        {/* Trend */}
        {showTrends && metric.trend && (
          <div className="flex items-center gap-1 text-xs">
            <span
              className={cn(
                metric.trend === "up" && "text-clinical-teal",
                metric.trend === "down" && "text-destructive",
                metric.trend === "stable" && "text-muted-foreground"
              )}
            >
              {trendIcons[metric.trend]}
            </span>
            {metric.trendValue !== undefined && (
              <span className="text-muted-foreground">
                {metric.trend === "up" ? "+" : metric.trend === "down" ? "-" : ""}
                {Math.abs(metric.trendValue)}% from previous
              </span>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderMetricList = (metric: EvalMetric) => {
    const colors = statusColors[metric.status || "neutral"];
    const percentage = getPercentage(metric);

    return (
      <div
        key={metric.id}
        className="flex items-center gap-4 py-3 border-b border-border/50 last:border-0"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground truncate">
              {metric.label}
            </span>
            {metric.status === "critical" && (
              <AlertTriangle className="w-3 h-3 text-destructive shrink-0" />
            )}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
              <div
                className={cn("h-full rounded-full", colors.bar)}
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className={cn("text-sm font-medium tabular-nums", colors.text)}>
              {metric.value}{metric.unit}
            </span>
          </div>
        </div>
        {showTrends && metric.trend && (
          <span
            className={cn(
              "text-xs",
              metric.trend === "up" && "text-clinical-teal",
              metric.trend === "down" && "text-destructive",
              metric.trend === "stable" && "text-muted-foreground"
            )}
          >
            {trendIcons[metric.trend]}
          </span>
        )}
      </div>
    );
  };

  const renderCompact = (metric: EvalMetric) => {
    const colors = statusColors[metric.status || "neutral"];

    return (
      <div
        key={metric.id}
        className={cn(
          "flex items-center justify-between p-2 rounded",
          colors.bg
        )}
      >
        <span className="text-xs text-muted-foreground">{metric.label}</span>
        <span className={cn("text-sm font-semibold tabular-nums", colors.text)}>
          {metric.value}{metric.unit}
        </span>
      </div>
    );
  };

  return (
    <GlassCard className={className}>
      {/* Header */}
      {(title || description) && (
        <div className="mb-4">
          {title && <h3 className="font-semibold text-foreground">{title}</h3>}
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      )}

      {/* Metrics */}
      {layout === "grid" && (
        <div className="grid grid-cols-2 gap-3">
          {metrics.map(renderMetricCard)}
        </div>
      )}

      {layout === "list" && (
        <div className="space-y-0">
          {metrics.map(renderMetricList)}
        </div>
      )}

      {layout === "compact" && (
        <div className="grid grid-cols-2 gap-2">
          {metrics.map(renderCompact)}
        </div>
      )}
    </GlassCard>
  );
}

export default EvalResultChart;
