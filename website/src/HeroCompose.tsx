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

type ExampleThought = {
  chip: string
  situation: string
  text: string
  reflection: string
}

const EXAMPLES: ExampleThought[] = [
  {
    chip: 'After bedtime',
    situation: 'After bedtime',
    text: "Kids finally asleep. I still owe that reply and my brain won't shut up.",
    reflection:
      "The day didn't end when the house got quiet. The unfinished reply is borrowing the only quiet you get.",
  },
  {
    chip: 'Talked over',
    situation: 'Talked over',
    text: 'Got talked over in standup again. Sitting in the car mad and also late for pickup.',
    reflection:
      'Anger and lateness are stacking. Less about one standup, more about not getting airtime and still being the one who has to move next.',
  },
  {
    chip: 'The calendar',
    situation: 'The calendar',
    text: 'Holding the sprint, the dentist, and dinner in my head. No clean place to put any of it.',
    reflection:
      'This is load, not failure. Your mind is running logistics for too many people with nowhere to set it down.',
  },
  {
    chip: 'The replay',
    situation: 'The replay',
    text: "Snapped at home after that review. Now I'm replaying both conversations instead of sleeping.",
    reflection:
      "Two rooms, one nervous system. The review didn't stay at work, and the snap is the overflow, not the whole story.",
  },
]

const FALLBACK_REFLECTION =
  'Naming it already loosens the loop. Less about solving it in one sitting, more about not carrying it alone in your head.'

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

function reflectionFor(text: string): string {
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
  const [exampleIndex, setExampleIndex] = useState(0)
  const [payoffPhase, setPayoffPhase] = useState<'idle' | 'forming' | 'ready'>(
    'idle',
  )
  const [reflection, setReflection] = useState<string | null>(null)
  const startedRef = useRef(false)

  const demoActive =
    !focused && draft.length === 0 && !thought && payoffPhase === 'idle'
  const example = EXAMPLES[exampleIndex]
  const canDrop = draft.trim().length > 0 || demoActive
  const showPayoff = payoffPhase !== 'idle' && thought

  useLayoutEffect(() => {
    autosizeTextarea(inputRef.current)
  }, [draft, demoActive, exampleIndex])

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
        situation: example.situation,
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

  function selectExample(index: number) {
    setExampleIndex(index)
    setDraft('')
    setFocused(false)
    inputRef.current?.blur()
    trackEvent('hero_compose_pick_example', {
      situation: EXAMPLES[index].situation,
    })
  }

  return (
    <div className={`hero-compose${showPayoff ? ' has-payoff' : ''}`}>
      {!showPayoff ? (
        <div className="hero-compose-chips" role="group" aria-label="Example nights">
          {EXAMPLES.map((item, index) => (
            <button
              key={item.chip}
              type="button"
              className={`hero-compose-chip${demoActive && index === exampleIndex ? ' is-active' : ''}`}
              onClick={() => selectExample(index)}
            >
              {item.chip}
            </button>
          ))}
        </div>
      ) : null}

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
              dropThought(example.text, 'example')
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
                  {example.text}
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
                className={`btn-primary${canDrop ? '' : ' btn-icon-only'}${demoActive ? ' is-pulse' : ''}`}
                disabled={!canDrop}
                aria-label={demoActive ? 'Try this thought' : 'Drop thought'}
              >
                {demoActive ? 'Try it' : canDrop ? 'Drop' : <DropIcon />}
              </button>
            </div>
          </div>
        </form>
      ) : null}

      {showPayoff && payoffPhase === 'ready' ? (
        <div className="hero-compose-keep">
          <div className="hero-compose-keep-copy">
            <p className="hero-compose-keep-title">Keep this.</p>
            <p className="hero-compose-keep-sub">
              Save it, reflect, and chat when you continue.
            </p>
          </div>
          <a
            className="btn-primary hero-compose-keep-cta"
            href={appSignupUrl({ draft: thought?.text })}
            onClick={() => trackEvent('hero_keep_click')}
          >
            Continue to keep this
          </a>
        </div>
      ) : !showPayoff ? (
        <div className="hero-compose-meta">
          <p id="hero-compose-help" className="hero-compose-hint">
            {demoActive
              ? 'Try this one, or write your own.'
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
