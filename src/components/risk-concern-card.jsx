import { sourceRegistry } from "../data/source-registry.js";
import FieldIcon from "./field-icon.jsx";
import GuideCard, { SourceLinkButton } from "./guide-card.jsx";
import "./risk-concern-card.scss";

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
        <div className="concern-flow">
          {risk.steps.map((step, index) => (
            <div className="concern-step" key={step.label}>
              {index > 0 ? <FieldIcon className="concern-arrow" name="arrow" /> : null}
              <span className="concern-symbol"><FieldIcon name={step.icon} /></span>
              <span>{step.label}</span>
            </div>
          ))}
        </div>
        <figcaption><span>Illustration</span> {risk.caption}</figcaption>
      </figure>
      <div className="concern-detail">
        <h4>Why this problem does not go away on its own</h4>
        <p>{risk.detail}</p>
      </div>
    </GuideCard>
  );
}
