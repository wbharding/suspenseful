// Section 2 follows the reader's five concerns. Race dynamics includes Kokotajlo's
// great-power conflict concern; this is a thematic grouping, not his ranked list.
export const riskConcerns = [
  {
    id: "race",
    cellId: "2A",
    concern: "Race dynamics",
    title: "Nobody can afford to be the one who slows down.",
    summary: "Competition rewards speed, even when every participant would prefer a safer race.",
    steps: [
      { icon: "target", label: "Fear of falling behind" },
      { icon: "road", label: "Pressure to move faster" },
      { icon: "clock", label: "Less time for safeguards" },
    ],
    caption: "Each rival’s acceleration becomes a reason to accelerate again.",
    detail: "A lab that spends longer checking safety risks losing its lead; a country that waits fears losing strategic power. Restraint by one participant cannot remove the pressure from its rivals. Kokotajlo also warns that a sudden AI lead could destabilize nuclear powers. Changing that logic requires credible coordination.",
    sourceIds: "kokotajlo-race-incentives,kokotajlo",
    listening: [
      { sourceId: "kokotajlo-race-incentives", label: "Why the race keeps going", time: "1:01:29" },
      { sourceId: "kokotajlo", label: "The danger of great-power conflict", time: "15:43" },
    ],
  },
  {
    id: "power",
    cellId: "2B",
    concern: "Concentration of power",
    title: "A few people could control everyone’s future.",
    summary: "Whoever controls the AI workforce could gain extraordinary economic and political power.",
    steps: [
      { icon: "people", label: "A few decision-makers" },
      { icon: "network", label: "An AI workforce" },
      { icon: "globe", label: "Society-wide influence" },
    ],
    caption: "Control can stay narrow even as an AI workforce expands.",
    detail: "Someone must choose AI’s goals and issue its orders. If that authority stays with a handful of companies or officials, greater capability magnifies their power. Human control alone does not guarantee public accountability.",
    sourceIds: "kokotajlo",
    listening: [
      { sourceId: "kokotajlo", label: "Who gets to control the AIs?", time: "1:12:18" },
    ],
  },
  {
    id: "jobs",
    cellId: "2C",
    concern: "Lost jobs",
    title: "When AI can do the work, workers lose leverage.",
    summary: "Widespread automation threatens livelihoods and the bargaining power that comes with being needed.",
    steps: [
      { icon: "briefcase", label: "Work people do" },
      { icon: "spark", label: "Cheaper AI labor" },
      { icon: "coins", label: "Less worker leverage" },
    ],
    caption: "Greater output does not automatically give workers a share.",
    detail: "If AI can perform most paid work more cheaply, employers have a reason to substitute it for people. New jobs may face the same competition. Sharing the gains then requires deliberate choices about income and power.",
    sourceIds: "kokotajlo",
    listening: [
      { sourceId: "kokotajlo", label: "Jobs, income, and bargaining power", time: "15:43" },
    ],
  },
  {
    id: "control",
    cellId: "2D",
    concern: "Loss of control",
    title: "We could lose control of what we create.",
    summary: "AI could pursue goals that diverge from ours while becoming too capable to supervise.",
    steps: [
      { icon: "compass", label: "Human instructions" },
      { icon: "network", label: "Complex AI decisions" },
      { icon: "eye", label: "Oversight falls behind" },
    ],
    caption: "Giving an instruction is not the same as retaining control.",
    detail: "As AI takes on work beyond human understanding, supervision depends increasingly on AI’s own explanations. Racing leaves less time to check them. Kokotajlo argues that alignment needs time the race does not provide.",
    sourceIds: "kokotajlo",
    listening: [
      { sourceId: "kokotajlo", label: "Why keeping control takes time", time: "51:44" },
    ],
  },
  {
    id: "misuse",
    cellId: "2E",
    concern: "Bad actors",
    title: "Powerful tools can make small groups dangerous.",
    summary: "AI could give criminals and terrorists capabilities once beyond their reach.",
    steps: [
      { icon: "people", label: "A small group" },
      { icon: "spark", label: "Powerful AI tools" },
      { icon: "shield-alert", label: "Much greater reach" },
    ],
    caption: "Defenders need protection; attackers look for an opening.",
    detail: "Helpful capabilities can also serve harmful intentions. Kokotajlo expects AI-equipped defenders to counter much misuse, but worries that biological attacks may favor attackers. Preventing access and improving defenses remain necessary even with aligned AI.",
    sourceIds: "kokotajlo",
    listening: [
      { sourceId: "kokotajlo", label: "Misuse and the limits of defense", time: "15:43" },
    ],
  },
];
