import useDisclosure from "../hooks/use-disclosure.js";
import SourceNoteList from "./source-note-list.jsx";
import "./element-card.scss";

// The card shell every lettered element on the poster sits in (1A, 2C, 3D and so on).
//
// The card reads on its own at a glance, matching the printed sketch. The toggle underneath
// reveals the paragraphs and citations that would never fit on a poster, which is the whole
// point of putting this on the web.
//
// @param {string} index - poster label such as "2C"
// @param {string[]} detail - paragraphs shown when the card is opened
// @param {{label: string, url: string}[]} sources
// @param {boolean} spanFullRow - let the card occupy the whole band grid row
export default function ElementCard({
  index,
  title,
  blurb,
  footnote,
  detail,
  sources,
  detailLabel = "More data",
  spanFullRow = false,
  children,
}) {
  const { isOpen, panelId, toggle } = useDisclosure();
  const hasDetail = Boolean(detail?.length || sources?.length);

  return (
    <article className={`element-card${spanFullRow ? " span-full-row" : ""}`}>
      <header className="card-header-row">
        <p className="header-index-badge">{index}</p>
        <div className="header-title-group">
          <h3 className="title-group-heading">{title}</h3>
          {blurb ? <p className="title-group-blurb">{blurb}</p> : null}
        </div>
      </header>

      <div className="card-body-area">{children}</div>

      {footnote ? <p className="card-footnote-text">{footnote}</p> : null}

      {hasDetail ? (
        <button
          aria-controls={panelId}
          aria-expanded={isOpen}
          className="card-detail-toggle"
          onClick={toggle}
          type="button"
        >
          <span className="toggle-label-text">{isOpen ? "Hide the detail" : detailLabel}</span>
          <span aria-hidden="true" className="toggle-chevron-mark">
            {isOpen ? "–" : "+"}
          </span>
        </button>
      ) : null}

      {hasDetail && isOpen ? (
        <div className="card-detail-panel" id={panelId}>
          {detail?.map((paragraph) => (
            <p className="detail-panel-paragraph" key={paragraph}>
              {paragraph}
            </p>
          ))}
          <SourceNoteList sources={sources} />
        </div>
      ) : null}
    </article>
  );
}
