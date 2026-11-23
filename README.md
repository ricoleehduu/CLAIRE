# CLAIRE

[Interactive project website](https://ricoleehduu.github.io/CLAIRE/)

A static research showcase for anatomy-aware dental CBCT evaluation.

- Same-slice before/after slider with three simulated metal configurations and two restoration methods.
- Interactive observe → lock → consult → audit walkthrough.
- Reused Evidence Lab with bilingual UI and browser-local annotation records.

## Run locally

```sh
python -m http.server 8772
```

No build dependencies. GitHub Pages publishes the `main` branch root.

## Content and scope

The displayed slices derive from the public ToothFairy3 corpus. Simulated metal inputs and AMIFound/HorusEye outputs share the same slice geometry and fixed stored-intensity display window (−1024 to 3072); this is not a claim of calibrated HU. Asset provenance is in `assets/examples.json`.

Reference cards in the walkthrough and static Evidence Lab are explicitly synthetic teaching examples, not expert ground truth or live retrieval. The website does not run restoration models. Visitor annotations remain in the browser; exported JSON is not expert validation. Research demonstration only, not a diagnostic device.

The website reports coverage separately from agreement and BF1 deterioration separately from joint SSIM–BF1 conflicts. Clinical hospital images, patient records, credentials, and manuscript PDFs are not part of this repository.

## 3D reference anatomy gallery

Twelve publicly released ToothFairy3 reference segmentation volumes are shown as colored GLB surfaces with animated WebP previews. The three groups are acquisition subsets A/B/C, not the eight CLAIRE-Bench centers. These are derived annotation surfaces, not CLAIRE predictions. Interactive controls include orbit, zoom, pan, fixed views, layer visibility, jaw opacity, and GLB download. The original comparison slider and audit walkthrough remain available.

The first four filename-sorted public training cases in each subset are used. Surface construction: 2-voxel sampling, Gaussian sigma 0.55 sampled voxels, marching cubes at level 0.5 (step 2 for jaws/other anatomy); coordinates converted from canonical RAS to Y-up and centered. These display surfaces are not for quantitative measurement. See [full attribution](anatomy/ATTRIBUTION.txt) and [case manifest](anatomy/cases.json). Derived meshes and previews are distributed under CC BY-NC-SA 4.0 following the source challenge license. Three.js 0.170.0 is vendored under the MIT license in vendor/THREE-LICENSE.txt.

Hugging Face and ModelScope badges are intentionally marked Coming soon and have no repository links yet. The ModelScope icon comes from its official website favicon; the Hugging Face badge uses the hugging-face emoji. These badges do not assert availability of a released model or dataset.
