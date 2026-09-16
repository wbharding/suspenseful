import { modelReleases } from "../data/release-data.js";
import { sourceRegistry } from "../data/source-registry.js";
import useGuideStore from "../hooks/use-guide-store.js";
import { downloadFile, toCsv } from "../lib/download.js";
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
      [ "date", "release", "provider", "source", "coverage" ],
      ...events.map((release) => [
        release.date,
        release.name,
        release.provider,
        sourceRegistry[release.source].url,
        "Selected sample, not exhaustive",
      ]),
    ];
    downloadFile("selected-ai-releases.csv", toCsv(rows), "text/csv;charset=utf-8");
  }

  return (
    <>
      <DialogHeading title="A selected release timeline.">
        {events.length} events shown with your current provider filters, out of {modelReleases.length}{" "}
        in the packaged sample. Includes named models, selected point updates and some previews.
        This is not a complete or consistently sampled industry census.
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
                  <td>{release.date}</td>
                  <td>{release.name}</td>
                  <td>{release.provider}</td>
                  <td>
                    <ExternalLink label="Source" url={sourceRegistry[release.source].url} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">
                  No providers selected. Change the filters on the page to include releases.
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
