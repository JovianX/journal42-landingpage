import { useEffect, useState } from 'react'
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import './App.css'
import Auth from './Auth'
import CookieConsent from './CookieConsent'
import Features from './Features'
import { ContactPage, PrivacyPage, TermsPage } from './Legal'
import Pricing from './Pricing'
import SiteFooter from './SiteFooter'
import { trackEvent, trackPageView } from './analytics'

const AUTH_PATHS = new Set([
  'login',
  'signup',
  'start',
  'invite',
  'waitlist',
])

function LegacyHashRedirect() {
  const navigate = useNavigate()

  useEffect(() => {
    const raw = window.location.hash.replace(/^#\/?/, '')
    const path = raw.split('?')[0]
    if (path && AUTH_PATHS.has(path)) {
      navigate(`/${path}${window.location.search}`, { replace: true })
    }
  }, [navigate])

  return null
}

function PageViewTracker() {
  const location = useLocation()

  useEffect(() => {
    trackPageView(`${location.pathname}${location.search}`)
  }, [location.pathname, location.search])

  return null
}

function AuthRoute() {
  const { authView } = useParams()
  if (!authView || !AUTH_PATHS.has(authView)) {
    return <Navigate to="/" replace />
  }
  return <Auth />
}

type LandingProps = {
  onCookiePreferences?: () => void
}

function Landing({ onCookiePreferences }: LandingProps) {
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
          <Link className="nav-link" to="/pricing">
            Pricing
          </Link>
          <Link
            className="nav-cta"
            to="/login"
            onClick={() => trackEvent('cta_start_writing')}
          >
            Start writing
          </Link>
        </div>
      </header>

      <main id="top">
        <section className="hero" aria-label="Introduction">
          <div className="hero-atmosphere" aria-hidden="true">
            <div className="hero-orb hero-orb-a" />
            <div className="hero-orb hero-orb-b" />
            <div className="hero-grain" />
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="journal-plane">
              <div className="journal-sheet">
                <div className="app-window">
                  <div className="app-chrome">
                    <span className="chrome-path">Journal / Tonight</span>
                    <span className="chrome-badge">
                      <span className="chrome-lock" />
                      Private
                    </span>
                  </div>

                  <div className="app-canvas">
                    <div className="sheet-meta">
                      <span>Mar 14 · 11:42 pm</span>
                      <span className="sheet-tag">Writing</span>
                    </div>

                    <h2 className="sheet-title">Still replaying that meeting</h2>

                    <p className="sheet-body">
                      Can&apos;t tell if I&apos;m angry or embarrassed. Keep
                      rewriting what I should have said. Home feels far away
                      even though I&apos;m sitting in it.
                      <span className="muted-line hide-sm">
                        {' '}
                        I know I should write this down. I never do.
                      </span>
                      <span className="caret" />
                    </p>

                    <div className="ai-insight">
                      <div className="ai-insight-head">
                        <p className="ai-label">From your history</p>
                        <span className="ai-link">Mar 11</span>
                      </div>
                      <p className="ai-text">
                        You&apos;ve circled this for three days. Less about the
                        meeting, more about trusting your own judgment. Last
                        time you named that, the loop broke sooner.
                      </p>
                    </div>

                    <div className="sheet-status">
                      <span className="status-saved">Saved</span>
                      <span>247 words</span>
                      <span>2 min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-copy">
            <p className="brand-mark">
              Journal<span>42</span>
            </p>
            <h1 className="hero-headline">Get it out of your head.</h1>
            <p className="hero-support">
              Micro journaling when your mind is full and you need a fast way to
              clear it. Two minutes to write. AI helps you find the words, then
              reflects with your own history.
            </p>
            <div className="hero-actions">
              <Link
                className="btn-primary"
                to="/login"
                onClick={() => trackEvent('cta_start_writing')}
              >
                Start writing
              </Link>
              <a className="btn-ghost" href="#how">
                See how it works
              </a>
            </div>
          </div>
        </section>

        <section className="practice" id="how">
          <div className="section">
            <p className="section-label">How it works</p>
            <h2 className="section-title">From noise to quiet, in minutes.</h2>
            <p className="section-lead">
              No prompts that feel like homework. No hour you don&apos;t have.
              Just a private place to put the weight down.
            </p>

            <div className="practice-grid">
              <article className="practice-item">
                <div className="practice-visual" aria-hidden="true">
                  <div className="viz-page">
                    <span className="viz-line short" />
                    <span className="viz-line" />
                    <span className="viz-line mid uneven" />
                    <span className="viz-line long" />
                    <span className="viz-line mid" />
                    <span className="viz-caret" />
                  </div>
                </div>
                <span className="practice-num">01</span>
                <h3>Write badly on purpose</h3>
                <p>
                  Fragments. Rants. Half-thoughts. Start before you know what
                  you&apos;re trying to say. That&apos;s the point.
                </p>
              </article>
              <article className="practice-item">
                <div className="practice-visual" aria-hidden="true">
                  <div className="viz-reflect">
                    <div className="viz-entry-block">
                      <span className="viz-line short" />
                      <span className="viz-line mid" />
                    </div>
                    <div className="viz-insight-block">
                      <span className="viz-pulse" />
                      <span className="viz-line short teal" />
                      <span className="viz-line mid teal" />
                    </div>
                  </div>
                </div>
                <span className="practice-num">02</span>
                <h3>See what you&apos;re actually feeling</h3>
                <p>
                  AI helps name the undercurrent, then reflects it back with
                  the context of your past entries. Not a chatbot. Not a
                  script.
                </p>
              </article>
              <article className="practice-item">
                <div className="practice-visual" aria-hidden="true">
                  <div className="viz-clear">
                    <span className="viz-cloud dense" />
                    <span className="viz-cloud soft" />
                    <span className="viz-horizon" />
                    <span className="viz-breath" />
                  </div>
                </div>
                <span className="practice-num">03</span>
                <h3>Walk away lighter</h3>
                <p>
                  Leave clearer than you arrived. Come back when your mind gets
                  loud again. Your history stays with you, and gets sharper
                  over time.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="for-whom">
          <div className="section">
            <div className="for-whom-layout">
              <div>
                <p className="section-label">Who it&apos;s for</p>
                <h2 className="section-title">
                  Tech workers with too much in their head.
                </h2>
                <p className="section-lead">
                  Busy days. Private stress. You know journaling would help,
                  but starting and sticking with it never quite happens.
                  Journal42 is built for that gap.
                </p>
              </div>
              <div className="for-whom-right">
                <p className="for-whom-list-label">Sound familiar?</p>
                <ul className="for-whom-list">
                  <li>
                    <span>01</span> Conversations you keep replaying
                  </li>
                  <li>
                    <span>02</span> Hard days that follow you home
                  </li>
                  <li>
                    <span>03</span> Anxiety with no clean root cause
                  </li>
                  <li>
                    <span>04</span> Journaling you keep putting off
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
              Ready when your mind gets loud. Get it reflected back with your
              own history.
            </p>
            <div className="hero-actions">
              <Link
                className="btn-primary btn-closing"
                to="/login"
                onClick={() => trackEvent('cta_start_writing_closing')}
              >
                Start writing
              </Link>
            </div>
            <p className="closing-note">
              Invite-only beta. Your thoughts stay yours. Always.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter onCookiePreferences={onCookiePreferences} />
    </div>
  )
}

function App() {
  const [cookiePrefsOpen, setCookiePrefsOpen] = useState(false)

  const openCookiePreferences = () => setCookiePrefsOpen(true)
  const closeCookiePreferences = () => setCookiePrefsOpen(false)

  return (
    <>
      <LegacyHashRedirect />
      <PageViewTracker />
      <Routes>
        <Route
          path="/"
          element={<Landing onCookiePreferences={openCookiePreferences} />}
        />
        <Route
          path="/features"
          element={<Features onCookiePreferences={openCookiePreferences} />}
        />
        <Route
          path="/pricing"
          element={<Pricing onCookiePreferences={openCookiePreferences} />}
        />
        <Route
          path="/privacy"
          element={<PrivacyPage onCookiePreferences={openCookiePreferences} />}
        />
        <Route
          path="/terms"
          element={<TermsPage onCookiePreferences={openCookiePreferences} />}
        />
        <Route
          path="/contact"
          element={<ContactPage onCookiePreferences={openCookiePreferences} />}
        />
        <Route path="/:authView" element={<AuthRoute />} />
      </Routes>
      <CookieConsent
        forceOpen={cookiePrefsOpen}
        onClosePreferences={closeCookiePreferences}
      />
    </>
  )
}

export default App
