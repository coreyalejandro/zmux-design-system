"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/glass/GlassCard";
import { Button } from "@/components/ui/button";
import {
  Database,
  Eye,
  Download,
  Trash2,
  Clock,
  MapPin,
  FileText,
  ChevronDown,
  ChevronUp,
  ExternalLink,
} from "lucide-react";

// ============================================================================
// DATA TRANSPARENCY - HumanGuard Article IV (Auditability)
// Shows users exactly what data is collected and how it's used
// ============================================================================

export interface DataCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  items: DataItem[];
  retentionPeriod?: string;
}

export interface DataItem {
  label: string;
  value: string | null;
  sensitive?: boolean;
  lastUpdated?: Date;
}

export interface DataTransparencyProps {
  categories: DataCategory[];
  onRequestDownload?: () => void;
  onRequestDeletion?: () => void;
  privacyPolicyUrl?: string;
  className?: string;
}

export function DataTransparency({
  categories,
  onRequestDownload,
  onRequestDeletion,
  privacyPolicyUrl,
  className,
}: DataTransparencyProps) {
  const [expandedCategories, setExpandedCategories] = React.useState<Set<string>>(
    new Set()
  );

  const toggleCategory = (id: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const totalItems = categories.reduce(
    (acc, cat) => acc + cat.items.filter((i) => i.value !== null).length,
    0
  );

  return (
    <GlassCard variant="default" className={cn("max-w-2xl w-full", className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-soul-gold/10">
            <Database className="w-6 h-6 text-soul-gold" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Your Data</h2>
            <p className="text-sm text-muted-foreground">
              {totalItems} data points collected
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {onRequestDownload && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRequestDownload}
              className="text-clinical-teal border-clinical-teal/30"
            >
              <Download className="w-4 h-4 mr-1" aria-hidden="true" />
              Export
            </Button>
          )}
          {onRequestDeletion && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRequestDeletion}
              className="text-destructive border-destructive/30"
            >
              <Trash2 className="w-4 h-4 mr-1" aria-hidden="true" />
              Delete All
            </Button>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3" role="list" aria-label="Data categories">
        {categories.map((category) => {
          const isExpanded = expandedCategories.has(category.id);
          const itemCount = category.items.filter((i) => i.value !== null).length;

          return (
            <div
              key={category.id}
              className="border border-border rounded-lg overflow-hidden"
              role="listitem"
            >
              <button
                onClick={() => toggleCategory(category.id)}
                className={cn(
                  "w-full p-4 flex items-center justify-between",
                  "hover:bg-muted/50 transition-colors text-left",
                  isExpanded && "bg-muted/30"
                )}
                aria-expanded={isExpanded}
                aria-controls={`category-${category.id}`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-background">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {itemCount} items
                      {category.retentionPeriod && (
                        <span className="mx-1">•</span>
                      )}
                      {category.retentionPeriod && (
                        <span>Kept for {category.retentionPeriod}</span>
                      )}
                    </p>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </button>

              {isExpanded && (
                <div
                  id={`category-${category.id}`}
                  className="px-4 pb-4 pt-2 border-t border-border/50"
                >
                  <p className="text-sm text-muted-foreground mb-3">
                    {category.description}
                  </p>
                  <div className="space-y-2">
                    {category.items.map((item, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          "flex items-center justify-between p-2 rounded",
                          item.sensitive
                            ? "bg-terracotta/5 border border-terracotta/20"
                            : "bg-muted/30"
                        )}
                      >
                        <span className="text-sm text-muted-foreground">
                          {item.label}
                          {item.sensitive && (
                            <span className="ml-2 text-xs text-terracotta">
                              (Sensitive)
                            </span>
                          )}
                        </span>
                        <span className="text-sm font-medium text-foreground">
                          {item.value || "Not collected"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      {privacyPolicyUrl && (
        <div className="mt-6 pt-4 border-t border-border/50 text-center">
          <a
            href={privacyPolicyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-clinical-teal hover:underline inline-flex items-center gap-1"
          >
            Read our full Privacy Policy
            <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </a>
        </div>
      )}
    </GlassCard>
  );
}

// ============================================================================
// Data Usage Indicator - Inline component showing data collection status
// ============================================================================

export interface DataUsageIndicatorProps {
  isCollecting: boolean;
  dataTypes?: string[];
  className?: string;
}

export function DataUsageIndicator({
  isCollecting,
  dataTypes = [],
  className,
}: DataUsageIndicatorProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs",
        isCollecting
          ? "bg-clinical-teal/10 text-clinical-teal"
          : "bg-muted text-muted-foreground",
        className
      )}
      role="status"
      aria-live="polite"
    >
      <Eye className="w-3 h-3" aria-hidden="true" />
      <span>
        {isCollecting
          ? `Collecting: ${dataTypes.join(", ") || "activity data"}`
          : "No data collection active"}
      </span>
    </div>
  );
}

// ============================================================================
// Default category icons helper
// ============================================================================

export const defaultCategoryIcons = {
  profile: <FileText className="w-4 h-4 text-soul-gold" />,
  location: <MapPin className="w-4 h-4 text-clinical-teal" />,
  activity: <Clock className="w-4 h-4 text-terracotta" />,
  preferences: <Eye className="w-4 h-4 text-muted-foreground" />,
};
