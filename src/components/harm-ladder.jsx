import { harmLadder } from "../data/risk-data.js";
import useSelectedItem from "../hooks/use-selected-item.js";
import IconGlyph from "./icon-glyph.jsx";
import "./harm-ladder.scss";

// Element 2B. The tiered harm ladder, near-term at the top down to loss of control at the
// bottom. Each rung carries its own time horizon, and opening one keeps the uncertainty
// visible rather than flattening four very different claims into one scary list.
export default function HarmLadder() {
  const { selectedId, select } = useSelectedItem();

  return (
    <div className="harm-ladder">
      <p className="ladder-caption-text">{harmLadder.caption}</p>

      <ul className="ladder-rung-list">
        {harmLadder.rungs.map((rung) => (
          <li className="rung-list-item" key={rung.id}>
            <button
              aria-expanded={selectedId === rung.id}
              className={`list-item-trigger${selectedId === rung.id ? " is-active" : ""}`}
              onClick={() => select(rung.id)}
              type="button"
            >
              <IconGlyph name={rung.id} />
              <span className="rung-trigger-text">
                <span className="rung-trigger-title">{rung.title}</span>
                <span className="rung-trigger-blurb">{rung.blurb}</span>
              </span>
              <span className="item-trigger-horizon">{rung.horizon}</span>
            </button>

            {selectedId === rung.id ? <p className="detail-reveal-panel list-item-detail">{rung.detail}</p> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
