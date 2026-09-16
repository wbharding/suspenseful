import useGuideStore from "../hooks/use-guide-store.js";
import { openSources } from "../lib/open-sources.js";
import FieldIcon from "./field-icon.jsx";

const PRECEDENTS = [
  {
    year: "1963",
    title: "Limited Test Ban Treaty",
    body: "A partial agreement on nuclear testing.",
    icon: "landmark",
    source: "jfk",
  },
  {
    year: "1975",
    title: "Asilomar conference",
    body: "Risk-based safeguards for a new science.",
    icon: "flask",
    source: "asilomar",
  },
  {
    year: "1987",
    title: "Montreal Protocol",
    body: "International rules to protect the ozone layer.",
    icon: "globe",
    source: "montreal",
  },
];

// Element 3A. Precedents for cooperation, not guarantees for AI.
export default function HistoryPrecedents() {
  const { openDialog } = useGuideStore();

  return (
    <>
      <div className="history-grid">
        {PRECEDENTS.map((item) => (
          <button
            className="history-item"
            key={item.source}
            onClick={() => openSources(openDialog, item.source)}
            type="button"
          >
            <span className="history-art">
              <FieldIcon name={item.icon} />
            </span>
            <span className="history-year">{item.year}</span>
            <strong>{item.title}</strong>
            <span>{item.body}</span>
            <FieldIcon name="arrow" />
          </button>
        ))}
      </div>
      <p className="micro">
        Different technologies, different verification problems. Precedents for
        cooperation—not guarantees for AI.
      </p>
    </>
  );
}
