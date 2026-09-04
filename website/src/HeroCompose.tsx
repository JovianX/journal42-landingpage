import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { trackEvent } from './analytics'
import { appSignupUrl } from './appUrl'
import { saveHeroDraft } from './heroDraft'
import { MIN_DEMO_DRAFT_CHARS, requestDemoReflection } from './reflectDemo'

type DemoScene = 'write' | 'lock' | 'voice'

type DemoThought = {
  id: string
  text: string
  createdAt: number
}

type DemoEntry = {
  id: string
  text: string
  reflection: string
  words: string[]
}

const CHAPTERS: { id: DemoScene; chip: string }[] = [
  { id: 'write', chip: 'Write' },
  { id: 'lock', chip: 'Lock' },
  { id: 'voice', chip: 'Voice' },
]

/** Shared across Write, Lock, and Voice for one continuous night. */
const ENTRIES: DemoEntry[] = [
  {
    id: 'quiet-house',
    text: 'House is quiet. My head is not.',
    reflection:
      'Everyone else got to stop. You are still carrying the day. Write the line that will not sleep, and let the quiet include you.',
    words: ['House', 'is', 'quiet.', 'My', 'head', 'is', 'not.'],
  },
  {
    id: 'brought-meeting',
    text: 'Left the office. Brought the meeting with me.',
    reflection:
      'You walked out. The meeting followed you home. Write what is still arguing, and let the night begin without it.',
    words: [
      'Left',
      'the',
      'office.',
      'Brought',
      'the',
      'meeting',
      'with',
      'me.',
    ],
  },
  {
    id: 'thing-unsaid',
    text: "They moved on. I'm still on the thing I didn't say.",
    reflection:
      'They already left that moment. You are still stuck on the sentence you swallowed. Write it now, before it takes the whole night.',
    words: [
      'They',
      'moved',
      'on.',
      "I'm",
      'still',
      'on',
      'the',
      'thing',
      'I',
      "didn't",
      'say.',
    ],
  },
  {
    id: 'three-sentences',
    text: 'Same three sentences on rotate in my head for the past hour.',
    reflection:
      'An hour of the same three lines, and still no ending. Write them once so they stop owning the night.',
    words: [
      'Same',
      'three',
      'sentences',
      'on',
      'rotate',
      'in',
      'my',
      'head',
      'for',
      'the',
      'past',
      'hour.',
    ],
  },
]

const CIPHER_LINES = [
  'a8f3 ·· k2m9 ·· qx71 ·· b4e2',
  'r0p5 ·· n7w1 ·· c3d8 ·· h6j4',
  'm2v9 ·· t5y1 ·· z8a3 ·· u4s7',
]

const FALLBACK_REFLECTION =
  'Naming it already loosens the loop. Less about solving it now, more about not carrying it alone.'

const FORMING_MS = 850
const LOCK_STEP_MS = 360
const VOICE_WORD_MS = 300

function pickRandomEntry(): DemoEntry {
  return ENTRIES[Math.floor(Math.random() * ENTRIES.length)] ?? ENTRIES[0]
}

function autosizeTextarea(el: HTMLTextAreaElement | null) {
  if (!el) return
  el.style.height = 'auto'
  el.style.height = `${el.scrollHeight}px`
}

function formatTime(timestamp: number) {
  return new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(timestamp))
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function reflectionFor(text: string): string {
  const exact = ENTRIES.find((entry) => entry.text === text)
  if (exact) return exact.reflection
  return FALLBACK_REFLECTION
}

function DropIcon() {
  return (
    <svg className="btn-icon" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M8 3v9.2m0 0L4.3 8.5M8 12.2 11.7 8.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function LockIcon() {
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

function MicIcon({ active }: { active: boolean }) {
  if (active) {
    return (
      <svg className="btn-icon" viewBox="0 0 16 16" aria-hidden="true">
        <rect x="4.5" y="4.5" width="7" height="7" rx="1.2" fill="currentColor" />
      </svg>
    )
  }

  return (
    <svg className="btn-icon" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M8 2.2a2.3 2.3 0 0 0-2.3 2.3v3.4A2.3 2.3 0 0 0 8 10.2a2.3 2.3 0 0 0 2.3-2.3V4.5A2.3 2.3 0 0 0 8 2.2Z"
        fill="currentColor"
      />
      <path
        d="M4.8 7.1v.6a3.2 3.2 0 0 0 6.4 0v-.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M8 11.1v2.2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function ReflectionOrb() {
  return (
    <span className="hero-reflection-orb" aria-hidden="true">
      <span className="hero-reflection-orb-aura" />
      <span className="hero-reflection-orb-core" />
    </span>
  )
}

function SceneShell({
  active,
  labelledBy,
  children,
}: {
  active: boolean
  labelledBy: string
  children: ReactNode
}) {
  return (
    <div
      className="hero-demo-panel"
      role="tabpanel"
      aria-labelledby={labelledBy}
      hidden={!active}
    >
      {children}
    </div>
  )
}

function SceneProof({
  children,
  id,
}: {
  children: ReactNode
  id?: string
}) {
  return (
    <p id={id} className="hero-scene-proof">
      {children}
    </p>
  )
}

function SceneCta({
  proof,
  title,
  event,
  secondary,
  href,
  onClick,
}: {
  proof: string
  title: string
  event: string
  secondary?: ReactNode
  href?: string
  onClick?: () => void
}) {
  return (
    <div className="hero-scene-invite">
      <SceneProof>{proof}</SceneProof>
      <p className="hero-scene-invite-title">{title}</p>
      <a
        className="btn-primary hero-scene-invite-cta"
        href={href ?? appSignupUrl()}
        onClick={() => {
          onClick?.()
          trackEvent(event)
        }}
      >
        Start yours
      </a>
      {secondary}
    </div>
  )
}

function WriteScene({
  active,
  autoplay,
  entry,
  onInteract,
  onSettled,
}: {
  active: boolean
  autoplay: boolean
  entry: DemoEntry
  onInteract: () => void
  onSettled: () => void
}) {
  const inputId = useId()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const bootstrapped = useRef(false)

  const initialAuto = autoplay && !prefersReducedMotion()
  const [draft, setDraft] = useState('')
  const [sending, setSending] = useState(false)
  const [thought, setThought] = useState<DemoThought | null>(() =>
    autoplay
      ? {
          id: 'hero-boot',
          text: entry.text,
          createdAt: Date.now(),
        }
      : null,
  )
  const [fresh, setFresh] = useState(autoplay)
  const [focused, setFocused] = useState(false)
  const [payoffPhase, setPayoffPhase] = useState<'idle' | 'forming' | 'ready'>(
    () => (autoplay ? 'forming' : 'idle'),
  )
  const [reflection, setReflection] = useState<string | null>(() =>
    autoplay ? entry.reflection : null,
  )
  const [ownedDraft, setOwnedDraft] = useState(false)
  const [livePending, setLivePending] = useState(false)
  const startedRef = useRef(false)
  const settledRef = useRef(false)
  const droppedRef = useRef(autoplay)
  const reflectRequestRef = useRef(0)

  const demoActive =
    !focused && draft.length === 0 && !thought && payoffPhase === 'idle'
  const typedReady = draft.trim().length >= MIN_DEMO_DRAFT_CHARS
  const canDrop = demoActive || typedReady
  const showPayoff = payoffPhase !== 'idle' && thought

  useLayoutEffect(() => {
    if (!active) return
    autosizeTextarea(inputRef.current)
  }, [draft, demoActive, active])

  useEffect(() => {
    if (!fresh) return
    const timer = window.setTimeout(() => setFresh(false), 1200)
    return () => window.clearTimeout(timer)
  }, [fresh])

  useEffect(() => {
    if (!sending) return
    const timer = window.setTimeout(() => setSending(false), 320)
    return () => window.clearTimeout(timer)
  }, [sending])

  useEffect(() => {
    if (payoffPhase !== 'forming' || !reflection || livePending) return
    if (autoplay && !bootstrapped.current) {
      bootstrapped.current = true
      trackEvent('hero_compose_drop', {
        length: entry.text.length,
        source: 'auto',
      })
      trackEvent('hero_compose_use_example', { situation: `auto:${entry.id}` })
    }
    const delay = prefersReducedMotion() ? 0 : FORMING_MS
    const timer = window.setTimeout(() => {
      setPayoffPhase('ready')
      trackEvent('hero_payoff_shown')
    }, delay)
    return () => window.clearTimeout(timer)
  }, [payoffPhase, reflection, livePending, autoplay, entry.id, entry.text])

  useEffect(() => {
    if (payoffPhase !== 'ready' || settledRef.current) return
    settledRef.current = true
    onSettled()
  }, [payoffPhase, onSettled])

  // If reduced motion, land on ready immediately after mount bootstrap.
  useEffect(() => {
    if (!autoplay || !initialAuto) return
    if (!prefersReducedMotion()) return
    setPayoffPhase('ready')
  }, [autoplay, initialAuto])

  useEffect(() => {
    return () => {
      reflectRequestRef.current += 1
    }
  }, [])

  function onDraftChange(value: string) {
    setDraft(value)
    if (!startedRef.current && value.trim()) {
      startedRef.current = true
      onInteract()
      trackEvent('hero_compose_start')
    }
  }

  function dropThought(
    textOverride?: string,
    source: 'typed' | 'example' = 'typed',
    fromAuto = false,
  ) {
    const text = (textOverride ?? draft).trim()
    if (!text || droppedRef.current) return
    if (source === 'typed' && text.length < MIN_DEMO_DRAFT_CHARS) return
    droppedRef.current = true

    const next: DemoThought = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      text,
      createdAt: Date.now(),
    }

    if (!fromAuto) onInteract()

    if (source === 'example') {
      trackEvent('hero_compose_use_example', {
        situation: fromAuto ? `auto:${entry.id}` : entry.id,
      })
    }

    setOwnedDraft(source === 'typed')
    setSending(true)
    setThought(next)
    setFresh(true)
    setDraft('')
    setFocused(false)
    setPayoffPhase('forming')
    if (source === 'typed') {
      saveHeroDraft(text)
      setLivePending(true)
      setReflection(null)
      const requestId = ++reflectRequestRef.current
      const startedAt = Date.now()
      void requestDemoReflection(text)
        .then(async (live) => {
          if (requestId !== reflectRequestRef.current) return
          const wait = prefersReducedMotion()
            ? 0
            : Math.max(0, FORMING_MS - (Date.now() - startedAt))
          if (wait > 0) {
            await new Promise<void>((resolve) => {
              window.setTimeout(resolve, wait)
            })
          }
          if (requestId !== reflectRequestRef.current) return
          setReflection(live ?? FALLBACK_REFLECTION)
          setLivePending(false)
          setPayoffPhase('ready')
          trackEvent('hero_payoff_shown')
          trackEvent('hero_demo_reflect', {
            live: Boolean(live),
            length: text.length,
          })
        })
        .catch(() => {
          if (requestId !== reflectRequestRef.current) return
          setReflection(FALLBACK_REFLECTION)
          setLivePending(false)
          setPayoffPhase('ready')
          trackEvent('hero_payoff_shown')
          trackEvent('hero_demo_reflect', {
            live: false,
            length: text.length,
          })
        })
    } else {
      setLivePending(false)
      setReflection(reflectionFor(text))
    }
    trackEvent('hero_compose_drop', {
      length: text.length,
      source: fromAuto ? 'auto' : source,
    })
  }

  function onComposerKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && event.shiftKey) {
      event.preventDefault()
      dropThought()
    }
  }

  function writeOwn() {
    onInteract()
    reflectRequestRef.current += 1
    settledRef.current = false
    droppedRef.current = false
    setLivePending(false)
    setOwnedDraft(false)
    setThought(null)
    setReflection(null)
    setPayoffPhase('idle')
    setFresh(false)
    setFocused(true)
    setDraft('')
    trackEvent('hero_compose_focus')
    requestAnimationFrame(() => {
      inputRef.current?.focus({ preventScroll: true })
    })
  }

  return (
    <div
      className={`hero-compose${showPayoff ? ' has-payoff' : ''}${payoffPhase === 'ready' ? ' is-climax' : ''}`}
    >
      {thought ? (
        <article
          className={`hero-thought${fresh ? ' is-fresh' : ''}`}
          aria-live="polite"
        >
          <div className="hero-thought-face" aria-hidden="true" />
          <div className="hero-thought-body">
            <span className="hero-thought-time">
              {formatTime(thought.createdAt)}
            </span>
            <p className="hero-thought-text">{thought.text}</p>
          </div>
        </article>
      ) : null}

      {showPayoff ? (
        <div
          className={`hero-reflection${payoffPhase === 'forming' ? ' is-forming' : ' is-ready'}`}
          role="status"
          aria-live="polite"
        >
          <div className="hero-reflection-head">
            <ReflectionOrb />
            <div className="hero-reflection-labels">
              <p className="hero-reflection-label">
                {payoffPhase === 'forming' ? 'Reflecting…' : 'Reflection'}
              </p>
            </div>
          </div>

          {payoffPhase === 'forming' ? (
            <div className="hero-reflection-skeleton" aria-hidden="true">
              <span style={{ width: '92%' }} />
              <span style={{ width: '74%' }} />
              <span className="is-short" style={{ width: '52%' }} />
            </div>
          ) : reflection ? (
            <p className="hero-reflection-text">{reflection}</p>
          ) : null}
        </div>
      ) : null}

      {!showPayoff ? (
        <form
          className={`hero-composer-frame${sending ? ' is-sending' : ''}${demoActive ? ' is-demo is-demo-ready' : ''}`}
          onSubmit={(event) => {
            event.preventDefault()
            if (demoActive) {
              dropThought(entry.text, 'example')
              return
            }
            dropThought()
          }}
        >
          <div className="hero-composer-face" aria-hidden="true" />
          <div className="hero-composer">
            <label className="sr-only" htmlFor={inputId}>
              Write a thought
            </label>
            <div className="hero-composer-body">
              {demoActive ? (
                <p className="hero-composer-demo" aria-hidden="true">
                  {entry.text}
                </p>
              ) : null}
              <textarea
                id={inputId}
                ref={inputRef}
                className="hero-composer-input"
                value={draft}
                onChange={(event) => onDraftChange(event.target.value)}
                onFocus={() => {
                  onInteract()
                  setFocused(true)
                  trackEvent('hero_compose_focus')
                }}
                onBlur={() => setFocused(false)}
                onKeyDown={onComposerKeyDown}
                placeholder={
                  demoActive ? '' : "What's rattling around up there?"
                }
                rows={3}
                aria-describedby="hero-compose-help"
              />
            </div>
            <div className="hero-composer-bar">
              {demoActive ? (
                <button
                  type="button"
                  className="hero-compose-secondary-inline"
                  onClick={writeOwn}
                >
                  Write yours
                </button>
              ) : (
                <span className="hero-compose-spacer" aria-hidden="true" />
              )}
              <button
                type="submit"
                className={`btn-primary${canDrop ? '' : ' btn-icon-only'}${demoActive ? ' is-pulse' : ''}`}
                disabled={!canDrop}
                aria-label={demoActive ? 'Try this thought' : 'See a reflection'}
              >
                {demoActive ? 'Try it' : canDrop ? 'Reflect' : <DropIcon />}
              </button>
            </div>
          </div>
        </form>
      ) : null}

      {showPayoff && payoffPhase === 'ready' ? (
        <SceneCta
          proof="Private journaling. Your words stay tied to your account."
          title="Your turn. Start with what is still running for you."
          event="hero_keep_click"
          href={appSignupUrl(
            ownedDraft && thought?.text ? { draft: thought.text } : undefined,
          )}
          onClick={onInteract}
          secondary={
            <button
              type="button"
              className="hero-compose-replay"
              onClick={writeOwn}
            >
              Write here first
            </button>
          }
        />
      ) : (
        <SceneProof id="hero-compose-help">
          Private on this page. Nothing is saved until you start yours.
        </SceneProof>
      )}
    </div>
  )
}

function LockScene({
  active,
  entry,
}: {
  active: boolean
  entry: DemoEntry
}) {
  const [phase, setPhase] = useState<'sealed' | 'unlocking' | 'open'>('sealed')
  const [dots, setDots] = useState(0)
  const runIdRef = useRef(0)

  useEffect(() => {
    if (!active) return

    const runId = runIdRef.current + 1
    runIdRef.current = runId

    if (prefersReducedMotion()) {
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
  }, [active])

  return (
    <div className="hero-compose hero-lock-scene is-climax">
      <div
        className={`hero-lock-card${phase === 'open' ? ' is-open' : ''}`}
        aria-live="polite"
      >
        <div className="hero-composer-face" aria-hidden="true" />

        {phase !== 'open' ? (
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
        ) : (
          <div className="hero-lock-open">
            <article className="hero-thought is-fresh hero-lock-thought">
              <div className="hero-thought-face" aria-hidden="true" />
              <div className="hero-thought-body">
                <div className="hero-passcode-open-meta">
                  <span className="hero-thought-time">Tonight</span>
                  <span className="hero-passcode-badge">
                    <LockIcon />
                    Protected
                  </span>
                </div>
                <p className="hero-thought-text">{entry.text}</p>
              </div>
            </article>
          </div>
        )}
      </div>

      <SceneCta
        proof="Journal lock encrypts on your device before sync. Passcode stays with you."
        title="Lock it when you leave."
        event="hero_lock_cta_click"
        secondary={
          <a className="hero-compose-replay" href="/journal-lock">
            How journal lock works
          </a>
        }
      />
    </div>
  )
}

function VoiceScene({
  active,
  entry,
}: {
  active: boolean
  entry: DemoEntry
}) {
  const [wordCount, setWordCount] = useState(0)
  const [hearing, setHearing] = useState(false)
  const [phase, setPhase] = useState<'listen' | 'saved'>('listen')
  const runIdRef = useRef(0)

  useEffect(() => {
    if (!active) return

    const runId = runIdRef.current + 1
    runIdRef.current = runId

    if (prefersReducedMotion()) {
      setWordCount(entry.words.length)
      setHearing(false)
      setPhase('saved')
      return
    }

    setWordCount(0)
    setHearing(true)
    setPhase('listen')

    const timers: number[] = []
    entry.words.forEach((_, index) => {
      timers.push(
        window.setTimeout(() => {
          if (runIdRef.current !== runId) return
          setWordCount(index + 1)
          setHearing(true)
        }, 320 + index * VOICE_WORD_MS),
      )
    })

    const listenDone = 320 + entry.words.length * VOICE_WORD_MS + 240
    timers.push(
      window.setTimeout(() => {
        if (runIdRef.current !== runId) return
        setHearing(false)
        setPhase('saved')
      }, listenDone),
    )

    return () => {
      for (const timer of timers) window.clearTimeout(timer)
    }
  }, [active, entry.words])

  const visibleWords = entry.words.slice(0, wordCount)

  return (
    <div className="hero-compose hero-audio-scene is-climax">
      {phase === 'listen' ? (
        <div
          className={`hero-composer-frame is-demo is-demo-ready hero-audio-frame${hearing ? ' is-hearing' : ''}`}
        >
          <div
            className="hero-composer-face hero-audio-face"
            aria-hidden="true"
          />
          <div className="hero-composer hero-audio-composer">
            <div className="hero-audio-box" aria-live="polite">
              <div className="hero-audio-word-slot">
                {visibleWords.length > 0 ? (
                  <p className="hero-audio-word-stream">
                    {visibleWords.map((word, index) => {
                      const ageFromNewest = visibleWords.length - 1 - index
                      return (
                        <span
                          key={`${word}-${index}`}
                          className={`hero-audio-word is-age-${Math.min(ageFromNewest, 3)}${ageFromNewest === 0 ? ' is-current' : ''}`}
                        >
                          {word}
                        </span>
                      )
                    })}
                  </p>
                ) : (
                  <p className="hero-audio-status">Listening</p>
                )}
              </div>

              <div className="hero-audio-stage">
                <span
                  className={`hero-audio-aura${hearing ? ' is-hearing' : ''}`}
                  aria-hidden="true"
                />
                <span className="hero-audio-mic is-listening" aria-hidden="true">
                  <MicIcon active />
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <article className="hero-thought is-fresh" aria-live="polite">
          <div className="hero-thought-face" aria-hidden="true" />
          <div className="hero-thought-body">
            <div className="hero-passcode-open-meta">
              <span className="hero-thought-time">Just now</span>
              <span className="hero-passcode-badge hero-voice-badge">
                <MicIcon active={false} />
                From voice
              </span>
            </div>
            <p className="hero-thought-text">{entry.text}</p>
          </div>
        </article>
      )}

      <SceneCta
        proof="Listening stays on your device. Spoken instead of typed."
        title="Speak it when typing feels heavy."
        event="hero_voice_cta_click"
      />
    </div>
  )
}

export default function HeroCompose() {
  const [entry] = useState(pickRandomEntry)
  const [scene, setScene] = useState<DemoScene>('write')
  const [autoplay, setAutoplay] = useState(true)
  const [tourSettled, setTourSettled] = useState(false)

  const writeAutoplay = autoplay && scene === 'write' && !tourSettled
  const chaptersOpen = tourSettled

  const pauseTour = useCallback(() => {
    setAutoplay(false)
  }, [])

  const markWriteSettled = useCallback(() => {
    setTourSettled(true)
    setAutoplay(false)
  }, [])

  function selectScene(next: DemoScene) {
    setScene(next)
    setAutoplay(false)
    trackEvent('hero_compose_pick_example', { situation: next })
  }

  return (
    <div className={`hero-demo${tourSettled ? ' has-settled' : ''}`}>
      <div className="hero-demo-stage">
        <SceneShell active={scene === 'write'} labelledBy="hero-tab-write">
          <div id="hero-panel-write">
            <WriteScene
              active={scene === 'write'}
              autoplay={writeAutoplay}
              entry={entry}
              onInteract={pauseTour}
              onSettled={markWriteSettled}
            />
          </div>
        </SceneShell>

        <SceneShell active={scene === 'lock'} labelledBy="hero-tab-lock">
          <div id="hero-panel-lock">
            <LockScene active={scene === 'lock'} entry={entry} />
          </div>
        </SceneShell>

        <SceneShell active={scene === 'voice'} labelledBy="hero-tab-voice">
          <div id="hero-panel-voice">
            <VoiceScene active={scene === 'voice'} entry={entry} />
          </div>
        </SceneShell>
      </div>

      {chaptersOpen ? (
        <div
          className="hero-compose-chips hero-compose-chips-late"
          role="tablist"
          aria-label="More of Journal42"
        >
          {CHAPTERS.map((item) => {
            const selected = scene === item.id
            return (
              <button
                key={item.id}
                id={`hero-tab-${item.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`hero-panel-${item.id}`}
                className={`hero-compose-chip${selected ? ' is-active' : ''}`}
                onClick={() => selectScene(item.id)}
              >
                <span className="hero-compose-chip-label">{item.chip}</span>
              </button>
            )
          })}
        </div>
      ) : (
        <span id="hero-tab-write" className="sr-only">
          Write
        </span>
      )}
    </div>
  )
}
