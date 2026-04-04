"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/glass";
import { 
  FileText, 
  Clock, 
  User, 
  Hash, 
  ChevronRight,
  Filter,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * TLC Control Plane - Evidence Ledger
 * 
 * Displays immutable evidence trail per PASS 8 requirements
 * All entries are cryptographically signed
 * 
 * @invariant INVARIANT_18 - All evidence persisted immutably
 */

export type EvidenceType = 
  | "verification" 
  | "action" 
  | "decision" 
  | "escalation" 
  | "rollback"
  | "approval"
  | "rejection";

export interface EvidenceEntry {
  id: string;
  timestamp: Date;
  type: EvidenceType;
  actor: string;
  actorType: "human" | "ai" | "system";
  action: string;
  details?: string;
  invariantsChecked?: string[];
  signature?: string;
  parentId?: string;
}

const typeStyles: Record<EvidenceType, { bg: string; text: string; label: string }> = {
  verification: { bg: "bg-green-500/10", text: "text-green-700", label: "Verification" },
  action: { bg: "bg-blue-500/10", text: "text-blue-700", label: "Action" },
  decision: { bg: "bg-purple-500/10", text: "text-purple-700", label: "Decision" },
  escalation: { bg: "bg-amber-500/10", text: "text-amber-700", label: "Escalation" },
  rollback: { bg: "bg-red-500/10", text: "text-red-700", label: "Rollback" },
  approval: { bg: "bg-green-500/10", text: "text-green-700", label: "Approval" },
  rejection: { bg: "bg-red-500/10", text: "text-red-700", label: "Rejection" },
};

const actorTypeStyles: Record<string, string> = {
  human: "bg-blue-500/10 text-blue-700",
  ai: "bg-purple-500/10 text-purple-700",
  system: "bg-slate-500/10 text-slate-700",
};

// Sample evidence entries
const sampleEvidence: EvidenceEntry[] = [
  {
    id: "ev-001",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    type: "verification",
    actor: "Topology Verifier",
    actorType: "system",
    action: "Dual-topology parity check passed",
    invariantsChecked: ["I16", "I24"],
    signature: "sha256:a1b2c3d4...",
  },
  {
    id: "ev-002",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    type: "action",
    actor: "AI Composer",
    actorType: "ai",
    action: "Generated governance/enforcement-map.json",
    details: "Mapped 37 invariants to UI components",
    invariantsChecked: ["I1", "I4", "I10"],
    signature: "sha256:e5f6g7h8...",
  },
  {
    id: "ev-003",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    type: "approval",
    actor: "Principal Architect",
    actorType: "human",
    action: "Approved C-RSP Build Contract",
    details: "TLC-CONTROL-PLANE-INIT-001",
    signature: "sha256:i9j0k1l2...",
  },
  {
    id: "ev-004",
    timestamp: new Date(Date.now() - 1000 * 60 * 45),
    type: "decision",
    actor: "BuildLattice Guard",
    actorType: "ai",
    action: "Selected Dual-Topology architecture",
    details: "Based on PASS 8 requirements and institutional verifier class",
    invariantsChecked: ["I16", "I17"],
    signature: "sha256:m3n4o5p6...",
  },
];

interface EvidenceCardProps {
  entry: EvidenceEntry;
  expanded?: boolean;
  onToggle?: () => void;
}

function EvidenceCard({ entry, expanded, onToggle }: EvidenceCardProps) {
  const typeStyle = typeStyles[entry.type];
  
  return (
    <div className="border border-border rounded-lg bg-card overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full p-4 text-left hover:bg-muted/30 transition-colors"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={cn("px-2 py-0.5 rounded text-xs font-medium", typeStyle.bg, typeStyle.text)}>
                  {typeStyle.label}
                </span>
                <span className={cn("px-2 py-0.5 rounded text-xs", actorTypeStyles[entry.actorType])}>
                  {entry.actorType}
                </span>
              </div>
              <p className="font-medium text-foreground mt-1 line-clamp-1">
                {entry.action}
              </p>
              <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {entry.actor}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {entry.timestamp.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
          <ChevronRight className={cn(
            "w-5 h-5 text-muted-foreground transition-transform flex-shrink-0",
            expanded && "rotate-90"
          )} />
        </div>
      </button>
      
      {expanded && (
        <div className="px-4 pb-4 pt-0 border-t border-border bg-muted/20">
          <div className="space-y-3 pt-4">
            {entry.details && (
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Details</p>
                <p className="text-sm text-foreground">{entry.details}</p>
              </div>
            )}
            
            {entry.invariantsChecked && entry.invariantsChecked.length > 0 && (
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Invariants Checked</p>
                <div className="flex flex-wrap gap-1">
                  {entry.invariantsChecked.map((inv) => (
                    <span 
                      key={inv}
                      className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-mono"
                    >
                      {inv}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {entry.signature && (
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">Signature</p>
                <div className="flex items-center gap-2">
                  <Hash className="w-3 h-3 text-muted-foreground" />
                  <code className="text-xs font-mono text-muted-foreground">
                    {entry.signature}
                  </code>
                </div>
              </div>
            )}
            
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">Entry ID</p>
              <code className="text-xs font-mono text-muted-foreground">{entry.id}</code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export interface EvidenceLedgerProps {
  entries?: EvidenceEntry[];
  title?: string;
  showFilters?: boolean;
  showExport?: boolean;
  className?: string;
}

export function EvidenceLedger({
  entries = sampleEvidence,
  title = "Evidence Ledger",
  showFilters = true,
  showExport = true,
  className,
}: EvidenceLedgerProps) {
  const [expandedId, setExpandedId] = React.useState<string | null>(null);
  const [typeFilter, setTypeFilter] = React.useState<EvidenceType | null>(null);

  const filteredEntries = React.useMemo(() => {
    if (!typeFilter) return entries;
    return entries.filter((e) => e.type === typeFilter);
  }, [entries, typeFilter]);

  const types = React.useMemo(() => {
    return Array.from(new Set(entries.map((e) => e.type)));
  }, [entries]);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">
            {entries.length} entries | Immutable audit trail
          </p>
        </div>
        {showExport && (
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        )}
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="flex flex-wrap gap-2">
          <Button
            variant={typeFilter === null ? "default" : "outline"}
            size="sm"
            onClick={() => setTypeFilter(null)}
          >
            All
          </Button>
          {types.map((type) => (
            <Button
              key={type}
              variant={typeFilter === type ? "default" : "outline"}
              size="sm"
              onClick={() => setTypeFilter(type)}
              className={typeFilter === type ? "" : typeStyles[type].text}
            >
              {typeStyles[type].label}
            </Button>
          ))}
        </div>
      )}

      {/* Entries */}
      <div className="space-y-3">
        {filteredEntries.map((entry) => (
          <EvidenceCard
            key={entry.id}
            entry={entry}
            expanded={expandedId === entry.id}
            onToggle={() => setExpandedId(expandedId === entry.id ? null : entry.id)}
          />
        ))}
        {filteredEntries.length === 0 && (
          <GlassCard className="text-center py-8">
            <p className="text-muted-foreground">No evidence entries found.</p>
          </GlassCard>
        )}
      </div>
    </div>
  );
}

export default EvidenceLedger;
