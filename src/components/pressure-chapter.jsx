import { useCallback, useState } from "react";
import commitmentsImage from "../assets/commitments-compound.png";
import openWeightsImage from "../assets/open-weights-copies.png";
import { modelReleases, releaseProviders } from "../data/release-data.js";
import CapabilityChart, { CapabilityChartFooter } from "./capability-chart.jsx";
import BenchmarkGraveyard from "./benchmark-graveyard.jsx";
import ChapterSection from "./chapter-section.jsx";
import FieldIcon from "./field-icon.jsx";
import GuideCard, {
  CardNote,
  EvidenceTag,
  SourceLinkButton,
} from "./guide-card.jsx";
import ReleaseTimeline, { ReleaseTimelineFooter } from "./release-timeline.jsx";
import "./pressure-chapter.scss";

export default function PressureChapter() {
  const [ timelineProviders, setTimelineProviders ] = useState(releaseProviders);
  const handleFilterChange = useCallback((next) => setTimelineProviders(next), []);

  return (
    <ChapterSection
      eyebrow="THE CAPABILITY–READINESS GAP"
      id="pressure"
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
              Read its technical details below if you're curious why we're losing one of our last reliable measures of AI progress.</p>
            <div className="card-label-row">
              <EvidenceTag>Historical benchmark data</EvidenceTag>
              <EvidenceTag variant="neutral">2023–2025 model releases</EvidenceTag>
            </div>
            <CapabilityChart />
            <CardNote heading="What this measures">
              <p>Human-expert task time at 50% model success—not how long an AI runs, or whether it can
              replace a whole job. Points use METR’s Time Horizon 1.1 measurement where one exists
              and 1.0 otherwise.</p><br />
              <p>
                Unfortunately, METR’s Time Horizon measurement is also <a href="https://metr.org/notes/2026-01-22-time-horizon-limitations/" target="_blank">reaching its limits</a>.
                There just aren't that many tasks that can be run for 8+ hours without human intervention, then be evaluated as true/false by a human expert.
              </p>
            </CardNote>
          </div>
          <BenchmarkGraveyard />
        </div>
      </GuideCard>

      <GuideCard
        cellId="1B"
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
        cellId="1C"
        className="pressure-concept-card"
        deck="Once model weights are copied, recalling the original does not retrieve every independent copy."
        eyebrow="A ONE-WAY DOOR"
        footer={<SourceLinkButton sourceIds="kokotajlo-open-weights,barnes-release-decisions,nanda-unlearning" />}
        span="span-6"
        title={<>Some releases are <span className="concept-emphasis">hard to undo.</span></>}
      >
        <img
          alt="An open-weights crate leaves the original mountain cabin, with independent copies scattered along branching paths."
          className="pressure-concept-art"
          height="434"
          loading="lazy"
          src={openWeightsImage}
          width="734"
        />
        <ul className="pressure-concept-points">
          <li>
            <FieldIcon name="leaf" />
            <span>A public release can be copied, mirrored, and adapted far beyond the original lab’s control.</span>
          </li>
          <li>
            <FieldIcon name="leaf" />
            <span>When we worry about biological agents or novel weapons being created, it will come from a modified open weights model.</span>
          </li>
          <li>
            <FieldIcon name="leaf" />
            <span>The more powerful open models we release, the greater the potential for bad actors to take advantage of offense/defense imbalances.</span>
          </li>
        </ul>
      </GuideCard>

      <GuideCard
        cellId="1D"
        className="pressure-concept-card"
        deck="Financial commitments and competitive expectations can make restraint harder—even when risks are openly acknowledged."
        eyebrow="THE COMMITMENTS COMPOUND"
        footer={<SourceLinkButton label="Argument & limits" sourceIds="kokotajlo-race-incentives,ai-2027-race,barnes-release-decisions" />}
        span="span-6"
        title={<>It gets <span className="concept-emphasis">harder</span> to take your foot off the gas.</>}
      >
        <img
          alt="An AI race car carries more investment, higher expectations, and longer time horizons up a winding road, past signs for capex, shareholders, competition, and infrastructure."
          className="pressure-concept-art"
          height="433"
          loading="lazy"
          src={commitmentsImage}
          width="732"
        />
        <ul className="pressure-concept-points">
          <li>
            <FieldIcon name="leaf" />
            <span>After companies raise more capital and build more infrastructure, slowing down becomes politically and financially harder.</span>
          </li>
          <li>
            <FieldIcon name="leaf" />
            <span>If frontier AI firms go public, millions of additional shareholders may reward acceleration more than caution.</span>
          </li>
        </ul>
      </GuideCard>
    </ChapterSection>
  );
}
