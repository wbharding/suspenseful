import useGuideStore from "../hooks/use-guide-store.js";
import ActionList from "./action-list.jsx";
import ChapterSection from "./chapter-section.jsx";
import ChoicesLink from "./choices-link.jsx";
import FieldIcon from "./field-icon.jsx";
import GuideCard from "./guide-card.jsx";

export default function ActionsChapter() {
  const { planCount, openDialog } = useGuideStore();

  return (
    <ChapterSection
      eyebrow="TURN CONCERN INTO SOMETHING USEFUL"
      id="actions"
      intro="Individuals, organizations and governments each have a part to play. Start with one concrete action."
      number="04"
      title="What can we do?"
      tone="actions"
    >
      <GuideCard
        cellId="4A"
        deck="Choose an action to explore it. Save the ones you want to come back to."
        eyebrow="AIM HIGH"
        span="span-6"
        title="Build the conditions for cooperation."
      >
        <ActionList group="high" />
      </GuideCard>

      <GuideCard
        cellId="4B"
        deck="Better evidence, better incentives and more explicit expectations."
        eyebrow="DO THE PRACTICAL WORK"
        span="span-6"
        title="Make preparedness tangible."
      >
        <ActionList group="practical" />
      </GuideCard>

      <article className="card span-12 plan-card">
        <span className="plan-illustration">
          <FieldIcon name="bookmark" />
        </span>
        <div>
          <p className="eyebrow">Your next step</p>
          <h3>A small plan beats a vague concern.</h3>
          <p>
            Save actions, write down a forecast and revisit what you believe. Your entries stay
            in this browser; this prototype has no server.
          </p>
        </div>
        <div className="plan-actions">
          <button
            className="btn primary"
            onClick={() => openDialog({ type: "plan", kicker: "YOUR LOCAL ACTION PLAN" })}
            type="button"
          >
            Open my plan <b className="plan-count">{planCount}</b>
            <FieldIcon name="arrow" />
          </button>
          <ChoicesLink className="btn yellow">
            Not an off switch — the set of choices <FieldIcon name="arrow" />
          </ChoicesLink>
        </div>
      </article>
    </ChapterSection>
  );
}
