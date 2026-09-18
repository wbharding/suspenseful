// Every citation on the page, keyed by the id that components reference.
//
// `note` is the part that matters: each one states what the source does and does not support.
// The evidence drawer renders these verbatim, so caveats travel with the claim rather than
// living in a footnote nobody opens.

export const sourceRegistry = {
  draft: {
    title: "Original infographic outline",
    publisher: "Bill Harding · Amplenote",
    date: "September 2026",
    url: "https://public.amplenote.com/Vs6mjq7U3j5BMpe464fTuZG8",
    type: "Editorial outline",
    note: "The four-part structure and visual metaphors come from this outline. Illustrations are not evidence for numerical claims."
  },
  metr: {
    title: "Time Horizon 1.1 — historical comparison",
    publisher: "METR",
    date: "January 29, 2026",
    url: "https://metr.org/blog/2026-1-29-time-horizon-1-1/",
    type: "Historical benchmark data",
    note: "Numbers are transcribed from the “Changes to Model Horizon Estimates” table, in minutes. This is the January publication snapshot, NOT the current leaderboard. METR subsequently revised estimates, including a March 2026 regularization correction. The two benchmark versions are kept separate; missing values are not interpolated. Intervals are the reported bootstrapped confidence intervals."
  },
  "metr-live": {
    title: "Current task-completion time horizons",
    publisher: "METR",
    date: "Living research page",
    url: "https://metr.org/time-horizons/",
    type: "Current methodology & results",
    note: "A time horizon measures task difficulty in human-expert minutes at a given success rate, not how long an AI runs. Tasks are predominantly software, machine-learning and cybersecurity work. METR warns that estimates above 16 hours are unreliable with its current task suite. This site does not claim that a benchmark time horizon means a whole job is automatable."
  },
  "release-dates": {
    title: "LLM release timeline",
    publisher: "Bill Harding · Amplenote",
    date: "September 13, 2026",
    url: "https://public.amplenote.com/z28idzmc2wTjLNsucS6tBZPB",
    type: "Compiled release catalog",
    note: "Seven labs only: Anthropic, OpenAI, Google, xAI, Meta, Z.ai, and DeepSeek. Flagship and point text-LLM releases from January 2024 through 12 September 2026, not an industry census and not a capability score. Same-day named variants are shown as separate blocks. Four rows are month-level (no confirmed day). Several 2026 dates — especially Fable/Mythos, GPT-5.6, Grok 4.7, and GLM-5.x — rest on secondary trackers and are marked provisional. Grok 4.7 is announced, not confirmed shipped. Image, video, audio, and embedding models are out of scope. Blank months mean no events in this catalog."
  },
  amodei: {
    title: "We Must Pace the Frontier",
    publisher: "Dario Amodei",
    date: "September 2026",
    url: "https://darioamodei.com/post/we-must-pace-the-frontier",
    type: "First-person argument",
    note: "Amodei advocates pacing capability development, third-party evaluators, and national and international coordination. His catastrophic scenarios are concerns and forecasts, not established probabilities. He also emphasizes potential benefits and the costs of not building AI."
  },
  hassabis: {
    title: "A Framework for Frontier AI and the Dawning of a New Age",
    publisher: "Demis Hassabis",
    date: "July 14, 2026",
    url: "https://demishassabis.substack.com/p/a-framework-for-frontier-ai-and-the-dawning-of-a-new-age",
    type: "First-person policy proposal",
    note: "Proposes a frontier standards body, independent assessments and a framework that could be strengthened if risks warrant it. The essay supports responsible innovation; its author is not endorsing every slowdown proposal on this page."
  },
  altman: {
    title: "Machine intelligence, part 1",
    publisher: "Sam Altman",
    date: "2015",
    url: "https://blog.samaltman.com/machine-intelligence-part-1",
    type: "First-person essay",
    note: "The excerpt concerns superhuman machine intelligence. This historical warning is not a quantified risk estimate or evidence of endorsement of a particular present-day policy."
  },
  pichai: {
    title: "Sundar Pichai · Lex Fridman Podcast #471",
    publisher: "Lex Fridman · interview transcript",
    date: "2025 · approximately 45:50",
    url: "https://lexfridman.com/sundar-pichai-transcript/",
    type: "Interview transcript",
    note: "The full p(doom) exchange at 44:34–47:32 places the warning alongside Pichai’s optimism that humanity can respond. The main transcript contains the quoted wording; the introductory highlight is transcribed differently."
  },
  zuckerberg: {
    title: "The Future is for Everyone",
    publisher: "Mark Zuckerberg · Meta",
    date: "August 10, 2026",
    url: "https://about.fb.com/news/2026/08/the-future-is-for-everyone/",
    type: "First-person essay",
    note: "The essay acknowledges risks to human control while arguing for widely distributed personal agents and open-source AI. Acknowledging risk is not the same as supporting a pause; Zuckerberg’s proposed response differs from some others here."
  },
  musk: {
    title: "Elon Musk Sounds the Alarm on Artificial Intelligence",
    publisher: "TIME · reporting on MIT remarks",
    date: "October 27, 2014",
    url: "https://time.com/3541005/elon-musk-artificial-intelligence/",
    type: "Contemporaneous reporting",
    note: "Reports Musk’s October 2014 comments at the MIT AeroAstro symposium. This is a rhetorical warning, not a probability estimate. Unlike the other quote sources, this is a contemporaneous secondary report."
  },
  survey: {
    title: "Thousands of AI Authors on the Future of AI",
    publisher: "Grace et al. · 2,778 AI researchers surveyed in 2023",
    date: "January 2024 paper",
    url: "https://arxiv.org/html/2401.02843v1",
    type: "Researcher survey",
    note: "The means, medians and question-level sample sizes are from Table 2. The 38–51% figure is the share of respondents assigning at least a 10% probability to extinction-level outcomes across different question wordings—not a 38–51% chance of catastrophe. These are subjective beliefs, not measured frequencies. Respondents disagreed about whether faster or slower progress was preferable. This site does not fabricate an individual-response distribution."
  },
  jfk: {
    title: "Nuclear Test Ban Treaty",
    publisher: "John F. Kennedy Presidential Library and Museum",
    date: "Historical account · 1963",
    url: "https://www.jfklibrary.org/learn/about-jfk/jfk-in-history/nuclear-test-ban-treaty",
    type: "Historical precedent",
    note: "The Limited Test Ban Treaty prohibited testing in the atmosphere, outer space and underwater, but not underground. A partial agreement is not the same as total disarmament."
  },
  asilomar: {
    title: "Summary statement of the Asilomar conference on recombinant DNA molecules",
    publisher: "Berg et al. · PNAS",
    date: "1975",
    url: "https://doi.org/10.1073/pnas.72.6.1981",
    type: "Historical primary document",
    note: "A primary statement on risk-based safeguards for recombinant DNA research. The policy context and verification problem differ substantially from frontier AI."
  },
  montreal: {
    title: "About the Montreal Protocol",
    publisher: "UN Environment Programme",
    date: "Treaty adopted September 16, 1987",
    url: "https://www.unep.org/ozonaction/who-we-are/about-montreal-protocol",
    type: "Historical precedent",
    note: "An international agreement to phase out ozone-depleting substances. The existence of a successful agreement elsewhere does not establish that an AI agreement will be feasible or sufficient."
  },
  "plan-a": {
    title: "AI 2040: Plan A",
    publisher: "AI Futures Project",
    date: "July 2026",
    url: "https://ai-2040.com/",
    type: "Recommendation / scenario",
    note: "A proposal for how the world should navigate superintelligence, explicitly not a prediction of what will happen. Included as one substantial coordination proposal, not as a consensus plan."
  },
  kokotajlo: {
    title: "Daniel Kokotajlo on AI 2040 and Plan A",
    publisher: "The 80,000 Hours Podcast · interviewed by Luisa Rodriguez",
    date: "2026",
    url: "https://80000hours.org/podcast/episodes/daniel-kokotajlo-ai-2040-plan-a/",
    type: "Interview transcript",
    note: "Quotes are verbatim from the published transcript, where Kokotajlo canvasses five problems in reverse order. All five appear on this page. Kokotajlo is a former OpenAI researcher and co-author of the AI 2040 scenarios. These are his forecasts and concerns, not measured probabilities, and the wider transcript is more hedged than any single excerpt. He describes the harms; he is not the source for the suggested responses beside them, and other people quoted on this page would respond differently."
  },
  senate: {
    title: "Contacting U.S. Senators",
    publisher: "U.S. Senate",
    date: "Official directory",
    url: "https://www.senate.gov/senators/senators-contact.htm",
    type: "Action resource",
    note: "Find the senators who represent your state. The draft message on this page is editable and is never sent automatically."
  },
  house: {
    title: "Find Your Representative",
    publisher: "U.S. House of Representatives",
    date: "Official directory",
    url: "https://www.house.gov/representatives/find-your-representative",
    type: "Action resource",
    note: "Official representative lookup. This prototype does not ask for, infer or transmit your address."
  },
  "launch-0": {
    title: "Introducing Claude Sonnet 4.6",
    publisher: "Anthropic",
    date: "2026-02-17",
    url: "https://www.anthropic.com/news/claude-sonnet-4-6",
    type: "Official release announcement",
    note: "Used for the named model’s announcement date only. The timeline does not count every model, variant or product update."
  },
  "launch-1": {
    title: "Introducing Gemini 3.1 Pro",
    publisher: "Google",
    date: "2026-02-19",
    url: "https://cloud.google.com/blog/products/ai-machine-learning/gemini-3-1-pro-on-gemini-cli-gemini-enterprise-and-vertex-ai",
    type: "Official release announcement",
    note: "Used for the named model’s announcement date only. The timeline does not count every model, variant or product update."
  },
  "launch-3": {
    title: "Introducing GPT-5.4",
    publisher: "OpenAI",
    date: "2026-03-05",
    url: "https://openai.com/index/introducing-gpt-5-4/",
    type: "Official release announcement",
    note: "Used for the named model’s announcement date only. The timeline does not count every model, variant or product update."
  },
  "launch-4": {
    title: "Introducing GPT-5.4 mini",
    publisher: "OpenAI",
    date: "2026-03-17",
    url: "https://openai.com/index/introducing-gpt-5-4-mini-and-nano/",
    type: "Official release announcement",
    note: "Used for the named model’s announcement date only. The timeline does not count every model, variant or product update."
  },
  "launch-5": {
    title: "Introducing GPT-5.4 nano",
    publisher: "OpenAI",
    date: "2026-03-17",
    url: "https://openai.com/index/introducing-gpt-5-4-mini-and-nano/",
    type: "Official release announcement",
    note: "Used for the named model’s announcement date only. The timeline does not count every model, variant or product update."
  },
  "launch-6": {
    title: "Introducing Claude Opus 4.7",
    publisher: "Anthropic",
    date: "2026-04-16",
    url: "https://www.anthropic.com/news/claude-opus-4-7",
    type: "Official release announcement",
    note: "Used for the named model’s announcement date only. The timeline does not count every model, variant or product update."
  },
  "launch-7": {
    title: "Introducing GPT-5.5",
    publisher: "OpenAI",
    date: "2026-04-23",
    url: "https://openai.com/index/introducing-gpt-5-5/",
    type: "Official release announcement",
    note: "Used for the named model’s announcement date only. The timeline does not count every model, variant or product update."
  },
  "launch-8": {
    title: "Introducing Claude Opus 4.8",
    publisher: "Anthropic",
    date: "2026-05-28",
    url: "https://www.anthropic.com/news/claude-opus-4-8",
    type: "Official release announcement",
    note: "Used for the named model’s announcement date only. The timeline does not count every model, variant or product update."
  },
  "launch-9": {
    title: "Introducing Claude Sonnet 5",
    publisher: "Anthropic",
    date: "2026-06-30",
    url: "https://www.anthropic.com/news/claude-sonnet-5",
    type: "Official release announcement",
    note: "Used for the named model’s announcement date only. The timeline does not count every model, variant or product update."
  },
  "launch-10": {
    title: "Introducing Claude Opus 5",
    publisher: "Anthropic",
    date: "2026-07-24",
    url: "https://www.anthropic.com/news/claude-opus-5",
    type: "Official release announcement",
    note: "Used for the named model’s announcement date only. The timeline does not count every model, variant or product update."
  },
  alphago: {
    title: "AlphaGo",
    publisher: "Google DeepMind",
    date: "January–March 2016",
    url: "https://deepmind.google/research/breakthroughs/alphago/",
    type: "Research announcement",
    note: "DeepMind described professional Go as a grand challenge widely expected to remain out of reach for at least a decade. Fan Hui’s ‘another ten years’ remark is contemporaneous reporting of that same surprise, not a formal forecast survey."
  },
  alphafold: {
    title: "Highly accurate protein structure prediction with AlphaFold",
    publisher: "Nature / DeepMind",
    date: "November 30, 2020",
    url: "https://www.nature.com/articles/s41586-021-03819-2",
    type: "Research paper",
    note: "DeepMind and CASP framed protein-structure prediction as a 50-year grand challenge. ‘The problem is solved’ is John Moult’s contemporaneous assessment of CASP14, not a claim that every related biological question is closed."
  },
  superglue: {
    title: "SuperGLUE: A Stickier Benchmark for General-Purpose Language Understanding Systems",
    publisher: "NeurIPS",
    date: "2019",
    url: "https://arxiv.org/abs/1905.00537",
    type: "Benchmark paper",
    note: "SuperGLUE was introduced because GLUE had already been saturated. The later saturation of SuperGLUE itself is the graveyard point; the paper is the source for why a ‘harder’ successor was needed so soon."
  },
  "expert-survey-2022": {
    title: "2022 Expert Survey on Progress in AI",
    publisher: "AI Impacts · Grace et al.",
    date: "2022",
    url: "https://wiki.aiimpacts.org/doku.php?id=ai_timelines:predictions_of_human-level_ai_timelines:ai_timeline_surveys:2022_expert_survey_on_progress_in_ai",
    type: "Expert survey",
    note: "Aggregate expert forecasts, not a single person’s bet. Task-level questions (including high-school contest mathematics) had later medians than the years in which gold-level IMO systems were later reported. Surveys are snapshots of belief, not clocks."
  }
};

// @param {string} ids - one id, or several separated by commas
// @returns {object[]} the matching registry entries, skipping unknown ids
export function lookupSources(ids) {
  return String(ids || '')
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean)
    .map((id) => (sourceRegistry[id] ? { id, ...sourceRegistry[id] } : null))
    .filter(Boolean);
}
