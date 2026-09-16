import { useContext } from "react";
import { GuideStoreContext } from "../state/guide-store-context.js";

// Access to the shared page state: the reader's saved plan, the open dialog, the toast, and the
// reduced-motion preference. See src/state/guide-store.jsx for the full shape.
//
// @returns {object} the store value
export default function useGuideStore() {
  const store = useContext(GuideStoreContext);
  if (!store) throw new Error("useGuideStore must be used inside a GuideStoreProvider");
  return store;
}
