import { useCallback, useState } from "react";
import { modelReleases, releaseProviders } from "../data/release-data.js";
import CapabilityChart, { CapabilityChartFooter } from "./capability-chart.jsx";
import BenchmarkGraveyard from "./benchmark-graveyard.jsx";
import ChapterSection from "./chapter-section.jsx";
import GasPedalGame from "./gas-pedal-game.jsx";
import GuideCard, {
  CardInsight,
  CardNote,
  EvidenceTag,
  SourceLinkButton,
} from "./guide-card.jsx";
import RecallDemo from "./recall-demo.jsx";
import ReleaseTimeline, { ReleaseTimelineFooter } from "./release-timeline.jsx";
import SafetyWorkTiles from "./safety-work-tiles.jsx";

export default function PressureChapter() {
  const [ timelineProviders, setTimelineProviders ] = useState(releaseProviders);
  const handleFilterChange = useCallback((next) => setTimelineProviders(next), []);

  return (
    <ChapterSection
      eyebrow="THE CAPABILITY–READINESS GAP"
      id="pressure"
      intro="Capabilities can move faster than our ability to test, govern and adapt."
      number="01"
      title="Why the pressure?"
      tone="pressure"
    >
      <GuideCard
        cellId="1A"
        className="chart-card"
        eyebrow="RECOGNIZE THE PACE"
        footer={
          <>
            <SourceLinkButton sourceIds="metr,metr-2024,metr-live" />
            <CapabilityChartFooter />
          </>
        }
        span="span-12"
        title="Building intelligence: Fast, faster, well past humanity's fastest... then what?"
      >
        <div className="horizon-split">
          <div className="horizon-chart">
            <p className="card-deck">
              Practically every test humankind has ever devised to measure IQ or capability has <em>already been maxed out</em> by AI.
              This is making it increasingly difficult to even understand how "smart" AI is getting, let alone how to
              govern it.
            </p>
            <p className="card-deck">
              The only durable method of gauging progress velocity that has kept up with AI's exponential ascent:&nbsp;
              <strong>How long can it work productively on a task?</strong>
            </p>
            <p className="card-deck">Like so many other benchmarks, this durable stalwart is on its last legs.
              Read the technical definition of it before if you're curious why.</p>
            <div className="card-label-row">
              <EvidenceTag>Historical benchmark data</EvidenceTag>
              <EvidenceTag variant="neutral">2023–2025 model releases</EvidenceTag>
            </div>
            <CapabilityChart />
            <CardNote heading="What this measures">
              Human-expert task time at 50% model success—not how long an AI runs, or whether it can
              replace a whole job. Points use METR’s Time Horizon 1.1 measurement where one exists
              and 1.0 otherwise; the readout names which. The 2024 points use METR’s downloadable
              results retrieved September 29, 2026; other points retain the January 2026 snapshot.
            </CardNote>
          </div>
          <BenchmarkGraveyard />
        </div>
      </GuideCard>

      <GuideCard
        cellId="1B"
        deck="Safety is not one score. It requires sustained work across several fronts."
        eyebrow="UNDERSTANDING TAKES WORK"
        footer={<SourceLinkButton label="Why these workstreams?" sourceIds="amodei,hassabis" />}
        span="span-12"
        title="More capable ≠ more understood."
      >
        <SafetyWorkTiles />
        <CardInsight>
          A system passing today’s tests is not a guarantee of overall safety.
        </CardInsight>
      </GuideCard>

      <GuideCard
        cellId="1C"
        className="timeline-card"
        deck="Each block is a dated release. Each pop is one event. Hover a block for its name. Press the yellow play control — it loops back so you can tell the difference after the frog boiled."
        eyebrow="THE RELEASE RHYTHM"
        footer={
          <>
            <SourceLinkButton label="Coverage & methodology" sourceIds="release-dates" />
            <ReleaseTimelineFooter providers={timelineProviders} />
          </>
        }
        span="span-12"
        title="What does the AI race sound like?"
      >
        <div className="card-label-row">
          <EvidenceTag>{modelReleases.length} sourced release events</EvidenceTag>
          <EvidenceTag variant="neutral">Seven labs · Jan 2024–Sep 2026</EvidenceTag>
        </div>
        <ReleaseTimeline onFilterChange={handleFilterChange} />
      </GuideCard>

      <GuideCard
        cellId="1D"
        deck="Once model weights are copied, recalling the original does not retrieve every independent copy."
        eyebrow="A ONE-WAY DOOR"
        footer={<SourceLinkButton sourceIds="draft,amodei" />}
        span="span-6"
        title="Some releases are hard to undo."
      >
        <EvidenceTag variant="illustration">Interactive illustration</EvidenceTag>
        <RecallDemo />
      </GuideCard>

      <GuideCard
        cellId="1E"
        className="incentives-card"
        deck="Financial commitments and competitive expectations can make restraint harder—even when risks are openly acknowledged."
        eyebrow="THE COMMITMENTS COMPOUND"
        footer={<SourceLinkButton label="Argument & limits" sourceIds="draft,amodei" />}
        span="span-6"
        title="It gets harder to take your foot off the gas."
      >
        <EvidenceTag variant="illustration">Driving illustration</EvidenceTag>
        <GasPedalGame />
      </GuideCard>
    </ChapterSection>
  );
}
