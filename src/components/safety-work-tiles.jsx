import { safetyTiles } from "../data/safety-details.js";
import useGuideStore from "../hooks/use-guide-store.js";
import FieldIcon from "./field-icon.jsx";

// Element 1B. Four workstreams, not a single safety score.
export default function SafetyWorkTiles() {
  const { openDialog } = useGuideStore();

  return (
    <div className="safety-grid">
      {safetyTiles.map((tile, index) => (
        <button
          aria-label={`Explore ${tile.title}`}
          className="safety-tile"
          key={tile.title}
          onClick={() =>
            openDialog({ type: "safety", index, kicker: "UNDERSTANDING TAKES WORK" })
          }
          type="button"
        >
          <span className="tile-illustration">
            <FieldIcon name={tile.icon} />
          </span>
          <strong>{tile.title}</strong>
          <span>{tile.subtitle}</span>
          <FieldIcon className="tile-plus" name="plus" />
        </button>
      ))}
    </div>
  );
}
