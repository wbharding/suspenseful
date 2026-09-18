import { useEffect, useState } from "react";

// Tracks the URL path so the field guide can swap the main page for /choices without a reload.
// @returns {string}
export default function usePathname() {
  const [ pathname, setPathname ] = useState(() => window.location.pathname);

  useEffect(() => {
    function sync() {
      setPathname(window.location.pathname);
    }

    window.addEventListener("popstate", sync);
    window.addEventListener("guide-navigate", sync);
    return () => {
      window.removeEventListener("popstate", sync);
      window.removeEventListener("guide-navigate", sync);
    };
  }, []);

  return pathname;
}
