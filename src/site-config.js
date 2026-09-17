// Per-domain branding. The same build is served from both zones; the Worker picks
// the entry matching the request's hostname and rewrites the document head, and the
// masthead/footer wordmark reads the same entry in the browser. One file, so the
// document title and the visible brand can never drift apart.
export const SITES = {
  "suspenseful.ai": {
    title: "Why slow the AI race? — A smarter pace",
    description:
      "An interactive field guide to the case for pacing frontier AI. Explore evidence, competing incentives, policy options and practical actions.",
    // `lead` keeps its trailing space where the wordmark is two words; `accent` is the
    // bold half. Together they read as the domain name.
    brand: { lead: "suspense", accent: "ful.", name: "Suspenseful" },
  },
  "betterlater.ai": {
    title: "Better Later — The case for pacing frontier AI",
    description:
      "An interactive field guide to the case for pacing frontier AI. Explore evidence, competing incentives, policy options and practical actions.",
    brand: { lead: "better ", accent: "later.", name: "Better Later" },
  },
};

export const DEFAULT_HOST = "suspenseful.ai";

// www.betterlater.ai and betterlater.ai share branding, so the prefix is stripped
// before lookup. Unknown hosts (workers.dev, localhost) fall back to the default.
export function siteForHostname(hostname) {
  const host = String(hostname || "")
    .toLowerCase()
    .replace(/:\d+$/, "")
    .replace(/^www\./, "");
  return SITES[host] ?? SITES[DEFAULT_HOST];
}
