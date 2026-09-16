# Suspenseful

A one-page React infographic, compiled to static HTML, CSS, and JavaScript and deployed to Cloudflare. There is no app server in production: Cloudflare caches the built files at the edge.

JavaScript is the runtime here because React and Vite already produce a static site Cloudflare can cache. A Ruby server would need a always-on process, which is the opposite of a cheap, cacheable one-pager.

## Local setup

This project expects Node 22.12 or newer. An `.nvmrc` pins 24.18.0:

```bash
nvm use
npm install
npm run dev
```

The Vite dev server is the local webserver. It hot-reloads React and SCSS as you edit.

## Project layout

- `src/components` — React pieces of the infographic (`Section`, `Stat`, `Figure`, `Callout`, `Beat`)
- `src/data/content.js` — copy for the sample page
- `src/styles` — SCSS tokens and layout
- `src/assets` — images and diagrams imported by components (hashed in the build, safe to cache forever)
- `public/images` — optional files served as-is at a stable URL (do not use a long immutable cache for these)
- `public/_headers` — security headers plus long cache for `/assets/*`

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Local Vite server |
| `npm run build` | Production build in `dist/` |
| `npm run preview` | Serve the build in the Cloudflare Workers runtime |
| `npm run deploy` | Build and publish to Cloudflare |
| `npm run lint` | Oxlint |

## Deploying to Cloudflare

1. Install the [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/) login once: `npx wrangler login`
2. `npm run deploy`

That publishes a Worker with static assets to a `*.workers.dev` URL. Attach a custom domain later in the Cloudflare dashboard.

You can also connect this repo to Workers Builds in the dashboard. Use `npm run build` as the build command; Wrangler reads the generated config from `dist/`.

## Caching and security

Hashed files under `/assets/` are sent with `Cache-Control: public, max-age=31536000, immutable`. `index.html` keeps Cloudflare’s default revalidate-every-request behavior, so a new deploy updates the page immediately while old hashed files remain harmless.

`public/_headers` also sets a strict Content-Security-Policy, clickjacking protection, and `nosniff`. If you later load scripts, fonts, or images from another origin, that policy has to be widened.
