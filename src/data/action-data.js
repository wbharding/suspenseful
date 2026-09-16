// Chapter 4. Concrete next steps, split into the `high` (build the conditions for cooperation)
// and `practical` (make preparedness tangible) groups.

export const actionItems = [
  {
    id: "research",
    group: "high",
    icon: "book",
    title: "Back independent safety research",
    description: "Support the people asking questions the race can leave behind.",
    details: "Review an organization’s research agenda, independence, track record and funding needs. METR is one example; this is a starting point for evaluation, not a ranked donation recommendation.",
    source: "metr-live",
    link: "https://metr.org/donate/"
  },
  {
    id: "representative",
    group: "high",
    icon: "landmark",
    title: "Bring evidence to a representative",
    description: "Ask for a meeting, not just a reaction.",
    details: "Make a specific ask: independent frontier evaluations, meaningful incident reporting and sufficient public-sector technical expertise. Edit the draft in your own voice before sending.",
    source: "senate",
    link: "https://www.senate.gov/senators/senators-contact.htm"
  },
  {
    id: "coordination",
    group: "high",
    icon: "handshake",
    title: "Engage with a serious coordination plan",
    description: "Read, challenge and improve proposals such as Plan A.",
    details: "Consider what is being limited, who can verify compliance, what benefits remain available and what ends the constraint. Plan A is a recommendation, not a prediction or a consensus position.",
    source: "plan-a",
    link: "https://ai-2040.com/"
  },
  {
    id: "monitoring",
    group: "practical",
    icon: "radar",
    title: "Strengthen early-warning research",
    description: "Study how to detect and respond to unusual events.",
    details: "Support transparent research into public-health surveillance and anomaly detection, including environmental monitoring. Evaluate sensitivity, false alarms, privacy and response capacity. No existing system is portrayed here as detecting every threat.",
    source: "draft"
  },
  {
    id: "funding",
    group: "practical",
    icon: "coins",
    title: "Make preparedness someone’s budget",
    description: "Explore how industry can help pay for shared safeguards.",
    details: "Compare funding proposals such as independent evaluation fees, levies and public research budgets. Ask whether each mechanism preserves independence and avoids shifting burdens onto smaller entrants. No particular tax rate is recommended here.",
    source: "hassabis"
  },
  {
    id: "forecasts",
    group: "practical",
    icon: "chart",
    title: "Keep a forecast—and update it",
    description: "Write down a probability, a deadline and what would change your mind.",
    details: "Distinguish job disruption from catastrophic scenarios. Record your own assumptions, update dates and resolution criteria. The journal on this page is private to this browser and is not a prediction market or an expert consensus.",
    source: "draft"
  }
];

// @param {string} group - 'high' or 'practical'
// @returns {object[]}
export function actionsInGroup(group) {
  return actionItems.filter((action) => action.group === group);
}
