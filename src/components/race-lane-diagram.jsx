import { raceLanes } from "../data/risk-data.js";
import useSelectedItem from "../hooks/use-selected-item.js";
import PlaceholderFigure from "./placeholder-figure.jsx";
import "./race-lane-diagram.scss";

// Element 2A. Four lanes saying the same sentence. Opening a lane gives that participant's own
// reason, which is what makes the outcome collectively irrational rather than anyone's fault.
export default function RaceLaneDiagram() {
  const { selectedId, select } = useSelectedItem();
  const selectedLane = raceLanes.lanes.find((lane) => lane.id === selectedId);

  return (
    <div className="race-lane-diagram">
      <PlaceholderFigure imageId={raceLanes.imageId} shape="wide" />

      <ul className="diagram-lane-list">
        {raceLanes.lanes.map((lane) => (
          <li className="lane-list-cell" key={lane.id}>
            <button
              aria-expanded={selectedId === lane.id}
              className={`lane-list-button${selectedId === lane.id ? " is-active" : ""}`}
              onClick={() => select(lane.id)}
              type="button"
            >
              <span className="list-button-bubble">{raceLanes.sharedLine}</span>
              <span className="list-button-label">{lane.label}</span>
            </button>
          </li>
        ))}
      </ul>

      {selectedLane ? (
        <p className="detail-reveal-panel diagram-lane-detail">
          <span className="lane-detail-label">{selectedLane.label}</span>
          {selectedLane.detail}
        </p>
      ) : (
        <p className="detail-prompt-note">Pick a lane to see why it cannot be the one to slow down.</p>
      )}
    </div>
  );
}
