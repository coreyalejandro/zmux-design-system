"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { GlassCard } from "@/components/glass";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Pause,
  Square,
  Trash2,
  Download,
  Copy,
  Check,
  AlertCircle,
  CheckCircle2,
  Info,
  Loader2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// =============================================================================
// SSE CONSOLE - TLC Pipeline Component (Frostbyte ETL)
// Real-time Server-Sent Events display console
// =============================================================================

export type LogLevel = "info" | "success" | "warning" | "error" | "debug";

export interface LogEntry {
  id: string;
  timestamp: Date;
  level: LogLevel;
  message: string;
  source?: string;
  data?: Record<string, unknown>;
}

export interface SSEConsoleProps {
  /** Log entries to display */
  logs: LogEntry[];
  /** Whether currently streaming */
  isStreaming?: boolean;
  /** Connection status */
  connectionStatus?: "connected" | "disconnected" | "connecting" | "error";
  /** Title for the console */
  title?: string;
  /** Maximum logs to display */
  maxLogs?: number;
  /** Whether to auto-scroll to bottom */
  autoScroll?: boolean;
  /** Callback to clear logs */
  onClear?: () => void;
  /** Callback to start/stop streaming */
  onToggleStream?: () => void;
  /** Callback to export logs */
  onExport?: () => void;
  /** Show timestamps */
  showTimestamps?: boolean;
  /** Filter by log level */
  filterLevel?: LogLevel | "all";
  className?: string;
}

const levelConfig: Record<
  LogLevel,
  { icon: React.ReactNode; color: string; bgColor: string }
> = {
  info: {
    icon: <Info className="w-3 h-3" />,
    color: "text-clinical-teal",
    bgColor: "bg-clinical-teal/10",
  },
  success: {
    icon: <CheckCircle2 className="w-3 h-3" />,
    color: "text-green-600",
    bgColor: "bg-green-500/10",
  },
  warning: {
    icon: <AlertCircle className="w-3 h-3" />,
    color: "text-sanctuary-gold",
    bgColor: "bg-sanctuary-gold/10",
  },
  error: {
    icon: <AlertCircle className="w-3 h-3" />,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  debug: {
    icon: <Info className="w-3 h-3" />,
    color: "text-muted-foreground",
    bgColor: "bg-muted/50",
  },
};

const statusConfig: Record<string, { label: string; color: string }> = {
  connected: { label: "Connected", color: "text-green-600 bg-green-500/10" },
  disconnected: { label: "Disconnected", color: "text-muted-foreground bg-muted" },
  connecting: { label: "Connecting...", color: "text-sanctuary-gold bg-sanctuary-gold/10" },
  error: { label: "Error", color: "text-destructive bg-destructive/10" },
};

export function SSEConsole({
  logs,
  isStreaming = false,
  connectionStatus = "disconnected",
  title = "Event Stream",
  maxLogs = 500,
  autoScroll = true,
  onClear,
  onToggleStream,
  onExport,
  showTimestamps = true,
  filterLevel = "all",
  className,
}: SSEConsoleProps) {
  const consoleRef = React.useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState(false);
  const [isExpanded, setIsExpanded] = React.useState(true);

  // Auto-scroll to bottom
  React.useEffect(() => {
    if (autoScroll && consoleRef.current && isExpanded) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs, autoScroll, isExpanded]);

  const filteredLogs = filterLevel === "all"
    ? logs.slice(-maxLogs)
    : logs.filter((log) => log.level === filterLevel).slice(-maxLogs);

  const handleCopyAll = async () => {
    const text = filteredLogs
      .map((log) => `[${log.timestamp.toISOString()}] [${log.level.toUpperCase()}] ${log.message}`)
      .join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      fractionalSecondDigits: 3,
    });
  };

  const status = statusConfig[connectionStatus];

  return (
    <GlassCard className={cn("overflow-hidden", className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-border/50 bg-muted/20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-muted rounded transition-colors"
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "Collapse console" : "Expand console"}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          <h3 className="font-medium text-sm">{title}</h3>
          <Badge variant="outline" className={cn("text-xs gap-1", status.color)}>
            {connectionStatus === "connecting" && (
              <Loader2 className="w-3 h-3 animate-spin" />
            )}
            {status.label}
          </Badge>
          {isStreaming && (
            <span className="flex items-center gap-1 text-xs text-clinical-teal">
              <span className="w-2 h-2 rounded-full bg-clinical-teal animate-pulse" />
              Live
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {onToggleStream && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={onToggleStream}
              aria-label={isStreaming ? "Pause stream" : "Start stream"}
            >
              {isStreaming ? (
                <Pause className="w-3.5 h-3.5" />
              ) : (
                <Play className="w-3.5 h-3.5" />
              )}
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={handleCopyAll}
            aria-label="Copy all logs"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-clinical-teal" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </Button>
          {onExport && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={onExport}
              aria-label="Export logs"
            >
              <Download className="w-3.5 h-3.5" />
            </Button>
          )}
          {onClear && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={onClear}
              aria-label="Clear logs"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </div>

      {/* Console output */}
      {isExpanded && (
        <div
          ref={consoleRef}
          className="h-64 overflow-auto bg-background/80 font-mono text-xs"
          role="log"
          aria-live="polite"
          aria-label="Event log"
        >
          {filteredLogs.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No logs to display
            </div>
          ) : (
            <div className="p-2 space-y-0.5">
              {filteredLogs.map((log) => {
                const config = levelConfig[log.level];
                return (
                  <div
                    key={log.id}
                    className={cn(
                      "flex items-start gap-2 px-2 py-1 rounded",
                      config.bgColor
                    )}
                  >
                    <span className={cn("shrink-0 mt-0.5", config.color)}>
                      {config.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2">
                        {showTimestamps && (
                          <span className="text-muted-foreground shrink-0">
                            {formatTimestamp(log.timestamp)}
                          </span>
                        )}
                        {log.source && (
                          <span className="text-muted-foreground shrink-0">
                            [{log.source}]
                          </span>
                        )}
                        <span className={cn("break-all", config.color)}>
                          {log.message}
                        </span>
                      </div>
                      {log.data && (
                        <pre className="mt-1 text-muted-foreground overflow-x-auto">
                          {JSON.stringify(log.data, null, 2)}
                        </pre>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Footer stats */}
      {isExpanded && (
        <div className="flex items-center justify-between px-3 py-2 border-t border-border/50 bg-muted/10 text-xs text-muted-foreground">
          <span>{filteredLogs.length} entries</span>
          <div className="flex items-center gap-3">
            <span className="text-destructive">
              {logs.filter((l) => l.level === "error").length} errors
            </span>
            <span className="text-sanctuary-gold">
              {logs.filter((l) => l.level === "warning").length} warnings
            </span>
          </div>
        </div>
      )}
    </GlassCard>
  );
}

export default SSEConsole;
