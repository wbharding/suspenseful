import { useMemo, useState } from "react";
import { benchmarkVersions, modelsForVersion } from "../data/capability-data.js";
import useElementWidth from "../hooks/use-element-width.js";
import useGuideStore from "../hooks/use-guide-store.js";
import { dateLabel, dateMs, hoursLabel } from "../lib/format.js";
import FieldIcon from "./field-icon.jsx";

const CHART_START = "2023-01-01";
const CHART_END = "2026-01-01";

// Element 1A. Historical METR time horizons. The two benchmark versions stay separate: a model
// missing from 1.1 is omitted from that series rather than interpolated.
export default function CapabilityChart() {
  const [ chartRef, width ] = useElementWidth();
  const [ versionId, setVersionId ] = useState("v11");
  const [ scale, setScale ] = useState("log");
  const [ showIntervals, setShowIntervals ] = useState(true);
  const [ selectedName, setSelectedName ] = useState(
    () => modelsForVersion("v11").at(-1)?.name,
  );

  const models = useMemo(() => modelsForVersion(versionId), [ versionId ]);
  const selected = models.find((model) => model.name === selectedName) || models.at(-1);
  const compact = width > 0 && width < 460;
  const chartWidth = compact ? 360 : 660;
  const chartHeight = compact ? 265 : 292;
  const pad = { l: compact ? 56 : 68, r: compact ? 14 : 20, t: 36, b: 42 };
  const x0 = dateMs(CHART_START);
  const x1 = dateMs(CHART_END);
  const max = showIntervals ? 1440 : 360;
  const innerWidth = chartWidth - pad.l - pad.r;
  const innerHeight = chartHeight - pad.t - pad.b;

  function xFor(date) {
    return pad.l + ((dateMs(date) - x0) / (x1 - x0)) * innerWidth;
  }

  function yFor(value) {
    if (scale === "log") {
      return pad.t + ((Math.log(max) - Math.log(Math.max(value, 1))) / Math.log(max)) * innerHeight;
    }
    return pad.t + (1 - value / max) * innerHeight;
  }

  const ticks = scale === "log"
    ? (max > 400 ? [ 1, 5, 30, 120, 720 ] : [ 1, 5, 30, 120, 360 ])
    : (max > 400 ? [ 0, 360, 720, 1080, 1440 ] : [ 0, 90, 180, 270, 360 ]);

  const path = models
    .map((model, index) => {
      const [ estimate ] = model.horizons[versionId];
      return `${index ? "L" : "M"}${xFor(model.date).toFixed(2)},${yFor(estimate).toFixed(2)}`;
    })
    .join(" ");

  function handleSelectModel(name) {
    setSelectedName(name);
  }

  function handlePointKeyDown(event, name) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    handleSelectModel(name);
  }

  const horizon = selected?.horizons[versionId];
  const versionLabel = versionId === "v11" ? "Time Horizon 1.1" : "Time Horizon 1.0";

  return (
    <>
      <div className="chart-controls">
        <div aria-label="Benchmark version" className="segmented">
          {benchmarkVersions.map((version) => {
            const isActive = version.id === versionId;
            return (
              <button
                aria-pressed={isActive}
                className={isActive ? "active" : ""}
                key={version.id}
                onClick={() => setVersionId(version.id)}
                type="button"
              >
                {version.label}
              </button>
            );
          })}
        </div>
        <label className="compact-select">
          Scale{" "}
          <select
            aria-label="Chart scale"
            onChange={(event) => setScale(event.target.value)}
            value={scale}
          >
            <option value="log">Logarithmic</option>
            <option value="linear">Linear</option>
          </select>
        </label>
        <label className="check-label">
          <input
            checked={showIntervals}
            onChange={(event) => setShowIntervals(event.target.checked)}
            type="checkbox"
          />{" "}
          Intervals
        </label>
      </div>

      <div className="svg-chart" ref={chartRef}>
        {width > 0 ? (
          <svg
            aria-label={`Historical METR task-completion time horizons. ${scale === "log" ? "Logarithmic" : "Linear"} vertical scale. Select a point to inspect a model.`}
            role="group"
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          >
            <text fill="var(--chart-axis)" fontSize="14" x={pad.l} y="16">
              Human-expert task time · 50% success
            </text>
            {ticks.map((tick) => (
              <g key={tick}>
                <path d={`M${pad.l} ${yFor(tick)}H${chartWidth - pad.r}`} stroke="var(--chart-grid)" strokeDasharray="3 4" />
                <text fill="var(--chart-axis)" fontSize="14" textAnchor="end" x={pad.l - 9} y={yFor(tick) + 4}>
                  {hoursLabel(tick)}
                </text>
              </g>
            ))}
            {[ 2023, 2024, 2025, 2026 ].map((year) => (
              <g key={year}>
                <path d={`M${xFor(`${year}-01-01`)} ${pad.t}V${chartHeight - pad.b}`} stroke="var(--chart-grid)" />
                <text fill="var(--chart-axis)" fontSize="14" textAnchor="middle" x={xFor(`${year}-01-01`)} y={chartHeight - 12}>
                  {year}
                </text>
              </g>
            ))}
            {showIntervals
              ? models.map((model) => {
                  const [ , low, high ] = model.horizons[versionId];
                  const x = xFor(model.date);
                  return (
                    <path
                      className="ci-line"
                      d={`M${x} ${yFor(low)}V${yFor(high)}M${x - 4} ${yFor(low)}h8M${x - 4} ${yFor(high)}h8`}
                      fill="none"
                      key={`${model.name}-ci`}
                      opacity=".8"
                      stroke="var(--border-strong)"
                      strokeWidth="1.3"
                    />
                  );
                })
              : null}
            <path
              d={path}
              fill="none"
              stroke="var(--chart-line)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.3"
            />
            {models.map((model) => {
              const [ estimate, low, high ] = model.horizons[versionId];
              const isSelected = model.name === selected?.name;
              return (
                <circle
                  aria-label={`${model.name}, ${estimate} human-expert minutes, interval ${low} to ${high} minutes`}
                  aria-pressed={isSelected}
                  className="chart-point"
                  cx={xFor(model.date)}
                  cy={yFor(estimate)}
                  fill={isSelected ? "var(--chart-selected)" : "var(--chart-line)"}
                  key={model.name}
                  onClick={() => handleSelectModel(model.name)}
                  onFocus={() => handleSelectModel(model.name)}
                  onKeyDown={(event) => handlePointKeyDown(event, model.name)}
                  r={isSelected ? 6 : 4.7}
                  role="button"
                  stroke="var(--surface)"
                  strokeWidth="2"
                  tabIndex={0}
                >
                  <title>
                    {model.name} · {dateLabel(model.date)} · {hoursLabel(estimate)}
                  </title>
                </circle>
              );
            })}
          </svg>
        ) : null}
      </div>

      <div className="chart-selected">
        {selected && horizon ? (
          <>
            <div>
              <strong>{selected.name}</strong>
              <small>
                {dateLabel(selected.date)} · {versionLabel}
              </small>
            </div>
            <div className="selected-horizon">
              {hoursLabel(horizon[0])}
              <small>
                Reported interval: {hoursLabel(horizon[1])}–{hoursLabel(horizon[2])}
              </small>
            </div>
          </>
        ) : null}
      </div>

      <label className="select-model">
        Inspect a model{" "}
        <select
          onChange={(event) => handleSelectModel(event.target.value)}
          value={selected?.name || ""}
        >
          {models.map((model) => (
            <option key={model.name} value={model.name}>
              {model.name}
            </option>
          ))}
        </select>
      </label>
    </>
  );
}

export function CapabilityChartFooter() {
  const { openDialog } = useGuideStore();

  return (
    <button
      className="text-btn"
      onClick={() =>
        openDialog({ type: "capability-data", kicker: "DATA TABLE · HISTORICAL SNAPSHOT" })
      }
      type="button"
    >
      Data table <FieldIcon name="arrow" />
    </button>
  );
}
