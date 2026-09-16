import "./section-band.scss";

// One of the four coloured bands of the poster. The band sets --band-ink and --band-tint, which
// is how the cards inside it pick up their section colour without every card stylesheet having
// to know which band it landed in.
//
// @param {object} band - entry from bandCopy
// @param {string} columns - "four-up" | "three-up" | "two-up", the desktop grid density
export default function SectionBand({ band, columns = "four-up", children }) {
  const titleId = `${band.id}-band-title`;

  return (
    <section aria-labelledby={titleId} className={`section-band tone-${band.id}`} id={band.id}>
      <div className="band-inner-wrap">
        <header className="band-header-row">
          <p aria-hidden="true" className="header-number-badge">
            {band.number}
          </p>
          <div className="header-text-group">
            <h2 className="text-group-title" id={titleId}>
              {band.title}
            </h2>
            <p className="text-group-summary">{band.summary}</p>
          </div>
        </header>

        <div className={`band-element-grid columns-${columns}`}>{children}</div>
      </div>
    </section>
  );
}
