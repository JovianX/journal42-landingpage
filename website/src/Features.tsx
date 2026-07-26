import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { trackEvent } from './analytics'

const ADVANCED_FEATURE_GROUPS = [
  {
    id: 'prompts',
    title: 'Guided prompts',
    blurb: 'Optional ways in when a blank page still feels hard.',
    items: [
      'Daily question',
      'Auto-generated titles',
      'Scheduled entries',
      'Gratitude journal',
      'Morning spill',
      'Evening reflection',
      'Goal review',
    ],
  },
  {
    id: 'mood',
    title: 'Mood tracking',
    blurb: 'A quiet pulse when you want one, never a chore.',
    items: [
      'Mood score',
      'Energy level',
      'Anxiety level',
      'Stress level',
      'Confidence score',
      'Mood trends',
    ],
  },
  {
    id: 'analytics',
    title: 'Analytics',
    blurb: 'Patterns from what you already wrote, not dashboards you feed.',
    items: [
      'Mood over time',
      'Frequently used words',
      'Topics discussed',
      'People mentioned',
      'Places visited',
      'Time of day analysis',
      'Writing frequency',
      'Streaks',
    ],
  },
  {
    id: 'memory',
    title: 'Memory and recall',
    blurb: 'Find old entries the way you remember them.',
    items: [
      'On this day',
      'Random memories',
      'Similar past entries',
      'Search by people',
      'Search by emotion',
      'AI semantic search',
      'Timeline view',
    ],
  },
  {
    id: 'organization',
    title: 'Organization',
    blurb: 'Structure you can add later, never before you start.',
    items: [
      'Tags',
      'Folders',
      'Multiple journals',
      'Projects',
      'Collections',
      'Favorites',
      'Pin entries',
      'Archive',
    ],
  },
] as const

function AdvancedFeatures() {
  const [open, setOpen] = useState(false)

  const toggle = () => {
    const next = !open
    setOpen(next)
    trackEvent(next ? 'features_advanced_open' : 'features_advanced_close')
  }

  return (
    <section
      className={`features-advanced${open ? ' is-open' : ''}`}
      id="advanced"
      aria-label="Advanced features"
    >
      <div className="section features-advanced-inner">
        <div className="features-advanced-drawer">
          <div className="features-advanced-top">
            <div className="features-advanced-hero">
              <p className="section-label">Under the hood</p>
              <h2 className="section-title">Advanced, if you want it.</h2>
              <p className="section-lead">
                Writing stays front and center. The rest stays out of the way
                until you ask.
              </p>
            </div>
            <button
              type="button"
              className="features-advanced-toggle"
              aria-expanded={open}
              aria-controls="advanced-feature-list"
              onClick={toggle}
            >
              <span>
                {open ? 'Hide advanced features' : 'Show advanced features'}
              </span>
              <span
                className="features-advanced-toggle-icon"
                aria-hidden="true"
              />
            </button>
          </div>

          <div
            id="advanced-feature-list"
            className="features-advanced-reveal"
            aria-hidden={!open}
          >
            <div className="features-advanced-reveal-inner">
              <div className="features-advanced-groups">
                {ADVANCED_FEATURE_GROUPS.map((group) => (
                  <div key={group.id} className="features-advanced-group">
                    <div className="features-advanced-group-copy">
                      <h3 className="features-advanced-group-title">
                        {group.title}
                      </h3>
                      <p className="features-advanced-group-blurb">
                        {group.blurb}
                      </p>
                    </div>
                    <ul className="features-advanced-list">
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function JournalHeroMock() {
  return (
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
              Can&apos;t tell if I&apos;m angry or embarrassed. Keep rewriting
              what I should have said.
              <span className="caret" />
            </p>

            <div className="sheet-status">
              <span className="status-saved">Saved</span>
              <span>2 min</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Features() {
  useEffect(() => {
    document.title = 'Journal42: Frictionless journaling'
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
          <Link className="nav-link" to="/features" aria-current="page">
            Features
          </Link>
          <Link className="nav-link" to="/pricing">
            Pricing
          </Link>
          <Link
            className="nav-cta"
            to="/login"
            onClick={() => trackEvent('cta_start_writing_features')}
          >
            Start writing
          </Link>
        </div>
      </header>

      <main id="top">
        <section className="hero features-hero" aria-label="Features introduction">
          <div className="hero-atmosphere" aria-hidden="true">
            <div className="hero-orb hero-orb-a" />
            <div className="hero-orb hero-orb-b" />
            <div className="hero-grain" />
          </div>

          <div className="hero-visual" aria-hidden="true">
            <JournalHeroMock />
          </div>

          <div className="hero-copy">
            <p className="brand-mark">
              Journal<span>42</span>
            </p>
            <h1 className="hero-headline">Nothing between you and the page.</h1>
            <p className="hero-support">
              Journaling fails on friction, not on willpower. Journal42 is built
              so starting is easier than carrying it.
            </p>
            <div className="hero-actions">
              <Link
                className="btn-primary"
                to="/login"
                onClick={() => trackEvent('cta_start_writing_features')}
              >
                Start writing
              </Link>
              <a className="btn-ghost" href="#friction">
                What usually stops you
              </a>
            </div>
          </div>
        </section>

        <section className="for-whom features-friction" id="friction">
          <div className="section">
            <div className="for-whom-layout">
              <div>
                <p className="section-label">The friction</p>
                <h2 className="section-title">
                  What usually stops you cold.
                </h2>
                <p className="section-lead">
                  Not the writing itself. Everything around it: the blank page,
                  the prompt, the hour you don&apos;t have, the feeling you
                  should perform.
                </p>
              </div>
              <div className="for-whom-right">
                <p className="for-whom-list-label">We designed those out</p>
                <ul className="for-whom-list">
                  <li>
                    <span>01</span> Blank page with nowhere to start
                  </li>
                  <li>
                    <span>02</span> Prompts that feel like homework
                  </li>
                  <li>
                    <span>03</span> Sessions that ask for an hour
                  </li>
                  <li>
                    <span>04</span> Chatbots you have to talk to
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="features-session" id="session" aria-label="A writing session">
          <div className="section">
            <p className="section-label">A session</p>
            <h2 className="section-title">Open. Write. Walk away.</h2>
            <p className="section-lead">
              One private page. Two minutes. Your history waiting when you need
              it. That is the whole product.
            </p>
          </div>

          <article className="features-beat">
            <div className="features-beat-copy">
              <span className="practice-num">01</span>
              <h3>Spill the thoughts&nbsp;out</h3>
              <p>
                No abstraction. No plan. No structure. Nothing to figure out
                before you start. Don&apos;t think about what to write. Just put
                the thoughts on the page.
              </p>
            </div>
            <div className="features-beat-visual" aria-hidden="true">
              <div className="features-sheet">
                <div className="features-sheet-chrome">
                  <span>Journal / Tonight</span>
                  <span className="chrome-badge">
                    <span className="chrome-lock" />
                    Private
                  </span>
                </div>
                <div className="features-sheet-body">
                  <p className="features-empty-line">
                    <span className="caret" />
                  </p>
                  <p className="features-empty-hint">Don&apos;t plan it. Spill it.</p>
                </div>
              </div>
            </div>
          </article>

          <article className="features-beat features-beat-flip">
            <div className="features-beat-copy">
              <span className="practice-num">02</span>
              <h3>Two minutes is enough</h3>
              <p>
                Write until the noise softens. Autosave keeps up. Word count and
                time stay quiet in the corner. Nothing to organize before you
                leave.
              </p>
            </div>
            <div className="features-beat-visual" aria-hidden="true">
              <div className="features-sheet">
                <div className="features-sheet-chrome">
                  <span>Mar 14 · 11:42 pm</span>
                  <span className="status-saved">Saved</span>
                </div>
                <div className="features-sheet-body">
                  <p className="features-sheet-text">
                    still in my head. that slack thread. should have just said
                    it. whatever.
                    <br />
                    tired. not even mad? maybe mad.
                    <span className="caret" />
                  </p>
                  <div className="features-sheet-status">
                    <span>64 words</span>
                    <span>2 min</span>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article className="features-beat">
            <div className="features-beat-copy">
              <span className="practice-num">03</span>
              <h3>Your history answers back</h3>
              <p>
                AI helps name the undercurrent, then reflects it with past
                entries. Not a chatbot. Not a script. Context you already wrote.
              </p>
            </div>
            <div className="features-beat-visual" aria-hidden="true">
              <div className="features-sheet features-sheet-insight">
                <div className="features-sheet-chrome">
                  <span>Tonight</span>
                  <span className="status-saved">Just now</span>
                </div>
                <div className="features-sheet-body">
                  <p className="features-insight-scrap">
                    &ldquo;should have just said it.&rdquo;
                  </p>
                  <div className="features-insight-divider">
                    <span>From your history</span>
                    <span className="ai-link">Mar 11</span>
                  </div>
                  <p className="features-insight-text">
                    Three times this week you wrote about biting your tongue.
                    The Slack thread is noise. The pattern is waiting too long
                    to speak. Tuesday you named it, and the night got quieter.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </section>

        <AdvancedFeatures />

        <section className="closing" id="start">
          <div className="closing-glow" aria-hidden="true" />
          <div className="section closing-inner">
            <p className="closing-brand">
              Journal<span>42</span>
            </p>
            <h2 className="section-title">Two minutes. Then quieter.</h2>
            <p className="section-lead">
              Ready when your mind gets loud. Private by design. Invite-only
              beta.
            </p>
            <div className="hero-actions">
              <Link
                className="btn-primary btn-closing"
                to="/login"
                onClick={() => trackEvent('cta_start_writing_features')}
              >
                Start writing
              </Link>
            </div>
            <p className="closing-note">Your thoughts stay yours. Always.</p>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>
          <strong>Journal42</strong> · private journaling
        </span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </div>
  )
}
