import roadLandscape from "../assets/road-landscape.svg";
import FieldIcon from "./field-icon.jsx";
import "./hero-banner.scss";

// Opening band. The last strip states the page's own bias up front — it argues for pacing, and
// it also shows the uncertainty — which is the honest way to start a page like this.
export default function HeroBanner() {
  return (
    <section className="hero" id="top">
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="tiny-line" />
            An interactive field guide
          </p>
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
            Not a stop. A smarter pace for the most capable systems—and more time to shape the
            future we actually want.
          </p>
          <a className="btn yellow" href="#pressure">
            Explore the case <FieldIcon name="down" />
          </a>
          <div className="hero-meta">
            Four chapters <span>·</span> Evidence, not inevitability
          </div>
        </div>

        <div className="hero-visual">
          <img
            alt="A winding road toward a sunlit mountain landscape, with signs for safer AI and shared benefits"
            className="landscape landscape-hero"
            src={roadLandscape}
          />
          <div className="hero-sticker">
            A future we choose.
            <span>Not one we race into.</span>
          </div>
        </div>
      </div>

      <div className="hero-bottom">
        <span>
          <FieldIcon name="heart" /> Keep the benefits in view
        </span>
        <p>
          This guide makes the case for pacing frontier AI. It also shows the uncertainty and the
          tradeoffs.
        </p>
      </div>
    </section>
  );
}
