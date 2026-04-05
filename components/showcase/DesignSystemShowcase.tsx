"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ZMUX_VERSION, SAFETY_INVARIANTS, A11Y_STANDARDS, COMPONENT_CATEGORIES } from "@/lib/design-system";

// Glass Components
import { GlassCard, GlassSurface } from "@/components/glass";

// UICare Components
import { SafetyBanner } from "@/components/uicare/SafetyBanner";
import { SessionTimer } from "@/components/uicare/SessionTimer";
import { CognitiveLoadMeter } from "@/components/uicare/CognitiveLoadMeter";
import { ReadabilityToggle } from "@/components/uicare/ReadabilityToggle";

// HumanGuard Components
import { WellnessCheck, WellnessIndicator } from "@/components/humanguard/WellnessCheck";
import { EscalationPath } from "@/components/humanguard/EscalationPath";

// Epistemic Components
import { ClaimCard, TruthTierBadge } from "@/components/epistemic/ClaimCard";

// Empirical Components
import { MoodSignalIndicator, SessionHealthCard } from "@/components/empirical/MoodSignalIndicator";

// BuildLattice Components
import { ContractCard } from "@/components/buildlattice/ContractCard";

// Control Plane Components
import { 
  StatusIndicator, 
  StatusBanner, 
  InvariantDisplay, 
  TopologyViewer, 
  EvidenceLedger 
} from "@/components/control-plane";

// Layout Components
import { SanctuaryContainer, FocusRegion } from "@/components/layout/SafetyShell";

// UI Components
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Heart, 
  Brain, 
  Eye, 
  Palette, 
  Code, 
  BookOpen,
  ChevronRight,
  ExternalLink,
  Check,
  Layers,
  Monitor
} from "lucide-react";

// =============================================================================
// DESIGN SYSTEM SHOWCASE
// =============================================================================

type ShowcaseSection = "overview" | "tokens" | "glass" | "uicare" | "humanguard" | "epistemic" | "empirical" | "buildlattice" | "controlplane";

export function DesignSystemShowcase() {
  const [activeSection, setActiveSection] = React.useState<ShowcaseSection>("overview");
  
  const handleSectionChange = (sectionId: ShowcaseSection) => {
    console.log("[v0] Section clicked:", sectionId);
    setActiveSection(sectionId);
  };

  const sections: { id: ShowcaseSection; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Overview", icon: <Layers className="w-4 h-4" /> },
    { id: "tokens", label: "Design Tokens", icon: <Palette className="w-4 h-4" /> },
    { id: "glass", label: "Glass Components", icon: <Eye className="w-4 h-4" /> },
    { id: "uicare", label: "UICare", icon: <Shield className="w-4 h-4" /> },
    { id: "humanguard", label: "HumanGuard", icon: <Heart className="w-4 h-4" /> },
    { id: "epistemic", label: "Epistemic", icon: <BookOpen className="w-4 h-4" /> },
    { id: "empirical", label: "Empirical", icon: <Brain className="w-4 h-4" /> },
    { id: "buildlattice", label: "BuildLattice", icon: <Code className="w-4 h-4" /> },
    { id: "controlplane", label: "Control Plane", icon: <Monitor className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Safety Banner */}
      <SafetyBanner variant="info" dismissible>
        Welcome to the ZMUX Design System. This is a TLC-compliant, accessibility-first component library.
      </SafetyBanner>

      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <SanctuaryContainer maxWidth="2xl" padding="sm">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #D4A574, #C4A484)' }}>
                <span className="text-white font-bold text-lg">Z</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">ZMUX Design System</h1>
                <p className="text-xs text-muted-foreground">v{ZMUX_VERSION} | TLC Compliant</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ReadabilityToggle variant="compact" />
              <SessionTimer warningThreshold={45 * 60 * 1000} />
            </div>
          </div>
        </SanctuaryContainer>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 border-r border-border min-h-[calc(100vh-73px)] sticky top-[73px] bg-background">
          <nav className="p-4" aria-label="Design system sections">
            <ul className="space-y-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    type="button"
                    onClick={() => handleSectionChange(section.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      activeSection === section.id
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {section.icon}
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Content Area */}
        <main id="main-content" className="flex-1 min-w-0">
          <SanctuaryContainer maxWidth="xl" padding="lg">
            {activeSection === "overview" && <OverviewSection />}
            {activeSection === "tokens" && <TokensSection />}
            {activeSection === "glass" && <GlassSection />}
            {activeSection === "uicare" && <UICareSection />}
            {activeSection === "humanguard" && <HumanGuardSection />}
            {activeSection === "epistemic" && <EpistemicSection />}
            {activeSection === "empirical" && <EmpiricalSection />}
            {activeSection === "buildlattice" && <BuildLatticeSection />}
            {activeSection === "controlplane" && <ControlPlaneSection />}
          </SanctuaryContainer>
        </main>
      </div>

      {/* Cognitive Load Meter */}
      <div className="fixed bottom-6 left-6 z-50">
        <CognitiveLoadMeter level="low" />
      </div>
    </div>
  );
}

// =============================================================================
// SECTION COMPONENTS
// =============================================================================

function OverviewSection() {
  return (
    <FocusRegion label="Design System Overview">
      <div className="space-y-8">
        {/* Hero */}
        <div className="text-center py-12">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">
            The Sanctuary Design System
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            An accessibility-first, safety-first design system built on The Living Constitution principles. 
            Designed for neurodivergent users and clinical wellness applications.
          </p>
        </div>

        {/* Safety Invariants */}
        <GlassCard>
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-sanctuary-gold" />
            TLC Safety Invariants
          </h3>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(SAFETY_INVARIANTS).map(([key, value]) => (
              <div key={key} className="p-3 bg-muted/30 rounded-lg">
                <span className="text-xs font-mono text-sanctuary-teal">{key}</span>
                <p className="text-sm text-foreground mt-1">{value}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Accessibility Standards */}
        <GlassCard>
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Eye className="w-5 h-5 text-sanctuary-teal" />
            Accessibility Standards
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-sm">WCAG {A11Y_STANDARDS.wcagVersion} {A11Y_STANDARDS.wcagLevel}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-sm">Keyboard Navigation</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-sm">Screen Reader Optimized</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-600" />
              <span className="text-sm">Reduced Motion Support</span>
            </div>
          </div>
        </GlassCard>

        {/* Component Categories */}
        <GlassCard>
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Layers className="w-5 h-5 text-sanctuary-terracotta" />
            Component Library
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(COMPONENT_CATEGORIES).map(([category, components]) => (
              <div key={category} className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-medium text-foreground capitalize mb-2">{category}</h4>
                <p className="text-sm text-muted-foreground">
                  {components.length} components
                </p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </FocusRegion>
  );
}

function TokensSection() {
  // Core Sanctuary Palette
  const sanctuaryPalette = [
    { name: "Soul Gold", hex: "#D4A574", var: "--soul-gold", description: "Primary brand, warmth, trust" },
    { name: "Terracotta", hex: "#C4A484", var: "--terracotta", description: "Secondary warmth, earthiness" },
    { name: "Clinical Teal", hex: "#6B9B9B", var: "--clinical-teal", description: "Calm, clinical professionalism" },
    { name: "Warm Cream", hex: "#F5F0E8", var: "--warm-cream", description: "Background, soft neutrals" },
    { name: "Sanctuary White", hex: "#FEFDFB", var: "--sanctuary-white", description: "Pure background" },
    { name: "Charcoal", hex: "#2D2D2D", var: "--charcoal", description: "Primary text, dark UI" },
  ];

  // Soul Gold Scale
  const soulGoldScale = [
    { shade: "50", hex: "#FDF8F3" },
    { shade: "100", hex: "#F9EDE0" },
    { shade: "200", hex: "#F0D9C0" },
    { shade: "300", hex: "#E5C9A8" },
    { shade: "400", hex: "#D4A574" },
    { shade: "500", hex: "#C4925C" },
    { shade: "600", hex: "#B8895A" },
    { shade: "700", hex: "#9A7048" },
    { shade: "800", hex: "#7D5A3A" },
    { shade: "900", hex: "#60452D" },
  ];

  // Clinical Teal Scale
  const clinicalTealScale = [
    { shade: "50", hex: "#F2F7F7" },
    { shade: "100", hex: "#E0EBEB" },
    { shade: "200", hex: "#C1D7D7" },
    { shade: "300", hex: "#8FB5B5" },
    { shade: "400", hex: "#6B9B9B" },
    { shade: "500", hex: "#548383" },
    { shade: "600", hex: "#4F7A7A" },
    { shade: "700", hex: "#426666" },
    { shade: "800", hex: "#355252" },
    { shade: "900", hex: "#2A4040" },
  ];

  // Safety Semantic Colors
  const safetyColors = [
    { name: "Verified", hex: "#22C55E", bg: "#F0FDF4", usage: "Success, safe, approved" },
    { name: "Caution", hex: "#F59E0B", bg: "#FFFBEB", usage: "Warning, attention needed" },
    { name: "Danger", hex: "#EF4444", bg: "#FEF2F2", usage: "Error, crisis, critical" },
    { name: "Grounding", hex: "#8B7355", bg: "#F5F0E8", usage: "Calm, reset, earthing" },
  ];

  // Truth Tier Colors
  const truthTiers = [
    { tier: "T1", name: "Verified", hex: "#22C55E", bg: "#F0FDF4", description: "Peer-reviewed, institutional" },
    { tier: "T2", name: "Partial", hex: "#F59E0B", bg: "#FFFBEB", description: "Some evidence, needs review" },
    { tier: "T3", name: "Unverified", hex: "#EF4444", bg: "#FEF2F2", description: "User-generated, unvalidated" },
  ];

  // Mood Signal Colors
  const moodSignals = [
    { signal: "Calm", hex: "#6B9B9B", bg: "#F2F7F7" },
    { signal: "Stressed", hex: "#F59E0B", bg: "#FFFBEB" },
    { signal: "Crisis", hex: "#EF4444", bg: "#FEF2F2" },
  ];

  return (
    <FocusRegion label="Design Tokens">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Design Tokens</h2>
          <p className="text-muted-foreground">
            The ZMUX Sanctuary palette - foundational design values ensuring consistency across all TLC products.
          </p>
        </div>

        {/* Core Sanctuary Palette */}
        <GlassCard>
          <h3 className="text-lg font-semibold text-foreground mb-4">Core Sanctuary Palette</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sanctuaryPalette.map((color) => (
              <div key={color.name} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                <div 
                  className="w-16 h-16 rounded-lg flex-shrink-0 border border-border"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">{color.name}</p>
                  <p className="text-xs font-mono text-muted-foreground">{color.hex}</p>
                  <p className="text-xs font-mono text-muted-foreground mt-0.5">{color.var}</p>
                  <p className="text-xs text-muted-foreground mt-1">{color.description}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Soul Gold Scale */}
        <GlassCard>
          <h3 className="text-lg font-semibold text-foreground mb-4">Soul Gold Scale</h3>
          <div className="flex flex-wrap gap-2">
            {soulGoldScale.map((color) => (
              <div key={color.shade} className="text-center">
                <div 
                  className="w-12 h-12 rounded-lg border border-border"
                  style={{ backgroundColor: color.hex }}
                />
                <p className="text-xs text-muted-foreground mt-1">{color.shade}</p>
                <p className="text-xs font-mono text-muted-foreground">{color.hex}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Clinical Teal Scale */}
        <GlassCard>
          <h3 className="text-lg font-semibold text-foreground mb-4">Clinical Teal Scale</h3>
          <div className="flex flex-wrap gap-2">
            {clinicalTealScale.map((color) => (
              <div key={color.shade} className="text-center">
                <div 
                  className="w-12 h-12 rounded-lg border border-border"
                  style={{ backgroundColor: color.hex }}
                />
                <p className="text-xs text-muted-foreground mt-1">{color.shade}</p>
                <p className="text-xs font-mono text-muted-foreground">{color.hex}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Safety Semantic Colors */}
        <GlassCard>
          <h3 className="text-lg font-semibold text-foreground mb-4">Safety Semantic Colors</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {safetyColors.map((color) => (
              <div key={color.name} className="text-center">
                <div className="flex gap-1 justify-center mb-2">
                  <div 
                    className="w-10 h-10 rounded-lg border border-border"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div 
                    className="w-10 h-10 rounded-lg border border-border"
                    style={{ backgroundColor: color.bg }}
                  />
                </div>
                <p className="text-sm font-semibold text-foreground">{color.name}</p>
                <p className="text-xs font-mono text-muted-foreground">{color.hex}</p>
                <p className="text-xs text-muted-foreground mt-1">{color.usage}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Truth Tier Colors */}
        <GlassCard>
          <h3 className="text-lg font-semibold text-foreground mb-4">Truth Tier Colors (EpistemicGuard)</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {truthTiers.map((tier) => (
              <div 
                key={tier.tier} 
                className="p-4 rounded-lg border"
                style={{ backgroundColor: tier.bg, borderColor: tier.hex }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span 
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: tier.hex }}
                  >
                    {tier.tier}
                  </span>
                  <span className="font-semibold">{tier.name}</span>
                </div>
                <p className="text-xs text-muted-foreground">{tier.description}</p>
                <p className="text-xs font-mono text-muted-foreground mt-1">{tier.hex}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Mood Signal Colors */}
        <GlassCard>
          <h3 className="text-lg font-semibold text-foreground mb-4">Mood Signal Colors (EmpiricalGuard)</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {moodSignals.map((mood) => (
              <div 
                key={mood.signal} 
                className="p-4 rounded-lg border"
                style={{ backgroundColor: mood.bg, borderColor: mood.hex }}
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: mood.hex }}
                  />
                  <span className="font-semibold">{mood.signal}</span>
                </div>
                <p className="text-xs font-mono text-muted-foreground mt-2">{mood.hex}</p>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Typography */}
        <GlassCard>
          <h3 className="text-lg font-semibold text-foreground mb-4">Typography Scale</h3>
          <div className="space-y-4">
            <div className="flex items-baseline gap-4">
              <span className="text-xs text-muted-foreground w-16">4xl</span>
              <span className="text-4xl font-bold">The Sanctuary</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-xs text-muted-foreground w-16">2xl</span>
              <span className="text-2xl font-semibold">Heading Two</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-xs text-muted-foreground w-16">lg</span>
              <span className="text-lg">Large Text</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-xs text-muted-foreground w-16">base</span>
              <span className="text-base">Body text optimized for readability</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-xs text-muted-foreground w-16">sm</span>
              <span className="text-sm text-muted-foreground">Small helper text</span>
            </div>
          </div>
        </GlassCard>

        {/* Spacing */}
        <GlassCard>
          <h3 className="text-lg font-semibold text-foreground mb-4">Spacing Scale (4px base)</h3>
          <div className="flex flex-wrap gap-4">
            {[1, 2, 3, 4, 6, 8, 12, 16].map((n) => (
              <div key={n} className="text-center">
                <div
                  className="border rounded"
                  style={{ 
                    width: `${n * 4}px`, 
                    height: `${n * 4}px`,
                    backgroundColor: "rgba(212, 165, 116, 0.2)",
                    borderColor: "rgba(212, 165, 116, 0.4)"
                  }}
                />
                <p className="text-xs text-muted-foreground mt-1">{n}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </FocusRegion>
  );
}

function GlassSection() {
  return (
    <FocusRegion label="Glass Components">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Glass Components</h2>
          <p className="text-muted-foreground">
            Frosted glass morphism components for the Sanctuary aesthetic.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <GlassCard>
            <h3 className="font-semibold text-foreground mb-2">GlassCard (Default)</h3>
            <p className="text-sm text-muted-foreground">
              Standard card with subtle glass effect and border.
            </p>
          </GlassCard>

          <GlassCard variant="elevated">
            <h3 className="font-semibold text-foreground mb-2">GlassCard (Elevated)</h3>
            <p className="text-sm text-muted-foreground">
              Elevated variant with stronger blur and shadow.
            </p>
          </GlassCard>

          <GlassSurface className="p-6">
            <h3 className="font-semibold text-foreground mb-2">GlassSurface</h3>
            <p className="text-sm text-muted-foreground">
              Minimal surface for backgrounds and containers.
            </p>
          </GlassSurface>

          <GlassCard variant="outlined">
            <h3 className="font-semibold text-foreground mb-2">GlassCard (Outlined)</h3>
            <p className="text-sm text-muted-foreground">
              Outlined variant with transparent background.
            </p>
          </GlassCard>
        </div>
      </div>
    </FocusRegion>
  );
}

function UICareSection() {
  return (
    <FocusRegion label="UICare Components">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">UICare Components</h2>
          <p className="text-muted-foreground">
            Neurodivergent-first safety components for cognitive and emotional support.
          </p>
        </div>

        <GlassCard>
          <h3 className="font-semibold text-foreground mb-4">Safety Banner</h3>
          <div className="space-y-3">
            <SafetyBanner variant="info" />
            <SafetyBanner variant="warning" />
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="font-semibold text-foreground mb-4">Cognitive Load Meter</h3>
          <div className="flex flex-wrap gap-4">
            <CognitiveLoadMeter level="low" showLabel />
            <CognitiveLoadMeter level="moderate" showLabel />
            <CognitiveLoadMeter level="high" showLabel />
            <CognitiveLoadMeter level="overload" showLabel />
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="font-semibold text-foreground mb-4">Session Timer</h3>
          <SessionTimer warningThreshold={45 * 60 * 1000} onBreakSuggested={() => {}} />
        </GlassCard>
      </div>
    </FocusRegion>
  );
}

function HumanGuardSection() {
  const [showWellnessCheck, setShowWellnessCheck] = React.useState(false);

  return (
    <FocusRegion label="HumanGuard Components">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">HumanGuard Components</h2>
          <p className="text-muted-foreground">
            Human-centered safety components for consent, wellness, and escalation.
          </p>
        </div>

        <GlassCard>
          <h3 className="font-semibold text-foreground mb-4">Wellness Indicators</h3>
          <div className="flex flex-wrap gap-4">
            <WellnessIndicator level="great" showLabel />
            <WellnessIndicator level="good" showLabel />
            <WellnessIndicator level="okay" showLabel />
            <WellnessIndicator level="struggling" showLabel />
            <WellnessIndicator level="crisis" showLabel />
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="font-semibold text-foreground mb-4">Wellness Check</h3>
          <Button onClick={() => setShowWellnessCheck(!showWellnessCheck)}>
            {showWellnessCheck ? "Hide" : "Show"} Wellness Check
          </Button>
          {showWellnessCheck && (
            <div className="mt-4">
              <WellnessCheck
                onResponse={(level) => {
                  console.log("Wellness level:", level);
                  setShowWellnessCheck(false);
                }}
                onSkip={() => setShowWellnessCheck(false)}
              />
            </div>
          )}
        </GlassCard>

        <GlassCard>
          <h3 className="font-semibold text-foreground mb-4">Escalation Path</h3>
          <EscalationPath urgencyLevel="medium" />
        </GlassCard>
      </div>
    </FocusRegion>
  );
}

function EpistemicSection() {
  return (
    <FocusRegion label="Epistemic Components">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Epistemic Components</h2>
          <p className="text-muted-foreground">
            Truth-graded claim display with source citations.
          </p>
        </div>

        <GlassCard>
          <h3 className="font-semibold text-foreground mb-4">Truth Tier Badges</h3>
          <div className="flex flex-wrap gap-3">
            <TruthTierBadge tier="T1" />
            <TruthTierBadge tier="T2" />
            <TruthTierBadge tier="T3" />
            <TruthTierBadge tier="unknown" />
          </div>
        </GlassCard>

        <div className="grid gap-4 lg:grid-cols-2">
          <ClaimCard
            claim="Regular physical activity improves mental health outcomes."
            truthTier="T1"
            confidence={92}
            sources={[
              {
                id: "1",
                title: "WHO Physical Activity Guidelines",
                type: "institutional",
                url: "https://www.who.int",
              },
            ]}
            explanation="Strongly supported by multiple systematic reviews and meta-analyses."
          />

          <ClaimCard
            claim="Certain supplements may support cognitive function."
            truthTier="T2"
            confidence={65}
            sources={[
              {
                id: "2",
                title: "Journal of Cognitive Enhancement",
                type: "peer-reviewed",
              },
            ]}
            explanation="Some evidence exists but more research is needed."
          />
        </div>
      </div>
    </FocusRegion>
  );
}

function EmpiricalSection() {
  return (
    <FocusRegion label="Empirical Components">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Empirical Components</h2>
          <p className="text-muted-foreground">
            Continuous monitoring and behavioral tracking components.
          </p>
        </div>

        <GlassCard>
          <h3 className="font-semibold text-foreground mb-4">Mood Signal Indicators</h3>
          <div className="flex flex-wrap gap-3">
            <MoodSignalIndicator signal="calm" showDetails />
            <MoodSignalIndicator signal="neutral" showDetails />
            <MoodSignalIndicator signal="stressed" showDetails />
            <MoodSignalIndicator signal="elevated" showDetails />
            <MoodSignalIndicator signal="crisis" showDetails />
          </div>
        </GlassCard>

        <SessionHealthCard
          currentSignal="neutral"
          sessionDuration={32}
          breaksCount={1}
          averageSignal="neutral"
          alertsTriggered={0}
        />
      </div>
    </FocusRegion>
  );
}

function BuildLatticeSection() {
  return (
    <FocusRegion label="BuildLattice Components">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">BuildLattice Components</h2>
          <p className="text-muted-foreground">
            C-RSP contract management and approval flow components.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <ContractCard
            id="ZMUX-001"
            title="ZMUX Design System"
            version="1.0.0"
            status="in-progress"
            author="AI + Human Collaborative"
            authorType="collaborative"
            phases={[
              { id: "1", name: "Foundation", status: "completed" },
              { id: "2", name: "Providers", status: "completed" },
              { id: "3", name: "UICare", status: "completed" },
              { id: "4", name: "HumanGuard", status: "completed" },
              { id: "5", name: "Showcase", status: "in-progress" },
            ]}
            createdAt={new Date()}
          />

          <ContractCard
            id="TLC-002"
            title="SentinelOS Integration"
            version="0.5.0"
            status="pending"
            author="BuildLattice Guard"
            authorType="ai"
            phases={[
              { id: "1", name: "Safety Hooks", status: "completed" },
              { id: "2", name: "Provider Integration", status: "pending" },
              { id: "3", name: "Testing", status: "draft" },
            ]}
            createdAt={new Date()}
            onApprove={() => console.log("Approved")}
            onReject={() => console.log("Rejected")}
          />
        </div>
      </div>
    </FocusRegion>
  );
}

function ControlPlaneSection() {
  return (
    <FocusRegion label="TLC Control Plane Components">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">TLC Control Plane</h2>
          <p className="text-muted-foreground">
            Governance visualization and system control components for the TLC Control Plane UI.
            Implements PASS 8 compliance, invariant mapping, and dual-topology management.
          </p>
        </div>

        {/* System Status */}
        <GlassCard>
          <h3 className="font-semibold text-foreground mb-4">System Status (INVARIANT_10)</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Displays system status based on STATUS.json. System halts if QUARANTINE or OFF.
          </p>
          <div className="flex flex-wrap gap-4">
            <StatusIndicator status="ACTIVE" />
            <StatusIndicator status="QUARANTINE" />
            <StatusIndicator status="OFF" />
            <StatusIndicator status="LOADING" />
            <StatusIndicator status="ERROR" />
          </div>
        </GlassCard>

        {/* Invariant Display */}
        <GlassCard>
          <h3 className="font-semibold text-foreground mb-4">37 Core Invariants</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Visual display of all TLC governance invariants with enforcement status.
          </p>
          <InvariantDisplay showStats showSearch />
        </GlassCard>

        {/* Topology Viewer */}
        <GlassCard>
          <h3 className="font-semibold text-foreground mb-4">Dual Topology (INVARIANT_16)</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Visualizes integrated and standalone paths with parity verification.
          </p>
          <TopologyViewer />
        </GlassCard>

        {/* Evidence Ledger */}
        <GlassCard>
          <h3 className="font-semibold text-foreground mb-4">Evidence Ledger (INVARIANT_18)</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Immutable audit trail of all system actions with cryptographic signatures.
          </p>
          <EvidenceLedger showFilters showExport />
        </GlassCard>
      </div>
    </FocusRegion>
  );
}

export default DesignSystemShowcase;
