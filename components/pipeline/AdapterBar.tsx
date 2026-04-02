"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Database,
  FileJson,
  Globe,
  Webhook,
  Cloud,
  Settings,
  Check,
  X,
  Loader2,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";

// =============================================================================
// ADAPTER BAR - TLC Pipeline Component (Frostbyte ETL)
// Displays connected data adapters and their status
// =============================================================================

export type AdapterType = "database" | "api" | "file" | "webhook" | "cloud";
export type AdapterStatus = "connected" | "disconnected" | "syncing" | "error";

export interface Adapter {
  id: string;
  name: string;
  type: AdapterType;
  status: AdapterStatus;
  lastSync?: Date;
  recordCount?: number;
  errorMessage?: string;
}

export interface AdapterBarProps {
  adapters: Adapter[];
  onConnect?: (adapterId: string) => void;
  onDisconnect?: (adapterId: string) => void;
  onSync?: (adapterId: string) => void;
  onConfigure?: (adapterId: string) => void;
  compact?: boolean;
  className?: string;
}

const typeIcons: Record<AdapterType, React.ReactNode> = {
  database: <Database className="w-4 h-4" />,
  api: <Globe className="w-4 h-4" />,
  file: <FileJson className="w-4 h-4" />,
  webhook: <Webhook className="w-4 h-4" />,
  cloud: <Cloud className="w-4 h-4" />,
};

const statusConfig: Record<
  AdapterStatus,
  { icon: React.ReactNode; color: string; label: string }
> = {
  connected: {
    icon: <Check className="w-3 h-3" />,
    color: "text-green-600 bg-green-500/10 border-green-500/30",
    label: "Connected",
  },
  disconnected: {
    icon: <X className="w-3 h-3" />,
    color: "text-muted-foreground bg-muted border-border",
    label: "Disconnected",
  },
  syncing: {
    icon: <Loader2 className="w-3 h-3 animate-spin" />,
    color: "text-clinical-teal bg-clinical-teal/10 border-clinical-teal/30",
    label: "Syncing",
  },
  error: {
    icon: <AlertTriangle className="w-3 h-3" />,
    color: "text-destructive bg-destructive/10 border-destructive/30",
    label: "Error",
  },
};

export function AdapterBar({
  adapters,
  onConnect,
  onDisconnect,
  onSync,
  onConfigure,
  compact = false,
  className,
}: AdapterBarProps) {
  const formatLastSync = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  if (compact) {
    return (
      <div className={cn("flex items-center gap-2 flex-wrap", className)}>
        {adapters.map((adapter) => {
          const status = statusConfig[adapter.status];
          return (
            <Badge
              key={adapter.id}
              variant="outline"
              className={cn("gap-1.5 cursor-default", status.color)}
              title={`${adapter.name}: ${status.label}`}
            >
              {typeIcons[adapter.type]}
              <span className="max-w-[100px] truncate">{adapter.name}</span>
              {status.icon}
            </Badge>
          );
        })}
      </div>
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      {adapters.map((adapter) => {
        const status = statusConfig[adapter.status];
        return (
          <div
            key={adapter.id}
            className={cn(
              "flex items-center justify-between p-3 rounded-lg border",
              "bg-background/50 transition-colors",
              adapter.status === "error" && "border-destructive/30"
            )}
          >
            {/* Left: Icon, name, status */}
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-muted">
                {typeIcons[adapter.type]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{adapter.name}</span>
                  <Badge
                    variant="outline"
                    className={cn("text-xs gap-1", status.color)}
                  >
                    {status.icon}
                    {status.label}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                  {adapter.lastSync && (
                    <span>Last sync: {formatLastSync(adapter.lastSync)}</span>
                  )}
                  {adapter.recordCount !== undefined && (
                    <span>{adapter.recordCount.toLocaleString()} records</span>
                  )}
                </div>
                {adapter.errorMessage && (
                  <p className="text-xs text-destructive mt-1">
                    {adapter.errorMessage}
                  </p>
                )}
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1">
              {adapter.status === "connected" && onSync && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onSync(adapter.id)}
                  aria-label={`Sync ${adapter.name}`}
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              )}
              {onConfigure && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onConfigure(adapter.id)}
                  aria-label={`Configure ${adapter.name}`}
                >
                  <Settings className="w-4 h-4" />
                </Button>
              )}
              {adapter.status === "disconnected" && onConnect && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onConnect(adapter.id)}
                >
                  Connect
                </Button>
              )}
              {adapter.status === "connected" && onDisconnect && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-destructive"
                  onClick={() => onDisconnect(adapter.id)}
                >
                  Disconnect
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AdapterBar;
