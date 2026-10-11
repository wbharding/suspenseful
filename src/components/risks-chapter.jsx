import BuilderQuotes from "./builder-quotes.jsx";
import ChapterSection from "./chapter-section.jsx";
import CostlyCommitments from "./costly-commitments.jsx";
import { riskConcerns } from "../data/risk-concerns.js";
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
        deck="If the warnings were only marketing, they would be cheap. Several AI leaders have acted on them at real cost."
        eyebrow="COSTLY COMMITMENTS"
        span="span-12"
        title="AI CEOs fearful as marketing?"
      >
        <CostlyCommitments />
      </GuideCard>
    </ChapterSection>
  );
}
