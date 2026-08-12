// Results screen: score, encouragement, and the review-mistakes list that was
// one of the best parts of the original app.

import { scorePercent, gradeLabel } from '../lib/grading.js'
import { Card } from './ui.jsx'

function chosenText(question, selection) {
  if (selection === null || selection === undefined) return 'no answer'
  if (question.type === 'multi') {
    if (!Array.isArray(selection) || selection.length === 0) return 'no answer'
    return selection.map((i) => question.options[i]).join(', ')
  }
  if (question.type === 'order') {
    return Array.isArray(selection) ? selection.join(' → ') : 'no answer'
  }
  return question.options[selection] ?? 'no answer'
}

function answerText(question) {
  if (question.type === 'multi') {
    return (question.answerIndices || []).map((i) => question.options[i]).join(', ')
  }
  if (question.type === 'order') return (question.items || []).join(' → ')
  return question.options[question.answerIndex]
}

export default function ResultsView({ title, correct, total, mistakes, actions }) {
  const pct = scorePercent(correct, total)
  const { emoji, label } = gradeLabel(pct)

  return (
    <Card className="result">
      <div className="result__emoji" aria-hidden="true">
        {emoji}
      </div>
      <h2>{title}</h2>
      <p className="result__pct">{pct}%</p>
      <p className="result__detail">
        {label} — {correct} of {total} correct
      </p>

      {mistakes.length > 0 && (
        <div className="mt-5">
          <h3 className="mb-4">Review your {mistakes.length} mistake{mistakes.length === 1 ? '' : 's'}</h3>
          <ul className="review">
            {mistakes.map(({ question, result }) => (
              <li className="review__item" key={question.id}>
                <p className="review__q">{question.prompt}</p>
                <p className="review__line review__line--wrong">
                  ✗ You: {chosenText(question, result.selection)}
                </p>
                <p className="review__line review__line--right">✓ Answer: {answerText(question)}</p>
                {question.explanation && <p className="review__why">{question.explanation}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="result__actions">{actions}</div>
    </Card>
  )
}
