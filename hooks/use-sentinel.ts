"use client";

import * as React from "react";

// =============================================================================
// SENTINEL OS HOOKS
// TLC Safety Invariants I1-I6 Implementation
// =============================================================================

// =============================================================================
// I1: EPISTEMIC SAFETY HOOK
// No claim presented without verifiable grounding
// =============================================================================

export type TruthTier = "T1" | "T2" | "T3" | "unknown";

export interface EpistemicClaim {
  claim: string;
  tier: TruthTier;
  sources: string[];
  confidence: number;
  verified: boolean;
}

export interface UseEpistemicSafetyOptions {
  requireVerification?: boolean;
  minConfidence?: number;
  onUnverifiedClaim?: (claim: string) => void;
}

export function useEpistemicSafety(options: UseEpistemicSafetyOptions = {}) {
  const { requireVerification = true, minConfidence = 0.7, onUnverifiedClaim } = options;

  const validateClaim = React.useCallback(
    (claim: EpistemicClaim): boolean => {
      if (requireVerification && !claim.verified) {
        onUnverifiedClaim?.(claim.claim);
        return false;
      }
      if (claim.confidence < minConfidence) {
        return false;
      }
      if (claim.tier === "unknown" && claim.sources.length === 0) {
        return false;
      }
      return true;
    },
    [requireVerification, minConfidence, onUnverifiedClaim]
  );

  const getTierLabel = React.useCallback((tier: TruthTier): string => {
    switch (tier) {
      case "T1":
        return "Verified - Strongly supported";
      case "T2":
        return "Probable - Some uncertainty";
      case "T3":
        return "Uncertain - Limited evidence";
      case "unknown":
        return "Unknown - Not evaluated";
    }
  }, []);

  return { validateClaim, getTierLabel };
}

// =============================================================================
// I2: HUMAN SAFETY HOOK
// Human escalation path always available
// =============================================================================

export interface EscalationResource {
  id: string;
  name: string;
  contact: string;
  available: string;
  type: "hotline" | "chat" | "professional" | "emergency";
}

const DEFAULT_RESOURCES: EscalationResource[] = [
  {
    id: "988",
    name: "988 Suicide & Crisis Lifeline",
    contact: "988",
    available: "24/7",
    type: "hotline",
  },
  {
    id: "crisis-text",
    name: "Crisis Text Line",
    contact: "Text HOME to 741741",
    available: "24/7",
    type: "chat",
  },
  {
    id: "911",
    name: "Emergency Services",
    contact: "911",
    available: "24/7",
    type: "emergency",
  },
];

export interface UseHumanSafetyOptions {
  resources?: EscalationResource[];
  onEscalate?: (resource: EscalationResource) => void;
}

export function useHumanSafety(options: UseHumanSafetyOptions = {}) {
  const { resources = DEFAULT_RESOURCES, onEscalate } = options;

  const [isEscalating, setIsEscalating] = React.useState(false);

  const escalate = React.useCallback(
    (resourceId?: string) => {
      setIsEscalating(true);
      const resource = resourceId
        ? resources.find((r) => r.id === resourceId)
        : resources[0];
      if (resource) {
        onEscalate?.(resource);
      }
    },
    [resources, onEscalate]
  );

  const getEmergencyResource = React.useCallback(
    () => resources.find((r) => r.type === "emergency") || resources[0],
    [resources]
  );

  return { resources, escalate, isEscalating, getEmergencyResource };
}

// =============================================================================
// I3: CONSENT SAFETY HOOK
// No action without informed consent
// =============================================================================

export interface ConsentRecord {
  id: string;
  category: string;
  granted: boolean;
  timestamp: Date;
  expiresAt?: Date;
}

export interface UseConsentSafetyOptions {
  persistKey?: string;
  onConsentChange?: (record: ConsentRecord) => void;
}

export function useConsentSafety(options: UseConsentSafetyOptions = {}) {
  const { persistKey = "tlc-consents", onConsentChange } = options;

  const [consents, setConsents] = React.useState<Map<string, ConsentRecord>>(
    new Map()
  );

  // Load from storage on mount
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem(persistKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        const map = new Map<string, ConsentRecord>();
        for (const record of parsed) {
          map.set(record.id, {
            ...record,
            timestamp: new Date(record.timestamp),
            expiresAt: record.expiresAt ? new Date(record.expiresAt) : undefined,
          });
        }
        setConsents(map);
      }
    } catch {
      // Ignore storage errors
    }
  }, [persistKey]);

  // Persist to storage on change
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(
        persistKey,
        JSON.stringify(Array.from(consents.values()))
      );
    } catch {
      // Ignore storage errors
    }
  }, [consents, persistKey]);

  const grantConsent = React.useCallback(
    (id: string, category: string, expiresAt?: Date) => {
      const record: ConsentRecord = {
        id,
        category,
        granted: true,
        timestamp: new Date(),
        expiresAt,
      };
      setConsents((prev) => new Map(prev).set(id, record));
      onConsentChange?.(record);
    },
    [onConsentChange]
  );

  const revokeConsent = React.useCallback(
    (id: string) => {
      setConsents((prev) => {
        const next = new Map(prev);
        const existing = next.get(id);
        if (existing) {
          const record = { ...existing, granted: false, timestamp: new Date() };
          next.set(id, record);
          onConsentChange?.(record);
        }
        return next;
      });
    },
    [onConsentChange]
  );

  const hasConsent = React.useCallback(
    (id: string): boolean => {
      const record = consents.get(id);
      if (!record || !record.granted) return false;
      if (record.expiresAt && record.expiresAt < new Date()) return false;
      return true;
    },
    [consents]
  );

  const requireConsent = React.useCallback(
    (id: string, category: string): Promise<boolean> => {
      return new Promise((resolve) => {
        if (hasConsent(id)) {
          resolve(true);
        } else {
          // This would trigger a consent UI - for now just return false
          resolve(false);
        }
      });
    },
    [hasConsent]
  );

  return { consents, grantConsent, revokeConsent, hasConsent, requireConsent };
}

// =============================================================================
// I4: COGNITIVE SAFETY HOOK
// Monitor and prevent cognitive overload
// =============================================================================

export type CognitiveLoadLevel = "low" | "moderate" | "high" | "overload";

export interface UseCognitiveSafetyOptions {
  maxElementsOnScreen?: number;
  maxDecisionsPerMinute?: number;
  onOverload?: () => void;
}

export function useCognitiveSafety(options: UseCognitiveSafetyOptions = {}) {
  const {
    maxElementsOnScreen = 7,
    maxDecisionsPerMinute = 3,
    onOverload,
  } = options;

  const [loadLevel, setLoadLevel] = React.useState<CognitiveLoadLevel>("low");
  const [elementCount, setElementCount] = React.useState(0);
  const decisionsRef = React.useRef<number[]>([]);

  const recordDecision = React.useCallback(() => {
    const now = Date.now();
    decisionsRef.current = decisionsRef.current.filter(
      (t) => now - t < 60000
    );
    decisionsRef.current.push(now);

    if (decisionsRef.current.length > maxDecisionsPerMinute) {
      setLoadLevel("overload");
      onOverload?.();
    } else if (decisionsRef.current.length > maxDecisionsPerMinute * 0.7) {
      setLoadLevel("high");
    } else if (decisionsRef.current.length > maxDecisionsPerMinute * 0.4) {
      setLoadLevel("moderate");
    } else {
      setLoadLevel("low");
    }
  }, [maxDecisionsPerMinute, onOverload]);

  const updateElementCount = React.useCallback(
    (count: number) => {
      setElementCount(count);
      if (count > maxElementsOnScreen) {
        setLoadLevel((prev) =>
          prev === "overload" ? "overload" : "high"
        );
      }
    },
    [maxElementsOnScreen]
  );

  const shouldSimplify = loadLevel === "high" || loadLevel === "overload";

  return {
    loadLevel,
    elementCount,
    recordDecision,
    updateElementCount,
    shouldSimplify,
  };
}

// =============================================================================
// I5: EMOTIONAL SAFETY HOOK
// Monitor and respond to emotional state
// =============================================================================

export type EmotionalState = "calm" | "neutral" | "stressed" | "elevated" | "crisis";

export interface UseEmotionalSafetyOptions {
  checkInterval?: number; // minutes
  onCrisis?: () => void;
  onStressElevated?: () => void;
}

export function useEmotionalSafety(options: UseEmotionalSafetyOptions = {}) {
  const { checkInterval = 30, onCrisis, onStressElevated } = options;

  const [state, setState] = React.useState<EmotionalState>("neutral");
  const [lastCheck, setLastCheck] = React.useState<Date>(new Date());
  const [checkDue, setCheckDue] = React.useState(false);

  // Check if wellness check is due
  React.useEffect(() => {
    const interval = setInterval(() => {
      const minutesSinceCheck =
        (Date.now() - lastCheck.getTime()) / 1000 / 60;
      setCheckDue(minutesSinceCheck >= checkInterval);
    }, 60000);

    return () => clearInterval(interval);
  }, [lastCheck, checkInterval]);

  const recordState = React.useCallback(
    (newState: EmotionalState) => {
      setState(newState);
      setLastCheck(new Date());
      setCheckDue(false);

      if (newState === "crisis") {
        onCrisis?.();
      } else if (newState === "stressed" || newState === "elevated") {
        onStressElevated?.();
      }
    },
    [onCrisis, onStressElevated]
  );

  const isSafe = state !== "crisis";
  const needsSupport = state === "crisis" || state === "elevated";

  return { state, recordState, checkDue, lastCheck, isSafe, needsSupport };
}

// =============================================================================
// I6: EMPIRICAL SAFETY HOOK
// Continuous monitoring and data-driven adjustments
// =============================================================================

export interface SessionMetrics {
  duration: number; // minutes
  interactions: number;
  breaks: number;
  alertsTriggered: number;
  averageLoadLevel: CognitiveLoadLevel;
}

export interface UseEmpiricalSafetyOptions {
  maxSessionDuration?: number; // minutes
  breakInterval?: number; // minutes
  onBreakRecommended?: () => void;
  onSessionLimitReached?: () => void;
}

export function useEmpiricalSafety(options: UseEmpiricalSafetyOptions = {}) {
  const {
    maxSessionDuration = 120,
    breakInterval = 45,
    onBreakRecommended,
    onSessionLimitReached,
  } = options;

  const [metrics, setMetrics] = React.useState<SessionMetrics>({
    duration: 0,
    interactions: 0,
    breaks: 0,
    alertsTriggered: 0,
    averageLoadLevel: "low",
  });

  const sessionStartRef = React.useRef<Date>(new Date());
  const lastBreakRef = React.useRef<Date>(new Date());

  // Track session duration
  React.useEffect(() => {
    const interval = setInterval(() => {
      const duration = Math.floor(
        (Date.now() - sessionStartRef.current.getTime()) / 1000 / 60
      );
      setMetrics((prev) => ({ ...prev, duration }));

      if (duration >= maxSessionDuration) {
        onSessionLimitReached?.();
      }

      const minutesSinceBreak =
        (Date.now() - lastBreakRef.current.getTime()) / 1000 / 60;
      if (minutesSinceBreak >= breakInterval) {
        onBreakRecommended?.();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [maxSessionDuration, breakInterval, onBreakRecommended, onSessionLimitReached]);

  const recordInteraction = React.useCallback(() => {
    setMetrics((prev) => ({
      ...prev,
      interactions: prev.interactions + 1,
    }));
  }, []);

  const recordBreak = React.useCallback(() => {
    lastBreakRef.current = new Date();
    setMetrics((prev) => ({
      ...prev,
      breaks: prev.breaks + 1,
    }));
  }, []);

  const recordAlert = React.useCallback(() => {
    setMetrics((prev) => ({
      ...prev,
      alertsTriggered: prev.alertsTriggered + 1,
    }));
  }, []);

  const resetSession = React.useCallback(() => {
    sessionStartRef.current = new Date();
    lastBreakRef.current = new Date();
    setMetrics({
      duration: 0,
      interactions: 0,
      breaks: 0,
      alertsTriggered: 0,
      averageLoadLevel: "low",
    });
  }, []);

  return {
    metrics,
    recordInteraction,
    recordBreak,
    recordAlert,
    resetSession,
  };
}

// =============================================================================
// COMBINED SENTINEL HOOK
// All safety invariants in one hook
// =============================================================================

export function useSentinel() {
  const epistemic = useEpistemicSafety();
  const human = useHumanSafety();
  const consent = useConsentSafety();
  const cognitive = useCognitiveSafety();
  const emotional = useEmotionalSafety();
  const empirical = useEmpiricalSafety();

  const isSafe = React.useMemo(() => {
    return (
      emotional.isSafe &&
      cognitive.loadLevel !== "overload"
    );
  }, [emotional.isSafe, cognitive.loadLevel]);

  const needsIntervention = React.useMemo(() => {
    return (
      emotional.needsSupport ||
      cognitive.loadLevel === "overload" ||
      emotional.checkDue
    );
  }, [emotional.needsSupport, cognitive.loadLevel, emotional.checkDue]);

  return {
    epistemic,
    human,
    consent,
    cognitive,
    emotional,
    empirical,
    isSafe,
    needsIntervention,
  };
}

export default useSentinel;
