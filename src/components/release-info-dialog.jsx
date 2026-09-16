import { modelReleases } from "../data/release-data.js";
import { sourceRegistry } from "../data/source-registry.js";
import useGuideStore from "../hooks/use-guide-store.js";
import { dateLabel } from "../lib/format.js";
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

  return (
    <>
      <DialogHeading title={release.name}>
        <strong>
          {release.provider} · {dateLabel(release.date)}
        </strong>
        <br />
        One dated event in the selected release sample. Dates refer to this named release or
        preview, not necessarily the product’s first availability.
      </DialogHeading>

      {source ? <SourceCard source={{ id: release.source, ...source }} /> : null}

      <div className="dialog-actions">
        <button
          className="btn small"
          onClick={() =>
            openDialog({
              type: "release-data",
              providers,
              kicker: "DATA TABLE · SELECTED EVENTS",
            })
          }
          type="button"
        >
          Browse all selected releases <FieldIcon name="arrow" />
        </button>
      </div>
    </>
  );
}
