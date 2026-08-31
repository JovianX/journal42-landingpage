import { Link } from 'react-router-dom'
import {
  ArticleCareNote,
  ArticleCta,
  ArticleLayout,
} from './Article'

type JournalLockPageProps = {
  onCookiePreferences?: () => void
}

export function JournalLockPage({ onCookiePreferences }: JournalLockPageProps) {
  return (
    <ArticleLayout
      label="Guide"
      title="Journal lock"
      documentTitle="Journal lock | Journal42"
      description="How Journal42 journal lock works: a passcode on your device, encrypted entries in the cloud, and what happens when you use AI reflection."
      path="/journal-lock"
      lead="Your passcode stays on your device. Your words sync as encrypted text."
      onCookiePreferences={onCookiePreferences}
    >
      <h2>What journal lock does for you</h2>
      <p>
        Journal lock is an optional passcode inside the app. When it is on, your
        saved thoughts and drafts are scrambled before they leave your phone or
        browser. You unlock the journal to read them again.
      </p>
      <p>
        Think of it like a drawer with its own key. The drawer lives in the
        cloud so you can open it on another device. The key stays with you.
      </p>

      <h2>How to turn it on</h2>
      <p>
        Sign in at{' '}
        <a href="https://app.journal42.cloud/settings">app.journal42.cloud</a>.
        Open Settings. Under Journal lock, tap Enable. Choose a passcode of at
        least four characters and confirm it.
      </p>
      <p>
        Your existing entries are encrypted in place. You stay unlocked for that
        session. Use Lock now in Settings, or Lock journal in the account menu,
        when you want the screen back.
      </p>

      <h2>What you see day to day</h2>
      <p>
        You write the same way. Save a thought. Come back tomorrow. When journal
        lock is on and you are signed in, the app asks for your passcode before
        it shows entries.
      </p>
      <p>
        Switch tabs or stay idle for a while, and the journal locks again. That
        is intentional. Shared laptop, phone on the table, quick walk away from
        the desk.
      </p>

      <h2>What happens behind the scenes (plain language)</h2>
      <p>
        When you save a thought, the app turns your words into encrypted text on
        your device. Only scrambled data syncs to your account. The passcode
        never uploads. We do not store it. We cannot email you a reset link for
        it.
      </p>
      <p>
        When you unlock, the app uses your passcode locally to unscramble what
        you wrote. Close the tab or lock the journal, and the unscrambling key
        is cleared from memory.
      </p>
      <p>
        If you forget the passcode, the encrypted entries cannot be recovered.
        Write it somewhere safe, or use a passcode you will remember.
      </p>

      <h2>What Journal42 can still see</h2>
      <p>
        With journal lock on, we see encrypted blobs, not your sentences. We
        still see account email, billing status, when entries were saved, and how
        many you have.
      </p>
      <p>
        When you tap Reflect or reply in a thread, the text you send for that
        feature goes to our AI service so it can answer. Journal lock protects
        stored entries. It does not encrypt that live request. Read{' '}
        <Link to="/ai-journal">AI journal</Link> and{' '}
        <Link to="/privacy">Privacy</Link> for how that processing works.
      </p>
      <p>
        If journal lock is off, entries are stored as plain text in your
        account, the same as most online journals.
      </p>

      <h2>How to check it yourself</h2>
      <p>
        Enable lock, save a test thought, then open your browser developer tools
        on the Network tab. You should see encrypted strings (they start with{' '}
        <code>j42:v1:</code>), not the sentence you typed.
      </p>
      <p>
        For a full walkthrough of keys, algorithms, and Firestore fields, read{' '}
        <Link to="/journal-lock-technical">
          Journal lock: technical overview
        </Link>
        .
      </p>

      <p>
        More on private writing:{' '}
        <Link to="/private-journal">private journal</Link>. More on the short
        form: <Link to="/micro-journaling">what micro journaling is</Link>.
      </p>

      <ArticleCareNote />
      <ArticleCta event="cta_start_free_journal_lock" />
    </ArticleLayout>
  )
}

export function JournalLockTechnicalPage({
  onCookiePreferences,
}: JournalLockPageProps) {
  return (
    <ArticleLayout
      label="Technical"
      title="Journal lock: technical overview"
      documentTitle="Journal lock: technical overview | Journal42"
      description="Client-side encryption for Journal42: PBKDF2, AES-GCM, Firestore fields, AI reflection boundaries, and how to verify ciphertext in the network tab."
      path="/journal-lock-technical"
      lead="Scope, crypto, storage, and what you can verify without trusting our copy."
      onCookiePreferences={onCookiePreferences}
    >
      <h2>Scope and threat model</h2>
      <p>
        Journal lock protects journal content <strong>at rest</strong> in
        Firestore when the user enables it. The passcode-derived key exists only
        in browser memory while the journal is unlocked.
      </p>
      <p>
        It does <strong>not</strong> provide end-to-end encryption for AI
        reflection. A POST to <code>/reflect</code> sends plaintext{' '}
        <code>draft</code>, optional <code>reply</code>, and{' '}
        <code>history</code> to the API, which forwards relevant text to Google
        Gemini. See <Link to="/privacy">Privacy</Link> for provider processing.
      </p>
      <p>
        Operators with Firebase project access can read ciphertext, metadata,
        auth records, and API logs. They cannot derive plaintext from ciphertext
        without the user passcode.
      </p>

      <h2>Algorithms and client code</h2>
      <p>
        Implementation lives in the open{' '}
        <a href="https://github.com/JovianX/journal42-app">journal42-app</a>{' '}
        repository:
      </p>
      <ul>
        <li>
          <code>src/lib/journalCrypto.ts</code>: PBKDF2-SHA256 (100,000
          iterations) to derive an AES-256-GCM key from the passcode and a
          random 16-byte salt; AES-GCM encryption with a 12-byte IV per field.
        </li>
        <li>
          <code>src/lib/journalLock.ts</code>: session key in memory, lock
          metadata sync, unlock and lock lifecycle.
        </li>
        <li>
          <code>src/lib/journalStore.ts</code>: encrypt on write, decrypt on
          read for nugget text, composer draft, and discussion fields.
        </li>
      </ul>
      <p>Ciphertext prefix: <code>j42:v1:</code> followed by base64(IV || ciphertext).</p>

      <h2>Firestore data model</h2>
      <p>Per user document <code>users/{'{uid}'}</code> when lock is enabled:</p>
      <ul>
        <li>
          <code>journalLockSalt</code>: base64-encoded 16-byte PBKDF2 salt
          (public, not secret).
        </li>
        <li>
          <code>journalLockVerifier</code>: AES-GCM ciphertext of the constant
          string <code>journal42-lock-v1</code>, used to check the passcode
          without storing it.
        </li>
        <li>
          <code>draft</code>, <code>discussion</code>: encrypted when lock is
          active.
        </li>
      </ul>
      <p>
        Per nugget <code>users/{'{uid}'}/nuggets/{'{id}'}</code>:{' '}
        <code>text</code> and optional <code>discussion</code> are encrypted.
        <code>createdAt</code> stays plaintext for ordering.
      </p>
      <p>
        The passcode is never written to Firestore, localStorage, or the API.
      </p>

      <h2>Runtime flow</h2>
      <ol>
        <li>
          User enters passcode on unlock screen. Client derives{' '}
          <code>CryptoKey</code> with PBKDF2, decrypts verifier, keeps key in
          memory on success.
        </li>
        <li>
          Firestore snapshot delivers ciphertext. Client decrypts before React
          state updates.
        </li>
        <li>
          On save, client encrypts plaintext fields, then writes to Firestore.
        </li>
        <li>
          On lock, tab hide, or 15-minute idle timeout, session key is cleared.
          UI routes to unlock gate (<code>RequireJournalUnlock</code>).
        </li>
      </ol>

      <h2>Migration and passcode changes</h2>
      <p>
        Enabling lock runs <code>migrateJournalEncryption</code>: read plaintext
        or ciphertext, re-write all nuggets and draft as encrypted blobs.
        Removing lock runs <code>migrateJournalDecryption</code> after passcode
        verification. Changing passcode decrypts with the old key, re-encrypts
        with a new salt and derived key.
      </p>

      <h2>Verification steps</h2>
      <ol>
        <li>
          Enable journal lock in the app. Save an entry with distinctive text.
        </li>
        <li>
          In DevTools → Network, inspect Firestore Write requests. Confirm{' '}
          <code>text</code> and <code>draft</code> values begin with{' '}
          <code>j42:v1:</code>.
        </li>
        <li>
          In Firebase Console → Firestore, open the nugget document. Body should
          remain ciphertext while locked or unlocked on server.
        </li>
        <li>
          Trigger Reflect. Inspect POST <code>/reflect</code> JSON body. Draft and
          history are plaintext by design.
        </li>
      </ol>

      <h2>Security rules</h2>
      <p>
        <code>firestore.rules</code> allow the owner to read and write lock
        metadata fields. Rules do not grant decrypt capability. Admin SDK
        bypasses rules and can read stored ciphertext.
      </p>

      <h2>Known limitations</h2>
      <ul>
        <li>Passcode loss means permanent data loss for locked content.</li>
        <li>
          Users trust the deployed JavaScript bundle. Reproducible builds and
          release tags help auditors match production to source.
        </li>
        <li>
          Metadata (timestamps, entry counts, subscription state) stays visible
          to the operator.
        </li>
        <li>
          Optional lock: users without lock store plaintext in Firestore.
        </li>
      </ul>

      <p>
        User-facing guide: <Link to="/journal-lock">Journal lock</Link>.
        Private writing context:{' '}
        <Link to="/private-journal">private journal</Link>.
      </p>

      <ArticleCareNote />
      <ArticleCta event="cta_start_free_journal_lock_technical" />
    </ArticleLayout>
  )
}
