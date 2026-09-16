import useScrollProgress from "../hooks/use-scroll-progress.js";
import { GuideStoreProvider } from "../state/guide-store.jsx";
import ActionsChapter from "./actions-chapter.jsx";
import { dialogViews as actionsDialogViews } from "./actions-dialogs.js";
import ChapterNav, { ReadingProgress } from "./chapter-nav.jsx";
import ClosingBand, { SiteFooter } from "./closing-band.jsx";
import DetailDialog from "./detail-dialog.jsx";
import HeroBanner from "./hero-banner.jsx";
import PressureChapter from "./pressure-chapter.jsx";
import { dialogViews as pressureDialogViews } from "./pressure-dialogs.js";
import RisksChapter from "./risks-chapter.jsx";
import { dialogViews as risksDialogViews } from "./risks-dialogs.js";
import SiteHeader from "./site-header.jsx";
import SlowdownChapter from "./slowdown-chapter.jsx";
import { dialogViews as slowdownDialogViews } from "./slowdown-dialogs.js";
import ToastMessage from "./toast-message.jsx";
import "./field-guide-page.scss";

const CHAPTERS = [
  { id: "pressure", number: "01", label: "The pressure" },
  { id: "risks", number: "02", label: "The risks" },
  { id: "slowdown", number: "03", label: "A smarter pace" },
  { id: "actions", number: "04", label: "What we can do" },
];

// Each chapter contributes the dialogs it opens, so DetailDialog stays the only place that
// renders one and no chapter has to import another chapter's components.
const DIALOG_VIEWS = {
  ...pressureDialogViews,
  ...risksDialogViews,
  ...slowdownDialogViews,
  ...actionsDialogViews,
};

function FieldGuideLayout() {
  const { progressPercent, activeChapterId } = useScrollProgress(CHAPTERS.map((one) => one.id));

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to the field guide
      </a>
      <ReadingProgress progressPercent={progressPercent} />
      <SiteHeader />

      <main id="main">
        <HeroBanner />
        <ChapterNav activeChapterId={activeChapterId} chapters={CHAPTERS} />

        <div className="page-content">
          <PressureChapter />
          <RisksChapter />
          <SlowdownChapter />
          <ActionsChapter />
        </div>

        <ClosingBand />
      </main>

      <SiteFooter />
      <DetailDialog views={DIALOG_VIEWS} />
      <ToastMessage />
    </>
  );
}

export default function FieldGuidePage() {
  return (
    <GuideStoreProvider>
      <FieldGuideLayout />
    </GuideStoreProvider>
  );
}
