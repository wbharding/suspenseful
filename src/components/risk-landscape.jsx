import { useRef, useState } from "react";
import { riskLandscape } from "../data/risk-landscape-data.js";
import useGuideStore from "../hooks/use-guide-store.js";
import FieldIcon from "./field-icon.jsx";
import "./risk-landscape.scss";

const SLICE = 360 / riskLandscape.length;

function randomLanding(count) {
  return {
    index: Math.floor(Math.random() * count),
    turns: 5 + Math.floor(Math.random() * 3),
  };
}

// Element 2B. Five harms on a spinner. Year keys jump; a spin lands a jewel that flips.
export default function RiskLandscape() {
  const { openDialog, reducedMotion } = useGuideStore();
  const [ index, setIndex ] = useState(0);
  const [ rotation, setRotation ] = useState(-SLICE / 2);
  const [ flipped, setFlipped ] = useState(false);
  const [ spinning, setSpinning ] = useState(false);
  const spinTimer = useRef(0);

  const risk = riskLandscape[index];

  function landOn(nextIndex, extraTurns = 0) {
    const next = ((nextIndex % riskLandscape.length) + riskLandscape.length) % riskLandscape.length;
    const target = extraTurns * 360 - next * SLICE - SLICE / 2;
    setSpinning(extraTurns > 0);
    setFlipped(false);
    setRotation(target);
    window.clearTimeout(spinTimer.current);
    const delay = reducedMotion || extraTurns === 0 ? 0 : 1600;
    spinTimer.current = window.setTimeout(() => {
      setIndex(next);
      setSpinning(false);
      setFlipped(true);
    }, delay);
  }

  function handleSpin() {
    if (spinning) return;
    const landing = randomLanding(riskLandscape.length);
    landOn(landing.index, landing.turns);
  }

  function handleKey(nextIndex) {
    if (spinning) return;
    landOn(nextIndex, reducedMotion ? 0 : 1);
  }

  function handleOpen() {
    openDialog({
      type: "risk-explainer",
      index,
      kicker: `${risk.year} · IN HIS OWN WORDS`,
    });
  }

  return (
    <div className="harm-roulette">
      <div className="roulette-stage">
        <div className="roulette-pointer" aria-hidden="true" />
        <div
          aria-hidden="true"
          className={`roulette-wheel${spinning ? " is-spinning" : ""}`}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {riskLandscape.map((item, itemIndex) => (
            <span
              className={`roulette-slice tone-${item.tone}`}
              key={item.title}
              style={{ "--slice": itemIndex }}
            >
              <b>{item.year}</b>
            </span>
          ))}
        </div>

        <button
          aria-expanded={flipped}
          className={`harm-jewel${flipped ? " is-flipped" : ""} tone-${risk.tone}`}
          onClick={() => (flipped ? handleOpen() : setFlipped(true))}
          type="button"
        >
          <span className="jewel-face jewel-front">
            <span className="eyebrow">{index + 1} of {riskLandscape.length}</span>
            <strong>{risk.year}</strong>
            <span>{risk.title}</span>
          </span>
          <span className="jewel-face jewel-back">
            <span className="eyebrow">The other side</span>
            <span>{risk.explainer.lede}</span>
            <small>Open the full account</small>
          </span>
        </button>
      </div>

      <div className="roulette-controls">
        <button className="btn play-spark" disabled={spinning} onClick={handleSpin} type="button">
          <FieldIcon name="spark" />
          Spin the harms
        </button>
        <p>
          {risk.explainer.label} · {risk.year}. Timing remains uncertain; the year is a reading cue,
          not a forecast.
        </p>
      </div>

      <div aria-label="Choose a harm by year" className="year-keys" role="group">
        {riskLandscape.map((item, itemIndex) => (
          <button
            aria-pressed={itemIndex === index}
            className={`year-key tone-${item.tone}${itemIndex === index ? " is-active" : ""}`}
            key={item.year}
            onClick={() => handleKey(itemIndex)}
            type="button"
          >
            <span>{item.year}</span>
            <small>{item.title}</small>
          </button>
        ))}
      </div>
    </div>
  );
}
