import { useState } from "react";
import { taskHorizonTrend } from "../data/pressure-data.js";
import "./task-horizon-chart.scss";

// Element 1A. Log-scale task-horizon curve: measured METR points as a solid line, the poster's
// 124-day doubling as a dashed projection past them.
//
// The chart itself is aria-hidden. Everything it shows is also reachable as a row of model
// buttons that drive the readout underneath, which is what makes this usable with a keyboard,
// a screen reader, or a thumb on a phone.

const VIEW_WIDTH = 340;
const VIEW_HEIGHT = 200;
const PLOT_INSET = { top: 14, right: 10, bottom: 26, left: 52 };
const DAYS_PER_MONTH = 30.44;
const BASE_YEAR = 2023;

// @param {string} yearMonth - "YYYY-MM"
// @returns {number} months since January of BASE_YEAR
function monthsSinceBase(yearMonth) {
  const [ year, month ] = yearMonth.split("-").map(Number);
  return (year - BASE_YEAR) * 12 + (month - 1);
}

// @param {number} minutes
// @returns {string} the same value in the largest unit that keeps it readable
function formatHorizon(minutes) {
  if (minutes < 60) return `${Math.round(minutes)} min`;
  if (minutes < 1440) return `${(minutes / 60).toFixed(1)} hours`;
  if (minutes < 14400) return `${(minutes / 1440).toFixed(1)} days`;
  return `${Math.round(minutes / 1440)} days`;
}

// Extends the measured series month by month at the fitted doubling rate.
// @returns {{date: string, minutes: number, monthIndex: number}[]}
function buildProjection() {
  const lastMeasured = taskHorizonTrend.measured[taskHorizonTrend.measured.length - 1];
  const startMonth = monthsSinceBase(lastMeasured.date);
  const endMonth = monthsSinceBase(taskHorizonTrend.projectThrough);
  const points = [];

  for (let monthIndex = startMonth; monthIndex <= endMonth; monthIndex += 1) {
    const elapsedDays = (monthIndex - startMonth) * DAYS_PER_MONTH;
    points.push({
      monthIndex,
      minutes: lastMeasured.minutes * 2 ** (elapsedDays / taskHorizonTrend.doublingDays),
    });
  }

  return points;
}

const PROJECTION_POINTS = buildProjection();
const MAX_MONTH = monthsSinceBase(taskHorizonTrend.projectThrough);
const MAX_MINUTES = taskHorizonTrend.axisTicks[taskHorizonTrend.axisTicks.length - 1].minutes;

function plotX(monthIndex) {
  const usableWidth = VIEW_WIDTH - PLOT_INSET.left - PLOT_INSET.right;
  return PLOT_INSET.left + (monthIndex / MAX_MONTH) * usableWidth;
}

function plotY(minutes) {
  const usableHeight = VIEW_HEIGHT - PLOT_INSET.top - PLOT_INSET.bottom;
  const ratio = Math.log10(minutes) / Math.log10(MAX_MINUTES);
  return VIEW_HEIGHT - PLOT_INSET.bottom - ratio * usableHeight;
}

const MEASURED_POINTS = taskHorizonTrend.measured.map((point) => ({
  ...point,
  monthIndex: monthsSinceBase(point.date),
}));

const YEAR_TICKS = [ 2023, 2024, 2025, 2026, 2027, 2028, 2029 ].filter(
  (year) => monthsSinceBase(`${year}-01`) <= MAX_MONTH,
);

// @param {{monthIndex: number, minutes: number}[]} points
function toPolyline(points) {
  return points.map((point) => `${plotX(point.monthIndex)},${plotY(point.minutes)}`).join(" ");
}

export default function TaskHorizonChart() {
  const [ activeModel, setActiveModel ] = useState(
    MEASURED_POINTS[MEASURED_POINTS.length - 1].model,
  );

  const projectedEnd = PROJECTION_POINTS[PROJECTION_POINTS.length - 1];
  const isProjectionActive = activeModel === "projection";
  const activePoint = MEASURED_POINTS.find((point) => point.model === activeModel);

  return (
    <div className="task-horizon-chart">
      <p className="chart-headline-value">
        <span className="chart-value-number">{taskHorizonTrend.headlineValue}</span>
        <span className="chart-value-label">{taskHorizonTrend.headlineLabel}</span>
      </p>

      <svg
        aria-hidden="true"
        className="chart-plot-area"
        focusable="false"
        viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
      >
        {taskHorizonTrend.axisTicks.map((tick) => (
          <g key={tick.minutes}>
            <line
              className="plot-grid-line"
              x1={PLOT_INSET.left}
              x2={VIEW_WIDTH - PLOT_INSET.right}
              y1={plotY(tick.minutes)}
              y2={plotY(tick.minutes)}
            />
            <text className="plot-axis-label" x={PLOT_INSET.left - 6} y={plotY(tick.minutes) + 3}>
              {tick.label}
            </text>
          </g>
        ))}

        {YEAR_TICKS.map((year) => (
          <text
            className="plot-axis-label align-center"
            key={year}
            x={plotX(monthsSinceBase(`${year}-01`))}
            y={VIEW_HEIGHT - PLOT_INSET.bottom + 14}
          >
            {year}
          </text>
        ))}

        <polyline className="plot-projection-line" points={toPolyline(PROJECTION_POINTS)} />
        <polyline className="plot-measured-line" points={toPolyline(MEASURED_POINTS)} />

        {MEASURED_POINTS.map((point) => (
          <circle
            className={`plot-measured-dot${point.model === activeModel ? " is-active" : ""}`}
            cx={plotX(point.monthIndex)}
            cy={plotY(point.minutes)}
            key={point.model}
            r={point.model === activeModel ? 5 : 3}
          />
        ))}

        <circle
          className={`plot-projected-dot${isProjectionActive ? " is-active" : ""}`}
          cx={plotX(projectedEnd.monthIndex)}
          cy={plotY(projectedEnd.minutes)}
          r={isProjectionActive ? 5 : 3}
        />
      </svg>

      <ul className="chart-model-chips">
        {MEASURED_POINTS.map((point) => (
          <li key={point.model}>
            <button
              aria-pressed={point.model === activeModel}
              className={`model-chip-button${point.model === activeModel ? " is-active" : ""}`}
              onClick={() => setActiveModel(point.model)}
              onMouseEnter={() => setActiveModel(point.model)}
              type="button"
            >
              {point.model}
            </button>
          </li>
        ))}
        <li>
          <button
            aria-pressed={isProjectionActive}
            className={`model-chip-button is-projection${isProjectionActive ? " is-active" : ""}`}
            onClick={() => setActiveModel("projection")}
            onMouseEnter={() => setActiveModel("projection")}
            type="button"
          >
            Projected
          </button>
        </li>
      </ul>

      <p aria-live="polite" className="readout-strip-frame chart-readout-strip">
        {isProjectionActive ? (
          <>
            <span className="readout-model-name">Fitted projection</span>
            <span className="readout-horizon-value">{formatHorizon(projectedEnd.minutes)}</span>
            <span className="readout-context-note">
              by {taskHorizonTrend.projectThrough}, at one doubling every {taskHorizonTrend.doublingDays} days
            </span>
          </>
        ) : (
          <>
            <span className="readout-model-name">{activePoint.model}</span>
            <span className="readout-horizon-value">{formatHorizon(activePoint.minutes)}</span>
            <span className="readout-context-note">
              {activePoint.org}, {activePoint.date} — task length it finishes half the time
            </span>
          </>
        )}
      </p>
    </div>
  );
}
