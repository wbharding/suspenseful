import { actionGroups } from "../data/action-data.js";
import { bandCopy } from "../data/poster-copy.js";
import { irreversibleChoices, modelReleaseCadence, taskHorizonTrend, understandingFootnote } from "../data/pressure-data.js";
import { harmLadder, raceLanes, riskEstimateSpread } from "../data/risk-data.js";
import { coordinationPrecedents, pauseInvestments, proposalSpectrum, sharedCheckpoint } from "../data/slowdown-data.js";
import { leaderQuoteIntro } from "../data/leader-quote-data.js";
import { useState } from "react";
import ActionGrid from "./action-grid.jsx";
import ArtQueuePanel from "./art-queue-panel.jsx";
import ElementCard from "./element-card.jsx";
import HarmLadder from "./harm-ladder.jsx";
import IrreversibleChoicePanel from "./irreversible-choice-panel.jsx";
import LeaderQuoteWall from "./leader-quote-wall.jsx";
import PauseInvestmentPanel from "./pause-investment-panel.jsx";
import PosterClosing from "./poster-closing.jsx";
import PosterMasthead from "./poster-masthead.jsx";
import PrecedentStrip from "./precedent-strip.jsx";
import ProposalSpectrum from "./proposal-spectrum.jsx";
import RaceLaneDiagram from "./race-lane-diagram.jsx";
import ReleasePaceTimeline from "./release-pace-timeline.jsx";
import RiskEstimateSpread from "./risk-estimate-spread.jsx";
import SectionBand from "./section-band.jsx";
import SectionNav from "./section-nav.jsx";
import SharedCheckpointDiagram from "./shared-checkpoint-diagram.jsx";
import TaskHorizonChart from "./task-horizon-chart.jsx";
import UnderstandingTiles from "./understanding-tiles.jsx";
import "./infographic-page.scss";

const NAV_BANDS = [ bandCopy.pressure, bandCopy.risk, bandCopy.slowdown, bandCopy.action ];

export default function InfographicPage() {
  const [ isShowingArtMarkers, setIsShowingArtMarkers ] = useState(true);

  return (
    <div className={`infographic-page${isShowingArtMarkers ? " is-showing-art-markers" : ""}`}>
      <a className="page-skip-link" href="#pressure">
        Skip to the poster
      </a>

      <PosterMasthead />
      <SectionNav bands={NAV_BANDS} />

      <main className="page-band-stack">
        <SectionBand band={bandCopy.pressure} columns="four-up">
          <ElementCard
            detail={taskHorizonTrend.detail}
            index="1A"
            sources={taskHorizonTrend.sources}
            title="AI can tackle longer tasks"
            blurb="The length of tasks AI can complete is increasing rapidly."
            footnote={taskHorizonTrend.caption}
          >
            <TaskHorizonChart />
          </ElementCard>

          <ElementCard
            blurb="Safety requires sustained effort across many areas."
            footnote={understandingFootnote}
            index="1B"
            title="Understanding takes work"
          >
            <UnderstandingTiles />
          </ElementCard>

          <ElementCard
            blurb="New model releases are coming quickly."
            detail={modelReleaseCadence.detail}
            index="1C"
            sources={modelReleaseCadence.sources}
            title="The pace of new releases"
          >
            <ReleasePaceTimeline />
          </ElementCard>

          <ElementCard
            blurb="Once model weights spread, recalling every copy is difficult."
            footnote={irreversibleChoices.caption}
            index="1D"
            title="Some choices are hard to reverse"
          >
            <IrreversibleChoicePanel />
          </ElementCard>
        </SectionBand>

        <SectionBand band={bandCopy.risk} columns="four-up">
          <ElementCard
            blurb="Each actor has their own incentive to move faster."
            detail={raceLanes.detail}
            footnote={raceLanes.footnote}
            index="2A"
            title="A race that nobody wants to lose"
          >
            <RaceLaneDiagram />
          </ElementCard>

          <ElementCard
            footnote={harmLadder.footnote}
            index="2B"
            title="A range of potential harms"
          >
            <HarmLadder />
          </ElementCard>

          <ElementCard
            detail={[ leaderQuoteIntro.summary ]}
            detailLabel="Read the summary"
            index="2C"
            sources={[
              { label: leaderQuoteIntro.jointStatement.source, url: leaderQuoteIntro.jointStatement.url },
            ]}
            title="Warnings from the builders"
          >
            <LeaderQuoteWall />
          </ElementCard>

          <ElementCard
            detail={riskEstimateSpread.detail}
            index="2D"
            title="Researchers disagree on the odds"
            blurb="Not on the need for more safety work."
          >
            <RiskEstimateSpread />
          </ElementCard>
        </SectionBand>

        <SectionBand band={bandCopy.slowdown} columns="three-up">
          <ElementCard
            blurb={coordinationPrecedents.caption}
            footnote={coordinationPrecedents.footnote}
            index="3A"
            title="Cooperation has precedent"
          >
            <PrecedentStrip />
          </ElementCard>

          <ElementCard
            blurb={sharedCheckpoint.caption}
            footnote={sharedCheckpoint.footnote}
            index="3B"
            title={sharedCheckpoint.title}
          >
            <SharedCheckpointDiagram />
          </ElementCard>

          <ElementCard
            blurb={pauseInvestments.caption}
            footnote={pauseInvestments.footnote}
            index="3C"
            title={pauseInvestments.title}
          >
            <PauseInvestmentPanel />
          </ElementCard>

          <ElementCard
            blurb={proposalSpectrum.caption}
            footnote={proposalSpectrum.footnote}
            index="3D"
            spanFullRow
            title={proposalSpectrum.title}
          >
            <ProposalSpectrum />
          </ElementCard>
        </SectionBand>

        <SectionBand band={bandCopy.action} columns="two-up">
          {actionGroups.map((group) => (
            <ElementCard
              blurb={group.blurb}
              index={group.index}
              key={group.id}
              title={group.title}
            >
              <ActionGrid group={group} />
            </ElementCard>
          ))}
        </SectionBand>
      </main>

      <PosterClosing />
      <ArtQueuePanel
        onToggleMarkers={() => setIsShowingArtMarkers((wasShowing) => !wasShowing)}
        showMarkers={isShowingArtMarkers}
      />
    </div>
  );
}
