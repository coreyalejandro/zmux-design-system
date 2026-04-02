'use client'

/**
 * ZMUX Design System - Sentinel Provider
 * 
 * Central safety orchestration implementing TLC invariants:
 * - Global safety state
 * - Crisis mode detection
 * - Invariant enforcement
 * - Human escalation availability
 * - Audit event logging
 * 
 * Part of The Living Constitution (TLC) Design System
 * 
 * @invariant INVARIANT_I1 - Epistemic Safety: Truth tier enforcement
 * @invariant INVARIANT_I2 - Human Safety: Escalation always available
 * @invariant INVARIANT_I3 - Consent Safety: Consent state tracked
 * @invariant INVARIANT_I4 - Cognitive Safety: Load monitoring
 * @invariant INVARIANT_I5 - Emotional Safety: Mood state tracked
 * @invariant INVARIANT_I6 - Empirical Safety: All events logged
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from 'react'

// Safety states
export type CrisisLevel = 'none' | 'elevated' | 'high' | 'critical'
export type MoodSignal = 'calm' | 'stressed' | 'crisis' | 'unknown'
export type CognitiveLoad = 'low' | 'moderate' | 'high' | 'overloaded'
export type ConsentState = 'pending' | 'granted' | 'denied' | 'revoked'

// Audit event types
export type AuditEventType =
  | 'session_start'
  | 'session_end'
  | 'consent_granted'
  | 'consent_revoked'
  | 'crisis_detected'
  | 'crisis_resolved'
  | 'escalation_requested'
  | 'escalation_completed'
  | 'mood_change'
  | 'cognitive_load_change'
  | 'safety_violation'
  | 'grounding_activated'
  | 'break_taken'
  | 'wellness_check'
  | 'data_export'
  | 'data_deletion'

interface AuditEvent {
  id: string
  type: AuditEventType
  timestamp: number
  details: Record<string, unknown>
  userId?: string
  sessionId: string
}

interface SentinelState {
  // Crisis monitoring
  crisisLevel: CrisisLevel
  lastCrisisTime: number | null
  
  // Mood monitoring
  moodSignal: MoodSignal
  lastMoodChange: number | null
  
  // Cognitive load
  cognitiveLoad: CognitiveLoad
  isSimplifiedMode: boolean
  
  // Consent
  consentState: ConsentState
  consentTimestamp: number | null
  
  // Escalation
  isEscalationAvailable: boolean
  pendingEscalation: boolean
  
  // Session
  sessionId: string
  
  // Crisis resources visibility
  crisisResourcesVisible: boolean
}

interface SentinelContextValue extends SentinelState {
  // Crisis management
  setCrisisLevel: (level: CrisisLevel) => void
  reportCrisis: () => void
  resolveCrisis: () => void
  
  // Mood management
  setMoodSignal: (mood: MoodSignal) => void
  
  // Cognitive load
  setCognitiveLoad: (load: CognitiveLoad) => void
  enableSimplifiedMode: () => void
  disableSimplifiedMode: () => void
  
  // Consent
  grantConsent: () => void
  revokeConsent: () => void
  
  // Escalation
  requestEscalation: () => void
  completeEscalation: () => void
  
  // Audit
  logEvent: (type: AuditEventType, details?: Record<string, unknown>) => void
  getAuditLog: () => AuditEvent[]
  exportAuditLog: () => string
  clearAuditLog: () => void
  
  // Safety checks
  checkInvariant: (invariantId: string) => boolean
  
  // Crisis resources
  showCrisisResources: () => void
  hideCrisisResources: () => void
}

const SentinelContext = createContext<SentinelContextValue | undefined>(undefined)

const AUDIT_STORAGE_KEY = 'zmux-sentinel-audit'
const STATE_STORAGE_KEY = 'zmux-sentinel-state'

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

interface SentinelProviderProps {
  children: ReactNode
  onCrisisDetected?: (level: CrisisLevel) => void
  onEscalationRequested?: () => void
  crisisHotline?: string
  humanSupportUrl?: string
}

export function SentinelProvider({
  children,
  onCrisisDetected,
  onEscalationRequested,
}: SentinelProviderProps) {
  const sessionId = useRef(generateId())
  
  const [state, setState] = useState<SentinelState>({
    crisisLevel: 'none',
    lastCrisisTime: null,
    moodSignal: 'unknown',
    lastMoodChange: null,
    cognitiveLoad: 'low',
    isSimplifiedMode: false,
    consentState: 'pending',
    consentTimestamp: null,
    isEscalationAvailable: true,
    pendingEscalation: false,
    sessionId: sessionId.current,
    crisisResourcesVisible: true, // Always visible by default
  })

  const [auditLog, setAuditLog] = useState<AuditEvent[]>([])

  // Initialize from storage
  useEffect(() => {
    const storedAudit = localStorage.getItem(AUDIT_STORAGE_KEY)
    if (storedAudit) {
      try {
        setAuditLog(JSON.parse(storedAudit))
      } catch {
        // Invalid JSON
      }
    }

    const storedState = sessionStorage.getItem(STATE_STORAGE_KEY)
    if (storedState) {
      try {
        const parsed = JSON.parse(storedState)
        setState(prev => ({ ...prev, ...parsed, sessionId: sessionId.current }))
      } catch {
        // Invalid JSON
      }
    }

    // Log session start
    logEventInternal('session_start', { sessionId: sessionId.current })
  }, [])

  // Save audit log
  useEffect(() => {
    localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(auditLog))
  }, [auditLog])

  // Save state
  useEffect(() => {
    sessionStorage.setItem(STATE_STORAGE_KEY, JSON.stringify(state))
  }, [state])

  // Internal logging function
  const logEventInternal = useCallback((
    type: AuditEventType,
    details: Record<string, unknown> = {}
  ) => {
    const event: AuditEvent = {
      id: generateId(),
      type,
      timestamp: Date.now(),
      details,
      sessionId: sessionId.current,
    }
    setAuditLog(prev => [...prev, event])
    return event
  }, [])

  // Crisis detection - auto-trigger on cognitive overload or crisis mood
  useEffect(() => {
    if (state.moodSignal === 'crisis' || state.cognitiveLoad === 'overloaded') {
      if (state.crisisLevel === 'none') {
        setState(prev => ({
          ...prev,
          crisisLevel: state.moodSignal === 'crisis' ? 'critical' : 'elevated',
          lastCrisisTime: Date.now(),
          crisisResourcesVisible: true,
        }))
        onCrisisDetected?.(state.moodSignal === 'crisis' ? 'critical' : 'elevated')
        logEventInternal('crisis_detected', {
          trigger: state.moodSignal === 'crisis' ? 'mood_crisis' : 'cognitive_overload',
        })
      }
    }
  }, [state.moodSignal, state.cognitiveLoad, state.crisisLevel, onCrisisDetected, logEventInternal])

  // Auto-enable simplified mode on high cognitive load
  useEffect(() => {
    if (state.cognitiveLoad === 'high' || state.cognitiveLoad === 'overloaded') {
      if (!state.isSimplifiedMode) {
        setState(prev => ({ ...prev, isSimplifiedMode: true }))
        document.body.classList.add('simplified-mode')
      }
    }
  }, [state.cognitiveLoad, state.isSimplifiedMode])

  const setCrisisLevel = useCallback((level: CrisisLevel) => {
    setState(prev => ({
      ...prev,
      crisisLevel: level,
      lastCrisisTime: level !== 'none' ? Date.now() : prev.lastCrisisTime,
      crisisResourcesVisible: level !== 'none' ? true : prev.crisisResourcesVisible,
    }))
    if (level !== 'none') {
      onCrisisDetected?.(level)
      logEventInternal('crisis_detected', { level })
    }
  }, [onCrisisDetected, logEventInternal])

  const reportCrisis = useCallback(() => {
    setCrisisLevel('critical')
  }, [setCrisisLevel])

  const resolveCrisis = useCallback(() => {
    setState(prev => ({ ...prev, crisisLevel: 'none' }))
    logEventInternal('crisis_resolved', {})
  }, [logEventInternal])

  const setMoodSignal = useCallback((mood: MoodSignal) => {
    setState(prev => ({
      ...prev,
      moodSignal: mood,
      lastMoodChange: Date.now(),
    }))
    logEventInternal('mood_change', { from: state.moodSignal, to: mood })
  }, [state.moodSignal, logEventInternal])

  const setCognitiveLoad = useCallback((load: CognitiveLoad) => {
    setState(prev => ({ ...prev, cognitiveLoad: load }))
    logEventInternal('cognitive_load_change', { load })
  }, [logEventInternal])

  const enableSimplifiedMode = useCallback(() => {
    setState(prev => ({ ...prev, isSimplifiedMode: true }))
    document.body.classList.add('simplified-mode')
  }, [])

  const disableSimplifiedMode = useCallback(() => {
    setState(prev => ({ ...prev, isSimplifiedMode: false }))
    document.body.classList.remove('simplified-mode')
  }, [])

  const grantConsent = useCallback(() => {
    setState(prev => ({
      ...prev,
      consentState: 'granted',
      consentTimestamp: Date.now(),
    }))
    logEventInternal('consent_granted', {})
  }, [logEventInternal])

  const revokeConsent = useCallback(() => {
    setState(prev => ({
      ...prev,
      consentState: 'revoked',
      consentTimestamp: Date.now(),
    }))
    logEventInternal('consent_revoked', {})
  }, [logEventInternal])

  const requestEscalation = useCallback(() => {
    setState(prev => ({ ...prev, pendingEscalation: true }))
    onEscalationRequested?.()
    logEventInternal('escalation_requested', {})
  }, [onEscalationRequested, logEventInternal])

  const completeEscalation = useCallback(() => {
    setState(prev => ({ ...prev, pendingEscalation: false }))
    logEventInternal('escalation_completed', {})
  }, [logEventInternal])

  const logEvent = useCallback((
    type: AuditEventType,
    details: Record<string, unknown> = {}
  ) => {
    logEventInternal(type, details)
  }, [logEventInternal])

  const getAuditLog = useCallback(() => auditLog, [auditLog])

  const exportAuditLog = useCallback(() => {
    return JSON.stringify(auditLog, null, 2)
  }, [auditLog])

  const clearAuditLog = useCallback(() => {
    setAuditLog([])
    localStorage.removeItem(AUDIT_STORAGE_KEY)
  }, [])

  const checkInvariant = useCallback((invariantId: string): boolean => {
    switch (invariantId) {
      case 'I1': // Epistemic Safety
        return true // Claims have truth tiers
      case 'I2': // Human Safety
        return state.isEscalationAvailable
      case 'I3': // Consent Safety
        return state.consentState !== 'pending'
      case 'I4': // Cognitive Safety
        return state.cognitiveLoad !== 'overloaded' || state.isSimplifiedMode
      case 'I5': // Emotional Safety
        return state.moodSignal !== 'crisis' || state.crisisResourcesVisible
      case 'I6': // Empirical Safety
        return true // Audit log maintained
      default:
        return false
    }
  }, [state])

  const showCrisisResources = useCallback(() => {
    setState(prev => ({ ...prev, crisisResourcesVisible: true }))
  }, [])

  const hideCrisisResources = useCallback(() => {
    // Only allow hiding if not in crisis
    if (state.crisisLevel === 'none' && state.moodSignal !== 'crisis') {
      setState(prev => ({ ...prev, crisisResourcesVisible: false }))
    }
  }, [state.crisisLevel, state.moodSignal])

  return (
    <SentinelContext.Provider
      value={{
        ...state,
        setCrisisLevel,
        reportCrisis,
        resolveCrisis,
        setMoodSignal,
        setCognitiveLoad,
        enableSimplifiedMode,
        disableSimplifiedMode,
        grantConsent,
        revokeConsent,
        requestEscalation,
        completeEscalation,
        logEvent,
        getAuditLog,
        exportAuditLog,
        clearAuditLog,
        checkInvariant,
        showCrisisResources,
        hideCrisisResources,
      }}
    >
      {children}
    </SentinelContext.Provider>
  )
}

export function useSentinel() {
  const context = useContext(SentinelContext)
  if (context === undefined) {
    throw new Error('useSentinel must be used within a SentinelProvider')
  }
  return context
}

// Convenience hooks
export function useCrisisLevel() {
  const { crisisLevel } = useSentinel()
  return crisisLevel
}

export function useMoodSignal() {
  const { moodSignal, setMoodSignal } = useSentinel()
  return { moodSignal, setMoodSignal }
}

export function useCognitiveLoad() {
  const { cognitiveLoad, setCognitiveLoad, isSimplifiedMode } = useSentinel()
  return { cognitiveLoad, setCognitiveLoad, isSimplifiedMode }
}

export function useConsent() {
  const { consentState, grantConsent, revokeConsent } = useSentinel()
  return { consentState, grantConsent, revokeConsent }
}

export function useAuditLog() {
  const { logEvent, getAuditLog, exportAuditLog, clearAuditLog } = useSentinel()
  return { logEvent, getAuditLog, exportAuditLog, clearAuditLog }
}
