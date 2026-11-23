# CLAIRE

[Interactive project website](https://ricoleehduu.github.io/CLAIRE/)

A static research showcase for anatomy-aware dental CBCT evaluation.

- Same-slice before/after slider with three simulated metal configurations and two restoration methods.
- Publication Evidence Lab on real public CBCT slices: 18 ToothFairy3 cases plus six clean/degraded metal pairs, with explicit "no expert labels" state.
- Interactive observe → lock → consult → audit walkthrough.
- Bilingual UI with browser-local annotation records.

## Run locally

```sh
python -m http.server 8772
```

No build dependencies. GitHub Pages publishes the `main` branch root.

## Content and scope

The displayed slices derive from the public ToothFairy3 corpus. Simulated metal inputs and AMIFound/HorusEye outputs share the same slice geometry and fixed stored-intensity display window (−1024 to 3072); this is not a claim of calibrated HU. Asset provenance is in `assets/examples.json`.

Reference cards in the walkthrough are explicitly synthetic teaching examples, not expert ground truth or live retrieval. The Evidence Lab's 18 library cards and six metal cards are real public ToothFairy3 slices rendered by `tools/build_lab_media.py` (see [lab/ATTRIBUTION.txt](lab/ATTRIBUTION.txt)); each library card is labelled "public reference · real slice" and carries no expert item labels. The website does not run restoration models. Visitor annotations remain in the browser; exported JSON is not expert validation. Research demonstration only, not a diagnostic device.

The website reports coverage separately from agreement and BF1 deterioration separately from joint SSIM–BF1 conflicts. Clinical hospital images, patient records, credentials, and manuscript PDFs are not part of this repository: the Evidence Lab ships only ToothFairy3 public-source slices, and the 430-entry clinical expert library stays local-only.

## 3D reference anatomy gallery

Four ToothFairy3 cases (F_001–F_004), four STS24 cases (0001–0004), and four STS25 / STSR 2025 Task 1 cases (0011–0014) are available as interactive GLB models and animated WebP previews. ToothFairy3 includes individual teeth, pulp, jaws, nerve canals, maxillary sinuses, and pharyngeal airway. STS24 uses FDI tooth instances; STS25 uses tooth and pulp/root-canal classes. Different datasets use different annotation granularity; STS24/25 share source cohorts.

Upper/lower orientation is verified with FDI tooth labels. Selected ToothFairy3 files require a 180-degree rigid X rotation to correct superior/inferior anatomy relative to their header; STS24/25 vertical orientation is retained. The same corrected meshes generate the previews. STS25 orientation is checked against corresponding FDI reference masks. Controls include rotation, zoom, pan, standard views, structure visibility, jaw/tooth transparency, and download.

See [case manifest](anatomy-v2/cases.json) and [source attribution and processing](anatomy-v2/ATTRIBUTION.txt). ToothFairy3 derivatives use CC BY-NC-SA 4.0; STS24/25 retain their source dataset terms. These visualization surfaces are not original voxel annotations or quantitative measurement tools. No private clinical image volumes are published. Three.js 0.170.0 is vendored under MIT (vendor/THREE-LICENSE.txt).

Hugging Face and ModelScope badges remain Coming soon, with no repository links. ModelScope's icon comes from its official website favicon.
