import { useEffect } from 'react'
import { HOME_TITLE } from './landingCopy'

const SITE_ORIGIN = 'https://journal42.cloud'

type PageMeta = {
  title: string
  description: string
  path: string
}

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.head.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setCanonical(href: string) {
  let el = document.head.querySelector('link[rel="canonical"]')
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'canonical')
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function usePageMeta({ title, description, path }: PageMeta) {
  useEffect(() => {
    const prevTitle = document.title
    const prevDescription =
      document.head
        .querySelector('meta[name="description"]')
        ?.getAttribute('content') ?? ''
    const prevCanonical =
      document.head
        .querySelector('link[rel="canonical"]')
        ?.getAttribute('href') ?? ''
    const prevOgTitle =
      document.head
        .querySelector('meta[property="og:title"]')
        ?.getAttribute('content') ?? ''
    const prevOgDescription =
      document.head
        .querySelector('meta[property="og:description"]')
        ?.getAttribute('content') ?? ''
    const prevOgUrl =
      document.head
        .querySelector('meta[property="og:url"]')
        ?.getAttribute('content') ?? ''

    const url = `${SITE_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`

    document.title = title
    setMeta('description', description)
    setCanonical(url)
    setMeta('og:title', title, 'property')
    setMeta('og:description', description, 'property')
    setMeta('og:url', url, 'property')
    setMeta('twitter:title', title)
    setMeta('twitter:description', description)

    return () => {
      document.title = prevTitle || HOME_TITLE
      setMeta('description', prevDescription)
      if (prevCanonical) setCanonical(prevCanonical)
      if (prevOgTitle) setMeta('og:title', prevOgTitle, 'property')
      if (prevOgDescription) setMeta('og:description', prevOgDescription, 'property')
      if (prevOgUrl) setMeta('og:url', prevOgUrl, 'property')
      setMeta('twitter:title', prevOgTitle || HOME_TITLE)
      setMeta('twitter:description', prevOgDescription || prevDescription)
    }
  }, [title, description, path])
}
