// Element 3D. The policy menu, ordered lighter-touch to more restrictive. Every entry carries
// its tradeoff, so the strongest option is not presented as free.

export const policyOptions = [
  {
    title: "Transparency",
    icon: "file",
    short: "Make risks visible",
    change: "Require meaningful reporting on capabilities, evaluations and serious incidents.",
    continues: "Development and deployment continue, with more information for outsiders.",
    tradeoff: "Disclosure alone does not stop unsafe behavior. Protect sensitive security details and avoid performative reporting.",
    source: "hassabis"
  },
  {
    title: "Release gates",
    icon: "shield",
    short: "Test before deployment",
    change: "Require independent assessment and defined conditions before the most capable systems are deployed.",
    continues: "Lower-risk uses and research can continue within the agreed scope.",
    tradeoff: "Tests can miss risks or be gamed. Reviewers need access, expertise and independence.",
    source: "hassabis"
  },
  {
    title: "Licensing & liability",
    icon: "scales",
    short: "Clarify accountability",
    change: "Tie certain high-risk activities to authorization, oversight and responsibility for harm.",
    continues: "Activities outside the defined threshold remain available; the details matter.",
    tradeoff: "Poor design could entrench incumbents, constrain open research or create hard-to-enforce obligations.",
    source: "plan-a"
  },
  {
    title: "Targeted pause",
    icon: "pause",
    short: "Buy time where stakes are highest",
    change: "Temporarily constrain specified frontier activities while agreed safeguards and verification are built.",
    continues: "Existing useful AI and activities outside the pause’s scope can keep moving.",
    tradeoff: "Coordination, enforceability and a clear exit condition are essential. Delayed beneficial innovation is a real cost.",
    source: "amodei"
  }
];
