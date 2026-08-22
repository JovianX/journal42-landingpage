const APP_ORIGIN =
  import.meta.env.VITE_APP_URL?.trim() ||
  (import.meta.env.DEV ? 'http://localhost:5174' : 'https://app.journal42.cloud')

const MAX_DRAFT_CHARS = 1200

const ATTRIBUTION_KEYS = [
  'fbclid',
  'gclid',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
] as const

export function appOrigin() {
  return APP_ORIGIN
}

type AppAuthOptions = {
  plan?: 'pattern' | 'forever'
  draft?: string
}

function copyAttribution(url: URL) {
  if (typeof window === 'undefined') return
  const from = new URLSearchParams(window.location.search)
  for (const key of ATTRIBUTION_KEYS) {
    const value = from.get(key)
    if (value && !url.searchParams.has(key)) {
      url.searchParams.set(key, value)
    }
  }
}

function withAuthParams(url: URL, options?: AppAuthOptions) {
  if (options?.plan) url.searchParams.set('plan', options.plan)
  const draft = options?.draft?.trim()
  if (draft) {
    url.searchParams.set('draft', draft.slice(0, MAX_DRAFT_CHARS))
  }
  copyAttribution(url)
  return url.toString()
}

export function appLoginUrl(plan?: 'pattern' | 'forever') {
  const url = new URL('/login', APP_ORIGIN)
  if (plan) url.searchParams.set('plan', plan)
  copyAttribution(url)
  return url.toString()
}

export function appSignupUrl(options?: AppAuthOptions) {
  return withAuthParams(new URL('/signup', APP_ORIGIN), options)
}
