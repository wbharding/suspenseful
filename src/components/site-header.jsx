import useGuideStore from "../hooks/use-guide-store.js";
import BrandWordmark from "./brand-wordmark.jsx";
import FieldIcon from "./field-icon.jsx";
import "./site-header.scss";

// Fixed-height masthead. The three controls are the ones a reader may want at any point in the
// page: the evidence library, the motion switch, and their own saved plan.
export default function SiteHeader() {
  const { planCount, reducedMotion, openDialog, toggleReducedMotion } = useGuideStore();

  return (
    <header className="site-header">
      <BrandWordmark />

      <div className="header-actions">
        <button
          className="btn quiet small"
          onClick={() => openDialog({ type: "sources", kicker: "EVIDENCE LIBRARY" })}
          type="button"
        >
          <FieldIcon name="book" />
          <span>Sources &amp; notes</span>
        </button>

        <button
          aria-label={reducedMotion ? "Enable animations" : "Reduce animations"}
          aria-pressed={reducedMotion}
          className="icon-btn"
          onClick={toggleReducedMotion}
          type="button"
        >
          <FieldIcon name="spark" />
        </button>

        <button
          className="btn small header-plan"
          onClick={() => openDialog({ type: "plan", kicker: "YOUR LOCAL ACTION PLAN" })}
          type="button"
        >
          <FieldIcon name="bookmark" />
          <span>My plan</span>
          <b className="plan-count">{planCount}</b>
        </button>
      </div>
    </header>
  );
}
