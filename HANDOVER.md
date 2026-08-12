# Handover: Python Mastery Quiz App

## Upgrade scope (confirmed with the user — start here)
The user has confirmed they want work on these four areas, in no particular priority order unless you ask:

1. **More questions/topics or difficulty levels** — expand beyond the current fixed 5-questions-per-topic, 16-topic structure. Consider: adding more questions to existing topics, adding new topics, and/or introducing an Easy/Medium/Hard tiering (either per-question tagging within existing topics, or separate difficulty tracks). Ask the user which of these three they actually want before building, since "difficulty levels" could mean any of them.
2. **Visual redesign** — the user is open to changing the current dark GitHub-style theme (see Design Language section below for what exists now). Confirm with them what direction they want (see the frontend-design skill/guidance available to you) rather than assuming — the current theme was a deliberate choice, not a placeholder, but they've now said they're open to changing it.
3. **Save progress permanently** — currently `topicScores` is in-memory React state only and resets on refresh. This needs real persistence. Two realistic paths: (a) `localStorage` for a simple single-device solution — works fine once deployed as a real site (not inside a Claude.ai artifact sandbox, where localStorage is unavailable), or (b) a small backend + database if the user wants progress to follow them across devices/browsers. Ask which they want before building — it changes the architecture significantly (b requires auth).
4. **Deploy it online with a real URL** — the project is already a working Vite build (`npm run build` produces a `dist/` folder). Static hosts like Vercel, Netlify, or GitHub Pages are the simplest fit given there's currently no backend. If item 3 goes the backend route, hosting needs a platform that supports that too (e.g., Vercel with serverless functions, or Railway/Render).

Note the dependency: if the user wants cross-device saved progress (3b) AND deployment (4), those two should be planned together since the backend choice affects the hosting choice.

## Context
This app was built by Claude (Anthropic) as a Claude.ai React artifact, then exported as a standalone Vite + React project so it can run outside the chat interface. You are picking this up to continue development/upgrades. This document gives you everything you need to understand the current state without re-deriving it from the code.

## What the app does
A single-page, self-contained Python learning quiz. The user picks one of 16 Python topics from a home grid, answers 5 multiple-choice questions per topic, gets immediate feedback with an explanation after each answer, and sees a results screen with a score, percentage, and a review of any missed questions. Scores per topic persist for the duration of the browser session (in-memory only, not saved across reloads — see Known Limitations).

## Tech stack
- React 18 (function component, hooks only: `useState`)
- Plain inline `style={{}}` objects for all styling — no CSS framework, no Tailwind, no styled-components
- Fonts loaded via Google Fonts `@import` inside a `<style>` tag: JetBrains Mono (code/questions) and Sora (headings/UI)
- Vite as the build tool / dev server
- Zero external state management, zero backend, zero routing library — everything is client-side and single-file

## File structure (in this delivery)
```
python-quiz-project/
├── index.html          # Vite entry HTML
├── package.json        # dependencies: react, react-dom, vite, @vitejs/plugin-react
├── vite.config.js       # standard React plugin config
└── src/
    ├── main.jsx         # ReactDOM root render
    └── App.jsx          # THE ENTIRE APP — all logic, all data, all styling lives here
```

Everything of substance is in `src/App.jsx`. There is currently no component decomposition — it's one ~900-line file with a `topics` data array and a single `PythonQuiz` component that does conditional rendering across three "screens" (home grid, active question, results).

## Data model
`topics` is an array of 16 objects:
```js
{
  id: number,
  title: string,
  icon: string (emoji),
  color: string (hex, used as the topic's accent color throughout),
  questions: [
    {
      q: string,
      options: string[4],
      answer: number (index into options),
      explanation: string
    }
    // exactly 5 per topic
  ]
}
```
Topics currently included: Basic Syntax & Data Types, Data Structures, Control Structures, Functions & Scope, Classes & Inheritance, Lambda Functions, Classes, Methods, Modules & Packages, File Handling, Error/Exception Handling, OOP Concepts, Regular Expressions, Debugging & Testing, Recursion, Threading.

Note: "Classes & Inheritance" (topic 5) and "Classes" (topic 7) and "Methods" (topic 8) have overlapping subject matter — this was requested by the user as separate topics in their original list and was kept distinct rather than merged. Worth flagging to the user if you plan to restructure the topic list.

## Component state (all in `PythonQuiz`)
- `selectedTopic` — null on the home screen, otherwise the active topic object
- `currentQ` — index of the current question within the topic
- `selected` — index of the option the user has clicked (before confirming)
- `confirmed` — whether the user has locked in their answer for the current question
- `score` — running correct-answer count for the current topic attempt
- `finished` — whether the results screen should show
- `topicScores` — `{ [topicId]: { score, total } }`, accumulates across topics for the session, drives the home-screen progress badges and the aggregate stats line
- `wrongAnswers` — array of missed questions (with the user's chosen index) for the current attempt, shown on the results screen for review

## Interaction flow
1. Home grid → click a topic card → `startTopic()` resets all per-attempt state and enters question view
2. Click an option → `handleSelect()` just sets `selected` (no scoring yet)
3. Click "Confirm Answer" → `handleConfirm()` locks the answer, updates `score`/`wrongAnswers`, reveals correct/incorrect styling and the explanation box
4. Click "Next Question" → `handleNext()` advances `currentQ`, or on the last question, writes into `topicScores` and sets `finished`
5. Results screen → "Retry" restarts the same topic, "All Topics" returns home

## Design language (if you touch styling, stay consistent)
- Dark theme, GitHub-dark-inspired palette: background `#0d1117`, card background `#161b22`, borders `#30363d`, primary text `#e6edf3`, muted text `#8b949e`
- Each topic has its own accent hex color (`t.color`) used for its card border-on-hover glow, progress bar fill, and in-quiz accent (button, selected-option border, progress bar)
- Correct/incorrect states use fixed colors regardless of topic: green `#3FB950` / `#1a3a1e` bg for correct, red `#FF6E6E` / `#2a1a1a` bg for incorrect
- Monospace (JetBrains Mono) for code-like content (questions, options); Sora for headings and buttons

## Known limitations / things a "continue the upgrade" pass should probably address
1. **No persistence** — `topicScores` is component state only. Refreshing the page loses all progress. If the user wants progress saved across sessions in a real deployment, this needs `localStorage` (for a standalone site) — note that `localStorage` is NOT available inside a Claude.ai artifact sandbox, only in a real deployed build like this one.
2. **No routing** — topic navigation is conditional rendering, not URL-based. Fine for a single-page tool, but means no shareable/bookmarkable links to a specific topic, and no browser back-button support.
3. **Single file** — `App.jsx` is doing too much for further growth. A natural next step is splitting into `TopicGrid.jsx`, `QuizView.jsx`, `ResultsView.jsx`, and moving `topics` into its own `data/topics.js` (or fetched from a JSON/API if content is going to grow).
4. **No accessibility pass** — no `aria-*` labels, no keyboard navigation for option selection (currently click/tap only), no focus management between questions.
5. **No test coverage** — zero unit tests. If this becomes a maintained project, the scoring logic (`handleConfirm`, `handleNext`) is the highest-value thing to cover.
6. **Content is static and fixed at 5 questions/topic** — there's no mechanism to add/import more questions without editing the array directly, no difficulty levels, and no randomization/shuffling of question or option order (so repeat attempts are identical).
7. **Mobile responsiveness is basic** — the grid uses `repeat(auto-fill, minmax(240px, 1fr))` which works reasonably on mobile widths, but nothing has been explicitly tested/tuned below ~375px.

## What NOT to assume
- Do not assume the user wants a backend. This has been entirely front-end/client-side by design so far.
- Do not silently change the visual design language (dark GitHub-style theme) unless the user asks for a redesign — it was a deliberate choice, not a default.
- Do not merge/remove the seemingly-overlapping topics (Classes / Classes & Inheritance / Methods) without checking with the user first — see note above.

## Suggested first questions to ask the user before making changes
These narrow down the four confirmed upgrade areas above into buildable specs:
- Persistence: localStorage (single device, simpler, no accounts) or a real backend with accounts (cross-device, more work)?
- Content: more questions in existing topics, entirely new topics, difficulty tiers, or some combination?
- Redesign: any reference aesthetic they like, or should you propose 2-3 directions for them to choose from?
- Deployment: any hosting preference, or is "just get it a working public URL" sufficient (in which case Vercel or Netlify are the path of least resistance)?
- Any specific new features beyond the four core areas (timer per question, shuffle, leaderboard, export results, light/dark toggle)?
