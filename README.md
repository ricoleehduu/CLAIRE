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
