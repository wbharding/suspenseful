import { leaderQuoteIntro, leaderQuotes } from "../data/leader-quote-data.js";
import useSelectedItem from "../hooks/use-selected-item.js";
import PlaceholderFigure from "./placeholder-figure.jsx";
import "./leader-quote-wall.scss";

// Element 2C. The poster has room for one clipped line per leader. This keeps those lines as the
// entry point and puts the full set behind them, with the year and publication attached, because
// a six-word quotation from a CEO is exactly the kind of claim a reader should be able to check.
export default function LeaderQuoteWall() {
  const { selectedId, select } = useSelectedItem();
  const selectedLeader = leaderQuotes.find((leader) => leader.id === selectedId);

  return (
    <div className="leader-quote-wall">
      <ul className="wall-portrait-grid">
        {leaderQuotes.map((leader) => (
          <li key={leader.id}>
            <button
              aria-expanded={selectedId === leader.id}
              className={`portrait-grid-button${selectedId === leader.id ? " is-active" : ""}`}
              onClick={() => select(leader.id)}
              type="button"
            >
              <PlaceholderFigure imageId={leader.imageId} shape="square" />
              <span className="grid-button-name">{leader.name}</span>
              <span className="grid-button-quote">&ldquo;{leader.posterQuote}&rdquo;</span>
            </button>
          </li>
        ))}
      </ul>

      {selectedLeader ? (
        <LeaderQuoteDetail leader={selectedLeader} />
      ) : (
        <p className="detail-prompt-note">Pick a leader to read what they actually said, and when.</p>
      )}

      <p className="wall-framing-note">{leaderQuoteIntro.framing}</p>
    </div>
  );
}

// The expanded card for one leader: every quotation the data note recorded for them, newest
// concern first, plus the 2023 joint statement when they signed it.
//
// @param {object} leader - entry from leaderQuotes
function LeaderQuoteDetail({ leader }) {
  const { jointStatement } = leaderQuoteIntro;

  return (
    <div className="leader-quote-detail">
      <header className="detail-header-row">
        <p className="header-leader-name">{leader.name}</p>
        <p className="header-leader-role">
          {leader.role}, {leader.org}
        </p>
      </header>

      <ul className="detail-quote-list">
        {leader.quotes.map((quote) => (
          <li className="quote-list-item" key={quote.text}>
            <blockquote className="list-item-quote">&ldquo;{quote.text}&rdquo;</blockquote>
            {quote.context ? <p className="list-item-context">{quote.context}</p> : null}
            <p className="list-item-citation">
              {quote.url ? (
                <a className="item-citation-link" href={quote.url} rel="noreferrer" target="_blank">
                  {quote.source}
                </a>
              ) : (
                quote.source
              )}
              , {quote.year}
            </p>
          </li>
        ))}
      </ul>

      {leader.signedJointStatement ? (
        <div className="detail-joint-statement">
          <p className="joint-statement-label">Also signed, {jointStatement.date}</p>
          <blockquote className="joint-statement-quote">&ldquo;{jointStatement.text}&rdquo;</blockquote>
          <p className="joint-statement-source">
            <a
              className="statement-source-link"
              href={jointStatement.url}
              rel="noreferrer"
              target="_blank"
            >
              {jointStatement.source}
            </a>{" "}
            — {jointStatement.context}
          </p>
        </div>
      ) : null}

      <p className="detail-stake-note">{leaderQuoteIntro.stake}</p>
    </div>
  );
}
