import './App.css'

function App() {
  return (
    <div className="page">
      <header className="nav">
        <a className="nav-brand" href="#top" aria-label="Journal42 home">
          Journal42
        </a>
        <a className="nav-cta" href="#start">
          Start free
        </a>
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
                <div className="sheet-meta">
                  <span>Mar 14 · private</span>
                  <span className="sheet-tag">decision log</span>
                </div>
                <h2 className="sheet-title">
                  Why I keep rewriting the auth service
                </h2>
                <p className="sheet-body">
                  Spent another afternoon circling the same tradeoff. Feels like
                  perfectionism, but maybe it&apos;s unfinished grief about the
                  last outage.
                  <span className="muted-line hide-sm">
                    {' '}
                    The team is waiting. I&apos;m waiting for certainty that
                    won&apos;t arrive.
                  </span>
                </p>
                <div className="ai-insight">
                  <p className="ai-label">Thought path</p>
                  <p className="ai-text">
                    You&apos;re optimizing for regret avoidance, not system
                    risk. Name the decision you can reverse in a week — then
                    ship that.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-copy">
            <p className="brand-mark">
              Journal<span>42</span>
            </p>
            <h1 className="hero-headline">Navigate the thoughts behind the work.</h1>
            <p className="hero-support">
              AI-guided journaling for tech professionals who need clarity in
              the noise — not another productivity dashboard.
            </p>
            <div className="hero-actions">
              <a className="btn-primary" href="#start">
                Start journaling
              </a>
              <a className="btn-ghost" href="#how">
                See how it works
              </a>
            </div>
          </div>
        </section>

        <section className="practice" id="how">
          <div className="section">
            <p className="section-label">How it works</p>
            <h2 className="section-title">Write freely. Find the signal.</h2>
            <p className="section-lead">
              Dump the mental stack. Journal42 surfaces patterns, questions, and
              next moves — so you leave clearer than you arrived.
            </p>

            <div className="practice-grid">
              <article className="practice-item">
                <span className="practice-num">01</span>
                <h3>Empty the buffer</h3>
                <p>
                  Capture decisions, doubts, and late-night loops in a private
                  space built for how engineers actually think.
                </p>
              </article>
              <article className="practice-item">
                <span className="practice-num">02</span>
                <h3>Follow the thread</h3>
                <p>
                  AI maps the undercurrent — fear, ambition, unfinished
                  conflict — without turning your journal into a chatbot.
                </p>
              </article>
              <article className="practice-item">
                <span className="practice-num">03</span>
                <h3>Leave with a vector</h3>
                <p>
                  Walk away with a sharper question or a reversible next step —
                  not a generic pep talk.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="for-whom">
          <div className="section">
            <div className="for-whom-layout">
              <div>
                <p className="section-label">Built for builders</p>
                <h2 className="section-title">
                  For minds that debug everything — including themselves.
                </h2>
                <p className="section-lead">
                  When the hard part isn&apos;t the code, it&apos;s the fog
                  around it.
                </p>
              </div>
              <ul className="for-whom-list">
                <li>
                  <span>01</span> Staff engineers navigating ambiguity
                </li>
                <li>
                  <span>02</span> Founders sorting signal from noise
                </li>
                <li>
                  <span>03</span> ICs after hard reviews or incidents
                </li>
                <li>
                  <span>04</span> Anyone who thinks in systems
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="closing" id="start">
          <div className="section">
            <p className="section-label">Begin</p>
            <h2 className="section-title">Your next clear thought starts here.</h2>
            <p className="section-lead">
              Private by default. Designed for deep work minds. Ready when the
              tabs won&apos;t quiet down.
            </p>
            <div className="hero-actions">
              <a className="btn-primary" href="#start">
                Start journaling free
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>
          <strong>Journal42</strong> · think clearly
        </span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </div>
  )
}

export default App
