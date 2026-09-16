import { siteForHostname } from "./site-config.js";

// Static assets are served by the ASSETS binding. HTML documents get their title and
// description rewritten per domain on the way out, so the served markup is already
// correct for crawlers and link previews — no client-side title flash, and no inline
// script (which the Content-Security-Policy in public/_headers would block anyway).
export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);

    if (!(response.headers.get("content-type") || "").includes("text/html")) {
      return response;
    }

    // The Host header is the reliable source here: behind a custom domain the URL
    // hostname matches it, but local dev serves everything from 127.0.0.1.
    const host = request.headers.get("host") || new URL(request.url).hostname;
    const site = siteForHostname(host);

    return new HTMLRewriter()
      .on("title", {
        element(element) {
          element.setInnerContent(site.title);
        },
      })
      .on('meta[name="description"]', {
        element(element) {
          element.setAttribute("content", site.description);
        },
      })
      .transform(response);
  },
};
