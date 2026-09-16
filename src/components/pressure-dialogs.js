import CapabilityDataDialog from "./capability-data-dialog.jsx";
import ReleaseDataDialog from "./release-data-dialog.jsx";
import ReleaseInfoDialog from "./release-info-dialog.jsx";
import SafetyDialog from "./safety-dialog.jsx";

// Dialogs opened from the pressure chapter, merged into DetailDialog by field-guide-page.jsx.
export const dialogViews = {
  "capability-data": CapabilityDataDialog,
  "release-data": ReleaseDataDialog,
  "release-info": ReleaseInfoDialog,
  safety: SafetyDialog,
};
