import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { useAuth } from '../auth/useAuth'

type Nugget = {
  id: string
  text: string
  createdAt: number
}

const STORAGE_KEY = 'journal42.nuggets'

function formatToday() {
  return new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date())
}

function formatTime(timestamp: number) {
  return new Intl.DateTimeFormat(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(timestamp))
}

function loadNuggets(): Nugget[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Nugget[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function autosizeTextarea(el: HTMLTextAreaElement | null) {
  if (!el) return
  el.style.height = 'auto'
  el.style.height = `${el.scrollHeight}px`
}

function readComposerGap(frame: HTMLElement, gapRef: { current: number | null }) {
  if (gapRef.current !== null) return gapRef.current
  const inline = frame.style.marginBottom
  frame.style.marginBottom = ''
  gapRef.current = parseFloat(window.getComputedStyle(frame).marginBottom) || 0
  frame.style.marginBottom = inline
  return gapRef.current
}

function animateComposerFace(
  frame: HTMLElement | null,
  layers: Array<HTMLElement | null>,
  previousHeight: number,
  gapRef: { current: number | null },
) {
  const activeLayers = layers.filter((layer): layer is HTMLElement => layer !== null)
  if (!frame || activeLayers.length === 0) return

  const nextHeight = frame.offsetHeight
  if (Math.abs(nextHeight - previousHeight) < 1) {
    for (const layer of activeLayers) {
      layer.style.height = `${nextHeight}px`
    }
    return
  }

  const margin = readComposerGap(frame, gapRef)
  const delta = nextHeight - previousHeight

  for (const layer of activeLayers) {
    layer.style.transition = 'none'
    layer.style.height = `${previousHeight}px`
  }
  frame.style.transition = 'none'
  frame.style.marginBottom = `${margin - delta}px`
  void activeLayers[0].offsetHeight

  for (const layer of activeLayers) {
    layer.style.transition = ''
    layer.style.height = `${nextHeight}px`
  }
  frame.style.transition = ''
  frame.style.marginBottom = `${margin}px`
}

type NuggetItemProps = {
  nugget: Nugget
  isFresh: boolean
  isEditing: boolean
  onStartEdit: () => void
  onCancelEdit: () => void
  onSaveEdit: (text: string) => void
  onRemove: () => void
}

function NuggetItem({
  nugget,
  isFresh,
  isEditing,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onRemove,
}: NuggetItemProps) {
  const [editText, setEditText] = useState(nugget.text)
  const editRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!isEditing) return
    setEditText(nugget.text)
    const frame = window.requestAnimationFrame(() => {
      const el = editRef.current
      if (!el) return
      autosizeTextarea(el)
      el.focus()
      el.setSelectionRange(el.value.length, el.value.length)
    })
    return () => window.cancelAnimationFrame(frame)
  }, [isEditing, nugget.text])

  useLayoutEffect(() => {
    if (!isEditing) return
    autosizeTextarea(editRef.current)
  }, [editText, isEditing])

  function save() {
    const text = editText.trim()
    if (!text) return
    onSaveEdit(text)
  }

  function onEditKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Escape') {
      event.preventDefault()
      onCancelEdit()
      return
    }
    if (event.key === 'Enter' && event.shiftKey) {
      event.preventDefault()
      save()
    }
  }

  return (
    <li className={`nugget${isFresh ? ' nugget-fresh' : ''}${isEditing ? ' nugget-editing' : ''}`}>
      <div className="nugget-meta">
        <span className="nugget-time">{formatTime(nugget.createdAt)}</span>
      </div>

      {isEditing ? (
        <>
          <textarea
            ref={editRef}
            className="nugget-edit-input"
            value={editText}
            onChange={(event) => setEditText(event.target.value)}
            onKeyDown={onEditKeyDown}
            rows={1}
            aria-label="Edit nugget"
          />
          <div className="nugget-edit-actions">
            <span className="nugget-shortcut">Shift+Enter to save · Esc to cancel</span>
            <div className="nugget-edit-buttons">
              <button type="button" className="btn-ghost btn-compact" onClick={onCancelEdit}>
                Cancel
              </button>
              <button
                type="button"
                className="btn-primary btn-compact"
                onClick={save}
                disabled={!editText.trim()}
              >
                Save
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <p className="nugget-text">{nugget.text}</p>
          <div className="nugget-actions">
            <button type="button" className="nugget-action" onClick={onStartEdit}>
              Edit
            </button>
            <button
              type="button"
              className="nugget-action"
              onClick={onRemove}
              aria-label="Remove nugget"
            >
              Remove
            </button>
          </div>
        </>
      )}
    </li>
  )
}

function userLabel(displayName: string | null, email: string | null) {
  if (displayName?.trim()) return displayName.trim()
  if (email) return email
  return 'Signed in'
}

export default function JournalHome() {
  const { user, signOut } = useAuth()
  const [draft, setDraft] = useState('')
  const [nuggets, setNuggets] = useState<Nugget[]>(() => loadNuggets())
  const [justDroppedId, setJustDroppedId] = useState<string | null>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [signingOut, setSigningOut] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const composerFrameRef = useRef<HTMLFormElement>(null)
  const composerFaceRef = useRef<HTMLDivElement>(null)
  const composerBarDockRef = useRef<HTMLDivElement>(null)
  const composerGapRef = useRef<number | null>(null)
  const listLabelId = useId()
  const today = useMemo(() => formatToday(), [])
  const accountLabel = userLabel(user?.displayName ?? null, user?.email ?? null)

  async function onSignOut() {
    if (signingOut) return
    setSigningOut(true)
    try {
      await signOut()
    } catch {
      setSigningOut(false)
    }
  }

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nuggets))
  }, [nuggets])

  useEffect(() => {
    if (!justDroppedId) return
    const timer = window.setTimeout(() => setJustDroppedId(null), 650)
    return () => window.clearTimeout(timer)
  }, [justDroppedId])

  useLayoutEffect(() => {
    const frame = composerFrameRef.current
    const previousHeight = frame?.offsetHeight ?? 0
    autosizeTextarea(inputRef.current)
    animateComposerFace(
      frame,
      [composerFaceRef.current, composerBarDockRef.current],
      previousHeight,
      composerGapRef,
    )
  }, [draft])

  function dropNugget() {
    const text = draft.trim()
    if (!text) return

    const nugget: Nugget = {
      id: createId(),
      text,
      createdAt: Date.now(),
    }

    setNuggets((current) => [nugget, ...current])
    setJustDroppedId(nugget.id)
    setEditingId(null)
    setDraft('')
    inputRef.current?.focus()
  }

  function removeNugget(id: string) {
    setNuggets((current) => current.filter((nugget) => nugget.id !== id))
    if (editingId === id) setEditingId(null)
    inputRef.current?.focus()
  }

  function saveNugget(id: string, text: string) {
    setNuggets((current) =>
      current.map((nugget) => (nugget.id === id ? { ...nugget, text } : nugget)),
    )
    setEditingId(null)
    inputRef.current?.focus()
  }

  function onComposerKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && event.shiftKey) {
      event.preventDefault()
      dropNugget()
    }
  }

  const canDrop = draft.trim().length > 0

  return (
    <div className="app-shell">
      <div className="app-atmosphere" aria-hidden="true">
        <div className="app-orb app-orb-a" />
        <div className="app-orb app-orb-b" />
        <div className="app-grain" />
      </div>

      <header className="app-header">
        <div className="app-logo">
          Journal<span>42</span>
        </div>
        <div className="app-header-actions">
          <div className="app-header-account" title={accountLabel}>
            {accountLabel}
          </div>
          <button
            type="button"
            className="app-header-link"
            onClick={onSignOut}
            disabled={signingOut}
          >
            {signingOut ? 'Signing out…' : 'Sign out'}
          </button>
        </div>
      </header>

      <main className="app-main">
        <p className="journal-kicker">{today}</p>
        <h1 className="journal-prompt">Dump it.</h1>
        <p className="journal-hint">
          One thought per nugget. Get it out of your head, then the next one.
        </p>

        <form
          ref={composerFrameRef}
          className="nugget-composer-frame"
          onSubmit={(event) => {
            event.preventDefault()
            dropNugget()
          }}
        >
          <div ref={composerFaceRef} className="nugget-composer-face" aria-hidden="true" />
          <div className="nugget-composer">
            <label className="sr-only" htmlFor="nugget-input">
              Brain dump nugget
            </label>
            <textarea
              id="nugget-input"
              ref={inputRef}
              className="nugget-input"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={onComposerKeyDown}
              placeholder="What's rattling around up there?"
              rows={1}
              autoFocus
            />
            <div className="nugget-composer-bar nugget-composer-bar-sizer" aria-hidden="true">
              <span className="nugget-shortcut">Shift+Enter</span>
              <button type="button" className="btn-primary btn-icon-only" tabIndex={-1} disabled>
                <svg className="btn-icon" viewBox="0 0 16 16" aria-hidden="true">
                  <path
                    d="M3 8h9.2m0 0L8.5 4.3M12.2 8 8.5 11.7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div ref={composerBarDockRef} className="nugget-composer-bar-dock">
            <div className="nugget-composer-bar">
              <span className="nugget-shortcut">Shift+Enter</span>
              <button
                type="submit"
                className="btn-primary btn-icon-only"
                disabled={!canDrop}
                aria-label="Add nugget"
              >
                <svg className="btn-icon" viewBox="0 0 16 16" aria-hidden="true">
                  <path
                    d="M3 8h9.2m0 0L8.5 4.3M12.2 8 8.5 11.7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </form>

        <section className="nugget-stream" aria-labelledby={listLabelId}>
          <div className="nugget-stream-head">
            <h2 id={listLabelId}>Today&apos;s dump</h2>
            {nuggets.length > 0 ? (
              <button
                type="button"
                className="nugget-clear"
                onClick={() => {
                  setNuggets([])
                  setEditingId(null)
                  inputRef.current?.focus()
                }}
              >
                Clear all
              </button>
            ) : null}
          </div>

          {nuggets.length === 0 ? (
            <p className="nugget-empty">
              Nothing dumped yet. Drop the first nugget and feel the space open up.
            </p>
          ) : (
            <ul className="nugget-list">
              {nuggets.map((nugget) => (
                <NuggetItem
                  key={nugget.id}
                  nugget={nugget}
                  isFresh={justDroppedId === nugget.id}
                  isEditing={editingId === nugget.id}
                  onStartEdit={() => setEditingId(nugget.id)}
                  onCancelEdit={() => {
                    setEditingId(null)
                    inputRef.current?.focus()
                  }}
                  onSaveEdit={(text) => saveNugget(nugget.id, text)}
                  onRemove={() => removeNugget(nugget.id)}
                />
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  )
}
