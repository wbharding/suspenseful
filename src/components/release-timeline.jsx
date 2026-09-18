import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import popcornBucket from "../assets/popcorn-bucket.svg";
import { modelReleases, providerSlug, releaseProviders } from "../data/release-data.js";
import { siteMeta } from "../data/site-meta.js";
import useGuideStore from "../hooks/use-guide-store.js";
import usePauseSignal from "../hooks/use-pause-signal.js";
import {
  dateMs,
  monthYearLabel,
  releaseDateLabel,
  yearMonthFromMs,
  yearMonthKey,
} from "../lib/format.js";
import { disablePopSound, enablePopSound, playPopSound } from "../lib/pop-sound.js";
import FieldIcon from "./field-icon.jsx";

const MONTH_NAMES = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
const KERNEL_VARIANTS = [ "k0", "k1", "k2", "k3", "k4", "k5", "k6", "k7", "k8", "k9", "k10", "k11" ];

// @param {object} release
// @returns {string}
function releaseTooltip(release) {
  const when = releaseDateLabel(release);
  if (release.status === "announced") {
    return `${release.name} · ${when} · ${release.provider} · announced, not confirmed shipped`;
  }
  return `${release.name} · ${when} · ${release.provider}`;
}

// Element 1C. A seven-lab catalog of dated releases, played as a cadence rather than counted as
// a capability score. Sound starts only when the reader turns it on.
export default function ReleaseTimeline({ onFilterChange }) {
  const { reducedMotion, openDialog, showToast } = useGuideStore();
  const start = dateMs(siteMeta.timelineStart);
  const end = dateMs(siteMeta.timelineEnd);

  const [ providers, setProviders ] = useState(() => new Set(releaseProviders));
  const [ speed, setSpeed ] = useState(1);
  const [ soundOn, setSoundOn ] = useState(false);
  const [ playing, setPlaying ] = useState(false);
  const [ pos, setPos ] = useState(start);
  const [ flashIds, setFlashIds ] = useState(() => new Set());
  const [ kernels, setKernels ] = useState([]);
  const [ isPopping, setIsPopping ] = useState(false);

  const posRef = useRef(start);
  const playingRef = useRef(false);
  const speedRef = useRef(1);
  const soundRef = useRef(false);
  const lastRef = useRef(0);
  const paintRef = useRef(0);
  const frameRef = useRef(0);
  const kernelSeq = useRef(0);
  const reducedRef = useRef(reducedMotion);
  const eventsRef = useRef([]);
  const tickRef = useRef(null);

  const events = useMemo(
    () => modelReleases
      .filter((release) => providers.has(release.provider))
      .sort((a, b) => dateMs(a.date) - dateMs(b.date) || a.id.localeCompare(b.id)),
    [ providers ],
  );

  useEffect(() => {
    speedRef.current = speed;
  }, [ speed ]);

  useEffect(() => {
    soundRef.current = soundOn;
  }, [ soundOn ]);

  useEffect(() => {
    reducedRef.current = reducedMotion;
  }, [ reducedMotion ]);

  useEffect(() => {
    eventsRef.current = events;
  }, [ events ]);

  const handlePause = useCallback(() => {
    playingRef.current = false;
    setPlaying(false);
    cancelAnimationFrame(frameRef.current);
  }, []);

  usePauseSignal(handlePause);

  useEffect(() => () => {
    cancelAnimationFrame(frameRef.current);
    disablePopSound();
  }, []);

  const spawnPop = useCallback((release, clusterSize = 1) => {
    setFlashIds((current) => {
      const next = new Set(current);
      next.add(release.id);
      return next;
    });
    window.setTimeout(() => {
      setFlashIds((current) => {
        const next = new Set(current);
        next.delete(release.id);
        return next;
      });
    }, 700);

    if (reducedRef.current) return;

    setIsPopping(false);
    window.requestAnimationFrame(() => setIsPopping(true));
    window.setTimeout(() => setIsPopping(false), 220);

    const kernelCount = clusterSize > 4 ? 2 : 4;
    const nextKernels = Array.from({ length: kernelCount }, () => {
      kernelSeq.current += 1;
      return {
        id: kernelSeq.current,
        variant: KERNEL_VARIANTS[Math.floor(Math.random() * KERNEL_VARIANTS.length)],
      };
    });
    setKernels((current) => [ ...current, ...nextKernels ]);
    window.setTimeout(() => {
      const ids = new Set(nextKernels.map((kernel) => kernel.id));
      setKernels((current) => current.filter((kernel) => !ids.has(kernel.id)));
    }, 950);
  }, []);

  useEffect(() => {
    tickRef.current = (now) => {
      if (!playingRef.current) return;
      const previous = posRef.current;
      const elapsed = Math.min(now - lastRef.current, 120);
      lastRef.current = now;
      const nextPos = Math.min(
        end,
        posRef.current + (elapsed / 32000) * (end - start) * speedRef.current,
      );
      posRef.current = nextPos;

      const crossed = eventsRef.current.filter(
        (release) => dateMs(release.date) > previous && dateMs(release.date) <= nextPos,
      );
      if (crossed.length) {
        crossed.forEach((release, index) => {
          if (soundRef.current) playPopSound(index * 0.055);
          spawnPop(release, crossed.length);
        });
        setPos(nextPos);
      } else if (now - paintRef.current > 90) {
        setPos(nextPos);
        paintRef.current = now;
      }

      if (nextPos >= end) {
        posRef.current = start;
        setPos(start);
        setFlashIds(new Set());
        setKernels([]);
        showToast("Back at the start. After the frog boiled, 2024 looks quiet.");
        lastRef.current = now;
        frameRef.current = requestAnimationFrame((time) => tickRef.current(time));
        return;
      }
      frameRef.current = requestAnimationFrame((time) => tickRef.current(time));
    };
  }, [ end, start, handlePause, showToast, spawnPop ]);

  function handlePlay() {
    if (!events.length) return;
    if (playingRef.current) {
      handlePause();
      return;
    }
    if (posRef.current >= end) {
      posRef.current = start;
      setPos(start);
    }
    playingRef.current = true;
    setPlaying(true);
    lastRef.current = performance.now();
    paintRef.current = 0;
    frameRef.current = requestAnimationFrame((time) => tickRef.current(time));
  }

  function handleReset() {
    handlePause();
    posRef.current = start;
    setPos(start);
    setKernels([]);
    setFlashIds(new Set());
    setIsPopping(false);
  }

  async function handleSound() {
    if (soundOn) {
      setSoundOn(false);
      return;
    }
    try {
      await enablePopSound();
      setSoundOn(true);
    } catch {
      setSoundOn(false);
      showToast("Audio is unavailable here. Visual playback still works.");
    }
  }

  function handleScrub(value) {
    handlePause();
    const next = start + (Number(value) / 1000) * (end - start);
    posRef.current = next;
    setPos(next);
  }

  function handleToggleProvider(provider) {
    const next = new Set(providers);
    if (next.has(provider)) next.delete(provider);
    else next.add(provider);
    if (next.size === 0) handlePause();
    setProviders(next);
    onFilterChange?.([ ...next ]);
  }

  function handleOpenRelease(id) {
    openDialog({
      type: "release-info",
      id,
      providers: [ ...providers ],
      kicker: "ONE BLOCK. ONE DATED EVENT.",
    });
  }

  const passed = events.filter((release) => dateMs(release.date) <= pos);
  const currentMonth = yearMonthFromMs(pos);
  const playLabel = pos >= end
    ? "Play again"
    : pos > start
      ? "Resume the releases"
      : "Play the releases";

  let nowPlaying;
  if (!events.length) {
    nowPlaying = (
      <>
        <span>No providers selected.</span>
        <small>Choose a provider to explore its releases.</small>
      </>
    );
  } else if (pos >= end) {
    nowPlaying = (
      <>
        <strong>End of this catalog.</strong>
        <small>Release counts are not a capability measure.</small>
      </>
    );
  } else if (passed.length) {
    const last = passed.at(-1);
    nowPlaying = (
      <>
        <strong>{last.name}</strong>
        <small>
          {releaseDateLabel(last)} · {last.provider}
        </small>
      </>
    );
  } else {
    nowPlaying = (
      <>
        <span>Ready when you are.</span>
        <small>Sound starts only when you turn it on.</small>
      </>
    );
  }

  return (
    <div className="timeline-layout">
      <div className="timeline-main">
        <div className="timeline-toolbar">
          <div className="playback-controls">
            <button
              aria-label={playing ? "Pause release timeline" : "Play release timeline"}
              className={`btn play-spark${playing ? " is-playing" : ""}`}
              disabled={events.length === 0}
              onClick={handlePlay}
              type="button"
            >
              <FieldIcon name={playing ? "pause" : "play"} />
              <span>{playing ? "Pause playback" : playLabel}</span>
            </button>
            <button
              aria-label="Reset release playback"
              className="icon-btn bordered"
              onClick={handleReset}
              type="button"
            >
              <FieldIcon name="reset" />
            </button>
            <button
              aria-pressed={soundOn}
              className="btn small"
              onClick={handleSound}
              type="button"
            >
              <FieldIcon name={soundOn ? "sound" : "mute"} />
              <span>Sound {soundOn ? "on" : "off"}</span>
            </button>
          </div>
          <label className="compact-select">
            Speed{" "}
            <select
              aria-label="Playback speed"
              onChange={(event) => setSpeed(Number(event.target.value))}
              value={speed}
            >
              <option value="1">1×</option>
              <option value="2">2×</option>
              <option value="0.5">½×</option>
            </select>
          </label>
        </div>

        <div aria-label="Filter releases by provider" className="timeline-filters">
          {releaseProviders.map((provider) => {
            const isActive = providers.has(provider);
            return (
              <button
                aria-pressed={isActive}
                className={`filter-chip ${providerSlug(provider)}${isActive ? " active" : ""}`}
                key={provider}
                onClick={() => handleToggleProvider(provider)}
                type="button"
              >
                <i className="provider-dot" />
                {provider}
              </button>
            );
          })}
        </div>

        <div className="release-grid">
          {[ 2024, 2025, 2026 ].map((year) => (
            <div className="release-year" key={year}>
              <span className="year-label">{year}</span>
              <div className="months">
                {MONTH_NAMES.map((name, monthIndex) => {
                  const key = `${year}-${String(monthIndex + 1).padStart(2, "0")}`;
                  const isFuture = dateMs(`${key}-01`) > end;
                  const monthReleases = events.filter((release) =>
                    yearMonthKey(release.date) === key,
                  );
                  return (
                    <div
                      className={`month${isFuture ? " future" : ""}${key === currentMonth ? " current-month" : ""}`}
                      key={key}
                    >
                      <span className="month-name">{isFuture ? "" : name}</span>
                      <div className="release-events">
                        {monthReleases.map((release) => {
                          const popped = dateMs(release.date) <= pos;
                          const flashing = flashIds.has(release.id);
                          const tooltip = releaseTooltip(release);
                          return (
                            <button
                              aria-label={tooltip}
                              className={`release-event ${providerSlug(release.provider)}${popped ? " popped" : ""}${flashing ? " current" : ""}${release.provisional ? " provisional" : ""}${release.status === "announced" ? " announced" : ""}`}
                              data-tooltip={tooltip}
                              key={release.id}
                              onClick={() => handleOpenRelease(release.id)}
                              type="button"
                            />
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="scrub-row">
          <label htmlFor="timeline-scrub">Travel through time</label>
          <output>{monthYearLabel(pos)}</output>
        </div>
        <input
          aria-label="Timeline position"
          className="scrubber"
          id="timeline-scrub"
          max="1000"
          min="0"
          onInput={(event) => handleScrub(event.target.value)}
          step="1"
          type="range"
          value={Math.round(((pos - start) / (end - start)) * 1000)}
        />
        <div className="timeline-caption">
          <span>January 2024</span>
          <span>September 2026</span>
        </div>
        <p className="micro">
          Hover a block for the model name. Click it for sources. Empty months are empty{" "}
          <em>in this seven-lab catalog</em>, not necessarily in the industry.
        </p>
      </div>

      <aside className={`popcorn-stage${isPopping ? " is-popping" : ""}`}>
        <span className="stage-eyebrow">Hear the cadence</span>
        <div aria-hidden="true" id="pop-particles">
          {reducedMotion
            ? null
            : kernels.map((kernel) => (
                <i className={`pop-kernel ${kernel.variant}`} key={kernel.id} />
              ))}
        </div>
        <img alt="" className="popcorn-art" src={popcornBucket} />
        <div className="pop-count">
          <strong>{passed.length}</strong>
          <span>
            of <b>{events.length}</b> catalogued releases
          </span>
        </div>
        <div className="now-playing">{nowPlaying}</div>
        <p className="micro">
          A listening experience,
          <br />
          not a capability metric.
        </p>
      </aside>
    </div>
  );
}

export function ReleaseTimelineFooter({ providers }) {
  const { openDialog } = useGuideStore();

  return (
    <button
      className="text-btn"
      onClick={() =>
        openDialog({
          type: "release-data",
          providers: providers?.length ? providers : releaseProviders,
          kicker: "DATA TABLE · SEVEN-LAB CATALOG",
        })
      }
      type="button"
    >
      Browse / export releases <FieldIcon name="arrow" />
    </button>
  );
}
