import { useMemo, useState } from "react";
import { lookupSources, sourceRegistry } from "../data/source-registry.js";
import { siteMeta } from "../data/site-meta.js";
import useGuideStore from "../hooks/use-guide-store.js";
import { DialogHeading, ExternalLink } from "./detail-dialog.jsx";
import FieldIcon from "./field-icon.jsx";

// The evidence drawer, in two modes.
//
// With `ids`, it shows the sources behind one panel — the "look behind this claim" path. Without
// them it is the whole library, searchable. Either way the registry's `note` is rendered in
// full, because the caveat is the part that keeps an illustration from being read as a
// measurement.
//
// @param {string} ids - optional comma-separated source ids
export default function SourceDrawer({ ids }) {
  const { openDialog } = useGuideStore();
  const [ query, setQuery ] = useState("");

  const allSourceIds = useMemo(() => Object.keys(sourceRegistry), []);

  const matchingIds = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    if (!normalized) return allSourceIds;
    return allSourceIds.filter((id) =>
      Object.values(sourceRegistry[id]).join(" ").toLowerCase().includes(normalized),
    );
  }, [ query, allSourceIds ]);

  if (ids) {
    const sources = lookupSources(ids);

    return (
      <>
        <DialogHeading title="Evidence &amp; context">
          Follow the original sources, read the qualifications and keep illustrations separate
          from measurements.
        </DialogHeading>

        {sources.map((source) => (
          <SourceCard key={source.id} source={source} />
        ))}

        <div className="dialog-actions">
          <button
            className="btn small"
            onClick={() => openDialog({ type: "sources" })}
            type="button"
          >
            <FieldIcon name="book" />
            Browse all sources
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <DialogHeading title="Sources, not just footnotes.">
        The data is packaged with this page, not fetched live. Historical benchmarks, selected
        release events, subjective survey responses and illustrative policy sketches are labeled
        separately.
      </DialogHeading>

      <div className="source-search">
        <FieldIcon name="search" />
        <input
          aria-label="Search evidence sources"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by topic, author or organization…"
          type="search"
          value={query}
        />
        <small>
          {query
            ? `${matchingIds.length} matching source${matchingIds.length === 1 ? "" : "s"}`
            : `${allSourceIds.length} sources · reviewed ${siteMeta.reviewed}`}
        </small>
      </div>

      {matchingIds.length ? (
        matchingIds.map((id) => <SourceCard key={id} source={{ id, ...sourceRegistry[id] }} />)
      ) : (
        <div className="empty-state">
          No matching sources. Try “METR”, “survey”, “frontier” or “release”.
        </div>
      )}
    </>
  );
}

// @param {object} source - a registry entry plus its id
export function SourceCard({ source }) {
  return (
    <article className="source-item">
      <div className="source-meta">
        <span>{source.type}</span>
        <span>{source.date}</span>
      </div>
      <h3>{source.title}</h3>
      <p className="source-publisher">{source.publisher}</p>
      <p>{source.note}</p>
      <ExternalLink label="Open original source" url={source.url} />
    </article>
  );
}
