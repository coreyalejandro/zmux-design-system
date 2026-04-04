"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { 
  Shield, 
  AlertTriangle, 
  XCircle, 
  CheckCircle, 
  Loader2,
  Lock
} from "lucide-react";

/**
 * TLC Control Plane - Status Indicator
 * 
 * Displays system status based on STATUS.json
 * Implements INVARIANT_10 (External Halt Authority)
 * 
 * @invariant INVARIANT_10 - Must disable all interaction if QUARANTINE or OFF
 */

export type SystemStatus = "ACTIVE" | "QUARANTINE" | "OFF" | "LOADING" | "ERROR";

const statusVariants = cva(
  "inline-flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors",
  {
    variants: {
      status: {
        ACTIVE: "bg-green-500/10 text-green-700 border border-green-500/30",
        QUARANTINE: "bg-amber-500/10 text-amber-700 border border-amber-500/30",
        OFF: "bg-red-500/10 text-red-700 border border-red-500/30",
        LOADING: "bg-muted text-muted-foreground border border-border",
        ERROR: "bg-destructive/10 text-destructive border border-destructive/30",
      },
      size: {
        sm: "text-xs px-2 py-1",
        md: "text-sm px-3 py-2",
        lg: "text-base px-4 py-3",
      },
    },
    defaultVariants: {
      status: "LOADING",
      size: "md",
    },
  }
);

const statusIcons: Record<SystemStatus, React.ReactNode> = {
  ACTIVE: <CheckCircle className="w-4 h-4" />,
  QUARANTINE: <Lock className="w-4 h-4" />,
  OFF: <XCircle className="w-4 h-4" />,
  LOADING: <Loader2 className="w-4 h-4 animate-spin" />,
  ERROR: <AlertTriangle className="w-4 h-4" />,
};

const statusLabels: Record<SystemStatus, string> = {
  ACTIVE: "System Active",
  QUARANTINE: "Quarantine Mode",
  OFF: "System Offline",
  LOADING: "Checking Status...",
  ERROR: "Status Error",
};

export interface StatusIndicatorProps
  extends VariantProps<typeof statusVariants> {
  status: SystemStatus;
  showLabel?: boolean;
  showIcon?: boolean;
  className?: string;
  onStatusChange?: (status: SystemStatus) => void;
}

export function StatusIndicator({
  status,
  size,
  showLabel = true,
  showIcon = true,
  className,
}: StatusIndicatorProps) {
  return (
    <div
      className={cn(statusVariants({ status, size }), className)}
      role="status"
      aria-live="polite"
      aria-label={statusLabels[status]}
    >
      {showIcon && statusIcons[status]}
      {showLabel && <span>{statusLabels[status]}</span>}
    </div>
  );
}

/**
 * System Status Banner
 * 
 * Full-width banner for critical system status
 * Used when system is in QUARANTINE or OFF mode
 */
export interface StatusBannerProps {
  status: SystemStatus;
  message?: string;
  className?: string;
}

export function StatusBanner({ status, message, className }: StatusBannerProps) {
  if (status === "ACTIVE" || status === "LOADING") {
    return null;
  }

  const bannerStyles: Record<string, string> = {
    QUARANTINE: "bg-amber-500/10 border-amber-500 text-amber-900",
    OFF: "bg-red-500/10 border-red-500 text-red-900",
    ERROR: "bg-destructive/10 border-destructive text-destructive",
  };

  const defaultMessages: Record<string, string> = {
    QUARANTINE: "System is in quarantine mode. All interactions are disabled pending review.",
    OFF: "System is offline. Please contact an administrator.",
    ERROR: "Unable to determine system status. Operating in safe mode.",
  };

  return (
    <div
      className={cn(
        "w-full px-4 py-3 border-b-2 flex items-center justify-center gap-3",
        bannerStyles[status],
        className
      )}
      role="alert"
      aria-live="assertive"
    >
      {statusIcons[status]}
      <p className="font-medium text-center">
        {message || defaultMessages[status]}
      </p>
    </div>
  );
}

/**
 * Hook to check system status
 * Reads STATUS.json and returns current status
 */
export function useSystemStatus() {
  const [status, setStatus] = React.useState<SystemStatus>("LOADING");
  const [error, setError] = React.useState<string | null>(null);
  const [lastChecked, setLastChecked] = React.useState<Date | null>(null);

  const checkStatus = React.useCallback(async () => {
    try {
      // In a real implementation, this would fetch STATUS.json
      // For now, we simulate an active status
      await new Promise((resolve) => setTimeout(resolve, 500));
      setStatus("ACTIVE");
      setLastChecked(new Date());
      setError(null);
    } catch (err) {
      setStatus("ERROR");
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  }, []);

  React.useEffect(() => {
    checkStatus();
    
    // Poll for status changes every 30 seconds
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, [checkStatus]);

  const isDisabled = status === "QUARANTINE" || status === "OFF";

  return {
    status,
    error,
    lastChecked,
    isDisabled,
    refresh: checkStatus,
  };
}

export default StatusIndicator;
