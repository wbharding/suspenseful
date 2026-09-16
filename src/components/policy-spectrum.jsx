import { useState } from "react";
import { policyOptions } from "../data/policy-data.js";
import FieldIcon from "./field-icon.jsx";
import { SourceLinkButton } from "./guide-card.jsx";

// Element 3D. Lighter-touch to more restrictive. Every option carries its tradeoff.
export default function PolicySpectrum() {
  const [ index, setIndex ] = useState(0);
  const policy = policyOptions[index];

  return (
    <>
      <div aria-label="Explore policy options" className="policy-spectrum" role="group">
        {policyOptions.map((option, optionIndex) => {
          const isActive = optionIndex === index;
          return (
            <button
              aria-pressed={isActive}
              className={`policy-option${isActive ? " active" : ""}`}
              key={option.title}
              onClick={() => setIndex(optionIndex)}
              type="button"
            >
              <span className="policy-symbol">
                <FieldIcon name={option.icon} />
              </span>
              <strong>{option.title}</strong>
              <small>{option.short}</small>
              <span className="policy-dot" />
            </button>
          );
        })}
      </div>
      <div className="spectrum-labels">
        <span>Lighter-touch</span>
        <span>
          More restrictive <FieldIcon name="arrow" />
        </span>
      </div>
      <div aria-live="polite">
        <div className="policy-detail-grid">
          <div>
            <div className="eyebrow">What changes</div>
            <p>{policy.change}</p>
          </div>
          <div>
            <div className="eyebrow">What can continue</div>
            <p>{policy.continues}</p>
          </div>
          <div>
            <div className="eyebrow">The tradeoff</div>
            <p>{policy.tradeoff}</p>
          </div>
        </div>
        <div className="policy-detail-source">
          <SourceLinkButton label="Proposal & context" sourceIds={policy.source} />
        </div>
      </div>
      <p className="micro">
        Policy concepts, not a description of current law. The scope, thresholds, enforcement
        and exit conditions matter.
      </p>
    </>
  );
}
