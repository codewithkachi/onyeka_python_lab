// Answer grading.
//
// One entry point, isCorrect(question, selection), so every mode -- quiz, boss,
// daily -- scores identically. The selection shape depends on the question type:
//
//   mcq | output | bug   number index, or null when unanswered
//   multi                array of indices, any order
//   order                array of item strings in the user's arrangement
//   flashcard            not graded; always false here
//
// Pure -- no React, no window.

/** Is this question type scored? Flashcards are study-only. */
export function isGradable(question) {
  return Boolean(question) && question.type !== 'flashcard'
}

export function isCorrect(question, selection) {
  if (!question) return false

  switch (question.type) {
    case 'mcq':
    case 'output':
    case 'bug':
      return Number.isInteger(selection) && selection === question.answerIndex

    case 'multi': {
      if (!Array.isArray(selection)) return false
      const expected = question.answerIndices || []
      if (selection.length !== expected.length) return false
      // Order-independent set comparison.
      const chosen = new Set(selection)
      if (chosen.size !== selection.length) return false // duplicates
      return expected.every((i) => chosen.has(i))
    }

    case 'order': {
      if (!Array.isArray(selection)) return false
      const expected = question.items || []
      if (selection.length !== expected.length) return false
      return expected.every((item, i) => selection[i] === item)
    }

    case 'flashcard':
    default:
      return false
  }
}

/** Percentage 0-100, guarded against divide-by-zero. */
export function scorePercent(correct, total) {
  if (!total || total <= 0) return 0
  return Math.round((correct / total) * 100)
}

/** Points a correct answer is worth, by difficulty. */
export const TIER_POINTS = { easy: 10, intermediate: 20, hard: 30 }

export function tierPoints(tier) {
  return TIER_POINTS[tier] ?? 10
}

/** Encouraging label + emoji for a final percentage. */
export function gradeLabel(percent) {
  if (percent >= 90) return { emoji: '🏆', label: 'Outstanding' }
  if (percent >= 75) return { emoji: '✨', label: 'Strong' }
  if (percent >= 50) return { emoji: '👍', label: 'Getting there' }
  return { emoji: '💪', label: 'Keep practising' }
}

/** Colour band for a mastery badge. */
export function masteryBand(percent) {
  if (percent >= 80) return 'good'
  if (percent >= 50) return 'mid'
  return 'low'
}
