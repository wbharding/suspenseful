import { useState } from "react";
import { surveyHeadline, surveyQuestions } from "../data/survey-data.js";
import useElementWidth from "../hooks/use-element-width.js";
import useGuideStore from "../hooks/use-guide-store.js";
import FieldIcon from "./field-icon.jsx";

// Element 2D. Grace et al. 2023. The 38–51% headline is the share assigning ≥10% to
// extinction-level outcomes, not P(catastrophe). The connecting line is not a CI.
export default function SurveyChart() {
  const [ index, setIndex ] = useState(0);
  const [ chartRef, width ] = useElementWidth();
  const selected = surveyQuestions[index];
  const compact = width > 0 && width < 430;
  const chartWidth = compact ? 360 : 610;
  const chartHeight = compact ? 201 : 153;
  const left = compact ? 18 : 182;
  const right = 15;

  function xFor(percent) {
    return left + (percent / 100) * (chartWidth - left - right);
  }

  return (
    <div className="survey-layout">
      <div className="survey-callout">
        <span className="eyebrow">2023 researcher survey</span>
        <strong>
          {surveyHeadline.range}
          <span>%</span>
        </strong>
        <p>
          of respondents assigned <b>at least a 10% chance</b> to extinction-level outcomes,
          depending on the wording.
        </p>
        <div className="survey-warning">
          <FieldIcon name="info" />
          <span>
            This is <b>not</b> a 38–51% probability of catastrophe.
          </span>
        </div>
      </div>

      <div className="survey-interactive" ref={chartRef}>
        <label className="field-label" htmlFor="survey-question">
          Explore a question framing
        </label>
        <select
          id="survey-question"
          onChange={(event) => setIndex(Number(event.target.value))}
          value={index}
        >
          {surveyQuestions.map((question, questionIndex) => (
            <option key={question.id} value={questionIndex}>
              {question.label}
            </option>
          ))}
        </select>

        <p className="survey-question-copy">{selected.question}.</p>
        <div className="survey-stat-row">
          <div>
            <small>Median estimate</small>
            {selected.median}%
          </div>
          <div>
            <small>Mean estimate</small>
            {selected.mean}%
          </div>
          <span>{selected.n.toLocaleString()} respondents</span>
        </div>

        {width > 0 ? (
          <svg
            aria-label={`Across three question framings, median estimates range from 5 to 10 percent and means from 14.4 to 19.4 percent. The selected question has median ${selected.median} and mean ${selected.mean} percent.`}
            role="img"
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          >
            {surveyQuestions.map((question, questionIndex) => {
              const y = compact ? 35 + questionIndex * 58 : 22 + questionIndex * 43;
              const isActive = questionIndex === index;
              return (
                <g key={question.id} opacity={isActive ? "1" : ".48"}>
                  <text
                    fill="#556959"
                    fontSize="11"
                    x={compact ? left : 0}
                    y={compact ? y - 15 : y + 4}
                  >
                    {question.label}
                  </text>
                  <path
                    d={`M${left} ${y}H${chartWidth - right}`}
                    stroke="#e1e3d7"
                    strokeLinecap="round"
                    strokeWidth="7"
                  />
                  <path
                    d={`M${xFor(question.median)} ${y}H${xFor(question.mean)}`}
                    stroke="#c99982"
                    strokeWidth="3"
                  />
                  <circle
                    cx={xFor(question.median)}
                    cy={y}
                    fill="#b26356"
                    r="6"
                    stroke="#fffefa"
                    strokeWidth="1.5"
                  />
                  <path
                    d={`m${xFor(question.mean)} ${y - 6} 6 6-6 6-6-6Z`}
                    fill="#fffefa"
                    stroke="#244e48"
                    strokeWidth="2"
                  />
                </g>
              );
            })}
            {[ 0, 25, 50, 75, 100 ].map((tick) => (
              <text
                fill="#748572"
                fontSize="10"
                key={tick}
                textAnchor="middle"
                x={xFor(tick)}
                y={chartHeight - 5}
              >
                {tick}%
              </text>
            ))}
          </svg>
        ) : null}

        <div className="survey-legend">
          <span>
            <i className="median-dot" /> Median estimate
          </span>
          <span>
            <i className="mean-dot" /> Mean estimate
          </span>
        </div>
        <p className="micro">
          Summary statistics, not a fabricated distribution of individual responses. These are
          beliefs, not observed frequencies.
        </p>
      </div>
    </div>
  );
}

export function SurveyChartFooter() {
  const { openDialog } = useGuideStore();

  return (
    <button
      className="text-btn"
      onClick={() =>
        openDialog({ type: "survey-data", kicker: "DATA TABLE · SUBJECTIVE BELIEFS" })
      }
      type="button"
    >
      View exact data <FieldIcon name="arrow" />
    </button>
  );
}
