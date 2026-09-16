#!/usr/bin/env bash
#
# Slices the 682x1024 draft infographic into the individual illustration panels used as
# temporary placeholders in public/images/placeholders. Crops are upscaled 3x so browsers
# do not have to resample them; they are still soft, and doc/image-substitution-list.md
# tracks what replaces each one.
#
# Usage: script/slice-prototype-image.sh path/to/draft-infographic.jpg

set -euo pipefail

SOURCE_IMAGE="${1:-}"
OUTPUT_DIR="$(cd "$(dirname "$0")/.." && pwd)/public/images/placeholders"

if [[ -z "$SOURCE_IMAGE" || ! -f "$SOURCE_IMAGE" ]]; then
  echo "Pass the path to the draft infographic jpg." >&2
  exit 1
fi

mkdir -p "$OUTPUT_DIR"

# name geometry (WxH+X+Y against the 682x1024 draft)
PANELS=(
  "frontier-model-stack 96x82+504+134"
  "undo-recall 82x56+504+217"
  "popcorn-pop 64x58+466+198"
  "race-lanes 170x140+20+388"
  "portrait-altman 40x42+345+349"
  "portrait-amodei 40x42+390+349"
  "portrait-pichai 40x42+442+349"
  "portrait-zuckerberg 40x42+345+418"
  "portrait-hassabis 40x42+390+418"
  "portrait-musk 40x42+442+418"
  "precedent-test-ban-treaty 50x48+31+603"
  "precedent-asilomar 50x48+84+603"
  "precedent-montreal-protocol 50x48+137+603"
  "shared-checkpoint 152x96+224+611"
  "pause-to-build 252x126+389+604"
  "action-fund-research 48x37+32+847"
  "action-meet-representatives 48x37+141+847"
  "action-support-coordination 48x37+246+847"
  "action-early-warning 48x37+340+847"
  "action-industry-levies 48x37+431+847"
  "action-track-forecasts 48x37+515+847"
  "action-help-communities 48x37+607+847"
)

for panel in "${PANELS[@]}"; do
  read -r name geometry <<<"$panel"
  magick "$SOURCE_IMAGE" \
    -crop "$geometry" +repage \
    -filter Lanczos -resize 300% \
    -unsharp 0x0.7+0.6+0.02 \
    -quality 88 \
    "$OUTPUT_DIR/$name.jpg"
  echo "wrote $name.jpg ($geometry)"
done
