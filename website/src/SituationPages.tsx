import { Link, Navigate, useParams } from 'react-router-dom'
import {
  ArticleCareNote,
  ArticleCta,
  ArticleLayout,
} from './Article'
import {
  SITUATION_GROUPS,
  SITUATIONS,
  situationByPath,
  situationBySlug,
  situationsInGroup,
  type Situation,
} from './situationContent'
import { usePageMeta } from './usePageMeta'
import SiteFooter from './SiteFooter'
import { appLoginUrl, appSignupUrl } from './appUrl'
import { trackEvent } from './analytics'

type PageProps = {
  onCookiePreferences?: () => void
}

function relatedLinks(current: Situation) {
  const sameGroup = situationsInGroup(current.group).filter(
    (s) => s.path !== current.path,
  )
  const extras = SITUATIONS.filter(
    (s) => s.group !== current.group && s.path !== current.path,
  ).slice(0, 2)
  return [...sameGroup.slice(0, 3), ...extras].slice(0, 4)
}

export function SituationPage({
  path,
  onCookiePreferences,
}: PageProps & { path: string }) {
  const situation = situationByPath(path)
  if (!situation) return <Navigate to="/for" replace />

  const related = relatedLinks(situation)

  return (
    <ArticleLayout
      label="Guide"
      title={situation.title}
      documentTitle={situation.documentTitle}
      description={situation.description}
      path={situation.path}
      lead={situation.lead}
      onCookiePreferences={onCookiePreferences}
    >
      {situation.paragraphs.map((p) => (
        <p key={p.slice(0, 48)}>{p}</p>
      ))}

      <h2>Keep reading</h2>
      <ul className="article-related">
        {related.map((item) => (
          <li key={item.path}>
            <Link to={item.path}>{item.indexLabel}</Link>
          </li>
        ))}
        <li>
          <Link to="/micro-journaling">What is micro journaling</Link>
        </li>
      </ul>

      <ArticleCareNote />
      <ArticleCta event={`cta_start_free_${situation.slug}`} />
    </ArticleLayout>
  )
}

export function ForSlugPage({ onCookiePreferences }: PageProps) {
  const { slug } = useParams()
  if (!slug) return <Navigate to="/for" replace />
  const situation = situationBySlug(slug)
  if (!situation) return <Navigate to="/for" replace />
  return (
    <SituationPage
      path={situation.path}
      onCookiePreferences={onCookiePreferences}
    />
  )
}

export function ForIndexPage({ onCookiePreferences }: PageProps) {
  usePageMeta({
    title: 'Journaling for hard nights | Journal42',
    description:
      'Guides on journaling for anxiety, stress, breakups, work, and home. Short reads for the hour when the thought is still running.',
    path: '/for',
  })

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

      <main id="top" className="legal-main">
        <div className="legal-atmosphere" aria-hidden="true">
          <div className="hero-orb hero-orb-a" />
          <div className="hero-orb hero-orb-b" />
          <div className="hero-grain" />
        </div>
        <article className="legal-article for-index">
          <p className="section-label">Guides</p>
          <h1 className="legal-title">Find your night.</h1>
          <p className="article-lead">
            Short guides for the hour when the thought is still running. What to
            write, how long to sit with it, when to stop.
          </p>

          {SITUATION_GROUPS.map((group) => (
            <section key={group.id} className="for-group">
              <h2 className="for-group-title">{group.label}</h2>
              <ul className="for-group-list">
                {situationsInGroup(group.id).map((item) => (
                  <li key={item.path}>
                    <Link to={item.path}>{item.indexLabel}</Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <p className="for-index-more">
            Start with{' '}
            <Link to="/micro-journaling">what micro journaling is</Link> if you
            want the practice in plain words.
          </p>
          <ArticleCareNote />
          <ArticleCta event="cta_start_free_for_index" />
        </article>
      </main>

      <SiteFooter onCookiePreferences={onCookiePreferences} />
    </div>
  )
}
