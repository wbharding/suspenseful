import FieldIcon from "./field-icon.jsx";
import "./chapter-nav.scss";

// Sticky chapter index. The page is several screens tall on a desktop and far longer on a
// phone, so the nav doubles as a position indicator.
//
// @param {{id: string, number: string, label: string}[]} chapters
// @param {string} activeChapterId
export default function ChapterNav({ chapters, activeChapterId }) {
  return (
    <nav aria-label="Field guide chapters" className="chapter-nav">
      <div>
        {chapters.map((chapter) => (
          <a
            aria-current={activeChapterId === chapter.id ? "location" : undefined}
            className={activeChapterId === chapter.id ? "active" : undefined}
            href={`#${chapter.id}`}
            key={chapter.id}
          >
            <span>{chapter.number}</span> {chapter.label}
          </a>
        ))}
      </div>
      <span className="nav-detail">
        SCROLL TO EXPLORE <FieldIcon name="down" />
      </span>
    </nav>
  );
}

// @param {number} progressPercent - 0 to 100
export function ReadingProgress({ progressPercent }) {
  return <div aria-hidden="true" className="reading-progress" style={{ width: `${progressPercent}%` }} />;
}
