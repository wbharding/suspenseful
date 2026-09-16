import "./chapter-section.scss";

// One of the guide's four chapters. The `tone` class re-declares --section-color and
// --section-soft, which is how every card, tag and evidence link inside picks up the chapter's
// accent without being told about it.
//
// @param {string} id - anchor target, also what the sticky nav scroll-spies on
// @param {string} tone - "pressure" | "risks" | "slowdown" | "actions"
// @param {string} number - "01" through "04"
// @param {string} eyebrow - the small all-caps framing line
// @param {string} intro - the right-hand standfirst
export default function ChapterSection({ id, tone, number, title, eyebrow, intro, children }) {
  const headingId = `${id}-heading`;

  return (
    <section aria-labelledby={headingId} className={`chapter ${tone}`} id={id}>
      <div className="chapter-title">
        <div aria-hidden="true" className="chapter-number">
          {number}
        </div>
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={headingId}>{title}</h2>
        </div>
        <p className="chapter-intro">{intro}</p>
      </div>
      <div className="chapter-grid">{children}</div>
    </section>
  );
}
