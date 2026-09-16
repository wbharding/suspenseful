import useSelectedItem from "../hooks/use-selected-item.js";
import PlaceholderFigure from "./placeholder-figure.jsx";
import "./action-grid.scss";

// Elements 4A and 4B. The poster can only fit a title and a one-line promise per action;
// opening an item says what the action actually involves, which is the difference between a
// closing slogan and something a reader could do on Monday.
//
// @param {object} group - entry from actionGroups
export default function ActionGrid({ group }) {
  const { selectedId, select } = useSelectedItem();
  const selectedAction = group.items.find((item) => item.id === selectedId);

  return (
    <div className="action-grid">
      <ul className="grid-action-list">
        {group.items.map((item) => (
          <li className="action-list-cell" key={item.id}>
            <button
              aria-expanded={selectedId === item.id}
              className={`action-list-button${selectedId === item.id ? " is-active" : ""}`}
              onClick={() => select(item.id)}
              type="button"
            >
              <PlaceholderFigure imageId={item.imageId} shape="icon" />
              <span className="list-button-heading">{item.title}</span>
              <span className="list-button-promise">{item.blurb}</span>
            </button>
          </li>
        ))}
      </ul>

      {selectedAction ? (
        <p className="detail-reveal-panel">{selectedAction.detail}</p>
      ) : (
        <p className="detail-prompt-note">Pick an action to see what it involves.</p>
      )}
    </div>
  );
}
