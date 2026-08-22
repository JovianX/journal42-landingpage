import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { initAnalytics, trackPageView } from './analytics'
import {
  getConsent,
  setConsent,
  type ConsentChoice,
} from './consent'

type CookieConsentProps = {
  forceOpen?: boolean
  onClosePreferences?: () => void
}

export default function CookieConsent({
  forceOpen = false,
  onClosePreferences,
}: CookieConsentProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (forceOpen) {
      setVisible(true)
      return
    }
    setVisible(getConsent() === null)
  }, [forceOpen])

  const choose = (choice: ConsentChoice) => {
    setConsent(choice)
    setVisible(false)
    onClosePreferences?.()

    if (choice === 'accepted') {
      initAnalytics()
      trackPageView()
    }
  }

  if (!visible) return null

  return (
    <div className="cookie-banner" role="dialog" aria-labelledby="cookie-title">
      <div className="cookie-banner-inner">
        <p id="cookie-title" className="cookie-banner-text">
          <span className="cookie-banner-kicker">Cookies and analytics.</span>{' '}
          Optional, to understand how the site is used and to measure ads.{' '}
          <Link to="/privacy#cookies">Details</Link>
        </p>
        <div className="cookie-banner-actions">
          <button
            type="button"
            className="cookie-btn"
            onClick={() => choose('declined')}
          >
            Decline
          </button>
          <span className="cookie-btn-sep" aria-hidden="true" />
          <button
            type="button"
            className="cookie-btn"
            onClick={() => choose('accepted')}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
