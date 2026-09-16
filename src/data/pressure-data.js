// Section 1 — "Why the pressure?"

// 1A. METR measures the length of software task a model can finish with 50% reliability.
// Measured points stop where published numbers stop; everything past that is the poster's
// fitted 124-day doubling, drawn as a dashed projection so the two are never confused.
export const taskHorizonTrend = {
  doublingDays: 124,
  headlineValue: "124 days",
  headlineLabel: "Fitted task-horizon doubling time",
  measuredThrough: "2025-08",
  projectThrough: "2029-01",
  axisTicks: [
    { minutes: 1, label: "1 minute" },
    { minutes: 60, label: "1 hour" },
    { minutes: 1440, label: "1 day" },
    { minutes: 14400, label: "10 days" },
    { minutes: 144000, label: "100 days" },
  ],
  measured: [
    { date: "2023-03", model: "GPT-4", minutes: 5, org: "OpenAI" },
    { date: "2024-05", model: "GPT-4o", minutes: 9, org: "OpenAI" },
    { date: "2024-06", model: "Claude 3.5 Sonnet", minutes: 18, org: "Anthropic" },
    { date: "2024-12", model: "o1", minutes: 39, org: "OpenAI" },
    { date: "2025-02", model: "Claude 3.7 Sonnet", minutes: 59, org: "Anthropic" },
    { date: "2025-04", model: "o3", minutes: 92, org: "OpenAI" },
    { date: "2025-08", model: "GPT-5", minutes: 137, org: "OpenAI" },
  ],
  caption: "AI can now complete tasks that once took humans hours or days, and it is improving quickly.",
  detail: [
    "The y-axis is logarithmic. Each gridline is roughly a tenfold jump in task length, so a straight line means capability is compounding rather than creeping.",
    "A doubling every 124 days means a model that can hold a two-hour task together today is holding a multi-day task together in about a year.",
    "Horizon length is not the same as trustworthiness. These are 50%-reliability numbers: the model finishes half the tasks of that length.",
  ],
  sources: [
    {
      label: "METR, Measuring AI ability to complete long tasks",
      url: "https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/",
    },
  ],
};

// 1B. Safety progress is made of separate, effortful workstreams; none of them come free
// with a capability jump.
export const understandingWorkstreams = [
  {
    id: "evaluation",
    title: "Evaluation",
    blurb: "Test capabilities and risks",
    imageId: "safety-evaluation",
    detail:
      "Dangerous-capability evaluations have to be built per risk, per modality, and rerun on every checkpoint. A new model does not inherit the last model's test suite.",
  },
  {
    id: "reasoning-checks",
    title: "Reasoning checks",
    blurb: "Find and fix flawed reasoning",
    imageId: "safety-reasoning-checks",
    detail:
      "Chain-of-thought monitoring is one of the few safety wins that scaled with capability, and it only helps while the reasoning a model shows us stays faithful to the reasoning it actually used.",
  },
  {
    id: "interpretability",
    title: "Interpretability",
    blurb: "Understand how systems work",
    imageId: "safety-interpretability",
    detail:
      "Reading a model's internals is still closer to research than to engineering practice. We can locate some features and circuits; we cannot yet certify what a frontier model will do in a new situation.",
  },
  {
    id: "independent-oversight",
    title: "Independent oversight",
    blurb: "External review and accountability",
    imageId: "safety-independent-oversight",
    detail:
      "Outside review needs access, funding, and standing. Today most of it happens at the invitation of the lab being reviewed.",
  },
];

export const understandingFootnote = "Progress in capability is not proof of safety.";

// 1C. Release cadence. Each block is a significant point release from a major lab.
export const modelReleaseCadence = {
  caption: "Each block represents a major model release. The pace is accelerating.",
  audioIdea: "One pop per release",
  years: [
    {
      year: 2024,
      releases: [
        { month: 2, label: "Gemini 1.5 Pro", org: "Google DeepMind" },
        { month: 3, label: "Claude 3", org: "Anthropic" },
        { month: 5, label: "GPT-4o", org: "OpenAI" },
        { month: 6, label: "Claude 3.5 Sonnet", org: "Anthropic" },
        { month: 7, label: "Llama 3.1 405B", org: "Meta" },
        { month: 9, label: "o1-preview", org: "OpenAI" },
        { month: 10, label: "Claude 3.5 Sonnet (new)", org: "Anthropic" },
        { month: 12, label: "Gemini 2.0 Flash", org: "Google DeepMind" },
      ],
    },
    {
      year: 2025,
      releases: [
        { month: 1, label: "DeepSeek-R1", org: "DeepSeek" },
        { month: 2, label: "Claude 3.7 Sonnet", org: "Anthropic" },
        { month: 2, label: "GPT-4.5", org: "OpenAI" },
        { month: 2, label: "Grok 3", org: "xAI" },
        { month: 3, label: "Gemini 2.5 Pro", org: "Google DeepMind" },
        { month: 4, label: "o3 and o4-mini", org: "OpenAI" },
        { month: 5, label: "Claude 4 Opus and Sonnet", org: "Anthropic" },
        { month: 7, label: "Grok 4", org: "xAI" },
        { month: 8, label: "GPT-5", org: "OpenAI" },
        { month: 9, label: "Claude Sonnet 4.5", org: "Anthropic" },
        { month: 10, label: "Claude Haiku 4.5", org: "Anthropic" },
        { month: 11, label: "Gemini 3 Pro", org: "Google DeepMind" },
        { month: 11, label: "GPT-5.1", org: "OpenAI" },
        { month: 11, label: "Claude Opus 4.5", org: "Anthropic" },
      ],
    },
    {
      year: 2026,
      isIncomplete: true,
      incompleteNote: "2026 is only partly logged. Fill the rest from a verified release log before publishing.",
      releases: [{ month: 9, label: "Astra", org: "OpenAI" }],
    },
  ],
  detail: [
    "Read the blocks as throughput rather than as a calendar. Three labs shipping a frontier point release in the same month is now unremarkable.",
    "Every block is also a governance event: a new model card, a new set of evaluations to rerun, and a new deployment surface for everyone downstream.",
    "The data note asks for this element to be playable — one popcorn pop per release, with a guitar solo over the one month that had none.",
  ],
  sources: [{ label: "Lab release announcements, 2024 to 2026" }],
};

// 1D. Some decisions cannot be taken back.
export const irreversibleChoices = {
  caption: "Once model weights spread, recalling every copy is difficult.",
  items: [
    {
      id: "weights-spread",
      title: "Weights do not come back",
      imageId: "frontier-model-stack",
      blurb: "An open release is a permanent release.",
      detail:
        "Once weights are downloaded and mirrored, there is no mechanism that reaches every copy. Safety work after that point can only address the deployments you still control.",
    },
    {
      id: "no-recall",
      title: "There is no recall button",
      imageId: "undo-recall",
      blurb: "Product recalls assume you can find the product.",
      detail:
        "Cars and medicines can be recalled because units are registered and physical. A model that has been fine-tuned and redistributed has neither property.",
    },
    {
      id: "financial-lock-in",
      title: "Money locks the course in",
      imageId: null,
      blurb: "Financial commitments and competitive pressure increase the drive to keep racing.",
      detail:
        "The data note flags public-market exposure as the next ratchet: once frontier labs answer to public shareholders, pro-race sentiment gets a permanent constituency and slowing down becomes a disclosure event.",
    },
  ],
};
