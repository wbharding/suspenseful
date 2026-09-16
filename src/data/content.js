export const content = {
  kicker: 'One-page infographic',
  issue: 'No. 01',
  title: 'Suspenseful',
  lede: 'A cached, one-page site for a React infographic: images, markup, JavaScript, and SCSS, built as static files and served from Cloudflare’s edge.',
  sections: {
    build: {
      kicker: '01 — Form',
      title: 'What this page is made of',
      body: 'Replace these blocks with your story. Each piece is a React component styled in SCSS, so the layout can grow without turning into one giant file.',
    },
    arc: {
      kicker: '02 — Shape',
      title: 'Hold the line, then break it',
      body: 'Infographics work like plots: a clear setup, a climb, and a turn the eye can follow. Drop your own diagram in src/assets to replace this one.',
    },
    beats: {
      kicker: '03 — Sequence',
      title: 'A page that still reads on a phone',
      body: 'Sections stack, type scales, and hashed assets cache hard at the edge. HTML stays revalidated so a new deploy shows up immediately.',
    },
  },
  stats: [
    { value: '1', label: 'HTML document. Everything else is a hashed asset.' },
    { value: 'Edge', label: 'Cloudflare serves the built files from the nearest cache.' },
    { value: 'SCSS', label: 'Tokens and layout live in src/styles, not inline.' },
  ],
  callout:
    'Put finished artwork in src/assets so Vite fingerprints the filename. That is what makes long-lived caching safe.',
  beats: [
    {
      title: 'Write the page in React',
      copy: 'Compose sections from the components in src/components. Keep copy in src/data/content.js when you can.',
    },
    {
      title: 'Style with SCSS',
      copy: 'Shared color, type, and spacing live in src/styles/_tokens.scss. The poster layout is in infographic.scss.',
    },
    {
      title: 'Ship the static build',
      copy: 'npm run build writes hashed files. npm run deploy publishes them to Cloudflare Workers static assets.',
    },
  ],
}
