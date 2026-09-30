import FieldIcon from "./field-icon.jsx";
import "./hero-banner.scss";

// Opening band. The last strip states the page's own bias up front — it argues for pacing, and
// it also shows the uncertainty — which is the honest way to start a page like this.
export default function HeroBanner() {
  return (
    <section className="hero" id="top">
      <div className="hero-inner">
        <div className="hero-copy">
          <h1>
            Why slow
            <br />
            the <span>AI race?</span>
          </h1>
          <p className="hero-deck">
            Keep useful AI moving.
            <br />
            Give safeguards time to catch up.
          </p>
          <p className="hero-explainer">
            The average citizen sees a news headline scream "AI could make us extinct... in under 10 years!" and rolls their eyes.
            Daily life is so incredibly far removed from what's happening at the frontier of AI for anyone still reading this explainer.
            But even if you exist outside the apparent domain of AI's current influence, pull up a chair and spare a few minutes to
            mull where the current trajectory puts us in 2030?
          </p>
          <a className="btn hero-cta" href="#pressure">
            Explore the case <FieldIcon name="arrow" />
          </a>
          <div className="hero-meta">
            Single-page AI risk explainer <span>·</span> Four chapters <span>·</span> Evidence, not inevitability
          </div>
        </div>

        <div className="hero-visual">
          <img
            alt="A winding road toward a sunlit mountain landscape, with signs for safer AI and shared benefits"
            className="landscape landscape-hero"
            src="/images/home/mountain-road.webp"
            width="1600"
            height="1228"
            fetchPriority="high"
          />
        </div>
      </div>

    </section>
  );
}
