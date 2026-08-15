const APP_ORIGIN =
  import.meta.env.VITE_APP_URL?.trim() ||
  (import.meta.env.DEV ? 'http://localhost:5174' : 'https://app.journal42.cloud')

const MAX_DRAFT_CHARS = 1200

export function appOrigin() {
  return APP_ORIGIN
}

type AppAuthOptions = {
  plan?: 'pattern' | 'forever'
  draft?: string
}

function withAuthParams(url: URL, options?: AppAuthOptions) {
  if (options?.plan) url.searchParams.set('plan', options.plan)
  const draft = options?.draft?.trim()
  if (draft) {
    url.searchParams.set('draft', draft.slice(0, MAX_DRAFT_CHARS))
  }
  return url.toString()
}

export function appLoginUrl(plan?: 'pattern' | 'forever') {
  const url = new URL('/login', APP_ORIGIN)
  if (plan) url.searchParams.set('plan', plan)
  return url.toString()
}

export function appSignupUrl(options?: AppAuthOptions) {
  return withAuthParams(new URL('/signup', APP_ORIGIN), options)
}
