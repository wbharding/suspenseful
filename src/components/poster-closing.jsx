import { closingCopy } from "../data/poster-copy.js";
import "./poster-closing.scss";

// The closing band. As with the masthead, the draft art has the closing line baked into a
// panorama, so the type here is real text and "closing-road" stays in the art queue.
export default function PosterClosing() {
  return (
    <footer className="poster-closing">
      <div className="closing-inner-wrap">
        <p className="closing-milestone-sign">{closingCopy.milestone}</p>

        <div className="closing-message-block">
          <p className="message-block-headline">{closingCopy.headline}</p>
          <p className="message-block-script">{closingCopy.script}</p>
        </div>

        <ul className="closing-signpost-list">
          {closingCopy.signpost.map((line) => (
            <li className="signpost-list-item" key={line}>
              {line}
            </li>
          ))}
        </ul>

        <p className="closing-source-note">
          {closingCopy.sourceNote}{" "}
          <a
            className="source-note-link"
            href={closingCopy.sourceNoteUrl}
            rel="noreferrer"
            target="_blank"
          >
            Read the working data note
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
