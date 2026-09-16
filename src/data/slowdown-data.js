// Section 3 — "What would slowing down achieve?"

// 3A. Society has coordinated on high-stakes technology risks before.
export const coordinationPrecedents = {
  caption: "Society has successfully coordinated on high-stakes technology risks before.",
  footnote: "Shared action can work on global risks.",
  entries: [
    {
      id: "test-ban-treaty",
      year: "1963",
      title: "Limited Test Ban Treaty",
      outcome: "Reduced nuclear testing.",
      imageId: "precedent-test-ban-treaty",
      detail:
        "Signed at the height of the Cold War by rivals with every incentive to defect. It worked because the thing being banned — atmospheric testing — was detectable from outside each country's borders.",
      lesson: "Verification, not trust, is what made restraint survivable.",
    },
    {
      id: "asilomar",
      year: "1975",
      title: "Asilomar biosafety conference",
      outcome: "Set voluntary guidelines.",
      imageId: "precedent-asilomar",
      detail:
        "Molecular biologists paused recombinant DNA work themselves, met, and wrote containment rules by risk class. The moratorium lasted months, and the field kept its licence to operate.",
      lesson: "A self-imposed pause can be short and still change the default.",
    },
    {
      id: "montreal-protocol",
      year: "1987",
      title: "Montreal Protocol",
      outcome: "Phased out ozone-depleting chemicals.",
      imageId: "precedent-montreal-protocol",
      detail:
        "Universally ratified, and strengthened repeatedly as the science improved. Industry came along once the phase-out schedule was predictable enough to plan capital around.",
      lesson: "A credible schedule beats a strict target nobody can finance.",
    },
  ],
};

// 3B. The checkpoint is the answer to 2A: it changes the whole field's pace at once.
export const sharedCheckpoint = {
  title: "Shared rules, not individual restraint",
  caption: "A common checkpoint can reduce the pressure to cut corners.",
  footnote: "Agreed checkpoints help everyone move forward more securely.",
  imageId: "shared-checkpoint",
  lanes: [ "AI Labs", "Companies", "Nations", "Startups" ],
  gates: [
    {
      id: "defined-scope",
      label: "Defined scope",
      detail:
        "Written down in advance: which systems the checkpoint applies to, at what training compute or capability threshold, and what counts as a new system rather than an update.",
    },
    {
      id: "independent-verification",
      label: "Independent verification",
      detail:
        "Someone outside the lab checks the claim, with the access needed to check it. Self-attestation is what the checkpoint is supposed to replace.",
    },
    {
      id: "conditions-for-proceeding",
      label: "Conditions for proceeding",
      detail:
        "A pass is a defined state, not a judgement call. Everyone knows in advance what clearing the gate requires, which is what makes it safe to stop short of it.",
    },
  ],
};

// 3C. A pause is only worth anything if the time is spent.
export const pauseInvestments = {
  title: "Use the time. Don't just lose it.",
  caption: "A pause can be a productive investment in a safer, more inclusive future.",
  bannerLabel: "Pause to build",
  footnote: "Invest in people, institutions, and tools for a safer, fairer future.",
  imageId: "pause-to-build",
  pillars: [
    {
      id: "evaluation-and-alignment",
      title: "Evaluation & alignment",
      detail:
        "Build the test suites and alignment techniques that do not exist yet, while the systems being tested are still ones we can study.",
    },
    {
      id: "cybersecurity",
      title: "Cybersecurity",
      detail:
        "Harden the infrastructure that a capable misaligned system — or a capable human using one — would go after first, including the labs' own weights.",
    },
    {
      id: "governance",
      title: "Governance",
      detail:
        "Stand up the institutions that would run a checkpoint: funded, staffed, with legal authority and the technical depth to use it.",
    },
    {
      id: "workforce-support",
      title: "Workforce support",
      detail:
        "Retraining, transition support and updated curricula, planned before the disruption rather than after it.",
    },
  ],
  benefits: {
    title: "Useful AI keeps moving",
    items: [
      { id: "medicine", label: "Medicine" },
      { id: "clean-energy", label: "Clean energy" },
      { id: "science", label: "Science" },
      { id: "everyday-tools", label: "Everyday tools" },
    ],
    detail:
      "The proposals in this section target frontier capability jumps. Diagnostic models, materials search, tutoring and the assistant in your editor are not what anyone is asking to pause.",
  },
};

// 3D. The off-ramp: the ask is a spectrum, not an off switch.
export const proposalSpectrum = {
  title: "A spectrum of proposals — not an off switch",
  caption: "There are many ways to slow the race, from light-touch measures to stronger interventions.",
  footnote: "A menu of options allows for proportionate, flexible action.",
  steps: [
    {
      id: "transparency",
      label: "Transparency",
      blurb: "Public reporting and disclosure",
      intensity: "Light touch",
      detail:
        "Mandatory disclosure of training compute, evaluation results and incidents. Changes nobody's roadmap, and makes every later measure enforceable.",
      tradeoff: "Cheapest to adopt, and on its own it does not slow anything down.",
    },
    {
      id: "release-gates",
      label: "Release gates",
      blurb: "Safety tests before wider release",
      intensity: "Moderate",
      detail:
        "Defined evaluations that a system has to clear before broad deployment, with results reviewed outside the lab that trained it.",
      tradeoff: "Bites on deployment rather than on training, so the frontier keeps advancing privately.",
    },
    {
      id: "licensing-and-liability",
      label: "Licensing & liability",
      blurb: "Clear rules and accountability",
      intensity: "Structural",
      detail:
        "Licence the largest training runs and make developers liable for foreseeable harms, which prices risk into the decision instead of leaving it with the public.",
      tradeoff: "Real deterrent effect, and a real incumbent-protection risk if the bar is set by paperwork rather than by capability.",
    },
    {
      id: "targeted-pause",
      label: "Targeted pause",
      blurb: "Temporary limits on the most advanced systems",
      intensity: "Strongest",
      detail:
        "A time-boxed halt on training runs above a threshold, scoped to frontier capability jumps and paired with the build-out in element 3C.",
      tradeoff: "The only option that directly buys time, and the only one that needs near-universal participation to hold.",
    },
  ],
  extraAsk: {
    title: "Also on the menu",
    body: "The data note adds appropriate taxation of AI companies or tokens, as a way to fund preparedness from the value being created.",
  },
};
