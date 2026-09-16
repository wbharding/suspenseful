# Image substitution list

Every illustration on the page is a slot in `src/data/placeholder-image-manifest.js`. That file
is the source of truth; this document is the readable version of it, plus the reasoning behind
what could and could not be salvaged from the draft.

To swap a panel, drop the new file into `public/images/placeholders/` (or anywhere under
`public/`) and point the manifest entry's `file` at it. No component changes.

## What the draft image could and could not give us

The draft infographic is 682 × 1024. At that size the individual panels are between 30 and 250
pixels wide, so `script/slice-prototype-image.sh` cuts out the 22 panels that survive being
upscaled 3× and used small, and the remaining 12 slots get an empty labelled frame on the page.

Two things disqualified a panel from being sliced:

1. **Too small to upscale.** The four "Understanding takes work" tiles and the four harm-ladder
   rung illustrations are roughly 46 × 30 in the source. Those eight slots are drawn as inline
   SVG glyphs (`src/components/icon-glyph.jsx`) so they stay sharp until real art arrives.
2. **Text baked into the artwork.** The masthead and closing panoramas have the headline
   painted into them. Since the page needs that copy as selectable, translatable, responsive
   text, both bands use a CSS sky gradient and the panoramas stay on this list.

Several panels that *were* sliced have the same baked-text problem in a milder form — the race
lanes, the shared checkpoint and the pause-to-build arch all carry their labels in the pixels
while the page also renders them as buttons. Their replacements should ship without text.

While the draft crops are in place, the "Art queue" panel at the bottom of the page lists all
34 slots and toggles a **Draft art** corner tag on the wide panels.

## Slots with no usable source (12)

| Slot id | Subject | Target |
| --- | --- | --- |
| `masthead-landscape` | Mountain-highway panorama at sunrise, behind the poster title. Deliver clean; the page renders all masthead type. | 2400 × 300 |
| `closing-road` | Lake-and-mountains panorama with a road leading in. Deliver without the closing line or the People / Progress / Tomorrow signpost. | 2400 × 300 |
| `future-ahead-sign` | Blank roadside milestone marker; the page renders the wording. | 480 × 640 |
| `safety-evaluation` | Researchers running a capability evaluation against a checklist. | 640 × 480 |
| `safety-reasoning-checks` | An engineer tracing a model's chain of reasoning for a flaw. | 640 × 480 |
| `safety-interpretability` | Looking inside a model's internals, as through a cutaway. Avoid brain metaphors. | 640 × 480 |
| `safety-independent-oversight` | An external reviewer signing off on a lab's work; should read as outside review, not internal QA. | 640 × 480 |
| `harm-jobs-and-information` | A worker whose task list is being rewritten around them. Adapting, not disappearing. | 600 × 400 |
| `harm-powerful-misuse` | An automated attack in progress; cover biological uplift as well as cyber. | 600 × 400 |
| `harm-concentrated-power` | A skyline where a few towers hold the controls. | 600 × 400 |
| `harm-loss-of-control` | Hands losing hold of a globe that keeps moving. | 600 × 400 |
| `moving-walkway` | Workers and educators alongside a fast walkway of changing job descriptions. Asked for by the data note, absent from the draft. | 1280 × 720 |

The four `safety-*` slots should read as a set, and so should the four `harm-*` slots.

## Draft crops queued for replacement (22)

Highest value first.

### Portraits — 40 px square in the source, the weakest crops on the page

`portrait-altman`, `portrait-amodei`, `portrait-pichai`, `portrait-zuckerberg`,
`portrait-hassabis`, `portrait-musk`. Each needs a licensed photograph or a commissioned
portrait at 320 × 320. Record the credit line with the file.

### Scene panels — usable, but the labels are painted in

| Slot id | Subject | Target | Note |
| --- | --- | --- | --- |
| `race-lanes` | Four cars in adjacent lanes | 1020 × 840 | Deliver the empty lanes; the page renders and animates the labels and speech bubbles. |
| `shared-checkpoint` | Four lanes funnelling through one inspection gate | 1140 × 720 | Deliver the gate without "Shared checkpoint" or the three condition labels. |
| `pause-to-build` | People building safety capacity under an arch | 1260 × 630 | Deliver the scene without the arch banner or the four pillar labels. |
| `frontier-model-stack` | A model box copying itself onto many laptops | 760 × 650 | Drop the "AI Model" label. |
| `undo-recall` | An undo button crossed out | 660 × 450 | Drop the "Undo (recall)" label. |
| `popcorn-pop` | A popcorn tub mid-pop | 520 × 470 | Pairs with the audio track below. |

### Archive photographs — swap for properly licensed originals

| Slot id | Subject | Note |
| --- | --- | --- |
| `precedent-test-ban-treaty` | 1963 Limited Test Ban Treaty | Public-domain archive photography should be available. |
| `precedent-asilomar` | 1975 Asilomar recombinant DNA conference | Needs a licensed archive photograph. |
| `precedent-montreal-protocol` | Ozone layer, for the 1987 Montreal Protocol | NASA ozone imagery is public domain and a straight upgrade. |

### Action icons — fine as-is, redraw only if the icon set gets unified

`action-fund-research`, `action-meet-representatives`, `action-support-coordination`,
`action-early-warning`, `action-industry-levies`, `action-track-forecasts`,
`action-help-communities`. All 384 × 296.

`action-meet-representatives` is a US Capitol dome; consider a neutral civic building for
non-US readers.

## Non-image media the data note asks for

Not tracked in the manifest, since it is not an image slot.

- **Release-cadence audio for element 1C.** Popcorn in a microwave, one pop per model release,
  so the accelerating cadence is audible. The data note also asks for a classic-rock guitar
  solo over the single month that had no releases. The element already renders the visual
  handle and the caption; it needs the audio file and a play control.
