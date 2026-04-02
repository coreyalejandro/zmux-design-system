// =============================================================================
// ZMUX DESIGN SYSTEM DISTRIBUTION
// Omnichannel exports for all TLC products
// =============================================================================

export { zmuxPreset } from "./tailwind-preset";

// Re-export all tokens
export * from "../tokens";
export * from "../themes";

// Version info
export const VERSION = "1.0.0";
export const TLC_VERSION = "1.0.0";

// CSS Custom Properties generator
export function generateCSSVariables(theme: "light" | "dark" | "high-contrast" = "light"): string {
  const variables: Record<string, string> = {
    // Sanctuary Palette
    "--sanctuary-gold": "38 54% 56%",
    "--sanctuary-teal": "163 26% 48%",
    "--sanctuary-terracotta": "18 45% 56%",
    "--warm-cream": "30 38% 97%",
    "--sage": "108 18% 74%",
    "--clay": "30 30% 85%",
    
    // Truth Tiers
    "--truth-t1": "142 71% 45%",
    "--truth-t2": "38 54% 56%",
    "--truth-t3": "38 92% 50%",
    
    // Mood Signals
    "--mood-calm": "142 71% 45%",
    "--mood-neutral": "163 26% 48%",
    "--mood-stressed": "38 92% 50%",
    "--mood-crisis": "0 84% 60%",
    
    // Risk Levels
    "--risk-low": "142 71% 45%",
    "--risk-medium": "38 92% 50%",
    "--risk-high": "25 95% 53%",
    "--risk-critical": "0 84% 60%",
  };

  if (theme === "dark") {
    variables["--background"] = "30 10% 8%";
    variables["--foreground"] = "30 10% 95%";
  } else if (theme === "high-contrast") {
    variables["--background"] = "0 0% 100%";
    variables["--foreground"] = "0 0% 0%";
  } else {
    variables["--background"] = "30 38% 97%";
    variables["--foreground"] = "30 10% 10%";
  }

  return Object.entries(variables)
    .map(([key, value]) => `${key}: ${value};`)
    .join("\n  ");
}

// Component manifest for documentation
export const COMPONENT_MANIFEST = {
  glass: {
    name: "Glass Components",
    components: ["GlassCard", "GlassSurface", "GlassModal", "GlassPanel"],
    description: "Frosted glass morphism components for the Sanctuary aesthetic",
  },
  uicare: {
    name: "UICare Components",
    components: [
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
    description: "Neurodivergent-first safety components",
  },
  humanguard: {
    name: "HumanGuard Components",
    components: [
      "ConsentFlow",
      "DataTransparency",
      "WellnessCheck",
      "WellnessIndicator",
      "EscalationPath",
      "EscalationButton",
      "RightToDelete",
      "HumanOverride",
    ],
    description: "Human-centered consent and wellness components",
  },
  epistemic: {
    name: "Epistemic Components",
    components: ["ClaimCard", "TruthTierBadge", "SourceCitation", "UncertaintyIndicator"],
    description: "Truth-graded claim display with citations",
  },
  empirical: {
    name: "Empirical Components",
    components: ["MoodSignalIndicator", "BehaviorTimeline", "SessionHealthCard"],
    description: "Continuous monitoring and behavioral tracking",
  },
  buildlattice: {
    name: "BuildLattice Components",
    components: ["ContractCard"],
    description: "C-RSP contract management",
  },
  layout: {
    name: "Layout Components",
    components: ["SafetyShell", "SanctuaryContainer", "FocusRegion", "SkipLink"],
    description: "Accessible layout primitives",
  },
};
