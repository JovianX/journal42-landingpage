import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import SiteFooter from './SiteFooter'
import { appLoginUrl, appSignupUrl } from './appUrl'
import { trackEvent } from './analytics'
import { usePageMeta } from './usePageMeta'

type ArticleLayoutProps = {
  label: string
  title: string
  documentTitle: string
  description: string
  path: string
  lead?: string
  children: ReactNode
  onCookiePreferences?: () => void
}

export function ArticleLayout({
  label,
  title,
  documentTitle,
  description,
  path,
  lead,
  children,
  onCookiePreferences,
}: ArticleLayoutProps) {
  usePageMeta({ title: documentTitle, description, path })

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
        <article className="legal-article">
          <p className="section-label">{label}</p>
          <h1 className="legal-title">{title}</h1>
          {lead ? <p className="article-lead">{lead}</p> : null}
          <div className="legal-body article-body">{children}</div>
        </article>
      </main>

      <SiteFooter onCookiePreferences={onCookiePreferences} />
    </div>
  )
}

type ArticleCtaProps = {
  event?: string
}

export function ArticleCta({ event = 'cta_start_free_article_end' }: ArticleCtaProps) {
  return (
    <div className="article-cta-end">
      <p className="article-cta-note">
        If you want a private place to keep writing,{' '}
        <a
          href={appSignupUrl()}
          onClick={() => trackEvent(event)}
        >
          Journal42 is free to start
        </a>
        .
      </p>
    </div>
  )
}

export function ArticleCareNote() {
  return (
    <p className="article-care">
      If you need medical or crisis care, use those services. Writing can help
      you carry a hard night. It does not replace care when you need it.
    </p>
  )
}
