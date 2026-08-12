// App shell: theme, routing and the screen switch. Deliberately thin — all the
// logic lives in src/lib/ (pure, tested) and each screen owns its own view.

import { useMemo } from 'react'
import { getBank } from './data/questions/index.js'
import { useHashRoute } from './hooks/useHashRoute.js'
import { useLocalStorage } from './hooks/useLocalStorage.js'
import { useTheme } from './hooks/useTheme.js'
import { STORAGE_KEYS } from './lib/storage.js'
import { buildHash } from './lib/routes.js'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import { EmptyState, BackLink, Button } from './components/ui.jsx'
import HomeScreen from './modes/HomeScreen.jsx'
import QuizScreen from './modes/QuizScreen.jsx'
import DailyScreen from './modes/DailyScreen.jsx'
import BossScreen from './modes/BossScreen.jsx'
import FlashcardsScreen from './modes/FlashcardsScreen.jsx'
import OrderingScreen from './modes/OrderingScreen.jsx'
import PlaygroundScreen from './modes/PlaygroundScreen.jsx'
import StatsScreen from './modes/StatsScreen.jsx'
import { initDailyState } from './lib/daily.js'

const NAV = [
  { route: 'home', label: 'Home' },
  { route: 'daily', label: 'Daily' },
  { route: 'boss', label: 'Boss' },
  { route: 'flashcards', label: 'Cards' },
  { route: 'ordering', label: 'Order' },
  { route: 'playground', label: 'Playground' },
  { route: 'stats', label: 'Stats' },
]

/** Loud, unmissable banner listing malformed questions. Dev builds only. */
function DevBankBanner({ errors }) {
  if (!import.meta.env.DEV || errors.length === 0) return null
  return (
    <div className="dev-banner">
      <strong>{errors.length} invalid question(s) were dropped from the bank:</strong>
      <ul>
        {errors.slice(0, 10).map((e, i) => (
          <li key={i}>
            {e.id ?? `#${e.index}`}: {e.message}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function App() {
  const route = useHashRoute()
  const { theme, toggle } = useTheme()
  const { questions, errors } = useMemo(() => getBank(), [])

  const [progress, setProgress] = useLocalStorage(STORAGE_KEYS.progress, {})
  const [seen, setSeen] = useLocalStorage(STORAGE_KEYS.seen, {})
  const [srs, setSrs] = useLocalStorage(STORAGE_KEYS.srs, {})
  const [daily, setDaily] = useLocalStorage(STORAGE_KEYS.daily, initDailyState())
  const [bossRecord, setBossRecord] = useLocalStorage(STORAGE_KEYS.boss, {
    highScore: 0,
    bestCombo: 0,
    runs: 0,
  })

  /** Called when a quiz run finishes: update best/last score and per-question stats. */
  function handleRunComplete(topicId, { percent, results }) {
    setProgress((prev) => {
      const before = prev[topicId] || { attempts: 0, bestPercent: 0 }
      return {
        ...prev,
        [topicId]: {
          attempts: before.attempts + 1,
          bestPercent: Math.max(before.bestPercent ?? 0, percent),
          lastPercent: percent,
          lastISO: new Date().toISOString(),
        },
      }
    })

    setSeen((prev) => {
      const next = { ...prev }
      for (const r of results) {
        const entry = next[r.id] || { seen: 0, correct: 0 }
        next[r.id] = { seen: entry.seen + 1, correct: entry.correct + (r.correct ? 1 : 0) }
      }
      return next
    })
  }

  function renderScreen() {
    switch (route.name) {
      case 'home':
        return <HomeScreen bank={questions} progress={progress} />
      case 'quiz':
        return (
          <QuizScreen
            key={route.params.topicId}
            topicId={route.params.topicId}
            bank={questions}
            onRunComplete={handleRunComplete}
          />
        )
      case 'daily':
        return <DailyScreen bank={questions} daily={daily} setDaily={setDaily} />
      case 'boss':
        return (
          <BossScreen bank={questions} bossRecord={bossRecord} setBossRecord={setBossRecord} />
        )
      case 'flashcards':
        return <FlashcardsScreen bank={questions} srs={srs} setSrs={setSrs} />
      case 'ordering':
        return <OrderingScreen bank={questions} />
      case 'playground':
        return <PlaygroundScreen />
      case 'stats':
        return (
          <StatsScreen
            bank={questions}
            progress={progress}
            seen={seen}
            daily={daily}
            bossRecord={bossRecord}
          />
        )
      default:
        return (
          <EmptyState icon="🔍" title="Page not found" action={<BackLink to="home" />}>
            That address doesn’t match anything in the app.
          </EmptyState>
        )
    }
  }

  return (
    <div className="shell">
      <DevBankBanner errors={errors} />

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="header">
        <div className="container header__inner">
          <a className="header__brand" href={buildHash('home')}>
            <span className="header__brand-mark" aria-hidden="true">
              🐍
            </span>
            Onyeka Python Lab
          </a>
          <div className="header__spacer" />
          <nav className="nav" aria-label="Main">
            {NAV.map((n) => (
              <a
                key={n.route}
                className="nav__link"
                href={buildHash(n.route)}
                aria-current={route.name === n.route ? 'page' : undefined}
              >
                {n.label}
              </a>
            ))}
          </nav>
          <Button
            variant="ghost"
            className="btn--icon"
            onClick={toggle}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            <span aria-hidden="true">{theme === 'light' ? '🌙' : '☀️'}</span>
          </Button>
        </div>
      </header>

      <main className="main" id="main">
        <div className="container">
          <ErrorBoundary>{renderScreen()}</ErrorBoundary>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          Onyeka Python Lab — {questions.length} questions · built for learning Python and ML/AI
        </div>
      </footer>
    </div>
  )
}
