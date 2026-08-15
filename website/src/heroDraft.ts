const HERO_DRAFT_KEY = 'j42_hero_draft'

export function saveHeroDraft(text: string) {
  const cleaned = text.trim()
  if (!cleaned) return
  try {
    sessionStorage.setItem(
      HERO_DRAFT_KEY,
      JSON.stringify({ text: cleaned, savedAt: Date.now() }),
    )
  } catch {
    // Private mode / quota: ignore.
  }
}

export function readHeroDraft(): string | null {
  try {
    const raw = sessionStorage.getItem(HERO_DRAFT_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as { text?: unknown }
    return typeof parsed.text === 'string' && parsed.text.trim()
      ? parsed.text.trim()
      : null
  } catch {
    return null
  }
}

export function clearHeroDraft() {
  try {
    sessionStorage.removeItem(HERO_DRAFT_KEY)
  } catch {
    // ignore
  }
}
