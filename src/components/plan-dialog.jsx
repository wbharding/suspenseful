import { actionItems } from "../data/action-data.js";
import { siteMeta } from "../data/site-meta.js";
import { sourceRegistry } from "../data/source-registry.js";
import useGuideStore from "../hooks/use-guide-store.js";
import { downloadFile } from "../lib/download.js";
import { siteForHostname } from "../site-config.js";
import { DialogHeading } from "./detail-dialog.jsx";
import FieldIcon from "./field-icon.jsx";

export default function PlanDialog() {
  const {
    savedActionIds,
    forecasts,
    notes,
    isStorageAvailable,
    reducedMotion,
    openDialog,
    closeDialog,
    toggleSavedAction,
    deleteForecast,
    updateNotes,
    flushNotes,
    showToast,
  } = useGuideStore();

  const saved = actionItems.filter((action) => savedActionIds.has(action.id));

  function handleBrowseActions() {
    closeDialog();
    document.getElementById("actions")?.scrollIntoView({
      behavior: reducedMotion ? "instant" : "smooth",
    });
  }

  function handleDeleteForecast(forecastId) {
    if (!window.confirm("Delete this forecast and its revision history from this browser?")) {
      return;
    }
    deleteForecast(forecastId);
  }

  function handleExport(asJson) {
    flushNotes();
    const stamp = new Date().toISOString().slice(0, 10);
    if (asJson) {
      downloadFile(
        `my-ai-action-plan-${stamp}.json`,
        JSON.stringify(
          {
            schema: "a-smarter-pace/local-plan/v1",
            exportedAt: new Date().toISOString(),
            actions: saved.map((action) => ({
              id: action.id,
              title: action.title,
              description: action.details,
              source: sourceRegistry[action.source].url,
            })),
            notes,
            forecasts,
          },
          null,
          2,
        ),
        "application/json",
      );
    } else {
      const text = `# My AI action plan

Exported ${stamp}. Personal notes and beliefs, not expert forecasts.

## Saved actions

${saved.length ? saved.map((action) => `- [ ] ${action.title}\n  ${action.details}\n  Source: ${sourceRegistry[action.source].url}`).join("\n\n") : "No actions saved."}

## Note to my future self

${notes || "No note yet."}

## Forecast journal

${forecasts.length ? forecasts.map((forecast) => `### ${forecast.scenario}

My probability: ${forecast.probability}%
Resolution deadline: ${forecast.deadline}
Resolution criteria: ${forecast.criteria}
Rationale: ${forecast.rationale || "Not recorded."}
Last updated: ${forecast.updated}

Revision history:
${forecast.history.map((entry) => `- ${entry.date}: ${entry.probability}% — ${entry.rationale || ""}`).join("\n")}`).join("\n\n") : "No forecasts saved."}

---
Created with ${siteForHostname(window.location.hostname).brand.name}, v${siteMeta.version}. Source outline: ${siteMeta.draftUrl}
`;
      downloadFile(`my-ai-action-plan-${stamp}.md`, text, "text/markdown;charset=utf-8");
    }
    showToast("Your plan export is ready.");
  }

  return (
    <>
      <DialogHeading title="A little less vague. A little more useful.">
        Your saved actions and personal forecasts. Nothing here is sent to a server.
      </DialogHeading>

      {!isStorageAvailable ? (
        <div className="privacy-warning">
          Persistent storage is unavailable. Entries may be lost when this tab closes. Export
          your plan to keep a copy.
        </div>
      ) : null}

      <h3 className="plan-section-title">
        Saved actions <span className="tag tag-neutral">{saved.length}</span>
      </h3>

      {saved.length ? (
        saved.map((action) => (
          <div className="saved-plan-item" key={action.id}>
            <FieldIcon name={action.icon} />
            <div>
              <button
                className="text-action"
                onClick={() =>
                  openDialog({
                    type: "action",
                    id: action.id,
                    kicker: "MAKE IT A PRACTICAL NEXT STEP",
                  })
                }
                type="button"
              >
                <strong>{action.title}</strong>
              </button>
              <small>{action.description}</small>
            </div>
            <button
              aria-label={`Remove ${action.title}`}
              aria-pressed="true"
              className="icon-btn"
              onClick={() => toggleSavedAction(action.id)}
              type="button"
            >
              <FieldIcon name="close" />
            </button>
          </div>
        ))
      ) : (
        <div className="empty-state">
          <strong>Start with one concrete action.</strong>
          Save an action from chapter four, then come back here.
          <br />
          <button className="text-btn" onClick={handleBrowseActions} type="button">
            Explore the actions <FieldIcon name="arrow" />
          </button>
        </div>
      )}

      <h3 className="plan-section-title">
        Your forecast journal{" "}
        <button
          className="text-btn"
          onClick={() => openDialog({ type: "forecast", kicker: "PERSONAL FORECAST JOURNAL" })}
          type="button"
        >
          <FieldIcon name="plus" />
          New forecast
        </button>
      </h3>

      {forecasts.length ? (
        forecasts.map((forecast) => (
          <article className="forecast-entry" key={forecast.id}>
            <div className="forecast-entry-head">
              <h4>{forecast.scenario}</h4>
              <span className="forecast-pct">{forecast.probability}%</span>
            </div>
            <p>
              <strong>Resolves by:</strong> {forecast.deadline}
              <br />
              <strong>Criteria:</strong> {forecast.criteria || "Not specified"}
            </p>
            <p>{forecast.rationale || ""}</p>
            <div className="forecast-meta">
              Last updated {new Date(forecast.updated || forecast.created).toLocaleDateString("en-US")}{" "}
              · Your estimate, not an expert consensus.
            </div>
            {forecast.history.length > 1 ? (
              <div className="forecast-history">
                Revision history:{" "}
                {forecast.history.map((entry) => (
                  <span key={entry.date}>
                    {entry.date?.slice(0, 10)}: <strong>{entry.probability}%</strong>
                  </span>
                ))}
              </div>
            ) : null}
            <div className="dialog-actions">
              <button
                className="text-btn"
                onClick={() =>
                  openDialog({
                    type: "forecast",
                    id: forecast.id,
                    kicker: "PERSONAL FORECAST JOURNAL",
                  })
                }
                type="button"
              >
                Revise forecast <FieldIcon name="arrow" />
              </button>
              <button
                className="text-btn"
                onClick={() => handleDeleteForecast(forecast.id)}
                type="button"
              >
                <FieldIcon name="trash" />
                Delete
              </button>
            </div>
          </article>
        ))
      ) : (
        <div className="empty-state">
          No forecasts yet. Write a scenario, a probability and a deadline. Then record what
          would change your mind.
        </div>
      )}

      <label className="field plan-notes">
        <span>A note to your future self</span>
        <textarea
          maxLength={10000}
          onChange={(event) => updateNotes(event.target.value)}
          placeholder="What will you do next? What would change your mind?"
          value={notes}
        />
        <small>Notes save automatically in this browser when local storage is available.</small>
      </label>

      <p className="local-note">
        <FieldIcon name="lock" />
        Private to this browser profile. Browser storage is not encrypted; avoid sensitive
        information.
      </p>

      <div className="dialog-actions">
        <button className="btn primary" onClick={() => handleExport(false)} type="button">
          <FieldIcon name="download" />
          Export my plan
        </button>
        <button className="btn" onClick={() => handleExport(true)} type="button">
          <FieldIcon name="file" />
          Export JSON backup
        </button>
      </div>
    </>
  );
}
