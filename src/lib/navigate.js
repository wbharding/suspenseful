// Client-side path changes for the field guide's one secondary page. Hash anchors (#pressure)
// stay as in-page jumps; /choices is a real path, which Cloudflare already serves as the SPA.

export const CHOICES_PATH = "/choices";

// @param {string} [pathname]
// @returns {boolean}
export function pathIsChoices(pathname = window.location.pathname) {
  return pathname.replace(/\/$/, "") === CHOICES_PATH;
}

// @param {string} path
export function navigateTo(path) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new Event("guide-navigate"));
}
