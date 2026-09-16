import { actionItems } from "../data/action-data.js";
import { sourceRegistry } from "../data/source-registry.js";
import useGuideStore from "../hooks/use-guide-store.js";
import { DialogHeading, ExternalLink } from "./detail-dialog.jsx";
import FieldIcon from "./field-icon.jsx";
import { SourceCard } from "./source-drawer.jsx";

// @param {string} id - action id
export default function ActionDetailDialog({ id }) {
  const { savedActionIds, openDialog, toggleSavedAction } = useGuideStore();
  const action = actionItems.find((item) => item.id === id);
  if (!action) return null;

  const isSaved = savedActionIds.has(id);
  const source = sourceRegistry[action.source];

  return (
    <>
      <DialogHeading title={action.title}>{action.details}</DialogHeading>

      {id === "representative" ? (
        <div className="privacy-warning">
          The letter helper is an editable draft, not a message-sending service.
        </div>
      ) : null}

      <div className="dialog-actions">
        <button
          aria-pressed={isSaved}
          className="btn primary"
          onClick={() => toggleSavedAction(id)}
          type="button"
        >
          <FieldIcon name={isSaved ? "check" : "plus"} />
          {isSaved ? "Saved to my plan" : "Save to my plan"}
        </button>
        {id === "forecasts" ? (
          <button
            className="btn"
            onClick={() =>
              openDialog({ type: "forecast", kicker: "PERSONAL FORECAST JOURNAL" })
            }
            type="button"
          >
            <FieldIcon name="chart" />
            Start a forecast
          </button>
        ) : null}
        {id === "representative" ? (
          <button
            className="btn"
            onClick={() => openDialog({ type: "meeting", kicker: "EDITABLE OUTREACH DRAFT" })}
            type="button"
          >
            <FieldIcon name="mail" />
            Draft a meeting request
          </button>
        ) : null}
        {id !== "forecasts" && id !== "representative" && action.link ? (
          <ExternalLink className="btn" label="Explore this starting point" url={action.link} />
        ) : null}
      </div>

      {source ? <SourceCard source={{ id: action.source, ...source }} /> : null}
      {id === "representative" ? (
        <SourceCard source={{ id: "house", ...sourceRegistry.house }} />
      ) : null}

      <p className="after-source">
        These actions are possibilities to investigate, not a guarantee of impact. No donation
        or message is sent from this page.
      </p>
    </>
  );
}
