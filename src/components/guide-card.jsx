import FieldIcon from "./field-icon.jsx";
import "./guide-card.scss";

// The shell every lettered cell of the field guide sits in (1A, 2C, 3D...).
//
// The card picks up its accent from the --section-color the chapter sets, so no card has to know
// which chapter it landed in. `footer` is pinned to the bottom, which keeps the evidence link on
// a shared baseline across a row of cards of different heights.
//
// @param {string} cellId - poster label such as "2C"
// @param {string} eyebrow - the small all-caps line beside the cell id
// @param {string} title - the card's h3
// @param {string} deck - optional standfirst under the title
// @param {string} span - grid width: "span-12" | "span-7" | "span-6" | "span-5"
// @param {ReactNode} footer - contents of the pinned footer row
export default function GuideCard({
  cellId,
  eyebrow,
  title,
  deck,
  span = "span-6",
  className = "",
  footer,
  children,
}) {
  return (
    <article className={`card ${span} ${className}`.trim()}>
      <div className="card-top">
        <span className="cell-id">{cellId}</span>
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <h3>{title}</h3>
      {deck ? <p className="card-deck">{deck}</p> : null}
      {children}
      {footer ? <div className="card-footer">{footer}</div> : null}
    </article>
  );
}

// A short qualifier chip. `variant` distinguishes a measurement from a drawing, which matters on
// a page that mixes sourced data with explanatory illustrations.
//
// @param {string} variant - "data" | "neutral" | "illustration"
export function EvidenceTag({ children, variant = "data" }) {
  return (
    <span className={`tag tag-${variant}`}>
      {variant === "data" ? <i /> : null}
      {children}
    </span>
  );
}

// Opens the evidence drawer for one or more source ids.
//
// @param {string} sourceIds - one id, or several comma-separated
// @param {function} onOpenSources - called with sourceIds
export function SourceLinkButton({ sourceIds, onOpenSources, label = "Evidence & context" }) {
  return (
    <button className="source-link" onClick={() => onOpenSources(sourceIds)} type="button">
      <FieldIcon name="book" />
      <span>{label}</span>
      <FieldIcon name="arrow" />
    </button>
  );
}

// The grey box under a chart that says what the number does and does not mean.
export function CardNote({ heading, children }) {
  return (
    <div className="card-note">
      <strong>{heading}</strong>
      <p>{children}</p>
    </div>
  );
}

// A single emphasised takeaway, tinted with the chapter accent.
export function CardInsight({ icon = "bulb", children }) {
  return (
    <div className="insight">
      <span className="insight-icon">
        <FieldIcon name={icon} />
      </span>
      <p>{children}</p>
    </div>
  );
}

// A caveat strip, used where a reader is most likely to over-read the panel above it.
export function NoteStrip({ icon = "info", children }) {
  return (
    <div className="note-strip">
      <FieldIcon name={icon} />
      <p>{children}</p>
    </div>
  );
}
