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
                  <span className="sheet-tag">2 min dump</span>
                </div>
                <h2 className="sheet-title">
                  Can&apos;t tell if I&apos;m tired or scared
                </h2>
                <p className="sheet-body">
                  Jaw tight since the review. Keep refreshing Slack like that
                  will change what I heard. It&apos;s not the feedback —
                  it&apos;s the story I&apos;m telling about myself after.
                  <span className="muted-line hide-sm">
                    {' '}
                    Also snapped at someone at home. Same tension, different
                    room.
                  </span>
                </p>
                <div className="ai-insight">
                  <p className="ai-label">Reflection</p>
                  <p className="ai-text">
                    This reads more like shame than disagreement. You&apos;ve
                    named that spiral before — last time, naming it early
                    shortened it. What would softer self-talk sound like
                    tonight?
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-copy">
            <p className="brand-mark">
              Journal<span>42</span>
            </p>
            <h1 className="hero-headline">Get what&apos;s inside out.</h1>
            <p className="hero-support">
              The 2-minute journal for tech workers who don&apos;t have time —
              AI helps you express yourself, reflects with your own history,
              and leaves you clearer.
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
            <h2 className="section-title">Dump. Name it. Leave clearer.</h2>
            <p className="section-lead">
              No blank page. No polish. Journal42 helps you empty what&apos;s
              swirling, then reflects it back — so you leave lighter than you
              arrived.
            </p>

            <div className="practice-grid">
              <article className="practice-item">
                <span className="practice-num">01</span>
                <h3>Dump without polish</h3>
                <p>
                  Two minutes. Unfinished sentences welcome. A private space
                  for the fog you don&apos;t have time to sort alone.
                </p>
              </article>
              <article className="practice-item">
                <span className="practice-num">02</span>
                <h3>AI helps you name it</h3>
                <p>
                  Surfaces the feeling underneath — dread, pride, unfinished
                  grief — without turning your journal into a chatbot.
                </p>
              </article>
              <article className="practice-item">
                <span className="practice-num">03</span>
                <h3>Leave clearer; context grows</h3>
                <p>
                  Immediate reflection now. Over time, your history makes the
                  feedback more yours — not a generic pep talk.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="for-whom">
          <div className="section">
            <div className="for-whom-layout">
              <div>
                <p className="section-label">Built for overloaded minds</p>
                <h2 className="section-title">
                  For people who debug everything — except their inner state.
                </h2>
                <p className="section-lead">
                  When work and life blur, and the hard part isn&apos;t the
                  problem — it&apos;s what it does to you.
                </p>
              </div>
              <ul className="for-whom-list">
                <li>
                  <span>01</span> After hard days that linger past logout
                </li>
                <li>
                  <span>02</span> When anxiety has no clean root cause
                </li>
                <li>
                  <span>03</span> When personal and work stress share a room
                </li>
                <li>
                  <span>04</span> Anyone who knows journaling helps — and still
                  skips it
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
              Private by default. No blank-page tax. Ready when your head
              won&apos;t quiet down.
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
          <strong>Journal42</strong> · leave clearer
        </span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </div>
  )
}

export default App
