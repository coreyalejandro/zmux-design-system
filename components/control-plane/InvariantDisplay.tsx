"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/glass";
import { 
  Shield, 
  Check, 
  X, 
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * TLC Control Plane - Invariant Display
 * 
 * Displays the 37 Core Invariants from invariant-registry.json
 * Maps UI logic to governance requirements
 * 
 * @invariant All 37 invariants must be visible and verifiable
 */

export type InvariantStatus = "enforced" | "warning" | "violated" | "pending";

export interface Invariant {
  id: string;
  name: string;
  description: string;
  category: string;
  status: InvariantStatus;
  lastVerified?: Date;
  violations?: number;
}

// The 37 Core TLC Invariants (abbreviated for display)
export const TLC_INVARIANTS: Invariant[] = [
  { id: "I1", name: "Epistemic Safety", description: "All claims must be truth-graded (T1/T2/T3)", category: "Safety", status: "enforced" },
  { id: "I2", name: "Human Override", description: "Humans can always override AI decisions", category: "Safety", status: "enforced" },
  { id: "I3", name: "Consent Gate", description: "Explicit consent required before data processing", category: "Privacy", status: "enforced" },
  { id: "I4", name: "Lower-Level Isolation", description: "Backend must execute within restricted jail namespace", category: "Security", status: "enforced" },
  { id: "I5", name: "Emotional Safety", description: "Monitor and protect user emotional state", category: "Safety", status: "enforced" },
  { id: "I6", name: "Empirical Grounding", description: "Decisions backed by observable evidence", category: "Evidence", status: "enforced" },
  { id: "I7", name: "Transparency", description: "All AI actions must be explainable", category: "Governance", status: "enforced" },
  { id: "I8", name: "Audit Trail", description: "All actions logged immutably", category: "Evidence", status: "enforced" },
  { id: "I9", name: "Right to Delete", description: "Users can request complete data deletion", category: "Privacy", status: "enforced" },
  { id: "I10", name: "External Halt", description: "System halts if STATUS.json is QUARANTINE/OFF", category: "Security", status: "enforced" },
  { id: "I11", name: "Crisis Resources", description: "Crisis hotlines always accessible", category: "Safety", status: "enforced" },
  { id: "I12", name: "Session Limits", description: "Enforce healthy session durations", category: "Wellness", status: "enforced" },
  { id: "I13", name: "Cognitive Load", description: "Monitor and reduce cognitive burden", category: "Wellness", status: "enforced" },
  { id: "I14", name: "Accessibility", description: "WCAG 2.2 AAA compliance", category: "Accessibility", status: "enforced" },
  { id: "I15", name: "Reduced Motion", description: "Respect prefers-reduced-motion", category: "Accessibility", status: "enforced" },
  { id: "I16", name: "Dual Topology", description: "Integrated and standalone paths maintain parity", category: "Architecture", status: "enforced" },
  { id: "I17", name: "Version Control", description: "All changes tracked in VCS", category: "Governance", status: "enforced" },
  { id: "I18", name: "Evidence Ledger", description: "All evidence persisted immutably", category: "Evidence", status: "enforced" },
  { id: "I19", name: "Regression Prevention", description: "No regression on verified invariants", category: "Quality", status: "enforced" },
  { id: "I20", name: "Tip State Policy", description: "Latest state always recoverable", category: "Architecture", status: "enforced" },
  { id: "I21", name: "Review Escalation", description: "Human review for critical decisions", category: "Governance", status: "enforced" },
  { id: "I22", name: "Sandbox Execution", description: "All code runs in sandboxed environment", category: "Security", status: "enforced" },
  { id: "I23", name: "No OS Imports", description: "No os/subprocess imports in sandboxed code", category: "Security", status: "enforced" },
  { id: "I24", name: "Cryptographic Identity", description: "Dual topology paths have crypto parity", category: "Security", status: "enforced" },
  { id: "I25", name: "CI Read-Only", description: "CI checks are read-only against inventory", category: "Governance", status: "enforced" },
  { id: "I26", name: "Schema Validation", description: "All data validated against schemas", category: "Quality", status: "enforced" },
  { id: "I27", name: "Error Recovery", description: "Graceful degradation on errors", category: "Reliability", status: "enforced" },
  { id: "I28", name: "Rollback Capability", description: "System can rollback to known-good state", category: "Reliability", status: "enforced" },
  { id: "I29", name: "Rate Limiting", description: "Prevent abuse via rate limits", category: "Security", status: "enforced" },
  { id: "I30", name: "Input Sanitization", description: "All inputs sanitized before processing", category: "Security", status: "enforced" },
  { id: "I31", name: "Output Encoding", description: "All outputs properly encoded", category: "Security", status: "enforced" },
  { id: "I32", name: "Session Security", description: "Secure session management", category: "Security", status: "enforced" },
  { id: "I33", name: "Data Minimization", description: "Collect only necessary data", category: "Privacy", status: "enforced" },
  { id: "I34", name: "Purpose Limitation", description: "Data used only for stated purpose", category: "Privacy", status: "enforced" },
  { id: "I35", name: "Storage Limitation", description: "Data retained only as needed", category: "Privacy", status: "enforced" },
  { id: "I36", name: "Accountability", description: "Clear ownership of all components", category: "Governance", status: "enforced" },
  { id: "I37", name: "Continuous Monitoring", description: "Real-time system health monitoring", category: "Reliability", status: "enforced" },
];

const statusColors: Record<InvariantStatus, string> = {
  enforced: "text-green-600 bg-green-500/10",
  warning: "text-amber-600 bg-amber-500/10",
  violated: "text-red-600 bg-red-500/10",
  pending: "text-muted-foreground bg-muted",
};

const statusIcons: Record<InvariantStatus, React.ReactNode> = {
  enforced: <Check className="w-4 h-4" />,
  warning: <AlertTriangle className="w-4 h-4" />,
  violated: <X className="w-4 h-4" />,
  pending: <Shield className="w-4 h-4" />,
};

const categoryColors: Record<string, string> = {
  Safety: "bg-red-500/10 text-red-700",
  Security: "bg-amber-500/10 text-amber-700",
  Privacy: "bg-purple-500/10 text-purple-700",
  Governance: "bg-blue-500/10 text-blue-700",
  Evidence: "bg-green-500/10 text-green-700",
  Wellness: "bg-teal-500/10 text-teal-700",
  Accessibility: "bg-indigo-500/10 text-indigo-700",
  Architecture: "bg-slate-500/10 text-slate-700",
  Quality: "bg-cyan-500/10 text-cyan-700",
  Reliability: "bg-orange-500/10 text-orange-700",
};

export interface InvariantCardProps {
  invariant: Invariant;
  expanded?: boolean;
  onToggle?: () => void;
  className?: string;
}

export function InvariantCard({ invariant, expanded, onToggle, className }: InvariantCardProps) {
  return (
    <div
      className={cn(
        "p-3 rounded-lg border border-border bg-card transition-colors",
        "hover:bg-muted/30",
        className
      )}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left"
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-3">
          <span 
            className={cn(
              "inline-flex items-center justify-center w-8 h-8 rounded-lg",
              statusColors[invariant.status]
            )}
          >
            {statusIcons[invariant.status]}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground">{invariant.id}</span>
              <span className="font-medium text-foreground">{invariant.name}</span>
            </div>
            <span className={cn("text-xs px-1.5 py-0.5 rounded", categoryColors[invariant.category] || "bg-muted")}>
              {invariant.category}
            </span>
          </div>
        </div>
        {expanded !== undefined && (
          expanded ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />
        )}
      </button>
      
      {expanded && (
        <div className="mt-3 pt-3 border-t border-border">
          <p className="text-sm text-muted-foreground">{invariant.description}</p>
          {invariant.lastVerified && (
            <p className="text-xs text-muted-foreground mt-2">
              Last verified: {invariant.lastVerified.toLocaleString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export interface InvariantDisplayProps {
  invariants?: Invariant[];
  showSearch?: boolean;
  showStats?: boolean;
  className?: string;
}

export function InvariantDisplay({ 
  invariants = TLC_INVARIANTS, 
  showSearch = true,
  showStats = true,
  className 
}: InvariantDisplayProps) {
  const [search, setSearch] = React.useState("");
  const [expandedId, setExpandedId] = React.useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);

  const categories = React.useMemo(() => {
    return Array.from(new Set(invariants.map((i) => i.category)));
  }, [invariants]);

  const filteredInvariants = React.useMemo(() => {
    return invariants.filter((inv) => {
      const matchesSearch = search === "" || 
        inv.name.toLowerCase().includes(search.toLowerCase()) ||
        inv.description.toLowerCase().includes(search.toLowerCase()) ||
        inv.id.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !selectedCategory || inv.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [invariants, search, selectedCategory]);

  const stats = React.useMemo(() => ({
    total: invariants.length,
    enforced: invariants.filter((i) => i.status === "enforced").length,
    warnings: invariants.filter((i) => i.status === "warning").length,
    violations: invariants.filter((i) => i.status === "violated").length,
  }), [invariants]);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Stats */}
      {showStats && (
        <div className="grid gap-4 sm:grid-cols-4">
          <GlassCard className="p-4 text-center">
            <p className="text-3xl font-bold text-foreground">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Total Invariants</p>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <p className="text-3xl font-bold text-green-600">{stats.enforced}</p>
            <p className="text-sm text-muted-foreground">Enforced</p>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <p className="text-3xl font-bold text-amber-600">{stats.warnings}</p>
            <p className="text-sm text-muted-foreground">Warnings</p>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <p className="text-3xl font-bold text-red-600">{stats.violations}</p>
            <p className="text-sm text-muted-foreground">Violations</p>
          </GlassCard>
        </div>
      )}

      {/* Search and Filter */}
      {showSearch && (
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search invariants..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All
            </Button>
            {categories.slice(0, 5).map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Invariant List */}
      <div className="grid gap-2">
        {filteredInvariants.map((invariant) => (
          <InvariantCard
            key={invariant.id}
            invariant={invariant}
            expanded={expandedId === invariant.id}
            onToggle={() => setExpandedId(expandedId === invariant.id ? null : invariant.id)}
          />
        ))}
        {filteredInvariants.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No invariants match your search.
          </p>
        )}
      </div>
    </div>
  );
}

export default InvariantDisplay;
