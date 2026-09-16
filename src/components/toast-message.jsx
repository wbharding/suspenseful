import useGuideStore from "../hooks/use-guide-store.js";

// Confirmation line for actions that would otherwise be silent, mostly saving to the local plan.
export default function ToastMessage() {
  const { toastMessage } = useGuideStore();

  return (
    <div aria-live="polite" className={`toast${toastMessage ? " visible" : ""}`} role="status">
      {toastMessage}
    </div>
  );
}
