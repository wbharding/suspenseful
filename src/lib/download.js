// Local file downloads. Nothing is uploaded; the blob lives just long enough to click.

// @param {string} name - filename, including extension
// @param {string} content
// @param {string} [type]
export function downloadFile(name, content, type = "text/plain;charset=utf-8") {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = name;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

// @param {Array<Array<string|number|undefined>>} rows
// @returns {string} RFC-style CSV with quoted fields
export function toCsv(rows) {
  return rows
    .map((row) =>
      row.map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`).join(","),
    )
    .join("\r\n");
}
