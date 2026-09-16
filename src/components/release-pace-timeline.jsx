import { useState } from "react";
import { modelReleaseCadence } from "../data/pressure-data.js";
import PlaceholderFigure from "./placeholder-figure.jsx";
import "./release-pace-timeline.scss";

// Element 1C. One block per major model release, grouped by year, so the thickening of the bars
// carries the argument. Hovering or focusing a block names the release.

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const ORG_TONES = {
  OpenAI: "tone-openai",
  Anthropic: "tone-anthropic",
  "Google DeepMind": "tone-google",
  Meta: "tone-meta",
  xAI: "tone-xai",
  DeepSeek: "tone-deepseek",
};

export default function ReleasePaceTimeline() {
  const [ activeRelease, setActiveRelease ] = useState(null);

  return (
    <div className="release-pace-timeline">
      <ul className="timeline-year-rows">
        {modelReleaseCadence.years.map((year) => (
          <li className="year-rows-entry" key={year.year}>
            <p className="rows-entry-year">{year.year}</p>
            <ul className="rows-entry-blocks">
              {year.releases.map((release) => (
                <li className="entry-blocks-cell" key={`${release.month}-${release.label}`}>
                  <button
                    className={`entry-blocks-item ${ORG_TONES[release.org] || ""}`}
                    onBlur={() => setActiveRelease(null)}
                    onClick={() => setActiveRelease(release)}
                    onFocus={() => setActiveRelease(release)}
                    onMouseEnter={() => setActiveRelease(release)}
                    type="button"
                  >
                    <span className="blocks-item-label">
                      {MONTH_NAMES[release.month - 1]} {release.label}
                    </span>
                  </button>
                </li>
              ))}
              {year.isIncomplete ? <li className="entry-blocks-gap" /> : null}
            </ul>
          </li>
        ))}
      </ul>

      {modelReleaseCadence.years.some((year) => year.isIncomplete) ? (
        <p className="timeline-gap-note">
          {modelReleaseCadence.years.find((year) => year.isIncomplete).incompleteNote}
        </p>
      ) : null}

      <p aria-live="polite" className="readout-strip-frame timeline-readout-strip">
        {activeRelease ? (
          <>
            <span className="readout-release-name">{activeRelease.label}</span>
            <span className="readout-release-meta">
              {activeRelease.org} — {MONTH_NAMES[activeRelease.month - 1]}
            </span>
          </>
        ) : (
          <span className="readout-release-meta">{modelReleaseCadence.caption}</span>
        )}
      </p>

      <div className="timeline-audio-idea">
        <PlaceholderFigure imageId="popcorn-pop" shape="icon" />
        <p className="audio-idea-text">
          <span className="idea-text-label">{modelReleaseCadence.audioIdea}</span>
          <span className="idea-text-note">
            The data note wants this playable: popcorn in a microwave, one pop per release, with a
            guitar solo over the single month that had none.
          </span>
        </p>
      </div>
    </div>
  );
}
