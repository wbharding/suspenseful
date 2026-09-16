import { createElement } from "react";
import { iconShapes } from "../data/icon-paths.js";

// The page's only icon component. Geometry lives in data/icon-paths.js; this just gives every
// icon the same 24x24 box, stroke weight and decorative treatment.
//
// @param {string} name - key from iconShapes; an unknown name falls back to the spark glyph
// @param {string} className - extra classes, e.g. a per-component size override
export default function FieldIcon({ name, className = "" }) {
  const shapes = iconShapes[name] || iconShapes.spark;

  return (
    <svg
      aria-hidden="true"
      className={`icon ${className}`.trim()}
      fill="none"
      focusable="false"
      height="20"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
      viewBox="0 0 24 24"
      width="20"
    >
      {shapes.map(({ tag, ...attributes }, index) =>
        createElement(tag, { key: `${tag}-${index}`, ...attributes }),
      )}
    </svg>
  );
}
