// Benchmarks that were treated as long-horizon challenges, then fell. Each quote is the
// expected wait — how long it was supposed to take — not a celebration of the score.
//
// Saturation is not the same as a job being automated. These sit beside the METR time-horizon
// chart as a reminder that the goalposts keep moving after a test is beaten.

export const brokenBenchmarks = [
  {
    id: "go",
    name: "Professional Go",
    conquered: "2016",
    wait: "At least a decade",
    quote: "I thought it would take another ten years.",
    attribution: "Fan Hui, after losing to AlphaGo",
    source: "alphago",
  },
  {
    id: "protein",
    name: "Protein structure",
    conquered: "2020",
    wait: "A 50-year problem",
    quote: "This is a big deal. In some sense the problem is solved.",
    attribution: "John Moult, CASP, on AlphaFold",
    source: "alphafold",
  },
  {
    id: "superglue",
    name: "SuperGLUE",
    conquered: "2020",
    wait: "Built to outlast GLUE",
    quote: "GLUE has been saturated. We introduce SuperGLUE, a new benchmark… designed to be a more difficult successor.",
    attribution: "Wang et al., SuperGLUE (2019) — the successor then saturated too",
    source: "superglue",
  },
  {
    id: "imo",
    name: "IMO gold",
    conquered: "2025",
    wait: "Late 2020s, on the survey",
    quote: "Expert medians put gold-medal contest math later than the year it arrived.",
    attribution: "2022 Expert Survey on Progress in AI",
    source: "expert-survey-2022",
  },
  {
    id: "hour",
    name: "One-hour software tasks",
    conquered: "2025",
    wait: "The next doubling",
    quote: "A 50% time horizon of about an hour was the sort of mark that kept receding — until it didn’t.",
    attribution: "METR Time Horizon 1.1, January 2026 snapshot",
    source: "metr",
  },
];
