// Element 1C. Flagship and point LLM releases from seven labs, compiled in
// https://public.amplenote.com/z28idzmc2wTjLNsucS6tBZPB
//
// Same-day named variants are separate blocks so each pop and hover maps to one model.
// Month-only catalog rows use the 15th for playback order and set datePrecision: "month".
// This is not an industry census. Release frequency is not a capability measure.

function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

// @param {string} date
// @param {string} name
// @param {string} provider
// @param {object} [extra]
function entry(date, name, provider, extra = {}) {
  const { id, ...rest } = extra;
  return {
    source: "release-dates",
    date,
    name,
    provider,
    ...rest,
    id: id || slugify(`${date}-${provider}-${name}`),
  };
}

export const modelReleases = [
  entry("2024-02-08", "Gemini 1.0", "Google"),
  entry("2024-02-15", "Gemini 1.5 Pro", "Google", { note: "Preview; first 1M-token context window" }),
  entry("2024-03-04", "Claude 3 Opus", "Anthropic"),
  entry("2024-03-04", "Claude 3 Sonnet", "Anthropic"),
  entry("2024-03-13", "Claude 3 Haiku", "Anthropic"),
  entry("2024-03-15", "Grok-1", "xAI", { datePrecision: "month", note: "Open-sourced weights; catalog lists March 2024 without a day" }),
  entry("2024-04-09", "GPT-4 Turbo", "OpenAI"),
  entry("2024-04-18", "Llama 3", "Meta"),
  entry("2024-05-06", "DeepSeek-V2", "DeepSeek"),
  entry("2024-05-13", "GPT-4o", "OpenAI"),
  entry("2024-05-23", "Gemini 1.5 Flash", "Google"),
  entry("2024-05-23", "Gemini 1.5 Pro", "Google", { note: "GA", id: "2024-05-23-google-gemini-1-5-pro-ga" }),
  entry("2024-06-05", "GLM-4", "Z.ai"),
  entry("2024-06-20", "Claude 3.5 Sonnet", "Anthropic"),
  entry("2024-07-23", "Llama 3.1", "Meta"),
  entry("2024-08-13", "Grok-2", "xAI"),
  entry("2024-08-13", "Grok-2 mini", "xAI"),
  entry("2024-09-05", "DeepSeek-V2.5", "DeepSeek"),
  entry("2024-09-12", "o1-preview", "OpenAI"),
  entry("2024-09-15", "Llama 3.2", "Meta", { datePrecision: "month", note: "Multimodal Llama; catalog lists September 2024 without a day" }),
  entry("2024-10-22", "Claude 3.5 Sonnet", "Anthropic", { note: "Updated v2; computer-use public beta", id: "2024-10-22-anthropic-claude-3-5-sonnet-v2" }),
  entry("2024-10-22", "Claude 3.5 Haiku", "Anthropic", { note: "Announced; GA followed in November 2024" }),
  entry("2024-11-20", "DeepSeek-R1-Lite-Preview", "DeepSeek"),
  entry("2024-12-05", "o1", "OpenAI"),
  entry("2024-12-06", "Llama 3.3", "Meta"),
  entry("2024-12-11", "Gemini 2.0 Flash", "Google", { note: "Experimental" }),
  entry("2024-12-20", "o3-preview", "OpenAI"),
  entry("2024-12-26", "DeepSeek-V3", "DeepSeek"),

  entry("2025-01-20", "DeepSeek-R1", "DeepSeek"),
  entry("2025-01-31", "o3-mini", "OpenAI"),
  entry("2025-02-05", "Gemini 2.0 Flash", "Google", { note: "GA", id: "2025-02-05-google-gemini-2-0-flash-ga" }),
  entry("2025-02-05", "Gemini 2.0 Flash-Lite", "Google"),
  entry("2025-02-05", "Gemini 2.0 Pro", "Google", { note: "Experimental" }),
  entry("2025-02-18", "Grok 3", "xAI"),
  entry("2025-02-24", "Claude 3.7 Sonnet", "Anthropic"),
  entry("2025-02-27", "GPT-4.5", "OpenAI"),
  entry("2025-03-24", "DeepSeek-V3-0324", "DeepSeek"),
  entry("2025-03-25", "Gemini 2.5 Pro", "Google", { note: "Experimental" }),
  entry("2025-04-05", "Llama 4 Scout", "Meta"),
  entry("2025-04-05", "Llama 4 Maverick", "Meta"),
  entry("2025-04-14", "GPT-4.1", "OpenAI"),
  entry("2025-04-14", "GPT-4.1 mini", "OpenAI"),
  entry("2025-04-14", "GPT-4.1 nano", "OpenAI"),
  entry("2025-04-16", "o3", "OpenAI"),
  entry("2025-04-16", "o4-mini", "OpenAI"),
  entry("2025-04-17", "Gemini 2.5 Flash", "Google"),
  entry("2025-05-22", "Claude Opus 4", "Anthropic"),
  entry("2025-05-22", "Claude Sonnet 4", "Anthropic"),
  entry("2025-05-28", "DeepSeek-R1-0528", "DeepSeek"),
  entry("2025-06-10", "o3-pro", "OpenAI"),
  entry("2025-06-17", "Gemini 2.5 Pro", "Google", { note: "GA", id: "2025-06-17-google-gemini-2-5-pro-ga" }),
  entry("2025-06-17", "Gemini 2.5 Flash", "Google", { note: "GA", id: "2025-06-17-google-gemini-2-5-flash-ga" }),
  entry("2025-07-09", "Grok 4", "xAI"),
  entry("2025-07-09", "Grok 4 Heavy", "xAI"),
  entry("2025-07-22", "Gemini 2.5 Flash-Lite", "Google"),
  entry("2025-07-28", "GLM-4.5", "Z.ai"),
  entry("2025-07-28", "GLM-4.5-Air", "Z.ai"),
  entry("2025-08-05", "gpt-oss-120b", "OpenAI"),
  entry("2025-08-05", "gpt-oss-20b", "OpenAI"),
  entry("2025-08-05", "Claude Opus 4.1", "Anthropic"),
  entry("2025-08-07", "GPT-5", "OpenAI"),
  entry("2025-08-21", "DeepSeek-V3.1", "DeepSeek"),
  entry("2025-09-15", "Grok 4 Fast", "xAI", { datePrecision: "month", note: "Catalog lists September 2025 without a day" }),
  entry("2025-09-22", "DeepSeek-V3.1-Terminus", "DeepSeek"),
  entry("2025-09-29", "Claude Sonnet 4.5", "Anthropic"),
  entry("2025-09-29", "DeepSeek-V3.2-Exp", "DeepSeek"),
  entry("2025-09-30", "GLM-4.6", "Z.ai"),
  entry("2025-10-15", "Claude Haiku 4.5", "Anthropic"),
  entry("2025-11-12", "GPT-5.1", "OpenAI"),
  entry("2025-11-17", "Grok 4.1", "xAI"),
  entry("2025-11-18", "Gemini 3 Pro", "Google"),
  entry("2025-11-24", "Claude Opus 4.5", "Anthropic"),
  entry("2025-12-01", "DeepSeek-V3.2", "DeepSeek"),
  entry("2025-12-01", "DeepSeek-V3.2-Speciale", "DeepSeek"),
  entry("2025-12-11", "GPT-5.2", "OpenAI"),
  entry("2025-12-17", "Gemini 3 Flash", "Google"),
  entry("2025-12-22", "GLM-4.7", "Z.ai"),

  entry("2026-02-05", "Claude Opus 4.6", "Anthropic"),
  entry("2026-02-05", "GPT-5.3-Codex", "OpenAI"),
  entry("2026-02-11", "GLM-5", "Z.ai", { provisional: true }),
  entry("2026-02-17", "Claude Sonnet 4.6", "Anthropic", { source: "launch-0" }),
  entry("2026-02-19", "Gemini 3.1 Pro", "Google", { source: "launch-1" }),
  entry("2026-03-05", "GPT-5.4", "OpenAI", { source: "launch-3" }),
  entry("2026-03-17", "GPT-5.4 mini", "OpenAI", { source: "launch-4" }),
  entry("2026-03-17", "GPT-5.4 nano", "OpenAI", { source: "launch-5" }),
  entry("2026-04-08", "GLM-5.1", "Z.ai", { provisional: true }),
  entry("2026-04-15", "Grok 4.3", "xAI", { datePrecision: "month", note: "Catalog lists April 2026 without a day" }),
  entry("2026-04-16", "Claude Opus 4.7", "Anthropic", { source: "launch-6" }),
  entry("2026-04-23", "GPT-5.5", "OpenAI", { source: "launch-7" }),
  entry("2026-04-24", "DeepSeek-V4-Pro", "DeepSeek"),
  entry("2026-04-24", "DeepSeek-V4-Flash", "DeepSeek"),
  entry("2026-05-19", "Gemini 3.5 Flash", "Google"),
  entry("2026-05-28", "Claude Opus 4.8", "Anthropic", { source: "launch-8" }),
  entry("2026-06-09", "Claude Fable 5", "Anthropic", { provisional: true }),
  entry("2026-06-09", "Claude Mythos 5", "Anthropic", { provisional: true, note: "Preview of the above-Opus tier" }),
  entry("2026-06-13", "GLM-5.2", "Z.ai", { provisional: true }),
  entry("2026-06-30", "Claude Sonnet 5", "Anthropic", { source: "launch-9" }),
  entry("2026-07-08", "Grok 4.5", "xAI"),
  entry("2026-07-09", "GPT-5.6", "OpenAI", { provisional: true }),
  entry("2026-07-09", "Gemini 3.6 Flash", "Google"),
  entry("2026-07-09", "Gemini 3.5 Flash-Lite", "Google"),
  entry("2026-07-24", "Claude Opus 5", "Anthropic", { source: "launch-10" }),
  entry("2026-07-31", "DeepSeek-V4-Flash-0731", "DeepSeek"),
  entry("2026-08-12", "Grok 4.6", "xAI"),
  entry("2026-08-13", "Gemini 3.7 Flash", "Google"),
  entry("2026-08-13", "DeepSeek-V4-Pro-0813", "DeepSeek"),
  entry("2026-08-14", "GLM-5.3", "Z.ai", { provisional: true }),
  entry("2026-09-01", "Claude Fable 5.1", "Anthropic", { provisional: true }),
  entry("2026-09-01", "Claude Mythos 5.1", "Anthropic", { provisional: true }),
  entry("2026-09-02", "Gemini 3.8 Flash", "Google"),
  entry("2026-09-10", "DeepSeek-V4.1-Flash", "DeepSeek"),
  entry("2026-09-12", "Grok 4.7", "xAI", {
    provisional: true,
    status: "announced",
    note: "Announced for 12 Sep 2026; the catalog marks shipment as uncertain",
  }),
];

// Provider colours for the timeline blocks and filter chips. These resolve through the theme's
// provider tokens rather than naming a hex, so each lab keeps a distinct identity in both themes.
export const providerColors = {
  Anthropic: "var(--provider-anthropic)",
  OpenAI: "var(--provider-openai)",
  Google: "var(--provider-google)",
  xAI: "var(--provider-xai)",
  Meta: "var(--provider-meta)",
  "Z.ai": "var(--provider-zai)",
  DeepSeek: "var(--provider-deepseek)",
};

// Stable chip order, matching the catalog’s lab list rather than first-seen date.
export const releaseProviders = [ "Anthropic", "OpenAI", "Google", "xAI", "Meta", "Z.ai", "DeepSeek" ];

// @param {string} provider
// @returns {string} CSS colour value, with a neutral fallback for an unlisted provider
export function providerColor(provider) {
  return providerColors[provider] || "var(--provider-unknown)";
}

// CSS class that sets `--provider` from the stylesheet, which is required under a
// `style-src 'self'` Content-Security-Policy.
// @param {string} provider
// @returns {string}
export function providerSlug(provider) {
  return `provider-${provider.toLowerCase().replace(/[^a-z0-9]+/g, "")}`;
}
