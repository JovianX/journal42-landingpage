import { useState } from 'react'

type AuthProps = {
  onBack: () => void
}

const BETA_MESSAGE =
  'Journal42 is in a private closed beta. Access is invite only for now.'

function GoogleIcon() {
  return (
    <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M16.7 12.6c0-2.1 1.7-3.1 1.8-3.2-1-1.4-2.5-1.6-3-1.6-1.3-.1-2.5.8-3.1.8s-1.6-.7-2.7-.7c-1.4 0-2.7.8-3.4 2.1-1.5 2.5-.4 6.3 1 8.4.7 1 1.5 2.2 2.6 2.1 1 0 1.4-.7 2.7-.7s1.6.7 2.7.7c1.1 0 1.8-1.1 2.5-2.1.8-1.1 1.1-2.2 1.1-2.3 0 0-2.1-.8-2.2-3.5zM14.7 5.9c.6-.7 1-1.7.9-2.7-.9.1-1.9.6-2.5 1.3-.6.6-1.1 1.6-1 2.6 1 .1 1.9-.5 2.6-1.2z"
      />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.7.5.1.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05a9.28 9.28 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.8-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .26.18.58.69.48A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2z"
      />
    </svg>
  )
}

function Auth({ onBack }: AuthProps) {
  const [notice, setNotice] = useState<string | null>(null)

  const showClosedBeta = () => {
    setNotice(BETA_MESSAGE)
  }

  return (
    <div className="auth-page">
      <div className="auth-atmosphere" aria-hidden="true">
        <div className="hero-orb hero-orb-a" />
        <div className="hero-orb hero-orb-b" />
        <div className="hero-grain" />
      </div>

      <header className="auth-nav">
        <a
          className="nav-brand"
          href="#top"
          onClick={(event) => {
            event.preventDefault()
            onBack()
          }}
          aria-label="Journal42 home"
        >
          Journal<span>42</span>
        </a>
        <button type="button" className="auth-back" onClick={onBack}>
          Back
        </button>
      </header>

      <main className="auth-main">
        <div className="auth-panel">
          <p className="auth-brand">
            Journal<span>42</span>
          </p>
          <h1 className="auth-title">Start journaling</h1>
          <p className="auth-lead">
            Create an account or log in. Your thoughts stay private.
          </p>

          <div className="social-stack" role="group" aria-label="Social login">
            <button
              type="button"
              className="social-btn social-btn-google"
              onClick={showClosedBeta}
            >
              <GoogleIcon />
              Continue with Google
            </button>
            <button
              type="button"
              className="social-btn social-btn-apple"
              onClick={showClosedBeta}
            >
              <AppleIcon />
              Continue with Apple
            </button>
            <button
              type="button"
              className="social-btn social-btn-github"
              onClick={showClosedBeta}
            >
              <GitHubIcon />
              Continue with GitHub
            </button>
          </div>

          <div className="auth-divider" role="separator">
            <span>or</span>
          </div>

          <form
            className="auth-form"
            onSubmit={(event) => {
              event.preventDefault()
              showClosedBeta()
            }}
          >
            <label className="auth-field">
              <span className="auth-label">Email</span>
              <input
                className="auth-input"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@company.com"
              />
            </label>
            <button type="submit" className="btn-primary auth-submit">
              Continue with email
            </button>
          </form>

          {notice ? (
            <p className="auth-notice" role="status" aria-live="polite">
              {notice}
            </p>
          ) : null}

          <p className="auth-footnote">
            Private by design. Your entries stay yours, always.
          </p>
        </div>
      </main>
    </div>
  )
}

export default Auth
