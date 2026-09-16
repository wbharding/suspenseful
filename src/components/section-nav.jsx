import useActiveSection from "../hooks/use-active-section.js";
import "./section-nav.scss";

// Sticky band index. On a phone the poster is many screens long, so the nav doubles as a
// progress indicator: the chip for whichever band owns the middle of the viewport stays lit.
//
// @param {{id: string, number: string, navLabel: string}[]} bands - in document order
export default function SectionNav({ bands }) {
  const bandIds = bands.map((band) => band.id);
  const activeSectionId = useActiveSection(bandIds);

  return (
    <nav aria-label="Poster sections" className="section-nav">
      <ul className="nav-chip-list">
        {bands.map((band) => (
          <li key={band.id}>
            <a
              aria-current={activeSectionId === band.id ? "true" : undefined}
              className={`chip-list-link tone-${band.id}${
                activeSectionId === band.id ? " is-active" : ""
              }`}
              href={`#${band.id}`}
            >
              <span aria-hidden="true" className="link-number-mark">
                {band.number}
              </span>
              <span className="link-label-text">{band.navLabel}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
