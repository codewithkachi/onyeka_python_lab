// The quiz state machine.
//
// A pure reducer, deliberately. It is the keystone of the whole app: because
// nothing here touches React, every scoring rule is unit-testable without a
// DOM, and the UI components become dumb renderers of this state.
//
// The score is always DERIVED from `results` (see scoreOf) and never stored as
// its own field. The previous version of this app kept a separate `score` state
// alongside the answer log, which is exactly how the two drift apart.
//
// Phases:
//   'answering' - user may change their selection
//   'revealed'  - answer locked in, explanation shown, selection frozen
//   'finished'  - all questions done, results screen
//
// Pure -- no React, no window.

import { isCorrect } from './grading.js'

/** Selection value appropriate to a question type before the user picks. */
function emptySelection(question) {
  if (!question) return null
  if (question.type === 'multi') return []
  if (question.type === 'order') return null // the UI seeds a shuffled order
  return null
}

export function initQuizState(questions = []) {
  return {
    questions,
    index: 0,
    selection: emptySelection(questions[0]),
    phase: questions.length === 0 ? 'finished' : 'answering',
    results: [],
  }
}

export function currentQuestion(state) {
  return state.questions[state.index] || null
}

/** Number of correct answers so far -- always derived, never stored. */
export function scoreOf(state) {
  return state.results.filter((r) => r.correct).length
}

/** True when the current selection is a legitimate answer to submit. */
export function canConfirm(state) {
  if (state.phase !== 'answering') return false
  const q = currentQuestion(state)
  if (!q) return false
  if (q.type === 'multi') return Array.isArray(state.selection) && state.selection.length > 0
  if (q.type === 'order') return Array.isArray(state.selection) && state.selection.length > 0
  return Number.isInteger(state.selection)
}

export function isLastQuestion(state) {
  return state.index >= state.questions.length - 1
}

/**
 * Actions:
 *   { type: 'SELECT', index }      single-choice pick
 *   { type: 'TOGGLE', index }      multi-select add/remove
 *   { type: 'REORDER', items }     ordering puzzle arrangement
 *   { type: 'CONFIRM' }            lock the answer in and reveal
 *   { type: 'NEXT' }               advance, or finish on the last question
 *   { type: 'RESET', questions }   start over
 */
export function quizReducer(state, action) {
  switch (action.type) {
    case 'SELECT': {
      // Ignored once revealed: this is the confirm-then-reveal contract.
      if (state.phase !== 'answering') return state
      return { ...state, selection: action.index }
    }

    case 'TOGGLE': {
      if (state.phase !== 'answering') return state
      const current = Array.isArray(state.selection) ? state.selection : []
      const next = current.includes(action.index)
        ? current.filter((i) => i !== action.index)
        : [...current, action.index].sort((a, b) => a - b)
      return { ...state, selection: next }
    }

    case 'REORDER': {
      if (state.phase !== 'answering') return state
      return { ...state, selection: action.items }
    }

    case 'CONFIRM': {
      if (!canConfirm(state)) return state
      const q = currentQuestion(state)
      const correct = isCorrect(q, state.selection)
      return {
        ...state,
        phase: 'revealed',
        results: [
          ...state.results,
          {
            id: q.id,
            topic: q.topic,
            tier: q.tier,
            type: q.type,
            correct,
            selection: state.selection,
          },
        ],
      }
    }

    case 'NEXT': {
      if (state.phase !== 'revealed') return state
      if (isLastQuestion(state)) return { ...state, phase: 'finished' }
      const nextIndex = state.index + 1
      return {
        ...state,
        index: nextIndex,
        selection: emptySelection(state.questions[nextIndex]),
        phase: 'answering',
      }
    }

    case 'RESET':
      return initQuizState(action.questions ?? state.questions)

    default:
      return state
  }
}

/** The questions answered incorrectly, paired with their result, for review. */
export function mistakesOf(state) {
  return state.results
    .filter((r) => !r.correct)
    .map((r) => ({ result: r, question: state.questions.find((q) => q.id === r.id) }))
    .filter((m) => Boolean(m.question))
}
