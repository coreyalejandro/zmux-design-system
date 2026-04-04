"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/glass";
import { 
  GitBranch, 
  FolderTree, 
  Check, 
  AlertTriangle,
  Link2,
  FileJson,
  Shield
} from "lucide-react";

/**
 * TLC Control Plane - Topology Viewer
 * 
 * Displays dual-topology structure (Integrated + Standalone)
 * Implements INVARIANT_16 (Dual Topology)
 * 
 * @invariant INVARIANT_16 - Integrated and standalone paths must maintain parity
 */

export interface TopologyNode {
  path: string;
  type: "directory" | "file";
  status: "synced" | "modified" | "missing" | "error";
  children?: TopologyNode[];
}

export interface TopologyConfig {
  version: string;
  integrated: {
    root: string;
    paths: TopologyNode[];
  };
  standalone: {
    root: string;
    paths: TopologyNode[];
  };
  parityStatus: "verified" | "warning" | "violated";
  lastVerified: Date;
}

const defaultTopology: TopologyConfig = {
  version: "1.0.0",
  integrated: {
    root: "projects/tlc-control-plane/",
    paths: [
      { 
        path: "PROJECT_TOPOLOGY.json", 
        type: "file", 
        status: "synced" 
      },
      { 
        path: "src/", 
        type: "directory", 
        status: "synced",
        children: [
          { path: "app.py", type: "file", status: "synced" },
        ]
      },
      { 
        path: "governance/", 
        type: "directory", 
        status: "synced",
        children: [
          { path: "evidence-ledger.schema.json", type: "file", status: "synced" },
          { path: "tip-state-policy.json", type: "file", status: "synced" },
          { path: "enforcement-map.json", type: "file", status: "synced" },
        ]
      },
    ],
  },
  standalone: {
    root: "standalone/tlc-ui-desktop/",
    paths: [
      { 
        path: ".tlc/PROJECT_TOPOLOGY.json", 
        type: "file", 
        status: "synced" 
      },
      { 
        path: "core/", 
        type: "directory", 
        status: "synced",
        children: [
          { path: "app.py", type: "file", status: "synced" },
        ]
      },
    ],
  },
  parityStatus: "verified",
  lastVerified: new Date(),
};

const statusColors: Record<string, string> = {
  synced: "text-green-600",
  modified: "text-amber-600",
  missing: "text-red-600",
  error: "text-destructive",
};

const statusBg: Record<string, string> = {
  synced: "bg-green-500/10",
  modified: "bg-amber-500/10",
  missing: "bg-red-500/10",
  error: "bg-destructive/10",
};

interface TreeNodeProps {
  node: TopologyNode;
  depth?: number;
}

function TreeNode({ node, depth = 0 }: TreeNodeProps) {
  const [expanded, setExpanded] = React.useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div style={{ marginLeft: depth * 16 }}>
      <div 
        className={cn(
          "flex items-center gap-2 py-1 px-2 rounded text-sm",
          "hover:bg-muted/50 transition-colors",
          hasChildren && "cursor-pointer"
        )}
        onClick={() => hasChildren && setExpanded(!expanded)}
      >
        {node.type === "directory" ? (
          <FolderTree className="w-4 h-4 text-muted-foreground" />
        ) : (
          <FileJson className="w-4 h-4 text-muted-foreground" />
        )}
        <span className="font-mono text-foreground">{node.path}</span>
        <span className={cn("w-2 h-2 rounded-full", statusBg[node.status])} />
      </div>
      {expanded && hasChildren && (
        <div>
          {node.children!.map((child, idx) => (
            <TreeNode key={idx} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export interface TopologyViewerProps {
  topology?: TopologyConfig;
  className?: string;
}

export function TopologyViewer({ 
  topology = defaultTopology, 
  className 
}: TopologyViewerProps) {
  const parityStatusStyles: Record<string, { bg: string; text: string; icon: React.ReactNode }> = {
    verified: { 
      bg: "bg-green-500/10 border-green-500/30", 
      text: "text-green-700",
      icon: <Check className="w-5 h-5" />
    },
    warning: { 
      bg: "bg-amber-500/10 border-amber-500/30", 
      text: "text-amber-700",
      icon: <AlertTriangle className="w-5 h-5" />
    },
    violated: { 
      bg: "bg-red-500/10 border-red-500/30", 
      text: "text-red-700",
      icon: <AlertTriangle className="w-5 h-5" />
    },
  };

  const parityStyle = parityStatusStyles[topology.parityStatus];

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header with Parity Status */}
      <GlassCard>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <GitBranch className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Dual Topology</h3>
              <p className="text-sm text-muted-foreground">Version {topology.version}</p>
            </div>
          </div>
          <div className={cn("px-3 py-2 rounded-lg border flex items-center gap-2", parityStyle.bg)}>
            {parityStyle.icon}
            <span className={cn("font-medium", parityStyle.text)}>
              {topology.parityStatus === "verified" ? "Parity Verified" : 
               topology.parityStatus === "warning" ? "Parity Warning" : "Parity Violated"}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Shield className="w-4 h-4" />
          <span>INVARIANT_16: Dual-topology cryptographic identity parity</span>
        </div>
        
        <p className="text-xs text-muted-foreground mt-2">
          Last verified: {topology.lastVerified.toLocaleString()}
        </p>
      </GlassCard>

      {/* Dual Topology Display */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Integrated Path */}
        <GlassCard>
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
            <div className="px-2 py-1 rounded bg-blue-500/10 text-blue-700 text-xs font-medium">
              INTEGRATED
            </div>
            <span className="font-mono text-sm text-muted-foreground">
              {topology.integrated.root}
            </span>
          </div>
          <div className="space-y-1">
            {topology.integrated.paths.map((node, idx) => (
              <TreeNode key={idx} node={node} />
            ))}
          </div>
        </GlassCard>

        {/* Standalone Path */}
        <GlassCard>
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
            <div className="px-2 py-1 rounded bg-purple-500/10 text-purple-700 text-xs font-medium">
              STANDALONE
            </div>
            <span className="font-mono text-sm text-muted-foreground">
              {topology.standalone.root}
            </span>
          </div>
          <div className="space-y-1">
            {topology.standalone.paths.map((node, idx) => (
              <TreeNode key={idx} node={node} />
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Linkage Indicator */}
      <GlassCard className="flex items-center justify-center gap-4 py-4">
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">Integrated</p>
          <p className="text-xs text-muted-foreground">{topology.integrated.root}</p>
        </div>
        <Link2 className="w-6 h-6 text-primary" />
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">Standalone</p>
          <p className="text-xs text-muted-foreground">{topology.standalone.root}</p>
        </div>
      </GlassCard>
    </div>
  );
}

export default TopologyViewer;
