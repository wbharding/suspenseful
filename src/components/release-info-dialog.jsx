import { modelReleases } from "../data/release-data.js";
import { sourceRegistry } from "../data/source-registry.js";
import useGuideStore from "../hooks/use-guide-store.js";
import { releaseDateLabel } from "../lib/format.js";
import { DialogHeading } from "./detail-dialog.jsx";
import FieldIcon from "./field-icon.jsx";
import { SourceCard } from "./source-drawer.jsx";

// @param {string} id - a release id
// @param {string[]} [providers] - filters to carry into the full table
export default function ReleaseInfoDialog({ id, providers }) {
  const { openDialog } = useGuideStore();
  const release = modelReleases.find((entry) => entry.id === id);
  if (!release) return null;

  const source = sourceRegistry[release.source];
  let qualifier = "One dated event in a seven-lab flagship/point catalog. Dates refer to this named release or preview, not necessarily the product’s first availability.";
  if (release.datePrecision === "month") {
    qualifier = "The catalog confirms the month, not the day, for this release.";
  }
  if (release.provisional) {
    qualifier += " This 2026 date is flagged as provisional (secondary trackers).";
  }
  if (release.status === "announced") {
    qualifier += " Announced, not confirmed shipped as of the catalog date.";
  }

  return (
    <>
      <DialogHeading title={release.name}>
        <strong>
          {release.provider} · {releaseDateLabel(release)}
        </strong>
        <br />
        {qualifier}
        {release.note ? (
          <>
            <br />
            {release.note}
          </>
        ) : null}
      </DialogHeading>

      {source ? <SourceCard source={{ id: release.source, ...source }} /> : null}

      <div className="dialog-actions">
        <button
          className="btn small"
          onClick={() =>
            openDialog({
              type: "release-data",
              providers,
              kicker: "DATA TABLE · SEVEN-LAB CATALOG",
            })
          }
          type="button"
        >
          Browse the catalog <FieldIcon name="arrow" />
        </button>
      </div>
    </>
  );
}
