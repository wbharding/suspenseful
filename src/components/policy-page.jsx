import PolicySpectrum from "./policy-spectrum.jsx";
import FieldIcon from "./field-icon.jsx";
import { navigateTo } from "../lib/navigate.js";
import "./policy-page.scss";

// Secondary page for the policy menu. The main guide ends on activation (actions); this is
// the set of choices, not an off switch, reached after that point.
export default function PolicyPage() {
  function handleBack() {
    navigateTo("/");
    window.setTimeout(() => {
      document.getElementById("actions")?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }

  return (
    <main className="policy-page" id="main">
      <button className="text-btn" onClick={handleBack} type="button">
        <FieldIcon name="arrow" />
        Back to what we can do
      </button>
      <p className="eyebrow">A SET OF CHOICES</p>
      <h1>Not an off switch.</h1>
      <p className="policy-page-deck">
        You are already in a position to act. These are the policy ideas people actually propose —
        lighter-touch through to a targeted pause — each with a tradeoff.
      </p>
      <PolicySpectrum />
    </main>
  );
}
