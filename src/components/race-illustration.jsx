import { useCallback, useEffect, useRef, useState } from "react";
import useGuideStore from "../hooks/use-guide-store.js";
import usePauseSignal from "../hooks/use-pause-signal.js";
import FieldIcon from "./field-icon.jsx";
import RaceCarMark from "./race-car-mark.jsx";
import "./race-illustration.scss";

const LANES = [ "AI labs", "Companies", "Nations", "Startups" ];
const BIAS = [ 0.1, -0.08, 0.17, -0.15 ];
const CAR_WIDTH = 48;

const DIAL_STOPS = [
  { id: "myth", label: "Myth", hint: "It cannot happen.", speed: 1.65, gate: false },
  { id: "fable", label: "Fable", hint: "A tale for other people.", speed: 1.25, gate: false },
  { id: "omen", label: "Omen", hint: "The sky is trying to speak.", speed: 1, gate: false },
  { id: "oracle", label: "Oracle", hint: "The warning has a source.", speed: 0.7, gate: true },
  { id: "fate", label: "Fate", hint: "Unless the rules change.", speed: 0.42, gate: true },
];

// Element 2A. An illustration of incentives, not a model of accident probabilities.
export default function RaceIllustration() {
  const { reducedMotion } = useGuideStore();
  const [ playing, setPlaying ] = useState(false);
  const [ dialIndex, setDialIndex ] = useState(2);
  const [ offsets, setOffsets ] = useState([ 0, 0, 0, 0 ]);
  const [ trackWidth, setTrackWidth ] = useState(200);
  const [ message, setMessage ] = useState("Individually rational. Collectively risky.");
  const [ hasRun, setHasRun ] = useState(false);

  const dial = DIAL_STOPS[dialIndex];
  const checkpoint = dial.gate;

  const lanesRef = useRef(null);
  const trackRefs = useRef([]);
  const playingRef = useRef(false);
  const elapsedRef = useRef(0);
  const lastRef = useRef(0);
  const lastPaintRef = useRef(0);
  const frameRef = useRef(0);
  const checkpointRef = useRef(checkpoint);
  const speedRef = useRef(dial.speed);
  const reducedRef = useRef(reducedMotion);
  const tickRef = useRef(null);

  useEffect(() => {
    checkpointRef.current = checkpoint;
    speedRef.current = dial.speed;
  }, [ checkpoint, dial.speed ]);

  useEffect(() => {
    reducedRef.current = reducedMotion;
  }, [ reducedMotion ]);

  const handlePause = useCallback(() => {
    playingRef.current = false;
    setPlaying(false);
    cancelAnimationFrame(frameRef.current);
  }, []);

  usePauseSignal(handlePause);

  useEffect(() => {
    const tracks = trackRefs.current.filter(Boolean);
    if (!tracks.length) return undefined;
    const observer = new ResizeObserver(() => {
      setTrackWidth(trackRefs.current[0]?.clientWidth || 200);
    });
    tracks.forEach((track) => observer.observe(track));
    setTrackWidth(tracks[0].clientWidth || 200);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => cancelAnimationFrame(frameRef.current), []);

  const measureOffsets = useCallback((elapsed, withCheckpoint) => {
    const lanesNode = lanesRef.current;
    if (!lanesNode) return [ 0, 0, 0, 0 ];
    const raceRect = lanesNode.getBoundingClientRect();

    return LANES.map((_, index) => {
      const track = trackRefs.current[index];
      if (!track) return 0;
      const distance = Math.max(0, track.clientWidth - CAR_WIDTH);
      if (withCheckpoint) {
        const trackRect = track.getBoundingClientRect();
        const cap = raceRect.width * 0.8 - (trackRect.left - raceRect.left) - CAR_WIDTH - 5;
        return Math.min(
          (elapsed / 6200) * (1 + BIAS[index]) * distance,
          Math.max(0, cap),
        );
      }
      const phase = ((elapsed / 6200) * (1 + BIAS[index])) % 1;
      return phase * distance;
    });
  }, []);

  useEffect(() => {
    tickRef.current = (now) => {
      if (!playingRef.current) return;
      elapsedRef.current += Math.min(120, now - lastRef.current) * speedRef.current;
      lastRef.current = now;
      if (now - lastPaintRef.current > (reducedRef.current ? 500 : 30)) {
        setOffsets(measureOffsets(elapsedRef.current, checkpointRef.current));
        lastPaintRef.current = now;
      }
      if (checkpointRef.current && elapsedRef.current > 6500) {
        handlePause();
        setHasRun(true);
        setOffsets(measureOffsets(elapsedRef.current, true));
        setMessage(
          "All four lanes face the checkpoint. In practice, participation and enforceability are the hard parts.",
        );
        return;
      }
      frameRef.current = requestAnimationFrame((time) => tickRef.current(time));
    };
  }, [ handlePause, measureOffsets ]);

  function handleToggleRace() {
    if (playingRef.current) {
      handlePause();
      setHasRun(true);
      return;
    }
    elapsedRef.current = 0;
    playingRef.current = true;
    setPlaying(true);
    lastRef.current = performance.now();
    setMessage(
      checkpoint
        ? "A shared rule applies to each lane. This is an illustration, not a policy impact estimate."
        : "Each actor has an incentive to move faster. The illustration does not model accident probabilities.",
    );
    frameRef.current = requestAnimationFrame((time) => tickRef.current(time));
  }

  function handleDial(index) {
    const next = DIAL_STOPS[index];
    setDialIndex(index);
    elapsedRef.current = 0;
    setHasRun(false);
    setOffsets(measureOffsets(0, next.gate));
    setMessage(`${next.label}: ${next.hint} Press play to see the difference.`);
  }

  const playLabel = playing ? "Pause the race" : hasRun ? "Run again" : "Run the race";
  const dialAngle = -120 + (dialIndex / (DIAL_STOPS.length - 1)) * 240;

  return (
    <>
      <div className={`race-scene${checkpoint ? " has-checkpoint" : ""}`}>
        <div className="race-caption">
          <span>“We can’t afford to fall behind.”</span>
          <FieldIcon name="clock" />
        </div>
        <div className="race-lanes" ref={lanesRef}>
          {LANES.map((name, index) => (
            <div className="race-lane" key={name}>
              <span>{name}</span>
              <div
                className="race-track"
                ref={(node) => {
                  trackRefs.current[index] = node;
                }}
              >
                <svg
                  aria-hidden="true"
                  className="race-car-layer"
                  viewBox={`0 0 ${Math.max(trackWidth, CAR_WIDTH)} 31`}
                >
                  <g transform={`translate(${offsets[index]} 0)`}>
                    <RaceCarMark />
                  </g>
                </svg>
              </div>
            </div>
          ))}
          <div className="race-gate">
            <span>
              SHARED
              <br />
              CHECKPOINT
            </span>
          </div>
        </div>
      </div>

      <div className="race-dial" role="group" aria-label="How seriously the field treats the risk">
        <div className="dial-face">
          <svg aria-hidden="true" viewBox="0 0 160 120">
            <path d="M20 96 A60 60 0 1 1 140 96" fill="none" stroke="var(--border-strong)" strokeWidth="10" />
            <line
              stroke="var(--accent-red)"
              strokeLinecap="round"
              strokeWidth="4"
              transform={`rotate(${dialAngle} 80 96)`}
              x1="80"
              x2="80"
              y1="96"
              y2="42"
            />
            <circle cx="80" cy="96" fill="var(--text)" r="6" />
          </svg>
          <strong>{dial.label}</strong>
          <small>{dial.hint}</small>
        </div>
        <label className="dial-slider">
          <span className="eyebrow">Arcane setting</span>
          <input
            aria-valuetext={dial.label}
            max={DIAL_STOPS.length - 1}
            min="0"
            onChange={(event) => handleDial(Number(event.target.value))}
            step="1"
            type="range"
            value={dialIndex}
          />
          <span className="dial-labels">
            {DIAL_STOPS.map((stop) => (
              <button
                className={stop.id === dial.id ? "is-active" : ""}
                key={stop.id}
                onClick={() => handleDial(DIAL_STOPS.indexOf(stop))}
                type="button"
              >
                {stop.label}
              </button>
            ))}
          </span>
        </label>
      </div>

      <div className="race-controls">
        <button
          className={`btn play-spark${playing ? " is-playing" : ""}`}
          onClick={handleToggleRace}
          type="button"
        >
          <FieldIcon name={playing ? "pause" : "play"} />
          {playLabel}
        </button>
        <p className="race-dial-note">
          {checkpoint ? "The dial has raised a shared checkpoint." : "No shared gate while the risk is still a story."}
        </p>
      </div>
      <p aria-live="polite" className="demo-message">
        {message}
      </p>
    </>
  );
}
