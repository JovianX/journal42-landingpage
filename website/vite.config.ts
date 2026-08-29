import { copyFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { PRERENDER_ROUTES } from './prerenderMeta.js'
import { readDistIndex, writePrerenderedPages } from './prerenderHtml.js'

function prerenderRoutes(): Plugin {
  return {
    name: 'prerender-routes',
    closeBundle() {
      const dist = resolve(__dirname, 'dist')
      const template = readDistIndex(dist)
      writePrerenderedPages(dist, template, PRERENDER_ROUTES)
      copyFileSync(resolve(dist, 'index.html'), resolve(dist, '404.html'))
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), prerenderRoutes()],
  base: '/',
  server: {
    port: 5173,
    strictPort: true,
  },
})
