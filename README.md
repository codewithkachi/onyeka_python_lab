# Onyeka Python Lab

A Python learning app covering core Python and Python for machine learning and AI —
tiered quizzes, guess-the-output and find-the-bug questions, flashcards, code-ordering
puzzles, a timed boss battle, a daily challenge, and a live in-browser Python playground.

Ships in **two formats**: a normal website you can host at a public URL, and a **single
portable HTML file** you can email or copy onto a USB stick that runs offline by
double-clicking.

---

## Run it locally

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:5173.

## Everyday commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload |
| `npm test` | Run the test suite once |
| `npm run test:watch` | Tests in watch mode |
| `npm run bank:report` | Per-topic question counts, type/tier mix, duplicate warnings |
| `npm run build` | Website build → `dist/` |
| `npm run build:portable` | Single-file build → `dist-portable/onyeka-python-lab.html` |
| `npm run build:all` | Both builds |
| `npm run preview` | Serve the `dist/` build locally |

On Windows PowerShell, `&&` does not chain commands — run each on its own line, or use
`npm run build:all`, which chains internally.

---

## Sharing it

### As a website (public URL)

```bash
npm run build
```

`dist/` is a plain static folder. Any of these work with no extra configuration, because
the app uses **relative asset paths and hash routing** — so there are no server rewrite
rules to set up anywhere:

- **GitHub Pages** — push to `main`; `.github/workflows/deploy.yml` builds, runs the
  tests, and publishes automatically. Enable Pages → Source → GitHub Actions once.
- **Netlify** — drag the `dist/` folder onto netlify.com, or connect the repo
  (`netlify.toml` is already configured).
- **Vercel** — `vercel --prod`.

### As a folder or a file (offline)

```bash
npm run build:portable
```

This produces **one** file: `dist-portable/onyeka-python-lab.html`. Everything — the app,
all questions, all styling — is inlined. Email it, put it on a USB stick, drop it in a
shared folder. The recipient double-clicks it. No npm, no install, no internet.

> **Tell recipients to save the file to their Desktop before opening it.** An attachment
> opened straight from Outlook lands in a read-only temp folder, which can stop progress
> from saving.

Two things to know about the portable file:

- **Only the portable file can be double-clicked.** The regular `dist/` build cannot —
  browsers block external module scripts loaded over `file://`. That is exactly why the
  single-file build exists.
- **The Python Playground needs internet**, because it downloads the Pyodide runtime
  (~10 MB) on demand. Everything else in the file works fully offline. The playground
  says so plainly rather than just failing.

---

## How it is put together

```
src/
  lib/        pure logic - no React, no browser APIs (storage.js is the one exception)
  hooks/      the React wiring for that logic
  data/       topics.js + one question file per topic + a frozen barrel
  components/ shared presentational pieces
  modes/      one folder per screen
  styles/     design tokens, base, layout, components
  tests/      vitest suites over the pure logic and the question bank
scripts/      portable-build rename, question-bank report
docs/         AUTHORING.md - the contract for writing questions
```

The rule that keeps this maintainable: **nothing in `src/lib/` imports React or touches
`window`.** That is why the scoring rules, the streak maths and the routing can all be
tested without a DOM, and why the UI components stay thin.

Progress is saved to `localStorage` under `opl.v1.*` keys. If a browser blocks storage —
some do over `file://` — the app falls back to in-memory state for the session and shows
a quiet notice instead of breaking.

## Adding questions

Read **[docs/AUTHORING.md](docs/AUTHORING.md)** first. In short: edit the array inside
one file in `src/data/questions/`, never the barrel or `topics.js`, then run:

```bash
npm test
```

```bash
npm run bank:report
```

The validator catches malformed questions — wrong answer indices, duplicated options,
ids that disagree with their topic, duplicate questions — before they can reach anyone.
It cannot check whether an answer is actually *true*, so play the topic in the browser
and read the explanations before committing.
