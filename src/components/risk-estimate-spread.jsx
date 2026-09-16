import { useState } from "react";
import { riskEstimateSpread } from "../data/risk-data.js";
import "./risk-estimate-spread.scss";

// Element 2D. Deliberately plots the spread rather than a single median, so the panel reads as
// "even the optimists are not at zero" instead of as one alarming number. Each study's band is
// a button; the readout carries the exact question that was asked, which is where most of the
// apparent disagreement between surveys actually lives.
export default function RiskEstimateSpread() {
  const [ activeStudyId, setActiveStudyId ] = useState(riskEstimateSpread.studies[0].id);
  const activeStudy = riskEstimateSpread.studies.find((study) => study.id === activeStudyId);

  return (
    <div className="risk-estimate-spread">
      <p className="spread-headline-value">
        <span className="spread-value-number">{riskEstimateSpread.headlineValue}</span>
        <span className="spread-value-label">{riskEstimateSpread.headlineLabel}</span>
      </p>

      <div className="spread-caveat-card">
        <p className="caveat-card-title">{riskEstimateSpread.caveatTitle}</p>
        <p className="caveat-card-body">{riskEstimateSpread.caveatBody}</p>
      </div>

      <ul className="spread-study-rows">
        {riskEstimateSpread.studies.map((study) => (
          <li key={study.id}>
            <button
              aria-pressed={study.id === activeStudyId}
              className={`study-rows-button${study.id === activeStudyId ? " is-active" : ""}`}
              onClick={() => setActiveStudyId(study.id)}
              onMouseEnter={() => setActiveStudyId(study.id)}
              type="button"
            >
              <span className="rows-button-label">{study.label}</span>
              <span className="rows-button-track">
                <span
                  className="button-track-band"
                  style={{
                    insetInlineStart: `${study.lowPercent}%`,
                    inlineSize: `${Math.max(study.highPercent - study.lowPercent, 1.5)}%`,
                  }}
                />
              </span>
              <span className="rows-button-value">
                {study.lowPercent === study.highPercent
                  ? `${study.lowPercent}%`
                  : `${study.lowPercent}–${study.highPercent}%`}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <ul aria-hidden="true" className="spread-axis-ticks">
        {riskEstimateSpread.axisTicks.map((tick) => (
          <li className="axis-ticks-item" key={tick}>
            {tick}%
          </li>
        ))}
      </ul>

      <div aria-live="polite" className="readout-strip-frame spread-readout-strip">
        <p className="readout-study-question">{activeStudy.question}</p>
        <p className="readout-study-meta">
          {activeStudy.population} — {activeStudy.note}
        </p>
        <p className="readout-study-source">
          {activeStudy.url ? (
            <a
              className="study-source-link"
              href={activeStudy.url}
              rel="noreferrer"
              target="_blank"
            >
              {activeStudy.source}
            </a>
          ) : (
            activeStudy.source
          )}
        </p>
      </div>

      <p className="spread-footnote-text">{riskEstimateSpread.footnote}</p>
    </div>
  );
}
