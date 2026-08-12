# Handover: Onyeka Python Lab

Current state as of the v2 rebuild. Read [README.md](README.md) for how to run and deploy,
and [docs/AUTHORING.md](docs/AUTHORING.md) before touching question content.

## What exists now

A Vite + React 18 app, rebuilt from a single 848-line file into a tested, modular
codebase. **330 questions across all 29 topics**, seven screens, two shipping formats,
116 passing tests.

| | |
|---|---|
| Questions | 330 (184 core Python, 146 ML/AI) |
| Topics | 29, all populated |
| Tests | 116 across 7 files |
| Web build | `dist/` — deploy anywhere static |
| Portable build | `dist-portable/onyeka-python-lab.html`, 369 KB, opens offline by double-click |
| Dependencies | react, react-dom + 4 devDependencies. `npm audit`: 0 vulnerabilities |

**Modes:** topic quiz, Daily Challenge, Boss Battle, Flashcards, Code Ordering, Python
Playground, Stats.

## The architecture rules that matter

**1. Nothing in `src/lib/` imports React or touches `window`.** `storage.js` is the single
guarded exception. This is why scoring, streaks, spaced repetition and routing are all
unit-tested with no DOM and no jsdom dependency. Keep it.

**2. `src/data/questions/index.js` and `src/data/topics.js` are frozen.** All 29 topic
files are already imported by the barrel, so content work only ever edits one array
inside one file. That is what makes it impossible for a content change to break the
build. An empty topic just renders an empty state.

**3. The score is derived, never stored.** `scoreOf(state)` counts correct results.
The old code kept a separate `score` field alongside the answer log, which is exactly how
the two drift apart — that bug class is now structurally impossible.

**4. Question data must be JS imports, never fetched JSON.** The portable build runs from
`file://`, where `fetch` of a local file is blocked. This is the single most load-bearing
constraint in the design.

## Things that will bite you if you don't know them

- **Only the portable file can be double-clicked.** The regular `dist/` build cannot —
  browsers block external module scripts over `file://`. That is the entire reason
  `vite.config.portable.js` exists.
- **Hash routing is mandatory**, not a preference. History-API routing breaks under
  `file://` and needs rewrite rules on static hosts.
- **`localStorage` can throw on ACCESS, not just on write**, under an opaque origin —
  verified: a `data:` URL raises `SecurityError`. Firefox's `privacy.file_unique_origin`
  may do the same for the portable file. Hence the try/catch + in-memory fallback in
  `storage.js`, and the notice the UI shows when `storageAvailable` is false.
- **Pyodide is CDN-only and must never be bundled.** `scripts/rename-portable.mjs` warns
  if the portable file exceeds 2 MB, which is the signal that something like this got
  bundled by accident.
- **The validator checks structure, not truth.** It cannot know whether `answerIndex`
  points at the genuinely correct option. Playing a topic and reading the explanations is
  a required manual step, not a nicety.

## Remaining work

**Content — the main outstanding item.** 330 of a targeted 464 questions. Every topic has
questions and is playable; none has reached its full target yet. `npm run bank:report`
shows exactly which topics are short and what type/tier mix each still needs. Follow
`docs/AUTHORING.md`, work one topic file at a time, and commit per file.

The core/ML split currently sits at 55.8% core against a ~60% target — core topics need
slightly more of the remaining additions than ML topics do.

**Not yet done:**
- `bank.completeness.test.js` — deliberately not added yet. It asserts every topic has hit
  its target, so adding it now would mean a permanently red suite. Add it once content is
  complete.
- Drag-and-drop for code ordering. The ▲/▼ buttons work, are keyboard-accessible and work
  on touch; pointer-drag would be a progressive enhancement on top, never a replacement.
- Verifying `localStorage` on `file://` in **Firefox** specifically. Chrome/Edge are fine.
  The fallback means the app degrades gracefully either way, but the notice wording could
  be tuned once the answer is known.
- The published URL. The GitHub Pages workflow is committed and gated on `npm test`;
  it needs Pages enabling on the repo (Settings → Pages → Source → GitHub Actions).

## Deliberate decisions, so they don't get "fixed"

- **vite 7, not vite 5.** The original plan pinned vite 5; vite 5 carries a high-severity
  advisory, and every plugin's peer range accepts vite 7. `npm audit` is clean at 7.
- **System font stack, no webfonts.** The old app imported Google Fonts inside three
  `<style>` blocks; that import silently fails offline and left the portable build
  rendering in Times New Roman.
- **No TypeScript.** The actual risk here is malformed question *data*, which a runtime
  validator catches and types cannot (bad `answerIndex` values, duplicate ids).
- **No react-router, no CSS framework.** 9 routes and a token-based stylesheet do not
  justify the dependencies.
- **Flashcards have no `explanation` field** — `back` already is the teaching content.
- **`order` items are stored in the CORRECT order** and shuffled at display time. Storing
  a pre-shuffled list plus a key is the classic way this goes wrong.
