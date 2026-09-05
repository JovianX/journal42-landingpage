import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
} from 'react'
import { Link } from 'react-router-dom'
import { trackEvent } from './analytics'
import { appSignupUrl } from './appUrl'
import { readHeroDraft, saveHeroDraft } from './heroDraft'
import { LandingSeoContent } from './landingSeo'
import { LockCard } from './LockCard'

const WHO_THOUGHTS = [
  {
    time: '10:42 PM',
    stamp: '22:42',
    text: "Kids are down. I'm still in that thread.",
  },
  {
    time: '11:08 PM',
    stamp: '23:08',
    text: 'I got talked over. Then I was late for pickup.',
  },
  {
    time: '11:31 PM',
    stamp: '23:31',
    text: 'Sprint, dentist, dinner. Still all here.',
  },
] as const

const LOCK_THOUGHT = 'I told her I was just tired.'
const LOCK_WHEN = '12:04 AM'

function useInView<T extends HTMLElement>(
  threshold = 0.55,
  rootMargin = '-22% 0px -22% 0px',
) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setInView(true)
        observer.disconnect()
      },
      { threshold, rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin])

  return { ref, inView }
}

function autosizeTextarea(el: HTMLTextAreaElement | null) {
  if (!el) return
  el.style.height = 'auto'
  el.style.height = `${el.scrollHeight}px`
}

function WhoSection() {
  return (
    <section className="night-whom" aria-labelledby="whom-title">
      <div className="night-whom-inner">
        <h2 className="night-whom-title" id="whom-title">
          If your head is still running after the house goes quiet.
        </h2>
        <p className="night-whom-kicker">Dinner is done. The day is still in your head.</p>

        <ol className="night-log">
          {WHO_THOUGHTS.map((thought) => (
            <li key={thought.time}>
              <time dateTime={thought.stamp}>{thought.time}</time>
              <p>{thought.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function LockSection() {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section className="night-lock" aria-labelledby="lock-title">
      <div className="night-lock-inner">
        <div className="night-lock-copy">
          <h2 className="night-lock-title" id="lock-title">
            Step away. Your journal seals itself.
          </h2>
          <p className="night-lock-lead">
            The line you wouldn't say out loud.
          </p>
          <p className="night-lock-proof">
            <Link to="/journal-lock">How journal lock works</Link>
          </p>
        </div>

        <div className="night-lock-demo" ref={ref}>
          <LockCard active={inView} thought={LOCK_THOUGHT} when={LOCK_WHEN} />
        </div>
      </div>
    </section>
  )
}

function CloseSection() {
  const inputId = useId()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [draft, setDraft] = useState('')
  const empty = draft.trim().length === 0

  useEffect(() => {
    const saved = readHeroDraft()
    if (saved) setDraft(saved)
  }, [])

  useLayoutEffect(() => {
    autosizeTextarea(inputRef.current)
  }, [draft])

  function startYours(event: FormEvent) {
    event.preventDefault()
    const text = draft.trim()
    if (text) saveHeroDraft(text)
    trackEvent('cta_start_yours_closing', { has_draft: Boolean(text) })
    window.location.href = appSignupUrl(text ? { draft: text } : undefined)
  }

  return (
    <section className="night-close" id="start" aria-labelledby="close-title">
      <div className="night-close-inner">
        <h2 className="night-close-title" id="close-title">
          The one you keep swallowing.
        </h2>
        <p className="night-close-lead">Write it. It can stay here.</p>

        <form className="night-page" onSubmit={startYours}>
          <label className="sr-only" htmlFor={inputId}>
            Write a thought
          </label>
          <textarea
            id={inputId}
            ref={inputRef}
            className="night-page-input"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="The one still looping."
            rows={4}
          />
          <div className="night-page-bar">
            <button
              className={`btn-primary${empty ? ' is-pulse' : ''}`}
              type="submit"
            >
              Start yours
            </button>
          </div>
        </form>

        <p className="night-close-trust">
          It stays on your device. Then the night can start.
        </p>
        <LandingSeoContent />
      </div>
    </section>
  )
}

export default function LandingAfterHero() {
  return (
    <>
      <WhoSection />
      <LockSection />
      <CloseSection />
    </>
  )
}
