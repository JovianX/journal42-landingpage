# Journal42

Private journaling for tech workers.

## Structure

Marketing site only. The product UI lives in a sibling repo.

```text
journal42-landingpage/   # this repo → journal42.cloud
journal42-app/           # https://github.com/JovianX/journal42-app → app.journal42.cloud
```

| Package | Purpose | Dev |
| --- | --- | --- |
| [`website/`](website/) | Public landing, features, pricing, waitlist | `cd website && npm run dev` |
| [journal42-app](https://github.com/JovianX/journal42-app) | Authenticated journaling product | see that repo |

## Deploy

- **Marketing:** [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) builds `website/` and deploys to GitHub Pages (`journal42.cloud`).
- **Product:** [JovianX/journal42-app](https://github.com/JovianX/journal42-app) deploys separately to `app.journal42.cloud`.

## Notes

Wire landing CTAs to `https://app.journal42.cloud` once auth is ready for visitors.
