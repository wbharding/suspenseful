import { useState } from "react";
import FieldIcon from "./field-icon.jsx";

const COPY_NODES = [
  [ 238, 15 ],
  [ 238, 72 ],
  [ 238, 130 ],
  [ 382, 15 ],
  [ 382, 72 ],
  [ 382, 130 ],
];

// Element 1D. Weights can be copied. Recalling the original does not retrieve the copies.
export default function RecallDemo() {
  const [ released, setReleased ] = useState(false);
  const [ recalled, setRecalled ] = useState(false);

  function handleReset() {
    setReleased(false);
    setRecalled(false);
  }

  let message = "Try it: release the weights, then attempt to recall them.";
  if (recalled) message = "The original can be withdrawn. Independent copies are still out there.";
  else if (released) message = "The weights have spread to other machines. Now try to recall them.";

  const networkClass = `model-network${released ? " released" : ""}${recalled ? " recalled" : ""}`;

  return (
    <>
      <div className={networkClass}>
        <svg aria-label="Illustration of a model being copied to independent machines" role="img" viewBox="0 0 500 185">
          <g className="network-lines" fill="none" stroke="#b3c3c4" strokeWidth="1.5">
            <path d="M102 90C177 90 161 34 238 34M102 90H238M102 90C177 90 161 151 238 151M276 34H379M276 90h103M276 151h103" />
          </g>
          <g className="origin-node">
            <rect fill="#254c50" height="79" rx="12" width="76" x="28" y="51" />
            <path d="M43 66h46M43 76h21" stroke="#99b9b6" strokeWidth="3" />
            <text fill="white" fontFamily="system-ui" fontSize="18" fontWeight="700" textAnchor="middle" x="66" y="104">
              AI
            </text>
            <text fill="#536969" fontFamily="system-ui" fontSize="12" textAnchor="middle" x="66" y="156">
              Original
            </text>
          </g>
          {COPY_NODES.map(([ x, y ], index) => (
            <g className="copy-node" key={index} transform={`translate(${x} ${y})`}>
              <rect fill="#709994" height="30" rx="4" width="43" />
              <rect fill="#d5e6dd" height="18" rx="2" width="33" x="5" y="5" />
              <path d="M21 30v6M10 37h22" stroke="#709994" strokeWidth="3" />
            </g>
          ))}
          <text fill="#536969" fontFamily="system-ui" fontSize="12" textAnchor="middle" x="329" y="181">
            Independent copies
          </text>
        </svg>
      </div>
      <div className="demo-buttons">
        <button
          className="btn primary small"
          disabled={released}
          onClick={() => setReleased(true)}
          type="button"
        >
          <FieldIcon name="network" />
          Release the model
        </button>
        <button
          className="btn small"
          disabled={!released || recalled}
          onClick={() => setRecalled(true)}
          type="button"
        >
          <FieldIcon name="reset" />
          Attempt recall
        </button>
        <button aria-label="Reset illustration" className="icon-btn" onClick={handleReset} type="button">
          <FieldIcon name="reset" />
        </button>
      </div>
      <p aria-live="polite" className="demo-message">
        {message}
      </p>
    </>
  );
}
