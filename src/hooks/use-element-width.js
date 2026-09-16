import { useEffect, useRef, useState } from "react";

// Tracks a node's content width so SVG charts can switch compact layout without reading
// layout during render.
//
// @returns {[React.RefObject<HTMLElement>, number]}
export default function useElementWidth() {
  const ref = useRef(null);
  const [ width, setWidth ] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new ResizeObserver((entries) => {
      const next = entries[0]?.contentRect.width ?? node.clientWidth;
      setWidth(next);
    });
    observer.observe(node);
    setWidth(node.clientWidth);

    return () => observer.disconnect();
  }, []);

  return [ ref, width ];
}
