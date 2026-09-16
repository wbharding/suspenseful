import { pauseInvestments } from "../data/slowdown-data.js";
import useSelectedItem from "../hooks/use-selected-item.js";
import IconGlyph from "./icon-glyph.jsx";
import PlaceholderFigure from "./placeholder-figure.jsx";
import "./pause-investment-panel.scss";

// Element 3C. The answer to "a pause just loses us a year": four things the year buys, each
// openable, sitting next to the list of everything that is not being asked to stop.
export default function PauseInvestmentPanel() {
  const { selectedId, select } = useSelectedItem();
  const selectedPillar = pauseInvestments.pillars.find((pillar) => pillar.id === selectedId);

  return (
    <div className="pause-investment-panel">
      <PlaceholderFigure imageId={pauseInvestments.imageId} shape="wide" />

      <p className="panel-banner-label">{pauseInvestments.bannerLabel}</p>

      <ul className="panel-pillar-list">
        {pauseInvestments.pillars.map((pillar) => (
          <li className="pillar-list-cell" key={pillar.id}>
            <button
              aria-expanded={selectedId === pillar.id}
              className={`pillar-list-button${selectedId === pillar.id ? " is-active" : ""}`}
              onClick={() => select(pillar.id)}
              type="button"
            >
              <IconGlyph name={pillar.id} />
              <span className="pillar-button-title">{pillar.title}</span>
            </button>
          </li>
        ))}
      </ul>

      {selectedPillar ? (
        <p className="detail-reveal-panel">{selectedPillar.detail}</p>
      ) : (
        <p className="detail-prompt-note">Pick a pillar to see what the time would be spent on.</p>
      )}

      <div className="panel-benefit-block">
        <p className="benefit-block-title">{pauseInvestments.benefits.title}</p>
        <ul className="benefit-block-list">
          {pauseInvestments.benefits.items.map((item) => (
            <li className="block-list-item" key={item.id}>
              <IconGlyph name={item.id} />
              {item.label}
            </li>
          ))}
        </ul>
        <p className="benefit-block-note">{pauseInvestments.benefits.detail}</p>
      </div>
    </div>
  );
}
