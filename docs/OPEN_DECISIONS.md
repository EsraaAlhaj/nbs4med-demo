# Open decisions

Decisions and unverified points that the repository cannot settle by itself. They need an answer from the project team or the repository owner. Nothing here has been decided or assumed.

## 1. Licence
- No `LICENSE` file exists. Which licence applies to the code, to the documentation and to the data files is **undecided**; it must be chosen by the University of Jordan and the project, taking account of the funder's requirements. No licence has been added.
- **Third-party material to clear:** the composite Interreg NEXT MED / European Union / NBS4MED logo (`assets/`; see [`BRANDING_ASSETS.md`](BRANDING_ASSETS.md)), and the values quoted from published sources in `data/evidence.json` (see [`../data/README.md`](../data/README.md)).

## 2. Data provenance
- The spreadsheet named in `data/evidence.json` (`NBS4MED_Starter_Database (2).xlsx`) is not in the repository. Its location, owner and relationship to the JSON are unconfirmed.
- Permission to reproduce and attribute the third-party values, and a check of the values against the original publications, are not documented.
- The 43 demonstration parameters have no source (they are demonstration assumptions); `partner_validated` is empty for all of them.

## 3. Branches and publication (no branch was changed by the reorganisation)
- **Default branch:** `publication-snapshot` (unrelated history, created to publish a snapshot). **`main`** has the full history. The Pages workflow runs for `main`; the Pages source setting itself could not be inspected from the tools used, so this is unconfirmed.
- Because the two branches have unrelated histories, a change merged into `main` has to be published to the default branch as a separate commit with the same file tree. The procedure and who performs it are not yet written down.
- **Unmerged branch `demo/verification`** (one commit, 2026-10-18) holds material that exists nowhere else: `demo-verification/` (27 files: scenario screenshots, PDFs, CSVs and `verify_results.json`), `VIDEO_RECORDING_PLAN.md` and `qa-tests/verify.js`; it also carries older versions of `README.md` and `DEMO_VIDEO_PACKAGE.md`. It was left untouched. Its file paths use the layout from before the reorganisation (`qa-tests/` is now `tests/browser/`, `DEMO_VIDEO_PACKAGE.md` is now `docs/DEMO_VIDEO_PACKAGE.md`), so it cannot be merged as is; decide whether to port its unique files into `docs/` and `tests/`.
- **Superseded, unmerged:** `branding/logo-placement` (two commits, replaced by the restored header logo) and `docs/readme-technical-documentation` (an earlier version of the documentation).
- Ten merged branches (`backup/*`, `claude/*`, `enhancement/*`, `qa/*`, `recovery/*`, `redesign/*`, `revision/*`, `branding/landing-page`, `branding/restore-header-logo`, `docs/readme-technical-documentation-clean`) were kept. Whether to convert them into tags and delete them is undecided.
- **Release or version tag:** none exists and none was created. The application has no version number; the evidence file is "v2 (2026-10-11)" and the parameters are "demo-0.1".

## 3b. GitHub Pages
The reorganisation keeps `index.html` at the root and uses relative paths (`js/`, `data/`, `assets/`), so a deployment from the repository root is unaffected. Pages also publishes everything else in the branch, including about 74 MB of historical screenshots in `docs/qa/evidence/`. Whether to keep serving them, or to archive them elsewhere, is undecided. Nothing was deleted or archived.

## 4. Documentation and methodology
- The discrepancies listed in `TECHNICAL_DOCUMENTATION.md`, section 12 (rule status wording, the use of the G01 range, rounding before thresholds, tie order, unused values) and the limits of the green-roof retention calculation are documented, not resolved. They need decisions by the methodology owners.
- The approval process for methodology changes (who decides, how it is recorded) is not defined (see [`../CONTRIBUTING.md`](../CONTRIBUTING.md)).
- The word PROMEA is used both for a framework and, in the footer, as a partner name; the intended meaning should be confirmed.
- The old README said the flat layout existed so that files could be uploaded through the GitHub web page. Whether that still matters is unconfirmed.

## 5. Tests
- The committed browser tests had fallen behind the current interface (details in [`../tests/README.md`](../tests/README.md)). They were updated to the current selectors without changing what they check about the assessment logic. A few checks compare with older builds and are skipped unless those builds are supplied.
- There is no continuous integration; `npm test` is run by hand.
