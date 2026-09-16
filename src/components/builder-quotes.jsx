import { builderQuotes } from "../data/quote-data.js";
import useGuideStore from "../hooks/use-guide-store.js";
import { openSources } from "../lib/open-sources.js";
import FieldIcon from "./field-icon.jsx";
import { NoteStrip } from "./guide-card.jsx";

// Element 2C. Public statements from people building frontier AI. Opening a card shows the
// source note, because a trimmed CEO quotation is exactly the kind of claim to check.
export default function BuilderQuotes() {
  const { openDialog } = useGuideStore();

  return (
    <>
      <div className="quote-grid">
        {builderQuotes.map((quote) => (
          <button
            className="quote-card"
            key={quote.name}
            onClick={() => openSources(openDialog, quote.source)}
            type="button"
          >
            <div className="quote-person">
              <span className="avatar">{quote.initials}</span>
              <span>
                <strong>{quote.name}</strong>
                <small>{quote.company}</small>
              </span>
              <span className="quote-date">{quote.date}</span>
            </div>
            <blockquote>“{quote.quote}”</blockquote>
            <p>{quote.context}</p>
            <span className="quote-context">
              Read in context <FieldIcon name="external" />
            </span>
          </button>
        ))}
      </div>
      <NoteStrip>
        Acknowledging risk is not the same as endorsing a pause. These leaders disagree about
        what to do.
      </NoteStrip>
    </>
  );
}
