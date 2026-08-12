// Renders one question of any graded type and handles its interaction.
//
// Options are real <button>s with radio/checkbox roles, replacing the old
// <div onClick> which had no keyboard access at all. Correct and incorrect are
// signalled by a glyph and a text label as well as colour.

import { CodeBlock, ScreenReaderLive } from './ui.jsx'

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']

export default function QuestionView({ question, selection, revealed, onSelect, onToggle }) {
  if (!question) return null

  const isMulti = question.type === 'multi'
  const chosen = isMulti ? selection || [] : selection
  const promptId = `prompt-${question.id}`

  const isChosen = (i) => (isMulti ? chosen.includes(i) : chosen === i)
  const isAnswer = (i) =>
    isMulti ? (question.answerIndices || []).includes(i) : question.answerIndex === i

  function optionClass(i) {
    const classes = ['option']
    if (isMulti) classes.push('option--multi')
    if (revealed) {
      if (isAnswer(i)) classes.push('option--correct')
      else if (isChosen(i)) classes.push('option--wrong')
    } else if (isChosen(i)) {
      classes.push('option--selected')
    }
    return classes.join(' ')
  }

  function keyGlyph(i) {
    if (!revealed) return LETTERS[i]
    if (isAnswer(i)) return '✓'
    if (isChosen(i)) return '✗'
    return LETTERS[i]
  }

  const liveMessage = revealed
    ? (isMulti
        ? (question.answerIndices || []).every((i) => (chosen || []).includes(i)) &&
          (chosen || []).length === (question.answerIndices || []).length
        : chosen === question.answerIndex)
      ? 'Correct.'
      : 'Incorrect.'
    : ''

  return (
    <>
      {question.type === 'output' && (
        <p className="muted mb-4">What does this code print?</p>
      )}
      {question.type === 'bug' && <p className="muted mb-4">Find the problem in this code.</p>}

      <p className="prompt" id={promptId}>
        {question.prompt}
      </p>

      <CodeBlock code={question.code} />

      {isMulti && <p className="muted mt-3">Select all that apply.</p>}

      <div
        className="options mt-3"
        role={isMulti ? 'group' : 'radiogroup'}
        aria-labelledby={promptId}
      >
        {question.options.map((opt, i) => (
          <button
            key={opt}
            type="button"
            className={optionClass(i)}
            role={isMulti ? 'checkbox' : 'radio'}
            aria-checked={isChosen(i)}
            disabled={revealed}
            onClick={() => (isMulti ? onToggle(i) : onSelect(i))}
          >
            <span className="option__key" aria-hidden="true">
              {keyGlyph(i)}
            </span>
            <span className="option__text">{opt}</span>
          </button>
        ))}
      </div>

      <ScreenReaderLive message={liveMessage} />
    </>
  )
}
