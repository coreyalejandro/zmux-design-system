'use client'

/**
 * MADMall SafetyLayer — the real ZMUX safety interactions, mounted live.
 *
 * Uses the genuine ZMUX uicare components (no recreation):
 *   - ExitStrategy   (TLC-MM-003 exit sovereignty; Shift+Esc quick-exit)
 *   - PanicButton    (always-available crisis access → 988)
 *   - GroundingReset (box-breathing 4-4-6 grounding ritual)
 *
 * Rendered as a client island inside the server-rendered /mall page.
 */

import * as React from 'react'
import { ExitStrategy } from '@/components/uicare/ExitStrategy'
import { PanicButton } from '@/components/uicare/PanicButton'
import { GroundingReset } from '@/components/uicare/GroundingReset'

export function SafetyLayer() {
  const [grounding, setGrounding] = React.useState(false)

  return (
    <>
      {/* Exit sovereignty — always reachable, Shift+Esc */}
      <ExitStrategy position="top-right" label="Exit" />

      {/* Crisis access — always reachable */}
      <PanicButton position="fixed" label="Get Help" pulse />

      {/* Grounding ritual trigger */}
      <button
        type="button"
        onClick={() => setGrounding(true)}
        style={{
          position: 'fixed',
          bottom: '1rem',
          left: '1rem',
          zIndex: 9999,
          minHeight: 48,
          padding: '0.85rem 1.3rem',
          borderRadius: 100,
          border: 'none',
          cursor: 'pointer',
          fontWeight: 700,
          color: '#fff',
          background: 'var(--clinical-teal, #4b6a6d)',
          boxShadow: '0 10px 30px rgba(75,106,109,.35)',
        }}
        aria-haspopup="dialog"
      >
        🌿 Grounding
      </button>

      {grounding && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Grounding reset"
          onClick={() => setGrounding(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            background: 'rgba(20,20,20,.55)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <GroundingReset technique="breathing" />
            <div style={{ textAlign: 'center', marginTop: 14 }}>
              <button
                type="button"
                onClick={() => setGrounding(false)}
                style={{
                  border: '1px solid rgba(252,250,242,.4)',
                  background: 'transparent',
                  color: '#fcfaf2',
                  borderRadius: 100,
                  padding: '0.5rem 1.2rem',
                  cursor: 'pointer',
                  fontSize: '.8rem',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
