import { riskLandscape } from "../data/risk-landscape-data.js";
import { sourceRegistry } from "../data/source-registry.js";
import { DialogHeading, ExternalLink } from "./detail-dialog.jsx";
import { SourceCard } from "./source-drawer.jsx";

// Opened by clicking a band in 2B. One harm, described by Daniel Kokotajlo in his own words.
//
// The quotes are verbatim transcript; the lede around them is the site's framing. Keeping the
// two visually distinct matters here, because the whole point of the dialog is that the reader
// is hearing one named person rather than the page's editorial voice.
//
// @param {number} index - position in riskLandscape
export default function RiskExplainerDialog({ index = 0 }) {
  const risk = riskLandscape[index];
  if (!risk?.explainer) return null;

  const { label, lede, quotes } = risk.explainer;

  return (
    <>
      <DialogHeading title={risk.title}>
        {risk.year}. {lede}
      </DialogHeading>

      <div className={`risk-explainer tone-${risk.tone}`}>
        <span className="risk-explainer-label">{risk.year} · {label}</span>
        {quotes.map((quote) => (
          <blockquote key={quote.slice(0, 40)}>{quote}</blockquote>
        ))}
        <p className="risk-explainer-attribution">
          Daniel Kokotajlo, former OpenAI researcher, on{" "}
          <ExternalLink
            label="The 80,000 Hours Podcast"
            url={sourceRegistry.kokotajlo.url}
          />
        </p>
      </div>

      <p className="dialog-intro">
        Kokotajlo describes the harm; the response suggested on the card is this site&rsquo;s
        summary of a broader debate, not his recommendation. Others quoted on this page would
        respond differently.
      </p>

      <SourceCard source={{ id: "kokotajlo", ...sourceRegistry.kokotajlo }} />
    </>
  );
}
