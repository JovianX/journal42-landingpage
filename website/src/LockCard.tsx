import { useEffect, useRef, useState } from 'react'

const CIPHER_LINES = [
  'a8f3 ·· k2m9 ·· qx71 ·· b4e2',
  'r0p5 ·· n7w1 ·· c3d8 ·· h6j4',
  'm2v9 ·· t5y1 ·· z8a3 ·· u4s7',
]

const LOCK_STEP_MS = 360

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function LockIcon() {
  return (
    <svg className="btn-icon" viewBox="0 0 16 16" aria-hidden="true">
      <rect
        x="3.5"
        y="7"
        width="9"
        height="7"
        rx="1.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M5.4 7V5.2a2.6 2.6 0 0 1 5.2 0V7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function LockCard({
  active,
  thought,
  when = 'Tonight',
}: {
  active: boolean
  thought: string
  when?: string
}) {
  const [phase, setPhase] = useState<'sealed' | 'unlocking' | 'open'>('sealed')
  const [dots, setDots] = useState(0)
  const [playId, setPlayId] = useState(0)
  const runIdRef = useRef(0)
  const reduced = prefersReducedMotion()

  useEffect(() => {
    if (!active) return

    const runId = runIdRef.current + 1
    runIdRef.current = runId

    if (reduced) {
      setPhase('open')
      setDots(4)
      return
    }

    setPhase('sealed')
    setDots(0)

    const timers: number[] = []
    for (let i = 1; i <= 4; i += 1) {
      timers.push(
        window.setTimeout(() => {
          if (runIdRef.current !== runId) return
          setDots(i)
        }, 360 + (i - 1) * LOCK_STEP_MS),
      )
    }
    timers.push(
      window.setTimeout(() => {
        if (runIdRef.current !== runId) return
        setPhase('unlocking')
      }, 360 + 4 * LOCK_STEP_MS),
    )
    timers.push(
      window.setTimeout(() => {
        if (runIdRef.current !== runId) return
        setPhase('open')
      }, 360 + 4 * LOCK_STEP_MS + 580),
    )

    return () => {
      for (const timer of timers) window.clearTimeout(timer)
    }
  }, [active, playId, reduced])

  const open = phase === 'open'

  return (
    <div className="hero-lock-wrap">
      <div
        className={`hero-lock-card${open ? ' is-open' : ''}`}
        aria-live="polite"
      >
        {open ? null : <div className="hero-composer-face" aria-hidden="true" />}

        {open ? (
          <div className="hero-lock-open">
            <article className="hero-thought is-fresh hero-lock-thought">
              <div className="hero-thought-face" aria-hidden="true" />
              <div className="hero-thought-body">
                <div className="hero-passcode-open-meta">
                  <span className="hero-thought-time">{when}</span>
                  <span className="hero-passcode-badge">
                    <LockIcon />
                    Protected
                  </span>
                </div>
                <p className="hero-thought-text">{thought}</p>
              </div>
            </article>
          </div>
        ) : (
          <div className="hero-lock-body">
            <div className="hero-lock-head">
              <span className="hero-lock-pill">
                <LockIcon />
                Journal locked
              </span>
              <span className="hero-lock-status">
                {phase === 'unlocking' ? 'Unlocking…' : 'Encrypted on device'}
              </span>
            </div>

            <div className="hero-lock-cipher" aria-hidden="true">
              {CIPHER_LINES.map((line) => (
                <p key={line} className="hero-lock-cipher-line">
                  {line}
                </p>
              ))}
            </div>

            <div className="hero-lock-pass">
              <span className="hero-passcode-label">Passcode</span>
              <div
                className={`hero-passcode-input${dots > 0 && phase === 'sealed' ? ' is-typing' : ''}`}
              >
                {'•'.repeat(dots)}
                {phase === 'sealed' && dots < 4 ? (
                  <span className="hero-passcode-caret" />
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>

      {open && !reduced ? (
        <button
          type="button"
          className="hero-lock-replay"
          onClick={() => setPlayId((id) => id + 1)}
        >
          See it unlock
        </button>
      ) : null}
    </div>
  )
}
