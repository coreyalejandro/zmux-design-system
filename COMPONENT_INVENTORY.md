# ZMUX Design System - Master Component Inventory

## TLC Products Consuming This Design System

| # | Product | Domain | Description |
|---|---------|--------|-------------|
| 1 | **UICare** | D2 - Human Safety | Neurodivergent-first UI safety components |
| 2 | **HumanGuard** | Session Safety | Consent, privacy, wellness platform |
| 3 | **SentinelOS** | Safety Orchestration | Core safety invariant enforcement |
| 4 | **EpistemicGuard** | D1 - Epistemic Safety | Truth tier, claim verification |
| 5 | **EmpiricalGuard** | D4 - Empirical Safety | Mood signals, behavior observation |
| 6 | **BuildLattice Guard** | SDLC Governance | C-RSP contract management |
| 7 | **Evidence Observatory** | Research Platform | Case files, eval results |
| 8 | **Frostbyte ETL** | Data Pipeline | Adapters, SSE, pipeline status |
| 9 | **PROACTIVE** | GitLab Agent | CI/CD safety integration |
| 10 | **C-RSP Framework** | Build Contracts | Contract templates, validation |
| 11 | **Teaser Videos** | Media | Promotional content |
| 12 | **TLC Control Plane** | Governance UI | System status, invariants, topology |

---

## Component Inventory by Domain

### Legend
- [x] Built and exists in codebase
- [ ] Specified in C-RSP but NOT yet built

---

## 1. Glass Components (`/components/glass/`)
**Product:** Core ZMUX Design System

| Status | Component | File | Purpose |
|--------|-----------|------|---------|
| [x] | GlassCard | `GlassCard.tsx` | Frosted vellum card container |
| [x] | GlassSurface | `GlassSurface.tsx` | Backdrop blur surface |
| [x] | GlassModal | `GlassModal.tsx` | Modal with glass effect |
| [x] | GlassPanel | `GlassPanel.tsx` | Side panel with glass effect |

**Total: 4/4 Built**

---

## 2. UICare Safety Components (`/components/uicare/`)
**Product:** UICare (D2 - Human Safety)

| Status | Component | File | Purpose |
|--------|-----------|------|---------|
| [x] | CrisisGate | `CrisisGate.tsx` | Crisis resource gateway |
| [ ] | HarmScanner | `HarmScanner.tsx` | Content harm detection UI |
| [x] | GroundingReset | `GroundingReset.tsx` | 5-4-3-2-1 grounding exercise |
| [x] | SafetyBanner | `SafetyBanner.tsx` | Safety notification banner |
| [x] | PanicButton | `PanicButton.tsx` | Emergency exit/help button |
| [x] | SessionTimer | `SessionTimer.tsx` | Session duration tracker |
| [x] | BreakPrompt | `BreakPrompt.tsx` | Break reminder modal |
| [x] | ExitStrategy | `ExitStrategy.tsx` | Quick exit implementation |
| [x] | ReadabilityToggle | `ReadabilityToggle.tsx` | Font/size accessibility toggle |
| [x] | FocusMode | `FocusMode.tsx` | Distraction-free mode |
| [ ] | ProgressIndicator | `ProgressIndicator.tsx` | Step progress visualization |
| [ ] | ConfirmationDialog | `ConfirmationDialog.tsx` | Safe action confirmation |
| [x] | SimplifiedView | `SimplifiedView.tsx` | Reduced complexity wrapper |
| [x] | CognitiveLoadMeter | `CognitiveLoadMeter.tsx` | Cognitive load indicator |
| [ ] | SensoryBreak | `SensoryBreak.tsx` | Sensory regulation tool |

**Total: 11/15 Built** | **Missing: 4**

---

## 3. HumanGuard Components (`/components/humanguard/`)
**Product:** HumanGuard (Session Safety Platform)

| Status | Component | File | Purpose |
|--------|-----------|------|---------|
| [x] | ConsentFlow | `ConsentFlow.tsx` | Multi-step consent collection |
| [x] | DataTransparency | `DataTransparency.tsx` | Data usage disclosure |
| [x] | RightToDelete | `RightToDelete.tsx` | Data deletion request UI |
| [ ] | PrivacyDashboard | `PrivacyDashboard.tsx` | Privacy settings overview |
| [x] | WellnessCheck | `WellnessCheck.tsx` | Periodic wellness check-in |
| [x] | EscalationPath | `EscalationPath.tsx` | Human escalation flow |
| [ ] | IncidentReport | `IncidentReport.tsx` | Safety incident reporting |
| [ ] | TrustIndicator | `TrustIndicator.tsx` | Trust level display |
| [x] | HumanOverride | `HumanOverride.tsx` | Human override controls |

**Total: 6/9 Built** | **Missing: 3**

---

## 4. Epistemic Components (`/components/epistemic/`)
**Product:** EpistemicGuard (D1 - Epistemic Safety)

| Status | Component | File | Purpose |
|--------|-----------|------|---------|
| [x] | ClaimCard | `ClaimCard.tsx` | Claim with truth tier badge |
| [ ] | AuditTimeline | `AuditTimeline.tsx` | Claim verification history |
| [ ] | PIIIndicator | `PIIIndicator.tsx` | PII detection display |
| [x] | SourceCitation | `SourceCitation.tsx` | Evidence source links |
| [ ] | VerdictBadge | `VerdictBadge.tsx` | Audit verdict display |
| [x] | UncertaintyIndicator | `UncertaintyIndicator.tsx` | Uncertainty visualization |
| [x] | UncertaintyLabel | `UncertaintyLabel.tsx` | Uncertainty text label |

**Total: 4/7 Built** | **Missing: 3**

---

## 5. Empirical Components (`/components/empirical/`)
**Product:** EmpiricalGuard (D4 - Empirical Safety)

| Status | Component | File | Purpose |
|--------|-----------|------|---------|
| [x] | MoodSignalIndicator | `MoodSignalIndicator.tsx` | Calm/stressed/crisis display |
| [ ] | AdaptiveUISwitch | `AdaptiveUISwitch.tsx` | UI adaptation mode toggle |
| [x] | BehaviorTimeline | `BehaviorTimeline.tsx` | Session behavior visualization |
| [ ] | TelemetryConsole | `TelemetryConsole.tsx` | Real-time event stream |
| [ ] | SignalExport | `SignalExport.tsx` | Behavior data export |

**Total: 2/5 Built** | **Missing: 3**

---

## 6. BuildLattice Components (`/components/buildlattice/`)
**Product:** BuildLattice Guard (SDLC Governance)

| Status | Component | File | Purpose |
|--------|-----------|------|---------|
| [x] | ContractCard | `ContractCard.tsx` | Contract summary with risk |
| [ ] | DecisionHistory | `DecisionHistory.tsx` | Admissibility decisions |
| [x] | ApprovalFlow | `ApprovalFlow.tsx` | Multi-party approval UI |
| [ ] | PolicyViolation | `PolicyViolation.tsx` | Contract violation display |
| [ ] | RiskBadge | `RiskBadge.tsx` | Risk level indicators |

**Total: 2/5 Built** | **Missing: 3**

---

## 7. Observatory Components (`/components/observatory/`)
**Product:** Evidence Observatory (Research Platform)

| Status | Component | File | Purpose |
|--------|-----------|------|---------|
| [x] | CaseFileCard | `CaseFileCard.tsx` | Case file summary |
| [ ] | EvidenceViewer | `EvidenceViewer.tsx` | Raw artifact display |
| [ ] | BenchmarkTable | `BenchmarkTable.tsx` | Benchmark results |
| [x] | EvalResultChart | `EvalResultChart.tsx` | Model failure visualization |
| [ ] | ProvenanceChain | `ProvenanceChain.tsx` | Artifact lineage |

**Total: 2/5 Built** | **Missing: 3**

---

## 8. Pipeline Components (`/components/pipeline/`)
**Product:** Frostbyte ETL (Data Pipeline)

| Status | Component | File | Purpose |
|--------|-----------|------|---------|
| [ ] | PipelineStatus | `PipelineStatus.tsx` | Stage progress visualization |
| [x] | AdapterBar | `AdapterBar.tsx` | Active adapters display |
| [x] | SSEConsole | `SSEConsole.tsx` | Real-time event stream |
| [ ] | DLQViewer | `DLQViewer.tsx` | Dead letter queue |
| [ ] | HealthCheck | `HealthCheck.tsx` | Service health indicators |

**Total: 2/5 Built** | **Missing: 3**

---

## 9. Control Plane Components (`/components/control-plane/`)
**Product:** TLC Control Plane (Governance UI)

| Status | Component | File | Purpose |
|--------|-----------|------|---------|
| [x] | StatusIndicator | `StatusIndicator.tsx` | System status display |
| [x] | InvariantDisplay | `InvariantDisplay.tsx` | 37 invariants visualization |
| [x] | TopologyViewer | `TopologyViewer.tsx` | Dual topology display |
| [x] | EvidenceLedger | `EvidenceLedger.tsx` | Immutable audit trail |

**Total: 4/4 Built**

---

## 10. Layout Components (`/components/layout/`)
**Product:** Core ZMUX Design System

| Status | Component | File | Purpose |
|--------|-----------|------|---------|
| [ ] | SanctuaryShell | `SanctuaryShell.tsx` | Main app shell |
| [ ] | ContentWell | `ContentWell.tsx` | Content container |
| [ ] | SplitView | `SplitView.tsx` | Split panel layout |
| [ ] | CardGrid | `CardGrid.tsx` | Responsive card grid |
| [ ] | DashboardLayout | `DashboardLayout.tsx` | Dashboard layout |
| [ ] | SideNav | `SideNav.tsx` | Side navigation |
| [ ] | Breadcrumb | `Breadcrumb.tsx` | Breadcrumb navigation |
| [ ] | QuickExit | `QuickExit.tsx` | Quick exit button |
| [x] | SafetyHeader | `SafetyHeader.tsx` | Header with safety controls |
| [ ] | CommandPalette | `CommandPalette.tsx` | Command palette |
| [x] | SafetyShell | `SafetyShell.tsx` | Safety-aware shell |
| [x] | SanctuaryLayout | `SanctuaryLayout.tsx` | Sanctuary aesthetic layout |

**Total: 3/12 Built** | **Missing: 9**

---

## 11. SentinelOS Safety Hooks (`/hooks/sentinel/`)
**Product:** SentinelOS (Safety Orchestration)

| Status | Hook | Invariant | Purpose |
|--------|------|-----------|---------|
| [ ] | useEpistemicDisclosure | I1 | Truth disclosure enforcement |
| [ ] | useTruthTier | I1 | Truth tier management |
| [ ] | useHumanEscalation | I2 | Human escalation path |
| [ ] | useCrisisDetection | I2 | Crisis mode detection |
| [ ] | useConsentGate | I3 | Consent gate enforcement |
| [ ] | useConsentRevocation | I3 | Consent revocation |
| [ ] | useCognitiveLoadMonitor | I4 | Cognitive load tracking |
| [ ] | useSimplifiedMode | I4 | Simplified mode toggle |
| [ ] | useEmotionalStateCheck | I5 | Emotional state monitoring |
| [ ] | useMoodSignal | I5 | Mood signal integration |
| [ ] | useSafetyMetrics | I6 | Safety metrics tracking |
| [ ] | useBehaviorObservation | I6 | Behavior observation |

**Note:** Combined hook `useSentinel` exists in `/hooks/use-sentinel.ts`

**Total: 1/12 Built** | **Missing: 11 individual hooks**

---

## 12. Providers (`/providers/`)
**Product:** Core ZMUX Design System

| Status | Provider | File | Purpose |
|--------|----------|------|---------|
| [x] | ThemeProvider | `ThemeProvider.tsx` | Theme management |
| [x] | AccessibilityProvider | `AccessibilityProvider.tsx` | A11y preferences |
| [x] | SessionProvider | `SessionProvider.tsx` | Session tracking |
| [x] | SentinelProvider | `SentinelProvider.tsx` | Safety state |

**Total: 4/4 Built**

---

## Summary

| Domain | Built | Specified | Coverage |
|--------|-------|-----------|----------|
| Glass | 4 | 4 | 100% |
| UICare | 11 | 15 | 73% |
| HumanGuard | 6 | 9 | 67% |
| Epistemic | 4 | 7 | 57% |
| Empirical | 2 | 5 | 40% |
| BuildLattice | 2 | 5 | 40% |
| Observatory | 2 | 5 | 40% |
| Pipeline | 2 | 5 | 40% |
| Control Plane | 4 | 4 | 100% |
| Layout | 3 | 12 | 25% |
| Sentinel Hooks | 1 | 12 | 8% |
| Providers | 4 | 4 | 100% |
| **TOTAL** | **45** | **87** | **52%** |

---

## Missing Components Priority

### High Priority (Safety-Critical)
1. `HarmScanner` - Content harm detection
2. `ConfirmationDialog` - Safe action confirmation
3. `PrivacyDashboard` - Privacy settings
4. `IncidentReport` - Safety incident reporting
5. All individual SentinelOS hooks

### Medium Priority (Product Features)
1. `SensoryBreak` - Sensory regulation
2. `ProgressIndicator` - Step progress
3. `TrustIndicator` - Trust level display
4. `AuditTimeline` - Verification history
5. `PIIIndicator` - PII detection
6. `VerdictBadge` - Audit verdict
7. `AdaptiveUISwitch` - UI adaptation
8. `TelemetryConsole` - Event stream
9. `SignalExport` - Data export
10. `DecisionHistory` - Admissibility
11. `PolicyViolation` - Violations
12. `RiskBadge` - Risk levels
13. `EvidenceViewer` - Artifact display
14. `BenchmarkTable` - Benchmarks
15. `ProvenanceChain` - Lineage
16. `PipelineStatus` - Stage progress
17. `DLQViewer` - Dead letter queue
18. `HealthCheck` - Service health

### Lower Priority (Layout/UX)
1. `SanctuaryShell` - App shell
2. `ContentWell` - Content container
3. `SplitView` - Split layout
4. `CardGrid` - Card grid
5. `DashboardLayout` - Dashboard
6. `SideNav` - Navigation
7. `Breadcrumb` - Breadcrumb
8. `QuickExit` - Exit button
9. `CommandPalette` - Command palette
