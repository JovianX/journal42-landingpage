# Journal42 app

Authenticated journaling product UI. Sibling to the marketing site in `../website`.

## Stack

- React 19 + TypeScript + Vite
- React Router
- Firebase Authentication (Google + email/password)
- Oxlint

## Scripts

```bash
npm install
npm run dev      # http://localhost:5174
npm run build
npm run lint
```

## Firebase auth setup

This repo is linked to Firebase project `journal42-cf467`.

1. Enable **Google** and **Email/Password** under Authentication → Sign-in method (already done for this project).
2. Under Authentication → Settings → Authorized domains, keep `localhost` and add `app.journal42.cloud` when you deploy.
3. Copy `.env.example` to `.env` and fill in the web app config from Project settings → Your apps (or keep the existing filled `.env`):

```bash
cp .env.example .env
```

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_STORAGE_BUCKET=
```

Restart `npm run dev` after changing env vars.

## Scope

This app is separate from the GitHub Pages marketing deploy. Host it on its own target (for example `app.journal42.cloud`) when ready.

Journal routes require sign-in. Nuggets still store locally in the browser for now.
