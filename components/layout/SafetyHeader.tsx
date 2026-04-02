"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Menu,
  X,
  Moon,
  Sun,
  Settings,
  Bell,
  User,
  HelpCircle,
} from "lucide-react";

// =============================================================================
// SAFETY HEADER - TLC Design System
// Application header with safety status indicators
// =============================================================================

export interface SafetyHeaderProps {
  /** Application/brand name */
  appName?: string;
  /** Logo element */
  logo?: React.ReactNode;
  /** Navigation items */
  navItems?: Array<{
    label: string;
    href: string;
    active?: boolean;
  }>;
  /** Current safety status */
  safetyStatus?: "safe" | "caution" | "alert";
  /** Show safety status badge */
  showSafetyBadge?: boolean;
  /** Theme toggle */
  onThemeToggle?: () => void;
  /** Current theme */
  theme?: "light" | "dark";
  /** Show notifications */
  showNotifications?: boolean;
  /** Notification count */
  notificationCount?: number;
  /** User menu content */
  userMenu?: React.ReactNode;
  /** Help action */
  onHelp?: () => void;
  /** Settings action */
  onSettings?: () => void;
  /** Mobile menu open state */
  mobileMenuOpen?: boolean;
  /** Mobile menu toggle */
  onMobileMenuToggle?: () => void;
  className?: string;
}

const safetyStatusConfig = {
  safe: {
    label: "Safe",
    color: "bg-clinical-teal/10 text-clinical-teal border-clinical-teal/30",
  },
  caution: {
    label: "Caution",
    color: "bg-sanctuary-gold/10 text-sanctuary-gold border-sanctuary-gold/30",
  },
  alert: {
    label: "Alert",
    color: "bg-destructive/10 text-destructive border-destructive/30",
  },
};

export function SafetyHeader({
  appName = "Sanctuary",
  logo,
  navItems = [],
  safetyStatus = "safe",
  showSafetyBadge = true,
  onThemeToggle,
  theme = "light",
  showNotifications = false,
  notificationCount = 0,
  userMenu,
  onHelp,
  onSettings,
  mobileMenuOpen = false,
  onMobileMenuToggle,
  className,
}: SafetyHeaderProps) {
  const statusConfig = safetyStatusConfig[safetyStatus];

  return (
    <header className={cn("py-3", className)}>
      <div className="flex items-center justify-between gap-4">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-6">
          {/* Mobile menu button */}
          {onMobileMenuToggle && (
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={onMobileMenuToggle}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          )}

          {/* Logo */}
          <div className="flex items-center gap-2">
            {logo || (
              <div className="p-1.5 rounded-lg bg-sanctuary-gold/10">
                <Shield className="h-5 w-5 text-sanctuary-gold" />
              </div>
            )}
            <span className="font-semibold text-foreground">{appName}</span>
          </div>

          {/* Desktop navigation */}
          {navItems.length > 0 && (
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    item.active
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                  aria-current={item.active ? "page" : undefined}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          )}
        </div>

        {/* Right: Status + Actions */}
        <div className="flex items-center gap-2">
          {/* Safety status badge */}
          {showSafetyBadge && (
            <Badge
              variant="outline"
              className={cn("hidden sm:flex gap-1.5", statusConfig.color)}
            >
              <Shield className="h-3 w-3" />
              {statusConfig.label}
            </Badge>
          )}

          {/* Notifications */}
          {showNotifications && (
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label={`Notifications${notificationCount > 0 ? ` (${notificationCount} unread)` : ""}`}
            >
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
                  {notificationCount > 9 ? "9+" : notificationCount}
                </span>
              )}
            </Button>
          )}

          {/* Theme toggle */}
          {onThemeToggle && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onThemeToggle}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
          )}

          {/* Help */}
          {onHelp && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onHelp}
              aria-label="Help"
            >
              <HelpCircle className="h-5 w-5" />
            </Button>
          )}

          {/* Settings */}
          {onSettings && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onSettings}
              aria-label="Settings"
            >
              <Settings className="h-5 w-5" />
            </Button>
          )}

          {/* User menu */}
          {userMenu || (
            <Button variant="ghost" size="icon" aria-label="User menu">
              <User className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && navItems.length > 0 && (
        <nav
          className="lg:hidden mt-4 pt-4 border-t border-border/50"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  item.active
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
                aria-current={item.active ? "page" : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

export default SafetyHeader;
