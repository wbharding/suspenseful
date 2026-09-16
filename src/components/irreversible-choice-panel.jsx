import { irreversibleChoices } from "../data/pressure-data.js";
import useSelectedItem from "../hooks/use-selected-item.js";
import PlaceholderFigure from "./placeholder-figure.jsx";
import "./irreversible-choice-panel.scss";

// Element 1D. Three one-way doors. Each row opens to explain why there is no way back through
// it, which is the part that does not fit on a printed poster.
export default function IrreversibleChoicePanel() {
  const { selectedId, select } = useSelectedItem();

  return (
    <ul className="irreversible-choice-panel">
      {irreversibleChoices.items.map((choice) => (
        <li className="panel-choice-row" key={choice.id}>
          <button
            aria-expanded={selectedId === choice.id}
            className={`choice-row-trigger${selectedId === choice.id ? " is-active" : ""}`}
            onClick={() => select(choice.id)}
            type="button"
          >
            <span className="row-trigger-figure">
              {choice.imageId ? (
                <PlaceholderFigure imageId={choice.imageId} shape="icon" />
              ) : null}
            </span>
            <span className="row-trigger-text">
              <span className="choice-trigger-title">{choice.title}</span>
              <span className="choice-trigger-blurb">{choice.blurb}</span>
            </span>
          </button>

          {selectedId === choice.id ? (
            <p className="detail-reveal-panel">{choice.detail}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
