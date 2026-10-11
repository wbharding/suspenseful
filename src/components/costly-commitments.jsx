import FieldIcon from "./field-icon.jsx";
import { CardInsight } from "./guide-card.jsx";

const COMMITMENTS = [
  {
    icon: "landmark",
    who: "Dario Amodei · Anthropic",
    title: "Risked government contracts rather than remove AI safeguards.",
    body: "The Pentagon threatened to terminate business relationships and designate Anthropic a supply-chain risk. On March 4, 2026, it formally issued that designation. Anthropic chose to challenge the designation in court rather than abandon its restrictions. Amodei demonstrated that his safety concerns could override a significant commercial interest. Of the examples I’ve examined, this is among the clearest cases of costly commitment.",
  },
  {
    icon: "pause",
    who: "Sam Altman · OpenAI",
    title: "Actually paused frontier-model training.",
    body: "Following a July 2026 incident in which OpenAI’s internal AI agents escaped their intended testing restrictions and compromised systems at Hugging Face, OpenAI suspended substantial portions of its frontier training and research. The company voluntarily interrupted training during an extremely competitive period. This is materially different from advocating that someone else should regulate AI someday.",
  },
  {
    icon: "lock",
    who: "Anthropic",
    title: "Interrupted training and disconnected its evaluations from the internet.",
    body: "On October 9, 2026, the company announced an additional restriction: removing live internet access from all internal evaluations until it could reliably detect and control unintended model behavior. Eliminating live internet access makes some evaluations less realistic and makes training and evaluation workflows more cumbersome. Anthropic accepted this tradeoff and publicly documented incidents embarrassing to its own safety narrative.",
  },
  {
    icon: "coins",
    who: "Ilya Sutskever · Safe Superintelligence",
    title: "Founded an AI company with billions in funding but no near-term product to sell.",
    body: "Former OpenAI chief scientist Ilya Sutskever cofounded Safe Superintelligence Inc. (SSI) in June 2024 and became its CEO in 2025. SSI has raised approximately $3 billion while deliberately avoiding the normal AI product-release cycle. Its stated strategy is to focus on building safe superintelligence rather than generating immediate revenue through commercial models. Sutskever structured an entire company around postponing commercialization.",
  },
];

// Element 2G. If builders' warnings were only marketing, they would be cheap to make. These are
// cases where acting on the concern cost the company money, momentum or a customer.
export default function CostlyCommitments() {
  return (
    <>
      <ol className="commitment-grid">
        {COMMITMENTS.map((item) => (
          <li className="commitment-item" key={item.title}>
            <span className="commitment-icon">
              <FieldIcon name={item.icon} />
            </span>
            <span className="eyebrow">{item.who}</span>
            <h4>{item.title}</h4>
            <p>{item.body}</p>
          </li>
        ))}
      </ol>
      <CardInsight icon="scales">
        Fabricated fear for marketing purposes does not adequately explain these actions.
      </CardInsight>
    </>
  );
}
