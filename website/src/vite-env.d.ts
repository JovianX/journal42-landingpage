/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLARITY_PROJECT_ID?: string
  readonly VITE_GTM_ID?: string
  readonly VITE_GA_MEASUREMENT_ID?: string
  readonly VITE_FORMSPREE_ID?: string
  readonly VITE_APP_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
