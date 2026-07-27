# Journal42

Private journaling for tech workers.

## Structure

Light monorepo. No Turborepo or Nx yet.

```text
journal42/
  website/   # Marketing + waitlist (GitHub Pages → journal42.cloud)
  app/       # Product UI (host separately, e.g. app.journal42.cloud)
```

| Package | Purpose | Dev |
| --- | --- | --- |
| [`website/`](website/) | Public landing, features, pricing, waitlist | `cd website && npm run dev` |
| [`app/`](app/) | Authenticated journaling product | `cd app && npm run dev` |

## Deploy

- **Marketing:** [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) builds `website/` and deploys to GitHub Pages.
- **Product:** Deploy `app/` separately when auth and hosting are ready. Do not fold it into the Pages workflow.

## Notes

Keep marketing and product as sibling apps. Share brand tokens by copying or extracting a package later if duplication hurts. Wire landing CTAs to the real app URL once auth exists.
