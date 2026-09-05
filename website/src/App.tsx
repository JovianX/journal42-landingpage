import { lazy, Suspense, useEffect, useState } from 'react'
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
import LandingAfterHero from './LandingAfterHero'
import { HOME_HEADLINE, HOME_SUPPORT, HOME_TITLE } from './landingCopy'
import SiteFooter from './SiteFooter'
import { trackEvent, trackPageView } from './analytics'
import { appLoginUrl, appSignupUrl } from './appUrl'

const Pricing = lazy(() => import('./Pricing'))
const MicroJournalingPage = lazy(() =>
  import('./Explainers').then((m) => ({ default: m.MicroJournalingPage })),
)
const PrivateJournalPage = lazy(() =>
  import('./Explainers').then((m) => ({ default: m.PrivateJournalPage })),
)
const AiJournalPage = lazy(() =>
  import('./Explainers').then((m) => ({ default: m.AiJournalPage })),
)
const ChatGptAsJournalPage = lazy(() =>
  import('./Explainers').then((m) => ({ default: m.ChatGptAsJournalPage })),
)
const JournalLockPage = lazy(() =>
  import('./JournalLockPages').then((m) => ({ default: m.JournalLockPage })),
)
const JournalLockTechnicalPage = lazy(() =>
  import('./JournalLockPages').then((m) => ({
    default: m.JournalLockTechnicalPage,
  })),
)
const SituationPage = lazy(() =>
  import('./SituationPages').then((m) => ({ default: m.SituationPage })),
)
const ForIndexPage = lazy(() =>
  import('./SituationPages').then((m) => ({ default: m.ForIndexPage })),
)
const ForSlugPage = lazy(() =>
  import('./SituationPages').then((m) => ({ default: m.ForSlugPage })),
)
const PrivacyPage = lazy(() =>
  import('./Legal').then((m) => ({ default: m.PrivacyPage })),
)
const TermsPage = lazy(() =>
  import('./Legal').then((m) => ({ default: m.TermsPage })),
)
const ContactPage = lazy(() =>
  import('./Legal').then((m) => ({ default: m.ContactPage })),
)

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

function ScrollOnRoute() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }

    const id = decodeURIComponent(hash.replace(/^#/, ''))
    const started = Date.now()

    const seek = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ block: 'start' })
        return
      }
      if (Date.now() - started < 2000) {
        requestAnimationFrame(seek)
      }
    }

    seek()
  }, [pathname, hash])

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
  const [heroGone, setHeroGone] = useState(false)

  useEffect(() => {
    document.title = HOME_TITLE
  }, [])

  useEffect(() => {
    const hero = document.querySelector('.landing-hero')
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

  return (
    <div className="page">
      <header className={`nav${heroGone ? ' is-sticky' : ''}`}>
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
            onClick={() =>
              trackEvent(heroGone ? 'cta_start_yours_nav' : 'cta_start_free')
            }
          >
            Start yours
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero landing-hero" aria-label="Introduction">
          <div className="hero-atmosphere landing-hero-atmosphere" aria-hidden="true">
            <div className="landing-hero-window" />
            <div className="landing-hero-lamp" />
            <div className="hero-orb hero-orb-a" />
            <div className="hero-orb hero-orb-b" />
            <div className="landing-hero-horizon" />
            <div className="hero-grain" />
          </div>

          <div className="landing-hero-grid">
            <div className="landing-hero-copy">
              <p className="hero-brand-mark" aria-hidden="true">
                Journal<span>42</span>
              </p>
              <h1 className="hero-headline">{HOME_HEADLINE}</h1>
              <p className="hero-support">{HOME_SUPPORT}</p>
            </div>

            <div className="landing-hero-demo" id="try">
              <HeroCompose />
            </div>
          </div>
        </section>

        <LandingAfterHero />
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
      <ScrollOnRoute />
      <Suspense fallback={<div className="page" />}>
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
            path="/chatgpt-as-a-journal"
            element={
              <ChatGptAsJournalPage
                onCookiePreferences={openCookiePreferences}
              />
            }
          />
          <Route
            path="/journal-lock"
            element={
              <JournalLockPage onCookiePreferences={openCookiePreferences} />
            }
          />
          <Route
            path="/journal-lock-technical"
            element={
              <JournalLockTechnicalPage
                onCookiePreferences={openCookiePreferences}
              />
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
      </Suspense>
      <CookieConsent
        forceOpen={cookiePrefsOpen}
        onClosePreferences={closeCookiePreferences}
      />
    </>
  )
}

export default App
