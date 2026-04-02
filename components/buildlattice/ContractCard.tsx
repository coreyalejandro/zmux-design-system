"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/glass";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  User,
  Bot
} from "lucide-react";

// =============================================================================
// CONTRACT CARD - BuildLattice Guard Component
// Displays C-RSP build contracts with approval status
// =============================================================================

export type ContractStatus = "draft" | "pending" | "approved" | "rejected" | "in-progress" | "completed";

export interface ContractPhase {
  id: string;
  name: string;
  status: ContractStatus;
  description?: string;
}

export interface ContractCardProps {
  id: string;
  title: string;
  version: string;
  status: ContractStatus;
  author?: string;
  authorType?: "human" | "ai" | "collaborative";
  phases?: ContractPhase[];
  createdAt?: Date;
  updatedAt?: Date;
  onApprove?: () => void;
  onReject?: () => void;
  onViewDetails?: () => void;
  className?: string;
}

export function ContractCard({
  id,
  title,
  version,
  status,
  author,
  authorType = "collaborative",
  phases = [],
  createdAt,
  updatedAt,
  onApprove,
  onReject,
  onViewDetails,
  className,
}: ContractCardProps) {
  const [showPhases, setShowPhases] = React.useState(false);

  const getStatusInfo = () => {
    switch (status) {
      case "draft":
        return {
          label: "Draft",
          icon: <FileText className="w-4 h-4" />,
          color: "text-muted-foreground bg-muted/50",
        };
      case "pending":
        return {
          label: "Pending Approval",
          icon: <Clock className="w-4 h-4" />,
          color: "text-sanctuary-gold bg-sanctuary-gold/10",
        };
      case "approved":
        return {
          label: "Approved",
          icon: <CheckCircle2 className="w-4 h-4" />,
          color: "text-green-600 bg-green-500/10",
        };
      case "rejected":
        return {
          label: "Rejected",
          icon: <AlertCircle className="w-4 h-4" />,
          color: "text-destructive bg-destructive/10",
        };
      case "in-progress":
        return {
          label: "In Progress",
          icon: <Clock className="w-4 h-4 animate-pulse" />,
          color: "text-sanctuary-teal bg-sanctuary-teal/10",
        };
      case "completed":
        return {
          label: "Completed",
          icon: <CheckCircle2 className="w-4 h-4" />,
          color: "text-green-600 bg-green-500/10",
        };
    }
  };

  const getAuthorIcon = () => {
    switch (authorType) {
      case "human":
        return <User className="w-3 h-3" />;
      case "ai":
        return <Bot className="w-3 h-3" />;
      case "collaborative":
        return (
          <span className="flex -space-x-1">
            <User className="w-3 h-3" />
            <Bot className="w-3 h-3" />
          </span>
        );
    }
  };

  const statusInfo = getStatusInfo();
  const completedPhases = phases.filter((p) => p.status === "completed").length;
  const progress = phases.length > 0 ? (completedPhases / phases.length) * 100 : 0;

  return (
    <GlassCard className={cn("", className)}>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-4 h-4 text-sanctuary-gold" aria-hidden="true" />
            <h3 className="font-semibold text-foreground">{title}</h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-mono">v{version}</span>
            <span>•</span>
            <span className="font-mono">{id}</span>
          </div>
        </div>
        <div
          className={cn(
            "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
            statusInfo.color
          )}
        >
          {statusInfo.icon}
          {statusInfo.label}
        </div>
      </div>

      {/* Author */}
      {author && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          {getAuthorIcon()}
          <span>{author}</span>
          {createdAt && (
            <>
              <span>•</span>
              <span>Created {createdAt.toLocaleDateString()}</span>
            </>
          )}
        </div>
      )}

      {/* Progress */}
      {phases.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-foreground">
              {completedPhases}/{phases.length} phases
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-sanctuary-gold transition-all duration-300"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      )}

      {/* Phases */}
      {phases.length > 0 && (
        <div className="border-t border-border pt-3">
          <button
            type="button"
            onClick={() => setShowPhases(!showPhases)}
            className={cn(
              "flex items-center justify-between w-full text-xs font-medium text-muted-foreground",
              "hover:text-foreground transition-colors",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
            )}
          >
            <span>Phases</span>
            {showPhases ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {showPhases && (
            <ul className="mt-3 space-y-2" role="list">
              {phases.map((phase, index) => (
                <li
                  key={phase.id}
                  className="flex items-center gap-2 text-xs"
                >
                  <span
                    className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium",
                      phase.status === "completed"
                        ? "bg-green-500/10 text-green-600"
                        : phase.status === "in-progress"
                        ? "bg-sanctuary-teal/10 text-sanctuary-teal"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {phase.status === "completed" ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      index + 1
                    )}
                  </span>
                  <span
                    className={cn(
                      phase.status === "completed"
                        ? "text-muted-foreground line-through"
                        : phase.status === "in-progress"
                        ? "text-foreground font-medium"
                        : "text-muted-foreground"
                    )}
                  >
                    {phase.name}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Actions */}
      {(onApprove || onReject || onViewDetails) && (
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border">
          {status === "pending" && onApprove && (
            <Button
              size="sm"
              onClick={onApprove}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <CheckCircle2 className="w-4 h-4 mr-1" aria-hidden="true" />
              Approve
            </Button>
          )}
          {status === "pending" && onReject && (
            <Button variant="outline" size="sm" onClick={onReject}>
              Reject
            </Button>
          )}
          {onViewDetails && (
            <Button variant="ghost" size="sm" onClick={onViewDetails} className="ml-auto">
              View Details
              <ExternalLink className="w-3 h-3 ml-1" aria-hidden="true" />
            </Button>
          )}
        </div>
      )}
    </GlassCard>
  );
}

export default ContractCard;
