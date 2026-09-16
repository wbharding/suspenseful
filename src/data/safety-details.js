// Element 1B. Safety is several workstreams, not a single score. Tile copy is the card;
// `details` is the dialog that opens from it.

export const safetyTiles = [
  {
    icon: "scan",
    title: "Evaluations",
    subtitle: "Test capabilities & failure modes",
    headline: "Good tests make important failures visible.",
    body: "Evaluate dangerous capabilities, run realistic scenarios and investigate how safeguards fail. Passing a limited test suite is evidence about those tests—not proof of universal safety.",
    source: "amodei",
  },
  {
    icon: "compass",
    title: "Reasoning checks",
    subtitle: "Find and investigate failures",
    headline: "An explanation is not a window into everything.",
    body: "Check for factual errors, inconsistent reasoning and failure modes. Chain-of-thought-style explanations may help investigation, but a plausible narrative is not guaranteed to faithfully expose the underlying computation.",
    source: "amodei",
  },
  {
    icon: "network",
    title: "Interpretability",
    subtitle: "Understand internal behavior",
    headline: "Behavior is only part of the picture.",
    body: "Investigate how internal representations and mechanisms relate to behavior. This is a research direction, not a solved inspection machine. The site intentionally does not invent a quantitative “understanding” score.",
    source: "amodei",
  },
  {
    icon: "scales",
    title: "Independent oversight",
    subtitle: "External review & accountability",
    headline: "A safety claim should survive outside scrutiny.",
    body: "Qualified external reviewers need access, sufficient resources and independence. Rules also need a clear response when evidence is missing or an evaluation fails.",
    source: "hassabis",
  },
];
