const DEV_API_BASE = 'http://localhost:8787'
const PROD_API_BASE = 'https://api.journal42.cloud'

export const MIN_DEMO_DRAFT_CHARS = 20

export function getAiApiBase() {
  return (
    import.meta.env.VITE_AI_API_BASE?.trim() ||
    (import.meta.env.DEV ? DEV_API_BASE : PROD_API_BASE)
  )
}

type ReflectDemoResponse = {
  reflection?: { text?: string }
  error?: string
}

export async function requestDemoReflection(
  draft: string,
  signal?: AbortSignal,
): Promise<string | null> {
  try {
    const response = await fetch(`${getAiApiBase()}/reflect-demo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ draft }),
      signal,
    })

    const data = (await response.json().catch(() => ({}))) as ReflectDemoResponse
    const text = data.reflection?.text?.trim()
    if (response.ok && text) return text
    return null
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error
    return null
  }
}
