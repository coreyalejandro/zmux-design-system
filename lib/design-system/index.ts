// =============================================================================
// ZMUX DESIGN SYSTEM
// The Living Constitution (TLC) Compliant
// Accessibility-First, Safety-First, Future-Proof
// =============================================================================

// Design Tokens
export * from "./tokens";
export * from "./themes";

// Version Info
export const ZMUX_VERSION = "1.0.0";
export const TLC_VERSION = "1.0.0";

// Safety Invariants
export const SAFETY_INVARIANTS = {
  I1: "Epistemic Safety - No ungrounded claims",
  I2: "Human Safety - Escalation always available",
  I3: "Consent Safety - No action without consent",
  I4: "Cognitive Safety - Prevent overload",
  I5: "Emotional Safety - Monitor wellness",
  I6: "Empirical Safety - Continuous monitoring",
} as const;

// Accessibility Standards
export const A11Y_STANDARDS = {
  wcagLevel: "AAA",
  wcagVersion: "2.2",
  keyboardNav: true,
  screenReaderOptimized: true,
  reducedMotionSupport: true,
  highContrastSupport: true,
  focusIndicators: true,
} as const;

// Component Categories
export const COMPONENT_CATEGORIES = {
  glass: ["GlassCard", "GlassSurface", "GlassModal", "GlassPanel"],
  uicare: [
    "CrisisGate",
    "SafetyBanner",
    "PanicButton",
    "GroundingReset",
    "SessionTimer",
    "BreakPrompt",
    "ExitStrategy",
    "ReadabilityToggle",
    "SimplifiedView",
    "CognitiveLoadMeter",
    "FocusMode",
  ],
  humanguard: [
    "ConsentFlow",
    "DataTransparency",
    "WellnessCheck",
    "WellnessIndicator",
    "EscalationPath",
    "EscalationButton",
    "RightToDelete",
    "HumanOverride",
  ],
  epistemic: ["ClaimCard", "TruthTierBadge", "SourceCitation", "UncertaintyIndicator"],
  empirical: ["MoodSignalIndicator", "BehaviorTimeline", "SessionHealthCard"],
  buildlattice: ["ContractCard"],
  layout: ["SafetyShell", "SanctuaryContainer", "FocusRegion", "SkipLink"],
} as const;

// Distribution Formats
export const DISTRIBUTION_FORMATS = {
  react: "TypeScript React Components",
  css: "CSS Custom Properties",
  tailwind: "Tailwind CSS Preset",
  json: "JSON Design Tokens",
  figma: "Figma Variables (planned)",
} as const;
