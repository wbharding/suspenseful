import ChapterSection from "./chapter-section.jsx";
import GuideCard, { SourceLinkButton } from "./guide-card.jsx";
import HistoryPrecedents from "./history-precedents.jsx";
import PauseWorkstreams from "./pause-workstreams.jsx";
import PolicySpectrum from "./policy-spectrum.jsx";
import SharedCheckpoint from "./shared-checkpoint.jsx";

export default function SlowdownChapter() {
  return (
    <ChapterSection
      eyebrow="MORE THAN ONE WAY TO SLOW THE RACE"
      id="slowdown"
      intro="A coordinated slowdown can create space to reduce risks and increase the benefits."
      number="03"
      title="What would slowing down achieve?"
      tone="slowdown"
    >
      <GuideCard
        cellId="3A"
        deck="Societies have coordinated around high-stakes technologies. Not perfectly, and not always all at once."
        eyebrow="COOPERATION HAS PRECEDENT"
        footer={<SourceLinkButton label="Explore the precedents" sourceIds="jfk,asilomar,montreal" />}
        span="span-6"
        title="We have made room for caution before."
      >
        <HistoryPrecedents />
      </GuideCard>

      <GuideCard
        cellId="3B"
        deck="A useful checkpoint needs answers to three practical questions. Select each condition below."
        eyebrow="SHARED RULES"
        footer={
          <>
            <SourceLinkButton sourceIds="hassabis,amodei" />
            <span className="micro">Illustration, not certification.</span>
          </>
        }
        span="span-6"
        title="Change the rules—not just individual behavior."
      >
        <SharedCheckpoint />
      </GuideCard>

      <GuideCard
        cellId="3C"
        className="build-card"
        deck="Invest in the people, institutions and tools that make a more capable future safer."
        eyebrow="USE THE TIME. DON’T JUST LOSE IT."
        span="span-12"
        title="A pause should have a job to do."
      >
        <PauseWorkstreams />
      </GuideCard>

      <GuideCard
        cellId="3D"
        className="policy-card"
        deck="There are lighter-touch measures and stronger interventions. Select one to see the mechanism—and its tradeoff."
        eyebrow="A SPECTRUM OF PROPOSALS"
        span="span-12"
        title="Not an off switch. A set of choices."
      >
        <PolicySpectrum />
      </GuideCard>
    </ChapterSection>
  );
}
