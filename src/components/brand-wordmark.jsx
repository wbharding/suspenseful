import { siteForHostname } from "../site-config.js";
import usePathname from "../hooks/use-pathname.js";
import { navigateTo, pathIsChoices } from "../lib/navigate.js";

// Shared by the masthead and the footer, which previously carried duplicate copies of the
// wordmark. Both domains are served from one build, so the name is resolved from the live
// hostname at render time rather than baked in at build time.
export default function BrandWordmark() {
  const { brand } = siteForHostname(window.location.hostname);
  const onChoices = pathIsChoices(usePathname());
  const href = onChoices ? "/" : "#top";

  function handleClick(event) {
    if (!onChoices) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    navigateTo("/");
  }

  return (
    <a aria-label={`${brand.name}, top of page`} className="brand" href={href} onClick={handleClick}>
      <span className="brand-mark">
        <svg aria-hidden="true" viewBox="0 0 72 40" width="72" height="40">
          <path fill="currentColor" opacity=".65" d="M0 38 18 16 35 38Z" />
          <path fill="currentColor" opacity=".85" d="M15 38 38 3 62 38Z" />
          <path fill="currentColor" opacity=".7" d="M39 38 57 14 72 38Z" />
          <path fill="currentColor" d="m23 38 14-17 13 17Z" />
        </svg>
      </span>
      <span className="brand-text">
        <span>{brand.lead}<b>{brand.accent}</b></span>
        <small>A clearer tomorrow</small>
      </span>
    </a>
  );
}
