import { useEffect, useState } from "react";

// Drives both the progress bar and the sticky nav's current-chapter highlight from a single
// rAF-throttled scroll listener, since they are two readings of the same thing.
//
// @param {string[]} chapterIds - anchor ids in document order
// @returns {{ progressPercent: number, activeChapterId: string }}
export default function useScrollProgress(chapterIds) {
  const [ progressPercent, setProgressPercent ] = useState(0);
  const [ activeChapterId, setActiveChapterId ] = useState(chapterIds[0]);
  const chapterKey = chapterIds.join(",");

  useEffect(() => {
    const ids = chapterKey.split(",");
    let scheduled = false;

    function measure() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgressPercent(scrollable > 0 ? Math.min(100, (window.scrollY / scrollable) * 100) : 0);

      // The last chapter whose top has passed the nav is the one being read.
      let current = ids[0];
      ids.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top < 170) current = id;
      });
      setActiveChapterId(current);

      scheduled = false;
    }

    function handleScroll() {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(measure);
    }

    measure();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [ chapterKey ]);

  return { progressPercent, activeChapterId };
}
