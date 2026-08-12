// Daily Challenge: ten questions derived from today's date, so every device
// gets the same set with no server involved.

import { useEffect, useMemo, useReducer } from 'react'
import { initQuizState, quizReducer, currentQuestion, canConfirm, isLastQuestion, scoreOf, mistakesOf } from '../lib/quizEngine.js'
import { isCorrect } from '../lib/grading.js'
import { pickDailySet, isCompletedToday, completeDaily, DAILY_COUNT } from '../lib/daily.js'
import { todayKey } from '../lib/dates.js'
import { navigate } from '../hooks/useHashRoute.js'
import QuestionView from '../components/QuestionView.jsx'
import ResultsView from '../components/ResultsView.jsx'
import { Button, Card, Badge, ProgressBar, EmptyState, BackLink } from '../components/ui.jsx'

export default function DailyScreen({ bank, daily, setDaily }) {
  const today = todayKey()
  const questions = useMemo(() => pickDailySet(bank, today, DAILY_COUNT), [bank, today])
  const [state, dispatch] = useReducer(quizReducer, questions, initQuizState)

  const question = currentQuestion(state)
  const revealed = state.phase === 'revealed'
  const finished = state.phase === 'finished'
  const correct = scoreOf(state)

  useEffect(() => {
    if (finished && state.results.length > 0) {
      setDaily((prev) => completeDaily(prev, correct, state.results.length, today))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished])

  if (questions.length === 0) {
    return (
      <EmptyState icon="📅" title="Not enough questions yet" action={<BackLink />}>
        The daily challenge needs a fuller question bank.
      </EmptyState>
    )
  }

  const alreadyDone = isCompletedToday(daily, today) && !finished
  if (alreadyDone) {
    const entry = (daily.history || []).find((h) => h.key === today)
    return (
      <EmptyState icon="✅" title="Today’s challenge is done" action={<BackLink />}>
        You scored {entry?.score ?? 0} / {entry?.total ?? DAILY_COUNT}. Current streak{' '}
        {daily.streak} day{daily.streak === 1 ? '' : 's'} — come back tomorrow for a new set.
      </EmptyState>
    )
  }

  if (finished) {
    return (
      <div className="stage">
        <ResultsView
          title={`Daily Challenge · ${today}`}
          correct={correct}
          total={state.results.length}
          mistakes={mistakesOf(state)}
          actions={
            <Button variant="primary" onClick={() => navigate('home')}>
              Done
            </Button>
          }
        />
        <p className="text-center mt-4">
          <Badge tone="accent">
            🔥 {daily?.streak ?? 1} day streak · longest {daily?.longest ?? 1}
          </Badge>
        </p>
      </div>
    )
  }

  const answeredCorrectly = revealed && isCorrect(question, state.selection)

  return (
    <div className="stage">
      <div className="stage__bar">
        <BackLink />
        <span>📅 Daily Challenge</span>
        <span className="stage__counter">
          {state.index + 1} / {questions.length}
        </span>
      </div>

      <ProgressBar value={((state.index + 1) / questions.length) * 100} label="Daily progress" />

      <Card className="mt-4">
        <QuestionView
          question={question}
          selection={state.selection}
          revealed={revealed}
          onSelect={(i) => dispatch({ type: 'SELECT', index: i })}
          onToggle={(i) => dispatch({ type: 'TOGGLE', index: i })}
        />

        {revealed && (
          <div className={`explain ${answeredCorrectly ? 'explain--correct' : 'explain--wrong'}`}>
            <strong className="explain__verdict">
              {answeredCorrectly ? '✓ Correct' : '✗ Not quite'}
            </strong>
            {question.explanation}
          </div>
        )}

        <div className="mt-4">
          {revealed ? (
            <Button variant="primary" block onClick={() => dispatch({ type: 'NEXT' })}>
              {isLastQuestion(state) ? 'See results 🏁' : 'Next question →'}
            </Button>
          ) : (
            <Button
              variant="primary"
              block
              disabled={!canConfirm(state)}
              onClick={() => dispatch({ type: 'CONFIRM' })}
            >
              Confirm answer
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
