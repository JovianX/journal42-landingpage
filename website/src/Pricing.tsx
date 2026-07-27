import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import SiteFooter from './SiteFooter'
import { trackEvent } from './analytics'

const PLANS = [
  {
    id: 'clear-head',
    name: '2-Minute Clear Head',
    price: 'Free',
    priceNote: null,
    outcome: 'Noise leaves your head fast.',
    includes: [
      'Spill without a prompt',
      'AI help finding the words',
      'Your entries stay with you',
    ],
    cta: 'Start writing',
    recommended: false,
  },
  {
    id: 'pattern',
    name: 'See The Pattern',
    price: '$1',
    priceNote: '/mo',
    outcome: "You see what's under the noise.",
    includes: [
      'Everything in Clear Head',
      "Names what you're actually feeling",
      'Reflection with past entries',
    ],
    cta: 'Start seeing patterns',
    recommended: true,
  },
  {
    id: 'forever',
    name: 'Know Yourself Forever',
    price: '$12',
    priceNote: '/mo',
    outcome: 'Your history keeps making you clearer.',
    includes: [
      'Everything in See The Pattern',
      'Mood tracking',
      'Analytics and streaks',
      'Memory and search',
      'Organization tools',
    ],
    cta: 'Go deeper',
    recommended: false,
  },
] as const

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
          <Link className="nav-link" to="/features">
            Features
          </Link>
          <Link className="nav-link" to="/pricing" aria-current="page">
            Pricing
          </Link>
          <Link
            className="nav-cta"
            to="/login"
            onClick={() => trackEvent('cta_start_writing_pricing')}
          >
            Start writing
          </Link>
        </div>
      </header>

      <main id="top">
        <section className="hero pricing-hero" aria-label="Pricing introduction">
          <div className="hero-atmosphere" aria-hidden="true">
            <div className="hero-orb hero-orb-a" />
            <div className="hero-orb hero-orb-b" />
            <div className="hero-grain" />
          </div>

          <div className="hero-copy pricing-hero-copy">
            <p className="brand-mark">
              Journal<span>42</span>
            </p>
            <h1 className="hero-headline">How deep do you want the practice to go?</h1>
            <p className="hero-support">
              Same private page. Three outcomes. Start light, or keep the history
              that makes you clearer over time.
            </p>
            <div className="hero-actions">
              <Link
                className="btn-primary"
                to="/login"
                onClick={() => trackEvent('cta_start_writing_pricing')}
              >
                Start writing
              </Link>
              <a className="btn-ghost" href="#plans">
                Compare plans
              </a>
            </div>
          </div>
        </section>

        <section className="pricing-plans" id="plans" aria-label="Plans">
          <div className="section">
            <p className="section-label">Plans</p>
            <h2 className="section-title">Pick the outcome you want.</h2>
            <p className="section-lead">
              Release the noise. See the pattern. Or keep a private record that
              gets sharper the longer you stay.
            </p>

            <div className="pricing-grid">
              {PLANS.map((plan, index) => (
                <article
                  key={plan.id}
                  className={`pricing-plan${plan.recommended ? ' is-recommended' : ''}`}
                  style={{ animationDelay: `${0.08 + index * 0.08}s` }}
                >
                  {plan.recommended ? (
                    <p className="pricing-plan-badge">Recommended</p>
                  ) : null}
                  <h3 className="pricing-plan-name">{plan.name}</h3>
                  <p className="pricing-plan-price">
                    <span className="pricing-plan-amount">{plan.price}</span>
                    {plan.priceNote ? (
                      <span className="pricing-plan-period">{plan.priceNote}</span>
                    ) : null}
                  </p>
                  <p className="pricing-plan-outcome">{plan.outcome}</p>
                  <ul className="pricing-plan-includes">
                    {plan.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <Link
                    className={
                      plan.recommended ? 'btn-primary pricing-plan-cta' : 'btn-ghost pricing-plan-cta'
                    }
                    to="/login"
                    onClick={() => trackEvent(`cta_pricing_${plan.id}`)}
                  >
                    {plan.cta}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="for-whom pricing-why" id="why" aria-label="Why these plans">
          <div className="section">
            <div className="for-whom-layout">
              <div>
                <p className="section-label">The ladder</p>
                <h2 className="section-title">Release. Insight. Lasting self-knowledge.</h2>
                <p className="section-lead">
                  Each plan buys a clearer outcome, not a longer feature list.
                  Start where you are. Go deeper when the page is not enough.
                </p>
              </div>
              <div className="for-whom-right">
                <p className="for-whom-list-label">What you leave with</p>
                <ul className="for-whom-list">
                  <li>
                    <span>01</span> A quieter head in two minutes
                  </li>
                  <li>
                    <span>02</span> What you&apos;re actually feeling, named
                  </li>
                  <li>
                    <span>03</span> A history that answers back
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="closing" id="start">
          <div className="closing-glow" aria-hidden="true" />
          <div className="section closing-inner">
            <p className="closing-brand">
              Journal<span>42</span>
            </p>
            <h2 className="section-title">Two minutes. Then quieter.</h2>
            <p className="section-lead">
              Invite-only beta. Pick a plan when you&apos;re in. Your thoughts
              stay yours.
            </p>
            <div className="hero-actions">
              <Link
                className="btn-primary btn-closing"
                to="/login"
                onClick={() => trackEvent('cta_start_writing_pricing')}
              >
                Start writing
              </Link>
            </div>
            <p className="closing-note">Private by design. Always.</p>
          </div>
        </section>
      </main>

      <SiteFooter onCookiePreferences={onCookiePreferences} />
    </div>
  )
}
