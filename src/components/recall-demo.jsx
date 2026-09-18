import { useEffect, useRef, useState } from "react";
import useGuideStore from "../hooks/use-guide-store.js";
import FieldIcon from "./field-icon.jsx";
import "./recall-demo.scss";

const REELS = [
  { id: "origin", idle: "ORIGINAL", released: "COPIED", recalled: "RECALLED" },
  { id: "copy-a", idle: "EMPTY", released: "AT LARGE", recalled: "AT LARGE" },
  { id: "copy-b", idle: "EMPTY", released: "AT LARGE", recalled: "AT LARGE" },
  { id: "copy-c", idle: "EMPTY", released: "AT LARGE", recalled: "AT LARGE" },
];

const SPIN_MS = 1100;

// Element 1D. A casino roll: releasing weights is easy; recalling them does not retrieve the copies.
export default function RecallDemo() {
  const { reducedMotion } = useGuideStore();
  const [ phase, setPhase ] = useState("idle");
  const [ spinning, setSpinning ] = useState(false);
  const spinTimer = useRef(0);

  useEffect(() => () => window.clearTimeout(spinTimer.current), []);

  function rollTo(nextPhase) {
    if (reducedMotion) {
      setSpinning(false);
      setPhase(nextPhase);
      return;
    }
    setSpinning(true);
    window.clearTimeout(spinTimer.current);
    spinTimer.current = window.setTimeout(() => {
      setSpinning(false);
      setPhase(nextPhase);
    }, SPIN_MS);
  }

  function handleReset() {
    window.clearTimeout(spinTimer.current);
    setSpinning(false);
    setPhase("idle");
  }

  let message = "Pull the lever. Release the weights, then try to recall them.";
  if (phase === "recalled") {
    message = "The house can take the original back. The copies still pay out — somewhere else.";
  } else if (phase === "released") {
    message = "The weights are on the floor. Now try to recall them.";
  }

  return (
    <div className={`recall-casino${spinning ? " is-spinning" : ""} phase-${phase}`}>
      <div className="casino-marquee" aria-hidden="true">
        <span>RELEASE</span>
        <span>·</span>
        <span>COPY</span>
        <span>·</span>
        <span>RECALL?</span>
        <span>·</span>
        <span>HOUSE EDGE</span>
      </div>

      <div className="casino-window">
        {REELS.map((reel, index) => (
          <div className={`casino-reel reel-${reel.id}`} key={reel.id} style={{ "--reel-delay": `${index * 90}ms` }}>
            <div className="reel-strip">
              <span>{reel.idle}</span>
              <span>{reel.released}</span>
              <span>{reel.recalled}</span>
              <span>{reel.idle}</span>
            </div>
            <strong>{reel[phase] ?? reel.idle}</strong>
          </div>
        ))}
      </div>

      <div className="casino-payout">
        <span className="payout-chip">Original</span>
        <span className="payout-chip is-copy">Independent copies</span>
      </div>

      <div className="demo-buttons casino-buttons">
        <button
          className="btn primary"
          disabled={phase !== "idle" || spinning}
          onClick={() => rollTo("released")}
          type="button"
        >
          <FieldIcon name="spark" />
          Release the model
        </button>
        <button
          className="btn yellow"
          disabled={phase !== "released" || spinning}
          onClick={() => rollTo("recalled")}
          type="button"
        >
          <FieldIcon name="reset" />
          Attempt recall
        </button>
        <button aria-label="Reset illustration" className="icon-btn bordered" onClick={handleReset} type="button">
          <FieldIcon name="reset" />
        </button>
      </div>
      <p aria-live="polite" className="demo-message">
        {message}
      </p>
    </div>
  );
}
