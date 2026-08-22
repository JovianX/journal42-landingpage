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
import CookieConsent from './CookieConsent'
import HeroCompose from './HeroCompose'
import { LandingSeoContent } from './landingSeo'
import { HOME_TITLE } from './landingCopy'
import {
  AiJournalPage,
  MicroJournalingPage,
  PrivateJournalPage,
} from './Explainers'
import { ContactPage, PrivacyPage, TermsPage } from './Legal'
import Pricing from './Pricing'
import SiteFooter from './SiteFooter'
import { ForIndexPage, ForSlugPage, SituationPage } from './SituationPages'
import { trackEvent, trackPageView } from './analytics'
import { appLoginUrl, appSignupUrl } from './appUrl'

const APP_ENTRY_PATHS = new Set([
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
    if (path && APP_ENTRY_PATHS.has(path)) {
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

function RedirectToApp() {
  const { authView } = useParams()

  useEffect(() => {
    if (!authView || !APP_ENTRY_PATHS.has(authView)) return
    trackEvent('auth_redirect_to_app', { from: authView })
    window.location.replace(appSignupUrl())
  }, [authView])

  if (!authView || !APP_ENTRY_PATHS.has(authView)) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="auth-page">
      <div className="auth-atmosphere" aria-hidden="true">
        <div className="hero-orb hero-orb-a" />
        <div className="hero-orb hero-orb-b" />
        <div className="hero-grain" />
      </div>
      <main className="auth-main">
        <div className="auth-panel">
          <p className="auth-brand">
            Journal<span>42</span>
          </p>
          <h1 className="auth-title">Opening Journal42…</h1>
          <p className="auth-lead">
            Taking you to the app to start writing.
          </p>
          <p className="auth-footnote">
            <a href={appSignupUrl()}>Continue manually</a> if nothing happens.
          </p>
        </div>
      </main>
    </div>
  )
}

type LandingProps = {
  onCookiePreferences?: () => void
}

function Landing({ onCookiePreferences }: LandingProps) {
  useEffect(() => {
    document.title = HOME_TITLE
  }, [])

  return (
    <div className="page">
      <header className="nav">
        <Link className="nav-brand" to="/" aria-label="Journal42 home">
          Journal<span>42</span>
        </Link>
        <div className="nav-actions">
          <Link className="nav-link" to="/pricing">
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
            onClick={() => trackEvent('cta_start_free')}
          >
            Start free
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero landing-hero" aria-label="Introduction">
          <div className="hero-atmosphere landing-hero-atmosphere" aria-hidden="true">
            <div className="hero-orb hero-orb-a" />
            <div className="hero-orb hero-orb-b" />
            <div className="landing-hero-horizon" />
            <div className="hero-grain" />
          </div>

          <div className="landing-hero-grid">
            <div className="landing-hero-copy">
              <h1 className="hero-headline">Get it out of your head.</h1>
              <p className="hero-support">
                For the nights work follows you home. Two minutes. Private.
              </p>
              <div className="hero-actions">
                <a
                  className="btn-primary"
                  href={appSignupUrl()}
                  onClick={() => trackEvent('cta_start_free_hero')}
                >
                  Start free
                </a>
              </div>
              <p className="hero-trust">Free. Private. No credit card.</p>
            </div>

            <div className="landing-hero-demo" id="try">
              <HeroCompose />
            </div>
          </div>
        </section>

        <section className="practice" id="how">
          <div className="section">
            <p className="section-label">How it works</p>
            <h2 className="section-title">Write. Reflect. Walk away.</h2>
            <p className="section-lead">
              Journal42 asks for two quiet minutes, then a reflection you can
              answer.
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
                <h3>Write a fragment</h3>
                <p>
                  Half-thoughts are enough. Start before you know what you are
                  trying to say.
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
                <h3>Get a reflection</h3>
                <p>
                  It names what sat under the noise. Reply if you want to go
                  further.
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
                <h3>Walk away. It remembers.</h3>
                <p>
                  Put the weight down. Come back when your mind gets loud
                  again. Three reflections a day, free.
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
                  If your head is still running after the house goes quiet.
                </h2>
                <p className="section-lead">
                  Tech work and family logistics in the same nervous system.
                  Private stress. No clean place to put it down.
                </p>
              </div>
              <div className="for-whom-right">
                <p className="for-whom-list-label">Sound familiar?</p>
                <ul className="for-whom-list">
                  <li>
                    <span>01</span> Slack still open after the kids are asleep
                  </li>
                  <li>
                    <span>02</span> Talked over in standup, then late for pickup
                  </li>
                  <li>
                    <span>03</span> Sprint, dentist, and dinner in one head
                  </li>
                  <li>
                    <span>04</span> Snapped at home, still replaying the review
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <LandingSeoContent />

        <section className="closing" id="start">
          <div className="closing-glow" aria-hidden="true" />
          <div className="section closing-inner">
            <p className="closing-brand">
              Journal<span>42</span>
            </p>
            <h2 className="section-title">Two minutes. Then quieter.</h2>
            <p className="section-lead">
              Start free. Write, save, reflect, and chat. Upgrade if a few
              is not enough.
            </p>
            <div className="hero-actions">
              <a
                className="btn-primary btn-closing"
                href={appSignupUrl()}
                onClick={() => trackEvent('cta_start_free_closing')}
              >
                Start free
              </a>
            </div>
            <p className="hero-trust">Free. Private. No credit card.</p>
            <p className="closing-note">
              Your thoughts stay yours. Always. We do not train on your journal.{' '}
              <Link to="/privacy">Privacy</Link>
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
        <Route path="/features" element={<Navigate to="/" replace />} />
        <Route
          path="/pricing"
          element={<Pricing onCookiePreferences={openCookiePreferences} />}
        />
        <Route
          path="/micro-journaling"
          element={
            <MicroJournalingPage
              onCookiePreferences={openCookiePreferences}
            />
          }
        />
        <Route
          path="/private-journal"
          element={
            <PrivateJournalPage onCookiePreferences={openCookiePreferences} />
          }
        />
        <Route
          path="/ai-journal"
          element={
            <AiJournalPage onCookiePreferences={openCookiePreferences} />
          }
        />
        <Route
          path="/journaling-for-anxiety"
          element={
            <SituationPage
              path="/journaling-for-anxiety"
              onCookiePreferences={openCookiePreferences}
            />
          }
        />
        <Route
          path="/journaling-for-stress"
          element={
            <SituationPage
              path="/journaling-for-stress"
              onCookiePreferences={openCookiePreferences}
            />
          }
        />
        <Route
          path="/journaling-after-a-breakup"
          element={
            <SituationPage
              path="/journaling-after-a-breakup"
              onCookiePreferences={openCookiePreferences}
            />
          }
        />
        <Route
          path="/journaling-when-you-cant-sleep"
          element={
            <SituationPage
              path="/journaling-when-you-cant-sleep"
              onCookiePreferences={openCookiePreferences}
            />
          }
        />
        <Route
          path="/journaling-for-burnout"
          element={
            <SituationPage
              path="/journaling-for-burnout"
              onCookiePreferences={openCookiePreferences}
            />
          }
        />
        <Route
          path="/for"
          element={
            <ForIndexPage onCookiePreferences={openCookiePreferences} />
          }
        />
        <Route
          path="/for/:slug"
          element={
            <ForSlugPage onCookiePreferences={openCookiePreferences} />
          }
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
        <Route path="/:authView" element={<RedirectToApp />} />
      </Routes>
      <CookieConsent
        forceOpen={cookiePrefsOpen}
        onClosePreferences={closeCookiePreferences}
      />
    </>
  )
}

export default App
