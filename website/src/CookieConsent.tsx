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
        <div className="cookie-banner-copy">
          <p id="cookie-title" className="cookie-banner-title">
            Cookies and analytics
          </p>
          <p className="cookie-banner-text">
            We use optional analytics to understand how the site is used.
            Essential site function does not need them.{' '}
            <Link to="/privacy#cookies">Privacy details</Link>
          </p>
        </div>
        <div className="cookie-banner-actions">
          <button
            type="button"
            className="cookie-btn cookie-btn-ghost"
            onClick={() => choose('declined')}
          >
            Decline
          </button>
          <button
            type="button"
            className="cookie-btn cookie-btn-primary"
            onClick={() => choose('accepted')}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
