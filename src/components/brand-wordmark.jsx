import { siteForHostname } from "../site-config.js";
import usePathname from "../hooks/use-pathname.js";
import { navigateTo, pathIsChoices } from "../lib/navigate.js";
import FieldIcon from "./field-icon.jsx";

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
        <FieldIcon name="road" />
      </span>
      <span>
        {brand.lead}
        <b>{brand.accent}</b>
      </span>
    </a>
  );
}
