import { useMemo, useState, type FormEvent } from 'react'
import { trackEvent } from './analytics'
import {
  buildShareUrl,
  getIncomingRef,
  getUtmSource,
  submitWaitlist,
} from './waitlist'

type AuthProps = {
  onBack: () => void
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

function Auth({ onBack }: AuthProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [error, setError] = useState<string | null>(null)
  const [refCode, setRefCode] = useState('')
  const [copied, setCopied] = useState(false)

  const incomingRef = useMemo(() => getIncomingRef(), [])
  const source = useMemo(() => getUtmSource() || 'direct', [])
  const shareUrl = refCode ? buildShareUrl(refCode) : ''

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'submitting') return

    setStatus('submitting')
    setError(null)
    setCopied(false)

    try {
      const result = await submitWaitlist({
        email,
        source,
        ref: incomingRef,
      })
      setRefCode(result.refCode)
      setStatus('success')
      trackEvent('waitlist_submit', {
        source,
        has_ref: Boolean(incomingRef),
      })
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : 'Could not join the waitlist. Try again in a moment.'
      setError(message)
      setStatus('error')
      trackEvent('waitlist_submit_error')
    }
  }

  const copyShareLink = async () => {
    if (!shareUrl) return
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      trackEvent('waitlist_share_click', { method: 'copy' })
    } catch {
      trackEvent('waitlist_share_click', { method: 'copy_failed' })
    }
  }

  const nativeShare = async () => {
    if (!shareUrl || typeof navigator.share !== 'function') return
    try {
      await navigator.share({
        title: 'Journal42',
        text: 'Private journaling for tech workers. Invite-only beta.',
        url: shareUrl,
      })
      trackEvent('waitlist_share_click', { method: 'native' })
    } catch {
      // User dismissed the share sheet; no error UI needed.
    }
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

          {status === 'success' ? (
            <>
              <h1 className="auth-title">You&apos;re on the list.</h1>
              <p className="auth-lead">
                We&apos;ll email you when a spot opens. Invite-only for now,
                tech workers first.
              </p>

              <div className="waitlist-success" role="status" aria-live="polite">
                <p className="waitlist-success-label">Move up faster</p>
                <p className="waitlist-success-copy">
                  Share with a burned-out teammate. Each signup through your
                  link moves you up.
                </p>
                <code className="waitlist-share-url">{shareUrl}</code>
                <div className="waitlist-share-actions">
                  <button
                    type="button"
                    className="btn-primary auth-submit"
                    onClick={copyShareLink}
                  >
                    {copied ? 'Link copied' : 'Copy invite link'}
                  </button>
                  {typeof navigator !== 'undefined' &&
                  typeof navigator.share === 'function' ? (
                    <button
                      type="button"
                      className="btn-ghost waitlist-share-native"
                      onClick={nativeShare}
                    >
                      Share
                    </button>
                  ) : null}
                </div>
              </div>

              <p className="auth-footnote">
                Private by design. Your thoughts stay yours, always.
              </p>
            </>
          ) : (
            <>
              <h1 className="auth-title">Request an invite</h1>
              <p className="auth-lead">
                Journal42 is in a private closed beta for tech workers. Join
                the waitlist and we&apos;ll email you when a spot opens.
              </p>

              <form className="auth-form" onSubmit={onSubmit}>
                <label className="auth-field">
                  <span className="auth-label">Work email</span>
                  <input
                    className="auth-input"
                    type="email"
                    name="email"
                    autoComplete="email"
                    inputMode="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@company.com"
                    disabled={status === 'submitting'}
                  />
                </label>
                <button
                  type="submit"
                  className="btn-primary auth-submit"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting'
                    ? 'Joining…'
                    : 'Join the waitlist'}
                </button>
              </form>

              {error ? (
                <p className="auth-notice auth-notice-error" role="alert">
                  {error}
                </p>
              ) : null}

              <p className="auth-footnote">
                Private by design. No spam. Just an invite when ready.
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

export default Auth
