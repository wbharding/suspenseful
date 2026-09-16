import { sourceRegistry } from "../data/source-registry.js";
import useGuideStore from "../hooks/use-guide-store.js";
import { DialogHeading } from "./detail-dialog.jsx";
import FieldIcon from "./field-icon.jsx";
import { SourceCard } from "./source-drawer.jsx";

// States what this page is and, more usefully, what it is not. The four panels are the limits a
// reader should carry into the rest of the guide.
export default function AboutDialog() {
  const { openDialog } = useGuideStore();

  return (
    <>
      <DialogHeading title="A field guide, not a forecast.">
        This is version 1 of an interactive case for pacing the most capable AI systems. The
        argument is intentionally visible—and so are the limits of the evidence.
      </DialogHeading>

      <div className="about-grid">
        <div>
          <strong>Real data, frozen in time</strong>
          <p>
            Historical METR results, dated release events and published survey summaries are
            bundled locally. Nothing is presented as a live feed.
          </p>
        </div>
        <div>
          <strong>Illustrations stay illustrations</strong>
          <p>
            The race, release-and-recall demo and shared gate explain mechanisms. They do not
            calculate risk reductions or certify safety.
          </p>
        </div>
        <div>
          <strong>Sound and motion are optional</strong>
          <p>
            Audio starts only after you enable it. The animation toggle and your device’s
            reduced-motion preference keep the experience adjustable.
          </p>
        </div>
        <div>
          <strong>Your plan stays local</strong>
          <p>
            No account, analytics, API key or backend. Clearing browser data removes local
            entries; export them to keep a portable copy.
          </p>
        </div>
      </div>

      <p className="dialog-intro">
        The historical benchmark table is from January 2026; the selected release sample ends in
        July 2026; the survey was conducted in 2023. Source review date: September 15, 2026.
      </p>

      <div className="dialog-actions">
        <button
          className="btn primary"
          onClick={() => openDialog({ type: "sources" })}
          type="button"
        >
          Browse the evidence <FieldIcon name="arrow" />
        </button>
        <button className="btn" onClick={() => openDialog({ type: "original" })} type="button">
          See the original concept
        </button>
      </div>

      <SourceCard source={{ id: "draft", ...sourceRegistry.draft }} />
    </>
  );
}
