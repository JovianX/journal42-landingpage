type ClarityFn = ((...args: unknown[]) => void) & {
  q?: unknown[][]
}

type AnalyticsWindow = Window & {
  clarity?: ClarityFn
  dataLayer?: Record<string, unknown>[]
}

const DEFAULT_CLARITY_PROJECT_ID = 'xs7ris3ik0'
const DEFAULT_GTM_ID = 'GTM-54LV3C2T'

function getClarityId() {
  return (
    import.meta.env.VITE_CLARITY_PROJECT_ID?.trim() || DEFAULT_CLARITY_PROJECT_ID
  )
}

function getGtmId() {
  return import.meta.env.VITE_GTM_ID?.trim() || DEFAULT_GTM_ID
}

function loadScript(src: string) {
  if (document.querySelector(`script[src="${src}"]`)) return

  const script = document.createElement('script')
  script.src = src
  script.async = true
  const first = document.getElementsByTagName('script')[0]
  first?.parentNode?.insertBefore(script, first)
}

function initClarity(projectId: string) {
  const win = window as AnalyticsWindow

  if (!win.clarity) {
    const queue: unknown[][] = []
    const clarity: ClarityFn = (...args: unknown[]) => {
      queue.push(args)
    }
    clarity.q = queue
    win.clarity = clarity
  }

  loadScript(`https://www.clarity.ms/tag/${projectId}`)
}

function initGtm(containerId: string) {
  const win = window as AnalyticsWindow
  win.dataLayer = win.dataLayer || []
  win.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js',
  })

  loadScript(`https://www.googletagmanager.com/gtm.js?id=${containerId}`)
}

export function initAnalytics() {
  if (!import.meta.env.PROD) return

  const clarityId = getClarityId()
  const gtmId = getGtmId()

  if (clarityId) initClarity(clarityId)
  if (gtmId) initGtm(gtmId)
}

export function trackPageView(
  path = `${window.location.pathname}${window.location.hash}`,
) {
  if (!import.meta.env.PROD) return

  const win = window as AnalyticsWindow
  if (!getGtmId() || !win.dataLayer) return

  win.dataLayer.push({
    event: 'page_view',
    page_path: path,
  })
}

export function trackEvent(
  name: string,
  params: Record<string, string | number | boolean | undefined> = {},
) {
  if (!import.meta.env.PROD) return

  const win = window as AnalyticsWindow

  if (getClarityId() && typeof win.clarity === 'function') {
    win.clarity('event', name)
  }

  if (getGtmId() && win.dataLayer) {
    win.dataLayer.push({
      event: name,
      ...params,
    })
  }
}
