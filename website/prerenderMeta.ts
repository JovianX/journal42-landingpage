import { SITUATIONS, type Situation } from './src/situationContent.ts'

export type PrerenderRoute = {
  path: string
  title: string
  description: string
}

const EXPLAINER_ROUTES: PrerenderRoute[] = [
  {
    path: '/micro-journaling',
    title: 'What is micro journaling | Journal42',
    description:
      'Micro journaling is writing a short fragment when your head is loud. Learn how two minutes of writing can help you put a thought down and walk away.',
  },
  {
    path: '/private-journal',
    title: 'Private journal | Journal42',
    description:
      'Why a private journal helps when the thought is still running. How to keep writing that stays yours, and what to put on the page.',
  },
  {
    path: '/ai-journal',
    title: 'AI journal | Journal42',
    description:
      'How an AI journal can help after you write: a short reflection on your own words, then space to answer or walk away.',
  },
  {
    path: '/chatgpt-as-a-journal',
    title: 'Using ChatGPT as a Journal | Journal42',
    description:
      'Using ChatGPT for journaling? Chat threads are a bad fit. Here is why, and how a private AI journal saves dated entries with a short reflection.',
  },
  {
    path: '/journal-lock',
    title: 'Journal lock | Journal42',
    description:
      'How Journal42 journal lock works: a passcode on your device, encrypted entries in the cloud, and what happens when you use AI reflection.',
  },
  {
    path: '/journal-lock-technical',
    title: 'Journal lock: technical overview | Journal42',
    description:
      'Client-side encryption for Journal42: PBKDF2, AES-GCM, Firestore fields, AI reflection boundaries, and how to verify ciphertext in the network tab.',
  },
]

const STATIC_ROUTES: PrerenderRoute[] = [
  {
    path: '/pricing',
    title: 'Journal42: Pricing',
    description:
      'Journal42 pricing. Write and save for free. Upgrade for more reflections and replies when a few a day is not enough.',
  },
  {
    path: '/for',
    title: 'Journaling guides | Journal42',
    description:
      'Guides on journaling for anxiety, stress, breakups, work, and home. Short reads for when the thought is still running.',
  },
  {
    path: '/privacy',
    title: 'Journal42: Privacy Policy',
    description:
      'How Journal42 handles your journal, AI reflections, cookies, and account data.',
  },
  {
    path: '/terms',
    title: 'Journal42: Terms of Service',
    description: 'Terms for using Journal42, the private journaling app.',
  },
  {
    path: '/contact',
    title: 'Journal42: Contact',
    description: 'Contact Journal42. Questions about your account, privacy, or the app.',
  },
]

/** Routes that get their own HTML file at build time (GitHub Pages serves `/path` from `{path}.html`). */
export const PRERENDER_ROUTES: PrerenderRoute[] = [
  ...EXPLAINER_ROUTES,
  ...STATIC_ROUTES,
  ...SITUATIONS.map((s: Situation) => ({
    path: s.path,
    title: s.documentTitle,
    description: s.description,
  })),
]

export const SITE_ORIGIN = 'https://journal42.cloud'
