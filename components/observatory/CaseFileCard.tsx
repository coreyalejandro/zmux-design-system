"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/glass";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Calendar,
  User,
  Tag,
  ChevronRight,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Pause,
} from "lucide-react";

// =============================================================================
// CASE FILE CARD - TLC Evidence Observatory Component
// For displaying case studies, evaluations, and research files
// =============================================================================

export type CaseStatus = "active" | "completed" | "paused" | "archived" | "flagged";

export interface CaseFileCardProps {
  /** Case identifier */
  id: string;
  /** Case title */
  title: string;
  /** Brief description */
  description?: string;
  /** Current status */
  status: CaseStatus;
  /** Case type/category */
  category?: string;
  /** Assigned researcher/reviewer */
  assignee?: string;
  /** Creation date */
  createdAt: Date;
  /** Last updated */
  updatedAt?: Date;
  /** Due date if applicable */
  dueDate?: Date;
  /** Tags for categorization */
  tags?: string[];
  /** Priority level */
  priority?: "low" | "medium" | "high" | "critical";
  /** Progress percentage */
  progress?: number;
  /** Click handler */
  onClick?: () => void;
  className?: string;
}

const statusConfig: Record<
  CaseStatus,
  { label: string; icon: React.ReactNode; color: string }
> = {
  active: {
    label: "Active",
    icon: <Clock className="w-3 h-3" />,
    color: "text-clinical-teal bg-clinical-teal/10 border-clinical-teal/30",
  },
  completed: {
    label: "Completed",
    icon: <CheckCircle2 className="w-3 h-3" />,
    color: "text-green-600 bg-green-500/10 border-green-500/30",
  },
  paused: {
    label: "Paused",
    icon: <Pause className="w-3 h-3" />,
    color: "text-sanctuary-gold bg-sanctuary-gold/10 border-sanctuary-gold/30",
  },
  archived: {
    label: "Archived",
    icon: <FileText className="w-3 h-3" />,
    color: "text-muted-foreground bg-muted/50 border-border",
  },
  flagged: {
    label: "Flagged",
    icon: <AlertCircle className="w-3 h-3" />,
    color: "text-destructive bg-destructive/10 border-destructive/30",
  },
};

const priorityColors: Record<string, string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-sanctuary-gold/10 text-sanctuary-gold",
  high: "bg-sanctuary-terracotta/10 text-sanctuary-terracotta",
  critical: "bg-destructive/10 text-destructive",
};

export function CaseFileCard({
  id,
  title,
  description,
  status,
  category,
  assignee,
  createdAt,
  updatedAt,
  dueDate,
  tags = [],
  priority,
  progress,
  onClick,
  className,
}: CaseFileCardProps) {
  const statusInfo = statusConfig[status];
  const isOverdue = dueDate && new Date() > dueDate && status === "active";

  return (
    <GlassCard
      className={cn(
        "group cursor-pointer transition-all hover:shadow-md",
        onClick && "hover:border-clinical-teal/30",
        className
      )}
      onClick={onClick}
      role="article"
      aria-label={`Case: ${title}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={cn("gap-1 text-xs", statusInfo.color)}
          >
            {statusInfo.icon}
            {statusInfo.label}
          </Badge>
          {priority && (
            <Badge variant="secondary" className={cn("text-xs", priorityColors[priority])}>
              {priority}
            </Badge>
          )}
        </div>
        <span className="text-xs text-muted-foreground font-mono">{id}</span>
      </div>

      {/* Title & Description */}
      <h3 className="font-semibold text-foreground mb-1 group-hover:text-clinical-teal transition-colors">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {description}
        </p>
      )}

      {/* Progress bar */}
      {progress !== undefined && (
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-clinical-teal rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground"
            >
              <Tag className="w-2.5 h-2.5" />
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="text-xs text-muted-foreground">
              +{tags.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Metadata */}
      <div className="flex items-center justify-between pt-3 border-t border-border/50 text-xs text-muted-foreground">
        <div className="flex items-center gap-3">
          {assignee && (
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              {assignee}
            </span>
          )}
          {category && (
            <span className="flex items-center gap-1">
              <FileText className="w-3 h-3" />
              {category}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {dueDate && (
            <span className={cn("flex items-center gap-1", isOverdue && "text-destructive")}>
              <Calendar className="w-3 h-3" />
              {dueDate.toLocaleDateString()}
              {isOverdue && " (Overdue)"}
            </span>
          )}
          {onClick && (
            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          )}
        </div>
      </div>
    </GlassCard>
  );
}

// =============================================================================
// CASE FILE LIST - Collection of case files
// =============================================================================

export interface CaseFileListProps {
  cases: CaseFileCardProps[];
  title?: string;
  emptyMessage?: string;
  className?: string;
}

export function CaseFileList({
  cases,
  title = "Cases",
  emptyMessage = "No cases found",
  className,
}: CaseFileListProps) {
  if (cases.length === 0) {
    return (
      <div className={cn("text-center py-8 text-muted-foreground", className)}>
        <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {title && (
        <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
          <FileText className="w-4 h-4" />
          {title} ({cases.length})
        </h3>
      )}
      <div className="space-y-3">
        {cases.map((caseFile) => (
          <CaseFileCard key={caseFile.id} {...caseFile} />
        ))}
      </div>
    </div>
  );
}

export default CaseFileCard;
