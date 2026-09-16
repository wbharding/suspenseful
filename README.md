# Suspenseful

An interactive version of the "Why Slow the AI Race?" infographic. React compiles to static
HTML, CSS, and JavaScript and deploys to Cloudflare. There is no app server in production:
Cloudflare caches the built files at the edge.

The printed poster has room for one clipped line per claim. This version keeps those lines as
the entry point and puts the sourced detail behind them, so a reader who wants the survey
question, the full quotation, or the year can get it without leaving the page.

## Local setup

This project expects Node 22.12 or newer. An `.nvmrc` pins 24.18.0:

```bash
nvm use
npm install
npm run dev
```

## Project layout

- `src/components` — one component per element of the poster, each with a co-located stylesheet
- `src/data` — all copy, figures and quotations, one module per poster section
- `src/hooks` — `use-disclosure`, `use-selected-item`, `use-active-section`
- `src/styles` — tokens, reset, z-indexes, and the shared detail-reveal surface
- `public/images/placeholders` — draft panels cut from the sketch, swapped per
  `doc/image-substitution-list.md`
- `script/slice-prototype-image.sh` — regenerates those crops from the draft image
- `public/_headers` — security headers plus long cache for `/assets/*`

## Conventions

Borrowed from the sibling `gitclear` project's `doc/best_practices`, with one deliberate change.

**JavaScript and React**

- Files are kebab-case, components are CamelCase: `leader-quote-wall.jsx` exports
  `LeaderQuoteWall`.
- `export default function ComponentName({ ...props })`. Private sub-components live in the
  same file as the component that uses them.
- Props are destructured in the signature with defaults inline. Props are documented with
  JSDoc-style `@param` comments rather than PropTypes, because React 19 no longer validates
  `Component.propTypes` at runtime — assigning them would be dead code.
- Internal handlers are `handleX`; callback props are `onX`.
- `className` strings are built with template literals, no `classnames` dependency.
- Interactive elements carry `type="button"` and `aria-expanded` / `aria-controls` /
  `aria-pressed`.
- Comments say why a thing exists, not what the next line does.

**CSS**

- Class names are `standard-dashed-names` — this is the deliberate change; gitclear uses
  `snake_case`. Everything else from its CSS guide applies: 2–3 word names unique across the
  project, hierarchical naming where children drop the parent's first word, four levels of
  nesting at most, `.is-*` for temporary state, no `!important`, z-indexes collected in
  `src/styles/_z-indexes.scss`.
- Breakpoints are min-width only, via `@include breakpoint(tablet | desktop | wide)`.
- Section colour is passed down as the `--band-ink` and `--band-tint` custom properties set by
  `SectionBand`, so no card stylesheet needs to know which band it landed in.
- Sizes are rem and `clamp()` rather than px, since the same page has to hold together from
  390px to 1440px+.

## Where the content comes from

Every figure and quotation traces to the working data note linked in the page footer. Two
things worth knowing before editing `src/data`:

- The note kept all the CEO quotations in one flat list, which filed several of Amodei's lines
  under Altman's heading. `leader-quote-data.js` follows the poster's attribution and documents
  the split at the top of the file.
- `taskHorizonTrend` separates measured METR points from the poster's fitted 124-day doubling.
  The chart draws the projection dashed. Keep that separation if you extend the series.
- `modelReleaseCadence` is complete for 2024 and 2025 and deliberately sparse for 2026; the
  element renders a visible gap marker rather than inventing releases.

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

That publishes a Worker with static assets to a `*.workers.dev` URL. Attach a custom domain
later in the Cloudflare dashboard.

You can also connect this repo to Workers Builds in the dashboard. Use `npm run build` as the
build command; Wrangler reads the generated config from `dist/`.

## Caching and security

Hashed files under `/assets/` are sent with `Cache-Control: public, max-age=31536000, immutable`.
`index.html` keeps Cloudflare's default revalidate-every-request behavior, so a new deploy
updates the page immediately while old hashed files remain harmless. Files under
`public/images/` keep the default caching, which is what makes swapping a placeholder in place
safe.

`public/_headers` also sets a strict Content-Security-Policy, clickjacking protection, and
`nosniff`. If you later load scripts, fonts, or images from another origin, that policy has to
be widened.
