// Date and duration labels for charts, the timeline, and data tables. All calendar values on
// this page are stored as YYYY-MM-DD and interpreted in UTC so a reader's timezone cannot shift
// a release into the wrong month.

// @param {string} value - ISO date `YYYY-MM-DD`
// @returns {number} UTC midnight in milliseconds
export function dateMs(value) {
  return Date.parse(`${value}T00:00:00Z`);
}

// @param {string} value - ISO date `YYYY-MM-DD`
// @returns {string} e.g. "Jan 29, 2026"
export function dateLabel(value) {
  return new Date(`${value}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

// @param {number} minutes - human-expert minutes at 50% success
// @returns {string}
export function hoursLabel(minutes) {
  if (minutes >= 60) {
    return `${(minutes / 60).toFixed(minutes % 60 === 0 ? 0 : 1)} hr`;
  }
  return `${Number(minutes.toFixed(1))} min`;
}

// @param {number} ms - UTC timestamp
// @returns {string} e.g. "Jan 2024"
export function monthYearLabel(ms) {
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

// @param {string} value - ISO date `YYYY-MM-DD`
// @returns {string} `YYYY-MM`
export function yearMonthKey(value) {
  return value.slice(0, 7);
}

// @param {number} ms - UTC timestamp
// @returns {string} `YYYY-MM`
export function yearMonthFromMs(ms) {
  const date = new Date(ms);
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}
