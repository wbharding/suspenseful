import { modelReleases } from "../data/release-data.js";
import { sourceRegistry } from "../data/source-registry.js";
import useGuideStore from "../hooks/use-guide-store.js";
import { downloadFile, toCsv } from "../lib/download.js";
import { releaseDateLabel } from "../lib/format.js";
import { openSources } from "../lib/open-sources.js";
import { DialogHeading, ExternalLink } from "./detail-dialog.jsx";
import FieldIcon from "./field-icon.jsx";

// @param {string[]} providers - currently selected timeline filters
export default function ReleaseDataDialog({ providers }) {
  const { openDialog } = useGuideStore();
  const allowed = new Set(providers || []);
  const events = modelReleases.filter((release) => allowed.has(release.provider));

  function handleExport() {
    const rows = [
      [ "date", "date_precision", "release", "provider", "source", "coverage" ],
      ...events.map((release) => [
        release.datePrecision === "month" ? release.date.slice(0, 7) : release.date,
        release.datePrecision || "day",
        release.name,
        release.provider,
        sourceRegistry[release.source].url,
        "Seven-lab flagship/point catalog, not exhaustive",
      ]),
    ];
    downloadFile("selected-ai-releases.csv", toCsv(rows), "text/csv;charset=utf-8");
  }

  return (
    <>
      <DialogHeading title="A seven-lab release catalog.">
        {events.length} events shown with your current lab filters, out of {modelReleases.length}{" "}
        in the packaged catalog (Anthropic, OpenAI, Google, xAI, Meta, Z.ai, DeepSeek). Named
        models, point updates and some previews. Not a complete or consistently sampled industry
        census. Several 2026 dates are provisional.
      </DialogHeading>

      <div className="data-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Model / release</th>
              <th>Provider</th>
              <th>Evidence</th>
            </tr>
          </thead>
          <tbody>
            {events.length ? (
              events.map((release) => (
                <tr key={release.id}>
                  <td>{releaseDateLabel(release)}</td>
                  <td>
                    {release.name}
                    {release.status === "announced" ? " (announced)" : ""}
                    {release.provisional ? " (provisional)" : ""}
                  </td>
                  <td>{release.provider}</td>
                  <td>
                    <ExternalLink label="Source" url={sourceRegistry[release.source].url} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">
                  No labs selected. Change the filters on the page to include releases.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="dialog-actions">
        <button className="btn primary" disabled={!events.length} onClick={handleExport} type="button">
          <FieldIcon name="download" />
          Download filtered CSV
        </button>
        <button className="btn" onClick={() => openSources(openDialog, "release-dates")} type="button">
          Coverage notes
        </button>
      </div>
    </>
  );
}
