import { useState } from "react";
import { riskLandscape } from "../data/risk-landscape-data.js";
import FieldIcon from "./field-icon.jsx";
import { SourceLinkButton } from "./guide-card.jsx";

// Element 2B. A spectrum of harms, not a probability ranking.
export default function RiskLandscape() {
  const [ index, setIndex ] = useState(0);
  const risk = riskLandscape[index];

  return (
    <>
      <div aria-label="Explore potential harms" className="risk-tabs" role="group">
        {riskLandscape.map((entry, entryIndex) => {
          const isActive = entryIndex === index;
          return (
            <button
              aria-pressed={isActive}
              className={`risk-tab${isActive ? " active" : ""}`}
              key={entry.title}
              onClick={() => setIndex(entryIndex)}
              type="button"
            >
              <FieldIcon name={entry.icon} />
              <span>{entry.title}</span>
              <FieldIcon name="arrow" />
            </button>
          );
        })}
      </div>
      <div aria-live="polite" className="risk-detail">
        <h4>{risk.subtitle}</h4>
        <p>{risk.body}</p>
        <p className="risk-response">{risk.response}</p>
        <SourceLinkButton label="Context & uncertainty" sourceIds={risk.source} />
      </div>
    </>
  );
}
