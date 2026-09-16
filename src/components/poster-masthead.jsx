import { mastheadCopy } from "../data/poster-copy.js";
import "./poster-masthead.scss";

// The poster's top band. The draft art has the title baked into a mountain-highway panorama, so
// the backdrop here is a CSS sky and the type is real text; the panorama is queued as
// "masthead-landscape" in the image manifest and drops in behind this without touching the type.
export default function PosterMasthead() {
  return (
    <header className="poster-masthead" id="masthead">
      <div className="masthead-inner-wrap">
        <ul className="masthead-badge-list">
          {mastheadCopy.badges.map((badge) => (
            <li className="badge-list-item" key={badge}>
              {badge}
            </li>
          ))}
        </ul>

        <div className="masthead-title-block">
          <h1 className="title-block-heading">
            {mastheadCopy.titleLead}
            <span className="heading-accent-word">{mastheadCopy.titleAccent}</span>
            {mastheadCopy.titleTrail}
          </h1>
          <p className="title-block-subtitle">{mastheadCopy.subtitle}</p>
        </div>

        <ul className="masthead-note-list">
          {mastheadCopy.stickyNotes.map((note) => (
            <li className={`note-list-item tone-${note.tone}`} key={note.text}>
              {note.text}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
