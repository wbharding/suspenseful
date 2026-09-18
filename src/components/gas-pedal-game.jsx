import { useCallback, useEffect, useRef, useState } from "react";
import useGuideStore from "../hooks/use-guide-store.js";
import usePauseSignal from "../hooks/use-pause-signal.js";
import FieldIcon from "./field-icon.jsx";
import "./gas-pedal-game.scss";

const SAFE_LOW = 38;
const SAFE_HIGH = 62;
const SWAP_MS = 3200;
const DRIFT = 0.055;

// Element 1E. Commitments invert the controls: the pedal underfoot is not always the one you meant.
export default function GasPedalGame() {
  const { reducedMotion } = useGuideStore();
  const [ playing, setPlaying ] = useState(false);
  const [ speed, setSpeed ] = useState(50);
  const [ swapped, setSwapped ] = useState(false);
  const [ held, setHeld ] = useState(null);
  const [ secondsInLane, setSecondsInLane ] = useState(0);
  const [ message, setMessage ] = useState("Keep the needle in the green. The pedals will trade places.");

  const playingRef = useRef(false);
  const speedRef = useRef(50);
  const swappedRef = useRef(false);
  const heldRef = useRef(null);
  const frameRef = useRef(0);
  const lastRef = useRef(0);
  const lastSwapRef = useRef(0);
  const lastPaintRef = useRef(0);
  const laneMsRef = useRef(0);
  const tickRef = useRef(null);

  const handlePause = useCallback(() => {
    playingRef.current = false;
    setPlaying(false);
    heldRef.current = null;
    setHeld(null);
    cancelAnimationFrame(frameRef.current);
  }, []);

  usePauseSignal(handlePause);
  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  useEffect(() => {
    tickRef.current = (now) => {
      if (!playingRef.current) return;
      const elapsed = Math.min(48, now - lastRef.current);
      lastRef.current = now;

      if (now - lastSwapRef.current > SWAP_MS) {
        swappedRef.current = !swappedRef.current;
        lastSwapRef.current = now;
        setSwapped(swappedRef.current);
        setMessage(
          swappedRef.current
            ? "The labels flipped. Brake may now be gas."
            : "Pedals are honest — for the moment.",
        );
      }

      let next = speedRef.current + DRIFT * elapsed * 0.12;
      const hold = heldRef.current;
      if (hold === "gas") next += elapsed * 0.042;
      if (hold === "brake") next -= elapsed * 0.05;
      next = Math.max(8, Math.min(100, next));
      speedRef.current = next;

      if (next >= SAFE_LOW && next <= SAFE_HIGH) {
        laneMsRef.current += elapsed;
      }

      if (now - lastPaintRef.current > 40) {
        setSpeed(next);
        setSecondsInLane(Math.floor(laneMsRef.current / 1000));
        lastPaintRef.current = now;
      }

      frameRef.current = requestAnimationFrame((time) => tickRef.current(time));
    };
  }, []);

  function handleToggle() {
    if (playingRef.current) {
      handlePause();
      setMessage("Paused. Notice how little effort it took to drift too fast.");
      return;
    }
    playingRef.current = true;
    setPlaying(true);
    lastRef.current = performance.now();
    lastSwapRef.current = performance.now();
    setMessage("Hold a steady speed. Commitments keep adding throttle.");
    frameRef.current = requestAnimationFrame((time) => tickRef.current(time));
  }

  function handleReset() {
    handlePause();
    speedRef.current = 50;
    swappedRef.current = false;
    laneMsRef.current = 0;
    setSpeed(50);
    setSwapped(false);
    setSecondsInLane(0);
    setMessage("Keep the needle in the green. The pedals will trade places.");
  }

  function press(intent) {
    if (!playingRef.current) handleToggle();
    const actual = swappedRef.current ? (intent === "gas" ? "brake" : "gas") : intent;
    heldRef.current = actual;
    setHeld(actual);
  }

  function release() {
    heldRef.current = null;
    setHeld(null);
  }

  const inLane = speed >= SAFE_LOW && speed <= SAFE_HIGH;
  const leftIntent = swapped ? "brake" : "gas";
  const rightIntent = swapped ? "gas" : "brake";

  return (
    <div className={`gas-game${playing ? " is-playing" : ""}`}>
      <div className="gas-dash">
        <div className="gas-speedo" style={{ "--speed": speed }}>
          <svg aria-hidden="true" viewBox="0 0 120 78">
            <path d="M10 70 A50 50 0 0 1 110 70" fill="none" stroke="var(--border-strong)" strokeWidth="8" />
            <path d="M28 28 A50 50 0 0 1 92 28" fill="none" stroke="var(--accent-green)" strokeWidth="8" />
            <line
              stroke="var(--accent-red)"
              strokeLinecap="round"
              strokeWidth="3"
              transform={`rotate(${-90 + speed * 1.8} 60 70)`}
              x1="60"
              x2="60"
              y1="70"
              y2="24"
            />
            <circle cx="60" cy="70" fill="var(--text)" r="4" />
          </svg>
          <strong>{Math.round(speed)}</strong>
          <small>{inLane ? "In control" : speed > SAFE_HIGH ? "Too fast" : "Stalling"}</small>
        </div>
        <div className="gas-road" aria-hidden="true">
          <i className="gas-car" style={{ "--bob": playing && !reducedMotion ? `${speed / 40}s` : "0s" }} />
        </div>
      </div>

      <div className="gas-pedals">
        <button
          aria-pressed={held === (swapped ? "brake" : "gas")}
          className={`gas-pedal pedal-left is-${leftIntent}`}
          onPointerDown={() => press("gas")}
          onPointerLeave={release}
          onPointerUp={release}
          type="button"
        >
          {leftIntent === "gas" ? "Throttle" : "Brake"}
        </button>
        <button
          aria-pressed={held === (swapped ? "gas" : "brake")}
          className={`gas-pedal pedal-right is-${rightIntent}`}
          onPointerDown={() => press("brake")}
          onPointerLeave={release}
          onPointerUp={release}
          type="button"
        >
          {rightIntent === "gas" ? "Throttle" : "Brake"}
        </button>
      </div>

      <div className="demo-buttons">
        <button className="btn small primary" onClick={handleToggle} type="button">
          <FieldIcon name={playing ? "pause" : "play"} />
          {playing ? "Pause" : "Take the wheel"}
        </button>
        <button aria-label="Reset driving game" className="icon-btn bordered" onClick={handleReset} type="button">
          <FieldIcon name="reset" />
        </button>
        <span className="gas-score">{secondsInLane}s in the lane</span>
      </div>
      <p aria-live="polite" className="demo-message">
        {message}
      </p>
    </div>
  );
}
