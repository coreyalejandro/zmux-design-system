'use client'

/**
 * ZMUX Design System - Session Provider
 * 
 * Manages session safety:
 * - Session duration tracking
 * - Break reminders
 * - Activity state monitoring
 * - Wellness check-in scheduling
 * 
 * Part of The Living Constitution (TLC) Design System
 * 
 * @invariant INVARIANT_I2 - Human Safety: Break reminders available
 * @invariant INVARIANT_I5 - Emotional Safety: Wellness check-ins
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

export type ActivityState = 'active' | 'idle' | 'away'
export type WellnessState = 'good' | 'neutral' | 'needs-break' | 'unknown'

interface SessionState {
  sessionStartTime: number
  sessionDuration: number
  lastActivityTime: number
  activityState: ActivityState
  wellnessState: WellnessState
  breaksTaken: number
  lastBreakTime: number | null
  isBreakDue: boolean
  lastWellnessCheck: number | null
}

interface SessionConfig {
  breakReminderInterval: number  // ms before suggesting break
  idleTimeout: number            // ms before marking idle
  awayTimeout: number            // ms before marking away
  wellnessCheckInterval: number  // ms between wellness checks
}

interface SessionContextValue extends SessionState {
  config: SessionConfig
  startSession: () => void
  endSession: () => void
  recordActivity: () => void
  takeBreak: () => void
  dismissBreakReminder: () => void
  setWellnessState: (state: WellnessState) => void
  recordWellnessCheck: () => void
  formatDuration: (ms: number) => string
}

const SessionContext = createContext<SessionContextValue | undefined>(undefined)

const DEFAULT_CONFIG: SessionConfig = {
  breakReminderInterval: 45 * 60 * 1000,  // 45 minutes
  idleTimeout: 5 * 60 * 1000,             // 5 minutes
  awayTimeout: 15 * 60 * 1000,            // 15 minutes
  wellnessCheckInterval: 30 * 60 * 1000,  // 30 minutes
}

const STORAGE_KEY = 'zmux-session'

interface SessionProviderProps {
  children: ReactNode
  config?: Partial<SessionConfig>
  onBreakDue?: () => void
  onWellnessCheckDue?: () => void
}

export function SessionProvider({
  children,
  config: userConfig,
  onBreakDue,
  onWellnessCheckDue,
}: SessionProviderProps) {
  const config = { ...DEFAULT_CONFIG, ...userConfig }
  
  const [state, setState] = useState<SessionState>({
    sessionStartTime: Date.now(),
    sessionDuration: 0,
    lastActivityTime: Date.now(),
    activityState: 'active',
    wellnessState: 'unknown',
    breaksTaken: 0,
    lastBreakTime: null,
    isBreakDue: false,
    lastWellnessCheck: null,
  })

  const activityTimerRef = useRef<NodeJS.Timeout | null>(null)
  const durationTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize from storage
  useEffect(() => {
    const stored = sessionStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setState(prev => ({
          ...prev,
          ...parsed,
          sessionDuration: Date.now() - parsed.sessionStartTime,
        }))
      } catch {
        // Invalid JSON, use defaults
      }
    }
  }, [])

  // Save to storage on changes
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  // Update session duration every second
  useEffect(() => {
    durationTimerRef.current = setInterval(() => {
      setState(prev => ({
        ...prev,
        sessionDuration: Date.now() - prev.sessionStartTime,
      }))
    }, 1000)

    return () => {
      if (durationTimerRef.current) {
        clearInterval(durationTimerRef.current)
      }
    }
  }, [])

  // Monitor activity state
  useEffect(() => {
    const checkActivityState = () => {
      const now = Date.now()
      const timeSinceActivity = now - state.lastActivityTime

      let newActivityState: ActivityState = 'active'
      if (timeSinceActivity >= config.awayTimeout) {
        newActivityState = 'away'
      } else if (timeSinceActivity >= config.idleTimeout) {
        newActivityState = 'idle'
      }

      if (newActivityState !== state.activityState) {
        setState(prev => ({ ...prev, activityState: newActivityState }))
      }
    }

    activityTimerRef.current = setInterval(checkActivityState, 1000)

    return () => {
      if (activityTimerRef.current) {
        clearInterval(activityTimerRef.current)
      }
    }
  }, [state.lastActivityTime, state.activityState, config.idleTimeout, config.awayTimeout])

  // Check for break reminder
  useEffect(() => {
    const timeSinceBreak = state.lastBreakTime
      ? Date.now() - state.lastBreakTime
      : state.sessionDuration

    const shouldRemind = timeSinceBreak >= config.breakReminderInterval && !state.isBreakDue

    if (shouldRemind) {
      setState(prev => ({ ...prev, isBreakDue: true }))
      onBreakDue?.()
    }
  }, [state.sessionDuration, state.lastBreakTime, state.isBreakDue, config.breakReminderInterval, onBreakDue])

  // Check for wellness check
  useEffect(() => {
    if (!state.lastWellnessCheck) return

    const timeSinceCheck = Date.now() - state.lastWellnessCheck
    if (timeSinceCheck >= config.wellnessCheckInterval) {
      onWellnessCheckDue?.()
    }
  }, [state.sessionDuration, state.lastWellnessCheck, config.wellnessCheckInterval, onWellnessCheckDue])

  // Activity event listeners
  useEffect(() => {
    const handleActivity = () => {
      setState(prev => ({
        ...prev,
        lastActivityTime: Date.now(),
        activityState: 'active',
      }))
    }

    const events = ['mousedown', 'keydown', 'touchstart', 'scroll']
    events.forEach(event => {
      window.addEventListener(event, handleActivity, { passive: true })
    })

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, handleActivity)
      })
    }
  }, [])

  const startSession = useCallback(() => {
    setState({
      sessionStartTime: Date.now(),
      sessionDuration: 0,
      lastActivityTime: Date.now(),
      activityState: 'active',
      wellnessState: 'unknown',
      breaksTaken: 0,
      lastBreakTime: null,
      isBreakDue: false,
      lastWellnessCheck: null,
    })
  }, [])

  const endSession = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY)
    startSession()
  }, [startSession])

  const recordActivity = useCallback(() => {
    setState(prev => ({
      ...prev,
      lastActivityTime: Date.now(),
      activityState: 'active',
    }))
  }, [])

  const takeBreak = useCallback(() => {
    setState(prev => ({
      ...prev,
      breaksTaken: prev.breaksTaken + 1,
      lastBreakTime: Date.now(),
      isBreakDue: false,
    }))
  }, [])

  const dismissBreakReminder = useCallback(() => {
    setState(prev => ({ ...prev, isBreakDue: false }))
  }, [])

  const setWellnessState = useCallback((wellnessState: WellnessState) => {
    setState(prev => ({ ...prev, wellnessState }))
  }, [])

  const recordWellnessCheck = useCallback(() => {
    setState(prev => ({ ...prev, lastWellnessCheck: Date.now() }))
  }, [])

  const formatDuration = useCallback((ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)

    if (hours > 0) {
      return `${hours}h ${minutes % 60}m`
    }
    if (minutes > 0) {
      return `${minutes}m`
    }
    return `${seconds}s`
  }, [])

  return (
    <SessionContext.Provider
      value={{
        ...state,
        config,
        startSession,
        endSession,
        recordActivity,
        takeBreak,
        dismissBreakReminder,
        setWellnessState,
        recordWellnessCheck,
        formatDuration,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export function useSession() {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider')
  }
  return context
}
