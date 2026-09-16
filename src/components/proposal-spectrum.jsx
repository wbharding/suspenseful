import { proposalSpectrum } from "../data/slowdown-data.js";
import useSelectedItem from "../hooks/use-selected-item.js";
import "./proposal-spectrum.scss";

// Element 3D. The off-ramp for the whole poster: the ask is a menu from light-touch to hard
// pause, not an off switch. Each step also carries its tradeoff, because a reader who only
// sees the upside of the strongest option has been sold something rather than shown it.
export default function ProposalSpectrum() {
  const { selectedId, select } = useSelectedItem({ initialId: proposalSpectrum.steps[0].id });
  const selectedStep = proposalSpectrum.steps.find((step) => step.id === selectedId);

  return (
    <div className="proposal-spectrum">
      <ol className="spectrum-step-list">
        {proposalSpectrum.steps.map((step, stepIndex) => (
          <li className="step-list-cell" key={step.id}>
            <button
              aria-pressed={selectedId === step.id}
              className={`step-list-button strength-${stepIndex}${
                selectedId === step.id ? " is-active" : ""
              }`}
              onClick={() => select(step.id)}
              type="button"
            >
              <span className="list-button-intensity">{step.intensity}</span>
              <span className="list-button-name">{step.label}</span>
              <span className="list-button-blurb">{step.blurb}</span>
            </button>
          </li>
        ))}
      </ol>

      {selectedStep ? (
        <div className="spectrum-step-detail">
          <p className="step-detail-body">{selectedStep.detail}</p>
          <p className="step-detail-tradeoff">
            <span className="detail-tradeoff-label">Tradeoff</span>
            {selectedStep.tradeoff}
          </p>
        </div>
      ) : (
        <p className="detail-prompt-note">Pick a proposal to see what it does and what it costs.</p>
      )}

      <div className="spectrum-extra-ask">
        <p className="extra-ask-title">{proposalSpectrum.extraAsk.title}</p>
        <p className="extra-ask-body">{proposalSpectrum.extraAsk.body}</p>
      </div>
    </div>
  );
}
