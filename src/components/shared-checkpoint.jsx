import { useState } from "react";
import FieldIcon from "./field-icon.jsx";
import RaceCarMark from "./race-car-mark.jsx";

const PILLARS = [
  {
    id: "scope",
    title: "Defined scope",
    body: "What activities and capabilities fall under the rule?",
    icon: "file",
  },
  {
    id: "verification",
    title: "Independent verification",
    body: "Who gets access to check compliance?",
    icon: "search",
  },
  {
    id: "conditions",
    title: "Conditions for proceeding",
    body: "What evidence opens the gate—and what closes it?",
    icon: "shield",
  },
];

// Element 3B. Three conditions make an illustrative gate. Real verification is harder.
export default function SharedCheckpoint() {
  const [ touched, setTouched ] = useState(false);
  const [ checked, setChecked ] = useState({
    scope: false,
    verification: false,
    conditions: false,
  });

  const selectedCount = PILLARS.filter((pillar) => checked[pillar.id]).length;
  const isOpen = selectedCount === 3;

  function handleToggle(id, isChecked) {
    setTouched(true);
    setChecked((current) => ({ ...current, [id]: isChecked }));
  }

  let status = "Select all three conditions to open this illustrative gate.";
  if (isOpen) {
    status = "This illustrative gate is open. Real verification needs evidence, authority and enforcement.";
  } else if (touched && selectedCount === 0) {
    status = "0 of 3 conditions selected. Start with the scope: what falls under the rule?";
  } else if (touched) {
    status = `${selectedCount} of 3 conditions selected. What else would make this checkpoint meaningful?`;
  }

  return (
    <>
      <div className="checkpoint-diagram">
        <div className="checkpoint-roof">
          <FieldIcon name="shield" />
          Shared checkpoint
        </div>
        <div className="checkpoint-pillars">
          {PILLARS.map((pillar) => (
            <label className="checkpoint-pillar" htmlFor={`gate-${pillar.id}`} key={pillar.id}>
              <input
                checked={checked[pillar.id]}
                className="gate-check"
                id={`gate-${pillar.id}`}
                onChange={(event) => handleToggle(pillar.id, event.target.checked)}
                type="checkbox"
              />
              <span className="pillar-icon">
                <FieldIcon name={pillar.icon} />
              </span>
              <strong>{pillar.title}</strong>
              <small>{pillar.body}</small>
              <span className="pillar-check">
                <FieldIcon name="check" />
              </span>
            </label>
          ))}
        </div>
        <div className={`checkpoint-road${isOpen ? " gate-open" : ""}`}>
          <span className="gate-car">
            <RaceCarMark />
          </span>
          <span className="barrier" />
          <span className="road-dash" />
        </div>
      </div>
      <p aria-live="polite" className="demo-message">
        {status}
      </p>
    </>
  );
}
