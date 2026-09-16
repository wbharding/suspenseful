// Shared car geometry. Used as a nested SVG on the race track and as a span illustration on
// the checkpoint road. `currentColor` is the lane tint.

export default function RaceCarMark() {
  return (
    <svg aria-hidden="true" height="31" viewBox="0 0 62 31" width="48">
      <path d="m13 6 7-5h19l10 9 9 2v12H3V13l8-2Z" fill="currentColor" />
      <path d="m22 4-5 7h26l-8-7Z" fill="#edf6f0" />
      <circle cx="14" cy="24" fill="#153b38" r="6" />
      <circle cx="47" cy="24" fill="#153b38" r="6" />
      <circle cx="14" cy="24" fill="#f5efdf" r="2.5" />
      <circle cx="47" cy="24" fill="#f5efdf" r="2.5" />
    </svg>
  );
}
