import { createContext } from "react";

// Split out from the provider so that guide-store.jsx exports only a component and
// use-guide-store.js exports only a hook. Nothing imports this directly except those two.
export const GuideStoreContext = createContext(null);
