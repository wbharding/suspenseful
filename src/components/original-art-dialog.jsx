import { siteMeta } from "../data/site-meta.js";
import { DialogHeading, ExternalLink } from "./detail-dialog.jsx";

// Shows the static poster this guide was built from. It is design history, not a source: the
// note says so, because a chart drawn inside an illustration is not evidence for the number.
//
// The image is a real asset under public/ rather than the base64 the prototype inlined, so the
// browser caches it once instead of re-parsing 500KB of the document on every load.
const ORIGINAL_ART_PATH = "/images/original-infographic.webp";

export default function OriginalArtDialog() {
  return (
    <>
      <DialogHeading title="From poster to field guide.">
        The earlier static concept supplied for this project. The interactive page separates its
        cells, adds source context and replaces illustrative numerical claims with explicitly
        labeled data. The image below is prior design art, not an additional evidence source.
      </DialogHeading>

      <img
        alt="Earlier Why Slow the AI Race infographic: four colored sections on pressure, risks, slowdown and practical actions."
        className="original-image"
        height="1536"
        src={ORIGINAL_ART_PATH}
        width="1024"
      />

      <div className="dialog-actions">
        <ExternalLink className="btn" label="Read the original outline" url={siteMeta.draftUrl} />
      </div>
    </>
  );
}
