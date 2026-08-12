// Classic topic quiz.
//
// Preserves the two-step confirm-then-reveal interaction from the original app:
// pick an option, press Confirm, read the explanation, then move on.
// Keyboard: 1-6 select, Enter confirms then advances, Esc goes home.

import { useEffect, useMemo, useReducer } from 'react'
import {
  initQuizState,
  quizReducer,
  currentQuestion,
  canConfirm,
  isLastQuestion,
  scoreOf,
  mistakesOf,
} from '../lib/quizEngine.js'
import { isCorrect, scorePercent } from '../lib/grading.js'
import { buildTopicQuiz } from '../lib/selectors.js'
import { getTopic } from '../data/topics.js'
import { navigate } from '../hooks/useHashRoute.js'
import QuestionView from '../components/QuestionView.jsx'
import ResultsView from '../components/ResultsView.jsx'
import { Button, Card, ProgressBar, EmptyState, BackLink } from '../components/ui.jsx'

const QUESTIONS_PER_RUN = 10

export default function QuizScreen({ topicId, bank, onRunComplete }) {
  const topic = getTopic(topicId)

  const questions = useMemo(
    () => buildTopicQuiz(bank, topicId, QUESTIONS_PER_RUN),
    [bank, topicId],
  )

  const [state, dispatch] = useReducer(quizReducer, questions, initQuizState)

  const question = currentQuestion(state)
  const revealed = state.phase === 'revealed'
  const finished = state.phase === 'finished'
  const correct = scoreOf(state)

  // Record the run once, when it finishes.
  useEffect(() => {
    if (finished && state.results.length > 0) {
      onRunComplete(topicId, {
        percent: scorePercent(correct, state.results.length),
        results: state.results,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finished])

  // Keyboard shortcuts. Ignored while typing in a field.
  useEffect(() => {
    function onKey(e) {
      const tag = e.target.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (e.key === 'Escape') return navigate('home')
      if (finished || !question) return

      if (e.key === 'Enter') {
        e.preventDefault()
        if (revealed) dispatch({ type: 'NEXT' })
        else if (canConfirm(state)) dispatch({ type: 'CONFIRM' })
        return
      }
      const n = Number(e.key)
      if (Number.isInteger(n) && n >= 1 && n <= (question.options?.length || 0)) {
        e.preventDefault()
        dispatch({ type: question.type === 'multi' ? 'TOGGLE' : 'SELECT', index: n - 1 })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [state, question, revealed, finished])

  if (!topic) {
    return <EmptyState icon="🔍" title="Unknown topic" action={<BackLink />} />
  }

  if (questions.length === 0) {
    return (
      <EmptyState
        icon="🚧"
        title={`${topic.title} is coming soon`}
        action={<BackLink />}
      >
        This topic has no questions yet.
      </EmptyState>
    )
  }

  if (finished) {
    return (
      <div className="stage" style={{ '--topic-accent': topic.accent }}>
        <ResultsView
          title={topic.title}
          correct={correct}
          total={state.results.length}
          mistakes={mistakesOf(state)}
          actions={
            <>
              <Button
                variant="primary"
                onClick={() => dispatch({ type: 'RESET', questions })}
              >
                Try again
              </Button>
              <Button variant="secondary" onClick={() => navigate('home')}>
                All topics
              </Button>
            </>
          }
        />
      </div>
    )
  }

  const answeredCorrectly = revealed && isCorrect(question, state.selection)
  const progress = ((state.index + 1) / questions.length) * 100

  return (
    <div className="stage" style={{ '--topic-accent': topic.accent }}>
      <div className="stage__bar">
        <BackLink />
        <span>
          {topic.icon} {topic.title}
        </span>
        <span className="stage__counter">
          {state.index + 1} / {questions.length}
        </span>
      </div>

      <ProgressBar value={progress} label="Quiz progress" />

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

      <p className="text-center muted mt-3 mono">
        Score {correct} / {state.results.length} · press 1-{question.options?.length || 4} to pick,
        Enter to confirm
      </p>
    </div>
  )
}
