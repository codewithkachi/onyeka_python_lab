// Boss Battle: 3 lives, 20s per question, combo multiplier, rising difficulty.

import { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import {
  initBossState,
  bossReducer,
  currentBossQuestion,
  comboMultiplier,
  tierForIndex,
  SECONDS_PER_QUESTION,
  START_LIVES,
} from '../lib/boss.js'
import { isCorrect } from '../lib/grading.js'
import { tierPool } from '../lib/selectors.js'
import { navigate } from '../hooks/useHashRoute.js'
import QuestionView from '../components/QuestionView.jsx'
import { Button, Card, Badge, ProgressBar, EmptyState, BackLink } from '../components/ui.jsx'

const RUN_LENGTH = 30

function buildRun(bank) {
  // Enough of each tier to cover the escalation, then trimmed.
  return [
    ...tierPool(bank, 'easy').slice(0, 5),
    ...tierPool(bank, 'intermediate').slice(0, 7),
    ...tierPool(bank, 'hard').slice(0, RUN_LENGTH),
    ...tierPool(bank, 'intermediate').slice(7, RUN_LENGTH),
  ].slice(0, RUN_LENGTH)
}

export default function BossScreen({ bank, bossRecord, setBossRecord }) {
  const questions = useMemo(() => buildRun(bank), [bank])
  const [state, dispatch] = useReducer(bossReducer, questions, initBossState)
  const [selection, setSelection] = useState(null)
  const [seconds, setSeconds] = useState(SECONDS_PER_QUESTION)
  const recorded = useRef(false)

  const question = currentBossQuestion(state)

  // Countdown. Restarts on every question; a timeout costs a life.
  useEffect(() => {
    if (state.over) return undefined
    setSeconds(SECONDS_PER_QUESTION)
    const started = Date.now()
    const id = setInterval(() => {
      const left = SECONDS_PER_QUESTION - Math.floor((Date.now() - started) / 1000)
      if (left <= 0) {
        clearInterval(id)
        setSeconds(0)
        setSelection(null)
        dispatch({ type: 'TIMEOUT' })
      } else {
        setSeconds(left)
      }
    }, 250)
    return () => clearInterval(id)
  }, [state.index, state.lives, state.over])

  // Persist the high score once, when the run ends.
  useEffect(() => {
    if (state.over && !recorded.current && state.questions.length > 0) {
      recorded.current = true
      setBossRecord((prev) => ({
        highScore: Math.max(prev?.highScore ?? 0, state.score),
        bestCombo: Math.max(prev?.bestCombo ?? 0, state.bestStreak),
        runs: (prev?.runs ?? 0) + 1,
      }))
    }
  }, [state.over, state.score, state.bestStreak, state.questions.length, setBossRecord])

  function answer() {
    if (selection === null) return
    dispatch({ type: 'ANSWER', correct: isCorrect(question, selection) })
    setSelection(null)
  }

  function restart() {
    recorded.current = false
    setSelection(null)
    dispatch({ type: 'RESET', questions: buildRun(bank) })
  }

  if (questions.length === 0) {
    return (
      <EmptyState icon="⚔️" title="Not enough questions yet" action={<BackLink />}>
        The boss battle needs a fuller question bank.
      </EmptyState>
    )
  }

  if (state.over) {
    const isRecord = state.score > 0 && state.score >= (bossRecord?.highScore ?? 0)
    return (
      <div className="stage">
        <Card className="result">
          <div className="result__emoji" aria-hidden="true">
            {isRecord ? '👑' : '💀'}
          </div>
          <h2>{isRecord ? 'New high score!' : 'Run over'}</h2>
          <p className="result__pct">{state.score}</p>
          <p className="result__detail">
            Best combo {state.bestStreak} · reached question {state.index + 1} · high score{' '}
            {Math.max(bossRecord?.highScore ?? 0, state.score)}
          </p>
          <div className="result__actions">
            <Button variant="primary" onClick={restart}>
              Fight again
            </Button>
            <Button variant="secondary" onClick={() => navigate('home')}>
              Home
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  const timePct = (seconds / SECONDS_PER_QUESTION) * 100
  const multiplier = comboMultiplier(state.streak)

  return (
    <div className="stage">
      <div className="stage__bar">
        <BackLink>← Leave</BackLink>
        <span aria-label={`${state.lives} lives remaining`}>
          {'♥'.repeat(state.lives)}
          <span className="muted">{'♡'.repeat(START_LIVES - state.lives)}</span>
        </span>
        <span className="stage__counter">{state.score} pts</span>
      </div>

      <ProgressBar value={timePct} label={`${seconds} seconds remaining`} />

      <div className="row row--between mt-2">
        <Badge tone={multiplier > 1 ? 'accent' : undefined}>
          {multiplier}× combo{state.streak > 0 ? ` · ${state.streak} streak` : ''}
        </Badge>
        <Badge>{tierForIndex(state.index)}</Badge>
        <Badge tone={seconds <= 5 ? 'low' : undefined}>{seconds}s</Badge>
      </div>

      <Card className="mt-3">
        <QuestionView
          question={question}
          selection={selection}
          revealed={false}
          onSelect={setSelection}
          onToggle={(i) =>
            setSelection((prev) => {
              const cur = Array.isArray(prev) ? prev : []
              return cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i].sort((a, b) => a - b)
            })
          }
        />
        <div className="mt-4">
          <Button
            variant="primary"
            block
            disabled={selection === null || (Array.isArray(selection) && selection.length === 0)}
            onClick={answer}
          >
            Lock it in
          </Button>
        </div>
      </Card>
    </div>
  )
}
