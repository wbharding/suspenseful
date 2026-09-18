import { capabilityModels } from "../data/capability-data.js";
import { sourceRegistry } from "../data/source-registry.js";
import useGuideStore from "../hooks/use-guide-store.js";
import { downloadFile, toCsv } from "../lib/download.js";
import { openSources } from "../lib/open-sources.js";
import { DialogHeading } from "./detail-dialog.jsx";
import FieldIcon from "./field-icon.jsx";

function intervalCell(horizon) {
  if (!horizon) return "—";
  return `${horizon[1]}–${horizon[2]}`;
}

export default function CapabilityDataDialog() {
  const { openDialog } = useGuideStore();

  function handleExport() {
    const rows = [
      [
        "model",
        "release_date",
        "TH1.0_minutes",
        "TH1.0_low",
        "TH1.0_high",
        "TH1.1_minutes",
        "TH1.1_low",
        "TH1.1_high",
        "snapshot",
        "source",
      ],
      ...capabilityModels.map((model) => [
        model.name,
        model.date,
        ...(model.horizons.v10 || [ "", "", "" ]),
        ...(model.horizons.v11 || [ "", "", "" ]),
        "2026-01-29",
        sourceRegistry.metr.url,
      ]),
    ];
    downloadFile("metr-historical-january-2026.csv", toCsv(rows), "text/csv;charset=utf-8");
  }

  return (
    <>
      <DialogHeading title="The actual benchmark numbers.">
        Historical January 29, 2026 publication snapshot. All values are{" "}
        <strong>human-expert minutes at 50% model success</strong>. Intervals are those reported
        in METR’s comparison table. Missing values stay missing.
      </DialogHeading>

      <div className="privacy-warning">
        METR later revised its estimates. This is deliberately not presented as the current
        leaderboard. The chart draws one line: the TH 1.1 value where METR published one, the
        TH 1.0 value otherwise. Both are below, unmerged.
      </div>

      <div className="data-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Model</th>
              <th>Release date</th>
              <th className="number">TH 1.0</th>
              <th className="number">Interval</th>
              <th className="number">TH 1.1</th>
              <th className="number">Interval</th>
              <th>Charted</th>
            </tr>
          </thead>
          <tbody>
            {capabilityModels.map((model) => (
              <tr key={model.name}>
                <td>{model.name}</td>
                <td>{model.date}</td>
                <td className="number">{model.horizons.v10 ? model.horizons.v10[0] : "—"}</td>
                <td className="number">{intervalCell(model.horizons.v10)}</td>
                <td className="number">{model.horizons.v11 ? model.horizons.v11[0] : "—"}</td>
                <td className="number">{intervalCell(model.horizons.v11)}</td>
                <td>{model.horizons.v11 ? "TH 1.1" : "TH 1.0"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="dialog-actions">
        <button className="btn primary" onClick={handleExport} type="button">
          <FieldIcon name="download" />
          Download CSV
        </button>
        <button className="btn" onClick={() => openSources(openDialog, "metr,metr-live")} type="button">
          Methodology & revisions
        </button>
      </div>
    </>
  );
}
