import BuilderQuotes from "./builder-quotes.jsx";
import ChapterSection from "./chapter-section.jsx";
import CostlyCommitments from "./costly-commitments.jsx";
import { riskConcerns } from "../data/risk-concerns.js";
import { sourceRegistry } from "../data/source-registry.js";
import FieldIcon from "./field-icon.jsx";
import GuideCard from "./guide-card.jsx";
import RiskConcernCard from "./risk-concern-card.jsx";

export default function RisksChapter() {
  return (
    <ChapterSection
      eyebrow="POSSIBLE HARMS, NOT A TIMETABLE"
      id="risks"
      intro="Five concerns from Daniel Kokotajlo’s account of the AI race. The pressures are structural; the outcomes are not inevitable."
      number="02"
      title="What could go wrong?"
      tone="risks"
    >
      {riskConcerns.map((risk) => <RiskConcernCard key={risk.id} risk={risk} />)}

      <GuideCard
        cellId="2F"
        className="quote-section"
        deck="People closely involved in building frontier AI publicly acknowledge serious risks. "
        eyebrow="WARNINGS FROM THE BUILDERS"
        span="span-12"
        title="What do the most AI-fluent thinkers believe?"
      >
        <BuilderQuotes />
      </GuideCard>

      <GuideCard
        cellId="2G"
        className="commitments-card"
        deck="Some warnings predate the companies behind them. Academic researchers share the concern, and several AI leaders have acted on it at real cost."
        eyebrow="BEYOND THE SALES PITCH"
        footer={
          <a
            className="source-link"
            href={sourceRegistry["acx-not-corporate-plot"].url}
            rel="noopener noreferrer"
            target="_blank"
          >
            <FieldIcon name="book" />
            <span>Read Scott Alexander’s “AI Safety Is Not A Corporate Plot”</span>
            <FieldIcon name="external" />
          </a>
        }
        span="span-12"
        title="Is this just marketing?"
      >
        <CostlyCommitments />
      </GuideCard>
    </ChapterSection>
  );
}
