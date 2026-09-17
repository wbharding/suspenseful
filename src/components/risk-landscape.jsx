import { riskLandscape } from "../data/risk-landscape-data.js";
import useGuideStore from "../hooks/use-guide-store.js";
import FieldIcon from "./field-icon.jsx";

// Element 2B. A spectrum of harms, not a probability ranking.
//
// Four full-width bands, warm through to dark, echoing the printed infographic. The earlier
// version was a 2x2 tab strip with a detail pane below it; the bands carry the same four harms
// with less chrome, and the detail moved into a dialog so that each band can show Kokotajlo's
// own account of that harm rather than a two-line summary.
export default function RiskLandscape() {
  const { openDialog } = useGuideStore();

  return (
    <>
      <ul className="risk-bands">
        {riskLandscape.map((risk, index) => (
          <li key={risk.title}>
            <button
              className={`risk-band tone-${risk.tone}`}
              onClick={() =>
                openDialog({
                  type: "risk-explainer",
                  index,
                  kicker: "IN HIS OWN WORDS",
                })
              }
              type="button"
            >
              <span className="risk-band-art">
                <FieldIcon name={risk.icon} />
              </span>
              <span className="risk-band-text">
                <strong>{risk.title}</strong>
                <span className="risk-band-summary">{risk.summary}</span>
              </span>
              <FieldIcon name="arrow" />
            </button>
          </li>
        ))}
      </ul>
      <p className="risk-bands-note">
        Timing and likelihood remain uncertain. Select a harm for Daniel Kokotajlo&rsquo;s
        account of it.
      </p>
    </>
  );
}
