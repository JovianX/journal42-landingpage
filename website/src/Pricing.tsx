import { useEffect, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import SiteFooter from './SiteFooter'
import { trackEvent } from './analytics'
import { appSignupUrl, appLoginUrl } from './appUrl'

const PLANS = [
  {
    id: 'clear-head',
    name: 'Quieter',
    price: 'Free',
    priceNote: null,
    outcome: 'Two minutes. Then quieter.',
    includes: [
      { text: 'Write and save every thought', diff: false },
      { text: 'A reflection you can answer', diff: false },
      { text: 'Chat with the reflection', diff: false },
      { text: 'A few reflections and replies a day', diff: true },
      { text: 'Private. No ads.', diff: false },
    ],
    cta: 'Start free',
    recommended: false,
    href: appSignupUrl(),
    note: 'Stay here as long as you want.',
  },
  {
    id: 'pattern',
    name: 'Quieter, All the Way',
    price: '$9',
    priceNote: '/mo',
    outcome: 'When a few is not enough.',
    includes: [
      { text: 'Write and save every thought', diff: false },
      { text: 'A reflection you can answer', diff: false },
      { text: 'Chat with the reflection', diff: false },
      { text: 'As many as it takes', diff: true },
      { text: 'Private. No ads.', diff: false },
    ],
    cta: 'Go all the way',
    recommended: true,
    href: appSignupUrl({ plan: 'pattern' }),
    note: 'Cancel anytime. Keep every entry.',
  },
] as const

const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: 'Can I stay on free?',
    a: 'Yes. Quieter is a real product, not a trial. Write and save everything. You get 3 reflections and 5 chat replies each day. Stay as long as that is enough.',
  },
  {
    q: 'What does $9 actually add?',
    a: 'More reflections and replies when you need them. Same product. You do not stop at almost quiet.',
  },
  {
    q: 'What happens if I cancel?',
    a: 'You keep every entry. Daily limits come back. You can go all the way again later.',
  },
  {
    q: 'Is my writing used to train AI?',
    a: (
      <>
        We do not sell your journal. Writing stays tied to your account, and we
        do not use it as public training material. When you use AI help,
        relevant parts may be sent to subprocessors to generate the reflection.{' '}
        <Link to="/privacy">See Privacy</Link> for the details.
      </>
    ),
  },
]

type PricingProps = {
  onCookiePreferences?: () => void
}

export default function Pricing({ onCookiePreferences }: PricingProps) {
  useEffect(() => {
    document.title = 'Journal42: Pricing'
    return () => {
      document.title = 'Journal42: Get it out of your head.'
    }
  }, [])

  return (
    <div className="page">
      <header className="nav">
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
            onClick={() => trackEvent('cta_start_free_pricing')}
          >
            Start free
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero pricing-hero" aria-label="Pricing">
          <div className="hero-atmosphere" aria-hidden="true">
            <div className="hero-orb hero-orb-a" />
            <div className="hero-orb hero-orb-b" />
            <div className="hero-grain" />
          </div>

          <div className="pricing-hero-inner">
            <div className="pricing-hero-copy">
              <p className="section-label">Pricing</p>
              <h1 className="hero-headline">
                Get quieter. Stay free.
              </h1>
              <p className="hero-support">
                $9 a month if you still have more in your head.
              </p>
            </div>

            <div className="pricing-grid" id="plans">
              {PLANS.map((plan, index) => (
                <article
                  key={plan.id}
                  className={`pricing-plan${plan.recommended ? ' is-recommended' : ''}`}
                  style={{ animationDelay: `${0.08 + index * 0.08}s` }}
                >
                  {plan.recommended ? (
                    <p className="pricing-plan-badge">All the way</p>
                  ) : (
                    <p className="pricing-plan-badge is-quiet">Forever free</p>
                  )}
                  <h2 className="pricing-plan-name">{plan.name}</h2>
                  <p className="pricing-plan-price">
                    <span className="pricing-plan-amount">{plan.price}</span>
                    {plan.priceNote ? (
                      <span className="pricing-plan-period">{plan.priceNote}</span>
                    ) : null}
                  </p>
                  <p className="pricing-plan-outcome">{plan.outcome}</p>
                  <ul className="pricing-plan-includes">
                    {plan.includes.map((item) => (
                      <li key={item.text} className={item.diff ? 'is-diff' : undefined}>
                        {item.text}
                      </li>
                    ))}
                  </ul>
                  <a
                    className={
                      plan.recommended
                        ? 'btn-primary pricing-plan-cta'
                        : 'btn-ghost pricing-plan-cta'
                    }
                    href={plan.href}
                    onClick={() => trackEvent(`cta_pricing_${plan.id}`)}
                  >
                    {plan.cta}
                  </a>
                  <p className="pricing-plan-note">{plan.note}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="for-whom pricing-why" id="why" aria-label="Why pay">
          <div className="section">
            <div className="for-whom-layout">
              <div>
                <p className="section-label">Why pay</p>
                <h2 className="section-title">
                  You pay when a few is not enough.
                </h2>
                <p className="section-lead">
                  Writing and saving stay free. Reflection and chat stay free.
                  $9 is so you are not left at almost quiet.
                </p>
              </div>
              <div className="for-whom-right">
                <p className="for-whom-list-label">What $9 is for</p>
                <ul className="for-whom-list">
                  <li>
                    <span>01</span> Another reflection when you need it
                  </li>
                  <li>
                    <span>02</span> Until it&apos;s out, not until we say so
                  </li>
                  <li>
                    <span>03</span> Cancel anytime. Keep every entry.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="pricing-faq" id="faq" aria-label="Questions">
          <div className="section">
            <p className="section-label">Questions</p>
            <h2 className="section-title">Before you pick.</h2>
            <p className="section-lead">
              Free is enough to start. Paid is when a few is not enough.
            </p>
            <div className="pricing-faq-list">
              {FAQS.map((item) => (
                <details key={item.q} className="pricing-faq-item">
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="closing" id="start">
          <div className="closing-glow" aria-hidden="true" />
          <div className="section closing-inner">
            <p className="closing-brand">
              Journal<span>42</span>
            </p>
            <h2 className="section-title">Start free. Stay as long as you want.</h2>
            <p className="section-lead">
              Go all the way only if a few is not enough.
            </p>
            <div className="hero-actions">
              <a
                className="btn-primary btn-closing"
                href={appSignupUrl()}
                onClick={() => trackEvent('cta_start_free_pricing')}
              >
                Start free
              </a>
              <a
                className="btn-ghost"
                href={appSignupUrl({ plan: 'pattern' })}
                onClick={() => trackEvent('cta_pricing_pattern_closing')}
              >
                Go all the way
              </a>
            </div>
            <p className="closing-note">Private by design. Always.</p>
          </div>
        </section>
      </main>

      <SiteFooter onCookiePreferences={onCookiePreferences} />
    </div>
  )
}
