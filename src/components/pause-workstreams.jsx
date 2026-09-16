import { useState } from "react";
import { safetyWorkstreams } from "../data/workstream-data.js";
import FieldIcon from "./field-icon.jsx";
import { SourceLinkButton } from "./guide-card.jsx";

const USEFUL_AI = [
  { icon: "heart", label: "Medicine" },
  { icon: "leaf", label: "Clean energy" },
  { icon: "flask", label: "Scientific discovery" },
  { icon: "settings", label: "Everyday tools" },
];

// Element 3C. A pause should buy specific work, not just delay.
export default function PauseWorkstreams() {
  const [ index, setIndex ] = useState(0);
  const workstream = safetyWorkstreams[index];

  return (
    <div className="build-layout">
      <div>
        <div aria-label="Safety workstreams" className="workstream-tabs" role="group">
          {safetyWorkstreams.map((entry, entryIndex) => {
            const isActive = entryIndex === index;
            return (
              <button
                aria-pressed={isActive}
                className={isActive ? "active" : ""}
                key={entry.title}
                onClick={() => setIndex(entryIndex)}
                type="button"
              >
                <FieldIcon name={entry.icon} />
                <span>{entry.title}</span>
              </button>
            );
          })}
        </div>
        <div aria-live="polite" className="workstream-detail">
          <h4>{workstream.headline}</h4>
          <p>{workstream.body}</p>
          <div className="deliverable">
            <FieldIcon name="check" />
            <span>
              <strong>The time should buy:</strong> {workstream.deliverable}
            </span>
          </div>
          <SourceLinkButton label="The case for this work" sourceIds={workstream.source} />
        </div>
      </div>
      <aside className="useful-ai">
        <span className="eyebrow">Keep the benefits in view</span>
        <h4>
          Useful AI
          <br />
          keeps moving.
        </h4>
        <p>A targeted constraint need not stop every application.</p>
        <div>
          {USEFUL_AI.map((item) => (
            <span key={item.label}>
              <FieldIcon name={item.icon} />
              {item.label}
            </span>
          ))}
        </div>
      </aside>
    </div>
  );
}
