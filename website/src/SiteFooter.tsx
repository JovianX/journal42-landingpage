import { Link } from 'react-router-dom'

type SiteFooterProps = {
  onCookiePreferences?: () => void
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
      <nav className="footer-links" aria-label="Legal">
        <Link to="/privacy">Privacy</Link>
        <Link to="/terms">Terms</Link>
        <Link to="/contact">Contact</Link>
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
