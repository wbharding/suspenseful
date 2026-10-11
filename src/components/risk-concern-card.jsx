import alpineMountainRacing from "../assets/alpine-mountain-racing.png";
import coyoteFutureMachine from "../assets/coyote-future-machine.jpg";
import havesAndHaveNots from "../assets/haves-and-have-nots.jpg";
import { sourceRegistry } from "../data/source-registry.js";
import FieldIcon from "./field-icon.jsx";
import GuideCard, { SourceLinkButton } from "./guide-card.jsx";
import "./risk-concern-card.scss";

// Concerns illustrated with a picture instead of the three-step icon flow.
const CONCERN_IMAGES = {
  race: {
    src: alpineMountainRacing,
    alt: "Racing cars on an alpine road: fear of falling behind creates pressure to move faster, leaving less time for safeguards.",
    width: 1000,
    height: 424,
  },
  power: {
    src: coyoteFutureMachine,
    alt: "A coyote stands atop a vast machine wrapped around the globe while a few men in suits kneel before it with offerings; below, crowds of tiny people file along roads toward a distant city.",
    width: 1000,
    height: 750,
  },
  jobs: {
    src: havesAndHaveNots,
    alt: "Two foxes in suits look down from a hilltop marked “Haves” as robots carry crates through a fenced factory; below a wall gated with “AI does it better,” a crowd of workers trudges toward shacks marked “Have nots.”",
    width: 1000,
    height: 750,
  },
};

// Keep the explanation visible: readers should not need a spinner or dialog to
// discover a concern. The diagram describes a mechanism, not measured quantities.
// @param {object} risk - one entry from riskConcerns, including its listening links
export default function RiskConcernCard({ risk }) {
  return (
    <GuideCard
      cellId={risk.cellId}
      className={`risk-concern risk-concern-${risk.id}`}
      deck={risk.summary}
      eyebrow={risk.concern.toUpperCase()}
      footer={
        <div className="concern-sources">
          <p className="concern-listen-label">Hear Daniel Kokotajlo explain it</p>
          {risk.listening.map((link) => (
            <a
              className="concern-listen"
              href={sourceRegistry[link.sourceId].url}
              key={link.label}
              rel="noopener noreferrer"
              target="_blank"
            >
              <FieldIcon name="play" />
              <span>{link.label}<small>80,000 Hours · start at {link.time}</small></span>
              <FieldIcon name="external" />
            </a>
          ))}
          <SourceLinkButton label="Source & context" sourceIds={risk.sourceIds} />
        </div>
      }
      span={risk.id === "race" ? "span-12" : "span-6"}
      title={risk.title}
    >
      <figure className="concern-graphic">
        {CONCERN_IMAGES[risk.id] ? (
          <img
            className="concern-image"
            {...CONCERN_IMAGES[risk.id]}
            loading="lazy"
          />
        ) : (
          <div className="concern-flow">
            {risk.steps.map((step, index) => (
              <div className="concern-step" key={step.label}>
                {index > 0 ? <FieldIcon className="concern-arrow" name="arrow" /> : null}
                <span className="concern-symbol"><FieldIcon name={step.icon} /></span>
                <span>{step.label}</span>
              </div>
            ))}
          </div>
        )}
        <figcaption><span>Illustration</span> {risk.caption}</figcaption>
      </figure>
      <div className="concern-detail">
        <h4>Why this problem does not go away on its own</h4>
        <p>{risk.detail}</p>
      </div>
    </GuideCard>
  );
}
