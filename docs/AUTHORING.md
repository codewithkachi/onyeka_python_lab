# Writing questions for Onyeka Python Lab

Read this before editing any file in `src/data/questions/`.

## The one rule that matters

**You only ever edit the array inside a single topic file.**

Never touch `src/data/questions/index.js` (the barrel) or `src/data/topics.js`. They are
frozen. Because every topic file is already imported by the barrel, an empty or
half-finished topic simply shows a "Coming soon" card — **no content edit can break the
build**. That property is the whole reason the data layer is shaped this way. Keep it.

## Workflow for one topic

1. **Check for overlap first.** Before writing, search the existing bank for the
   concepts you are about to cover:

   ```bash
   npm run bank:report -- --grep "list comprehension"
   ```

   This is what stops "what does `len()` return?" appearing in four topics.

2. Open `src/data/questions/<topic-id>.js`. The header comment states that topic's
   exact target, tier split, and type mix.

3. Write the questions into the `questions` array.

4. **Verify — all four are required:**

   ```bash
   npm test
   ```
   ```bash
   npm run bank:report
   ```

   - `npm test` must be green (zero validator errors, zero duplicate ids or prompts).
   - `bank:report` must show that topic at **exactly** its target with status `OK`.
   - **Play the topic in the browser and read every explanation.** The validator
     checks structure; only a human read checks that `answerIndex` points at the
     *genuinely* correct option. This step is not optional — a structurally perfect
     question with the wrong answer marked is worse than no question at all.
   - No new near-duplicate warnings.

5. Commit that one topic file.

## The per-topic recipe

For a topic with target **N**:

- **2** `flashcard`
- **1** `order`
- **N − 3** graded questions, split:
  - easy = `round(0.40 × (N−3))`
  - intermediate = `round(0.35 × (N−3))`
  - hard = the remainder
- Within the graded set: **at least 2 `output`**, **at least 1 `bug`**, **at least 1
  `multi`**, the rest `mcq`.

Each topic file's header comment already has these numbers worked out. Follow them
rather than recomputing.

## Ids

`<topicId>-<e|i|h>-<3 digits>`, numbered from `001` within each tier.

```
numpy-e-001, numpy-e-002, ... numpy-i-001, ... numpy-h-001, ...
```

Flashcards and order puzzles use whichever tier they belong to.

**The id prefix must match the `topic` field.** The validator enforces this because
copying a topic file and forgetting to renumber is the single most common bulk-authoring
mistake.

## Schema

```js
{
  id: 'numpy-e-003',
  topic: 'numpy',              // must exist in topics.js AND match the id prefix
  tier: 'easy',                // 'easy' | 'intermediate' | 'hard'
  type: 'mcq',                 // see the table below
  prompt: '...',               // 10-400 chars
  code: String.raw`...`,       // optional on mcq/multi; REQUIRED on output/bug
  explanation: '...',          // 20-600 chars; omit on flashcards (see below)
  tags: ['arrays'],            // optional
  // plus exactly ONE answer shape, chosen by type
}
```

| `type` | Answer fields | Rules |
|---|---|---|
| `mcq` | `options`, `answerIndex` | 2–6 options, non-empty, all distinct. **True/False is just an `mcq` with `options: ['True', 'False']`** — there is no separate type. |
| `multi` | `options`, `answerIndices` | 4–6 options; indices ascending, unique, at least 2 but never all of them. |
| `output` | `code`, `options`, `answerIndex` | Guess-the-Output. The UI shows the code and asks what it prints. |
| `bug` | `code`, `options`, `answerIndex` | Find-the-Bug. Options describe the defect or the fix. |
| `order` | `items` | 3–7 lines **stored in the CORRECT order**. The app shuffles them for display and compares against this order. Never store a pre-shuffled list. |
| `flashcard` | `back` | `prompt` is the front, `back` is the answer (3–400 chars). **Omit `explanation`** — `back` already is the teaching content. Never appears in graded quizzes. |

A question must define **only** its own type's answer fields. An `mcq` that also has
`items` is a validation error, because it means a half-converted copy-paste.

## Always use `String.raw` for code

```js
code: String.raw`
print("a\nb")
`,
```

A plain template literal turns `\n` into a real newline and silently corrupts the
question. `String.raw` keeps the backslash literal. Apply this uniformly so it is never
a judgement call.

(A `String.raw` literal cannot contain a backtick or end with a backslash. Neither
occurs in idiomatic Python.)

## Quality bar

- **Test understanding, not trivia.** "What does this code print, and why" beats "which
  year was this method added".
- **The explanation teaches.** It is shown after every answer, right or wrong. Say *why*
  the right answer is right — and where it is a common trap, say why the tempting wrong
  answer is wrong.
- **Distractors must be plausible.** An option nobody would pick is a wasted slot. Good
  distractors are the answer to a subtly different question.
- **Be accurate about modern Python** (3.10+). If behaviour changed across versions, say
  which version you mean.
- **No "All of the above".** It collapses to a guessing game, and it is banned outright
  on `multi`.
- **Keep code snippets short** — under about 12 lines. The question should be readable on
  a phone.
- For ML/AI topics, prefer questions about **what the library actually does** (shapes,
  dtypes, mutation, broadcasting, leakage, metric choice) over API-name recall.

## Common mistakes the validator will catch

| Message | What you did |
|---|---|
| `id must start with "<topic>-"` | Copied another topic's file and did not renumber. |
| `must not define "items"` | Half-converted an `order` into an `mcq`. |
| `answerIndex N is out of range` | Removed an option without fixing the index. |
| `option N duplicates an earlier option` | Two options say the same thing — the question is unanswerable. |
| `explanation must be 20-600 chars` | Truncated or runaway generation. |
| `duplicate question - same prompt and code` | This question already exists elsewhere. |
