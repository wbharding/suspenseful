import useGuideStore from "../hooks/use-guide-store.js";
import ChoicesLink from "./choices-link.jsx";
import FieldIcon from "./field-icon.jsx";
import "./home-highlights.scss";

export default function HomeHighlights() {
  const { openDialog } = useGuideStore();

  return (
    <section aria-label="Explore the field guide" className="home-highlights">
      <article className="home-highlight highlight-guide">
        <img src="/images/home/guide-books.webp" alt="" width="410" height="350" />
        <div>
          <h2>Four chapters for a clearer conversation.</h2>
          <p>From current risks to practical solutions, grounded in evidence.</p>
          <a href="#pressure">Explore the guide <FieldIcon name="arrow" /></a>
        </div>
      </article>
      <article className="home-highlight highlight-research">
        <img src="/images/home/research.webp" alt="" width="398" height="352" />
        <div>
          <h2>Evidence over hype.</h2>
          <p>Data, expert voices, and clear analysis to cut through the noise.</p>
          <button type="button" onClick={() => openDialog({ type: "sources", kicker: "EVIDENCE LIBRARY" })}>
            See the research <FieldIcon name="arrow" />
          </button>
        </div>
      </article>
      <article className="home-highlight highlight-policy">
        <img src="/images/home/policy-signs.webp" alt="" width="345" height="330" />
        <div>
          <h2>A more thoughtful path forward.</h2>
          <p>Ideas for how we can keep AI innovation aligned with human values.</p>
          <ChoicesLink>Read the proposals <FieldIcon name="arrow" /></ChoicesLink>
        </div>
      </article>
      <article className="home-highlight highlight-future">
        <img src="/images/home/brighter-future.webp" alt="" width="425" height="338" />
        <div>
          <h2>A brighter future is possible.</h2>
          <p>AI can be transformative—if we give safeguards time to keep pace.</p>
          <a href="#slowdown">See the bigger picture <FieldIcon name="arrow" /></a>
        </div>
      </article>
    </section>
  );
}
