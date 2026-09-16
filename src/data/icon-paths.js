// Geometry for the line-icon set, all drawn on a 24x24 grid with a 1.7 stroke.
//
// Kept as data rather than as 40 hand-written JSX blocks: FieldIcon maps over the shapes, so
// adding an icon is a data edit and no attribute ever has to be camelCased by hand.

export const iconShapes = {
  arrow: [
    { tag: "path", d: "M4 12h15m-6-6 6 6-6 6" },
  ],
  down: [
    { tag: "path", d: "m6 9 6 6 6-6" },
  ],
  external: [
    { tag: "path", d: "M14 3h7v7m0-7L10 14M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5" },
  ],
  play: [
    { tag: "path", d: "m8 4 12 8-12 8Z" },
  ],
  pause: [
    { tag: "path", d: "M8 5v14M16 5v14" },
  ],
  reset: [
    { tag: "path", d: "M3 10a9 9 0 1 1 2 9M3 4v6h6" },
  ],
  check: [
    { tag: "path", d: "m5 12 4 4L19 6" },
  ],
  plus: [
    { tag: "path", d: "M12 5v14M5 12h14" },
  ],
  minus: [
    { tag: "path", d: "M5 12h14" },
  ],
  close: [
    { tag: "path", d: "m6 6 12 12M6 18 18 6" },
  ],
  sound: [
    { tag: "path", d: "m11 4-6 5H2v6h3l6 5ZM15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" },
  ],
  mute: [
    { tag: "path", d: "m11 4-6 5H2v6h3l6 5Zm5 5 5 6m0-6-5 6" },
  ],
  file: [
    { tag: "path", d: "M14 2H5v20h14V7ZM14 2v6h5M8 12h8m-8 4h8" },
  ],
  book: [
    { tag: "path", d: "M12 5v16M12 5C9 2 4 2 2 4v16c3-2 7-2 10 1 3-3 7-3 10-1V4c-2-2-7-2-10 1Z" },
  ],
  shield: [
    { tag: "path", d: "m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6Zm-5 9 3 3 6-6" },
  ],
  "shield-alert": [
    { tag: "path", d: "m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6ZM12 7v5m0 4v.1" },
  ],
  scan: [
    { tag: "path", d: "M3 8V3h5m8 0h5v5M3 16v5h5m8 0h5v-5M6 12h12" },
    { tag: "circle", cx: "12", cy: "12", r: "3" },
  ],
  lock: [
    { tag: "rect", x: "4", y: "10", width: "16", height: "12", rx: "2" },
    { tag: "path", d: "M7 10V7a5 5 0 0 1 10 0v3m-5 5v3" },
  ],
  scales: [
    { tag: "path", d: "M12 3v18M7 21h10M3 7h18M6 7 2 15h8Zm12 0-4 8h8Z" },
  ],
  people: [
    { tag: "circle", cx: "12", cy: "6", r: "3" },
    { tag: "path", d: "M6 21v-5a6 6 0 0 1 12 0v5M3 4a3 3 0 0 1 0 6m-2 11v-5a5 5 0 0 1 3-5M21 4a3 3 0 0 0 0 6m2 11v-5a5 5 0 0 0-3-5" },
  ],
  briefcase: [
    { tag: "rect", x: "2", y: "7", width: "20", height: "14", rx: "3" },
    { tag: "path", d: "M8 7V3h8v4M2 12c6 4 14 4 20 0M10 13h4v4h-4Z" },
  ],
  network: [
    { tag: "rect", x: "9", y: "2", width: "6", height: "5", rx: "1" },
    { tag: "rect", x: "1", y: "17", width: "6", height: "5", rx: "1" },
    { tag: "rect", x: "9", y: "17", width: "6", height: "5", rx: "1" },
    { tag: "rect", x: "17", y: "17", width: "6", height: "5", rx: "1" },
    { tag: "path", d: "M12 7v10M4 17v-5h16v5" },
  ],
  compass: [
    { tag: "circle", cx: "12", cy: "12", r: "10" },
    { tag: "path", d: "m16 8-2 6-6 2 2-6Z" },
  ],
  landmark: [
    { tag: "path", d: "m2 7 10-5 10 5ZM2 21h20M4 10v8m5-8v8m6-8v8m5-8v8M2 18h20" },
  ],
  handshake: [
    { tag: "path", d: "m2 6 5-3 5 3 5-3 5 3v10l-5 5-5-3-5 3-5-5Zm5-3 5 3-4 4 3 3 5-4 6 7M7 15l5 3m-7 0 2-3" },
  ],
  radar: [
    { tag: "circle", cx: "12", cy: "12", r: "9" },
    { tag: "circle", cx: "12", cy: "12", r: "5" },
    { tag: "path", d: "m12 12 7-8M12 2v3M2 12h3m7 7v3m7-10h3" },
  ],
  coins: [
    { tag: "ellipse", cx: "9", cy: "5", rx: "7", ry: "3" },
    { tag: "path", d: "M2 5v5c0 4 14 4 14 0V5M2 10v5c0 3 7 4 10 2M2 15v4c0 3 9 4 12 1" },
    { tag: "ellipse", cx: "18", cy: "14", rx: "4", ry: "2" },
    { tag: "path", d: "M14 14v7c0 3 8 3 8 0v-7m-8 4c0 3 8 3 8 0" },
  ],
  chart: [
    { tag: "path", d: "M3 3v18h19M6 16l4-5 4 2 7-8" },
  ],
  spark: [
    { tag: "path", d: "m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z" },
  ],
  clock: [
    { tag: "circle", cx: "12", cy: "12", r: "10" },
    { tag: "path", d: "M12 6v6l4 2" },
  ],
  bulb: [
    { tag: "path", d: "M8 17h8m-8 4h8M8 17c0-3-4-4-4-9a8 8 0 1 1 16 0c0 5-4 6-4 9" },
  ],
  download: [
    { tag: "path", d: "M12 2v13m-5-5 5 5 5-5M3 16v5h18v-5" },
  ],
  eye: [
    { tag: "path", d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12Z" },
    { tag: "circle", cx: "12", cy: "12", r: "3" },
  ],
  info: [
    { tag: "circle", cx: "12", cy: "12", r: "10" },
    { tag: "path", d: "M12 10v7m0-11v.1" },
  ],
  search: [
    { tag: "circle", cx: "10", cy: "10", r: "7" },
    { tag: "path", d: "m15 15 7 7" },
  ],
  leaf: [
    { tag: "path", d: "M21 3S4 0 3 13c-1 8 9 11 14 5 4-5 4-15 4-15ZM5 20 16 8" },
  ],
  heart: [
    { tag: "path", d: "M12 21S1 14 1 7C1 0 9 0 12 6c3-6 11-6 11 1 0 7-11 14-11 14Z" },
  ],
  flask: [
    { tag: "path", d: "M8 2h8M9 2v7L2 20c-1 2 21 2 20 0L15 9V2M6 14h12" },
  ],
  settings: [
    { tag: "circle", cx: "12", cy: "12", r: "4" },
    { tag: "path", d: "M12 1v4m0 14v4M1 12h4m14 0h4M4 4l3 3m10 10 3 3M4 20l3-3M17 7l3-3" },
  ],
  road: [
    { tag: "path", d: "m3 22 4-20m10 0 4 20M12 2v3m0 4v4m0 4v5" },
  ],
  copy: [
    { tag: "rect", x: "8", y: "8", width: "13", height: "13", rx: "2" },
    { tag: "path", d: "M16 8V3H3v13h5" },
  ],
  bookmark: [
    { tag: "path", d: "M5 2h14v20l-7-4-7 4Z" },
  ],
  globe: [
    { tag: "circle", cx: "12", cy: "12", r: "10" },
    { tag: "ellipse", cx: "12", cy: "12", rx: "4", ry: "10" },
    { tag: "path", d: "M2 12h20M4 6h16M4 18h16" },
  ],
  trash: [
    { tag: "path", d: "M3 6h18M9 6V3h6v3M5 6l1 16h12l1-16M10 10v8m4-8v8" },
  ],
  mail: [
    { tag: "rect", x: "2", y: "4", width: "20", height: "16", rx: "2" },
    { tag: "path", d: "m2 5 10 8L22 5" },
  ],
  mountain: [
    { tag: "path", d: "m1 21 8-17 5 9 3-6 6 14Zm4-9 4 3 3-3" },
  ],
};
