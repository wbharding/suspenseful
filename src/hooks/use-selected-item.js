import { useCallback, useState } from "react";

// Single-select where picking the open item closes it again. Shared by the tiles, harm rungs,
// race lanes, checkpoint gates, pause pillars and proposal steps, all of which expand one
// detail at a time.
//
// @param {{ initialId: string|null }} options
// @returns {{ selectedId: string|null, select: function }}
export default function useSelectedItem({ initialId = null } = {}) {
  const [ selectedId, setSelectedId ] = useState(initialId);

  const select = useCallback((itemId) => {
    setSelectedId((currentId) => (currentId === itemId ? null : itemId));
  }, []);

  return { selectedId, select };
}
