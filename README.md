# ZMUX Design System

**The Living Constitution (TLC) Design System**  
Accessibility-first, safety-first components.

---

## Overview

ZMUX is the official design system for The Living Constitution's full product line (8-15+ products). It features a luxurious "Sanctuary" aesthetic with frosted vellum glass, monolithic shadows, and warm soul-gold accents.

### Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| Vellum | `#fcfaf2` | Primary background |
| Ink | `#141414` | Primary text, dark surfaces |
| Soul Gold | `#b38b4d` | Brand accent, interactive elements |
| Terracotta | `#a65d45` | Secondary accent, warmth |
| Clinical Teal | `#4b6a6d` | Calm, clinical elements |

### Typography

- **Headings**: Space Grotesk (geometric, modern)
- **Body**: Space Grotesk
- **Mono/Data**: JetBrains Mono

---

## Installation

### Option 1: shadcn CLI (Recommended)

```bash
npx shadcn@latest add https://v0.dev/chat/[YOUR-CHAT-ID]
```

### Option 2: Manual Installation

1. **Install dependencies**:

```bash
pnpm add class-variance-authority clsx tailwind-merge lucide-react
pnpm add -D tailwindcss@latest @tailwindcss/postcss postcss
```

2. **Copy core files**:

```
app/globals.css          → Your project's globals.css
app/layout.tsx           → Update your layout with fonts
lib/utils.ts             → Utility functions (cn helper)
lib/design-system/       → TypeScript design tokens
components/              → All ZMUX components
```

3. **Add Google Fonts to your layout**:

```tsx
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-sans"
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-mono"
});
```

4. **Update your body tag**:

```tsx
<body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
```

### Option 3: GitHub Integration

1. Connect your GitHub repo via the v0 settings panel
2. Push directly to a branch
3. Create a PR for review

### Option 4: Deploy to Vercel

Click "Publish" in v0 to deploy instantly.

---

## Component Library

### Core Components (68+)

#### Glass Components
- `GlassCard` - Frosted vellum card with backdrop blur
- `GlassSurface` - Flexible glass container
- `GlassModal` - Accessible modal with glass effect
- `GlassPanel` - Slide-out panel

#### UICare Safety Components
- `CrisisGate` - Crisis resource access (988, etc.)
- `SafetyBanner` - Dismissible safety alerts
- `PanicButton` - Emergency action button
- `GroundingReset` - 5-4-3-2-1 grounding exercise
- `SessionTimer` - Session duration tracking
- `BreakPrompt` - Break suggestion overlay
- `CognitiveLoadMeter` - Visual cognitive load indicator
- `FocusMode` - Distraction-free mode toggle
- `ReadabilityToggle` - Font size/spacing controls
- `SimplifiedView` - Reduced complexity mode
- `ExitStrategy` - Quick escape button

#### HumanGuard Components
- `ConsentFlow` - Multi-step consent collection
- `WellnessCheck` - Periodic wellness check-ins
- `EscalationPath` - Human escalation options
- `RightToDelete` - Data deletion controls
- `HumanOverride` - Manual override controls

#### Epistemic Components
- `ClaimCard` - Evidence-backed claim display
- `TruthTierBadge` - T1/T2/T3 verification badges
- `SourceCitation` - Formatted citations
- `UncertaintyLabel` - Confidence indicators

#### Empirical Components
- `MoodSignalIndicator` - Mood state display
- `BehaviorTimeline` - Activity timeline
- `SessionHealthCard` - Session health metrics

#### BuildLattice Components
- `ContractCard` - C-RSP contract display
- `ApprovalFlow` - Multi-step approval UI
- `PhaseIndicator` - Build phase status

#### Control Plane Components
- `StatusIndicator` - System status (ACTIVE/QUARANTINE/OFF)
- `InvariantDisplay` - 37 TLC invariants visualization
- `TopologyViewer` - Dual topology display
- `EvidenceLedger` - Immutable audit trail

---

## Usage

### Basic Glass Card

```tsx
import { GlassCard } from "@/components/glass";

<GlassCard>
  <h2>Welcome to The Sanctuary</h2>
  <p>Accessibility-first, safety-first.</p>
</GlassCard>
```

### Crisis Gate (Required for wellness apps)

```tsx
import { CrisisGate } from "@/components/uicare";

<CrisisGate variant="banner" />
```

### Monolithic Button

```tsx
<button className="btn-monolithic">
  Explore Components
</button>
```

### Soul Gold Accent

```tsx
<span className="text-soul-gold">Highlighted text</span>
<div className="bg-soul-gold/10 border border-soul-gold/30">
  Subtle background
</div>
```

---

## CSS Classes

### Layout

```css
.zmux-grid          /* 3-column layout */
.vellum-card        /* Frosted glass card */
.concierge-sidebar  /* Dark sidebar panel */
```

### Typography

```css
.font-sans          /* Space Grotesk */
.font-mono          /* JetBrains Mono */
```

### Buttons

```css
.btn-monolithic     /* Primary CTA button */
.btn-ghost          /* Subtle button */
```

### Effects

```css
.monolithic-shadow  /* Deep layered shadow */
.frosted-glass      /* Backdrop blur effect */
```

---

## Accessibility

ZMUX is built accessibility-first:

- **WCAG 2.2 AAA** contrast ratios
- **Keyboard navigation** on all interactive elements
- **Screen reader** optimized with proper ARIA labels
- **Reduced motion** support via `prefers-reduced-motion`
- **Focus indicators** visible on all focusable elements
- **Skip links** for keyboard users

---

## Safety Invariants

ZMUX implements TLC's 6 safety invariants:

| Code | Name | Description |
|------|------|-------------|
| I1 | Epistemic Safety | No false certainty claims |
| I2 | Human Safety | Crisis resources always accessible |
| I3 | Consent Safety | Explicit consent before data collection |
| I4 | Cognitive Safety | Prevent information overload |
| I5 | Emotional Safety | Regular wellness checks |
| I6 | Empirical Safety | Evidence-based recommendations |

---

## License

Part of The Living Constitution project.

---

## Support

- GitHub Issues: [github.com/coreyalejandro/the-living-constitution](https://github.com/coreyalejandro/the-living-constitution)
- TLC Documentation: See `/projects/uicare/` in the TLC repo
