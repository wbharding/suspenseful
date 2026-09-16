import ActionDetailDialog from "./action-detail-dialog.jsx";
import ForecastFormDialog from "./forecast-form-dialog.jsx";
import MeetingDialog from "./meeting-dialog.jsx";
import PlanDialog from "./plan-dialog.jsx";

// Dialogs opened from the actions chapter (and the header plan button).
export const dialogViews = {
  action: ActionDetailDialog,
  plan: PlanDialog,
  forecast: ForecastFormDialog,
  meeting: MeetingDialog,
};
