import { actionItems } from "../data/action-data.js";
import { riskConcerns } from "../data/risk-concerns.js";
import { siteMeta } from "../data/site-meta.js";
import { sourceRegistry } from "../data/source-registry.js";
import { surveyHeadline } from "../data/survey-data.js";
import { safetyWorkstreams } from "../data/workstream-data.js";
import { DEFAULT_HOST, siteForHostname, SITES } from "../site-config.js";

function PrintSources({ ids }) {
  return (
    <p className="print-sources">
      <strong>Sources &amp; context: </strong>
      {ids.map((id, index) => (
        <span key={id}>
          {index > 0 && " · "}
          <a href={sourceRegistry[id].url}>{sourceRegistry[id].title}</a>
        </span>
      ))}
    </p>
  );
}

// A deliberately edited print edition: game state and collapsed dialogs cannot explain
// themselves on paper. Shared data supplies the actions, workstreams and citations.
export default function PrintGuide() {
  const site = siteForHostname(window.location.hostname);
  const host = Object.keys(SITES).find((key) => SITES[key] === site) || DEFAULT_HOST;

  return (
    <>
      <div className="print-guide-tools">
        <button className="text-btn" type="button" onClick={() => window.print()}>
          Print the two-page guide
        </button>
        <span>Front &amp; back · choose double-sided, flip on long edge</span>
      </div>
      <article className="print-guide" aria-label="Two-page field guide">
        <section className="print-sheet" aria-label="Front: pressure and risks">
          <header className="print-heading">
            <p className="print-kicker">{host} · A clearer tomorrow</p>
            <h1>Why slow the AI race?</h1>
            <p className="print-deck">Keep useful AI moving. Give safeguards time to catch up.</p>
            <p>A smarter pace for the most capable systems gives us more time to shape the future
              we actually want. This guide argues for pacing frontier AI while acknowledging
              uncertainty, potential benefits and the costs of delay.</p>
          </header>

          <section className="print-chapter" aria-labelledby="print-pressure">
            <h2 id="print-pressure"><span>01</span> Why the pressure?</h2>
            <p className="print-intro">Capability can advance faster than our ability to understand and govern it.</p>
            <div className="print-columns">
              <div>
                <h3>Better scores are not a safety case.</h3>
                <p>As models surpass established benchmarks, measuring further progress becomes
                  harder. METR tracks the difficulty of tasks AI can complete, measured in
                  human-expert time at a specified success rate. This is not how long an AI
                  runs, or evidence that it can replace an entire job.</p>
                <h3>More capable ≠ more understood.</h3>
                <p>Safety requires evaluation, alignment, cybersecurity and governance.
                  Passing today’s tests does not establish safety in unfamiliar situations.
                  A crowded release calendar illustrates competitive pressure, not a capability score.</p>
              </div>
              <div>
                <h3>Some releases are hard to undo.</h3>
                <p>Once model weights have been copied, withdrawing the original does not
                  retrieve independently held copies. The recall demo illustrates why safeguards
                  before release can matter more than promises to reverse course afterward.</p>
                <h3>It gets harder to ease off the gas.</h3>
                <p>Financial commitments, market expectations and fear of falling behind can
                  reward speed even when participants acknowledge risks. The driving game
                  illustrates these incentives; it does not calculate risk or predict a crash.</p>
              </div>
            </div>
            <PrintSources ids={["metr-live", "amodei"]} />
          </section>

          <section className="print-chapter" aria-labelledby="print-risks">
            <h2 id="print-risks"><span>02</span> What could go wrong?</h2>
            <p className="print-intro">Possible harms, not a timetable. Different risks need different responses.</p>
            <div className="print-columns">
              <div>
                {riskConcerns.slice(0, 3).map((risk) => (
                  <div key={risk.id}>
                    <h3>{risk.concern}</h3>
                    <p>{risk.summary}</p>
                  </div>
                ))}
              </div>
              <div>
                {riskConcerns.slice(3).map((risk) => (
                  <div key={risk.id}>
                    <h3>{risk.concern}</h3>
                    <p>{risk.summary}</p>
                  </div>
                ))}
                <h3>Concern is evidence of concern.</h3>
                <p>In a 2023 survey of {surveyHeadline.respondents.toLocaleString("en-US")} AI
                  researchers, {surveyHeadline.range}% {surveyHeadline.claim} These are
                  subjective beliefs, not measured frequencies. {surveyHeadline.warning}
                  {" "}Researchers and AI builders disagree about timing and the best response.</p>
              </div>
            </div>
            <PrintSources ids={["survey", "kokotajlo", "kokotajlo-race-incentives"]} />
          </section>
          <footer className="print-footer"><span>{host} · Evidence, not inevitability</span><span>1 / 2 · Continue on the back →</span></footer>
        </section>

        <section className="print-sheet" aria-label="Back: safeguards and actions">
          <header className="print-heading print-heading-back">
            <p className="print-kicker">{host} · A more thoughtful path forward</p>
            <h1>A future we choose.</h1>
            <p className="print-deck">Use the time. Don’t just lose it.</p>
          </header>
          <section className="print-chapter" aria-labelledby="print-slowdown">
            <h2 id="print-slowdown"><span>03</span> What would slowing down achieve?</h2>
            <p className="print-intro">Create space to reduce risks while preserving useful AI’s benefits.</p>
            <div className="print-columns">
              <div>
                <h3>Cooperation has precedent.</h3>
                <p>The Limited Test Ban Treaty, Asilomar’s recombinant-DNA safeguards and the
                  Montreal Protocol show different ways societies have coordinated around
                  high-stakes technologies. None proves that an AI agreement will work:
                  scope, incentives and verification differ.</p>
                <h3>A checkpoint needs three answers.</h3>
                <ol>
                  <li><strong>Defined scope:</strong> which activities and capabilities are covered?</li>
                  <li><strong>Independent verification:</strong> who has access and authority to check compliance?</li>
                  <li><strong>Conditions for proceeding:</strong> what evidence permits progress, and what stops it?</li>
                </ol>
                <p>Checking boxes in a demo is not certification. Real rules require evidence,
                  enforcement and a way to revise them.</p>
              </div>
              <div>
                <h3>A pause should have a job to do.</h3>
                <ul className="print-workstreams">
                  {safetyWorkstreams.map((workstream) => (
                    <li key={workstream.title}><strong>{workstream.title}:</strong> {workstream.deliverable}</li>
                  ))}
                </ul>
                <h3>Judge the tradeoffs.</h3>
                <p>Delay can postpone benefits, and poorly designed rules can entrench incumbents
                  or drive work elsewhere. Compare proposals by what they limit, how compliance
                  is checked, which benefits remain available and what ends the constraint.
                  A slowdown is a means to improve preparedness, not a guarantee of safety.</p>
              </div>
            </div>
            <PrintSources ids={["jfk", "asilomar", "montreal", "hassabis"]} />
          </section>
          <section className="print-chapter" aria-labelledby="print-actions">
            <h2 id="print-actions"><span>04</span> What can we do?</h2>
            <p className="print-intro">Start with one concrete action, then check whether it helped.</p>
            <div className="print-columns">
              {["high", "practical"].map((group) => (
                <div key={group}>
                  {actionItems.filter((action) => action.group === group).map((action) => (
                    <div className="print-action" key={action.id}>
                      <h3>{action.title}</h3>
                      <p>{action.description}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="print-next-step">
              <strong>My next step</strong>
              <p>One action: <span className="print-write-line" /></p>
              <p>By when: <span className="print-write-line" /> What would change my mind: <span className="print-write-line" /></p>
            </div>
            <PrintSources ids={["plan-a", "senate"]} />
          </section>
          <footer className="print-footer">
            <span>Full evidence, caveats and policy options: <a href={`https://${host}`}>{host}</a><br />Source review: {siteMeta.reviewed}</span>
            <span>2 / 2 · A smarter pace</span>
          </footer>
        </section>
      </article>
    </>
  );
}
