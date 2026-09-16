import { useCallback, useEffect, useRef, useState } from "react";
import useGuideStore from "../hooks/use-guide-store.js";
import usePauseSignal from "../hooks/use-pause-signal.js";
import FieldIcon from "./field-icon.jsx";
import RaceCarMark from "./race-car-mark.jsx";

const LANES = [ "AI labs", "Companies", "Nations", "Startups" ];
const BIAS = [ 0.1, -0.08, 0.17, -0.15 ];
const CAR_WIDTH = 48;

// Element 2A. An illustration of incentives, not a model of accident probabilities.
export default function RaceIllustration() {
  const { reducedMotion } = useGuideStore();
  const [ playing, setPlaying ] = useState(false);
  const [ checkpoint, setCheckpoint ] = useState(false);
  const [ offsets, setOffsets ] = useState([ 0, 0, 0, 0 ]);
  const [ trackWidth, setTrackWidth ] = useState(200);
  const [ message, setMessage ] = useState("Individually rational. Collectively risky.");

  const [ hasRun, setHasRun ] = useState(false);

  const lanesRef = useRef(null);
  const trackRefs = useRef([]);
  const playingRef = useRef(false);
  const elapsedRef = useRef(0);
  const lastRef = useRef(0);
  const lastPaintRef = useRef(0);
  const frameRef = useRef(0);
  const checkpointRef = useRef(false);
  const reducedRef = useRef(reducedMotion);
  const tickRef = useRef(null);

  useEffect(() => {
    checkpointRef.current = checkpoint;
  }, [ checkpoint ]);

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
      elapsedRef.current += Math.min(120, now - lastRef.current);
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

  function handleCheckpoint(checked) {
    setCheckpoint(checked);
    elapsedRef.current = 0;
    setHasRun(false);
    setOffsets(measureOffsets(0, checked));
    setMessage(
      checked
        ? "One checkpoint, shared across lanes. Press play to see the difference."
        : "Individually rational. Collectively risky.",
    );
  }

  const playLabel = playing ? "Pause the race" : hasRun ? "Run again" : "Run the race";

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
      <div className="race-controls">
        <button className="btn small primary" onClick={handleToggleRace} type="button">
          <FieldIcon name={playing ? "pause" : "play"} />
          {playLabel}
        </button>
        <label className="switch-label">
          <input
            checked={checkpoint}
            onChange={(event) => handleCheckpoint(event.target.checked)}
            type="checkbox"
          />
          <span className="switch-track" />
          Shared checkpoint
        </label>
      </div>
      <p aria-live="polite" className="demo-message">
        {message}
      </p>
    </>
  );
}
