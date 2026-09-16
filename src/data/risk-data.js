// Section 2 — "What could go wrong?" (2A, 2B and 2D; 2C lives in leader-quote-data.js)

// 2A. Four lanes, one shared incentive. The bubble text is identical on purpose.
export const raceLanes = {
  sharedLine: "We can't afford to fall behind.",
  footnote: "Individually rational. Collectively risky.",
  imageId: "race-lanes",
  lanes: [
    {
      id: "ai-labs",
      label: "AI Labs",
      detail:
        "A lab that pauses unilaterally loses staff, funding and the argument that safety-focused labs should be the ones at the frontier.",
    },
    {
      id: "companies",
      label: "Companies",
      detail:
        "Buyers reward whoever ships the capability first. Waiting for an independent evaluation is a quarter of lost ground.",
    },
    {
      id: "nations",
      label: "Nations",
      detail:
        "Security framing turns compute and talent into strategic assets, which makes restraint look like disarmament.",
    },
    {
      id: "startups",
      label: "Startups",
      detail:
        "Runway is measured in months. The safety work that pays off in three years is the work a startup cannot afford to do.",
    },
  ],
  detail: [
    "There is a natural tension between manageable AI and fast-moving AI, and no single participant can resolve it alone.",
    "This is the structure that makes the shared checkpoint in section 3 the interesting move: it changes what everyone else is doing, not just what you are doing.",
  ],
};

// 2B. Tiered harm ladder, near-term at the bottom of the stack to long-term at the top.
export const harmLadder = {
  caption: "Increasing capability can enable:",
  footnote: "Timing and likelihood remain uncertain.",
  rungs: [
    {
      id: "jobs-and-information",
      title: "Jobs and information",
      blurb: "Labor disruption, scams, misinformation",
      imageId: "harm-jobs-and-information",
      horizon: "Already visible",
      detail:
        "Job losses have begun. The data note asks for this rung to be drawn as a moving walkway of changing job descriptions, with workers, educators and public institutions walking alongside it carrying updated plans — people adapting, not disappearing.",
    },
    {
      id: "powerful-misuse",
      title: "More powerful misuse",
      blurb: "Cyberattacks and biological uplift",
      imageId: "harm-powerful-misuse",
      horizon: "Near term",
      detail:
        "The concern is capability transfer to people who could not previously act. A frontier assistant that shortens a difficult attack chain from years of expertise to weeks of persistence changes who the attacker set is.",
    },
    {
      id: "concentrated-power",
      title: "Concentrated power",
      blurb: "Fewer people controlling essential systems",
      imageId: "harm-concentrated-power",
      horizon: "Medium term",
      detail:
        "Automation lets a small group operate systems that used to require the consent and cooperation of many. That removes a check on power that never had to be written down.",
    },
    {
      id: "loss-of-control",
      title: "Loss of human control",
      blurb: "Systems acting against human interests",
      imageId: "harm-loss-of-control",
      horizon: "Long term",
      detail:
        "The scenario frontier lab leaders now name directly: capable, misaligned systems pursuing goals we did not choose, at a speed and scale that leaves no comfortable moment to intervene.",
    },
  ],
};

// 2D. Show the spread rather than one scary number: even the optimists are not at zero.
export const riskEstimateSpread = {
  headlineValue: "38–51%",
  headlineLabel: "of respondents assigned at least a 10% chance to outcomes as bad as human extinction",
  caveatTitle: "Survey beliefs — not measured risk",
  caveatBody: "These are subjective estimates, not predictions.",
  footnote:
    "Across studies, a substantial share of AI researchers think there is a meaningful risk of catastrophic outcomes, underscoring the case for more safety work.",
  axisTicks: [ 0, 25, 50, 75, 100 ],
  studies: [
    {
      id: "ai-impacts-2023",
      label: "AI Impacts 2023",
      population: "2,778 published AI authors",
      lowPercent: 37.8,
      highPercent: 51.4,
      question: "Gave at least a 10% chance to advanced AI causing outcomes as bad as human extinction",
      note: "The range comes from asking the question several ways; the wording moved the answer by 14 points.",
      source: "Grace et al., Thousands of AI Authors on the Future of AI",
      url: "https://arxiv.org/abs/2401.02843",
    },
    {
      id: "ai-impacts-2022",
      label: "AI Impacts 2022",
      population: "738 machine learning researchers",
      lowPercent: 48,
      highPercent: 48,
      question: "Gave at least a 10% chance to an extremely bad long-run outcome",
      note: "The median respondent put the chance of an extremely bad outcome at 5%.",
      source: "AI Impacts, 2022 Expert Survey on Progress in AI",
      url: "https://aiimpacts.org/2022-expert-survey-on-progress-in-ai/",
    },
    {
      id: "amodei-estimate",
      label: "Amodei, 2025",
      population: "One frontier lab CEO",
      lowPercent: 25,
      highPercent: 25,
      question: "Chance that things go really, really badly",
      note: "Included as a reference point, not as survey data.",
      source: "Axios",
    },
  ],
  detail: [
    "The interesting number is not the median, it is the share of researchers who refuse to round the risk to zero. That share is large in every survey that has asked.",
    "Disagreement runs on the odds, not on whether more safety work is warranted.",
  ],
};
