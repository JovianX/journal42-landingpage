import {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react'
import { Link } from 'react-router-dom'
import SiteFooter from './SiteFooter'
import { trackEvent } from './analytics'
import { appSignupUrl, appLoginUrl } from './appUrl'
import { readHeroDraft, saveHeroDraft } from './heroDraft'
import { HOME_TITLE } from './landingCopy'

const NIGHT = [
  {
    time: '11:14 PM',
    stamp: '23:14',
    text: 'I wrote it. A reflection came back.',
  },
  {
    time: '11:47 PM',
    stamp: '23:47',
    text: "That's the last one today. Dinner is still in my chest.",
  },
  {
    time: '12:09 AM',
    stamp: '00:09',
    text: 'I told her I was just tired.',
  },
] as const

const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: 'Can I stay on free?',
    a: 'Yes. Write and save everything. Reflections and replies are limited each day. Stay as long as you want.',
  },
  {
    q: 'What does $9 add?',
    a: 'Unlimited reflections and replies. Same journal. Same lock. Same night.',
  },
  {
    q: 'What happens if I cancel?',
    a: 'You keep every entry. Daily limits come back. You can pay again later.',
  },
  {
    q: 'Is my writing used to train AI?',
    a: (
      <>
        We do not sell your journal. Writing stays tied to your account, and we
        do not use it as public training material. When you use AI help,
        relevant parts may be sent to subprocessors to generate the reflection.{' '}
        <Link to="/privacy">Privacy</Link>.
      </>
    ),
  },
]

function autosizeTextarea(el: HTMLTextAreaElement | null) {
  if (!el) return
  el.style.height = 'auto'
  el.style.height = `${el.scrollHeight}px`
}

type PricingProps = {
  onCookiePreferences?: () => void
}

export default function Pricing({ onCookiePreferences }: PricingProps) {
  const [heroGone, setHeroGone] = useState(false)
  const inputId = useId()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const [draft, setDraft] = useState('')
  const empty = draft.trim().length === 0

  useEffect(() => {
    document.title = 'Journal42: Pricing'
    return () => {
      document.title = HOME_TITLE
    }
  }, [])

  useEffect(() => {
    const saved = readHeroDraft()
    if (saved) setDraft(saved)
  }, [])

  useLayoutEffect(() => {
    autosizeTextarea(inputRef.current)
  }, [draft])

  useEffect(() => {
    const hero = document.querySelector('.pricing-hero')
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroGone(!entry?.isIntersecting)
      },
      { threshold: 0, rootMargin: '-8px 0px 0px 0px' },
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  function startYours(event: FormEvent) {
    event.preventDefault()
    const text = draft.trim()
    if (text) saveHeroDraft(text)
    trackEvent('cta_start_free_pricing', { has_draft: Boolean(text) })
    window.location.href = appSignupUrl(text ? { draft: text } : undefined)
  }

  return (
    <div className="page">
      <header className={`nav${heroGone ? ' is-sticky' : ''}`}>
        <Link className="nav-brand" to="/" aria-label="Journal42 home">
          Journal<span>42</span>
        </Link>
        <div className="nav-actions">
          <Link className="nav-link" to="/pricing" aria-current="page">
            Pricing
          </Link>
          <a
            className="nav-link"
            href={appLoginUrl()}
            onClick={() => trackEvent('cta_login_nav')}
          >
            Log in
          </a>
          <a
            className="nav-cta"
            href={appSignupUrl()}
            onClick={() =>
              trackEvent(heroGone ? 'cta_start_yours_nav' : 'cta_start_free_pricing')
            }
          >
            Start yours
          </a>
        </div>
      </header>

      <main id="top">
        <section
          className="hero landing-hero pricing-hero"
          aria-labelledby="pricing-title"
        >
          <div
            className="hero-atmosphere landing-hero-atmosphere"
            aria-hidden="true"
          >
            <div className="landing-hero-window" />
            <div className="landing-hero-lamp" />
            <div className="hero-orb hero-orb-a" />
            <div className="hero-orb hero-orb-b" />
            <div className="landing-hero-horizon" />
            <div className="hero-grain" />
          </div>

          <div className="pricing-hero-inner">
            <div className="pricing-hero-copy">
              <h1 className="hero-headline" id="pricing-title">
                Writing is free.
                <br />
                $9 for unlimited reflections.
              </h1>
              <p className="hero-support">
                The house is quiet. The day is still in your head.
              </p>
            </div>

            <div className="price-offers" id="plans">
              <article className="price-offer">
                <p className="price-offer-kicker">Tonight</p>
                <h2 className="price-offer-name">Write and walk away.</h2>
                <p className="price-offer-amount">Free</p>
                <p className="price-offer-outcome">
                  Every thought saved. Reflections and replies are limited.
                </p>
                <a
                  className="btn-ghost price-offer-cta"
                  href={appSignupUrl()}
                  onClick={() => trackEvent('cta_pricing_clear-head')}
                >
                  Start yours
                </a>
                <p className="price-offer-note">Stay as long as you want.</p>
              </article>

              <article className="price-offer is-paid">
                <p className="price-offer-kicker">The rest of the night</p>
                <h2 className="price-offer-name">When you're still in it.</h2>
                <p className="price-offer-amount">
                  $9<span className="price-offer-period">/mo</span>
                </p>
                <p className="price-offer-outcome">
                  Unlimited reflections and replies.
                </p>
                <a
                  className="btn-primary price-offer-cta"
                  href={appSignupUrl({ plan: 'pattern' })}
                  onClick={() => trackEvent('cta_pricing_pattern')}
                >
                  Keep going
                </a>
                <p className="price-offer-note">
                  Cancel anytime. Keep every entry.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="night-whom" id="why" aria-labelledby="why-title">
          <div className="night-whom-inner">
            <h2 className="night-whom-title" id="why-title">
              Kids are down.
            </h2>
            <p className="night-whom-kicker">
              The one you came to write is still here.
            </p>

            <ol className="night-log">
              {NIGHT.map((beat) => (
                <li key={beat.time}>
                  <time dateTime={beat.stamp}>{beat.time}</time>
                  <p>{beat.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="night-close price-close"
          id="start"
          aria-labelledby="price-close-title"
        >
          <div className="night-close-inner">
            <h2 className="night-close-title" id="price-close-title">
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

            <p className="price-close-paid-wrap">
              <a
                className="price-close-paid"
                href={appSignupUrl({ plan: 'pattern' })}
                onClick={() => trackEvent('cta_pricing_pattern_closing')}
              >
                Keep going, $9
              </a>
            </p>

            <p className="night-close-trust">
              It stays on your device. Then the night can start.
            </p>

            <div className="night-faq" id="faq">
              {FAQS.map((item) => (
                <details key={item.q} className="night-faq-item">
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter onCookiePreferences={onCookiePreferences} />
    </div>
  )
}
