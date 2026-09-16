import "./icon-glyph.scss";

// Line glyphs for the tiles and rungs whose draft illustrations are too small to reuse. Drawing
// them keeps those slots sharp at every breakpoint while the real art is commissioned; the
// illustrations themselves are tracked in placeholder-image-manifest.js.
const GLYPH_PATHS = {
  evaluation: [ "M6 4h12v16H6z", "M9 9h6M9 13h6M9 17h3" ],
  "reasoning-checks": [
    "M4.5 12a1.5 1.5 0 1 0 3 0a1.5 1.5 0 1 0-3 0",
    "M7.5 12h2.5l4-5h4M10 12l4 5h4",
  ],
  interpretability: [
    "M4 8h8M4 12h5M4 16h5",
    "M12 14a4 4 0 1 0 8 0a4 4 0 1 0-8 0",
    "M19 17l2.5 2.5",
  ],
  "independent-oversight": [ "M12 3l7 3v6c0 4-3 7-7 9c-4-2-7-5-7-9V6z", "M9 12l2.5 2.5L16 10" ],
  "jobs-and-information": [
    "M5.5 9a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0",
    "M4 20a4 4 0 0 1 8 0",
    "M15 6h5v12h-5z",
    "M16.5 9h2M16.5 12h2",
  ],
  "powerful-misuse": [ "M12 4l9 16H3z", "M12 10v4.5M12 17.2v.6" ],
  "concentrated-power": [
    "M5 21V11h5v10M14 21V5h5v16",
    "M6.5 14h2M6.5 17h2M15.5 8h2M15.5 11h2M15.5 14h2",
  ],
  "loss-of-control": [
    "M6 11a6 6 0 1 0 12 0a6 6 0 1 0-12 0",
    "M6 11h12M12 5c2.5 3 2.5 9 0 12M12 5c-2.5 3-2.5 9 0 12",
    "M3.5 20.5l3-2M20.5 20.5l-3-2",
  ],
  medicine: [ "M12 20s-7-4.4-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.6-7 9-7 9z" ],
  "clean-energy": [ "M20 4c0 9-5 13-11 13 0-8 5-13 11-13z", "M6 20c1-5 4-8 8-10" ],
  science: [ "M9 3h6M10 3v6l-4 8a2 2 0 0 0 2 3h8a2 2 0 0 0 2-3l-4-8V3", "M7.5 15h9" ],
  "everyday-tools": [
    "M9 12a3 3 0 1 0 6 0a3 3 0 1 0-6 0",
    "M12 4v3M12 17v3M4 12h3M17 12h3",
    "M6.3 6.3l2.1 2.1M15.6 15.6l2.1 2.1M17.7 6.3l-2.1 2.1M8.4 15.6l-2.1 2.1",
  ],
  "evaluation-and-alignment": [
    "M4 12a8 8 0 1 0 16 0a8 8 0 1 0-16 0",
    "M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0",
    "M11 12a1 1 0 1 0 2 0a1 1 0 1 0-2 0",
  ],
  cybersecurity: [ "M6 11h12v9H6z", "M9 11V8a3 3 0 0 1 6 0v3", "M12 14v3" ],
  governance: [ "M12 4v15M8 19.5h8M4 8h16", "M4 8l-2 5h4zM20 8l-2 5h4z" ],
  "workforce-support": [
    "M4.5 10a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0",
    "M14.5 10a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0-5 0",
    "M2 20a5 5 0 0 1 10 0M12 20a5 5 0 0 1 10 0",
  ],
  checkpoint: [ "M4 20V6h16v14", "M4 10h16", "M9 20v-6h6v6" ],
};

// @param {string} name - key of GLYPH_PATHS; an unknown name renders nothing
// @param {string} tone - extra class for colouring, e.g. the owning band
export default function IconGlyph({ name, tone = "" }) {
  const paths = GLYPH_PATHS[name];
  if (!paths) return null;

  return (
    <svg
      aria-hidden="true"
      className={`icon-glyph ${tone}`.trim()}
      focusable="false"
      viewBox="0 0 24 24"
    >
      {paths.map((path) => (
        <path d={path} key={path} />
      ))}
    </svg>
  );
}
