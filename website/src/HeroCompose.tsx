import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import { trackEvent } from './analytics'
import { appSignupUrl } from './appUrl'
import { saveHeroDraft } from './heroDraft'

type DemoThought = {
  id: string
  text: string
  createdAt: number
}

type DemoReflection = {
  text: string
  historyCite?: string
}

type ExampleThought = {
  situation: string
  text: string
  reflection: DemoReflection
}

const EXAMPLES: ExampleThought[] = [
  {
    situation: 'After bedtime, Slack still open',
    text: "Kids finally asleep. I still owe that reply and my brain won't shut up.",
    reflection: {
      text: "The day didn't end when the house got quiet. The unfinished reply is borrowing the only quiet you get.",
      historyCite: 'Tue night',
    },
  },
  {
    situation: 'Talked over, then the commute home',
    text: 'Got talked over in standup again. Sitting in the car mad and also late for pickup.',
    reflection: {
      text: 'Anger and lateness are stacking. Less about one standup, more about not getting airtime and still being the one who has to move next.',
      historyCite: 'last Monday',
    },
  },
  {
    situation: "Everyone else's calendar in your head",
    text: 'Holding the sprint, the dentist, and dinner in my head. No clean place to put any of it.',
    reflection: {
      text: 'This is load, not failure. Your mind is running logistics for too many people with nowhere to set it down.',
      historyCite: 'Sun evening',
    },
  },
  {
    situation: 'Snapped, then the replay',
    text: "Snapped at home after that review. Now I'm replaying both conversations instead of sleeping.",
    reflection: {
      text: "Two rooms, one nervous system. The review didn't stay at work, and the snap is the overflow, not the whole story.",
      historyCite: 'Wed night',
    },
  },
]

const FALLBACK_REFLECTION: DemoReflection = {
  text: 'Naming it already loosens the loop. Less about solving it in one sitting, more about not carrying it alone in your head.',
}

const TYPE_MS = 26
const HOLD_MS = 5200
const DELETE_MS = 14
const GAP_MS = 650
const FORMING_MS = 1000

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

function reflectionFor(text: string): DemoReflection {
  const exact = EXAMPLES.find((example) => example.text === text)
  if (exact) return exact.reflection

  const lower = text.toLowerCase()
  if (
    lower.includes('bedtime') ||
    lower.includes('asleep') ||
    lower.includes('kids') ||
    (lower.includes('reply') && lower.includes('brain'))
  ) {
    return EXAMPLES[0].reflection
  }
  if (
    lower.includes('standup') ||
    lower.includes('talked over') ||
    lower.includes('pickup')
  ) {
    return EXAMPLES[1].reflection
  }
  if (
    lower.includes('dentist') ||
    lower.includes('dinner') ||
    lower.includes('sprint') ||
    lower.includes('calendar')
  ) {
    return EXAMPLES[2].reflection
  }
  if (
    lower.includes('snapped') ||
    lower.includes('review') ||
    lower.includes('replaying') ||
    lower.includes('replay')
  ) {
    return EXAMPLES[3].reflection
  }
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

function ReflectionOrb() {
  return (
    <span className="hero-reflection-orb" aria-hidden="true">
      <span className="hero-reflection-orb-aura" />
      <span className="hero-reflection-orb-core" />
    </span>
  )
}

export default function HeroCompose() {
  const inputId = useId()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [draft, setDraft] = useState('')
  const [sending, setSending] = useState(false)
  const [thought, setThought] = useState<DemoThought | null>(null)
  const [fresh, setFresh] = useState(false)
  const [focused, setFocused] = useState(false)
  const [exampleText, setExampleText] = useState('')
  const [exampleIndex, setExampleIndex] = useState(0)
  const [examplePhase, setExamplePhase] = useState<
    'typing' | 'holding' | 'deleting' | 'paused'
  >('typing')
  const [payoffPhase, setPayoffPhase] = useState<
    'idle' | 'forming' | 'ready'
  >('idle')
  const [reflection, setReflection] = useState<DemoReflection | null>(null)
  const startedRef = useRef(false)

  const demoActive =
    !focused && draft.length === 0 && !thought && payoffPhase === 'idle'
  const demoReady =
    demoActive && exampleText === EXAMPLES[exampleIndex].text
  const canDrop = draft.trim().length > 0 || demoReady
  const showPayoff = payoffPhase !== 'idle' && thought
  const situation = EXAMPLES[exampleIndex].situation

  useLayoutEffect(() => {
    autosizeTextarea(inputRef.current)
  }, [draft, exampleText, demoActive])

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
    if (payoffPhase !== 'forming') return
    const delay = prefersReducedMotion() ? 0 : FORMING_MS
    const timer = window.setTimeout(() => {
      setPayoffPhase('ready')
      trackEvent('hero_payoff_shown')
    }, delay)
    return () => window.clearTimeout(timer)
  }, [payoffPhase])

  useEffect(() => {
    if (!demoActive) {
      setExampleText('')
      setExamplePhase('paused')
      return
    }

    if (prefersReducedMotion()) {
      setExampleText(EXAMPLES[0].text)
      setExamplePhase('holding')
      return
    }

    if (examplePhase === 'paused') {
      setExamplePhase('typing')
      setExampleText('')
    }

    const full = EXAMPLES[exampleIndex].text
    let timer = 0

    if (examplePhase === 'typing') {
      if (exampleText.length < full.length) {
        timer = window.setTimeout(() => {
          setExampleText(full.slice(0, exampleText.length + 1))
        }, TYPE_MS)
      } else {
        timer = window.setTimeout(() => setExamplePhase('holding'), HOLD_MS)
      }
    } else if (examplePhase === 'holding') {
      timer = window.setTimeout(() => setExamplePhase('deleting'), 40)
    } else if (examplePhase === 'deleting') {
      if (exampleText.length > 0) {
        timer = window.setTimeout(() => {
          setExampleText((current) => current.slice(0, -1))
        }, DELETE_MS)
      } else {
        timer = window.setTimeout(() => {
          setExampleIndex((index) => (index + 1) % EXAMPLES.length)
          setExamplePhase('typing')
        }, GAP_MS)
      }
    }

    return () => window.clearTimeout(timer)
  }, [demoActive, exampleIndex, examplePhase, exampleText])

  function onDraftChange(value: string) {
    setDraft(value)
    if (!startedRef.current && value.trim()) {
      startedRef.current = true
      trackEvent('hero_compose_start')
    }
  }

  function dropThought(
    textOverride?: string,
    source: 'typed' | 'example' = 'typed',
  ) {
    const text = (textOverride ?? draft).trim()
    if (!text) return

    const next: DemoThought = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      text,
      createdAt: Date.now(),
    }

    if (source === 'example') {
      trackEvent('hero_compose_use_example', {
        situation: EXAMPLES[exampleIndex].situation,
      })
    }

    setSending(true)
    setThought(next)
    setFresh(true)
    setDraft('')
    setFocused(false)
    setReflection(reflectionFor(text))
    setPayoffPhase('forming')
    saveHeroDraft(text)
    trackEvent('hero_compose_drop', { length: text.length, source })
  }

  function onComposerKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && event.shiftKey) {
      event.preventDefault()
      dropThought()
    }
  }

  function writeOwn() {
    setFocused(true)
    setDraft('')
    trackEvent('hero_compose_focus')
    requestAnimationFrame(() => {
      inputRef.current?.focus({ preventScroll: true })
    })
  }

  return (
    <div className={`hero-compose${showPayoff ? ' has-payoff' : ''}`}>
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
              <span className="hero-reflection-sample">With your history</span>
            </div>
          </div>

          {payoffPhase === 'forming' ? (
            <div className="hero-reflection-skeleton" aria-hidden="true">
              <span style={{ width: '92%' }} />
              <span style={{ width: '74%' }} />
              <span className="is-short" style={{ width: '52%' }} />
            </div>
          ) : reflection ? (
            <p className="hero-reflection-text">
              {reflection.text}
              {reflection.historyCite ? (
                <>
                  {' '}
                  Like{' '}
                  <span className="hero-reflection-cite">
                    {reflection.historyCite}
                  </span>
                  .
                </>
              ) : null}
            </p>
          ) : null}
        </div>
      ) : null}

      {!showPayoff ? (
        <form
          className={`hero-composer-frame${sending ? ' is-sending' : ''}${demoActive ? ' is-demo' : ''}${demoReady ? ' is-demo-ready' : ''}`}
          onSubmit={(event) => {
            event.preventDefault()
            if (demoReady) {
              dropThought(exampleText, 'example')
              return
            }
            dropThought()
          }}
        >
          <div className="hero-composer-face" aria-hidden="true" />
          <div className="hero-composer">
            {demoActive ? (
              <p className="hero-compose-situation">{situation}</p>
            ) : null}
            <label className="sr-only" htmlFor={inputId}>
              Write a thought
            </label>
            <div className="hero-composer-body">
              {demoActive ? (
                <p className="hero-composer-demo" aria-hidden="true">
                  {exampleText}
                  <span className="hero-composer-caret" />
                </p>
              ) : null}
              <textarea
                id={inputId}
                ref={inputRef}
                className="hero-composer-input"
                value={draft}
                onChange={(event) => onDraftChange(event.target.value)}
                onFocus={() => {
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
                className={`btn-primary${canDrop ? '' : ' btn-icon-only'}${demoReady ? ' is-pulse' : ''}`}
                disabled={!canDrop}
                aria-label={demoReady ? 'Try this thought' : 'Drop thought'}
              >
                {demoReady ? 'Try it' : canDrop ? 'Drop' : <DropIcon />}
              </button>
            </div>
          </div>
        </form>
      ) : null}

      {showPayoff && payoffPhase === 'ready' ? (
        <div className="hero-compose-keep">
          <div className="hero-compose-keep-copy">
            <p className="hero-compose-keep-title">Keep this. Start free.</p>
            <p className="hero-compose-keep-sub">
              Save it, reflect, and chat. Three reflections a day, free.
            </p>
          </div>
          <a
            className="btn-primary hero-compose-keep-cta"
            href={appSignupUrl({ draft: thought?.text })}
            onClick={() => trackEvent('hero_keep_click')}
          >
            Start free to keep this
          </a>
        </div>
      ) : !showPayoff ? (
        <div className="hero-compose-meta">
          <p id="hero-compose-help" className="hero-compose-hint">
            {demoReady
              ? 'Try this one, or write your own.'
              : demoActive
                ? 'Watch an example, or start typing.'
                : 'Drop it when it is out of your head.'}
          </p>
          <p className="hero-compose-privacy">
            Private on this page until you continue
          </p>
        </div>
      ) : null}
    </div>
  )
}
