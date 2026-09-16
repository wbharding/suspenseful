import { useEffect, useRef } from "react";
import useGuideStore from "../hooks/use-guide-store.js";
import AboutDialog from "./about-dialog.jsx";
import FieldIcon from "./field-icon.jsx";
import OriginalArtDialog from "./original-art-dialog.jsx";
import SourceDrawer from "./source-drawer.jsx";
import "./detail-dialog.scss";

// The page's single <dialog>. Everything that opens over the page — the evidence drawer, data
// tables, one release, the reader's plan — is a view registered here.
//
// Keeping one dialog element rather than one per feature means focus handling, Escape, the
// backdrop click and body scroll locking are written once. The store holds a plain descriptor
// ({ type, ...props }) and this component owns the mapping from type to component, so a chapter
// can open a dialog without importing it.
const DIALOG_VIEWS = {
  sources: SourceDrawer,
  about: AboutDialog,
  original: OriginalArtDialog,
};

// @param {object} views - extra type-to-component entries contributed by the chapters
export default function DetailDialog({ views = {} }) {
  const { dialogView, closeDialog } = useGuideStore();
  const dialogRef = useRef(null);
  const previousFocusRef = useRef(null);
  const closeButtonRef = useRef(null);

  const registry = { ...DIALOG_VIEWS, ...views };
  const ViewComponent = dialogView ? registry[dialogView.type] : null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (dialogView && !dialog.open) {
      previousFocusRef.current = document.activeElement;
      dialog.showModal();
      document.body.style.overflow = "hidden";
    } else if (!dialogView && dialog.open) {
      dialog.close();
    }

    if (dialogView) {
      dialog.scrollTop = 0;
      closeButtonRef.current?.focus({ preventScroll: true });
    }
  }, [ dialogView ]);

  // The native close event also fires for Escape, so restoring focus and scroll lives here
  // rather than in the click handler.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return undefined;

    function handleClose() {
      document.body.style.overflow = "";
      if (previousFocusRef.current?.isConnected) {
        previousFocusRef.current.focus({ preventScroll: true });
      }
      closeDialog();
    }

    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [ closeDialog ]);

  // A click on the dialog element itself is a click on the backdrop, since .dialog-shell covers
  // the whole padded box.
  function handleDialogClick(event) {
    if (event.target !== dialogRef.current) return;
    const bounds = event.target.getBoundingClientRect();
    const isOutside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;
    if (isOutside) closeDialog();
  }

  return (
    <dialog aria-labelledby="dialog-title" onClick={handleDialogClick} ref={dialogRef}>
      <div className="dialog-shell">
        <header className="dialog-top">
          <span className="eyebrow">{dialogView?.kicker || "THE DETAILS MATTER"}</span>
          <button
            aria-label="Close dialog"
            className="icon-btn"
            onClick={closeDialog}
            ref={closeButtonRef}
            type="button"
          >
            ×
          </button>
        </header>
        {ViewComponent ? <ViewComponent {...dialogView} /> : null}
      </div>
    </dialog>
  );
}

// Every dialog view opens with a title and a framing paragraph; this keeps that shape uniform.
export function DialogHeading({ title, children }) {
  return (
    <>
      <h2 className="dialog-title" id="dialog-title">
        {title}
      </h2>
      {children ? <p className="dialog-intro">{children}</p> : null}
    </>
  );
}

// @param {string} url
// @param {string} label
export function ExternalLink({ url, label, className = "" }) {
  return (
    <a className={className} href={url} rel="noopener noreferrer" target="_blank">
      {label}
      <FieldIcon name="external" />
    </a>
  );
}
