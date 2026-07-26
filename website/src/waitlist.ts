const DEFAULT_FORMSPREE_ID = 'mkodpejr'
const SITE_ORIGIN = 'https://journal42.cloud'

export function getFormspreeId() {
  return import.meta.env.VITE_FORMSPREE_ID?.trim() || DEFAULT_FORMSPREE_ID
}

export function getFormspreeEndpoint() {
  return `https://formspree.io/f/${getFormspreeId()}`
}

export function referralCodeFromEmail(email: string) {
  const normalized = email.trim().toLowerCase()
  let hash = 0
  for (let i = 0; i < normalized.length; i += 1) {
    hash = (Math.imul(31, hash) + normalized.charCodeAt(i)) | 0
  }
  return Math.abs(hash).toString(36).padStart(6, '0').slice(0, 8)
}

export function getIncomingRef() {
  if (typeof window === 'undefined') return ''
  return new URLSearchParams(window.location.search).get('ref')?.trim() || ''
}

export function getUtmSource() {
  if (typeof window === 'undefined') return ''
  return (
    new URLSearchParams(window.location.search).get('utm_source')?.trim() || ''
  )
}

export function buildShareUrl(refCode: string) {
  const url = new URL('/invite', SITE_ORIGIN)
  url.searchParams.set('ref', refCode)
  url.searchParams.set('utm_source', 'referral')
  url.searchParams.set('utm_medium', 'share')
  url.searchParams.set('utm_campaign', 'waitlist_sprint')
  return url.toString()
}

export type WaitlistPayload = {
  email: string
  source?: string
  ref?: string
}

export async function submitWaitlist(payload: WaitlistPayload) {
  const email = payload.email.trim().toLowerCase()
  if (!email) {
    throw new Error('Email is required.')
  }

  const response = await fetch(getFormspreeEndpoint(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      email,
      source: payload.source || 'direct',
      ref: payload.ref || '',
      _subject: 'Journal42 waitlist',
    }),
  })

  if (!response.ok) {
    let message = 'Could not join the waitlist. Try again in a moment.'
    try {
      const data = (await response.json()) as { error?: string }
      if (data.error) message = data.error
    } catch {
      // Keep the default message when Formspree returns a non-JSON body.
    }
    throw new Error(message)
  }

  return { email, refCode: referralCodeFromEmail(email) }
}
