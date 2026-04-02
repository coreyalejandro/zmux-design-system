"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/glass/GlassCard";
import { Button } from "@/components/ui/button";
import {
  Check,
  X,
  Clock,
  User,
  MessageSquare,
  AlertTriangle,
} from "lucide-react";

// ============================================================================
// APPROVAL FLOW - BuildLattice Guard
// Multi-step approval workflow with human oversight
// ============================================================================

export type ApprovalStatus = "pending" | "approved" | "rejected" | "skipped";

export interface Approver {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
}

export interface ApprovalStep {
  id: string;
  title: string;
  description?: string;
  status: ApprovalStatus;
  approver?: Approver;
  approvedAt?: Date;
  comment?: string;
  required: boolean;
}

export interface ApprovalFlowProps {
  steps: ApprovalStep[];
  currentStepId?: string;
  onApprove?: (stepId: string, comment?: string) => void;
  onReject?: (stepId: string, comment: string) => void;
  onSkip?: (stepId: string) => void;
  className?: string;
}

const statusIcons: Record<ApprovalStatus, React.ReactNode> = {
  pending: <Clock className="w-4 h-4" />,
  approved: <Check className="w-4 h-4" />,
  rejected: <X className="w-4 h-4" />,
  skipped: <Clock className="w-4 h-4" />,
};

const statusColors: Record<ApprovalStatus, string> = {
  pending: "border-soul-gold bg-soul-gold/10 text-soul-gold",
  approved: "border-clinical-teal bg-clinical-teal/10 text-clinical-teal",
  rejected: "border-destructive bg-destructive/10 text-destructive",
  skipped: "border-muted bg-muted text-muted-foreground",
};

export function ApprovalFlow({
  steps,
  currentStepId,
  onApprove,
  onReject,
  onSkip,
  className,
}: ApprovalFlowProps) {
  const [activeComment, setActiveComment] = React.useState<string>("");
  const [commentStepId, setCommentStepId] = React.useState<string | null>(null);

  const handleApprove = (stepId: string) => {
    onApprove?.(stepId, activeComment || undefined);
    setActiveComment("");
    setCommentStepId(null);
  };

  const handleReject = (stepId: string) => {
    if (!activeComment.trim()) {
      setCommentStepId(stepId);
      return;
    }
    onReject?.(stepId, activeComment);
    setActiveComment("");
    setCommentStepId(null);
  };

  return (
    <div className={cn("space-y-4", className)} role="list" aria-label="Approval flow">
      {steps.map((step, index) => {
        const isCurrent = step.id === currentStepId;
        const isPast = steps.findIndex((s) => s.id === currentStepId) > index;

        return (
          <div
            key={step.id}
            className={cn(
              "relative pl-8",
              index < steps.length - 1 && "pb-4"
            )}
            role="listitem"
          >
            {/* Timeline connector */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "absolute left-3 top-8 w-0.5 h-full -ml-px",
                  isPast ? "bg-clinical-teal" : "bg-border"
                )}
                aria-hidden="true"
              />
            )}

            {/* Status indicator */}
            <div
              className={cn(
                "absolute left-0 w-6 h-6 rounded-full border-2 flex items-center justify-center",
                statusColors[step.status]
              )}
              aria-hidden="true"
            >
              {statusIcons[step.status]}
            </div>

            {/* Content */}
            <GlassCard
              variant={isCurrent ? "elevated" : "subtle"}
              className={cn(
                "transition-all",
                isCurrent && "ring-2 ring-soul-gold/50"
              )}
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h4 className="font-medium text-foreground flex items-center gap-2">
                    {step.title}
                    {step.required && (
                      <span className="text-xs text-destructive">(Required)</span>
                    )}
                  </h4>
                  {step.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {step.description}
                    </p>
                  )}
                </div>
                <span
                  className={cn(
                    "px-2 py-0.5 rounded text-xs font-medium",
                    statusColors[step.status]
                  )}
                >
                  {step.status}
                </span>
              </div>

              {/* Approver info */}
              {step.approver && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <User className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{step.approver.name}</span>
                  <span className="text-xs">({step.approver.role})</span>
                  {step.approvedAt && (
                    <span className="text-xs ml-auto">
                      {step.approvedAt.toLocaleDateString()}
                    </span>
                  )}
                </div>
              )}

              {/* Comment */}
              {step.comment && (
                <div className="p-2 rounded bg-muted/50 text-sm text-muted-foreground mb-2">
                  <MessageSquare className="w-3 h-3 inline mr-1.5" aria-hidden="true" />
                  {step.comment}
                </div>
              )}

              {/* Comment input for rejection */}
              {commentStepId === step.id && (
                <div className="mb-3">
                  <textarea
                    value={activeComment}
                    onChange={(e) => setActiveComment(e.target.value)}
                    placeholder="Please provide a reason for rejection..."
                    className="w-full p-2 rounded border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-clinical-teal"
                    rows={2}
                    aria-label="Rejection reason"
                  />
                  {!activeComment.trim() && (
                    <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      A comment is required for rejection
                    </p>
                  )}
                </div>
              )}

              {/* Actions */}
              {isCurrent && step.status === "pending" && (
                <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                  {onApprove && (
                    <Button
                      size="sm"
                      onClick={() => handleApprove(step.id)}
                      className="bg-clinical-teal hover:bg-clinical-teal/90 text-white"
                    >
                      <Check className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
                      Approve
                    </Button>
                  )}
                  {onReject && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleReject(step.id)}
                    >
                      <X className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
                      Reject
                    </Button>
                  )}
                  {onSkip && !step.required && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onSkip(step.id)}
                      className="text-muted-foreground"
                    >
                      Skip
                    </Button>
                  )}
                </div>
              )}
            </GlassCard>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================================
// APPROVAL SUMMARY - Quick overview of approval status
// ============================================================================

export interface ApprovalSummaryProps {
  steps: ApprovalStep[];
  className?: string;
}

export function ApprovalSummary({ steps, className }: ApprovalSummaryProps) {
  const approved = steps.filter((s) => s.status === "approved").length;
  const rejected = steps.filter((s) => s.status === "rejected").length;
  const pending = steps.filter((s) => s.status === "pending").length;

  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div className="flex items-center gap-1.5 text-sm">
        <span className="w-2 h-2 rounded-full bg-clinical-teal" />
        <span className="text-muted-foreground">{approved} approved</span>
      </div>
      <div className="flex items-center gap-1.5 text-sm">
        <span className="w-2 h-2 rounded-full bg-soul-gold" />
        <span className="text-muted-foreground">{pending} pending</span>
      </div>
      {rejected > 0 && (
        <div className="flex items-center gap-1.5 text-sm">
          <span className="w-2 h-2 rounded-full bg-destructive" />
          <span className="text-muted-foreground">{rejected} rejected</span>
        </div>
      )}
    </div>
  );
}
