import { sharedCheckpoint } from "../data/slowdown-data.js";
import useSelectedItem from "../hooks/use-selected-item.js";
import PlaceholderFigure from "./placeholder-figure.jsx";
import "./shared-checkpoint-diagram.scss";

// Element 3B. The same four lanes from 2A, now passing through one gate. The three gate
// conditions are the whole design: each one is a button, because "independent verification"
// is doing a lot of work in that sentence and deserves the space to say what it means.
export default function SharedCheckpointDiagram() {
  const { selectedId, select } = useSelectedItem();
  const selectedGate = sharedCheckpoint.gates.find((gate) => gate.id === selectedId);

  return (
    <div className="shared-checkpoint-diagram">
      <PlaceholderFigure imageId={sharedCheckpoint.imageId} shape="wide" />

      <ul className="diagram-lane-tags">
        {sharedCheckpoint.lanes.map((lane) => (
          <li className="lane-tags-item" key={lane}>
            {lane}
          </li>
        ))}
      </ul>

      <ul className="diagram-gate-list">
        {sharedCheckpoint.gates.map((gate) => (
          <li className="gate-list-cell" key={gate.id}>
            <button
              aria-expanded={selectedId === gate.id}
              className={`gate-list-button${selectedId === gate.id ? " is-active" : ""}`}
              onClick={() => select(gate.id)}
              type="button"
            >
              {gate.label}
            </button>
          </li>
        ))}
      </ul>

      {selectedGate ? (
        <p className="detail-reveal-panel">{selectedGate.detail}</p>
      ) : (
        <p className="detail-prompt-note">Pick a condition to see what clearing the gate requires.</p>
      )}
    </div>
  );
}
