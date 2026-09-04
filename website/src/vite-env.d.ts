/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLARITY_PROJECT_ID?: string
  readonly VITE_GTM_ID?: string
  readonly VITE_GA_MEASUREMENT_ID?: string
  readonly VITE_META_PIXEL_ID?: string
  readonly VITE_APP_URL?: string
  readonly VITE_AI_API_BASE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
