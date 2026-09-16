import { understandingWorkstreams } from "../data/pressure-data.js";
import useSelectedItem from "../hooks/use-selected-item.js";
import IconGlyph from "./icon-glyph.jsx";
import "./understanding-tiles.scss";

// Element 1B. Four separate workstreams that each have to be done by hand. Opening a tile
// explains why it does not come free with the next capability jump.
export default function UnderstandingTiles() {
  const { selectedId, select } = useSelectedItem();
  const selectedWorkstream = understandingWorkstreams.find((item) => item.id === selectedId);

  return (
    <div className="understanding-tiles">
      <ul className="tiles-grid-list">
        {understandingWorkstreams.map((workstream) => (
          <li key={workstream.id}>
            <button
              aria-expanded={selectedId === workstream.id}
              className={`grid-list-tile${selectedId === workstream.id ? " is-active" : ""}`}
              onClick={() => select(workstream.id)}
              type="button"
            >
              <IconGlyph name={workstream.id} />
              <span className="list-tile-title">{workstream.title}</span>
              <span className="list-tile-blurb">{workstream.blurb}</span>
            </button>
          </li>
        ))}
      </ul>

      {selectedWorkstream ? (
        <p className="detail-reveal-panel">{selectedWorkstream.detail}</p>
      ) : (
        <p className="detail-prompt-note">Pick a workstream to see what it involves.</p>
      )}
    </div>
  );
}
