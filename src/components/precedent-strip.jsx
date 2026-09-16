import { coordinationPrecedents } from "../data/slowdown-data.js";
import useSelectedItem from "../hooks/use-selected-item.js";
import PlaceholderFigure from "./placeholder-figure.jsx";
import "./precedent-strip.scss";

// Element 3A. Three times the world coordinated on a technology risk. The poster can only carry
// the year and the outcome; opening one adds the mechanism that made it work, which is the part
// that transfers to AI.
export default function PrecedentStrip() {
  const { selectedId, select } = useSelectedItem();
  const selectedPrecedent = coordinationPrecedents.entries.find((entry) => entry.id === selectedId);

  return (
    <div className="precedent-strip">
      <ul className="strip-entry-list">
        {coordinationPrecedents.entries.map((entry) => (
          <li key={entry.id}>
            <button
              aria-expanded={selectedId === entry.id}
              className={`entry-list-button${selectedId === entry.id ? " is-active" : ""}`}
              onClick={() => select(entry.id)}
              type="button"
            >
              <PlaceholderFigure imageId={entry.imageId} shape="square" />
              <span className="list-button-year">{entry.year}</span>
              <span className="list-button-title">{entry.title}</span>
              <span className="list-button-outcome">{entry.outcome}</span>
            </button>
          </li>
        ))}
      </ul>

      {selectedPrecedent ? (
        <div className="detail-reveal-panel strip-entry-detail">
          <p className="entry-detail-body">{selectedPrecedent.detail}</p>
          <p className="entry-detail-lesson">{selectedPrecedent.lesson}</p>
        </div>
      ) : (
        <p className="detail-prompt-note">Pick a precedent to see what made restraint hold.</p>
      )}
    </div>
  );
}
