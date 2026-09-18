// Element 2B. Potential harms and the response each one suggests. Ordering is a spectrum of
// character, not a probability ranking or a sequence in time.
//
// `explainer` holds Daniel Kokotajlo's account of the same harm, from his 80,000 Hours interview
// about AI 2040 / Plan A. He canvasses five problems in reverse order; all five are here.
// Quotes are verbatim from the published transcript — see the `kokotajlo`
// entry in the source registry. `response` stays sourced to the registry ids it always was:
// Kokotajlo is one voice on the harm, not the authority behind every suggested response.

export const riskLandscape = [
  {
    title: "Jobs & information",
    subtitle: "Disruption does not wait for superintelligence.",
    icon: "briefcase",
    tone: "jobs",
    year: 2023,
    summary: "Labor disruption, scams, misinformation",
    body: "AI can change the economics of tasks, the skills employers need and the cost of producing persuasive content. The concern is both livelihood disruption and a harder-to-trust information environment.",
    response: "A useful response: support transitions, measure real impacts and strengthen authentication.",
    source: "survey",
    explainer: {
      label: "Problem four of five",
      lede: "Kokotajlo puts jobs fourth on his list of five. His worry is not only lost income but lost leverage.",
      quotes: [
        "If you do end up in a situation where someone has built superintelligence, then all of the jobs, or approximately all the jobs are at risk. I don’t want to say literally all because there are many jobs that intrinsically involve the human touch — like people just value the handcrafted object instead of the factory-produced object, for example.",
        "But I do think it’s approximately all of them. And I think that’s a big problem because people are going to lose their livelihoods and people are going to lose their source of economic power and their political power to some extent."
      ]
    }
  },
  {
    title: "More powerful misuse",
    subtitle: "More capability can also empower bad actors.",
    icon: "shield-alert",
    tone: "misuse",
    year: 2024,
    summary: "Cyberattacks and biological misuse",
    body: "The same capabilities that help legitimate users can lower barriers to cyber abuse and other serious misuse. How much the risk rises depends on the task, access controls and defensive progress.",
    response: "A useful response: independent capability testing, stronger security and incident reporting.",
    source: "amodei",
    explainer: {
      label: "Problem five of five",
      lede: "This is the one Kokotajlo worries about least — with a specific exception he does not wave away.",
      quotes: [
        "Number five is misuse by weak actors: terrorists, small rogue states, criminals. We’re already seeing today that they can get up to shenanigans with powerful cyber models and things like that. I think that broadly speaking, I’m mostly not so worried about this because I think that the good guys with AIs can potentially beat the bad guys with AIs — if the good guys are better funded and have better AIs. However, there are some possible exceptions.",
        "For example, making bioweapons seems to be the sort of thing where the offence-defence balance might favour offence and it might be that even though the good guys have even better AIs and much more of them and much more money and funding to make biovaccines and so forth, there’s just this fundamental asymmetry where all it takes is one terrorist to make a really good pathogen and then it’s really hard or even impossible to deal with."
      ]
    }
  },
  {
    title: "A first-mover still facing nukes",
    subtitle: "Superintelligence in one country does not retire everyone else’s weapons.",
    icon: "target",
    tone: "war",
    year: 2027,
    summary: "If the US gets there first, others still have nuclear arsenals",
    body: "A US lead in superintelligence would not leave other nuclear powers unarmed. The fear that the leader could invent a counter to deterrence — or economically hollow out everyone else — is the kind of shock that has preceded wars before. Timing and likelihood remain uncertain; the mechanism is a broken balance of power, not a timetable.",
    response: "A useful response: shared verification, slowing the race that creates the trap, and treating great-power fear as a first-class risk.",
    source: "kokotajlo",
    explainer: {
      label: "Problem three of five",
      lede: "Kokotajlo’s third problem is World War III: not because the US is uniquely villainous, but because a sudden, one-sided leap at superintelligence can panic states that still hold nuclear weapons.",
      quotes: [
        "Number three is World War III. Right now all the world’s leading AI companies and most of the world’s compute is in the United States, and right now the United States has the world’s best military. But I wouldn’t say that most of the world is fearing that they’re going to be conquered by the United States. And most of the world isn’t fearing that they’re going to be completely economically disempowered by the United States either.",
        "One way of putting it would be: if a handful of companies are going to be taking all the jobs, it’s one thing to be a US citizen where you can hope for a UBI or something like that. But what if you’re Russia, and now all your jobs have gone to US companies, and you’re Putin and you’re sitting on your pile of nuclear weapons and you’re getting worried that maybe the AIs will invent some counter to your nuclear weapons any month now. That’s the sort of scary situation that I think we’re headed towards. That’s why I say World War III.",
        "It’s a sort of Thucydides trap situation, where right now there’s a balance of power between all these different nations, economically and militarily. But that balance is going to be absolutely upset and it’s going to swing wildly towards the nations that have superintelligence. It probably will just be just one nation at first. And that’s going to create this mounting sense of crisis and fear in many countries. Then that could lead to escalation and could lead to war."
      ]
    }
  },
  {
    title: "Concentrated power",
    subtitle: "Who gets a say in the systems that shape our lives?",
    icon: "network",
    tone: "power",
    year: 2030,
    summary: "Fewer people controlling essential systems",
    body: "Control over models, compute and deployment can translate into influence over information and opportunity. But centralizing the authority to regulate AI can create its own concentration risks.",
    response: "A useful response: accountable oversight, contestability and meaningful public participation.",
    source: "zuckerberg",
    explainer: {
      label: "Problem two of five",
      lede: "Kokotajlo's concern is that every path he can see leads here, whoever ends up holding the controls.",
      quotes: [
        "Then number two would be concentration of power. There’s this question of who controls the AIs, who gets to give orders to the giant army of superintelligences, who gets to choose the values that they have and are trained to have, and what sort of tasks they’ll refuse to do for ordinary users, and what sort of tasks they’ll do, and that sort of thing.",
        "But the thing that concerns me is that, either way, it seems like we’re headed towards an extreme concentration of power. If we’re in a situation where there’s 1–3 companies that have the superintelligences and they’re in the process of taking all the jobs, it’s terrifying that such a tiny group of people can have such a huge amount of power — where they get to choose behind closed doors the values of these AI systems, and give high-level commands to this giant workforce about what to do next.",
        "I do think that, in this sort of situation after superintelligence, you will soon end up in a situation where the AIs really could just win a war domestically if they wanted to, like a civil war or a coup. Once there’s actually a robot army and there’s superintelligences commanding the army, then the actual hard power is no longer with the uniformed police and armed services."
      ]
    }
  },
  {
    title: "Loss of human control",
    subtitle: "A system can pursue a goal we did not intend.",
    icon: "compass",
    tone: "control",
    year: 2040,
    summary: "Systems acting against human interests",
    body: "A more capable agent might take unintended actions or defeat safeguards in pursuit of an objective. Extreme scenarios include permanent human disempowerment; the likelihood and timing remain disputed.",
    response: "A useful response: alignment research, realistic evaluations and layered containment.",
    source: "hassabis",
    explainer: {
      label: "Problem one of five",
      lede: "The one he calls the elephant in the room. His answer to “can anyone control the AIs?” is not reassuring.",
      quotes: [
        "Yeah. Then there’s this question, there’s the elephant in the room that I’ve been alluding to, which is: can anyone control the AIs? Right now the answer is not really. I think that answer, unfortunately, will still be true. In fact, it’ll probably be even more true if we continue the race at maximum speed. I think that insofar as we can control the AIs now, it’s because we’ve had some time working with them and they’re not that smart.",
        "But when they are all smarter than us and they’re doing very complicated research projects that we don’t really understand, and we’re relying on them to summarise it for us and explain what they’re doing… In that sort of situation, I think, yeah, we’re not going to be controlling these AIs. They will be in charge and they will have values and goals and so forth that are different from the values and goals that they were supposed to have."
      ]
    }
  }
];
