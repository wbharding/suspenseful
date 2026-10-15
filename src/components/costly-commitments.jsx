import FieldIcon from "./field-icon.jsx";
import { CardInsight, SourceLinkButton } from "./guide-card.jsx";

const COMMITMENTS = [
  {
    icon: "clock",
    who: "Warnings before the companies",
    title: "Some warnings predate the companies themselves.",
    body: "Sam Altman warned about threats to humanity from superhuman AI in 2015, before OpenAI was founded. In 2017, years before founding Anthropic, Dario Amodei discussed safety research and cooperation to avoid a dangerous AI arms race. These concerns were already on the record before either had today’s products to promote.",
    sourceIds: "altman,amodei-safety-2017",
  },
  {
    icon: "people",
    who: "Concern beyond company leaders",
    title: "The warnings also come from academic researchers.",
    body: "Yoshua Bengio’s 2023 essay described how advanced AI could escape human control and called for stronger safeguards. A survey of published AI researchers also found substantial concern and support for more safety research. A corporate sales pitch alone cannot explain this wider scientific debate, even though researchers disagree about the risks and the best response.",
    sourceIds: "bengio-rogue-ai,survey",
  },
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

// Element 2G. Historical warnings and academic concern complement examples of builders
// accepting commercial costs. Together they challenge a purely promotional explanation.
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
            {item.sourceIds ? <SourceLinkButton sourceIds={item.sourceIds} /> : null}
          </li>
        ))}
      </ol>
      <CardInsight icon="scales">
        The history, academic warnings and costly actions make “just marketing” an inadequate
        explanation. That is reason to take the concerns seriously, not proof of a particular
        risk estimate or an endorsement of every proposed regulation.
      </CardInsight>
    </>
  );
}
