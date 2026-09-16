// Element 2D. Grace et al. 2023 researcher survey, Table 2. Three question framings of the same
// underlying concern, which is the point of the element: the wording moves the summary.
// Means and medians are percentages; `n` is the per-question respondent count.

export const surveyQuestions = [
  {
    id: "overall",
    label: "AI advances overall",
    question: "Future AI advances causing extinction or similarly permanent, severe human disempowerment",
    mean: 16.2,
    median: 5,
    n: 1321
  },
  {
    id: "control",
    label: "Loss of human control",
    question: "Human inability to control advanced AI causing extinction or similarly severe, permanent disempowerment",
    mean: 19.4,
    median: 10,
    n: 661
  },
  {
    id: "century",
    label: "Within 100 years",
    question: "AI advances causing extinction or similarly severe, permanent disempowerment within the next 100 years",
    mean: 14.4,
    median: 5,
    n: 655
  }
];

export const surveyHeadline = {
  range: '38\u201351',
  claim: 'of respondents assigned at least a 10% chance to extinction-level outcomes, depending on the wording.',
  warning: 'This is not a 38\u201351% probability of catastrophe.',
  respondents: 2778,
};
