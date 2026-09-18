import { CHOICES_PATH, navigateTo } from "../lib/navigate.js";

// SPA link to the policy menu. Ordinary click stays in-app; modified clicks keep the native tab.
export default function ChoicesLink({ className = "", children }) {
  function handleClick(event) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    navigateTo(CHOICES_PATH);
    window.scrollTo(0, 0);
  }

  return (
    <a className={className} href={CHOICES_PATH} onClick={handleClick}>
      {children}
    </a>
  );
}
