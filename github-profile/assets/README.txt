Save your character image here as:  character.png
(PNG or JPG both work — just name it character.png / .jpg)

Then, from the github-profile folder, run:
    node scripts/prepare-avatar.mjs

This removes the white background (border flood-fill, so your white
hoodie and shoes are preserved) and embeds the cutout as base64 PNG
into banner.svg, banner-light.svg and lanyard.svg.

Tune background removal strength if needed:
    node scripts/prepare-avatar.mjs --tol 24     (removes more off-white)
    node scripts/prepare-avatar.mjs --tol 10     (removes less / stricter)

A transparent copy is also written to assets/character-nobg.png.
