import { useEffect, useState } from "react";

// Highlights whichever band is closest to the middle of the viewport, so the sticky nav tells
// the reader where they are on a page that is four screens tall on desktop and far longer on a
// phone.
//
// @param {string[]} sectionIds - ids rendered as elements on the page, in document order
// @returns {string} the id of the band currently owning the viewport
export default function useActiveSection(sectionIds) {
  const [ activeSectionId, setActiveSectionId ] = useState(sectionIds[0]);
  const sectionKey = sectionIds.join(",");

  useEffect(() => {
    const sections = sectionKey
      .split(",")
      .map((sectionId) => document.getElementById(sectionId))
      .filter(Boolean);

    if (!sections.length || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (mostVisible) setActiveSectionId(mostVisible.target.id);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [ 0, 0.2, 0.5, 1 ] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ sectionKey ]);

  return activeSectionId;
}
