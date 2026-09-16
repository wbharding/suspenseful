import { useEffect, useRef } from "react";
import useGuideStore from "./use-guide-store.js";

// Runs `onPause` when the page asks motion to stop (a dialog opened, the tab hid). The first
// signal value is ignored so mounting a cell does not immediately cancel itself.
//
// @param {function} onPause
export default function usePauseSignal(onPause) {
  const { pauseSignal } = useGuideStore();
  const isReady = useRef(false);

  useEffect(() => {
    if (!isReady.current) {
      isReady.current = true;
      return;
    }
    onPause();
  }, [ pauseSignal, onPause ]);
}
