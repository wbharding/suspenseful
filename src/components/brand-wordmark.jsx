import { siteForHostname } from "../site-config.js";
import FieldIcon from "./field-icon.jsx";

// Shared by the masthead and the footer, which previously carried duplicate copies of the
// wordmark. Both domains are served from one build, so the name is resolved from the live
// hostname at render time rather than baked in at build time.
export default function BrandWordmark() {
  const { brand } = siteForHostname(window.location.hostname);

  return (
    <a aria-label={`${brand.name}, top of page`} className="brand" href="#top">
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
