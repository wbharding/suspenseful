// Section 2, element 2C — "Warnings from the builders".
//
// `posterQuote` is the trimmed line that appears on the poster. `quotes` is the full set from
// the data note, shown when a reader opens a leader. Where the note recorded a publication but
// not a link, `url` is omitted and the component prints the citation as plain text.
//
// The note kept every quotation in one flat list, which put several of Amodei's lines under
// Altman's heading. Attribution here follows the poster: the 2026 "slow the pace", botnet and
// extermination lines are Amodei's essay, and the 2026 Fortune "absolutely" line is Altman's.

export const leaderQuoteIntro = {
  framing: "Acknowledging risk is not the same as endorsing a slowdown. These leaders differ on solutions.",
  stake: "What do they have to lose by saying this? Many billions.",
  jointStatement: {
    text:
      "Mitigating the risk of extinction from AI should be a global priority alongside other societal-scale risks such as pandemics and nuclear war.",
    context: "Signed by Altman, Amodei and Hassabis, among others",
    date: "May 30, 2023",
    source: "Center for AI Safety",
    url: "https://www.safe.ai/work/statement-on-ai-risk",
  },
  summary:
    "Several leaders directly responsible for developing frontier AI have explicitly acknowledged the possibility of human extinction or loss of human control, and some now argue that capability development must slow until safeguards catch up.",
};

export const leaderQuotes = [
  {
    id: "altman",
    name: "Sam Altman",
    role: "CEO",
    org: "OpenAI",
    imageId: "portrait-altman",
    posterQuote: "A great threat.",
    signedJointStatement: true,
    quotes: [
      {
        text:
          "Development of superhuman machine intelligence (SMI) is probably the greatest threat to the continued existence of humanity.",
        year: 2015,
        source: "Personal blog",
      },
      {
        text:
          "AI will probably most likely lead to the end of the world, but in the meantime, there'll be great companies.",
        year: 2015,
        source: "Business Insider",
      },
      {
        text: "Lights out for all of us.",
        context: "Describing the bad-case outcome at a StrictlyVC event in January 2023",
        year: 2023,
        source: "TechCrunch",
      },
      {
        text: "Absolutely.",
        context: "Answering whether AI beyond human control is possible, in an interview conducted September 11 and published September 12",
        year: 2026,
        source: "Fortune",
        url: "https://fortune.com/2026/09/15/sam-altman-says-openai-ipo-window-pushed-2027-but-markets-arent-the-culprit/",
      },
    ],
  },
  {
    id: "amodei",
    name: "Dario Amodei",
    role: "CEO",
    org: "Anthropic",
    imageId: "portrait-amodei",
    posterQuote: "We need to slow the pace.",
    signedJointStatement: true,
    quotes: [
      {
        text: "We must slow the pace at which we improve the capabilities of AI models.",
        year: 2026,
        source: "Personal blog",
      },
      {
        text: "Taking over the entire internet with a persistent botnet.",
        context: "The essay's most alarming near-term scenario: misaligned AI swarms, in early-to-mid 2027",
        year: 2026,
        source: "Personal blog",
      },
      {
        text: "[AI] could decide that it is justifiable to exterminate humanity.",
        year: 2026,
        source: "Personal blog",
      },
      {
        text: "There's a 25% chance that things go really, really badly.",
        year: 2025,
        source: "Axios",
      },
    ],
  },
  {
    id: "pichai",
    name: "Sundar Pichai",
    role: "CEO",
    org: "Alphabet",
    imageId: "portrait-pichai",
    posterQuote: "The risk is pretty high.",
    signedJointStatement: false,
    quotes: [
      {
        text: "I think the underlying risk is actually pretty high.",
        context: "On the probability that advanced AI could destroy human civilization",
        year: 2025,
        source: "Lex Fridman Podcast",
      },
      {
        text: "If deployed wrongly, it could be very harmful. Does that keep me up at night? Absolutely.",
        year: 2023,
        source: "60 Minutes",
      },
    ],
  },
  {
    id: "zuckerberg",
    name: "Mark Zuckerberg",
    role: "CEO",
    org: "Meta",
    imageId: "portrait-zuckerberg",
    posterQuote: "This puts humanity in peril.",
    signedJointStatement: false,
    quotes: [
      {
        text: "At worst puts humanity in peril.",
        context: "On AI acquiring enough power, in an essay published August 10, 2026",
        year: 2026,
        source: "Personal essay",
      },
      {
        text: "It is not clear that there is any way to expect benevolence.",
        year: 2026,
        source: "Personal essay",
      },
    ],
  },
  {
    id: "hassabis",
    name: "Demis Hassabis",
    role: "CEO",
    org: "Google DeepMind",
    imageId: "portrait-hassabis",
    posterQuote: "We may be outpacing our understanding.",
    signedJointStatement: true,
    quotes: [
      {
        text: "Advances on the frontier are outpacing our understanding of the technology.",
        year: 2026,
        source: "Personal blog",
      },
    ],
  },
  {
    id: "musk",
    name: "Elon Musk",
    role: "CEO",
    org: "xAI and Tesla",
    imageId: "portrait-musk",
    posterQuote: "We are summoning the demon.",
    signedJointStatement: false,
    quotes: [
      {
        text: "With artificial intelligence we are summoning the demon.",
        year: 2014,
        source: "Time",
      },
    ],
  },
];
