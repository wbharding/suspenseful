import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { actionItems } from "../data/action-data.js";
import { GuideStoreContext } from "./guide-store-context.js";

// Everything on this page that more than one component needs to agree about: the reader's saved
// plan, which dialog is open, the toast, and whether motion is reduced.
//
// The plan is deliberately local-only. There is no account, no analytics and no backend, so the
// store reads and writes one localStorage key and degrades to in-memory state when storage is
// unavailable (Safari private browsing, storage disabled).

const STORAGE_KEY = "a-smarter-pace-v1";
const TOAST_DURATION_MS = 3200;
const NOTES_SAVE_DELAY_MS = 500;
const NOTES_MAX_LENGTH = 10000;

// Anything already in storage is untrusted input: it may be from an older version, hand-edited,
// or referencing an action that no longer exists.
// @returns {{saved: string[], forecasts: object[], notes: string, motion: boolean|null}}
function readStoredPlan() {
  const empty = { saved: [], forecasts: [], notes: "", motion: null };

  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!raw || typeof raw !== "object") return empty;

    return {
      saved: Array.isArray(raw.saved)
        ? raw.saved.filter((id) => actionItems.some((action) => action.id === id))
        : [],
      forecasts: Array.isArray(raw.forecasts)
        ? raw.forecasts
            .filter(
              (entry) =>
                entry &&
                typeof entry.id === "string" &&
                typeof entry.scenario === "string" &&
                Number.isFinite(entry.probability) &&
                entry.probability >= 0 &&
                entry.probability <= 100,
            )
            .map((entry) => ({ ...entry, history: Array.isArray(entry.history) ? entry.history : [] }))
        : [],
      notes: typeof raw.notes === "string" ? raw.notes.slice(0, NOTES_MAX_LENGTH) : "",
      motion: typeof raw.motion === "boolean" ? raw.motion : null,
    };
  } catch {
    return empty;
  }
}

export function GuideStoreProvider({ children }) {
  const [ initialPlan ] = useState(readStoredPlan);

  const [ savedActionIds, setSavedActionIds ] = useState(() => new Set(initialPlan.saved));
  const [ forecasts, setForecasts ] = useState(initialPlan.forecasts);
  const [ notes, setNotes ] = useState(initialPlan.notes);
  const [ isStorageAvailable, setIsStorageAvailable ] = useState(true);
  const [ reducedMotion, setReducedMotion ] = useState(
    () => initialPlan.motion ?? window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  // A dialog descriptor rather than a React node, so the store stays plain data and
  // DetailDialog owns the mapping from type to component.
  const [ dialogView, setDialogView ] = useState(null);
  const [ toastMessage, setToastMessage ] = useState("");

  // Bumped whenever something should stop animating — opening a dialog, hiding the tab. The
  // timeline and race watch it rather than the store knowing they exist.
  const [ pauseSignal, setPauseSignal ] = useState(0);

  const notesTimer = useRef(0);
  const toastTimer = useRef(0);

  const persist = useCallback((next) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setIsStorageAvailable(true);
    } catch {
      setIsStorageAvailable(false);
    }
  }, []);

  const currentPlan = useCallback(
    (overrides = {}) => ({
      saved: [ ...savedActionIds ],
      forecasts,
      notes,
      motion: reducedMotion,
      ...overrides,
    }),
    [ savedActionIds, forecasts, notes, reducedMotion ],
  );

  const showToast = useCallback((message) => {
    setToastMessage(message);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMessage(""), TOAST_DURATION_MS);
  }, []);

  const pauseMotion = useCallback(() => setPauseSignal((count) => count + 1), []);

  const openDialog = useCallback(
    (view) => {
      pauseMotion();
      setDialogView(view);
    },
    [ pauseMotion ],
  );

  const closeDialog = useCallback(() => setDialogView(null), []);

  const toggleSavedAction = useCallback(
    (actionId) => {
      const action = actionItems.find((item) => item.id === actionId);
      if (!action) return;

      const wasSaved = savedActionIds.has(actionId);
      const nextSaved = new Set(savedActionIds);
      if (wasSaved) nextSaved.delete(actionId);
      else nextSaved.add(actionId);

      setSavedActionIds(nextSaved);
      persist(currentPlan({ saved: [ ...nextSaved ] }));

      if (wasSaved) showToast("Action removed from your plan.");
      else if (isStorageAvailable) showToast("Saved to your plan on this browser.");
      else showToast("Saved for this session. Browser storage is unavailable.");
    },
    [ savedActionIds, persist, currentPlan, showToast, isStorageAvailable ],
  );

  const saveForecast = useCallback(
    (forecast) => {
      const existing = forecasts.find((entry) => entry.id === forecast.id);
      const nextForecasts = existing
        ? forecasts.map((entry) => (entry.id === forecast.id ? forecast : entry))
        : [ forecast, ...forecasts ];

      setForecasts(nextForecasts);
      persist(currentPlan({ forecasts: nextForecasts }));
      showToast(existing ? "Forecast updated." : "Forecast recorded in this browser.");
    },
    [ forecasts, persist, currentPlan, showToast ],
  );

  const deleteForecast = useCallback(
    (forecastId) => {
      const nextForecasts = forecasts.filter((entry) => entry.id !== forecastId);
      setForecasts(nextForecasts);
      persist(currentPlan({ forecasts: nextForecasts }));
      showToast("Local forecast deleted.");
    },
    [ forecasts, persist, currentPlan, showToast ],
  );

  // Typing debounces the write; every keystroke hitting localStorage is wasteful.
  const updateNotes = useCallback(
    (value) => {
      const trimmed = value.slice(0, NOTES_MAX_LENGTH);
      setNotes(trimmed);
      clearTimeout(notesTimer.current);
      notesTimer.current = setTimeout(() => persist(currentPlan({ notes: trimmed })), NOTES_SAVE_DELAY_MS);
    },
    [ persist, currentPlan ],
  );

  const toggleReducedMotion = useCallback(() => {
    const next = !reducedMotion;
    setReducedMotion(next);
    persist(currentPlan({ motion: next }));
    showToast(next ? "Reduced motion is on." : "Animations are enabled.");
  }, [ reducedMotion, persist, currentPlan, showToast ]);

  // Follow the OS preference when the reader has not overridden it here.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event) => setReducedMotion(event.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("reduce-motion", reducedMotion);
  }, [ reducedMotion ]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) pauseMotion();
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [ pauseMotion ]);

  useEffect(() => () => {
    clearTimeout(notesTimer.current);
    clearTimeout(toastTimer.current);
  }, []);

  const value = useMemo(
    () => ({
      savedActionIds,
      forecasts,
      notes,
      planCount: savedActionIds.size + forecasts.length,
      isStorageAvailable,
      reducedMotion,
      dialogView,
      toastMessage,
      pauseSignal,
      openDialog,
      closeDialog,
      showToast,
      toggleSavedAction,
      saveForecast,
      deleteForecast,
      updateNotes,
      toggleReducedMotion,
    }),
    [
      savedActionIds, forecasts, notes, isStorageAvailable, reducedMotion, dialogView,
      toastMessage, pauseSignal, openDialog, closeDialog, showToast, toggleSavedAction,
      saveForecast, deleteForecast, updateNotes, toggleReducedMotion,
    ],
  );

  return <GuideStoreContext.Provider value={value}>{children}</GuideStoreContext.Provider>;
}

