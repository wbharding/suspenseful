import useGuideStore from "../hooks/use-guide-store.js";
import BrandWordmark from "./brand-wordmark.jsx";
import FieldIcon from "./field-icon.jsx";
import "./site-header.scss";

// Fixed-height masthead. The four controls are the ones a reader may want at any point in the
// page: the evidence library, the theme and motion switches, and their own saved plan.
export default function SiteHeader() {
  const { planCount, reducedMotion, theme, openDialog, toggleReducedMotion, toggleTheme } =
    useGuideStore();

  return (
    <header className="site-header">
      <BrandWordmark />

      <nav aria-label="Main navigation" className="header-nav">
        <a href="/#pressure">The Guide</a>
        <button type="button" onClick={() => openDialog({ type: "sources", kicker: "EVIDENCE LIBRARY" })}>Research</button>
        <button type="button" onClick={() => openDialog({ type: "about" })}>About</button>
      </nav>

      <div className="header-actions">
        <a className="btn header-explore" href="/#pressure">Explore the guide <FieldIcon name="arrow" /></a>
        <details className="reader-tools">
          <summary aria-label="Reading preferences and saved plan"><FieldIcon name="settings" /></summary>
          <div className="reader-tools-panel">
        <button
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          aria-pressed={theme === "dark"}
          className="icon-btn"
          onClick={toggleTheme}
          type="button"
        >
          <FieldIcon name="bulb" />
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
        </details>
      </div>
    </header>
  );
}
