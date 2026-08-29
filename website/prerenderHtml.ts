import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { type PrerenderRoute, SITE_ORIGIN } from './prerenderMeta.js'

function escapeAttr(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
}

function pageUrl(path: string): string {
  return path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`
}

export function injectPageMeta(html: string, route: PrerenderRoute): string {
  const url = pageUrl(route.path)
  const title = escapeAttr(route.title)
  const description = escapeAttr(route.description)

  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]*(")/,
      `$1${description}$2`,
    )
    .replace(
      /(<link\s+rel="canonical"\s+href=")[^"]*(")/,
      `$1${url}$2`,
    )
    .replace(
      /(<meta\s+property="og:url"\s+content=")[^"]*(")/,
      `$1${url}$2`,
    )
    .replace(
      /(<meta\s+property="og:title"\s+content=")[^"]*(")/,
      `$1${title}$2`,
    )
    .replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*(")/,
      `$1${description}$2`,
    )
    .replace(
      /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/,
      `$1${title}$2`,
    )
    .replace(
      /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/,
      `$1${description}$2`,
    )
}

export function writePrerenderedPages(
  distDir: string,
  templateHtml: string,
  routes: PrerenderRoute[],
): void {
  for (const route of routes) {
    if (route.path === '/') continue

    const html = injectPageMeta(templateHtml, route)
    const outFile = resolve(distDir, route.path.slice(1), 'index.html')
    mkdirSync(dirname(outFile), { recursive: true })
    writeFileSync(outFile, html)
  }
}

export function readDistIndex(distDir: string): string {
  return readFileSync(resolve(distDir, 'index.html'), 'utf8')
}
