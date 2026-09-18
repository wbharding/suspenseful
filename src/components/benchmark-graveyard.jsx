import { brokenBenchmarks } from "../data/benchmark-graveyard-data.js";
import { openSources } from "../lib/open-sources.js";
import useGuideStore from "../hooks/use-guide-store.js";
import "./benchmark-graveyard.scss";

// The other half of cell 1A. A list of tests that were supposed to last, each with the wait
// people quoted before the test fell.
export default function BenchmarkGraveyard() {
  const { openDialog } = useGuideStore();

  return (
    <aside className="benchmark-graveyard">
      <p className="eyebrow">A graveyard of beaten tests</p>
      <p className="graveyard-lede">
        Each stone is a benchmark that was supposed to take longer. The quote is the wait — not
        the score.
      </p>
      <ol>
        {brokenBenchmarks.map((item) => (
          <li key={item.id}>
            <button
              className="grave-stone"
              onClick={() => openSources(openDialog, item.source)}
              type="button"
            >
              <span className="grave-year">{item.conquered}</span>
              <strong>{item.name}</strong>
              <em>{item.wait}</em>
              <blockquote>“{item.quote}”</blockquote>
              <small>{item.attribution}</small>
            </button>
          </li>
        ))}
      </ol>
    </aside>
  );
}
