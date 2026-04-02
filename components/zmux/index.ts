// =============================================================================
// ZMUX DESIGN SYSTEM - Main Entry Point
// TLC Article V Compliant | CRMA × ZMUX Architecture
// =============================================================================
// 
// This is the unified export for the entire ZMUX design system.
// Import components from this single entry point for consistent usage.
//
// Usage:
//   import { GlassCard, ClaimCard, SessionBadge } from "@/components/zmux";
//
// =============================================================================

// -----------------------------------------------------------------------------
// FOUNDATION: Glass Design System
// Core visual language - glassmorphism, elevation, frost effects
// -----------------------------------------------------------------------------
export {
  GlassCard,
  GlassPanel,
  GlassOverlay,
} from "../glass";

export type {
  GlassCardProps,
  GlassPanelProps,
  GlassOverlayProps,
} from "../glass";

// -----------------------------------------------------------------------------
// LAYOUT: Application Structure
// AppShell, navigation, page containers
// -----------------------------------------------------------------------------
export {
  AppShell,
  PageContainer,
  NavSidebar,
} from "../layout";

export type {
  AppShellProps,
  PageContainerProps,
  NavSidebarProps,
  NavItem,
  NavGroup,
} from "../layout";

// -----------------------------------------------------------------------------
// EPISTEMIC HUMILITY: Truth & Uncertainty
// ClaimCard, TruthTierBadge, ConfidenceSlider
// -----------------------------------------------------------------------------
export {
  ClaimCard,
  TruthTierBadge,
  ConfidenceSlider,
} from "../epistemic";

export type {
  ClaimCardProps,
  TruthTierBadgeProps,
  ConfidenceSliderProps,
  TruthTier,
  Claim,
} from "../epistemic";

// -----------------------------------------------------------------------------
// HUMAN GUARD: Control & Override
// OverrideButton, SessionBadge, Guardian controls
// -----------------------------------------------------------------------------
export {
  OverrideButton,
  SessionBadge,
} from "../humanguard";

export type {
  OverrideButtonProps,
  SessionBadgeProps,
  SessionRole,
} from "../humanguard";

// -----------------------------------------------------------------------------
// UI CARE: Friction & Safety
// FrictionGate, DisclaimerBlock, SafetyIndicator
// -----------------------------------------------------------------------------
export {
  FrictionGate,
  DisclaimerBlock,
} from "../uicare";

export type {
  FrictionGateProps,
  DisclaimerBlockProps,
  FrictionLevel,
} from "../uicare";

// -----------------------------------------------------------------------------
// EMPIRICAL GUARD: Behavioral Observation
// MoodSignalIndicator, BehaviorTimeline, SessionHealthCard
// -----------------------------------------------------------------------------
export {
  MoodSignalIndicator,
  BehaviorTimeline,
  SessionHealthCard,
  BehaviorSummary,
} from "../empirical";

export type {
  MoodSignalIndicatorProps,
  BehaviorTimelineProps,
  SessionHealthCardProps,
  BehaviorSummaryProps,
  MoodSignal,
  TimelineEntry,
  BehaviorEvent,
  BehaviorType,
} from "../empirical";

// -----------------------------------------------------------------------------
// BUILD LATTICE: C-RSP Contracts
// ContractCard, ApprovalFlow, build management
// -----------------------------------------------------------------------------
export {
  ContractCard,
  ApprovalFlow,
  ApprovalSummary,
} from "../buildlattice";

export type {
  ContractCardProps,
  ContractStatus,
  ContractPhase,
  ApprovalFlowProps,
  ApprovalSummaryProps,
  ApprovalStep,
  ApprovalStatus,
  Approver,
} from "../buildlattice";

// -----------------------------------------------------------------------------
// OBSERVATORY: Evidence & Evaluation
// CaseFileCard, EvalResultChart, evidence display
// -----------------------------------------------------------------------------
export {
  CaseFileCard,
  CaseFileList,
  EvalResultChart,
  ScoreBadge,
} from "../observatory";

export type {
  CaseFileCardProps,
  CaseFileListProps,
  CaseStatus,
  EvalResultChartProps,
  ScoreBadgeProps,
  EvalMetric,
} from "../observatory";

// -----------------------------------------------------------------------------
// PIPELINE: Frostbyte ETL
// SSEConsole, AdapterBar, data flow monitoring
// -----------------------------------------------------------------------------
export {
  SSEConsole,
  AdapterBar,
} from "../pipeline";

export type {
  SSEConsoleProps,
  AdapterBarProps,
  Adapter,
  AdapterStatus,
  LogEntry,
  LogLevel,
} from "../pipeline";
