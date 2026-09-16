import { findPlaceholderImage } from "../data/placeholder-image-manifest.js";
import "./placeholder-figure.scss";

// Every illustration on the page comes through here, so art can be swapped by editing one
// manifest entry. Panels cut from the draft sketch carry a "draft art" corner tag; slots with
// no usable source render as a labelled empty frame instead of a broken image.
//
// @param {string} imageId - key into placeholder-image-manifest
// @param {string} caption - optional visible caption
// @param {string} shape - "wide" | "square" | "icon", picks the frame treatment
export default function PlaceholderFigure({ imageId, caption, shape = "wide" }) {
  const image = findPlaceholderImage(imageId);
  const isAwaitingArt = !image.file;
  // A corner tag on a 50px portrait hides the portrait. Wide panels have room for it; for
  // everything else the art queue in the footer is the complete inventory.
  const canShowDraftMarker = shape === "wide";

  return (
    <figure className={`placeholder-figure shape-${shape}`}>
      <div
        className={`figure-image-frame${isAwaitingArt ? " is-awaiting-art" : ""}`}
        style={{ aspectRatio: image.aspectRatio }}
      >
        {isAwaitingArt ? (
          <p className="frame-awaiting-note">
            <span className="awaiting-note-label">Art needed</span>
            <span className="awaiting-note-subject">{image.subject}</span>
          </p>
        ) : (
          <>
            <img alt={image.alt} className="frame-image-asset" loading="lazy" src={image.file} />
            {canShowDraftMarker ? <span className="frame-draft-marker">Draft art</span> : null}
          </>
        )}
      </div>
      {caption ? <figcaption className="figure-caption-text">{caption}</figcaption> : null}
    </figure>
  );
}
