import roadLandscape from "../assets/road-landscape.svg";
import { siteMeta } from "../data/site-meta.js";
import useGuideStore from "../hooks/use-guide-store.js";
import BrandWordmark from "./brand-wordmark.jsx";
import FieldIcon from "./field-icon.jsx";
import "./closing-band.scss";

// Closing band and footer. The closing copy deliberately stops short of claiming that slowing
// down solves anything; the whole page is an argument about odds, not a promise.
export default function ClosingBand() {
  return (
    <section className="closing">
      <div className="closing-art">
        <img
          alt=""
          className="landscape landscape-footer"
          src={roadLandscape}
        />
      </div>
      <div className="closing-copy">
        <p className="eyebrow">A future we choose</p>
        <h2>
          Slow the race.
          <br />
          Strengthen safeguards.
          <br />
          <span>Keep the benefits in view.</span>
        </h2>
        <p>
          Not a promise that slowing down solves everything.
          <br />
          A case for giving ourselves a better chance.
        </p>
        <a className="btn yellow" href="#actions">
          Choose a next step <FieldIcon name="arrow" />
        </a>
      </div>
    </section>
  );
}

export function SiteFooter() {
  const { openDialog } = useGuideStore();

  return (
    <footer className="site-footer">
      <BrandWordmark />

      <p>
        Interactive field guide · v{siteMeta.version}
        <br />
        Source review: {siteMeta.reviewed}
      </p>

      <div>
        <button className="text-btn" onClick={() => openDialog({ type: "sources", kicker: "EVIDENCE LIBRARY" })} type="button">
          Sources &amp; data notes
        </button>
        <button className="text-btn" onClick={() => openDialog({ type: "original" })} type="button">
          Original visual concept
        </button>
        <button className="text-btn" onClick={() => openDialog({ type: "about" })} type="button">
          About this prototype
        </button>
      </div>

      <span className="privacy-note">
        No analytics.
        <br />
        No account. No backend.
      </span>
    </footer>
  );
}
