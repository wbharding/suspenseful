import { safetyTiles } from "../data/safety-details.js";
import { sourceRegistry } from "../data/source-registry.js";
import { DialogHeading } from "./detail-dialog.jsx";
import { CardInsight } from "./guide-card.jsx";
import { SourceCard } from "./source-drawer.jsx";

// @param {number} index - which of the four safety tiles was opened
export default function SafetyDialog({ index }) {
  const detail = safetyTiles[index];
  if (!detail) return null;

  const source = sourceRegistry[detail.source];

  return (
    <>
      <DialogHeading title={detail.title}>
        <strong>{detail.headline}</strong>
      </DialogHeading>
      <p className="dialog-intro">{detail.body}</p>
      <CardInsight>A workstream, not a completion percentage.</CardInsight>
      {source ? <SourceCard source={{ id: detail.source, ...source }} /> : null}
    </>
  );
}
