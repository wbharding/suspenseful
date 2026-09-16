import "./source-note-list.scss";

// Citations for whatever is above them. Entries without a url print as plain text, because the
// data note recorded a publication and a year for several quotations but no link.
//
// @param {{label: string, url: string}[]} sources
// @param {string} heading
export default function SourceNoteList({ sources, heading = "Sources" }) {
  if (!sources?.length) return null;

  return (
    <div className="source-note-list">
      <p className="note-list-heading">{heading}</p>
      <ul className="note-list-items">
        {sources.map((source) => (
          <li className="list-item-source" key={source.label}>
            {source.url ? (
              <a className="item-source-link" href={source.url} rel="noreferrer" target="_blank">
                {source.label}
              </a>
            ) : (
              source.label
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
