// One shape for opening the evidence drawer, so every "look behind this claim" control agrees
// on the dialog type and the kicker the reader sees.

// @param {function} openDialog - from the guide store
// @param {string} [sourceIds] - one id, or several comma-separated
export function openSources(openDialog, sourceIds) {
  openDialog({
    type: "sources",
    ids: sourceIds || undefined,
    kicker: sourceIds ? "LOOK BEHIND THE PANEL" : "EVIDENCE LIBRARY",
  });
}
