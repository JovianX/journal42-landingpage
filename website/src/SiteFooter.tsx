import { Link } from 'react-router-dom'
import type { MouseEvent } from 'react'

type SiteFooterProps = {
  onCookiePreferences?: () => void
}

function onInternalNavClick(event: MouseEvent<HTMLAnchorElement>) {
  const href = event.currentTarget.getAttribute('href')
  if (!href || href.startsWith('http')) return

  const next = new URL(href, window.location.origin)
  if (
    next.pathname === window.location.pathname &&
    next.hash === window.location.hash
  ) {
    window.scrollTo(0, 0)
  }
}

export default function SiteFooter({ onCookiePreferences }: SiteFooterProps) {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <span>
          <strong>Journal42</strong> · private journaling
        </span>
        <span className="footer-copy">
          © {new Date().getFullYear()}
        </span>
      </div>
      <nav className="footer-links" aria-label="Site">
        <Link to="/pricing" onClick={onInternalNavClick}>
          Pricing
        </Link>
        <Link to="/for" onClick={onInternalNavClick}>
          For you
        </Link>
        <Link to="/micro-journaling" onClick={onInternalNavClick}>
          Micro journaling
        </Link>
        <Link to="/private-journal" onClick={onInternalNavClick}>
          Private journal
        </Link>
        <Link to="/ai-journal" onClick={onInternalNavClick}>
          AI journal
        </Link>
        <Link to="/journaling-for-anxiety" onClick={onInternalNavClick}>
          Journaling for anxiety
        </Link>
        <Link to="/chatgpt-as-a-journal" onClick={onInternalNavClick}>
          ChatGPT as a journal
        </Link>
        <Link to="/#faq" onClick={onInternalNavClick}>
          FAQ
        </Link>
        <Link to="/privacy" onClick={onInternalNavClick}>
          Privacy
        </Link>
        <Link to="/terms" onClick={onInternalNavClick}>
          Terms
        </Link>
        <Link to="/contact" onClick={onInternalNavClick}>
          Contact
        </Link>
        <a href="https://status.journal42.cloud/" rel="noreferrer">
          Status
        </a>
        {onCookiePreferences ? (
          <button
            type="button"
            className="footer-cookie-btn"
            onClick={onCookiePreferences}
          >
            Cookies
          </button>
        ) : (
          <Link to="/privacy#cookies">Cookies</Link>
        )}
      </nav>
    </footer>
  )
}
