export type ConsentChoice = 'accepted' | 'declined'

const STORAGE_KEY = 'j42_analytics_consent'

export function getConsent(): ConsentChoice | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    if (value === 'accepted' || value === 'declined') return value
  } catch {
    // Private mode or blocked storage.
  }
  return null
}

export function setConsent(choice: ConsentChoice) {
  try {
    localStorage.setItem(STORAGE_KEY, choice)
  } catch {
    // Ignore write failures; in-memory choice still drives this session.
  }
}

export function hasAnalyticsConsent() {
  return getConsent() === 'accepted'
}
