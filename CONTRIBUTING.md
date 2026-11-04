# Contributing

This is a research prototype (NBS4MED Self-Evaluation Tool). Contributions are welcome from project partners, supervisors and researchers. Please read [`README.md`](README.md) and [`TECHNICAL_DOCUMENTATION.md`](TECHNICAL_DOCUMENTATION.md) first; the layout of the repository is described in the README.

## Working on the code

- There is no build step. Open `index.html` in a browser, or run `python3 -m http.server 8765` in the repository root.
- Application code is in `js/`, data in `data/`. Keep the page working when opened from disk (`file://`): load data as scripts, not with `fetch`.
- `index.html` must stay at the repository root (the public demo is served from there).
- Keep changes small and focused. A change that moves files should not also change behaviour, and vice versa.

## Changing data

1. Edit the **`.json`** file in `data/` (it is the source of truth), never the `.js` copy.
2. Run `node tools/sync-data.js` to regenerate the copy, then `npm test`.
3. If a value that `docs/CALCULATIONS.md` quotes changes, update that file in the same pull request. The tests compare its parameter table with the JSON.
4. Do not mark a parameter or evidence record as validated or approved unless the project has documented that approval. See [`data/README.md`](data/README.md).

## Tests

```bash
npm test                 # engine, documented calculation examples, data copies, links (no browser, no dependencies)
npm install              # only for the browser tests
npm run test:browser     # needs Playwright and Chromium; see tests/README.md
```

Run `npm test` before every pull request. Run the browser tests when you change `index.html`, `js/app.js`, `js/explore.js` or `js/guidance.js`. Say in the pull request which tests you ran; do not report a test as passed unless you ran it.

## Pull requests

- Branch from `main`, use a descriptive branch name, and open a pull request into `main`. Describe what changed, why, and how you tested it.
- Where possible, ask a project colleague to review the change before it is merged. Do not force-push shared branches.
- Documentation changes that describe the implementation must be checked against the code (give file and line references, as the technical documentation does).

## Methodology changes need approval

The following are **methodology**, not ordinary code changes: the questions, rubrics and scores of the 14 indicators; the thresholds (30 / 55 / 80%); the combined score; the option match weights and land and density adjustments; the applicability rules; every formula and demonstration parameter; and anything that changes what a result means.

They are provisional and have not been validated or approved by the project partners. A pull request that changes them must:

1. say so explicitly and explain the scientific reasoning and the source;
2. record who in the project has agreed (link to the minutes, e-mail or decision record) **(the approval process itself is still to be defined by the project team; see [`docs/OPEN_DECISIONS.md`](docs/OPEN_DECISIONS.md))**;
3. update `TECHNICAL_DOCUMENTATION.md`, `docs/CALCULATIONS.md` and the tests in the same pull request.

Never present a result of this tool as validated or officially approved unless that status is documented.

## Licence and third-party material

No licence has been chosen yet (see [`docs/OPEN_DECISIONS.md`](docs/OPEN_DECISIONS.md)). Until it is, please do not copy this repository's content elsewhere as if it were openly licensed. Do not add third-party text, data or images without confirming that the project may reuse them and how to credit them.
