import { actionItems } from "../data/action-data.js";
import useGuideStore from "../hooks/use-guide-store.js";
import FieldIcon from "./field-icon.jsx";

// @param {string} group - "high" | "practical"
export default function ActionList({ group }) {
  const { savedActionIds, openDialog, toggleSavedAction } = useGuideStore();
  const items = actionItems.filter((action) => action.group === group);

  return (
    <div className="action-list">
      {items.map((action) => {
        const isSaved = savedActionIds.has(action.id);
        return (
          <div className="action-item" key={action.id}>
            <span className="action-icon">
              <FieldIcon name={action.icon} />
            </span>
            <div className="action-text">
              <button
                className="text-action"
                onClick={() =>
                  openDialog({
                    type: "action",
                    id: action.id,
                    kicker: "MAKE IT A PRACTICAL NEXT STEP",
                  })
                }
                type="button"
              >
                {action.title}
                <FieldIcon name="arrow" />
              </button>
              <p>{action.description}</p>
            </div>
            <button
              aria-label={`${isSaved ? "Remove saved action" : "Save action"}: ${action.title}`}
              aria-pressed={isSaved}
              className="save-action icon-btn"
              onClick={() => toggleSavedAction(action.id)}
              type="button"
            >
              <FieldIcon name={isSaved ? "check" : "plus"} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
