import BuilderQuotes from "./builder-quotes.jsx";
import ChapterSection from "./chapter-section.jsx";
import { riskConcerns } from "../data/risk-concerns.js";
import GuideCard, { SourceLinkButton } from "./guide-card.jsx";
import RiskConcernCard from "./risk-concern-card.jsx";
import SurveyChart, { SurveyChartFooter } from "./survey-chart.jsx";

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
        deck="People closely involved in building frontier AI have publicly acknowledged serious risks. Their preferred responses differ."
        eyebrow="WARNINGS FROM THE BUILDERS"
        span="span-12"
        title="The concern is not just coming from the sidelines."
      >
        <BuilderQuotes />
      </GuideCard>

      <GuideCard
        cellId="2G"
        className="survey-card"
        deck="A survey of 2,778 AI researchers found substantial concern—and a wide range of views. Explore how the framing changes the summary."
        eyebrow="ASK THE RESEARCHERS"
        footer={
          <>
            <SourceLinkButton label="Read the survey & caveats" sourceIds="survey" />
            <SurveyChartFooter />
          </>
        }
        span="span-12"
        title="Disagreement is part of the evidence."
      >
        <SurveyChart />
      </GuideCard>
    </ChapterSection>
  );
}
