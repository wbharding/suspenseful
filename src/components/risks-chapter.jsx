import BuilderQuotes from "./builder-quotes.jsx";
import ChapterSection from "./chapter-section.jsx";
import GuideCard, { EvidenceTag, SourceLinkButton } from "./guide-card.jsx";
import RaceIllustration from "./race-illustration.jsx";
import RiskLandscape from "./risk-landscape.jsx";
import SurveyChart, { SurveyChartFooter } from "./survey-chart.jsx";

export default function RisksChapter() {
  return (
    <ChapterSection
      eyebrow="POSSIBLE HARMS, NOT A TIMETABLE"
      id="risks"
      intro="More capability can create new risks—for people, society and our control over technology."
      number="02"
      title="What could go wrong?"
      tone="risks"
    >
      <GuideCard
        cellId="2A"
        deck="Each actor has its own reasons to move faster. Turn on a shared checkpoint and see how the rules change."
        eyebrow="THE COORDINATION PROBLEM"
        footer={<SourceLinkButton label="The argument, not a simulation" sourceIds="draft,amodei" />}
        span="span-6"
        title="A race nobody wants to lose."
      >
        <EvidenceTag variant="illustration">Interactive illustration</EvidenceTag>
        <RaceIllustration />
      </GuideCard>

      <GuideCard
        cellId="2B"
        deck="Five harms. Spin the jewel, or jump by year. Higher placement does not imply a known probability or an inevitable sequence."
        eyebrow="THE RISK LANDSCAPE"
        span="span-6"
        title="Different harms. Different responses."
      >
        <RiskLandscape />
      </GuideCard>

      <GuideCard
        cellId="2C"
        className="quote-section"
        deck="People closely involved in building frontier AI have publicly acknowledged serious risks. Their preferred responses differ."
        eyebrow="WARNINGS FROM THE BUILDERS"
        span="span-12"
        title="The concern is not just coming from the sidelines."
      >
        <BuilderQuotes />
      </GuideCard>

      <GuideCard
        cellId="2D"
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
