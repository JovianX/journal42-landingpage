import { Link } from 'react-router-dom'
import { LANDING_FAQS } from './landingCopy'

const ABOUT_POINTS = [
  {
    num: '01',
    title: 'Half-thoughts are enough',
    body: 'Start before you know what you are trying to say. Write what is still running. Walk away quieter.',
  },
  {
    num: '02',
    title: 'A reflection you can answer',
    body: 'It names what sat under the noise. Reply if you want to go further.',
  },
  {
    num: '03',
    title: 'Private on purpose',
    body: 'Your writing stays tied to your account. We do not sell your journal, and we do not train on it.',
  },
] as const

export function LandingSeoContent() {
  return (
    <>
      <section className="about" id="about" aria-labelledby="about-title">
        <div className="section">
          <div className="about-layout">
            <div>
              <p className="section-label">What it is</p>
              <h2 className="section-title" id="about-title">
                A private journal.
              </h2>
            </div>
            <div className="about-prose">
              <p>
                Journal42 is a private journaling app. You
                write a fragment. It saves. You get a short AI reflection you
                can answer, then you walk away. Private. Built for
                the nights work follows you home.
              </p>
              <p>
                For the hour when Slack is still open, the kids are asleep, and
                standup, pickup, and dinner are still occupying the same
                nervous system. Write what is still running. Put it down. Come
                back when your mind gets loud again.
              </p>
              <p>
                Your thoughts stay yours.{' '}
                <Link to="/privacy">We do not train on your journal.</Link>{' '}
                <Link to="/pricing">See pricing</Link> when you want the
                details on plans.
              </p>
            </div>
          </div>

          <div className="about-points">
            {ABOUT_POINTS.map((point) => (
              <article key={point.num} className="about-point">
                <span className="practice-num">{point.num}</span>
                <h3>{point.title}</h3>
                <p>{point.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pricing-faq landing-faq" id="faq" aria-labelledby="faq-title">
        <div className="section">
          <p className="section-label">Questions</p>
          <h2 className="section-title" id="faq-title">
            Private journaling, plainly.
          </h2>
          <p className="section-lead">
            What Journal42 is, who it is for, and what happens to what you
            write.
          </p>
          <div className="pricing-faq-list">
            {LANDING_FAQS.map((item) => (
              <details key={item.q} className="pricing-faq-item">
                <summary>{item.q}</summary>
                <p>
                  {item.q === 'Is my writing private?' ? (
                    <>
                      {item.a}{' '}
                      <Link to="/journal-lock">How journal lock works</Link>.{' '}
                      <Link to="/privacy">See Privacy</Link> for the details.
                    </>
                  ) : (
                    item.a
                  )}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
