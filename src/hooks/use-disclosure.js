import { useCallback, useId, useState } from "react";

// Open/closed state for a "show me more" control plus the panel id both halves need for
// aria-controls. Panels are conditionally rendered rather than hidden so they can animate in.
//
// @param {{ initiallyOpen: boolean }} options
// @returns {{ isOpen: boolean, panelId: string, toggle: function, close: function }}
export default function useDisclosure({ initiallyOpen = false } = {}) {
  const panelId = useId();
  const [ isOpen, setIsOpen ] = useState(initiallyOpen);

  const toggle = useCallback(() => setIsOpen((wasOpen) => !wasOpen), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, panelId, toggle, close };
}
