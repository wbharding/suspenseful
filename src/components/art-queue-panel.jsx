import { placeholderImageList } from "../data/placeholder-image-manifest.js";
import useDisclosure from "../hooks/use-disclosure.js";
import "./art-queue-panel.scss";

// Development scaffolding, not part of the poster's argument.
//
// Every illustration slot on the page is a manifest entry, and this panel is that manifest made
// visible: which panels are still cut from the draft sketch, which have no source art at all,
// and what each replacement needs to be. It doubles as the toggle for the "draft art" corner
// tags, which are handy while the art is being swapped and noise once it is done.
//
// @param {boolean} showMarkers
// @param {function} onToggleMarkers
export default function ArtQueuePanel({ showMarkers, onToggleMarkers }) {
  const { isOpen, panelId, toggle } = useDisclosure();
  const awaitingCount = placeholderImageList.filter((entry) => entry.status === "needed").length;
  const draftCount = placeholderImageList.length - awaitingCount;

  return (
    <section aria-labelledby="art-queue-heading" className="art-queue-panel">
      <div className="panel-summary-row">
        <div className="summary-row-text">
          <h2 className="row-text-heading" id="art-queue-heading">
            Art queue
          </h2>
          <p className="row-text-counts">
            {draftCount} panels are draft crops from the sketch, {awaitingCount} slots have no
            source art yet.
          </p>
        </div>

        <div className="summary-row-controls">
          <label className="row-controls-switch">
            <input checked={showMarkers} onChange={onToggleMarkers} type="checkbox" />
            Show draft-art tags
          </label>
          <button
            aria-controls={panelId}
            aria-expanded={isOpen}
            className="row-controls-toggle"
            onClick={toggle}
            type="button"
          >
            {isOpen ? "Hide the list" : "See the list"}
          </button>
        </div>
      </div>

      {isOpen ? (
        <ul className="panel-entry-list" id={panelId}>
          {placeholderImageList.map((entry) => (
            <li className={`entry-list-row status-${entry.status}`} key={entry.id}>
              <p className="list-row-identity">
                <span className="row-identity-id">{entry.id}</span>
                <span className="row-identity-status">
                  {entry.status === "needed" ? "Art needed" : "Draft crop"}
                </span>
              </p>
              <p className="list-row-subject">{entry.subject}</p>
              <p className="list-row-spec">
                {entry.targetSize} at {entry.aspectRatio}
              </p>
              {entry.replacementNotes ? (
                <p className="list-row-notes">{entry.replacementNotes}</p>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
